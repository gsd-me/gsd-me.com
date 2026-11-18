import type {Language} from './LanguageContext';

export interface UiStrings {
  brandAriaLabel: string;
  logoAlt: string;
  nav: {
    home: string;
    about: string;
    ecosystem: string;
    solutions: string;
    caseStudies: string;
    partners: string;
    contact: string;
    customers: string;
    requestDemo: string;
    openMenuAria: string;
    closeMenuAria: string;
    switchToLabel: string;
    switchToAria: string;
  };
  home: {
    eyebrow: string;
    heroH1: string;
    heroLead: string;
    heroExploreEcosystem: string;
    heroCardEyebrow: string;
    heroCardTitle: string;
    directoryEyebrow: string;
    directoryHeading: string;
    directorySubcopy: string;
    directoryCards: {
      id: 'about' | 'ecosystem' | 'solutions' | 'success-stories' | 'partners' | 'contact';
      index: string;
      title: string;
      subtitle: string;
      cta: string;
    }[];
    customersEyebrow: string;
    customersHeading: string;
    customersLink: string;
    bottomCtaEyebrow: string;
    bottomCtaTitle: string;
    bottomCtaBody: string;
    bottomCtaButton: string;
  };
  about: {
    breadcrumb: string;
    eyebrow: string;
    title: string;
    officeHeading: string;
    officeSummary: string;
    missionTitle: string;
    visionTitle: string;
    approachTitle: string;
    customersEyebrow: string;
    customersHeading: string;
    partnersLink: string;
  };
  ecosystem: {
    breadcrumb: string;
    eyebrow: string;
    title: string;
    description: string;
    bannerEyebrow: string;
    bannerTitle: string;
    bannerBadge: string;
    openModuleLabel: string;
    discussPrefix: string;
    deepDiveEyebrow: string;
    deepDiveHeading: string;
    deepDiveTabs: {
      carrot: string;
      attendance: string;
      retail: string;
    };
    carrot: {
      cta: string;
      tabs: {
        architecture: string;
        modules: string;
        standards: string;
        proof: string;
      };
      pillarPrefix: string;
      workflowHeading: string;
      whyHeading: string;
      standardsEyebrow: string;
      standardsHeading: string;
      standardsBadge: string;
      controlPrefix: string;
      proofHeading: string;
    };
    attendance: {
      cta: string;
      tabs: {
        overview: string;
        hrTools: string;
        comparison: string;
      };
      setupHeading: string;
      replacesHeading: string;
      replacesPrefix: string;
      hrPrefix: string;
      tableHeaders: {
        point: string;
        inHouse: string;
        cloud: string;
      };
    };
    retail: {
      cta: string;
      tabs: {
        architecture: string;
        virtualManager: string;
        roi: string;
      };
      trueCrEyebrow: string;
      trueCrTitle: string;
      blindSpotsHeading: string;
      executivePrefix: string;
      roiPrefix: string;
    };
  };
  solutions: {
    breadcrumb: string;
    eyebrow: string;
    title: string;
    description: string;
    sectorFocus: string;
    challengesHeading: string;
    discussPrefix: string;
    discussSuffix: string;
    facilityEyebrow: string;
    subpagesEyebrow: string;
    subpagesHeading: string;
    subpagesCountLabel: string;
    openSubpage: string;
    builtForPrefix: string;
    allHubBack: string;
    bookWalkthrough: string;
    challengesEyebrowPrefix: string;
    challengePrefix: string;
    modulesEyebrow: string;
    evidenceEyebrow: string;
    evidenceHeading: string;
    requestCustomArch: string;
    crossNavEyebrow: string;
    crossNavHeading: string;
    viewAllEcosystem: string;
    exploreSolutionPage: string;
  };
  caseStudies: {
    breadcrumb: string;
    eyebrow: string;
    title: string;
    description: string;
    ctaLabel: string;
    bookPocPrefix: string;
    deployedCapabilities: string;
    bookSelectedPoc: string;
    clientsEyebrow: string;
    clientsHeading: string;
  };
  customers: {
    breadcrumb: string;
    eyebrow: string;
    title: string;
    description: string;
    exploreStoriesLink: string;
  };
  partners: {
    breadcrumb: string;
    eyebrow: string;
    title: string;
    description: string;
  };
  contact: {
    breadcrumb: string;
    eyebrow: string;
    title: string;
    description: string;
    directHeading: string;
    directBody: string;
    emailLabel: string;
    phoneLabel: string;
    hoursLabel: string;
    websiteLabel: string;
    formTitle: string;
    dispatchedTo: string;
    nameLabel: string;
    namePlaceholder: string;
    companyLabel: string;
    companyPlaceholder: string;
    emailFieldLabel: string;
    emailPlaceholder: string;
    phoneFieldLabel: string;
    phonePlaceholder: string;
    solutionLabel: string;
    generalOption: string;
    solutionsSuffix: string;
    pocPrefix: string;
    notesLabel: string;
    notesPlaceholder: string;
    sendViaApp: string;
    sendingPrefix: string;
    sendRequestPrefix: string;
    errors: {
      name: string;
      email: string;
      phone: string;
    };
    confirm: {
      fallbackTitle: string;
      sentTitlePrefix: string;
      fallbackDescPart1: string;
      fallbackDescPart2: string;
      fallbackDescPart3: string;
      sentDescPart1: string;
      sentDescPart2: string;
      sentDescPart3: string;
      sentDescPart4: string;
      notSpecified: string;
      sendNowPrefix: string;
      openCopyInApp: string;
      editDetails: string;
      sendAnother: string;
    };
  };
  footer: {
    description: string;
    pagesHeading: string;
    solutionPagesHeading: string;
    cairoOfficeHeading: string;
    copyright: string;
  };
  common: {
    homeBreadcrumb: string;
    requestDemoDefault: string;
  };
}

