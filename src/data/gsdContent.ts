export interface EcosystemService {
  id: string;
  index: string;
  category: string;
  name: string;
  partner: string;
  headline: string;
  summary: string;
  highlights: string[];
  metrics: { label: string; value: string }[];
  vendorLogos?: { src: string; alt: string }[];
}

export interface VerticalSolution {
  id: string;
  name: string;
  tagline: string;
  summary: string;
  challenges: string[];
  modules: { title: string; detail: string }[];
}

export interface SuccessStory {
  id: string;
  sector: string;
  location: string;
  title: string;
  challenge: string;
  solutionPoints: string[];
  outcome: string;
}

export interface PartnerItem {
  name: string;
  domain: string;
  summary: string;
  logoSrc: string;
}

export interface CustomerItem {
  name: string;
  sector: string;
  note?: string;
  logoSrc: string;
}

export const SECTION_IMAGES = {
  heroControlCenter: {
    src: '/src/assets/images/hero_control_center_1794852239757.jpg',
    alt: 'Industrial AI operations and video analytics command room overlooking an automated manufacturing floor',
  },
  ecosystemIndustrial: {
    src: '/src/assets/images/ecosystem_industrial_ai_1794852240167.jpg',
    alt: 'Manufacturing plant floor with overhead gantry cranes, PPE-equipped engineers, and column-mounted industrial cameras',
  },
  solutionsFacility: {
    src: '/src/assets/images/solutions_smart_facility_1794852240500.jpg',
    alt: 'Modern smart hospital and enterprise corridor monitored by ceiling-mounted AI security cameras',
  },
  aboutOffice: {
    src: '/src/assets/images/about_cairo_engineering_1794852240968.jpg',
    alt: 'Systems integration engineering team reviewing architectural floor plans in a modern Cairo office',
  },
  storiesCementFleet: {
    src: '/src/assets/images/stories_cement_fleet_1794852242743.jpg',
    alt: 'Modern industrial cement facility and commercial heavy truck logistics yard at golden hour',
  },
};

export const COMPANY_INFO = {
  brandName: 'GSD Technologies',
  legalName: 'GSD Technologies Egypt',
  tagline: 'Digital Transformation Experts',
  domain: 'www.gsd-me.com',
  email: 'sales@gsd-me.com',
  address: '4 Street 151, Maadi Al Khabiri Ash Sharqeyah, Maadi, Cairo, Egypt',
  phones: ['+20 102 631 2200'],
  hours: 'Sunday – Thursday · 09:00 – 17:00 EET',
  story:
    'GSD Technologies bridges the gap between complex industrial environments and cutting-edge Artificial Intelligence—protecting lives, optimizing operations, and delivering measurable ROI across Egypt and the MEA region.',
  mission:
    'Deliver specialized AI solutions—Intelligent Video Analytics, Industrial HSE, AI Quality Assurance, and Cybersecurity—enabling clients to make real-time decisions that protect assets and safeguard human lives.',
  vision:
    'To be the leading AI-powered digital transformation partner in the MEA region, converting legacy systems into proactive, intelligent, life-saving business assets.',
  approach:
    'We go beyond box-moving. We deploy end-to-end AI engines with hands-on engineering precision, translating technology complexity into measurable financial returns for our clients.',
};

export const HERO_METRICS = [
  { value: '25+ Yrs', label: 'MEA Experience', context: 'Digital transformation experts' },
  { value: '18+ AI', label: 'QHSE Vision Modules', context: 'Carrot Vision on legacy CCTV' },
  { value: '60+', label: 'Optimization Engines', context: 'Makkook DIOS decision intelligence' },
  { value: '85%+', label: 'Faster Doc Processing', context: 'GSD-DocAi · 4-week rollout' },
];

