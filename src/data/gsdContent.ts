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
  image?: { src: string; alt: string };
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
  roiMetric: string;
  iconKey: 'cement' | 'manufacturing' | 'workshop' | 'fleet' | 'retail';
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
  ecosystemServiceId: string;
  ecosystemCta: string;
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

export interface CarrotVisionWorkflowStep {
  step: string;
  title: string;
  detail: string;
}

export interface CarrotVisionDifferentiator {
  index: string;
  title: string;
  detail: string;
}

export interface CarrotVisionSuite {
  id: string;
  title: string;
  subtitle: string;
  items: { name: string; detail: string }[];
}

export interface CarrotVisionStandard {
  code: string;
  title: string;
  detail: string;
}

export interface CarrotVisionProofItem {
  location: string;
  title: string;
  metric?: string;
  detail: string;
}

export interface CarrotVisionDetails {
  eyebrow: string;
  title: string;
  tagline: string;
  summary: string;
  automatedAssistantPillars: { title: string; detail: string }[];
  workflowSteps: CarrotVisionWorkflowStep[];
  differentiators: CarrotVisionDifferentiator[];
  suites: CarrotVisionSuite[];
  standards: CarrotVisionStandard[];
  controlRoomCapabilities: { title: string; detail: string }[];
  liveSiteProofs: CarrotVisionProofItem[];
}

