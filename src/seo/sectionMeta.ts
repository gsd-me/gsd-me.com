export type SolutionSubpageId =
  | 'sol-industrial-hse'
  | 'sol-retail-malls-compounds'
  | 'sol-fleet-dms'
  | 'sol-decision-intelligence';

export type SectionId =
  | 'top'
  | 'ecosystem'
  | 'solutions'
  | 'customers'
  | 'about'
  | 'success-stories'
  | 'partners'
  | 'contact'
  | SolutionSubpageId;

export function isSolutionSubpageId(id: string): id is SolutionSubpageId {
  return (
    id === 'sol-industrial-hse' ||
    id === 'sol-retail-malls-compounds' ||
    id === 'sol-fleet-dms' ||
    id === 'sol-decision-intelligence'
  );
}

export interface SectionSeoConfig {
  id: SectionId;
  slug: string;
  title: string;
  description: string;
  keywords: string;
  ogImage: string;
  ogImageAlt: string;
  changefreq: 'weekly' | 'monthly';
  priority: string;
}

export const DEFAULT_CANONICAL_ORIGIN = 'https://www.gsd-me.com';

export const SECTION_SEO_LIST: SectionSeoConfig[] = [
  {
    id: 'top',
    slug: '/',
    title: 'AI HSE Compliance Egypt, PPE Detection & Video Analytics | GSD',
    description:
      'AI HSE compliance Egypt, PPE detection camera system, industrial fire and smoke video analytics & overhead crane safety monitoring across Egypt and Saudi Arabia.',
    keywords:
      'AI HSE compliance Egypt, PPE detection camera system, industrial fire and smoke video analytics, overhead crane safety monitoring Egypt, Carrot Vision AI Egypt, Eocortex partner Egypt, GSD Technologies Egypt',
    ogImage: '/src/assets/images/hero_control_center_1794852239757.jpg',
    ogImageAlt: 'GSD Technologies AI video analytics and computer vision command room',
    changefreq: 'weekly',
    priority: '1.0',
  },
  {
    id: 'ecosystem',
    slug: '/gsd-services-ecosystem',
    title: 'Carrot Vision AI, Eocortex Partner Egypt & Cloud VSaaS | GSD',
    description:
      'Deploy Carrot Vision AI Egypt, Eocortex partner Egypt hardware-agnostic VMS, Cloud VSaaS Middle East (Aipix), DMS dashcam fleet safety & Makkook decision intelligence.',
    keywords:
      'Cloud VSaaS Middle East, Eocortex partner Egypt, Carrot Vision AI Egypt, hardware-agnostic VMS, Makkook decision intelligence Egypt, AI production scheduling, DMS dashcam fleet safety, Smart Employee Attendance, Retail Command Virtual Manager, GSD-DocAi',
    ogImage: '/src/assets/images/ecosystem_industrial_ai_1794852240167.jpg',
    ogImageAlt: 'Industrial computer vision and AI cameras monitoring overhead cranes and PPE',
    changefreq: 'weekly',
    priority: '0.9',
  },
  {
    id: 'solutions',
    slug: '/our-solutions',
    title: 'LPR Gate Control, Retail Footfall & ONVIF AI Video Egypt | GSD',
    description:
      'ONVIF AI video analytics Egypt for LPR gate control Egypt, ANPR camera system Cairo, perimeter intrusion AI analytics, retail footfall counting Egypt & mall heatmaps.',
    keywords:
      'LPR gate control Egypt, ANPR camera system Cairo, perimeter intrusion AI analytics, ONVIF AI video analytics Egypt, retail footfall counting Egypt, mall heatmap video analytics, POS camera integration Egypt, customer demographic camera AI, PPE detection camera system',
    ogImage: '/src/assets/images/solutions_smart_facility_1794852240500.jpg',
    ogImageAlt: 'AI cameras running face recognition, AI counting, and facility safety monitoring',
    changefreq: 'weekly',
    priority: '0.9',
  },
  {
    id: 'customers',
    slug: '/customers',
    title: 'Enterprise AI Video & Safety Customers in Egypt | GSD',
    description:
      'Trusted for AI video analytics and fleet safety by Heidelberg Materials Kattameya, Suez & Helwan, Orascom CPD, Arabian Cement, Master Gas & Mlameh.',
    keywords:
      'Heidelberg Materials Egypt AI, Orascom CPD HSE AI, Arabian Cement video analytics, Master Gas AI driver camera, Mlameh AI store, industrial AI customers Egypt',
    ogImage: '/src/assets/images/stories_cement_fleet_1794852242743.jpg',
    ogImageAlt: 'Cement plants and commercial fleets using GSD computer vision safety systems',
    changefreq: 'weekly',
    priority: '0.85',
  },
  {
    id: 'about',
    slug: '/about',
    title: 'About GSD Technologies | Computer Vision & AI Integrator',
    description:
      '25+ years of MEA ICT expertise delivering AI video analytics, HSE AI safety, document management, and retail AI transformation without replacing CCTV.',
    keywords:
      'GSD Technologies Egypt, computer vision integrator Cairo, AI safety company MEA, digital transformation experts, Maadi Cairo AI',
    ogImage: '/src/assets/images/about_cairo_engineering_1794852240968.jpg',
    ogImageAlt: 'GSD Technologies computer vision and systems engineering team in Cairo',
    changefreq: 'monthly',
    priority: '0.7',
  },
  {
    id: 'success-stories',
    slug: '/success-stories',
    title: 'Computer Vision, Overhead Crane & Retail AI Cases | GSD',
    description:
      'Verified deployments: cement kiln fire & smoke AI, overhead crane & restricted zone safety, AI driver cameras (DMS/ADAS), and AI store people counting.',
    keywords:
      'overhead crane AI safety, fire and smoke detection case study, AI driver camera fleet safety, AI counting retail footfall, face recognition attendance Egypt',
    ogImage: '/src/assets/images/stories_cement_fleet_1794852242743.jpg',
    ogImageAlt: 'Heavy industry and commercial truck fleet protected by AI video and driver cameras',
    changefreq: 'weekly',
    priority: '0.85',
  },
  {
    id: 'partners',
    slug: '/our-partners',
    title: 'AI Camera, Video & Document Management Partners | GSD',
    description:
      'Official MEA partner for Carrot Vision, Eocortex, Makkook, Aipix, AIS, Howen AI driver cameras, Claromentis document management, Augnito & TSPlus.',
    keywords:
      'Carrot Vision partner, Eocortex Egypt, Makkook DIOS, Aipix cloud surveillance, Howen AI driver camera, AIS edge AI, Claromentis document management, Augnito',
    ogImage: '/assets/aistudio/logo-GSD_a8de37a5.jpg',
    ogImageAlt: 'GSD Technologies Egypt — Digital Transformation Experts',
    changefreq: 'monthly',
    priority: '0.75',
  },
  {
    id: 'contact',
    slug: '/contact-us',
    title: 'Request an AI Video, HSE or Retail AI Demo | GSD Cairo',
    description:
      'Book a live video analytics, PPE detection, document management, or Virtual Retail Manager demo. Contact sales@gsd-me.com or +20 102 631 2200.',
    keywords:
      'request AI video analytics demo, PPE detection Egypt contact, document management demo Cairo, virtual retail manager demo, sales@gsd-me.com',
    ogImage: '/assets/aistudio/logo-GSD_a8de37a5.jpg',
    ogImageAlt: 'GSD Technologies Egypt Maadi Cairo office contact card',
    changefreq: 'monthly',
    priority: '0.8',
  },
  {
    id: 'sol-industrial-hse',
    slug: '/solutions/industrial-hse-video-analytics',
    title: 'AI HSE Compliance Egypt & PPE Detection Camera System | GSD',
    description:
      'AI HSE compliance Egypt & Saudi Arabia via Carrot Vision AI: PPE detection camera system, industrial fire and smoke video analytics & overhead crane safety monitoring Egypt.',
    keywords:
      'AI HSE compliance Egypt, PPE detection camera system, industrial fire and smoke video analytics, overhead crane safety monitoring Egypt, Carrot Vision AI Egypt, thermal RDF hotspot monitoring, PLC safety interlocks',
    ogImage: '/src/assets/images/solution_carrot_vision_1794865969929.jpg',
    ogImageAlt: 'Carrot Vision industrial HSE AI monitoring PPE compliance and overhead cranes',
    changefreq: 'weekly',
    priority: '0.95',
  },
  {
    id: 'sol-retail-malls-compounds',
    slug: '/solutions/retail-malls-smart-compounds',
    title: 'LPR Gate Control, Retail Footfall & Mall Heatmaps Egypt | GSD',
    description:
      'Retail footfall counting Egypt, POS camera integration Egypt, mall heatmap video analytics, customer demographic camera AI, LPR gate control Egypt & ANPR camera system Cairo.',
    keywords:
      'LPR gate control Egypt, ANPR camera system Cairo, perimeter intrusion AI analytics, ONVIF AI video analytics Egypt, retail footfall counting Egypt, mall heatmap video analytics, POS camera integration Egypt, customer demographic camera AI',
    ogImage: '/src/assets/images/solutions_smart_facility_1794852240500.jpg',
    ogImageAlt: 'Commercial mall and smart compound monitored by AI counting and LPR cameras',
    changefreq: 'weekly',
    priority: '0.95',
  },
  {
    id: 'sol-fleet-dms',
    slug: '/solutions/fleet-driver-monitoring-dms',
    title: 'AI Fleet Driver Monitoring Egypt & DMS Dashcam Safety | GSD',
    description:
      'AI fleet driver monitoring Egypt & Saudi Arabia: rugged DMS dashcam fleet safety for fatigue, microsleep, mobile phone distraction & forward ADAS collision alerts.',
    keywords:
      'AI fleet driver monitoring Egypt, DMS dashcam fleet safety, Howen AI dashcam Egypt, truck fatigue detection DMS, ADAS collision warning fleet Egypt',
    ogImage: '/src/assets/images/stories_cement_fleet_1794852242743.jpg',
    ogImageAlt: 'Commercial heavy truck logistics fleet protected by in-cabin DMS and ADAS cameras',
    changefreq: 'weekly',
    priority: '0.95',
  },
  {
    id: 'sol-decision-intelligence',
    slug: '/solutions/decision-intelligence-makkook',
    title: 'Makkook Decision Intelligence Egypt & AI Production Scheduling',
    description:
      'Makkook decision intelligence Egypt & MEA: 60+ engines for AI production scheduling, multi-echelon safety stock, 98%+ on-time fleet dispatch & retail margins.',
    keywords:
      'Makkook decision intelligence Egypt, AI production scheduling, supply chain optimization MEA, multi-drop route optimization Egypt',
    ogImage: '/src/assets/images/solution_makkook_dios_1794865969666.jpg',
    ogImageAlt: 'Makkook DIOS algorithmic optimization across production lines and logistics dispatch',
    changefreq: 'weekly',
    priority: '0.95',
  },
];

