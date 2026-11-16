import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import {defineConfig, Plugin} from 'vite';
import {
  DEFAULT_CANONICAL_ORIGIN,
  generateRobotsTxt,
  generateSitemapXml,
  SECTION_SEO_LIST,
  SectionSeoConfig,
} from './src/seo/sectionMeta';

function escapeHtmlAttr(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function injectSectionMetaIntoHtml(
  templateHtml: string,
  section: SectionSeoConfig,
  origin: string,
): string {
  const cleanOrigin = origin.replace(/\/+$/, '');
  const canonicalUrl = section.slug === '/' ? `${cleanOrigin}/` : `${cleanOrigin}${section.slug}`;
  const ogImageUrl = `${cleanOrigin}${section.ogImage}`;

  return templateHtml
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtmlAttr(section.title)}</title>`)
    .replace(
      /<meta\s+name="description"[\s\S]*?\/>/,
      `<meta name="description" content="${escapeHtmlAttr(section.description)}" />`,
    )
    .replace(
      /<meta\s+name="keywords"[\s\S]*?\/>/,
      `<meta name="keywords" content="${escapeHtmlAttr(section.keywords)}" />`,
    )
    .replace(
      /<link\s+rel="canonical"[\s\S]*?\/>/,
      `<link rel="canonical" href="${escapeHtmlAttr(canonicalUrl)}" />`,
    )
    .replace(
      /<meta\s+property="og:url"[\s\S]*?\/>/,
      `<meta property="og:url" content="${escapeHtmlAttr(canonicalUrl)}" />`,
    )
    .replace(
      /<meta\s+property="og:title"[\s\S]*?\/>/,
      `<meta property="og:title" content="${escapeHtmlAttr(section.title)}" />`,
    )
    .replace(
      /<meta\s+property="og:description"[\s\S]*?\/>/,
      `<meta property="og:description" content="${escapeHtmlAttr(section.description)}" />`,
    )
    .replace(
      /<meta\s+property="og:image"[\s\S]*?\/>/,
      `<meta property="og:image" content="${escapeHtmlAttr(ogImageUrl)}" />`,
    )
    .replace(
      /<meta\s+property="og:image:alt"[\s\S]*?\/>/,
      `<meta property="og:image:alt" content="${escapeHtmlAttr(section.ogImageAlt)}" />`,
    )
    .replace(
      /<meta\s+name="twitter:url"[\s\S]*?\/>/,
      `<meta name="twitter:url" content="${escapeHtmlAttr(canonicalUrl)}" />`,
    )
    .replace(
      /<meta\s+name="twitter:title"[\s\S]*?\/>/,
      `<meta name="twitter:title" content="${escapeHtmlAttr(section.title)}" />`,
    )
    .replace(
      /<meta\s+name="twitter:description"[\s\S]*?\/>/,
      `<meta name="twitter:description" content="${escapeHtmlAttr(section.description)}" />`,
    )
    .replace(
      /<meta\s+name="twitter:image"[\s\S]*?\/>/,
      `<meta name="twitter:image" content="${escapeHtmlAttr(ogImageUrl)}" />`,
    )
    .replace(
      /<meta\s+name="twitter:image:alt"[\s\S]*?\/>/,
      `<meta name="twitter:image:alt" content="${escapeHtmlAttr(section.ogImageAlt)}" />`,
    );
}

function gsdDynamicSeoAndSitemapPlugin(): Plugin {
  return {
    name: 'gsd-dynamic-seo-and-sitemap',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const reqPath = (req.url || '/').split('?')[0];
        const protoHeader = req.headers['x-forwarded-proto'];
        const proto = Array.isArray(protoHeader) ? protoHeader[0] : protoHeader || 'http';
        const host = req.headers.host || 'localhost:3000';
        const liveOrigin = process.env.APP_URL || `${proto}://${host}`;
        const today = new Date().toISOString().split('T')[0];

        if (reqPath === '/sitemap.xml') {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/xml; charset=utf-8');
          res.end(generateSitemapXml(liveOrigin, today));
          return;
        }

        if (reqPath === '/robots.txt') {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'text/plain; charset=utf-8');
          res.end(generateRobotsTxt(liveOrigin));
          return;
        }

        next();
      });
    },
    closeBundle(error?: Error) {
      if (error) {
        return;
      }
      const distDir = path.resolve(__dirname, 'dist');
      const indexHtmlPath = path.join(distDir, 'index.html');
      if (!fs.existsSync(distDir) || !fs.existsSync(indexHtmlPath)) {
        return;
      }

      const siteOrigin = process.env.SITE_URL || DEFAULT_CANONICAL_ORIGIN;
      const buildDate = new Date().toISOString().split('T')[0];

      // 1. Write dynamically generated sitemap.xml and robots.txt for production hosting
      fs.writeFileSync(path.join(distDir, 'sitemap.xml'), generateSitemapXml(siteOrigin, buildDate));
      fs.writeFileSync(path.join(distDir, 'robots.txt'), generateRobotsTxt(siteOrigin));

      // 2. Write crawler-ready per-section HTML pages with dedicated OpenGraph & Twitter cards
      const baseHtml = fs.readFileSync(indexHtmlPath, 'utf-8');
      for (const section of SECTION_SEO_LIST) {
        const renderedHtml = injectSectionMetaIntoHtml(baseHtml, section, siteOrigin);
        if (section.slug === '/') {
          fs.writeFileSync(indexHtmlPath, renderedHtml);
        } else {
          const sectionDir = path.join(distDir, section.slug.replace(/^\/+/, ''));
          fs.mkdirSync(sectionDir, {recursive: true});
          fs.writeFileSync(path.join(sectionDir, 'index.html'), renderedHtml);
        }
      }
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [
      react(),
      tailwindcss(),
      // Copies src/assets into dist/ so root-relative URLs like
      // "/src/assets/images/..." (e.g. generate_image output) still resolve
      // in production builds. Do not remove.
      {
        name: 'copy-unbundled-src-assets',
        apply: 'build',
        closeBundle(error?: Error): void {
          if (error) {
            return;
          }
          const distDir = path.resolve(__dirname, 'dist');
          const srcAssets = path.resolve(__dirname, 'src/assets');
          const distAssets = path.resolve(distDir, 'src/assets');
          if (fs.existsSync(distDir) && fs.existsSync(srcAssets)) {
            fs.cpSync(srcAssets, distAssets, {recursive: true, force: true});
          }
        },
      },
      gsdDynamicSeoAndSitemapPlugin(),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