export const ECOSYSTEM_SERVICES: EcosystemService[] = [
  {
    id: 'carrot-vision',
    index: '01',
    category: 'Industrial HSE & Video AI',
    name: 'Carrot Vision AI',
    partner: 'QHSE Operating System',
    headline: 'Computer vision HSE AI & video analytics monitoring legacy CCTV & AI cameras 24/7',
    summary:
      'A state-of-the-art AI video and computer vision QHSE platform trusted by Orascom, Heidelberg Materials, Arabian Cement, and Powerhouse—delivering PPE detection, fire and smoke alarms, overhead crane monitoring, and restricted zone trespassing protection.',
    highlights: [
      'Worker Safety & AI Attendance — real-time PPE detection (helmet, vest, gloves), fall detection, phone distraction, and face recognition attendance',
      'Critical Hazard Suite — early fire and smoke detection, thermal heat tracking, smoking alerts, and dangerous gas/vapor warnings',
      'Perimeter, Restricted Zone & Crane Safety — overhead crane geofencing, trespassing alarms, restricted zone rules, and camera sabotage detection',
      'Enterprise Analytics — live HSE dashboard alerts, Email, WhatsApp & PLC triggers, AI counting & inventory, and zero-latency workflows',
    ],
    metrics: [
      { value: '18+', label: 'Custom QHSE AI modules' },
      { value: '24/7', label: 'Zero-latency alert triggers' },
    ],
    vendorLogos: [{ src: '/assets/partners/carrot-vision.png', alt: 'Carrot Vision AI logo' }],
  },
  {
    id: 'eocortex',
    index: '02',
    category: 'Intelligent Video Analytics',
    name: 'Eocortex Platform',
    partner: 'Hardware-Agnostic VMS · 20+ Computer Vision Modules',
    headline: 'Open-platform AI video analytics across 85+ countries and 15,000+ active projects',
    summary:
      'Hardware-agnostic computer vision VMS running 20+ native AI modules—face recognition, AI attendance, AI counting, LPR, fire & smoke alarms, and suspect tracking across existing CCTV and AI cameras.',
    highlights: [
      'Security & Face Recognition — face recognition, VIP/blacklist alerts, multi-attribute object search, cross-camera tracking, and sabotage alarms',
      'Industrial HSE AI & Safety — PPE detection (hard hat, vest, uniform), fire and smoke detection, man-down fall alerts, and restricted zone tracking',
      'Traffic & AI Cameras — high-speed License Plate Recognition, vehicle classification, emergency priority access, and color/brand filtering',
      'AI Store & Retail Analytics — AI counting for visitors & queues, density heatmapping, automated shelf fullness alerts, and unique vs. returning profiling',
    ],
    metrics: [
      { value: '15,000+', label: 'Active global projects' },
      { value: '85+', label: 'Countries deployed' },
    ],
    vendorLogos: [{ src: '/assets/partners/eocortex.png', alt: 'Eocortex logo' }],
  },
  {
    id: 'makkook-dios',
    index: '03',
    category: 'Decision Intelligence OS',
    name: 'Makkook DIOS',
    partner: '60+ Optimization Engines',
    headline: 'Auto-resolving high-constraint bottlenecks across production, supply chain, logistics & retail',
    summary:
      '60+ algorithmic optimization engines spanning Production, Supply Chain, Logistics, and Retail suites—engineered to cut fleet transit costs, prevent stockouts, and protect margins.',
    highlights: [
      'Production Suite — optimal scheduling & line assignment, minimize raw material waste, maximize machine capacity, and mitigate changeover bottlenecks',
      'Supply Chain Suite — multi-echelon demand forecasting, optimal sourcing strategies, network safety stock positioning, and dynamic supply alignment',
      'Logistics Suite — real-time vehicle dispatch, multi-drop route sequencing, reduced fuel & transit costs, and 98%+ on-time delivery',
      'Retail Suite — automated replenishment triggers, optimal shelf allocation, eliminate shelf stockouts, and protect net store gross margins',
    ],
    metrics: [
      { value: '60+', label: 'Optimization engines' },
      { value: '98%+', label: 'On-time delivery target' },
    ],
    vendorLogos: [{ src: '/assets/partners/makkook.png', alt: 'Makkook logo' }],
  },
  {
    id: 'aipix',
    index: '04',
    category: 'VSaaS & Cloud Surveillance',
    name: 'Aipix Suite',
    partner: 'Aipix Security · Telecoms & ISPs VAS',
    headline: 'High-margin white-label cloud AI video & surveillance with native billing integration',
    summary:
      'Eliminate local physical recording infrastructure and stream encrypted feeds from IP and AI cameras directly to telco hubs—with 24/7 continuous storage, WebRTC zero-latency video, and smart intercom.',
    highlights: [
      'Cloud VSaaS — 24/7 continuous encrypted storage to telco hubs, eliminating on-premises DVR/NVR hardware with 99% ONVIF IP camera support',
      'Edge AI Video Analytics — LPR vehicle tracking, fire & smoke detection, and GDPR-compliant face recognition',
      'Smart Intercom — plug & play onboarding with cloud-authenticated biometric/keyless doors and temporary guest QR keys',
      'Subscriber App — 100% white-label operator mobile app with WebRTC zero-latency feeds, mobile video calls, and instant push alert widgets',
    ],
    metrics: [
      { value: '99%', label: 'ONVIF IP cam support' },
      { value: '100%', label: 'White-label operator UI' },
    ],
    vendorLogos: [{ src: '/assets/partners/aipix.png', alt: 'Aipix logo' }],
  },
  {
    id: 'vehicle-ai',
    index: '05',
    category: 'Vehicle AI Monitoring',
    name: 'DMS & ADAS AI Driver Camera',
    partner: 'Powered by Howen & AIS Fleet Hardware',
    headline: 'In-cabin AI driver camera (DMS) and forward-facing ADAS collision prevention in real time',
    summary:
      'Eliminates human error through rugged in-cabin AI driver cameras paired with an ADAS co-pilot—detecting driver distraction, fatigue, and collision risks before road accidents happen.',
    highlights: [
      'In-Cabin AI Driver Camera (DMS) — eyes-off-road & phone usage distraction alerts plus microsleep & eye-closure fatigue monitoring',
      'Biometric Driver ID & Alerts — real-time corrective audio/visual cab warnings and face recognition driver verification at cabin entry',
      'ADAS Co-Pilot — forward collision warning (FCW), pedestrian alerts, safe headway monitoring, and real-time lane departure drift alerts',
      'Fleet Policy Analytics — multi-channel video evidence and compliance reports powered by Howen & AIS vehicle AI hardware',
    ],
    metrics: [
      { value: 'DMS+ADAS', label: 'Dual cab & road protection' },
      { value: 'Real-Time', label: 'Instant cab & fleet alerts' },
    ],
    vendorLogos: [
      { src: '/assets/partners/howen.png', alt: 'Howen logo' },
      { src: '/assets/partners/ais.png', alt: 'AIS Artificial Intelligence Systems logo' },
    ],
  },
  {
    id: 'gsd-docai',
    index: '06',
    category: 'Document Management & Workplace',
    name: 'GSD-DocAi & Workplace',
    partner: 'GSD-DocAi · Claromentis · Augnito · TSPlus',
    headline: 'Compliant, auditable AI document management system (DMS) & digital workplace',
    summary:
      'Enterprise document management, intranet, process automation, and clinical voice AI—led by GSD-DocAi to replace scattered files and slow approvals with full production deployment in four weeks.',
    highlights: [
      'Document Management Challenge — eliminates scattered documents, manual retention bottlenecks, and slow approvals creating compliance risk',
      'Four-Tier Document Management — scanner ingestion, neural OCR, SLA approval workflows, and governed cloud archive with Claromentis & TSPlus',
      'Measurable Value — 85%+ faster document processing, full ISO 15489 and 21 CFR Part 11 alignment, and zero lost records (plus Augnito voice AI)',
      '4-Week Enterprise Rollout — four weeks from document types and role permissions to full production onboarding',
    ],
    metrics: [
      { value: '85%+', label: 'Faster doc processing' },
      { value: '4 Weeks', label: 'Concept to full rollout' },
    ],
    vendorLogos: [
      { src: '/assets/partners/claromentis.jpg', alt: 'Claromentis logo' },
      { src: '/assets/partners/augnito.png', alt: 'Augnito logo' },
      { src: '/assets/partners/tsplus.png', alt: 'TSPlus logo' },
    ],
  },
];