export const CARROT_VISION_DATA: CarrotVisionDetails = {
  eyebrow: 'Carrot Vision · Industrial Health, Safety & Environment',
  title: 'The Leading QHSE Management System Based on CCTV Cameras',
  tagline: 'The Automated QHSE Engineer — 24/7 monitoring on existing CCTV with 18+ safety checks',
  summary:
    'Built specifically for industrial QHSE and site safety rules, Carrot Vision connects directly to existing CCTV cameras and runs 100% locally on your on-site servers so camera footage never leaves your plant.',
  automatedAssistantPillars: [
    {
      title: 'Never Sleeps',
      detail: 'Watches work zones across day, night, and weekend shifts without fatigue.',
    },
    {
      title: 'Sees Everywhere',
      detail: 'Monitors all connected CCTV cameras across your facility at the same time.',
    },
    {
      title: 'Handles All the Manual Hassle',
      detail: 'Automatically logs violations, pairs photo proof with worker Face ID, and builds safety reports.',
    },
  ],
  workflowSteps: [
    {
      step: '01',
      title: 'Connects',
      detail: 'Connects directly to your existing CCTV and ONVIF IP cameras with zero hardware replacement.',
    },
    {
      step: '02',
      title: 'Checks Live 24/7',
      detail: 'Inspects live camera feeds continuously across every shift for PPE, fire, zone, and vehicle hazards.',
    },
    {
      step: '03',
      title: 'Sends Alerts',
      detail: 'Dispatches instant control room, Email, WhatsApp, and machine PLC triggers the moment a violation occurs.',
    },
    {
      step: '04',
      title: 'Full Reports',
      detail: 'Delivers clear safety compliance dashboards, event verification logs, and root-cause reports in one hub.',
    },
  ],
  differentiators: [
    {
      index: '01',
      title: 'Specialized',
      detail: 'Built specifically for industrial QHSE workflows and high-risk site safety rules.',
    },
    {
      index: '02',
      title: 'Comprehensive',
      detail: 'Complete industrial safety library with 14+ dedicated QHSE modules and 18+ safety checks.',
    },
    {
      index: '03',
      title: 'Most Accurate',
      detail: 'High-precision computer vision tuned specifically for harsh industrial lighting, dust, and site conditions.',
    },
    {
      index: '04',
      title: 'Hardware Efficient',
      detail: 'Runs more simultaneous safety checks per server, lowering GPU and infrastructure costs.',
    },
    {
      index: '05',
      title: '100% Secure (On-Site)',
      detail: 'Installed locally on your site servers so sensitive camera footage never leaves your plant.',
    },
  ],
  suites: [
    {
      id: 'worker-safety',
      title: 'Worker Safety & Personal Gear',
      subtitle: 'Automated PPE, uniform, ergonomics & habit compliance',
      items: [
        {
          name: 'PPE Detection',
          detail: 'Checks hard hats, safety vests, gloves, goggles, and safety boots in real time.',
        },
        {
          name: 'Uniform Detection',
          detail: 'Verifies workers are wearing approved site coveralls inside designated plant areas.',
        },
        {
          name: 'Fall Detection ("Man Down")',
          detail: 'Spots slips, trips, and collapsed workers immediately so medical help arrives faster.',
        },
        {
          name: 'Mobile, Seat Belt & Face ID',
          detail: 'Detects phone distraction, safety belt compliance, and matches worker identity.',
        },
        {
          name: 'Smoking & CO Detection',
          detail: 'Spots smoking in restricted plant zones and dangerous carbon monoxide hazards.',
        },
      ],
    },
    {
      id: 'critical-hazards',
      title: 'Critical Hazard Suite',
      subtitle: 'Early fire, smoke, thermal hotspots & hazardous vapors',
      items: [
        {
          name: 'Fire, Smoke & Thermal Cameras',
          detail: 'Early flame and smoke plume alerts plus continuous heat tracking on thermal cameras.',
        },
        {
          name: 'Dangerous Gas & Vapor Alerts',
          detail: 'Continuous visual and sensor-linked alerts for hazardous gas or vapor emissions.',
        },
        {
          name: 'RDF & Kiln Hotspot Prevention',
          detail: 'Flags abnormal thermal spikes—such as 153.8°C RDF fuel pile hotspots—before open ignition.',
        },
        {
          name: 'Worker ID Verification',
          detail: 'Pairs incident scene snapshots with employee or contractor directory profiles for rapid follow-up.',
        },
      ],
    },
    {
      id: 'perimeter-loads',
      title: 'Perimeter, Zones, Cranes & Forklifts',
      subtitle: 'Geofenced red zones, hanging loads & warehouse vehicle rules',
      items: [
        {
          name: 'Restricted Zones & Hanging Loads',
          detail: 'Time and headcount triggers in red zones plus alerts for workers standing under overhead crane loads.',
        },
        {
          name: 'Forklift Safety Module',
          detail: 'Monitors forklift speed, safe distance from walking staff, and warehouse aisle rules.',
        },
        {
          name: 'Trespassing & Perimeter Protection',
          detail: 'Guards site fences and boundary walls against unauthorized entry day or night.',
        },
        {
          name: 'Camera Tampering & Blockage',
          detail: 'Instant alerts for camera obstruction, lens blockage, or offline feed health issues.',
        },
      ],
    },
    {
      id: 'alerts-reporting',
      title: 'Personnel, Alerts & Reporting',
      subtitle: 'Workstation staffing, PLC triggers & executive oversight',
      items: [
        {
          name: 'Personnel Monitoring',
          detail: 'Tracks worker presence, workstation attendance, and safe staffing levels per shift.',
        },
        {
          name: 'Email, WhatsApp & Machine PLC Triggers',
          detail: 'Instant alert workflows to safety officers, WhatsApp groups, or automated equipment interlocks.',
        },
        {
          name: 'Material Counting & Inventory Checks',
          detail: 'Automated camera-based counting for production output and yard inventory verification.',
        },
        {
          name: '100% Local On-Site Installation',
          detail: 'Full edge/on-prem deployment keeping video streams inside your plant network.',
        },
      ],
    },
  ],
  standards: [
    {
      code: 'PPE & OSH',
      title: 'PPE & OSH Compliance',
      detail: 'Automated Personal Protective Equipment checks enforcing Occupational Safety standards across every shift.',
    },
    {
      code: 'PTW · LOTO · COSHH',
      title: 'PTW, LOTO & COSHH',
      detail: 'Monitors Permit to Work zones, Lockout Tagout boundaries, and hazardous COSHH storage areas.',
    },
    {
      code: 'JSA · JHA · ALARP',
      title: 'JSA, JHA, HAZID & ALARP',
      detail: 'Proactive Hazard Identification engineered to keep operational site risks at ALARP levels.',
    },
    {
      code: 'LTIFR · TRIR · CAPA',
      title: 'KPI, LTIFR, TRIR & RCA',
      detail: 'Lowers injury rates (LTIFR/TRIR) through Proactive, Active & Predictive HSE KPIs with visual Root Cause Analysis & CAPA.',
    },
  ],
  controlRoomCapabilities: [
    {
      title: 'HSE Overview & Trend Dashboards',
      detail: 'Tracks violation breakdowns by AI model, online/offline camera health, reviewed vs. pending events, 24-hour alert timelines, top cameras, and high-risk zones & departments.',
    },
    {
      title: 'Events Module & Quick Verification',
      detail: 'Filter incidents by site, AI model, assignee, or review status; merge, export, validate, and mark detections as correct or false directly in the queue.',
    },
    {
      title: 'Worker Face Recognition & Employees Directory',
      detail: 'Pairs cropped scene evidence with employee/contractor database matches (confidence score & staff ID) and assigns incidents directly to safety officers.',
    },
  ],
  liveSiteProofs: [
    {
      location: 'Packer M-C 4 · Cement Packing Line',
      title: 'PPE Detection in Dusty Cement Environment',
      metric: '24/7 Live',
      detail: 'Detects missing hard hats and vests accurately even under heavy airborne cement dust on active packing lines.',
    },
    {
      location: 'Suez-Th3-Thermal · RDF Storage',
      title: 'Thermal Camera RDF Fuel Pile Heat Monitoring',
      metric: '153.8°C vs 16.6°C',
      detail: 'Identified a 153.8°C peak hotspot in an RDF storage pile against a 16.6°C ambient baseline before open ignition occurred.',
    },
    {
      location: 'Workshop, Pump Hall & Open Yard',
      title: 'Early Fire, Smoke Plume & PPE + Face ID',
      metric: 'Instant Alert',
      detail: 'Flags open-yard flames, indoor smoke plumes near heavy pumps and machinery, and links live PPE violations to named worker records.',
    },
    {
      location: 'Boiler Area & Perimeter Wall BR2',
      title: 'Restricted Zone & Perimeter Trespassing Geofencing',
      metric: 'Zero Blind Spots',
      detail: 'Triggers digital boundary alerts when personnel enter restricted boiler danger zones or cross outer site perimeter walls.',
    },
  ],
};