export const SECTION_SEO_BY_ID: Record<SectionId, SectionSeoConfig> = SECTION_SEO_LIST.reduce(
  (acc, item) => {
    acc[item.id] = item;
    return acc;
  },
  {} as Record<SectionId, SectionSeoConfig>,
);

export function getSectionByPathname(pathname: string): SectionId | null {
  const normalized = pathname.replace(/\/+$/, '') || '/';
  if (normalized === '/our-partners-1') {
    return 'partners';
  }
  const match = SECTION_SEO_LIST.find((item) => item.slug === normalized);
  return match ? match.id : null;
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export function generateSitemapXml(baseOrigin: string, lastmodDate: string): string {
  const cleanOrigin = baseOrigin.replace(/\/+$/, '');
  const urls = SECTION_SEO_LIST.map((section) => {
    const loc = section.slug === '/' ? `${cleanOrigin}/` : `${cleanOrigin}${section.slug}`;
    const imageLoc = `${cleanOrigin}${section.ogImage}`;
    return `  <url>
    <loc>${escapeXml(loc)}</loc>
    <lastmod>${escapeXml(lastmodDate)}</lastmod>
    <changefreq>${section.changefreq}</changefreq>
    <priority>${section.priority}</priority>
    <image:image>
      <image:loc>${escapeXml(imageLoc)}</image:loc>
      <image:title>${escapeXml(section.title)}</image:title>
    </image:image>
  </url>`;
  }).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls}
</urlset>
`;
}

export function generateRobotsTxt(baseOrigin: string): string {
  const cleanOrigin = baseOrigin.replace(/\/+$/, '');
  return `User-agent: *
Allow: /

Sitemap: ${cleanOrigin}/sitemap.xml
`;
}