export const VERTICAL_SOLUTIONS: VerticalSolution[] = [
  {
    id: 'industrial',
    name: 'Industrial & Manufacturing',
    tagline: 'HSE AI, PPE detection, overhead crane safety, fire & smoke, and restricted zones',
    summary:
      'Keep personnel, overhead cranes, heavy machinery, and inventory protected across cement plants, factories, and workshops by turning existing CCTV into real-time computer vision safety cameras.',
    challenges: [
      'PPE detection gaps and unsafe worker behavior (smoking, phone distraction, missing hard hats)',
      'Forklift near-misses and overcrowding beneath active overhead crane loads',
      'Restricted zone breaches, perimeter trespassing, and AI camera tampering',
      'Early fire and smoke hazards, overheating kilns, and untracked production counting',
    ],
    modules: [
      { title: 'PPE Detection & Safety', detail: 'Real-time computer vision checks for helmets, high-vis vests, gloves, and boots.' },
      { title: 'Overhead Crane & Restricted Zones', detail: 'Flags overcrowding under overhead cranes and alerts on trespassing into restricted zones.' },
      { title: 'Fire, Smoke & Thermal AI', detail: 'Spark-tuned fire and smoke detection plus thermal overheating alerts for kilns and panels.' },
      { title: 'AI Attendance & PLC Alerts', detail: 'Face recognition attendance verification plus instant Email, WhatsApp, and PLC triggers.' },
    ],
  },
  {
    id: 'healthcare',
    name: 'Hospitals & Healthcare',
    tagline: '24/7 clinical safety, face recognition access control, and Augnito medical voice AI',
    summary:
      'Extend hospital security and clinical operations across ICUs, wards, pharmacies, and medical equipment stores without adding security headcount.',
    challenges: [
      'Unauthorized entry and trespassing into ICUs, pharmacies, or confidential patient records',
      'Patient falls and medical emergencies going unnoticed between rounds',
      'Mask, gown, and sterile-zone PPE hygiene compliance gaps',
      'Physician documentation overhead across diagnostic and clinical workflows',
    ],
    modules: [
      { title: 'Face Recognition & Access Control', detail: 'Restricts ICU, pharmacy, and records access strictly to authorized medical staff.' },
      { title: 'Man-Down Fall Detection', detail: 'Immediate AI video alert the moment a patient or staff member collapses.' },
      { title: 'Sterile PPE & Hygiene Checks', detail: 'Monitors mask and gown compliance across sterile wards in real time.' },
      { title: 'Augnito Voice AI & DocAi', detail: 'Clinical speech recognition and compliant medical document management workflows.' },
    ],
  },
  {
    id: 'malls',
    name: 'Malls & Shopping Centers',
    tagline: 'Crowd safety, AI counting, automated LPR parking, and face recognition alerts',
    summary:
      'Unify visitor safety, organized retail crime prevention, AI people counting, and high-throughput parking operations under a single computer vision command layer.',
    challenges: [
      'Shoplifting, organized retail crime, and repeat offender tracking',
      'Overcrowding during peak retail seasons and public events',
      'Parking congestion, barrier bottlenecks, and vehicle disputes',
      'Rapid search requirements for lost children and missing persons across AI cameras',
    ],
    modules: [
      { title: 'LPR & Automated Parking', detail: 'Barrier control, entry/exit logging, and live garage vehicle counting.' },
      { title: 'Crowd Density & AI Counting', detail: 'Real-time people counting and early overcrowding alerts across concourses and halls.' },
      { title: 'Face Recognition Watchlists', detail: 'Instant VIP and blacklist notifications across mall entrances.' },
      { title: 'Footfall & Heat Mapping', detail: 'Zone-popularity analytics guiding tenant placement and leasing strategy.' },
    ],
  },
  {
    id: 'compounds',
    name: 'Compounds & Resorts',
    tagline: 'Automated gate LPR access, trespassing defense, and smart perimeter AI cameras',
    summary:
      'Deliver guarded-community and resort security without manual gate bottlenecks—automating resident/guest entry and restricted-zone perimeter trespassing alerts.',
    challenges: [
      'Unauthorized entry and trespassing by unverified visitors and vehicles',
      'Fence-line intrusions and unmonitored perimeter blind spots',
      'High recurring cost and inconsistency of manual gate guarding',
      'Slow incident verification across large residential and resort footprints',
    ],
    modules: [
      { title: 'LPR Barrier Access', detail: 'Automatic gate opening for registered plates with zero queue delay.' },
      { title: 'Smart Intercom & Face Access', detail: 'Cloud-authenticated biometric door access and temporary guest QR passes.' },
      { title: 'Trespassing & Perimeter Tracking', detail: 'Instant intrusion and trespassing alerts before breaches reach villas or resort zones.' },
      { title: 'Fire, Smoke & Sabotage Alerts', detail: 'Immediate AI video alerts for lens obstruction or outdoor smoke/fire hazards.' },
    ],
  },
  {
    id: 'retail',
    name: 'AI Store & Retail Solutions',
    tagline: 'Virtual Retail Manager: AI counting, AI attendance, face recognition & store analytics',
    summary:
      'Transform existing store CCTV into a 24/7 Virtual Retail Manager—combining retail AI solutions, accurate visitor AI counting, staff AI attendance via face recognition, queue alerts, and branch KPI exports.',
    challenges: [
      'Blind spots between raw store foot traffic, AI counting, and actual POS conversion',
      'Checkout queues growing too long without an automated Virtual Retail Manager alert',
      'Staff presence skewing visitor counts and manual branch attendance logs',
      'Fragmented multi-branch AI store reporting lacking standardized exports',
    ],
    modules: [
      { title: 'Virtual Retail Manager & Queues', detail: 'Automated supervisor alerts for checkout queue length, shelf gaps, and floor coverage.' },
      { title: 'AI Counting & Staff Filtering', detail: 'Computer vision separates staff from shoppers for exact visitor and conversion counts.' },
      { title: 'AI Attendance & Face Recognition', detail: 'Automated employee attendance logging, shift tracking, and VIP/blacklist recognition.' },
      { title: 'AI Store Reports & Heatmaps', detail: 'Age/gender demographics, zone heatmaps, and scheduled CSV, Excel, and PDF exports.' },
    ],
  },
];