export interface SmartAttendanceComparisonRow {
  point: string;
  inHouse: string;
  cloud: string;
}

export const SMART_ATTENDANCE_DATA = {
  eyebrow: 'Smart Workplace Solution · Executive HR Proposal',
  title: 'Smart Employee Attendance & HR Reporting',
  tagline: '100% In-House & Private · Zero Monthly Subscription Fees · Uses Existing Security Cameras',
  summary:
    'Save HR time, ensure accurate payroll, and track staff attendance across all branches automatically—replacing fingerprint punch machines with photo-verified camera attendance kept strictly on private company servers.',
  savingsMetrics: [
    { value: '100%', label: 'Real Attendance Proof', detail: 'Stops colleague sign-ins and proxy punching completely.' },
    { value: '80%', label: 'Less Paperwork Time', detail: 'Automatic daily work hour totals and instant shift summaries.' },
    { value: '$0', label: 'Monthly Software Fees', detail: 'One-time lifetime purchase with no per-employee monthly charges.' },
  ],
  challengesReplaced: [
    { title: 'Colleague Sign-Ins', detail: 'Eliminates staff clocking in on fingerprint devices for absent colleagues.' },
    { title: 'Manual Time Checks', detail: 'Removes hours wasted resolving attendance and overtime disputes.' },
    { title: 'Hidden Branch Activity', detail: 'Gives HR live visibility into remote store and showroom staffing.' },
  ],
  hrCapabilities: [
    {
      title: 'All Locations on One Screen',
      detail: 'View multiple branches (such as Dokki, Port Said, and Mall of Arabia) together with live camera health alerts and 60-second sync.',
    },
    {
      title: 'Visual Daily Work Timeline & Split Time',
      detail: 'Combines separate visits automatically (e.g., 20m + 30m = 50m) across 08:00 AM–02:00 AM late shifts and ignores door-walk duplicates.',
    },
    {
      title: 'Ready Payroll Files & Quick Photo Check',
      detail: 'Exports 5 one-click payroll formats, calculates daily FTE shift shares, and lets HR verify any entry with staff photo proof.',
    },
    {
      title: '100% Company-Owned Privacy & Roles',
      detail: 'All employee photos and immutable labor-inspection records stay on private company servers with branch-level manager permissions.',
    },
  ],
  setupSteps: [
    { step: '01', title: 'Camera Check', detail: 'Review existing entrance and door camera angles with zero store disruption.' },
    { step: '02', title: 'Add Staff List', detail: 'Upload employee names, roles, and reference photos into the private roster.' },
    { step: '03', title: 'Live Testing', detail: 'Confirm accurate face-matched sign-ins and similarity thresholds.' },
    { step: '04', title: 'Auto Reports', detail: 'Receive daily automated payroll sheets and branch attendance summaries.' },
  ],
  comparison: [
    {
      point: 'Payment Model',
      inHouse: 'One-time lifetime purchase',
      cloud: 'Monthly fee for every employee',
    },
    {
      point: 'Employee Photos & Data',
      inHouse: 'Kept safely inside company servers',
      cloud: 'Uploaded to external cloud servers',
    },
    {
      point: 'Adding New Branches',
      inHouse: 'Covers any new branches easily',
      cloud: 'Extra charges for every new location',
    },
    {
      point: 'Equipment Needed',
      inHouse: 'Works on standard computers & cameras',
      cloud: 'Requires expensive brand-locked devices',
    },
  ] as SmartAttendanceComparisonRow[],
};