export const UI_STRINGS: Record<Language, UiStrings> = {
  en: {
    brandAriaLabel: 'GSD Technologies — Home',
    logoAlt: 'GSD Technologies — Digital Transformation Experts',
    nav: {
      home: 'Home',
      about: 'About',
      ecosystem: 'Ecosystem',
      solutions: 'Solutions',
      caseStudies: 'Case Studies',
      partners: 'Partners',
      contact: 'Contact',
      customers: 'Customers',
      requestDemo: 'Request a Demo',
      openMenuAria: 'Open navigation menu',
      closeMenuAria: 'Close navigation menu',
      switchToLabel: 'العربية',
      switchToAria: 'Switch website language to Arabic',
    },
    home: {
      eyebrow: 'Digital Transformation Experts · 25+ Years MEA Experience',
      heroH1: 'AI HSE Compliance, PPE Detection & Video Analytics in Egypt & MEA',
      heroLead:
        'Turn existing CCTV into a PPE detection camera system with industrial fire and smoke video analytics, overhead crane safety monitoring, LPR gate control, retail footfall counting, DMS dashcam fleet safety, and Makkook decision intelligence across Egypt and Saudi Arabia.',
      heroExploreEcosystem: 'Explore GSD Services Ecosystem',
      heroCardEyebrow: 'Cairo Engineering & Integration Hub',
      heroCardTitle: 'End-to-end AI engines engineered for measurable ROI across Egypt and MEA',
      directoryEyebrow: 'Enterprise Architecture · Egypt & Saudi Arabia',
      directoryHeading: 'Explore GSD Technologies by platform, role, or deployment proof',
      directorySubcopy:
        'Navigate directly to dedicated pages for company background, all 8 AI platforms, vertical blueprints, 5 regional case studies, and authorized partners.',
      directoryCards: [
        {
          id: 'about',
          index: '01',
          title: 'About GSD Technologies Egypt',
          subtitle:
            '25+ years of regional ICT engineering meeting practical enterprise AI—our Mission, Vision, Approach, and enterprise clients.',
          cta: 'Open About Page',
        },
        {
          id: 'ecosystem',
          index: '02',
          title: 'AI Solutions Ecosystem',
          subtitle:
            'Carrot Vision QHSE, Eocortex VMS, Makkook DIOS, Aipix Cloud VSaaS, Vehicle DMS/ADAS, GSD-DocAi, Smart Attendance, and Retail Command.',
          cta: 'Open Ecosystem Page',
        },
        {
          id: 'solutions',
          index: '03',
          title: 'Industry & Role Solutions',
          subtitle:
            'Tailored deployments for Factories, Healthcare, Malls, Smart Compounds & Retail—plus 4 dedicated persona architecture pages.',
          cta: 'Open Solutions Page',
        },
        {
          id: 'success-stories',
          index: '04',
          title: 'Case Studies & POC Proof',
          subtitle:
            '5 verified Egyptian deployments across cement plants, heavy manufacturing, workshops, gas transport fleets, and fashion retail.',
          cta: 'Open Case Studies Page',
        },
        {
          id: 'partners',
          index: '05',
          title: 'Authorized Technology Partners',
          subtitle:
            'Official Egypt & MEA system integration for Carrot Vision, Eocortex, Makkook, Aipix, AIS, Howen, Claromentis, Augnito & TSPlus.',
          cta: 'Open Partners Page',
        },
        {
          id: 'contact',
          index: '06',
          title: 'Contact & Request a Demo / POC',
          subtitle:
            'Reach our Maadi, Cairo engineering headquarters to schedule a tailored technical walkthrough or on-site proof of concept.',
          cta: 'Open Contact Page',
        },
      ],
      customersEyebrow: 'Trusted by Industry Leaders',
      customersHeading: 'Production AI deployments across Egypt & MEA',
      customersLink: 'Read 5 Enterprise Case Studies',
      bottomCtaEyebrow: 'Maadi, Cairo Engineering Hub',
      bottomCtaTitle: 'Ready to transform your operations?',
      bottomCtaBody:
        'Share your site cameras, fleet size, or automation goals with our Cairo team to schedule a live walkthrough or on-site POC.',
      bottomCtaButton: 'Book Technical Demo',
    },
    about: {
      breadcrumb: 'About GSD',
      eyebrow: 'About GSD Technologies Egypt · Maadi, Cairo',
      title: '25+ years of regional ICT leadership meeting practical enterprise AI',
      officeHeading: 'Digital Transformation Experts · Cairo & MEA',
      officeSummary:
        'Headquartered in Maadi, Cairo, our engineering team connects complex manufacturing plants, transport fleets, hospitals, and multi-branch retail operations directly to production-tested computer vision and decision intelligence platforms.',
      missionTitle: 'Our Mission',
      visionTitle: 'Our Vision',
      approachTitle: 'Our Approach',
      customersEyebrow: 'Trusted by Industry Leaders',
      customersHeading: 'Production deployments across Egypt & MEA',
      partnersLink: 'Explore Technology Partners',
    },
    ecosystem: {
      breadcrumb: 'Services Ecosystem',
      eyebrow: 'Our AI Solutions Ecosystem · Egypt & Saudi Arabia',
      title: 'Carrot Vision AI, Eocortex Partner Egypt, Cloud VSaaS & Hardware-Agnostic VMS',
      description:
        'We deploy Cloud VSaaS Middle East, Makkook decision intelligence, AI production scheduling, DMS dashcams, Smart Attendance, and GSD-DocAi with full local engineering.',
      bannerEyebrow: 'Existing CCTV Infrastructure · Zero Hardware Lock-In',
      bannerTitle: 'Real-time PPE verification, crane zone geofencing, and thermal hazard analytics',
      bannerBadge: '99% ONVIF IP Compatible',
      openModuleLabel: 'Open Full Module',
      discussPrefix: 'Discuss',
      deepDiveEyebrow: 'Interactive Platform Specifications',
      deepDiveHeading: 'Deep dive into flagship AI modules',
      deepDiveTabs: {
        carrot: 'Carrot Vision QHSE',
        attendance: 'Smart Employee Attendance',
        retail: 'Retail Command & Virtual Manager',
      },
      carrot: {
        cta: 'Request Carrot Vision Demo',
        tabs: {
          architecture: 'Workflow & Advantages',
          modules: '18+ Safety Modules',
          standards: 'Standards & HSE KPIs',
          proof: 'Control Room & Site Proof',
        },
        pillarPrefix: 'Digital Safety Assistant',
        workflowHeading: 'Simple 4-Step Workflow on Existing Cameras',
        whyHeading: 'Why HSE Leaders Choose Carrot Vision',
        standardsEyebrow: 'Strategic HSE System Benefits',
        standardsHeading:
          'Measurable impact on global safety standards & Proactive, Active, and Predictive HSE KPIs',
        standardsBadge: 'Visual RCA & CAPA Ready',
        controlPrefix: 'Central Control',
        proofHeading: 'Verified Field & Thermal Site Proof',
      },
      attendance: {
        cta: 'Request HR Attendance Demo',
        tabs: {
          overview: 'Savings & 4-Step Setup',
          hrTools: 'Daily HR & Shift Tools',
          comparison: 'In-House vs. Cloud',
        },
        setupHeading: 'Easy Setup in 4 Simple Steps (Zero Disruption)',
        replacesHeading: 'Replaces Fingerprint Punch Machines',
        replacesPrefix: 'Challenge Solved',
        hrPrefix: 'HR & Shift Control',
        tableHeaders: {
          point: 'Comparison Point',
          inHouse: 'Our In-House System',
          cloud: 'Standard Cloud Subscriptions',
        },
      },
      retail: {
        cta: 'Request Virtual Manager Demo',
        tabs: {
          architecture: 'Dual-Camera & POS Architecture',
          virtualManager: 'Virtual Manager Command',
          roi: 'Business Impact & ROI',
        },
        trueCrEyebrow: 'The True Conversion Metric',
        trueCrTitle: 'A verified baseline removing staff entries from total footfall',
        blindSpotsHeading: 'Blind Spots Solved in Multi-Branch Retail',
        executivePrefix: 'Executive Command',
        roiPrefix: 'Operational Discipline',
      },
    },
    solutions: {
      breadcrumb: 'Our Solutions',
      eyebrow: 'Industry Solutions Hub · Egypt & Saudi Arabia',
      title: 'ONVIF AI Video Analytics, LPR Gate Control & Retail Footfall Counting in Egypt',
      description:
        'Turnkey computer vision and decision intelligence blueprints built for high-stakes manufacturing, healthcare, malls, residential compounds, and multi-branch retail.',
      sectorFocus: 'Sector Focus',
      challengesHeading: 'Operational Challenges Solved',
      discussPrefix: 'Discuss',
      discussSuffix: 'Deployment',
      facilityEyebrow: 'Turnkey Facility Intelligence',
      subpagesEyebrow: 'Dedicated Architecture Pages by Role',
      subpagesHeading: 'Explore tailored AI blueprints for your operational mandate',
      subpagesCountLabel: '4 dedicated solution pages · Egypt & MEA',
      openSubpage: 'Open Solution Page',
      builtForPrefix: 'Built for',
      allHubBack: 'All Industry Solutions Hub',
      bookWalkthrough: 'Book Technical Walkthrough',
      challengesEyebrowPrefix: 'Designed for',
      challengePrefix: 'Operational Challenge',
      modulesEyebrow: 'Core Modules & Architecture',
      evidenceEyebrow: 'Field Evidence · Egypt & MEA',
      evidenceHeading: 'Proven regional deployments in this vertical',
      requestCustomArch: 'Request Custom Site Architecture',
      crossNavEyebrow: 'Explore Dedicated Solutions',
      crossNavHeading: 'Targeted AI architectures for other operational teams',
      viewAllEcosystem: 'View Full 8-Platform Services Ecosystem',
      exploreSolutionPage: 'Explore Solution Page',
    },
    caseStudies: {
      breadcrumb: 'Case Studies',
      eyebrow: 'Field Deployments & POC Proof · Egypt & MEA',
      title: 'Verified ROI across 5 Egyptian industry deployments',
      description:
        'Real production environments—from cement kilns, heavy manufacturing, and mechanical workshops to gas transport fleets and multi-branch fashion retail.',
      ctaLabel: 'Book a Site POC',
      bookPocPrefix: 'Book POC for',
      deployedCapabilities: 'Deployed Capabilities',
      bookSelectedPoc: 'Book a POC for This Use Case',
      clientsEyebrow: 'Trusted by Industry Leaders',
      clientsHeading: 'Enterprise clients running GSD AI systems in Egypt & MEA',
    },
    customers: {
      breadcrumb: 'Customers',
      eyebrow: 'Trusted by Industry Leaders · Egypt & MEA',
      title: 'Production deployments across Egyptian industrial, fleet & retail leaders',
      description:
        'From cement groups and energy logistics fleets to hospitals, hospitality resorts, and multi-branch fashion retail chains.',
      exploreStoriesLink: 'Explore Detailed Success Stories & POC Proof',
    },
    partners: {
      breadcrumb: 'Our Partners',
      eyebrow: 'Authorized Technology Partnerships · Egypt & MEA',
      title: 'Global AI & software leaders, engineered and deployed locally',
      description:
        'Authorized regional integration, local server engineering, and bilingual technical support across Egypt, Saudi Arabia, and the Middle East & Africa.',
    },
    contact: {
      breadcrumb: 'Contact Us',
      eyebrow: 'Your Partner in Digital Transformation · Maadi, Cairo',
      title: 'Ready to transform your operations? Request a demo or site POC',
      description:
        "Let's build your AI-powered future together. Share your site footprint, camera environment, fleet size, or automation goals with our Cairo engineering team.",
      directHeading: 'Direct Cairo Engineering & Sales Contacts',
      directBody:
        'Speak directly with our systems integration specialists in Maadi, Cairo for on-site CCTV compatibility audits, Carrot Vision POCs, DMS fleet trials, and Makkook optimization workshops.',
      emailLabel: 'Sales & Engineering Email',
      phoneLabel: 'Direct Telephone',
      hoursLabel: 'Business Hours',
      websiteLabel: 'Website',
      formTitle: 'Send a Note or Request a Demo / POC',
      dispatchedTo: 'Dispatched directly to',
      nameLabel: 'Full Name *',
      namePlaceholder: 'Ahmed Mansour',
      companyLabel: 'Organization',
      companyPlaceholder: 'Company or Plant Name',
      emailFieldLabel: 'Work Email *',
      emailPlaceholder: 'name@company.com',
      phoneFieldLabel: 'Phone Number',
      phonePlaceholder: '+20 10 ...',
      solutionLabel: 'Solution or Platform of Interest',
      generalOption: 'General AI & Video Analytics Inquiry',
      solutionsSuffix: 'Solutions',
      pocPrefix: 'POC Request:',
      notesLabel: 'Site Details or Objectives',
      notesPlaceholder: 'Number of cameras, sites, fleet vehicles, or target KPIs...',
      sendViaApp: 'Send via Email App',
      sendingPrefix: 'Sending to',
      sendRequestPrefix: 'Send Request to',
      errors: {
        name: 'Please enter your full name.',
        email: 'Please enter a valid work email address.',
        phone: 'Please enter a valid phone number.',
      },
      confirm: {
        fallbackTitle: 'Complete sending via your email app',
        sentTitlePrefix: 'Inquiry emailed to',
        fallbackDescPart1: 'Thank you,',
        fallbackDescPart2:
          '. Direct web-to-mail relay could not complete from this network session. Click below to open your email application pre-addressed to',
        fallbackDescPart3: 'with all of your entered details attached.',
        sentDescPart1: 'Thank you,',
        sentDescPart2: '. All submitted details for',
        sentDescPart3: 'have been transmitted to',
        sentDescPart4: '. Our Maadi, Cairo engineering team will follow up at',
        notSpecified: 'Not specified',
        sendNowPrefix: 'Send Now to',
        openCopyInApp: 'Open Copy in Email App',
        editDetails: 'Edit Inquiry Details',
        sendAnother: 'Send Another Inquiry',
      },
    },
    footer: {
      description:
        'Digital Transformation Experts. Turning passive surveillance and operational data into real-time industrial safety and measurable ROI across Egypt and MEA.',
      pagesHeading: 'Pages',
      solutionPagesHeading: 'Solution Pages',
      cairoOfficeHeading: 'Cairo Office',
      copyright: 'Copyright © 2026 GSD Technologies Egypt — All Rights Reserved.',
    },
    common: {
      homeBreadcrumb: 'Home',
      requestDemoDefault: 'Request a Demo',
    },
  },
  ar: {
    brandAriaLabel: 'جي إس دي تكنولوجيز — الرئيسية',
    logoAlt: 'جي إس دي تكنولوجيز — خبراء التحول الرقمي',
    nav: {
      home: 'الرئيسية',
      about: 'عن الشركة',
      ecosystem: 'منظومة الخدمات',
      solutions: 'الحلول',
      caseStudies: 'دراسات الحالة',
      partners: 'الشركاء',
      contact: 'تواصل معنا',
      customers: 'العملاء',
      requestDemo: 'اطلب عرضاً توضيحياً',
      openMenuAria: 'فتح قائمة التنقل',
      closeMenuAria: 'إغلاق قائمة التنقل',
      switchToLabel: 'English',
      switchToAria: 'تغيير لغة الموقع إلى الإنجليزية',
    },
    home: {
      eyebrow: 'خبراء التحول الرقمي · أكثر من 25 عاماً من الخبرة في الشرق الأوسط وأفريقيا',
      heroH1:
        'حلول السلامة المهنية بالذكاء الاصطناعي (HSE) وكشف مهمات الوقاية وتحليل الفيديو في مصر والمنطقة',
      heroLead:
        'حوّل كاميرات المراقبة الحالية (CCTV) إلى منظومة ذكية للتحقق من مهمات الوقاية الشخصية (PPE)، والإنذار المبكر للحريق والدخان، ومراقبة مناطق الأوناش العلوية، وبوابات التعرّف على اللوحات (LPR)، وحساب زوار التجزئة، وكاميرات مراقبة السائقين (DMS)، وذكاء القرار التشغيلي من مكوك عبر مصر والمملكة العربية السعودية.',
      heroExploreEcosystem: 'استكشف منظومة خدمات GSD',
      heroCardEyebrow: 'مركز الهندسة والتكامل — القاهرة',
      heroCardTitle: 'محركات ذكاء اصطناعي متكاملة مصممة لتحقيق عائد استثماري ملموس في مصر والمنطقة',
      directoryEyebrow: 'الهيكل المؤسسي · مصر والمملكة العربية السعودية',
      directoryHeading: 'تصفح حلول GSD Technologies حسب المنصة أو الدور الوظيفي أو نتائج التشغيل',
      directorySubcopy:
        'انتقل مباشرةً إلى الصفحات المتخصصة للتعريف بالشركة، وجميع المنصات الثماني للذكاء الاصطناعي، والحلول القطاعية، و5 دراسات حالة موثقة، وشركائنا المعتمدين.',
      directoryCards: [
        {
          id: 'about',
          index: '01',
          title: 'عن شركة GSD Technologies مصر',
          subtitle:
            'أكثر من 25 عاماً من الخبرة الإقليمية في تكنولوجيا المعلومات والذكاء الاصطناعي التطبيقي — رسالتنا، رؤيتنا، منهجيتنا، وقائمة عملائنا.',
          cta: 'افتح صفحة عن الشركة',
        },
        {
          id: 'ecosystem',
          index: '02',
          title: 'منظومة حلول الذكاء الاصطناعي',
          subtitle:
            'Carrot Vision للسلامة الصناعية، Eocortex VMS، مكوك DIOS، Aipix السحابية، مراقبة السائقين DMS/ADAS، GSD-DocAi، الحضور الذكي، وإدارة التجزئة.',
          cta: 'افتح منظومة الخدمات',
        },
        {
          id: 'solutions',
          index: '03',
          title: 'حلول القطاعات والأدوار القيادية',
          subtitle:
            'تطبيقات مصممة للمصانع، المستشفيات، المولات، المجمعات السكنية، ومتاجر التجزئة — مع 4 صفحات متخصصة لكل صانع قرار.',
          cta: 'افتح صفحة الحلول',
        },
        {
          id: 'success-stories',
          index: '04',
          title: 'دراسات الحالة وإثبات الجدوى (POC)',
          subtitle:
            '5 مشاريع مصرية موثقة في مصانع الأسمنت، الصناعات الثقيلة، الورش الميكانيكية، أساطيل نقل الغاز، وسلاسل الأزياء.',
          cta: 'افتح دراسات الحالة',
        },
        {
          id: 'partners',
          index: '05',
          title: 'شركاء التكنولوجيا المعتمدون',
          subtitle:
            'تكامل معتمد في مصر والشرق الأوسط مع Carrot Vision وEocortex ومكوك وAipix وAIS وHowen وClaromentis وAugnito وTSPlus.',
          cta: 'افتح صفحة الشركاء',
        },
        {
          id: 'contact',
          index: '06',
          title: 'تواصل معنا واطلب عرضاً أو تجربة ميدانية',
          subtitle:
            'تواصل مع مقرنا الهندسي في المعادي بالقاهرة لحجز جلسة استعراض تقنية أو تجربة ميدانية (POC) داخل موقعك.',
          cta: 'افتح صفحة التواصل',
        },
      ],
      customersEyebrow: 'شركاء النجاح في كبرى المؤسسات',
      customersHeading: 'مشاريع ذكاء اصطناعي عاملة في مصر والشرق الأوسط وأفريقيا',
      customersLink: 'استعرض 5 دراسات حالة مؤسسية',
      bottomCtaEyebrow: 'المركز الهندسي بالمعادي — القاهرة',
      bottomCtaTitle: 'هل أنت مستعد لتطوير عملياتك التشغيلية؟',
      bottomCtaBody:
        'شاركنا تفاصيل كاميرات موقعك أو حجم أسطولك أو أهداف الأتمتة مع فريقنا الهندسي بالقاهرة لجدولة عرض مباشر أو تجربة ميدانية.',
      bottomCtaButton: 'احجز عرضاً تقنياً',
    },
    about: {
      breadcrumb: 'عن الشركة',
      eyebrow: 'عن GSD Technologies مصر · المعادي، القاهرة',
      title: 'أكثر من 25 عاماً من الريادة الإقليمية في تكنولوجيا المعلومات والذكاء الاصطناعي المؤسسي',
      officeHeading: 'خبراء التحول الرقمي · القاهرة والشرق الأوسط وأفريقيا',
      officeSummary:
        'انطلاقاً من مقرنا الرئيسي في المعادي بالقاهرة، يربط فريقنا الهندسي المصانع الكبرى، وأساطيل النقل، والمستشفيات، وسلاسل التجزئة متعددة الفروع بمنصات الرؤية الحاسوبية وذكاء القرار المختبرة في بيئات التشغيل الفعلية.',
      missionTitle: 'رسالتنا',
      visionTitle: 'رؤيتنا',
      approachTitle: 'منهجيتنا',
      customersEyebrow: 'موثوق من قادة الصناعة',
      customersHeading: 'تطبيقات إنتاجية فعلية في مصر والمنطقة',
      partnersLink: 'استكشف شركاء التكنولوجيا',
    },
    ecosystem: {
      breadcrumb: 'منظومة الخدمات',
      eyebrow: 'منظومة حلول الذكاء الاصطناعي · مصر والسعودية',
      title: 'Carrot Vision AI وشراكة Eocortex المعتمدة في مصر ومنصات Cloud VSaaS وVMS المفتوحة',
      description:
        'نقدّم حلول المراقبة السحابية (Cloud VSaaS)، ومنصة مكوك لذكاء القرار وجدولة الإنتاج، وكاميرات مراقبة السائقين DMS، والحضور الذكي، وأتمتة الوثائق GSD-DocAi بدعم هندسي محلي متكامل.',
      bannerEyebrow: 'البنية التحتية الحالية للكاميرات · دون قيود على الأجهزة',
      bannerTitle: 'مراقبة فورية لمهمات الوقاية، ومناطق الأوناش، والتحليل الحراري للمخاطر',
      bannerBadge: 'توافق مع 99% من كاميرات ONVIF',
      openModuleLabel: 'عرض التفاصيل الكاملة',
      discussPrefix: 'ناقش حل',
      deepDiveEyebrow: 'المواصفات التفاعلية للمنصات',
      deepDiveHeading: 'استعراض تفصيلي لأبرز منصات المنظومة',
      deepDiveTabs: {
        carrot: 'منظومة Carrot Vision للسلامة',
        attendance: 'الحضور الذكي وتقارير الموارد البشرية',
        retail: 'إدارة التجزئة والمدير الافتراضي',
      },
      carrot: {
        cta: 'اطلب عرض Carrot Vision',
        tabs: {
          architecture: 'آلية العمل والمزايا',
          modules: 'أكثر من 18 وحدة سلامة',
          standards: 'المعايير ومؤشرات HSE',
          proof: 'غرفة التحكم وإثباتات المواقع',
        },
        pillarPrefix: 'المساعد الرقمي للسلامة',
        workflowHeading: 'آلية عمل مبسطة من 4 خطوات على الكاميرات الحالية',
        whyHeading: 'لماذا يختار قادة السلامة والصحة المهنية منصة Carrot Vision؟',
        standardsEyebrow: 'المزايا الاستراتيجية لمنظومة السلامة',
        standardsHeading:
          'أثر ملموس على المعايير العالمية للسلامة ومؤشرات الأداء الاستباقية والتنبؤية (HSE KPIs)',
        standardsBadge: 'جاهز لتحليل RCA وCAPA المرئي',
        controlPrefix: 'التحكم المركزي',
        proofHeading: 'إثباتات ميدانية وحرارية موثقة من مواقع التشغيل',
      },
      attendance: {
        cta: 'اطلب عرض منظومة الحضور',
        tabs: {
          overview: 'الوفورات وخطوات التفعيل الأربع',
          hrTools: 'أدوات الموارد البشرية والورديات',
          comparison: 'المقارنة: محلي مقابل السحابي',
        },
        setupHeading: 'إعداد سهل في 4 خطوات دون تعطيل للعمل',
        replacesHeading: 'بديل متكامل لأجهزة البصمة التقليدية',
        replacesPrefix: 'تحدٍّ تم حله',
        hrPrefix: 'إدارة الموارد البشرية والورديات',
        tableHeaders: {
          point: 'وجه المقارنة',
          inHouse: 'منظومتنا المحلية على خوادم الشركة',
          cloud: 'الاشتراكات السحابية التقليدية',
        },
      },
      retail: {
        cta: 'اطلب عرض المدير الافتراضي للتجزئة',
        tabs: {
          architecture: 'هيكلة الكاميرات المزدوجة ونقاط البيع',
          virtualManager: 'قيادة المدير الافتراضي',
          roi: 'الأثر التجاري والعائد الاستثماري',
        },
        trueCrEyebrow: 'مؤشر التحويل الحقيقي (True Conversion)',
        trueCrTitle: 'خط أساس موثق يستبعد دخول وخروج الموظفين من إجمالي حركة الزوار',
        blindSpotsHeading: 'ثغرات تشغيلية تعالجها المنظومة في سلاسل التجزئة',
        executivePrefix: 'لوحة القيادة التنفيذية',
        roiPrefix: 'الانضباط التشغيلي',
      },
    },
    solutions: {
      breadcrumb: 'الحلول',
      eyebrow: 'مركز الحلول القطاعية · مصر والسعودية',
      title: 'تحليلات الفيديو الذكية (ONVIF AI)، والتحكم ببوابات اللوحات (LPR)، وحساب زوار التجزئة في مصر',
      description:
        'مخططات جاهزة للرؤية الحاسوبية وذكاء القرار مصممة للمصانع عالية المخاطر، والمستشفيات، والمولات التجارية، والكمبوندات السكنية، وسلاسل التجزئة متعددة الفروع.',
      sectorFocus: 'التركيز القطاعي',
      challengesHeading: 'التحديات التشغيلية التي نعالجها',
      discussPrefix: 'اطلب استشارة لحلول',
      discussSuffix: '',
      facilityEyebrow: 'ذكاء المنشآت المتكامل',
      subpagesEyebrow: 'صفحات متخصصة حسب الدور الوظيفي',
      subpagesHeading: 'استكشف الحلول المصممة خصيصاً لمهام فريقك ومسؤولياتك',
      subpagesCountLabel: '4 صفحات حلول متخصصة · مصر والمنطقة',
      openSubpage: 'افتح صفحة الحل',
      builtForPrefix: 'مصمم لـ',
      allHubBack: 'العودة إلى مركز الحلول',
      bookWalkthrough: 'احجز جولة تقنية مباشرة',
      challengesEyebrowPrefix: 'مصمم خصيصاً لـ',
      challengePrefix: 'تحدٍّ تشغيلي',
      modulesEyebrow: 'الوحدات الأساسية والهندسة التقنية',
      evidenceEyebrow: 'شواهد ميدانية · مصر والشرق الأوسط',
      evidenceHeading: 'مشاريع إقليمية منفذة في هذا القطاع',
      requestCustomArch: 'اطلب تصميم منظومة لموقعك',
      crossNavEyebrow: 'استكشف حلولاً متخصصة أخرى',
      crossNavHeading: 'معماريات ذكاء اصطناعي موجهة لفرق التشغيل الأخرى',
      viewAllEcosystem: 'استعرض منظومة المنصات الثماني كاملة',
      exploreSolutionPage: 'استكشف صفحة الحل',
    },
    caseStudies: {
      breadcrumb: 'دراسات الحالة',
      eyebrow: 'التطبيقات الميدانية وإثبات الجدوى · مصر والمنطقة',
      title: 'عائد استثماري موثق عبر 5 مشاريع صناعية وتجارية في مصر',
      description:
        'بيئات تشغيلية فعلية — من أفران الأسمنت والصناعات الثقيلة والورش الميكانيكية إلى أساطيل نقل الغاز وسلاسل الأزياء متعددة الفروع.',
      ctaLabel: 'احجز تجربة ميدانية (POC)',
      bookPocPrefix: 'احجز تجربة ميدانية لقطاع:',
      deployedCapabilities: 'القدرات المُنفّذة في الموقع',
      bookSelectedPoc: 'احجز تجربة ميدانية لهذا النموذج',
      clientsEyebrow: 'شركاء النجاح في المنطقة',
      clientsHeading: 'مؤسسات تعتمد على منظومات GSD في مصر والشرق الأوسط وأفريقيا',
    },
    customers: {
      breadcrumb: 'العملاء',
      eyebrow: 'ثقة قادة الصناعة والأعمال · مصر والمنطقة',
      title: 'منظومات عاملة لدى كبرى شركات الصناعة والأساطيل والتجزئة في مصر',
      description:
        'من مجموعات الأسمنت وأساطيل الطاقة والغاز إلى المستشفيات والمنتجعات السياحية وسلاسل الأزياء متعددة الفروع.',
      exploreStoriesLink: 'استعرض دراسات الحالة التفصيلية وإثبات الجدوى',
    },
    partners: {
      breadcrumb: 'الشركاء',
      eyebrow: 'شراكات التكنولوجيا المعتمدة · مصر والشرق الأوسط',
      title: 'شراكات عالمية رائدة في الذكاء الاصطناعي والبرمجيات بتكامل ودعم هندسي محلي',
      description:
        'تكامل إقليمي معتمد، وهندسة خوادم محلية، ودعم تقني ثنائي اللغة في مصر والمملكة العربية السعودية ومنطقة الشرق الأوسط وأفريقيا.',
    },
    contact: {
      breadcrumb: 'تواصل معنا',
      eyebrow: 'شريكك في التحول الرقمي · المعادي، القاهرة',
      title: 'هل أنت مستعد لتطوير عملياتك؟ اطلب عرضاً توضيحياً أو تجربة ميدانية (POC)',
      description:
        'دعنا نبني مستقبلك المدعوم بالذكاء الاصطناعي معاً. شاركنا مواصفات موقعك أو عدد الكاميرات أو حجم الأسطول أو أهداف الأتمتة ليتواصل معك فريقنا الهندسي في القاهرة.',
      directHeading: 'قنوات التواصل المباشر مع فريق الهندسة والمبيعات بالقاهرة',
      directBody:
        'تواصل مباشرةً مع مهندسي تكامل الأنظمة لدينا في المعادي بالقاهرة لترتيب فحص توافق الكاميرات في موقعك، أو تجربة Carrot Vision الميدانية، أو اختبارات أساطيل DMS، أو ورش تحسين العمليات بمنصة مكوك.',
      emailLabel: 'بريد المبيعات والهندسة',
      phoneLabel: 'الهاتف المباشر',
      hoursLabel: 'ساعات العمل',
      websiteLabel: 'الموقع الإلكتروني',
      formTitle: 'أرسل استفسارك أو اطلب عرضاً توضيحياً / تجربة ميدانية',
      dispatchedTo: 'يتم الإرسال مباشرة إلى',
      nameLabel: 'الاسم الكامل *',
      namePlaceholder: 'أحمد منصور',
      companyLabel: 'الشركة أو المؤسسة',
      companyPlaceholder: 'اسم الشركة أو المصنع',
      emailFieldLabel: 'البريد الإلكتروني للعمل *',
      emailPlaceholder: 'name@company.com',
      phoneFieldLabel: 'رقم الهاتف',
      phonePlaceholder: '+20 10 ...',
      solutionLabel: 'الحل أو المنصة المطلوبة',
      generalOption: 'استفسار عام حول حلول الذكاء الاصطناعي وتحليل الفيديو',
      solutionsSuffix: '',
      pocPrefix: 'طلب تجربة ميدانية:',
      notesLabel: 'تفاصيل الموقع أو الأهداف التشغيلية',
      notesPlaceholder: 'عدد الكاميرات، المواقع، مركبات الأسطول، أو مؤشرات الأداء المستهدفة...',
      sendViaApp: 'الإرسال عبر تطبيق البريد',
      sendingPrefix: 'جارٍ الإرسال إلى',
      sendRequestPrefix: 'إرسال الطلب إلى',
      errors: {
        name: 'يرجى إدخال الاسم الكامل.',
        email: 'يرجى إدخال بريد إلكتروني صحيح للعمل.',
        phone: 'يرجى إدخال رقم هاتف صحيح.',
      },
      confirm: {
        fallbackTitle: 'أكمل الإرسال عبر تطبيق البريد الإلكتروني',
        sentTitlePrefix: 'تم إرسال طلبك بنجاح إلى',
        fallbackDescPart1: 'شكراً لك يا',
        fallbackDescPart2:
          '. تعذّر إتمام الإرسال التلقائي عبر الخادم من جلسة الشبكة الحالية. اضغط على الزر أدناه لفتح تطبيق البريد الإلكتروني مُجهّزاً بالإرسال إلى',
        fallbackDescPart3: 'ومرفقاً به كافة التفاصيل التي أدخلتها.',
        sentDescPart1: 'شكراً لك يا',
        sentDescPart2: '. تم إرسال كافة تفاصيل طلبك بخصوص',
        sentDescPart3: 'بنجاح إلى',
        sentDescPart4: '. سيتواصل معك فريقنا الهندسي في المعادي بالقاهرة عبر البريد',
        notSpecified: 'غير محدد',
        sendNowPrefix: 'أرسل الآن إلى',
        openCopyInApp: 'فتح نسخة في تطبيق البريد',
        editDetails: 'تعديل بيانات الطلب',
        sendAnother: 'إرسال استفسار آخر',
      },
    },
    footer: {
      description:
        'خبراء التحول الرقمي. نحول كاميرات المراقبة التقليدية والبيانات التشغيلية إلى أمان صناعي فوري وعائد استثماري ملموس في مصر والشرق الأوسط وأفريقيا.',
      pagesHeading: 'صفحات الموقع',
      solutionPagesHeading: 'صفحات الحلول المتخصصة',
      cairoOfficeHeading: 'مكتب القاهرة',
      copyright: 'جميع الحقوق محفوظة © 2026 شركة GSD Technologies مصر.',
    },
    common: {
      homeBreadcrumb: 'الرئيسية',
      requestDemoDefault: 'اطلب عرضاً توضيحياً',
    },
  },
};