export const CUSTOMERS: CustomerItem[] = [
  {
    name: 'Heidelberg Materials — Kattameya',
    sector: 'Kattameya Cement Plant · القطامية للأسمنت',
    note: 'Cement & Building Materials',
    logoSrc: '/assets/customers/heidelberg.png',
  },
  {
    name: 'Heidelberg Materials — Suez',
    sector: 'Suez Cement Plant · السويس للأسمنت',
    note: 'Cement & Building Materials',
    logoSrc: '/assets/customers/heidelberg.png',
  },
  {
    name: 'Heidelberg Materials — Helwan',
    sector: 'Helwan Cement Plant · حلوان للأسمنت',
    note: 'Cement & Building Materials',
    logoSrc: '/assets/customers/heidelberg.png',
  },
  {
    name: 'Orascom CPD',
    sector: 'Concrete Products Division',
    note: 'Construction & Heavy Materials',
    logoSrc: '/assets/customers/orascom-cpd.png',
  },
  {
    name: 'Master Gas',
    sector: 'Energy & Gas Fleet Logistics',
    note: 'Commercial Fleet Safety & AI',
    logoSrc: '/assets/customers/master-gas.png',
  },
  {
    name: 'Arabian Cement',
    sector: 'Cement Manufacturing',
    note: 'Industrial QHSE & Video Analytics',
    logoSrc: '/assets/customers/arabian-cement.png',
  },
  {
    name: 'Augnito',
    sector: 'Healthcare Voice AI',
    note: 'Enterprise Clinical Deployment',
    logoSrc: '/assets/partners/augnito.png',
  },
  {
    name: 'Powerhouse',
    sector: 'Power Without Limits',
    note: 'Industrial Power & Engineering',
    logoSrc: '/assets/customers/powerhouse.png',
  },
  {
    name: 'Dreams Beach Resort',
    sector: 'Sharm El-Sheikh',
    note: 'Hospitality Security & Access AI',
    logoSrc: '/assets/customers/dreams-beach.png',
  },
  {
    name: 'LifeEssence',
    sector: 'Flavors & Fragrances',
    note: 'Facility Safety & Operations',
    logoSrc: '/assets/customers/life-essence.png',
  },
  {
    name: 'Mlameh',
    sector: 'Multi-Branch Fashion Retail',
    note: 'Retail Footfall & Staff-Filtered AI',
    logoSrc: '/assets/customers/mlameh.png',
  },
  {
    name: 'Faiha Medical Group',
    sector: 'Healthcare & Medical Centers',
    note: 'Clinical Safety & Digital Health',
    logoSrc: '/assets/customers/faiha-medical.png',
  },
];

