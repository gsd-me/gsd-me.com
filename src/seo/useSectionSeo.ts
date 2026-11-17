import {useEffect} from 'react';
import {SECTION_SEO_BY_ID, SectionId} from './sectionMeta';

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
  config: (typeof SECTION_SEO_BY_ID)[SectionId],
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
      name: 'GSD Technologies Egypt',
      item: `${origin}/`,
    },
  ];
  if (config.slug.startsWith('/solutions/')) {
    breadcrumbs.push({
      '@type': 'ListItem',
      position: 2,
      name: 'Our Solutions',
      item: `${origin}/our-solutions`,
    });
    breadcrumbs.push({
      '@type': 'ListItem',
      position: 3,
      name: config.title,
      item: canonicalUrl,
    });
  } else if (config.slug !== '/') {
    breadcrumbs.push({
      '@type': 'ListItem',
      position: 2,
      name: config.title,
      item: canonicalUrl,
    });
  }

  script.textContent = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${canonicalUrl}#webpage`,
    url: canonicalUrl,
    name: config.title,
    description: config.description,
    keywords: config.keywords,
    inLanguage: 'en',
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

export function useSectionSeo(activeSectionId: SectionId) {
  useEffect(() => {
    const config = SECTION_SEO_BY_ID[activeSectionId] ?? SECTION_SEO_BY_ID.top;
    const origin = window.location.origin;
    const canonicalUrl =
      config.slug === '/'
        ? `${origin}/`
        : `${origin}${config.slug}`;
    const absoluteImageUrl = `${origin}${config.ogImage}`;

    document.title = config.title;
    upsertCanonicalLink(canonicalUrl);

    // Standard SEO meta tags
    upsertMetaTag('name', 'description', config.description);
    upsertMetaTag('name', 'keywords', config.keywords);

    // OpenGraph tags per active section
    upsertMetaTag('property', 'og:type', 'website');
    upsertMetaTag('property', 'og:site_name', 'GSD Technologies Egypt');
    upsertMetaTag('property', 'og:locale', 'en_EG');
    upsertMetaTag('property', 'og:title', config.title);
    upsertMetaTag('property', 'og:description', config.description);
    upsertMetaTag('property', 'og:url', canonicalUrl);
    upsertMetaTag('property', 'og:image', absoluteImageUrl);
    upsertMetaTag('property', 'og:image:alt', config.ogImageAlt);

    // Twitter / X card tags per active section
    upsertMetaTag('name', 'twitter:card', 'summary_large_image');
    upsertMetaTag('name', 'twitter:title', config.title);
    upsertMetaTag('name', 'twitter:description', config.description);
    upsertMetaTag('name', 'twitter:url', canonicalUrl);
    upsertMetaTag('name', 'twitter:image', absoluteImageUrl);
    upsertMetaTag('name', 'twitter:image:alt', config.ogImageAlt);

    // Dynamic section structured data
    upsertSectionJsonLd(config, canonicalUrl, absoluteImageUrl, origin);
  }, [activeSectionId]);
}
