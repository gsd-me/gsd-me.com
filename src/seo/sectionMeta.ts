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
    title: 'GSD Technologies | Video Analytics, Computer Vision & HSE AI',
    description:
      'Enterprise AI video analytics & computer vision in Egypt & MEA: HSE AI, PPE detection, fire & smoke, face recognition, document management & retail AI.',
    keywords:
      'video analytics, AI video, computer vision, HSE AI, PPE detection, fire and smoke detection, restricted zone, safety, overhead crane safety, trespassing detection, AI cameras, document management, AI driver camera, retail AI solutions, AI store, virtual retail manager, AI attendance, AI counting, face recognition, GSD Technologies Egypt',
    ogImage: '/src/assets/images/hero_control_center_1794852239757.jpg',
    ogImageAlt: 'GSD Technologies AI video analytics and computer vision command room',
    changefreq: 'weekly',
    priority: '1.0',
  },
  {
    id: 'ecosystem',
    slug: '/gsd-services-ecosystem',
    title: 'AI Video, Attendance & Retail Virtual Manager | GSD',
    description:
      'Deploy Carrot Vision QHSE AI, Eocortex, Makkook DIOS, Aipix, DMS/ADAS, GSD-DocAi, Smart Employee Attendance & HR Reporting, and Retail Command Virtual Manager.',
    keywords:
      'AI video analytics, Carrot Vision AI, Smart Employee Attendance, HR reporting, Retail Command Virtual Manager, true conversion rate, Eocortex VMS, Makkook DIOS, Aipix VSaaS, GSD-DocAi, AI driver camera',
    ogImage: '/src/assets/images/ecosystem_industrial_ai_1794852240167.jpg',
    ogImageAlt: 'Industrial computer vision and AI cameras monitoring overhead cranes and PPE',
    changefreq: 'weekly',
    priority: '0.9',
  },
  {
    id: 'solutions',
    slug: '/our-solutions',
    title: 'HSE AI, PPE Detection & Retail AI Store Solutions | GSD',
    description:
      'Computer vision solutions for PPE & coverall detection, fall & forklift safety, fire & smoke, thermal RDF monitoring, restricted zones, overhead cranes & retail AI.',
    keywords:
      'PPE detection, coverall detection, fall detection man down, forklift safety AI, fire and smoke, thermal monitoring, PTW LOTO COSHH, restricted zone monitoring, overhead crane safety, trespassing alerts, retail AI solutions, AI store, virtual retail manager',
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
    title: 'Industrial HSE AI Cameras & Plant Safety Egypt | GSD',
    description:
      'Carrot Vision AI for HSE & Plant Managers: 24/7 PPE compliance, early fire & smoke, 153.8°C thermal RDF alerts, crane exclusion zones & PLC triggers on existing CCTV.',
    keywords:
      'Industrial HSE AI camera Egypt, PPE detection Egypt, Carrot Vision AI, overhead crane safety AI, fire and smoke video analytics, thermal RDF hotspot monitoring, PLC safety interlocks, plant safety computer vision',
    ogImage: '/src/assets/images/solution_carrot_vision_1794865969929.jpg',
    ogImageAlt: 'Carrot Vision industrial HSE AI monitoring PPE compliance and overhead cranes',
    changefreq: 'weekly',
    priority: '0.95',
  },
  {
    id: 'sol-retail-malls-compounds',
    slug: '/solutions/retail-malls-smart-compounds',
    title: 'Retail AI, Mall Footfall Counting & LPR Gates Egypt | GSD',
    description:
      'POS-synced True Conversion Rate, footfall heatmaps, Smart Employee Attendance & automated LPR compound gates powered by Retail Command, Eocortex & Aipix.',
    keywords:
      'Mall footfall counting Egypt, LPR gate automation Egypt, Virtual Retail Manager, retail POS conversion AI, Smart Employee Attendance HR, Aipix cloud surveillance, Eocortex retail analytics, smart compound security',
    ogImage: '/src/assets/images/solutions_smart_facility_1794852240500.jpg',
    ogImageAlt: 'Commercial mall and smart compound monitored by AI counting and LPR cameras',
    changefreq: 'weekly',
    priority: '0.95',
  },
  {
    id: 'sol-fleet-dms',
    slug: '/solutions/fleet-driver-monitoring-dms',
    title: 'AI Fleet Driver Monitoring (DMS) & ADAS Dashcams | GSD',
    description:
      'In-cabin AI driver cameras detecting microsleep fatigue, mobile phone use & seatbelt gaps paired with forward ADAS collision alerts via Howen & AIS.',
    keywords:
      'AI driver camera Egypt, fleet DMS ADAS Egypt, truck driver fatigue detection, mobile phone dashcam AI, Howen MDVR Egypt, commercial fleet safety AI, forward collision warning truck',
    ogImage: '/src/assets/images/stories_cement_fleet_1794852242743.jpg',
    ogImageAlt: 'Commercial heavy truck logistics fleet protected by in-cabin DMS and ADAS cameras',
    changefreq: 'weekly',
    priority: '0.95',
  },
  {
    id: 'sol-decision-intelligence',
    slug: '/solutions/decision-intelligence-makkook',
    title: 'Decision Intelligence & Supply Chain AI (Makkook DIOS) | GSD',
    description:
      '60+ optimization engines for COOs & Supply Chain Heads: automated production line scheduling, multi-echelon safety stock, logistics routing & retail margin AI.',
    keywords:
      'Makkook DIOS Egypt, supply chain optimization AI, production scheduling optimization, logistics route sequencing AI, 98% on-time delivery, decision intelligence OS MEA',
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