export const RETAIL_COMMAND_DATA = {
  eyebrow: 'Virtual Manager Platform · Multi-Branch Retail AI',
  title: 'Retail Command & Virtual Manager',
  tagline: 'Real-time visibility, true conversion, and AI oversight across 10 to 50+ store branches',
  summary:
    'Unifies dual-camera computer vision attendance with direct Point of Sale (POS) synchronization—subtracting on-duty staff from raw footfall to reveal true shopper conversion, Average Order Value (AOV), and executive branch actions.',
  blindSpotsSolved: [
    {
      index: '01',
      title: 'Footfall Contamination',
      detail: 'Stops employee entries, exits, and shift movement from inflating potential customer traffic counts.',
    },
    {
      index: '02',
      title: 'Demographic Disconnect',
      detail: 'Connects real-time visitor demographics (age, gender, repeat traffic) directly to final POS receipts.',
    },
    {
      index: '03',
      title: 'Conversion Blindness',
      detail: 'Delivers real-time store-level conversion rates so shift performance and campaign efficacy are measurable.',
    },
  ],
  architecturePillars: [
    {
      index: '01',
      title: 'Dual-Camera HR & In-Store Attendance',
      subtitle: 'Dedicated entrance & exit dual cameras',
      detail: 'Real-time employee detection, automated attendance logging, and a continuous headcount of on-duty staff inside each store.',
    },
    {
      index: '02',
      title: 'True Customer Footfall Extraction',
      subtitle: 'Algorithmic subtraction engine',
      detail: 'Active staff are filtered out of total ingress and egress, giving clean metrics on unique visitors, gender split, and repeat visits.',
    },
    {
      index: '03',
      title: 'POS System Integration',
      subtitle: 'Direct synchronization layer',
      detail: 'Live tracking of invoices issued, units sold, average item price, Average Order Value (AOV), and Units Per Transaction (UPT).',
    },
  ],
  conversionFormula: 'True Conversion Rate = Total Invoices Issued ÷ (Total Footfall − On-Duty Staff Entries)',
  virtualManagerCapabilities: [
    {
      index: '01',
      title: 'Consolidated Multi-Store Dashboard',
      detail: 'Centralized real-time view of gross revenue, purified foot traffic, active staff ratios, and operational bottlenecks across every location.',
    },
    {
      index: '02',
      title: 'Intelligent Insights & Recommendations',
      detail: 'Automated anomaly alerts—such as high traffic with low conversion or peak-hour staff shortages—plus daily prescriptive actions for managers.',
    },
    {
      index: '03',
      title: 'Performance Benchmarking',
      detail: 'Cross-branch comparison of conversion efficiency, basket metrics, and shift productivity across identical operating windows.',
    },
  ],
  businessImpact: [
    { index: '01', title: 'Conversion Optimization', detail: 'Identifies underperforming shifts for targeted sales training, staff re-allocation, and optimized floor coverage.' },
    { index: '02', title: 'Workforce Optimization', detail: 'Eliminates time fraud and proxy punching while aligning rosters with historical and predicted traffic surges.' },
    { index: '03', title: 'Basket Size Expansion', detail: 'Cross-references live promotions against visitor demographics to maximize Average Order Value (AOV).' },
    { index: '04', title: 'Bottom-Line Value Creation', detail: 'Delivers immediate ROI by reducing labor wastage, stopping leakage, and raising net conversion yield per branch.' },
  ],
};

