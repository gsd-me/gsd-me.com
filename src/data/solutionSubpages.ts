import type {SolutionSubpageId} from '../seo/sectionMeta';

export interface SolutionSubpageData {
  id: SolutionSubpageId;
  slug: string;
  personaBadge: string;
  shortTitle: string;
  hubSummary: string;
  eyebrow: string;
  h1: string;
  lead: string;
  painPointsHeading: string;
  capabilitiesHeading: string;
  heroImage: {
    src: string;
    alt: string;
  };
  platforms: {
    name: string;
    role: string;
    logoSrc?: string;
  }[];
  kpis: {
    value: string;
    label: string;
    context: string;
  }[];
  personaPainPoints: {
    index: string;
    challenge: string;
    resolution: string;
  }[];
  capabilities: {
    category: string;
    title: string;
    detail: string;
  }[];
  deploymentProof: {
    sector: string;
    client: string;
    outcome: string;
  }[];
  demoPreselect: string;
  includeCarrotDashboard?: boolean;
}

export const SOLUTION_SUBPAGES: SolutionSubpageData[] = [
  {
    id: 'sol-industrial-hse',
    slug: '/solutions/industrial-hse-video-analytics',
    personaBadge: 'HSE, Plant & Operations Managers',
    shortTitle: 'Industrial HSE & Video Analytics',
    hubSummary:
      'PPE compliance, early fire & smoke, thermal RDF hotspots, overhead crane red zones, forklift rules & PLC machine triggers via Carrot Vision.',
    eyebrow: 'Industrial & Manufacturing · Carrot Vision AI Egypt',
    h1: 'AI HSE Compliance, PPE Detection Camera System & Overhead Crane Safety Monitoring in Egypt',
    lead: 'Turn existing plant CCTV and thermal cameras into a 24/7 automated QHSE engineer running 100% locally on site servers across Egypt and Saudi Arabia—enforcing PPE compliance, industrial fire and smoke video analytics, crane exclusion zones, and direct PLC interlocks.',
    painPointsHeading:
      'Industrial fire and smoke video analytics & overhead crane safety monitoring Egypt without replacing CCTV',
    capabilitiesHeading:
      'PPE detection camera system, thermal RDF hotspot prevention & PLC machine interlocks',
    heroImage: {
      src: '/src/assets/images/solution_carrot_vision_1794865969929.jpg',
      alt: 'Carrot Vision industrial HSE AI monitoring PPE compliance and overhead crane safety inside a manufacturing plant',
    },
    platforms: [
      {
        name: 'Carrot Vision AI',
        role: 'Primary On-Site QHSE Engine · 18+ Checks',
        logoSrc: '/assets/partners/carrot-vision.png',
      },
      {
        name: 'Eocortex VMS',
        role: 'Multi-Site Industrial Video Integration',
        logoSrc: '/assets/partners/eocortex.png',
      },
    ],
    kpis: [
      {
        value: '18+ AI',
        label: 'QHSE Vision Checks',
        context: 'PPE, fire/smoke, thermal, cranes & forklifts',
      },
      {
        value: '100%',
        label: 'On-Site Local Processing',
        context: 'Video footage never leaves your plant network',
      },
      {
        value: '153.8°C',
        label: 'Early Thermal Detection',
        context: 'Flags RDF fuel hotspots before open ignition',
      },
      {
        value: 'PLC + WA',
        label: 'Instant Trigger Workflows',
        context: 'Control room, Email, WhatsApp & machine interlocks',
      },
    ],
    personaPainPoints: [
      {
        index: '01',
        challenge: 'Dusty packing lines and manual patrols miss PPE non-compliance on night and weekend shifts.',
        resolution:
          '24/7 automated checks on existing ONVIF CCTV verify hard hats, safety vests, gloves, goggles, boots, and coveralls—even in high-dust cement environments.',
      },
      {
        index: '02',
        challenge: 'High-heat kilns, boiler rooms, and RDF piles risk unnoticed smoldering before visible flames appear.',
        resolution:
          'Optical flame and smoke plume AI combined with thermal camera hotspot alerts catch abnormal heat spikes (e.g., 153.8°C vs. 16.6°C ambient) ahead of ignition.',
      },
      {
        index: '03',
        challenge: 'Workers walking beneath overhead hanging crane loads or inside forklift aisles create severe LTIFR exposure.',
        resolution:
          'Geofenced red-zone rules track headcount, dwell limits, crane hooks, and forklift pedestrian clearance—sending warning sirens or direct PLC stop signals.',
      },
      {
        index: '04',
        challenge: 'Incident audits stall because raw CCTV clips are anonymous and disconnected from safety tickets.',
        resolution:
          'Events Module pairs cropped incident snapshots with worker Face ID matches and visual Root Cause Analysis (RCA) & CAPA logs for PTW, LOTO, COSHH, and ALARP tracking.',
      },
    ],
    capabilities: [
      {
        category: 'Worker PPE & Ergonomics',
        title: 'PPE, Coveralls, Smoking, Phone & Man-Down AI',
        detail:
          'Real-time verification of helmets, high-vis vests, gloves, safety glasses, and coveralls alongside fall detection ("Man Down"), restricted-zone smoking, and mobile phone distraction.',
      },
      {
        category: 'Critical Thermal & Fire',
        title: 'Fire, Smoke Plumes, CO/Gas & RDF Thermal Monitoring',
        detail:
          'Early optical fire and smoke detection paired with radiometric thermal monitoring for RDF storage piles, substations, chemical warehouses, and boiler halls.',
      },
      {
        category: 'Cranes, Forklifts & Perimeter',
        title: 'Overhead Crane Zones, Forklift Speed & Fence Trespassing',
        detail:
          'Prevents workers from standing beneath suspended crane loads, enforces warehouse forklift aisle rules, and flags boundary wall trespassing or camera tampering.',
      },
      {
        category: 'Industrial Control & PLC',
        title: 'Direct Machine PLC Interlocks & On-Premise Privacy',
        detail:
          'Runs 100% locally on site servers with high server-density GPU efficiency and pushes instant alerts to control rooms, Email, WhatsApp, and PLC automation relays.',
      },
    ],
    deploymentProof: [
      {
        sector: 'Cement Manufacturing',
        client: 'Heidelberg Materials (Kattameya, Suez & Helwan) · Arabian Cement',
        outcome:
          'Deployed 24/7 PPE verification on dusty cement packing lines (Packer M-C 4) and 153.8°C RDF thermal monitoring across three Egyptian plants.',
      },
      {
        sector: 'Heavy Construction & Power',
        client: 'Orascom CPD · Powerhouse',
        outcome:
          'Automated overhead crane exclusion zones, boiler red-zone geofencing, and Face ID-linked safety event logs without replacing existing CCTV.',
      },
    ],
    demoPreselect: 'Carrot Vision AI — Industrial HSE & Video AI',
    includeCarrotDashboard: true,
  },
  {
    id: 'sol-retail-malls-compounds',
    slug: '/solutions/retail-malls-smart-compounds',
    personaBadge: 'Operations, Security & Commercial Managers',
    shortTitle: 'Retail, Malls & Smart Compounds',
    hubSummary:
      'POS sync, True Conversion Rate, footfall heatmaps, Smart Employee Attendance, LPR gate automation & perimeter security via Aipix & Eocortex.',
    eyebrow: 'Commercial Real Estate, Malls & Multi-Branch Retail',
    h1: 'Retail Footfall Counting, LPR Gate Control & ANPR Camera System in Egypt',
    lead: 'Unify POS camera integration, mall heatmap video analytics, customer demographic camera AI, and automated LPR gate control across retail chains, shopping malls, and gated compounds in Cairo, Egypt, and Saudi Arabia.',
    painPointsHeading:
      'ONVIF AI video analytics Egypt for POS camera integration, customer demographics & perimeter intrusion',
    capabilitiesHeading:
      'Mall heatmap video analytics, ANPR camera system Cairo & Smart Employee Attendance',
    heroImage: {
      src: '/src/assets/images/solutions_smart_facility_1794852240500.jpg',
      alt: 'Smart commercial corridor monitored by ceiling-mounted AI security cameras for visitor counting and access control',
    },
    platforms: [
      {
        name: 'Retail Command & Virtual Manager',
        role: 'POS Sync + Staff-Filtered Conversion AI',
      },
      {
        name: 'Eocortex Platform',
        role: 'LPR Gate, Crowd Density & Watchlists',
        logoSrc: '/assets/partners/eocortex.png',
      },
      {
        name: 'Aipix Suite',
        role: 'Cloud VSaaS & Smart Intercom Access',
        logoSrc: '/assets/partners/aipix.png',
      },
    ],
    kpis: [
      {
        value: 'True CR',
        label: 'Staff-Filtered Conversion',
        context: 'Invoices ÷ (Total Footfall − On-Duty Staff)',
      },
      {
        value: '10–50+',
        label: 'Multi-Branch Scale',
        context: 'Single command screen for retail & properties',
      },
      {
        value: '99%',
        label: 'ONVIF IP Compatibility',
        context: 'Automated LPR barriers & existing CCTV feeds',
      },
      {
        value: '$0/mo',
        label: 'In-House Attendance Option',
        context: 'One-time purchase for private HR & shift rosters',
      },
    ],
    personaPainPoints: [
      {
        index: '01',
        challenge: 'In-store employee entries inflate raw door counters and distort branch conversion metrics.',
        resolution:
          'Dual entrance/exit cameras detect on-duty employees automatically and subtract staff traffic from customer footfall to calculate True Conversion Rate alongside POS AOV and UPT.',
      },
      {
        index: '02',
        challenge: 'Regional managers lack live visibility into queue bottlenecks, rush-hour staffing gaps, and zone popularity.',
        resolution:
          'Virtual Retail Manager tracks aisle heatmaps, queue length thresholds, and visitor demographics across every branch—issuing automated supervisor recommendations.',
      },
      {
        index: '03',
        challenge: 'Residential compound gates and mall parking barriers suffer manual log delays and unauthorized vehicle entry.',
        resolution:
          'High-speed License Plate Recognition (LPR) opens barriers automatically for residents and registered vehicles while logging every ingress/egress event.',
      },
      {
        index: '04',
        challenge: 'Fingerprint attendance machines allow colleague proxy punching across remote retail branches.',
        resolution:
          'Smart Employee Attendance pairs existing entrance cameras with photo-verified Face ID sign-ins and 5 one-click payroll exports kept strictly on private company servers.',
      },
    ],
    capabilities: [
      {
        category: 'Retail POS & Conversion AI',
        title: 'Dual-Camera Footfall Extraction & POS Synchronization',
        detail:
          'Links clean visitor counts, repeat visits, and demographic splits directly with live POS invoices, Average Order Value (AOV), and Units Per Transaction (UPT).',
      },
      {
        category: 'Multi-Store HR & Payroll',
        title: 'Smart Employee Attendance & Split-Shift Calculation',
        detail:
          'Combines split store visits automatically (e.g., 20m + 30m = 50m) across late shifts up to 02:00 AM with branch-level permissions and immutable audit trails.',
      },
      {
        category: 'Mall Crowd & Watchlists',
        title: 'Zone Heatmaps, Shelf Alerts & VIP / Blacklist Recognition',
        detail:
          'Guides mall leasing and retail merchandising using corridor heatmaps while notifying security teams on VIP arrivals, repeat shoplifters, or overcrowding.',
      },
      {
        category: 'Compounds & Cloud VSaaS',
        title: 'LPR Gate Automation, Smart Intercom & Perimeter AI',
        detail:
          'Aipix and Eocortex automate compound barriers, temporary guest QR passes, fence-line trespassing alerts, and zero-latency WebRTC mobile video feeds.',
      },
    ],
    deploymentProof: [
      {
        sector: 'Multi-Branch Fashion Retail',
        client: 'Mlameh Fashion Stores',
        outcome:
          'Deployed dual-camera staff-subtracted customer counting, branch attendance, and Virtual Retail Manager reporting across multiple retail stores.',
      },
      {
        sector: 'Hospitality & Resorts',
        client: 'Dreams Beach Resort · Sharm El-Sheikh',
        outcome:
          'Implemented smart perimeter surveillance, access intelligence, and facility safety monitoring across resort gates and public zones.',
      },
    ],
    demoPreselect: 'Retail Command & Virtual Manager — Retail AI & Virtual Manager',
  },
  {
    id: 'sol-fleet-dms',
    slug: '/solutions/fleet-driver-monitoring-dms',
    personaBadge: 'Logistics, Transport & Fleet Managers',
    shortTitle: 'Fleet & AI Driver Monitoring (DMS)',
    hubSummary:
      'In-cabin AI dashcams detecting driver fatigue, microsleep, phone use & seatbelt gaps paired with forward ADAS collision alerts via Howen & AIS.',
    eyebrow: 'Commercial Fleets, Gas Transport & Heavy Logistics',
    h1: 'AI Fleet Driver Monitoring Egypt & DMS Dashcam Fleet Safety',
    lead: 'Protect drivers, cargo, and highways across Egypt and Saudi Arabia with rugged in-cabin DMS dashcam fleet safety and forward-facing ADAS co-pilots—catching fatigue, microsleep, mobile phone use, and tailgating in real time.',
    painPointsHeading:
      'In-cabin DMS dashcam fleet safety preventing fatigue, microsleep & distraction on Egyptian routes',
    capabilitiesHeading:
      'AI fleet driver monitoring Egypt: biometric driver Face ID, ADAS & 3-channel telemetry',
    heroImage: {
      src: '/src/assets/images/stories_cement_fleet_1794852242743.jpg',
      alt: 'Commercial heavy truck logistics yard and industrial transport fleet protected by in-cabin AI driver monitoring cameras',
    },
    platforms: [
      {
        name: 'Howen Fleet Hardware',
        role: 'Rugged In-Cab MDVR & Multi-Channel AI Cams',
        logoSrc: '/assets/partners/howen.png',
      },
      {
        name: 'AIS Edge Vision',
        role: 'DMS + ADAS Real-Time Co-Pilot Algorithms',
        logoSrc: '/assets/partners/ais.png',
      },
    ],
    kpis: [
      {
        value: 'DMS+ADAS',
        label: 'Dual Cab & Road AI',
        context: 'Simultaneous driver state & highway risk sensing',
      },
      {
        value: '3-Ch+',
        label: 'Multi-Channel Video',
        context: 'Cab, forward road & cargo/blind-spot feeds',
      },
      {
        value: 'Real-Time',
        label: 'In-Cab Audio Warnings',
        context: 'Corrects fatigue & distraction in milliseconds',
      },
      {
        value: 'Face ID',
        label: 'Biometric Driver Login',
        context: 'Verifies authorized operator at cabin entry',
      },
    ],
    personaPainPoints: [
      {
        index: '01',
        challenge: 'Long-haul fatigue and microsleep cause catastrophic highway rollovers on gas and cement routes.',
        resolution:
          'Infrared in-cabin DMS cameras track eyelid closure, yawning, and head-nodding day or night—triggering immediate audible cab alerts before loss of control.',
      },
      {
        index: '02',
        challenge: 'Handheld mobile phone use, smoking, and distraction happen unseen once trucks leave the depot.',
        resolution:
          'Edge AI classifies phone calls, texting glances, smoking, seat-belt non-compliance, and camera tampering in real time with video evidence clips.',
      },
      {
        index: '03',
        challenge: 'Sudden braking by lead traffic or blind-spot lane drift exposes heavy tankers to rear-end collisions.',
        resolution:
          'Forward-facing ADAS monitors safe headway distance, lane departure drift, forward collision warnings (FCW), and pedestrian proximity.',
      },
      {
        index: '04',
        challenge: 'Dispatchers lack objective driver scorecards and verified operator attribution across rotating shifts.',
        resolution:
          'Biometric Face ID logs the exact driver at shift start and feeds centralized fleet risk scores, route clips, and coaching reports to HSE dispatch.',
      },
    ],
    capabilities: [
      {
        category: 'In-Cabin Driver Monitoring',
        title: 'Fatigue, Microsleep, Phone Use & Distraction Alerts',
        detail:
          'Continuous edge inference inside dark or sunlit cabs detecting eye closure, yawning, head turns away from the windshield, smoking, and handheld phone calls.',
      },
      {
        category: 'Forward Road ADAS',
        title: 'Forward Collision, Lane Departure & Safe Headway AI',
        detail:
          'Tracks time-to-collision against vehicles ahead, un-signaled lane crossings, and vulnerable pedestrians around urban intersections and plant gates.',
      },
      {
        category: 'Biometric Attribution',
        title: 'Driver Face Recognition & Tamper Protection',
        detail:
          'Matches cab entry faces against authorized fleet driver rosters and triggers immediate dispatch alerts if a lens is covered or unplugged.',
      },
      {
        category: 'Fleet Command & Evidence',
        title: '3-Channel Rugged MDVR Clips & HSE Scorecards',
        detail:
          'Synchronizes front-road, in-cab, and side/external camera streams with GPS coordinates for objective incident reconstruction and driver coaching.',
      },
    ],
    deploymentProof: [
      {
        sector: 'Oil, Gas & Hazmat Logistics',
        client: 'Master Gas Commercial Fleet',
        outcome:
          'Equipped heavy gas transport trucks with rugged 3-channel DMS + ADAS video analytics, delivering real-time cab alerts and centralized fleet safety compliance.',
      },
      {
        sector: 'Heavy Materials Transport',
        client: 'Industrial Plant Logistics Operations',
        outcome:
          'Eliminated unverified shift swaps with biometric driver ID and lowered distraction events across highway and plant-yard haulage.',
      },
    ],
    demoPreselect: 'DMS & ADAS AI Driver Camera — Vehicle AI Monitoring',
  },
  {
    id: 'sol-decision-intelligence',
    slug: '/solutions/decision-intelligence-makkook',
    personaBadge: 'COOs, Plant VPs & Supply Chain Heads',
    shortTitle: 'Decision Intelligence (Makkook DIOS)',
    hubSummary:
      '60+ algorithmic optimization engines auto-resolving scheduling, multi-echelon safety stock, route sequencing & retail margin bottlenecks.',
    eyebrow: 'Enterprise Operations · Makkook Decision Intelligence Egypt',
    h1: 'Makkook Decision Intelligence Egypt & AI Production Scheduling OS',
    lead: 'Deploy 60+ algorithmic optimization engines across Egypt and Saudi Arabia for AI production scheduling, multi-echelon inventory, multi-drop vehicle dispatch, and retail replenishment—turning plant and supply constraints into margin gains.',
    painPointsHeading:
      'AI production scheduling, safety stock allocation & fleet dispatch optimization',
    capabilitiesHeading:
      'Makkook decision intelligence Egypt: 60+ production, supply chain, logistics & retail engines',
    heroImage: {
      src: '/src/assets/images/solution_makkook_dios_1794865969666.jpg',
      alt: 'Makkook DIOS algorithmic optimization across logistics truck dispatch bays, warehouse inventory, and automated production lines',
    },
    platforms: [
      {
        name: 'Makkook DIOS',
        role: '60+ Algorithmic Optimization Engines',
        logoSrc: '/assets/partners/makkook.png',
      },
    ],
    kpis: [
      {
        value: '60+',
        label: 'Optimization Engines',
        context: 'Production, Supply Chain, Logistics & Retail suites',
      },
      {
        value: '98%+',
        label: 'On-Time Delivery Target',
        context: 'Dynamic multi-drop route & fleet sequencing',
      },
      {
        value: '4 Suites',
        label: 'End-to-End Scope',
        context: 'From raw material line plans to store shelves',
      },
      {
        value: 'Auto',
        label: 'Constraint Resolution',
        context: 'Replaces brittle spreadsheets with live math',
      },
    ],
    personaPainPoints: [
      {
        index: '01',
        challenge: 'Frequent line changeovers and manual production schedules leave machine capacity underutilized.',
        resolution:
          'Makkook Production Suite sequences optimal batch orders and line assignments automatically—cutting changeover downtime and raw material scrap.',
      },
      {
        index: '02',
        challenge: 'Multi-tier warehouses hold excess working capital in slow SKUs while fast movers still stock out.',
        resolution:
          'Supply Chain Suite models multi-echelon demand forecasts, optimal sourcing rules, and dynamic network safety stock positioning.',
      },
      {
        index: '03',
        challenge: 'Static delivery routing inflates fuel burn and misses tight customer delivery time windows.',
        resolution:
          'Logistics Suite computes real-time vehicle dispatch, load balancing, and multi-drop route sequencing to achieve 98%+ on-time delivery.',
      },
      {
        index: '04',
        challenge: 'Disconnected retail replenishment causes lost shelf sales and reactive discounting.',
        resolution:
          'Retail Suite triggers automated branch replenishment and shelf allocation rules that eliminate stockouts and protect net store gross margins.',
      },
    ],
    capabilities: [
      {
        category: 'Production Suite',
        title: 'Line Scheduling, Changeover & Waste Minimization',
        detail:
          'Balances machine throughput, labor shifts, and tooling constraints to maximize plant OEE while minimizing raw material trim and changeover delays.',
      },
      {
        category: 'Supply Chain Suite',
        title: 'Multi-Echelon Forecasting & Safety Stock Positioning',
        detail:
          'Aligns procurement lead times, regional distribution hubs, and factory capacity under real demand volatility.',
      },
      {
        category: 'Logistics Suite',
        title: 'Dynamic Vehicle Dispatch & Multi-Drop Route Sequencing',
        detail:
          'Optimizes fleet payload utilization, driver hours, and drop order across regional distribution networks to lower fuel cost per ton.',
      },
      {
        category: 'Retail Suite',
        title: 'Automated Store Replenishment & Margin Protection',
        detail:
          'Allocates SKU inventory across multi-branch stores based on velocity and margin contribution rather than static guesswork.',
      },
    ],
    deploymentProof: [
      {
        sector: 'Manufacturing & Distribution',
        client: 'Multi-Plant Enterprise Operations',
        outcome:
          'Replaced manual spreadsheet scheduling with automated constraint solvers spanning line capacity, warehouse stock buffers, and outbound fleet dispatch.',
      },
      {
        sector: 'Multi-Branch Retail & Logistics',
        client: 'Regional Distribution Networks',
        outcome:
          'Improved on-time multi-drop fleet adherence toward 98%+ targets while lowering working capital tied up in safety stock.',
      },
    ],
    demoPreselect: 'Makkook DIOS — Decision Intelligence OS',
  },
];

export const SOLUTION_SUBPAGE_BY_ID: Record<SolutionSubpageId, SolutionSubpageData> =
  SOLUTION_SUBPAGES.reduce(
    (acc, item) => {
      acc[item.id] = item;
      return acc;
    },
    {} as Record<SolutionSubpageId, SolutionSubpageData>,
  );

export function getSolutionSubpageBySlug(pathname: string): SolutionSubpageData | null {
  const normalized = pathname.replace(/\/+$/, '') || '/';
  return SOLUTION_SUBPAGES.find((item) => item.slug === normalized) ?? null;
}