export const SUCCESS_STORIES: SuccessStory[] = [
  {
    id: 'cement-group',
    sector: 'Cement & Heavy Industry',
    location: 'Kattameya, Suez & Helwan · Egypt',
    title: 'Plant-wide AI safety & thermal kiln monitoring across three cement factories',
    challenge:
      'Rolled out across three high-heat cement facilities operated by Heidelberg Materials in Egypt—requiring 24/7 oversight of heavy machinery, restricted zones, and kilns.',
    solutionPoints: [
      'Helmet and high-visibility vest compliance across active production zones',
      'Thermal camera integration detecting abnormal kiln and equipment temperatures',
      'Restricted zone alerts, early fire/smoke detection, and material segment counting',
    ],
    outcome: 'Unified multi-site AI backbone delivering group-level HSE visibility across all three plants.',
  },
  {
    id: 'heavy-manufacturing',
    sector: 'Heavy Manufacturing',
    location: 'Plant Floor · Egypt',
    title: 'Overhead crane zone safety & generator fire prevention on existing CCTV',
    challenge:
      'Overhead cranes moving heavy loads above workers alongside fuel and generator rooms where manual safety patrols could not cover every shift continuously.',
    solutionPoints: [
      'Overhead crane zone monitoring flagging overcrowding and restricted-zone entry in motion',
      'Cigarette detection in fuel/generator areas tuned to ignore eating or phone look-alikes',
      'PPE violations, perimeter trespassing, and face-linked coaching follow-ups',
    ],
    outcome: 'Shifted safety operations from reactive patrols to real-time automated hazard alerts with zero camera replacement.',
  },
  {
    id: 'gas-fleet',
    sector: 'Oil, Gas & Fleet Logistics',
    location: 'Commercial Truck Fleet · Egypt',
    title: 'In-cab DMS & ADAS collision prevention for a leading gas company fleet',
    challenge:
      'Preventing road incidents caused by driver fatigue, distraction, or phone glances before they become safety reports.',
    solutionPoints: [
      'Driver Monitoring System (DMS) detecting eye-closing, yawning, phone use, smoking, and absence',
      'ADAS forward-collision, lane-departure, headway distance, and pedestrian risk warnings',
      'Rugged 3-channel video (front, cab, external) integrated with live fleet telemetry',
    ],
    outcome: 'Real-time in-cab risk intervention integrated directly into the client’s existing fleet platform.',
  },
  {
    id: 'fashion-retail',
    sector: 'Multi-Branch Fashion Retail',
    location: 'Retail Network · Egypt',
    title: 'Staff-filtered footfall & demographic intelligence across store branches',
    challenge:
      'Multi-branch fashion retailer needed accurate daily visitor counts, age/gender splits, and clean conversion data without employees inflating store traffic.',
    solutionPoints: [
      'Face recognition automatically excluding staff members from customer footfall totals',
      'Age and gender breakdown per visit aggregated into a unified multi-branch dashboard',
      'Automated CSV, Excel, and PDF exports integrated into existing management reporting',
    ],
    outcome: 'Turned existing security cameras into a zero-disruption retail intelligence engine across all branches.',
  },
];