export const ECOSYSTEM_SERVICES: EcosystemService[] = [
  {
    id: 'carrot-vision',
    index: '01',
    category: 'Industrial HSE & Video AI',
    name: 'Carrot Vision AI',
    partner: 'The Automated QHSE Engineer · 100% On-Site',
    headline: 'The leading QHSE management system based on CCTV cameras—monitoring 24/7 with 18+ safety checks',
    summary:
      'Trusted by Heidelberg Materials, Orascom CPD, Arabian Cement, and Powerhouse. Connects to existing CCTV and runs 100% locally on-site—pairing PPE, fall, forklift, fire/smoke, thermal, and crane-zone detections with worker Face ID and visual RCA/CAPA reporting.',
    highlights: [
      'Worker Safety & Habits — PPE (hard hats, vests, gloves, goggles, boots), approved coveralls, fall detection ("Man Down"), phone distraction, seat belt, smoking & CO',
      'Critical Hazards & Thermal — early flame and smoke plume alerts, gas/vapor warnings, and thermal hotspot tracking (e.g., 153.8°C RDF pile detection before ignition)',
      'Zones, Cranes & Forklifts — restricted zone headcount/time rules, workers under hanging crane loads, forklift speed/aisle safety, perimeter trespassing & camera sabotage',
      '100% On-Site Control & Standards — local plant servers (footage never leaves site), Face ID violator matching, Email/WhatsApp/PLC triggers, supporting PTW, LOTO, COSHH & ALARP KPIs',
    ],
    metrics: [
      { value: '18+', label: 'QHSE checks (14+ modules)' },
      { value: '100%', label: 'On-site server security' },
    ],
    vendorLogos: [{ src: '/assets/partners/carrot-vision.png', alt: 'Carrot Vision AI logo' }],
    image: {
      src: '/src/assets/images/solution_carrot_vision_1794865969929.jpg',
      alt: 'Carrot Vision QHSE computer vision monitoring PPE compliance and overhead crane safety inside an industrial plant',
    },
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
    image: {
      src: '/src/assets/images/solution_makkook_dios_1794865969666.jpg',
      alt: 'Makkook DIOS optimization across logistics truck bays, warehouse inventory, and automated production conveyors',
    },
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
    image: {
      src: '/src/assets/images/solution_gsd_docai_1794865969909.jpg',
      alt: 'GSD-DocAi high-speed document scanning, neural OCR indexing, and digital approval workflows in an enterprise office',
    },
  },
  {
    id: 'gsd-ai-attendance',
    index: '07',
    category: 'Smart Workplace & HR AI',
    name: 'Smart Employee Attendance & HR Reporting',
    partner: '100% In-House & Private · $0 Monthly Fees',
    headline: 'Automatic multi-branch staff attendance and payroll reporting on existing security cameras',
    summary:
      'Replaces fingerprint punch machines with photo-verified attendance across every branch on one screen—running 100% on private company servers with zero monthly software fees and 5 one-click payroll report formats.',
    highlights: [
      'Stops Colleague Sign-Ins — 100% photo-verified attendance proof eliminating proxy punching and manual time disputes',
      'Split-Visit & Late-Shift Math — combines separate entries (20m + 30m = 50m), supports shifts past midnight, and ignores door-walk duplicates',
      'Multi-Branch Live HR Screen — 60-second camera sync, live branch headcounts, peak rush-hour charts, and camera health alerts',
      'In-House Privacy & Payroll — 5 one-click payroll exports, role-based branch permissions, and immutable records kept strictly inside your servers',
    ],
    metrics: [
      { value: '100%', label: 'Real attendance proof' },
      { value: '80%', label: 'Less paperwork time' },
      { value: '$0', label: 'Monthly software fees' },
    ],
  },
  {
    id: 'retail-command',
    index: '08',
    category: 'Retail AI & Virtual Manager',
    name: 'Retail Command & Virtual Manager',
    partner: 'Dual-Camera HR + POS Sync · 10–50+ Branches',
    headline: 'Real-time store visibility, staff-subtracted true conversion, and AI oversight across every branch',
    summary:
      'Pairs dedicated entrance/exit computer vision cameras with live POS synchronization—filtering active staff out of footfall to deliver True Conversion Rate, AOV, UPT, and automated Virtual Manager recommendations.',
    highlights: [
      'Dual-Camera HR & Attendance — automated entrance/exit staff detection and continuous headcount of on-duty employees in-store',
      'True Customer Footfall — algorithmic subtraction removes on-duty staff entries for clean unique visitors, gender split, and repeat traffic',
      'Live POS Synchronization — tracks invoices issued, units sold, average item price, Average Order Value (AOV), and Units Per Transaction (UPT)',
      'Virtual Manager Command — multi-store dashboard, high-traffic/low-conversion anomaly alerts, prescriptive supervisor actions & branch benchmarking',
    ],
    metrics: [
      { value: 'True CR', label: 'Invoices ÷ (Footfall − Staff)' },
      { value: '10–50+', label: 'Multi-branch retail scale' },
    ],
  },
];

