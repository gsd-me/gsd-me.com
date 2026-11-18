import {useEffect} from 'react';
import {SECTION_SEO_BY_ID, SectionId} from './sectionMeta';
import {SECTION_SEO_AR_BY_ID} from './sectionMetaAr';
import type {Language} from '../i18n/LanguageContext';

function upsertMetaTag(attrName: 'name' | 'property', attrValue: string, content: string) {
  let tag = document.head.querySelector<HTMLMetaElement>(`meta[${attrName}="${attrValue}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attrName, attrValue);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
}

function upsertCanonicalLink(href: string) {
  let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }
  link.setAttribute('href', href);
}

function upsertSectionJsonLd(
  slug: string,
  meta: {title: string; description: string; keywords: string},
  lang: Language,
  canonicalUrl: string,
  absoluteImageUrl: string,
  origin: string,
) {
  let script = document.head.querySelector<HTMLScriptElement>('script#gsd-section-jsonld');
  if (!script) {
    script = document.createElement('script');
    script.id = 'gsd-section-jsonld';
    script.type = 'application/ld+json';
    document.head.appendChild(script);
  }

  const breadcrumbs = [
    {
      '@type': 'ListItem',
      position: 1,
      name: lang === 'ar' ? 'GSD Technologies مصر' : 'GSD Technologies Egypt',
      item: `${origin}/`,
    },
  ];
  if (slug.startsWith('/solutions/')) {
    breadcrumbs.push({
      '@type': 'ListItem',
      position: 2,
      name: lang === 'ar' ? 'الحلول' : 'Our Solutions',
      item: `${origin}/our-solutions`,
    });
    breadcrumbs.push({
      '@type': 'ListItem',
      position: 3,
      name: meta.title,
      item: canonicalUrl,
    });
  } else if (slug !== '/') {
    breadcrumbs.push({
      '@type': 'ListItem',
      position: 2,
      name: meta.title,
      item: canonicalUrl,
    });
  }

  script.textContent = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${canonicalUrl}#webpage`,
    url: canonicalUrl,
    name: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    inLanguage: lang,
    primaryImageOfPage: {
      '@type': 'ImageObject',
      url: absoluteImageUrl,
    },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbs,
    },
  });
}

export function useSectionSeo(activeSectionId: SectionId, lang: Language = 'en') {
  useEffect(() => {
    const baseConfig = SECTION_SEO_BY_ID[activeSectionId] ?? SECTION_SEO_BY_ID.top;
    const arConfig = SECTION_SEO_AR_BY_ID[activeSectionId] ?? SECTION_SEO_AR_BY_ID.top;
    const activeMeta =
      lang === 'ar'
        ? {
            title: arConfig.title,
            description: arConfig.description,
            keywords: arConfig.keywords,
            ogImageAlt: arConfig.ogImageAlt,
          }
        : {
            title: baseConfig.title,
            description: baseConfig.description,
            keywords: baseConfig.keywords,
            ogImageAlt: baseConfig.ogImageAlt,
          };

    const origin = window.location.origin;
    const canonicalUrl =
      baseConfig.slug === '/' ? `${origin}/` : `${origin}${baseConfig.slug}`;
    const absoluteImageUrl = `${origin}${baseConfig.ogImage}`;

    document.title = activeMeta.title;
    upsertCanonicalLink(canonicalUrl);

    // Standard SEO meta tags
    upsertMetaTag('name', 'description', activeMeta.description);
    upsertMetaTag('name', 'keywords', activeMeta.keywords);

    // OpenGraph tags per active section
    upsertMetaTag('property', 'og:type', 'website');
    upsertMetaTag(
      'property',
      'og:site_name',
      lang === 'ar' ? 'شركة GSD Technologies مصر' : 'GSD Technologies Egypt',
    );
    upsertMetaTag('property', 'og:locale', lang === 'ar' ? 'ar_EG' : 'en_EG');
    upsertMetaTag('property', 'og:title', activeMeta.title);
    upsertMetaTag('property', 'og:description', activeMeta.description);
    upsertMetaTag('property', 'og:url', canonicalUrl);
    upsertMetaTag('property', 'og:image', absoluteImageUrl);
    upsertMetaTag('property', 'og:image:alt', activeMeta.ogImageAlt);

    // Twitter / X card tags per active section
    upsertMetaTag('name', 'twitter:card', 'summary_large_image');
    upsertMetaTag('name', 'twitter:title', activeMeta.title);
    upsertMetaTag('name', 'twitter:description', activeMeta.description);
    upsertMetaTag('name', 'twitter:url', canonicalUrl);
    upsertMetaTag('name', 'twitter:image', absoluteImageUrl);
    upsertMetaTag('name', 'twitter:image:alt', activeMeta.ogImageAlt);

    // Dynamic section structured data
    upsertSectionJsonLd(
      baseConfig.slug,
      activeMeta,
      lang,
      canonicalUrl,
      absoluteImageUrl,
      origin,
    );
  }, [activeSectionId, lang]);
}