export const PARTNERS: PartnerItem[] = [
  {
    name: 'Carrot Vision',
    domain: 'Industrial QHSE AI',
    summary: '18+ edge-native computer vision modules for PPE compliance, fire/smoke, thermal analytics, and spatial geofencing.',
    logoSrc: '/assets/partners/carrot-vision.png',
  },
  {
    name: 'Eocortex',
    domain: 'Open-Platform VMS',
    summary: 'Hardware-agnostic video management and 20+ native AI analytics modules deployed across 85+ countries.',
    logoSrc: '/assets/partners/eocortex.png',
  },
  {
    name: 'Makkook',
    domain: 'Decision Intelligence',
    summary: '60+ algorithmic optimization engines (DIOS) optimizing production, supply chain, fleet logistics, and retail.',
    logoSrc: '/assets/partners/makkook.png',
  },
  {
    name: 'Aipix',
    domain: 'Cloud VSaaS & Intercom',
    summary: 'White-label cloud video surveillance, smart biometric intercom, and telecom VAS billing integration.',
    logoSrc: '/assets/partners/aipix.png',
  },
  {
    name: 'AIS',
    domain: 'Artificial Intelligence Systems',
    summary: 'Specialized edge AI vision and smart infrastructure systems engineered for enterprise industrial deployments.',
    logoSrc: '/assets/partners/ais.png',
  },
  {
    name: 'Howen',
    domain: 'Vehicle AI & Mobile DVR',
    summary: 'Rugged commercial fleet MDVRs, AI dashcams, DMS fatigue monitors, and ADAS collision-prevention hardware.',
    logoSrc: '/assets/partners/howen.png',
  },
  {
    name: 'Claromentis',
    domain: 'Digital Workplace & DocAi',
    summary: 'ISO 27001:2022 & HIPAA-compliant AI intranet, no-code workflow automation, and e-learning LMS.',
    logoSrc: '/assets/partners/claromentis.jpg',
  },
  {
    name: 'Augnito',
    domain: 'Healthcare Voice AI',
    summary: 'Next-generation clinical speech recognition and voice AI built for hospitals and healthcare teams.',
    logoSrc: '/assets/partners/augnito.png',
  },
  {
    name: 'TSPlus',
    domain: 'Secure Remote Access',
    summary: 'Enterprise remote desktop, application publishing, and cybersecurity access infrastructure.',
    logoSrc: '/assets/partners/tsplus.png',
  },
];