export const VERTICAL_SOLUTIONS: VerticalSolution[] = [
  {
    id: 'industrial',
    name: 'Industrial & Manufacturing',
    tagline: 'Carrot Vision QHSE AI: PPE, coveralls, fall detection, forklifts, cranes & thermal monitoring',
    summary:
      'Turn existing CCTV into a 24/7 automated QHSE engineer—running 100% on-site to protect workers, overhead cranes, forklifts, boiler zones, and RDF fuel piles while supporting PTW, LOTO, COSHH, and ALARP safety KPIs.',
    challenges: [
      'Overloaded QHSE teams managing manual inspections, dusty packing lines, and slow incident reporting',
      'PPE & coverall gaps, phone distraction, smoking, CO/gas risks, and worker falls ("Man Down")',
      'Forklift aisle speed hazards, workers under hanging crane loads, and boiler red-zone breaches',
      'Early fire/smoke hazards, 153.8°C RDF thermal hotspots, perimeter trespassing, and camera tampering',
    ],
    modules: [
      { title: 'PPE, Uniform & Habit Detection', detail: 'Real-time checks for hard hats, vests, gloves, goggles, boots, site coveralls, smoking, phone use, and seat belts.' },
      { title: 'Fall, Forklift & Crane Safety', detail: 'Man-Down collapse alerts, forklift speed/distance monitoring, hanging crane load rules, and red-zone triggers.' },
      { title: 'Fire, Smoke, Gas & Thermal AI', detail: 'Early flame and smoke plume alerts, gas/vapor warnings, and thermal RDF/kiln hotspot tracking before ignition.' },
      { title: 'Face ID Evidence & On-Site Control', detail: '100% on-site servers pairing violation snapshots with worker Face ID, RCA/CAPA logs, Email, WhatsApp & PLC triggers.' },
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
    roiMetric: '3 Plants Automated · 153.8°C Thermal Guard · 0 Camera Replacement',
    iconKey: 'cement',
    title: 'How a Global Cement Group Automated HSE Across 3 Egyptian Plants',
    challenge:
      'Rolled out across three high-heat cement facilities operated by Heidelberg Materials in Egypt—requiring 24/7 oversight of dusty packing lines (Packer M-C 4), RDF fuel storage piles, restricted zones, and kilns without replacing existing CCTV.',
    solutionPoints: [
      'PPE helmet and vest verification on dusty cement packing lines (Packer M-C 4) with zero camera replacement',
      'Thermal camera RDF fuel pile monitoring (Suez-Th3-Thermal) catching 153.8°C hotspots vs. 16.6°C ambient baseline before ignition',
      'Restricted zone boundary alerts, early fire/smoke plume detection, and material segment counting on local on-site servers',
    ],
    outcome: 'Unified 100% on-site QHSE AI backbone delivering group-level HSE KPIs and visual RCA visibility across all three plants.',
  },
  {
    id: 'heavy-manufacturing',
    sector: 'Heavy Manufacturing',
    location: 'Plant Floor, Boiler & Crane Bays · Egypt',
    roiMetric: '24/7 Crane & Boiler AI · Face ID Evidence Logs',
    iconKey: 'manufacturing',
    title: 'How Heavy Manufacturers Secured Overhead Cranes & Boiler Red Zones on Existing CCTV',
    challenge:
      'Overhead cranes moving heavy loads above operators alongside boiler rooms and high-pressure manifolds where intermittent manual patrols could not ensure continuous 24/7 compliance.',
    solutionPoints: [
      'Hanging crane load alerts, boiler area digital boundary geofencing, and perimeter BR2 trespassing protection',
      'Early fire and smoke plume detection across open work yards and high-risk production corridors',
      'Automated PPE violation alerts paired with worker Face ID matching and Events Module CAPA assignment',
    ],
    outcome: 'Shifted plant safety from reactive manual spot checks to automated, evidence-backed LTIFR and TRIR reduction.',
  },
  {
    id: 'mechanical-workshops',
    sector: 'Mechanical & Maintenance Workshops',
    location: 'Maintenance Bays & Pump Halls · Egypt',
    roiMetric: 'Instant Flame & Smoke Alerts · 100% On-Site Processing',
    iconKey: 'workshop',
    title: 'Cutting Workshop Fire, Smoke & PPE Hazards Without Adding Guard Headcount',
    challenge:
      'Industrial pump halls, fabrication shops, and welding maintenance bays face rapid smoke plumes, spark-ignition hazards, lone-worker falls, and inconsistent glove/goggle usage across shifts.',
    solutionPoints: [
      'Sub-second optical fire and smoke plume detection across enclosed pump & motor halls and open maintenance yards',
      'PPE gear checks (hard hats, goggles, gloves, high-vis vests) plus Man-Down fall alerts and restricted smoking enforcement',
      'Direct Email, WhatsApp, and control-room alerts routing tagged evidence snapshots straight to shift HSE supervisors',
    ],
    outcome: 'Eliminated blind spots across high-risk maintenance shifts while keeping sensitive plant video 100% inside local servers.',
  },
  {
    id: 'gas-fleet',
    sector: 'Oil, Gas & Fleet Logistics',
    location: 'Commercial Hazmat Truck Fleet · Egypt',
    roiMetric: '3-Channel Cab + Road AI · Real-Time Driver Intervention',
    iconKey: 'fleet',
    title: 'Preventing Fatigue & Distraction Accidents Across a National Gas Transport Fleet',
    challenge:
      'Eliminating highway collision risks caused by driver microsleep, eye closure, handheld phone use, or unsafe following distances before incidents become safety liabilities.',
    solutionPoints: [
      'In-cabin Driver Monitoring System (DMS) detecting eye-closing, yawning, phone use, smoking, and biometric driver Face ID',
      'Forward-facing ADAS co-pilot issuing Forward Collision Warning (FCW), lane-departure drift, and pedestrian alerts',
      'Rugged 3-channel MDVR telemetry syncing cab, front-road, and exterior feeds to central fleet HSE dispatch',
    ],
    outcome: 'Delivered instant audible in-cab intervention integrated directly into the operator’s existing fleet tracking platform.',
  },
  {
    id: 'fashion-retail',
    sector: 'Multi-Branch Fashion Retail',
    location: 'National Store Network · Egypt',
    roiMetric: 'Staff-Filtered True Footfall · Automated POS & Branch Exports',
    iconKey: 'retail',
    title: 'How a Multi-Branch Fashion Retailer Isolated True Customer Footfall & Conversion',
    challenge:
      'Multi-branch fashion stores needed verified daily shopper counts, age/gender demographics, and clean conversion ratios without store associates inflating door traffic.',
    solutionPoints: [
      'Face recognition automatically subtracting on-duty retail staff from entrance and exit customer counts',
      'Age, gender, and repeat-visit breakdown aggregated across branches on a unified Virtual Retail Manager console',
      'One-click CSV, Excel, and PDF reporting paired with automated multi-branch HR attendance verification',
    ],
    outcome: 'Converted existing store CCTV into a zero-disruption retail analytics and attendance platform across all locations.',
  },
];

export const PARTNERS: PartnerItem[] = [
  {
    name: 'Carrot Vision',
    domain: 'Industrial QHSE AI · 100% On-Site',
    summary:
      'GSD Technologies is an authorized regional integrator for Carrot Vision across Egypt and MEA industrial plants. We deploy and engineer its 18+ on-site CCTV safety checks—including PPE, fire/smoke, thermal RDF hotspots, forklifts, cranes, and PLC interlocks—on existing factory cameras.',
    logoSrc: '/assets/partners/carrot-vision.png',
    ecosystemServiceId: 'carrot-vision',
    ecosystemCta: 'Explore Carrot Vision in Ecosystem',
  },
  {
    name: 'Eocortex',
    domain: 'Open-Platform Video Analytics VMS',
    summary:
      'As an official Eocortex system partner in Egypt and MEA, GSD delivers hardware-agnostic computer vision across 99% of ONVIF IP cameras. Our engineering team integrates Eocortex’s 20+ native AI modules—spanning face recognition, LPR barriers, crowd analytics, and safety alerts—for enterprise control rooms.',
    logoSrc: '/assets/partners/eocortex.png',
    ecosystemServiceId: 'eocortex',
    ecosystemCta: 'Explore Eocortex Platform in Ecosystem',
  },
  {
    name: 'Makkook',
    domain: 'Decision Intelligence OS (DIOS)',
    summary:
      'GSD partners with Makkook to deliver algorithmic decision intelligence across Egyptian and MEA manufacturing, supply chain, and retail enterprises. We configure Makkook’s 60+ optimization engines to automate line scheduling, safety stock allocation, and 98%+ on-time multi-drop fleet dispatch.',
    logoSrc: '/assets/partners/makkook.png',
    ecosystemServiceId: 'makkook-dios',
    ecosystemCta: 'Explore Makkook DIOS in Ecosystem',
  },
  {
    name: 'Aipix',
    domain: 'Cloud VSaaS & Smart Intercom',
    summary:
      'GSD serves as an authorized deployment partner for Aipix Cloud VSaaS across telecom operators, ISPs, and commercial property developers in MEA. We implement white-label cloud video recording, native billing integration, biometric smart intercoms, and edge AI analytics with zero NVR hardware.',
    logoSrc: '/assets/partners/aipix.png',
    ecosystemServiceId: 'aipix',
    ecosystemCta: 'Explore Aipix Suite in Ecosystem',
  },
  {
    name: 'AIS',
    domain: 'Artificial Intelligence Systems',
    summary:
      'As an authorized regional partner for AIS, GSD embeds edge-AI computer vision algorithms into high-reliability industrial and commercial fleet deployments. Our Cairo engineers calibrate AIS driver-monitoring and facility-safety models for demanding regional lighting and operating conditions.',
    logoSrc: '/assets/partners/ais.png',
    ecosystemServiceId: 'vehicle-ai',
    ecosystemCta: 'Explore Vehicle & Edge AI in Ecosystem',
  },
  {
    name: 'Howen',
    domain: 'Vehicle AI & Mobile DVR Hardware',
    summary:
      'GSD is an authorized Egypt & MEA solution partner for Howen’s rugged commercial fleet hardware and in-cab AI dashcams. We supply, install, and integrate Howen 3-channel MDVRs with DMS fatigue alerts and forward ADAS collision prevention for oil, gas, and logistics fleets.',
    logoSrc: '/assets/partners/howen.png',
    ecosystemServiceId: 'vehicle-ai',
    ecosystemCta: 'Explore DMS & ADAS Fleet AI in Ecosystem',
  },
  {
    name: 'Claromentis',
    domain: 'Digital Workplace & Document AI',
    summary:
      'GSD delivers Claromentis across Egypt and MEA as an authorized enterprise digital workplace and workflow automation partner. Combined with GSD-DocAi, we deploy ISO 27001:2022 & HIPAA-aligned intranets, SLA document approvals, and compliance portals in four weeks.',
    logoSrc: '/assets/partners/claromentis.jpg',
    ecosystemServiceId: 'gsd-docai',
    ecosystemCta: 'Explore GSD-DocAi & Workplace in Ecosystem',
  },
  {
    name: 'Augnito',
    domain: 'Healthcare Clinical Voice AI',
    summary:
      'GSD is an authorized regional implementation partner for Augnito clinical speech recognition across Egyptian hospitals and medical groups. We integrate real-time medical voice-to-EHR reporting directly into radiology, ICU, and outpatient diagnostic workflows.',
    logoSrc: '/assets/partners/augnito.png',
    ecosystemServiceId: 'gsd-docai',
    ecosystemCta: 'Explore Healthcare & DocAi in Ecosystem',
  },
  {
    name: 'TSPlus',
    domain: 'Secure Remote Access & App Publishing',
    summary:
      'As an authorized TSPlus partner in Egypt and MEA, GSD secures remote application delivery and encrypted terminal access for multi-branch enterprises. We pair TSPlus with GSD-DocAi and Smart Attendance servers so branch teams work safely from private on-premise infrastructure.',
    logoSrc: '/assets/partners/tsplus.png',
    ecosystemServiceId: 'gsd-docai',
    ecosystemCta: 'Explore Workplace & Remote Access in Ecosystem',
  },
];
