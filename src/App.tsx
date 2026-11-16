import React, {useEffect, useRef, useState} from 'react';
import {motion, MotionConfig} from 'motion/react';
import {
  ArrowRight,
  Building2,
  Check,
  Clock,
  Layers,
  Mail,
  MapPin,
  Menu,
  Phone,
  ShieldCheck,
  X,
} from 'lucide-react';
import {
  CARROT_VISION_DATA,
  COMPANY_INFO,
  CUSTOMERS,
  ECOSYSTEM_SERVICES,
  HERO_METRICS,
  PARTNERS,
  RETAIL_COMMAND_DATA,
  SECTION_IMAGES,
  SMART_ATTENDANCE_DATA,
  SUCCESS_STORIES,
  VERTICAL_SOLUTIONS,
} from './data/gsdContent';
import {getSectionByPathname, SECTION_SEO_BY_ID, SectionId} from './seo/sectionMeta';
import {useSectionSeo} from './seo/useSectionSeo';

const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];
const VIEWPORT_ONCE = {once: true, amount: 0.12} as const;

function ResilientImage({
  src,
  alt,
  className,
  fallbackTitle,
}: {
  src: string;
  alt: string;
  className: string;
  fallbackTitle: string;
}) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#08164D] to-[#040B29] p-6 text-center text-white ${className}`}
      >
        <ShieldCheck className="h-8 w-8 text-[#BDE5F6]" />
        <span className="mt-2 font-display text-sm font-semibold">{fallbackTitle}</span>
      </div>
    );
  }
  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className={className}
    />
  );
}

function VendorLogo({
  src,
  alt,
  name,
  className = 'h-8 w-auto max-w-[140px] object-contain',
}: {
  src: string;
  alt: string;
  name: string;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return <span className="font-display text-sm font-bold text-[#040B29]">{name}</span>;
  }
  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className={className}
    />
  );
}

interface DemoFormState {
  name: string;
  company: string;
  email: string;
  phone: string;
  solution: string;
  notes: string;
}

const INITIAL_FORM: DemoFormState = {
  name: '',
  company: '',
  email: '',
  phone: '',
  solution: `${ECOSYSTEM_SERVICES[0].name} — ${ECOSYSTEM_SERVICES[0].category}`,
  notes: '',
};

export default function App() {
  const [activeSectionId, setActiveSectionId] = useState<SectionId>(() => {
    if (typeof window !== 'undefined') {
      const fromPath = getSectionByPathname(window.location.pathname);
      if (fromPath) {
        return fromPath;
      }
      const hashId = window.location.hash.replace('#', '') as SectionId;
      if (hashId && hashId in SECTION_SEO_BY_ID) {
        return hashId;
      }
    }
    return 'top';
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeVerticalId, setActiveVerticalId] = useState(VERTICAL_SOLUTIONS[0].id);
  const [selectedStoryId, setSelectedStoryId] = useState(SUCCESS_STORIES[0].id);
  const [activeDeepDive, setActiveDeepDive] = useState<
    'carrot-vision' | 'gsd-ai-attendance' | 'retail-command'
  >('carrot-vision');
  const [carrotTab, setCarrotTab] = useState<'architecture' | 'modules' | 'standards' | 'proof'>(
    'architecture',
  );
  const [attendanceTab, setAttendanceTab] = useState<'overview' | 'hr-tools' | 'comparison'>(
    'overview',
  );
  const [retailTab, setRetailTab] = useState<'architecture' | 'virtual-manager' | 'roi'>(
    'architecture',
  );
  const [logoFailed, setLogoFailed] = useState(false);

  const [form, setForm] = useState<DemoFormState>(INITIAL_FORM);
  const [formErrors, setFormErrors] = useState<Partial<Record<keyof DemoFormState, string>>>({});
  const [submittedRecord, setSubmittedRecord] = useState<DemoFormState | null>(null);

  const nameInputRef = useRef<HTMLInputElement>(null);

  useSectionSeo(activeSectionId);

  useEffect(() => {
    const initialSection =
      getSectionByPathname(window.location.pathname) ||
      (window.location.hash.replace('#', '') as SectionId);
    if (initialSection && initialSection !== 'top' && initialSection in SECTION_SEO_BY_ID) {
      const targetEl = document.getElementById(initialSection);
      if (targetEl) {
        window.setTimeout(() => {
          targetEl.scrollIntoView({behavior: 'smooth'});
        }, 80);
      }
    }

    const sectionIds: SectionId[] = [
      'top',
      'ecosystem',
      'solutions',
      'customers',
      'about',
      'success-stories',
      'partners',
      'contact',
    ];
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (typeof IntersectionObserver === 'undefined' || elements.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length > 0) {
          const matchedId = visible[0].target.id as SectionId;
          if (matchedId in SECTION_SEO_BY_ID) {
            setActiveSectionId(matchedId);
          }
        }
      },
      {rootMargin: '-25% 0px -45% 0px', threshold: [0.1, 0.35, 0.6]},
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const activeVertical =
    VERTICAL_SOLUTIONS.find((v) => v.id === activeVerticalId) ?? VERTICAL_SOLUTIONS[0];
  const activeStory =
    SUCCESS_STORIES.find((s) => s.id === selectedStoryId) ?? SUCCESS_STORIES[0];

  const scrollToSection = (sectionId: string) => {
    setMobileMenuOpen(false);
    if (sectionId in SECTION_SEO_BY_ID) {
      setActiveSectionId(sectionId as SectionId);
    }
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({behavior: 'smooth'});
    }
  };

  const handleRequestDemo = (preselectedSolution?: string) => {
    if (preselectedSolution) {
      setForm((prev) => ({...prev, solution: preselectedSolution}));
    }
    setSubmittedRecord(null);
    setMobileMenuOpen(false);
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({behavior: 'smooth'});
    }
    window.setTimeout(() => {
      nameInputRef.current?.focus();
    }, 350);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Partial<Record<keyof DemoFormState, string>> = {};

    if (!form.name.trim()) {
      errors.name = 'Please enter your full name.';
    }
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      errors.email = 'Please enter a valid work email address.';
    }
    if (form.phone.trim() && !/^[+\d\s()-]{7,20}$/.test(form.phone.trim())) {
      errors.phone = 'Please enter a valid phone number.';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    setSubmittedRecord(form);
    setForm(INITIAL_FORM);
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen overflow-x-clip bg-[#F8FAFC] text-[#0B132B] antialiased">
      {/* Zone-disciplined 3-part Top Navigation Bar */}
      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:gap-6 sm:px-6 lg:gap-8 lg:px-8">
          {/* Zone 1: Official GSD brand logo on left side */}
          <a
            href="#top"
            aria-label="GSD Technologies — Home"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({top: 0, behavior: 'smooth'});
            }}
            className="flex items-center whitespace-nowrap shrink-0 rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0B34D6]"
          >
            {!logoFailed ? (
              <img
                src="/assets/aistudio/logo-GSD_a8de37a5.jpg"
                alt="GSD Technologies — Digital Transformation Experts"
                referrerPolicy="no-referrer"
                onError={() => setLogoFailed(true)}
                className="h-10 w-auto rounded-md object-contain sm:h-11"
              />
            ) : (
              <span className="font-display text-base font-bold tracking-tight text-[#040B29] sm:text-lg">
                GSD Technologies
              </span>
            )}
          </a>

          {/* Zone 2: Clean single-line text navigation links */}
          <nav
            aria-label="Primary Navigation"
            className="hidden md:flex items-center gap-4 text-sm font-medium text-slate-600 lg:gap-7"
          >
            <a
              href="#solutions"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('solutions');
              }}
              className="py-1 whitespace-nowrap shrink-0 transition-colors hover:text-[#0B34D6] hover:underline hover:underline-offset-4"
            >
              Solutions
            </a>
            <a
              href="#ecosystem"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('ecosystem');
              }}
              className="py-1 whitespace-nowrap shrink-0 transition-colors hover:text-[#0B34D6] hover:underline hover:underline-offset-4"
            >
              Ecosystem
            </a>
            <a
              href="#customers"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('customers');
              }}
              className="py-1 whitespace-nowrap shrink-0 transition-colors hover:text-[#0B34D6] hover:underline hover:underline-offset-4"
            >
              Customers
            </a>
            <a
              href="#success-stories"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('success-stories');
              }}
              className="py-1 whitespace-nowrap shrink-0 transition-colors hover:text-[#0B34D6] hover:underline hover:underline-offset-4"
            >
              Case Studies
            </a>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('contact');
              }}
              className="py-1 whitespace-nowrap shrink-0 transition-colors hover:text-[#0B34D6] hover:underline hover:underline-offset-4"
            >
              Contact
            </a>
          </nav>

          {/* Zone 3: Single primary CTA + mobile drawer button */}
          <div className="flex items-center gap-2.5 shrink-0 sm:gap-3">
            <button
              type="button"
              onClick={() => handleRequestDemo()}
              className="hidden sm:inline-flex min-h-[40px] items-center justify-center rounded-md bg-[#0B34D6] px-4 py-2 text-sm font-medium text-white whitespace-nowrap shrink-0 transition-colors duration-150 hover:bg-[#06249E] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0B34D6]"
            >
              Request a Demo
            </button>
            <button
              type="button"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-slate-200 text-slate-700 md:hidden hover:bg-slate-50"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile navigation drawer */}
        {mobileMenuOpen && (
          <div className="max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-slate-200 bg-white px-4 py-4 sm:px-6 md:hidden">
            <nav aria-label="Mobile Navigation" className="flex flex-col gap-1">
              {[
                {label: 'Solutions', id: 'solutions'},
                {label: 'Services Ecosystem', id: 'ecosystem'},
                {label: 'Customers', id: 'customers'},
                {label: 'About GSD', id: 'about'},
                {label: 'Success Stories', id: 'success-stories'},
                {label: 'Our Partners', id: 'partners'},
                {label: 'Contact Us', id: 'contact'},
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => scrollToSection(item.id)}
                  className="flex min-h-[44px] items-center justify-between border-b border-slate-100 py-2 text-left text-sm font-medium text-slate-800 hover:text-[#0B34D6]"
                >
                  <span>{item.label}</span>
                  <ArrowRight className="h-4 w-4 text-slate-400" />
                </button>
              ))}
              <button
                type="button"
                onClick={() => handleRequestDemo()}
                className="mt-3 min-h-[44px] w-full rounded-md bg-[#0B34D6] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#06249E]"
              >
                Request a Demo
              </button>
            </nav>
          </div>
        )}
      </header>

      <main id="top">
        {/* Hero Section: Royal Cobalt to Midnight Navy brand signature + Command Center backdrop */}
        <section className="relative overflow-hidden bg-[#040B29] text-white">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            <ResilientImage
              src={SECTION_IMAGES.heroControlCenter.src}
              alt=""
              fallbackTitle="GSD Operations Command Center"
              className="h-full w-full object-cover object-center opacity-35"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-[#0B34D6]/85 via-[#071A66]/85 to-[#040B29]/95" />
          </div>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                'radial-gradient(circle at 80% 20%, rgba(189, 229, 246, 0.28) 0%, transparent 45%), linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)',
              backgroundSize: '100% 100%, 48px 48px, 48px 48px',
            }}
          />

          <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
            <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12 lg:gap-12">
              {/* Left Column: Primary Focal Statement & Action */}
              <motion.div
                initial={{opacity: 0, y: 20}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.5, ease: EASE_OUT}}
                className="flex min-w-0 flex-col justify-between lg:col-span-7"
              >
                <div>
                  <p className="text-xs font-medium tracking-wide text-[#BDE5F6]">
                    Digital Transformation Experts · 25+ Years MEA Experience
                  </p>
                  <h1 className="mt-4 max-w-2xl font-display text-[clamp(2rem,4vw,3.75rem)] font-bold leading-[1.08] tracking-tight text-white sm:mt-5 [text-wrap:balance]">
                    AI Video Analytics, Computer Vision &amp; Industrial Safety
                  </h1>
                  <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-200 sm:mt-6 sm:text-lg">
                    Turn existing CCTV and AI cameras into real-time HSE AI, PPE detection, fire
                    &amp; smoke, overhead crane, restricted zone, and trespassing alerts—plus
                    GSD-DocAi document management, AI driver cameras, face recognition, AI counting,
                    and Virtual Retail Manager store intelligence.
                  </p>
                </div>

                <div className="mt-8 flex flex-col items-stretch gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:items-center sm:gap-6">
                  <button
                    type="button"
                    onClick={() => handleRequestDemo()}
                    className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-md bg-white px-6 py-3 text-sm font-semibold text-[#040B29] whitespace-nowrap shrink-0 transition-colors duration-150 hover:bg-[#BDE5F6] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    <span>Request a Demo</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                  <a
                    href="#ecosystem"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection('ecosystem');
                    }}
                    className="inline-flex min-h-[44px] items-center justify-center gap-1.5 text-sm font-medium text-[#BDE5F6] whitespace-nowrap shrink-0 transition-colors hover:text-white hover:underline hover:underline-offset-4 sm:justify-start"
                  >
                    <span>Explore GSD Services Ecosystem</span>
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </motion.div>

              {/* Right Column: Official Brand Lockup & Operations Command Visual */}
              <motion.div
                initial={{opacity: 0, y: 24}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.5, delay: 0.1, ease: EASE_OUT}}
                className="flex min-w-0 flex-col justify-between overflow-hidden rounded-xl border border-white/15 bg-[#040B29]/80 backdrop-blur-sm lg:col-span-5"
              >
                <div className="border-b border-white/10 bg-[#071A66]">
                  {!logoFailed ? (
                    <img
                      src="/assets/aistudio/logo-GSD_a8de37a5.jpg"
                      alt="GSD Technologies — Digital Transformation Experts official logo"
                      referrerPolicy="no-referrer"
                      onError={() => setLogoFailed(true)}
                      className="h-28 w-full object-cover object-center sm:h-32"
                    />
                  ) : (
                    <div className="flex h-28 flex-col items-center justify-center px-6 text-center sm:h-32">
                      <span className="font-display text-2xl font-bold tracking-wider text-white">
                        GSD TECHNOLOGIES
                      </span>
                      <span className="mt-1 text-xs tracking-[0.22em] text-[#BDE5F6]">
                        digital transformation Experts
                      </span>
                    </div>
                  )}
                </div>

                <div className="relative flex-1 overflow-hidden">
                  <ResilientImage
                    src={SECTION_IMAGES.heroControlCenter.src}
                    alt={SECTION_IMAGES.heroControlCenter.alt}
                    fallbackTitle="GSD Operations Command Center"
                    className="aspect-[16/9] h-full w-full object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#040B29] via-[#040B29]/30 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                    <p className="text-xs font-medium text-[#BDE5F6]">
                      Cairo Engineering &amp; Integration Hub
                    </p>
                    <p className="mt-1 font-display text-base font-semibold text-white sm:text-lg">
                      End-to-end AI engines engineered for measurable ROI across Egypt and MEA
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 px-5 py-4 text-xs text-slate-200 sm:px-6">
                  <a
                    href={`mailto:${COMPANY_INFO.email}`}
                    className="font-mono text-[#BDE5F6] transition-colors hover:text-white hover:underline"
                  >
                    {COMPANY_INFO.email}
                  </a>
                  <span aria-hidden="true" className="hidden text-white/30 sm:inline">
                    ·
                  </span>
                  <a
                    href={`tel:${COMPANY_INFO.phones[0]}`}
                    className="font-mono text-white transition-colors hover:text-[#BDE5F6] hover:underline"
                  >
                    {COMPANY_INFO.phones[0]}
                  </a>
                </div>
              </motion.div>
            </div>

            {/* Full-Width 4-Column Proof & KPI Strip */}
            <motion.div
              initial={{opacity: 0, y: 18}}
              animate={{opacity: 1, y: 0}}
              transition={{duration: 0.5, delay: 0.18, ease: EASE_OUT}}
              className="mt-12 grid grid-cols-1 gap-6 border-t border-white/15 pt-8 sm:mt-14 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8"
            >
              {HERO_METRICS.map((metric) => (
                <div key={metric.label} className="min-w-0">
                  <div className="font-mono text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                    {metric.value}
                  </div>
                  <div className="mt-1 text-sm font-medium text-[#BDE5F6]">{metric.label}</div>
                  <div className="mt-0.5 text-xs text-slate-300">{metric.context}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Services Ecosystem Overview: Asymmetric Bento Grid */}
        <section id="ecosystem" className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <motion.div
            initial={{opacity: 0, y: 20}}
            whileInView={{opacity: 1, y: 0}}
            viewport={VIEWPORT_ONCE}
            transition={{duration: 0.45, ease: EASE_OUT}}
            className="flex flex-col justify-between gap-6 border-b border-slate-200 pb-8 lg:flex-row lg:items-end"
          >
            <div className="max-w-2xl">
              <p className="text-xs font-medium text-[#0B34D6]">Our AI Solutions Ecosystem</p>
              <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-[#040B29] sm:text-3xl lg:text-4xl [text-wrap:balance]">
                A unified portfolio of AI engines designed to protect, optimize, and grow your business
              </h2>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-slate-600">
              We do not move boxes—we deploy end-to-end AI engines with hands-on engineering
              precision across manufacturing, healthcare, telecom, retail, and logistics fleets.
            </p>
          </motion.div>

          {/* Editorial 16:9 Industrial AI Showcase Image */}
          <motion.div
            initial={{opacity: 0, y: 20}}
            whileInView={{opacity: 1, y: 0}}
            viewport={VIEWPORT_ONCE}
            transition={{duration: 0.45, ease: EASE_OUT}}
            className="relative mt-8 overflow-hidden rounded-xl border border-slate-200 bg-[#040B29] sm:mt-10"
          >
            <ResilientImage
              src={SECTION_IMAGES.ecosystemIndustrial.src}
              alt={SECTION_IMAGES.ecosystemIndustrial.alt}
              fallbackTitle="Industrial AI Video Analytics"
              className="aspect-[16/10] min-h-[210px] w-full object-cover object-center sm:aspect-[16/8] lg:aspect-[16/7]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#040B29]/95 via-[#040B29]/45 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 flex flex-col justify-between gap-2 p-5 text-white sm:flex-row sm:items-end sm:p-8">
              <div className="min-w-0">
                <p className="text-xs font-medium text-[#BDE5F6]">
                  Existing CCTV Infrastructure · Zero Hardware Lock-In
                </p>
                <p className="mt-1 font-display text-base font-semibold sm:text-xl">
                  Real-time PPE verification, crane zone geofencing, and thermal hazard analytics
                </p>
              </div>
              <span className="font-mono text-xs text-slate-200 whitespace-nowrap shrink-0">
                99% ONVIF IP Compatible
              </span>
            </div>
          </motion.div>

          <div className="mt-8 grid grid-cols-1 gap-6 sm:mt-10 lg:grid-cols-6">
            {ECOSYSTEM_SERVICES.map((service, index) => {
              const isFourCol = index === 0 || index === 2 || index === 5;
              const isThreeCol = index === 6 || index === 7;
              const isWide = isFourCol || isThreeCol;
              const spanClass = isFourCol
                ? 'lg:col-span-4'
                : isThreeCol
                  ? 'lg:col-span-3'
                  : 'lg:col-span-2';
              const hasDeepDive =
                service.id === 'carrot-vision' ||
                service.id === 'gsd-ai-attendance' ||
                service.id === 'retail-command';

              return (
                <motion.article
                  key={service.id}
                  initial={{opacity: 0, y: 24}}
                  whileInView={{opacity: 1, y: 0}}
                  viewport={VIEWPORT_ONCE}
                  transition={{
                    duration: 0.45,
                    delay: (index % 2) * 0.08,
                    ease: EASE_OUT,
                  }}
                  className={`flex min-w-0 flex-col overflow-hidden rounded-xl border border-slate-200 bg-white transition-colors duration-150 hover:border-[#0B34D6]/40 ${spanClass}`}
                >
                  {service.image && (
                    <div className="relative aspect-[16/8] w-full overflow-hidden border-b border-slate-200 bg-slate-100">
                      <ResilientImage
                        src={service.image.src}
                        alt={service.image.alt}
                        fallbackTitle={service.name}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                  )}

                  <div className="flex flex-1 flex-col justify-between p-5 sm:p-8">
                    <div>
                      <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-medium text-[#0B34D6]">
                            {service.index}. {service.category}
                          </span>
                          <span aria-hidden="true">·</span>
                          <span>{service.partner}</span>
                        </div>
                        {service.vendorLogos && service.vendorLogos.length > 0 && (
                          <div className="flex flex-wrap items-center gap-3 py-1">
                            {service.vendorLogos.map((logo) => (
                              <VendorLogo
                                key={logo.src}
                                src={logo.src}
                                alt={logo.alt}
                                name={service.name}
                                className="h-5 w-auto max-w-[96px] object-contain"
                              />
                            ))}
                          </div>
                        )}
                      </div>

                      <h3 className="mt-4 font-display text-xl font-bold tracking-tight text-[#040B29] sm:text-2xl">
                        {service.name}
                      </h3>
                      <p className="mt-1 text-sm font-medium text-slate-800">{service.headline}</p>
                      <p className="mt-3 text-sm leading-relaxed text-slate-600">{service.summary}</p>

                      <ul
                        className={`mt-6 grid gap-2.5 border-t border-slate-100 pt-5 ${
                          isWide ? 'sm:grid-cols-2' : 'grid-cols-1'
                        }`}
                      >
                        {service.highlights.map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-2.5 text-sm leading-snug text-slate-700"
                          >
                            <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#0B34D6]" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-slate-100 pt-5">
                      <div className="flex flex-wrap items-center gap-6">
                        {service.metrics.map((m) => (
                          <div key={m.label}>
                            <div className="font-mono text-base font-semibold text-[#040B29]">
                              {m.value}
                            </div>
                            <div className="text-xs text-slate-500">{m.label}</div>
                          </div>
                        ))}
                      </div>

                      <div className="flex flex-wrap items-center gap-2.5">
                        {hasDeepDive && (
                          <button
                            type="button"
                            onClick={() => {
                              setActiveDeepDive(
                                service.id as
                                  | 'carrot-vision'
                                  | 'gsd-ai-attendance'
                                  | 'retail-command',
                              );
                              scrollToSection('carrot-vision-qhse');
                            }}
                            className="inline-flex min-h-[44px] items-center gap-1.5 rounded-md border border-slate-200 px-3.5 py-2 text-xs font-medium text-slate-700 whitespace-nowrap shrink-0 transition-colors hover:border-[#0B34D6] hover:text-[#0B34D6]"
                          >
                            <span>
                              {service.id === 'carrot-vision'
                                ? 'QHSE Details'
                                : service.id === 'gsd-ai-attendance'
                                  ? 'HR & Setup Details'
                                  : 'Virtual Manager Details'}
                            </span>
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => handleRequestDemo(`${service.name} — ${service.category}`)}
                          className="inline-flex min-h-[44px] items-center gap-1.5 rounded-md border border-slate-200 px-4 py-2 text-xs font-semibold text-[#040B29] whitespace-nowrap shrink-0 transition-colors hover:border-[#0B34D6] hover:bg-[#0B34D6] hover:text-white"
                        >
                          <span>Request Demo</span>
                          <ArrowRight className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>

          {/* Interactive Ecosystem Platform Deep-Dive (Carrot Vision, Smart Attendance & Retail Command) */}
          <motion.div
            id="carrot-vision-qhse"
            initial={{opacity: 0, y: 20}}
            whileInView={{opacity: 1, y: 0}}
            viewport={VIEWPORT_ONCE}
            transition={{duration: 0.45, ease: EASE_OUT}}
            className="mt-10 overflow-hidden rounded-xl border border-slate-200 bg-white sm:mt-12"
          >
            {/* Top Platform Switcher Bar */}
            <div
              role="tablist"
              aria-label="Select ecosystem solution specification"
              className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 bg-[#040B29] px-6 py-4 text-white sm:px-8"
            >
              <span className="text-xs font-medium text-[#BDE5F6]">
                Solution Specifications &amp; Architecture
              </span>
              <div className="flex flex-wrap gap-2">
                {(
                  [
                    {id: 'carrot-vision', label: '01. Carrot Vision QHSE'},
                    {id: 'gsd-ai-attendance', label: '07. Smart Employee Attendance'},
                    {id: 'retail-command', label: '08. Retail Command & Virtual Manager'},
                  ] as const
                ).map((item) => {
                  const selected = activeDeepDive === item.id;
                  return (
                    <button
                      key={item.id}
                      role="tab"
                      type="button"
                      aria-selected={selected}
                      onClick={() => setActiveDeepDive(item.id)}
                      className={`min-h-[40px] rounded-md px-3.5 py-2 text-xs font-medium whitespace-nowrap shrink-0 transition-colors duration-150 ${
                        selected
                          ? 'bg-white text-[#040B29]'
                          : 'bg-white/10 text-slate-200 hover:bg-white/20 hover:text-white'
                      }`}
                    >
                      {item.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {activeDeepDive === 'carrot-vision' && (
              <>
                <div className="flex flex-col justify-between gap-6 border-b border-slate-200 p-6 sm:p-8 lg:flex-row lg:items-end">
                  <div className="max-w-3xl">
                    <div className="flex flex-wrap items-center gap-4">
                      <VendorLogo
                        src="/assets/partners/carrot-vision.png"
                        alt="Carrot Vision QHSE logo"
                        name="Carrot Vision"
                        className="h-7 w-auto max-w-[130px] object-contain"
                      />
                      <span aria-hidden="true" className="text-slate-300">
                        ·
                      </span>
                      <p className="text-xs font-medium text-[#0B34D6]">{CARROT_VISION_DATA.eyebrow}</p>
                    </div>
                    <h3 className="mt-4 font-display text-2xl font-bold tracking-tight text-[#040B29] sm:text-3xl [text-wrap:balance]">
                      {CARROT_VISION_DATA.title}
                    </h3>
                    <p className="mt-2 text-sm font-medium text-slate-800">
                      {CARROT_VISION_DATA.tagline}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-slate-600">
                      {CARROT_VISION_DATA.summary}
                    </p>
                  </div>

                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center shrink-0">
                    <button
                      type="button"
                      onClick={() => handleRequestDemo('Carrot Vision AI — Industrial HSE & Video AI')}
                      className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-md bg-[#0B34D6] px-5 py-2.5 text-xs font-semibold text-white whitespace-nowrap shrink-0 transition-colors hover:bg-[#06249E]"
                    >
                      <span>Request Carrot Vision Demo</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>

                {/* Interactive Tab Selector */}
                <div
                  role="tablist"
                  aria-label="Carrot Vision QHSE details"
                  className="flex flex-wrap gap-2 border-b border-slate-200 bg-[#F8FAFC] px-6 py-3.5 sm:px-8"
                >
                  {(
                    [
                      {id: 'architecture', label: 'Workflow & Advantages'},
                      {id: 'modules', label: '18+ Safety Modules'},
                      {id: 'standards', label: 'Standards & HSE KPIs'},
                      {id: 'proof', label: 'Control Room & Site Proof'},
                    ] as const
                  ).map((tab) => {
                    const isSelected = carrotTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        role="tab"
                        type="button"
                        aria-selected={isSelected}
                        onClick={() => setCarrotTab(tab.id)}
                        className={`min-h-[40px] rounded-md px-3.5 py-2 text-xs font-medium whitespace-nowrap shrink-0 transition-colors duration-150 sm:text-sm ${
                          isSelected
                            ? 'bg-[#040B29] text-white'
                            : 'bg-white text-slate-700 border border-slate-200 hover:border-slate-300 hover:text-[#040B29]'
                        }`}
                      >
                        {tab.label}
                      </button>
                    );
                  })}
                </div>

            <div className="p-6 sm:p-8">
              {carrotTab === 'architecture' && (
                <div className="space-y-8">
                  {/* Automated QHSE Engineer Pillars */}
                  <div className="grid grid-cols-1 gap-6 border-b border-slate-200 pb-8 md:grid-cols-3">
                    {CARROT_VISION_DATA.automatedAssistantPillars.map((pillar, idx) => (
                      <div key={pillar.title} className="min-w-0">
                        <div className="font-mono text-xs font-medium text-[#0B34D6]">
                          0{idx + 1} · Digital Safety Assistant
                        </div>
                        <h4 className="mt-1.5 font-display text-lg font-bold text-[#040B29]">
                          {pillar.title}
                        </h4>
                        <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
                          {pillar.detail}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* 4-Step Workflow */}
                  <div>
                    <h4 className="font-display text-base font-bold text-[#040B29]">
                      Simple 4-Step Workflow on Existing Cameras
                    </h4>
                    <div className="mt-4 grid grid-cols-1 gap-6 border-b border-slate-200 pb-8 sm:grid-cols-2 lg:grid-cols-4">
                      {CARROT_VISION_DATA.workflowSteps.map((step) => (
                        <div key={step.step} className="min-w-0">
                          <div className="font-mono text-sm font-semibold text-[#0B34D6]">
                            {step.step}
                          </div>
                          <div className="mt-1 font-display text-base font-semibold text-[#040B29]">
                            {step.title}
                          </div>
                          <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
                            {step.detail}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 5 Core Differentiators */}
                  <div>
                    <h4 className="font-display text-base font-bold text-[#040B29]">
                      Why HSE Leaders Choose Carrot Vision
                    </h4>
                    <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
                      {CARROT_VISION_DATA.differentiators.map((diff) => (
                        <div key={diff.index} className="min-w-0">
                          <div className="font-mono text-xs font-medium text-slate-500">
                            {diff.index}
                          </div>
                          <div className="mt-1 font-display text-sm font-bold text-[#040B29]">
                            {diff.title}
                          </div>
                          <p className="mt-1.5 text-xs leading-relaxed text-slate-600">
                            {diff.detail}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {carrotTab === 'modules' && (
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                  {CARROT_VISION_DATA.suites.map((suite, suiteIdx) => (
                    <div
                      key={suite.id}
                      className={`min-w-0 ${
                        suiteIdx >= 2 ? 'border-t border-slate-200 pt-6' : ''
                      } ${suiteIdx === 1 ? 'border-t border-slate-200 pt-6 md:border-t-0 md:pt-0' : ''}`}
                    >
                      <div className="font-mono text-xs font-medium text-[#0B34D6]">
                        0{suiteIdx + 1} · {suite.subtitle}
                      </div>
                      <h4 className="mt-1 font-display text-lg font-bold text-[#040B29]">
                        {suite.title}
                      </h4>
                      <ul className="mt-4 divide-y divide-slate-100 border-t border-slate-100">
                        {suite.items.map((item) => (
                          <li key={item.name} className="py-3">
                            <div className="flex items-start gap-2.5">
                              <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#0B34D6]" />
                              <div className="min-w-0">
                                <span className="text-sm font-semibold text-[#040B29]">
                                  {item.name}
                                </span>
                                <p className="mt-0.5 text-xs leading-relaxed text-slate-600">
                                  {item.detail}
                                </p>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}

              {carrotTab === 'standards' && (
                <div className="space-y-8">
                  <div className="flex flex-col justify-between gap-4 border-b border-slate-200 pb-6 md:flex-row md:items-end">
                    <div>
                      <p className="text-xs font-medium text-[#0B34D6]">
                        Strategic HSE System Benefits
                      </p>
                      <h4 className="mt-1 font-display text-xl font-bold text-[#040B29]">
                        Measurable impact on global safety standards &amp; Proactive, Active, and Predictive HSE KPIs
                      </h4>
                    </div>
                    <span className="font-mono text-xs text-slate-500 whitespace-nowrap shrink-0">
                      Visual RCA &amp; CAPA Ready
                    </span>
                  </div>

                  <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                    {CARROT_VISION_DATA.standards.map((std) => (
                      <div key={std.code} className="min-w-0 border-b border-slate-100 pb-6">
                        <div className="font-mono text-xs font-semibold text-[#0B34D6]">
                          {std.code}
                        </div>
                        <h5 className="mt-1.5 font-display text-lg font-bold text-[#040B29]">
                          {std.title}
                        </h5>
                        <p className="mt-2 text-sm leading-relaxed text-slate-600">{std.detail}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {carrotTab === 'proof' && (
                <div className="space-y-8">
                  <div className="grid grid-cols-1 gap-6 border-b border-slate-200 pb-8 lg:grid-cols-3">
                    {CARROT_VISION_DATA.controlRoomCapabilities.map((cap, idx) => (
                      <div key={cap.title} className="min-w-0">
                        <div className="font-mono text-xs font-medium text-[#0B34D6]">
                          0{idx + 1} · Central Control
                        </div>
                        <h4 className="mt-1.5 font-display text-base font-bold text-[#040B29]">
                          {cap.title}
                        </h4>
                        <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
                          {cap.detail}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div>
                    <h4 className="font-display text-base font-bold text-[#040B29]">
                      Verified Field &amp; Thermal Site Proof
                    </h4>
                    <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2">
                      {CARROT_VISION_DATA.liveSiteProofs.map((proof) => (
                        <div
                          key={proof.title}
                          className="min-w-0 border-b border-slate-100 pb-5"
                        >
                          <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                            <span className="font-medium text-slate-500">{proof.location}</span>
                            {proof.metric && (
                              <span className="font-mono font-semibold text-[#0B34D6]">
                                {proof.metric}
                              </span>
                            )}
                          </div>
                          <h5 className="mt-1.5 font-display text-base font-bold text-[#040B29]">
                            {proof.title}
                          </h5>
                          <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
                            {proof.detail}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
              </>
            )}

            {activeDeepDive === 'gsd-ai-attendance' && (
              <>
                <div className="flex flex-col justify-between gap-6 border-b border-slate-200 p-6 sm:p-8 lg:flex-row lg:items-end">
                  <div className="max-w-3xl">
                    <p className="text-xs font-medium text-[#0B34D6]">
                      {SMART_ATTENDANCE_DATA.eyebrow}
                    </p>
                    <h3 className="mt-3 font-display text-2xl font-bold tracking-tight text-[#040B29] sm:text-3xl [text-wrap:balance]">
                      {SMART_ATTENDANCE_DATA.title}
                    </h3>
                    <p className="mt-2 text-sm font-medium text-slate-800">
                      {SMART_ATTENDANCE_DATA.tagline}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-slate-600">
                      {SMART_ATTENDANCE_DATA.summary}
                    </p>
                  </div>

                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center shrink-0">
                    <button
                      type="button"
                      onClick={() =>
                        handleRequestDemo(
                          'Smart Employee Attendance & HR Reporting — Smart Workplace & HR AI',
                        )
                      }
                      className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-md bg-[#0B34D6] px-5 py-2.5 text-xs font-semibold text-white whitespace-nowrap shrink-0 transition-colors hover:bg-[#06249E]"
                    >
                      <span>Request HR Attendance Demo</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>

                <div
                  role="tablist"
                  aria-label="Smart Employee Attendance details"
                  className="flex flex-wrap gap-2 border-b border-slate-200 bg-[#F8FAFC] px-6 py-3.5 sm:px-8"
                >
                  {(
                    [
                      {id: 'overview', label: 'Savings & 4-Step Setup'},
                      {id: 'hr-tools', label: 'Daily HR & Shift Tools'},
                      {id: 'comparison', label: 'In-House vs. Cloud'},
                    ] as const
                  ).map((tab) => {
                    const isSelected = attendanceTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        role="tab"
                        type="button"
                        aria-selected={isSelected}
                        onClick={() => setAttendanceTab(tab.id)}
                        className={`min-h-[40px] rounded-md px-3.5 py-2 text-xs font-medium whitespace-nowrap shrink-0 transition-colors duration-150 sm:text-sm ${
                          isSelected
                            ? 'bg-[#040B29] text-white'
                            : 'bg-white text-slate-700 border border-slate-200 hover:border-slate-300 hover:text-[#040B29]'
                        }`}
                      >
                        {tab.label}
                      </button>
                    );
                  })}
                </div>

                <div className="p-6 sm:p-8">
                  {attendanceTab === 'overview' && (
                    <div className="space-y-8">
                      <div className="grid grid-cols-1 gap-6 border-b border-slate-200 pb-8 md:grid-cols-3">
                        {SMART_ATTENDANCE_DATA.savingsMetrics.map((metric) => (
                          <div key={metric.label} className="min-w-0">
                            <div className="font-mono text-2xl font-bold text-[#0B34D6] sm:text-3xl">
                              {metric.value}
                            </div>
                            <h4 className="mt-1.5 font-display text-base font-bold text-[#040B29]">
                              {metric.label}
                            </h4>
                            <p className="mt-1 text-sm leading-relaxed text-slate-600">
                              {metric.detail}
                            </p>
                          </div>
                        ))}
                      </div>

                      <div>
                        <h4 className="font-display text-base font-bold text-[#040B29]">
                          Easy Setup in 4 Simple Steps (Zero Disruption)
                        </h4>
                        <div className="mt-4 grid grid-cols-1 gap-6 border-b border-slate-200 pb-8 sm:grid-cols-2 lg:grid-cols-4">
                          {SMART_ATTENDANCE_DATA.setupSteps.map((step) => (
                            <div key={step.step} className="min-w-0">
                              <div className="font-mono text-sm font-semibold text-[#0B34D6]">
                                {step.step}
                              </div>
                              <div className="mt-1 font-display text-base font-semibold text-[#040B29]">
                                {step.title}
                              </div>
                              <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
                                {step.detail}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-display text-base font-bold text-[#040B29]">
                          Replaces Fingerprint Punch Machines
                        </h4>
                        <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-3">
                          {SMART_ATTENDANCE_DATA.challengesReplaced.map((item, idx) => (
                            <div key={item.title} className="min-w-0">
                              <div className="font-mono text-xs font-medium text-slate-500">
                                0{idx + 1} · Challenge Solved
                              </div>
                              <div className="mt-1 font-display text-sm font-bold text-[#040B29]">
                                {item.title}
                              </div>
                              <p className="mt-1 text-sm leading-relaxed text-slate-600">
                                {item.detail}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {attendanceTab === 'hr-tools' && (
                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                      {SMART_ATTENDANCE_DATA.hrCapabilities.map((cap, idx) => (
                        <div key={cap.title} className="min-w-0 border-b border-slate-100 pb-6">
                          <div className="font-mono text-xs font-medium text-[#0B34D6]">
                            0{idx + 1} · HR &amp; Shift Control
                          </div>
                          <h4 className="mt-1.5 font-display text-lg font-bold text-[#040B29]">
                            {cap.title}
                          </h4>
                          <p className="mt-2 text-sm leading-relaxed text-slate-600">
                            {cap.detail}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}

                  {attendanceTab === 'comparison' && (
                    <div className="overflow-x-auto">
                      <table className="w-full min-w-[540px] border-collapse text-left text-sm">
                        <thead>
                          <tr className="border-b border-slate-200 text-xs font-semibold text-slate-500">
                            <th className="py-3 pr-4">Comparison Point</th>
                            <th className="bg-[#F8FAFC] px-4 py-3 text-[#0B34D6]">
                              Our In-House System
                            </th>
                            <th className="py-3 pl-4">Standard Cloud Subscriptions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {SMART_ATTENDANCE_DATA.comparison.map((row) => (
                            <tr key={row.point}>
                              <td className="py-4 pr-4 font-semibold text-[#040B29]">
                                {row.point}
                              </td>
                              <td className="bg-[#F8FAFC] px-4 py-4 font-medium text-[#040B29]">
                                {row.inHouse}
                              </td>
                              <td className="py-4 pl-4 text-slate-600">{row.cloud}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </>
            )}

            {activeDeepDive === 'retail-command' && (
              <>
                <div className="flex flex-col justify-between gap-6 border-b border-slate-200 p-6 sm:p-8 lg:flex-row lg:items-end">
                  <div className="max-w-3xl">
                    <p className="text-xs font-medium text-[#0B34D6]">
                      {RETAIL_COMMAND_DATA.eyebrow}
                    </p>
                    <h3 className="mt-3 font-display text-2xl font-bold tracking-tight text-[#040B29] sm:text-3xl [text-wrap:balance]">
                      {RETAIL_COMMAND_DATA.title}
                    </h3>
                    <p className="mt-2 text-sm font-medium text-slate-800">
                      {RETAIL_COMMAND_DATA.tagline}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-slate-600">
                      {RETAIL_COMMAND_DATA.summary}
                    </p>
                  </div>

                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center shrink-0">
                    <button
                      type="button"
                      onClick={() =>
                        handleRequestDemo(
                          'Retail Command & Virtual Manager — Retail AI & Virtual Manager',
                        )
                      }
                      className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-md bg-[#0B34D6] px-5 py-2.5 text-xs font-semibold text-white whitespace-nowrap shrink-0 transition-colors hover:bg-[#06249E]"
                    >
                      <span>Request Virtual Manager Demo</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>

                <div
                  role="tablist"
                  aria-label="Retail Command & Virtual Manager details"
                  className="flex flex-wrap gap-2 border-b border-slate-200 bg-[#F8FAFC] px-6 py-3.5 sm:px-8"
                >
                  {(
                    [
                      {id: 'architecture', label: 'Dual-Camera & POS Architecture'},
                      {id: 'virtual-manager', label: 'Virtual Manager Command'},
                      {id: 'roi', label: 'Business Impact & ROI'},
                    ] as const
                  ).map((tab) => {
                    const isSelected = retailTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        role="tab"
                        type="button"
                        aria-selected={isSelected}
                        onClick={() => setRetailTab(tab.id)}
                        className={`min-h-[40px] rounded-md px-3.5 py-2 text-xs font-medium whitespace-nowrap shrink-0 transition-colors duration-150 sm:text-sm ${
                          isSelected
                            ? 'bg-[#040B29] text-white'
                            : 'bg-white text-slate-700 border border-slate-200 hover:border-slate-300 hover:text-[#040B29]'
                        }`}
                      >
                        {tab.label}
                      </button>
                    );
                  })}
                </div>

                <div className="p-6 sm:p-8">
                  {retailTab === 'architecture' && (
                    <div className="space-y-8">
                      <div className="grid grid-cols-1 gap-6 border-b border-slate-200 pb-8 lg:grid-cols-3">
                        {RETAIL_COMMAND_DATA.architecturePillars.map((pillar) => (
                          <div key={pillar.index} className="min-w-0">
                            <div className="font-mono text-xs font-medium text-[#0B34D6]">
                              {pillar.index} · {pillar.subtitle}
                            </div>
                            <h4 className="mt-1.5 font-display text-lg font-bold text-[#040B29]">
                              {pillar.title}
                            </h4>
                            <p className="mt-2 text-sm leading-relaxed text-slate-600">
                              {pillar.detail}
                            </p>
                          </div>
                        ))}
                      </div>

                      <div className="flex flex-col justify-between gap-4 border-b border-slate-200 pb-8 md:flex-row md:items-center">
                        <div>
                          <div className="text-xs font-medium text-[#0B34D6]">
                            The True Conversion Metric
                          </div>
                          <h4 className="mt-1 font-display text-lg font-bold text-[#040B29]">
                            A verified baseline removing staff entries from total footfall
                          </h4>
                        </div>
                        <div className="rounded-lg border border-slate-200 bg-[#F8FAFC] px-4 py-3 font-mono text-xs font-semibold text-[#040B29] sm:text-sm">
                          {RETAIL_COMMAND_DATA.conversionFormula}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-display text-base font-bold text-[#040B29]">
                          Blind Spots Solved in Multi-Branch Retail
                        </h4>
                        <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-3">
                          {RETAIL_COMMAND_DATA.blindSpotsSolved.map((item) => (
                            <div key={item.index} className="min-w-0">
                              <div className="font-mono text-xs font-medium text-slate-500">
                                {item.index}
                              </div>
                              <div className="mt-1 font-display text-sm font-bold text-[#040B29]">
                                {item.title}
                              </div>
                              <p className="mt-1 text-sm leading-relaxed text-slate-600">
                                {item.detail}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {retailTab === 'virtual-manager' && (
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                      {RETAIL_COMMAND_DATA.virtualManagerCapabilities.map((cap) => (
                        <div key={cap.index} className="min-w-0 border-b border-slate-100 pb-6 lg:border-b-0 lg:pb-0">
                          <div className="font-mono text-xs font-medium text-[#0B34D6]">
                            {cap.index} · Executive Command
                          </div>
                          <h4 className="mt-1.5 font-display text-lg font-bold text-[#040B29]">
                            {cap.title}
                          </h4>
                          <p className="mt-2 text-sm leading-relaxed text-slate-600">
                            {cap.detail}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}

                  {retailTab === 'roi' && (
                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                      {RETAIL_COMMAND_DATA.businessImpact.map((impact) => (
                        <div key={impact.index} className="min-w-0 border-b border-slate-100 pb-6">
                          <div className="font-mono text-xs font-medium text-[#0B34D6]">
                            {impact.index} · Operational Discipline
                          </div>
                          <h4 className="mt-1.5 font-display text-lg font-bold text-[#040B29]">
                            {impact.title}
                          </h4>
                          <p className="mt-2 text-sm leading-relaxed text-slate-600">
                            {impact.detail}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </>
            )}
          </motion.div>
        </section>

        {/* Industry Vertical Solutions: Interactive Selector */}
        <section id="solutions" className="border-y border-slate-200 bg-white py-14 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{opacity: 0, y: 20}}
              whileInView={{opacity: 1, y: 0}}
              viewport={VIEWPORT_ONCE}
              transition={{duration: 0.45, ease: EASE_OUT}}
            >
              <div className="max-w-2xl">
                <p className="text-xs font-medium text-[#0B34D6]">Industry Solutions</p>
                <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-[#040B29] sm:text-3xl lg:text-4xl [text-wrap:balance]">
                  Tailored AI modules for high-stakes physical environments
                </h2>
              </div>

              {/* Functional Industry Filter Tabs */}
              <div
                role="tablist"
                aria-label="Select industry vertical"
                className="mt-6 flex flex-wrap gap-2 border-b border-slate-200 pb-4 sm:mt-8"
              >
                {VERTICAL_SOLUTIONS.map((vertical) => {
                  const selected = vertical.id === activeVertical.id;
                  return (
                    <button
                      key={vertical.id}
                      role="tab"
                      aria-selected={selected}
                      type="button"
                      onClick={() => setActiveVerticalId(vertical.id)}
                      className={`min-h-[44px] rounded-md px-3.5 py-2 text-xs font-medium whitespace-nowrap shrink-0 transition-colors duration-150 sm:px-4 sm:text-sm ${
                        selected
                          ? 'bg-[#0B34D6] text-white'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-[#040B29]'
                      }`}
                    >
                      {vertical.name}
                    </button>
                  );
                })}
              </div>
            </motion.div>

            {/* Active Vertical Detail View */}
            <motion.div
              key={activeVertical.id}
              initial={{opacity: 0, y: 14}}
              whileInView={{opacity: 1, y: 0}}
              viewport={VIEWPORT_ONCE}
              transition={{duration: 0.35, ease: EASE_OUT}}
              className="mt-8 grid grid-cols-1 gap-8 sm:mt-10 lg:grid-cols-12 lg:gap-10"
            >
              <div className="min-w-0 lg:col-span-5">
                <p className="text-xs font-medium text-slate-500">Sector Focus</p>
                <h3 className="mt-2 font-display text-2xl font-bold text-[#040B29]">
                  {activeVertical.name}
                </h3>
                <p className="mt-1 text-sm font-medium text-[#0B34D6]">{activeVertical.tagline}</p>
                <p className="mt-4 text-sm leading-relaxed text-slate-600">
                  {activeVertical.summary}
                </p>

                <div className="mt-8 border-t border-slate-200 pt-6">
                  <h4 className="text-sm font-semibold text-[#040B29]">
                    Operational Challenges Solved
                  </h4>
                  <ul className="mt-3 space-y-2.5">
                    {activeVertical.challenges.map((challenge) => (
                      <li
                        key={challenge}
                        className="flex items-start gap-2.5 text-sm leading-relaxed text-slate-600"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400"
                        />
                        <span>{challenge}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8">
                  <button
                    type="button"
                    onClick={() => handleRequestDemo(`${activeVertical.name} Solutions`)}
                    className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-md bg-[#040B29] px-5 py-2.5 text-sm font-medium text-white whitespace-nowrap shrink-0 transition-colors hover:bg-[#0B34D6] sm:w-auto"
                  >
                    <span>Discuss {activeVertical.name} Deployment</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="min-w-0 space-y-4 lg:col-span-7">
                <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
                  <ResilientImage
                    src={SECTION_IMAGES.solutionsFacility.src}
                    alt={SECTION_IMAGES.solutionsFacility.alt}
                    fallbackTitle={activeVertical.name}
                    className="aspect-[16/10] w-full object-cover object-center sm:aspect-[16/9]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#040B29]/85 via-[#040B29]/20 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-4 text-white sm:p-5">
                    <p className="text-xs font-medium text-[#BDE5F6]">Turnkey Facility Intelligence</p>
                    <p className="mt-0.5 font-display text-sm font-semibold sm:text-base">
                      {activeVertical.name} — {activeVertical.tagline}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {activeVertical.modules.map((mod, idx) => (
                    <div
                      key={mod.title}
                      className="flex min-w-0 flex-col justify-between rounded-xl border border-slate-200 bg-[#F8FAFC] p-5 sm:p-6"
                    >
                      <div>
                        <div className="font-mono text-xs font-medium text-[#0B34D6]">
                          0{idx + 1}
                        </div>
                        <h4 className="mt-2 font-display text-lg font-semibold text-[#040B29]">
                          {mod.title}
                        </h4>
                        <p className="mt-2 text-sm leading-relaxed text-slate-600">{mod.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Customers Section: Trusted by Industry Leaders */}
        <section id="customers" className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <motion.div
            initial={{opacity: 0, y: 20}}
            whileInView={{opacity: 1, y: 0}}
            viewport={VIEWPORT_ONCE}
            transition={{duration: 0.45, ease: EASE_OUT}}
          >
            <div className="flex flex-col justify-between gap-4 border-b border-slate-200 pb-8 md:flex-row md:items-end">
              <div className="max-w-2xl">
                <p className="text-xs font-medium text-[#0B34D6]">Trusted by Industry Leaders</p>
                <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-[#040B29] sm:text-3xl lg:text-4xl [text-wrap:balance]">
                  Production deployments across Egypt &amp; MEA enterprise leaders
                </h2>
              </div>
              <p className="max-w-md text-sm leading-relaxed text-slate-600">
                From cement groups and energy logistics fleets to hospitals, hospitality resorts, and
                multi-branch retail chains.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-4 sm:mt-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-5">
              {CUSTOMERS.map((customer) => (
                <div
                  key={`${customer.name}-${customer.sector}`}
                  className="flex min-w-0 flex-col justify-between rounded-xl border border-slate-200 bg-white p-5 transition-colors duration-150 hover:border-[#0B34D6]/40"
                >
                  <div className="flex h-16 items-center justify-center py-2">
                    <VendorLogo
                      src={customer.logoSrc}
                      alt={`${customer.name} customer logo`}
                      name={customer.name}
                      className="max-h-12 w-auto max-w-[148px] object-contain"
                    />
                  </div>
                  <div className="mt-4 border-t border-slate-100 pt-3.5">
                    <h3 className="font-display text-sm font-bold text-[#040B29]">
                      {customer.name}
                    </h3>
                    <p className="mt-1 text-xs leading-snug text-slate-600">{customer.sector}</p>
                    {customer.note && (
                      <p className="mt-1 text-xs leading-snug text-slate-400">{customer.note}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* About GSD Technologies Egypt: Story, Mission, Vision & Our Approach */}
        <section
          id="about"
          className="border-t border-slate-200 bg-white py-14 sm:py-20 lg:py-24"
        >
          <motion.div
            initial={{opacity: 0, y: 20}}
            whileInView={{opacity: 1, y: 0}}
            viewport={VIEWPORT_ONCE}
            transition={{duration: 0.45, ease: EASE_OUT}}
            className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:gap-12 lg:px-8"
          >
            <div className="min-w-0 lg:col-span-5">
              <div className="overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
                <ResilientImage
                  src={SECTION_IMAGES.aboutOffice.src}
                  alt={SECTION_IMAGES.aboutOffice.alt}
                  fallbackTitle="GSD Technologies Egypt — Maadi, Cairo"
                  className="aspect-[4/3] w-full object-cover object-center"
                />
              </div>
              <p className="mt-6 text-xs font-medium text-[#0B34D6]">About GSD Technologies Egypt</p>
              <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-[#040B29] sm:text-3xl [text-wrap:balance]">
                25+ years of regional ICT leadership meeting practical enterprise AI
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-slate-600">{COMPANY_INFO.story}</p>
            </div>

            <div className="min-w-0 space-y-6 border-t border-slate-200 pt-8 lg:col-span-7 lg:border-t-0 lg:border-l lg:pl-10 lg:pt-0">
              <div className="border-b border-slate-200 pb-6">
                <div className="font-mono text-xs font-medium text-[#0B34D6]">01</div>
                <h3 className="mt-1 font-display text-lg font-semibold text-[#040B29]">
                  Our Mission
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {COMPANY_INFO.mission}
                </p>
              </div>
              <div className="border-b border-slate-200 pb-6">
                <div className="font-mono text-xs font-medium text-[#0B34D6]">02</div>
                <h3 className="mt-1 font-display text-lg font-semibold text-[#040B29]">
                  Our Vision
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {COMPANY_INFO.vision}
                </p>
              </div>
              <div>
                <div className="font-mono text-xs font-medium text-[#0B34D6]">03</div>
                <h3 className="mt-1 font-display text-lg font-semibold text-[#040B29]">
                  Our Approach
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {COMPANY_INFO.approach}
                </p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Proven Regional Success Stories */}
        <section
          id="success-stories"
          className="border-y border-slate-200 bg-[#040B29] py-14 text-white sm:py-20 lg:py-24"
        >
          <motion.div
            initial={{opacity: 0, y: 22}}
            whileInView={{opacity: 1, y: 0}}
            viewport={VIEWPORT_ONCE}
            transition={{duration: 0.5, ease: EASE_OUT}}
            className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
          >
            <div className="flex flex-col justify-between gap-6 border-b border-white/15 pb-8 lg:flex-row lg:items-end">
              <div>
                <p className="text-xs font-medium text-[#BDE5F6]">Field Deployments</p>
                <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl [text-wrap:balance]">
                  Verified success stories across Egyptian industry
                </h2>
              </div>
              <p className="max-w-md text-sm leading-relaxed text-slate-300">
                Real production environments—from high-heat cement kilns and overhead crane bays to
                gas transport fleets and multi-branch fashion retail.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-6 sm:mt-10 sm:gap-8 lg:grid-cols-12">
              {/* Story Selector List */}
              <div className="flex min-w-0 flex-col gap-3 lg:col-span-5">
                {SUCCESS_STORIES.map((story) => {
                  const isCurrent = story.id === activeStory.id;
                  return (
                    <button
                      key={story.id}
                      type="button"
                      onClick={() => setSelectedStoryId(story.id)}
                      className={`min-h-[44px] rounded-xl border p-4 text-left transition-colors duration-150 sm:p-5 ${
                        isCurrent
                          ? 'border-[#BDE5F6]/50 bg-[#08164D]'
                          : 'border-white/10 bg-white/5 hover:border-white/25 hover:bg-white/10'
                      }`}
                    >
                      <div className="flex flex-wrap items-center gap-2 text-xs text-[#BDE5F6]">
                        <span>{story.sector}</span>
                        <span aria-hidden="true">·</span>
                        <span className="text-slate-300">{story.location}</span>
                      </div>
                      <div className="mt-2 font-display text-base font-semibold text-white">
                        {story.title}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Active Story Breakdown */}
              <div className="flex min-w-0 flex-col justify-between overflow-hidden rounded-xl border border-white/15 bg-[#08164D] lg:col-span-7">
                <div className="relative h-48 w-full overflow-hidden border-b border-white/10 sm:h-60">
                  <ResilientImage
                    src={SECTION_IMAGES.storiesCementFleet.src}
                    alt={SECTION_IMAGES.storiesCementFleet.alt}
                    fallbackTitle={activeStory.sector}
                    className="h-full w-full object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#08164D] via-[#08164D]/35 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-center gap-2 px-5 pb-4 text-xs text-[#BDE5F6] sm:px-9">
                    <span>{activeStory.sector}</span>
                    <span aria-hidden="true">·</span>
                    <span>{activeStory.location}</span>
                  </div>
                </div>

                <div className="flex flex-1 flex-col justify-between p-5 sm:p-9">
                  <div>
                    <h3 className="font-display text-xl font-bold text-white sm:text-2xl">
                      {activeStory.title}
                    </h3>
                    <p className="mt-4 text-sm leading-relaxed text-slate-200">
                      {activeStory.challenge}
                    </p>

                    <div className="mt-7 border-t border-white/10 pt-6">
                      <h4 className="text-xs font-semibold tracking-wide text-[#BDE5F6]">
                        Deployed Capabilities
                      </h4>
                      <ul className="mt-4 space-y-3">
                        {activeStory.solutionPoints.map((point) => (
                          <li
                            key={point}
                            className="flex items-start gap-3 text-sm leading-relaxed text-slate-200"
                          >
                            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#BDE5F6]" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-white/15 pt-6">
                    <p className="max-w-lg text-sm font-medium text-white">{activeStory.outcome}</p>
                    <button
                      type="button"
                      onClick={() => handleRequestDemo(`Deployment Inquiry: ${activeStory.sector}`)}
                      className="inline-flex min-h-[44px] items-center gap-1.5 rounded-md bg-white px-4 py-2 text-xs font-semibold text-[#040B29] whitespace-nowrap shrink-0 transition-colors hover:bg-[#BDE5F6]"
                    >
                      <span>Book Architecture Review</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Technology Partner Ecosystem */}
        <section id="partners" className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <motion.div
            initial={{opacity: 0, y: 20}}
            whileInView={{opacity: 1, y: 0}}
            viewport={VIEWPORT_ONCE}
            transition={{duration: 0.45, ease: EASE_OUT}}
          >
            <div className="flex flex-col justify-between gap-4 border-b border-slate-200 pb-8 md:flex-row md:items-end">
              <div>
                <p className="text-xs font-medium text-[#0B34D6]">Technology Partnerships</p>
                <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-[#040B29] sm:text-3xl">
                  Global AI &amp; software leaders, deployed locally
                </h2>
              </div>
              <p className="max-w-md text-sm text-slate-600">
                Full local engineering, architecture, and regional support across Egypt and the Middle
                East &amp; Africa.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-5 sm:mt-10 sm:grid-cols-2 lg:grid-cols-3">
              {PARTNERS.map((partner) => (
                <div
                  key={partner.name}
                  className="flex min-w-0 flex-col justify-between rounded-xl border border-slate-200 bg-white p-6 transition-colors duration-150 hover:border-[#0B34D6]/40"
                >
                  <div>
                    <div className="flex h-14 items-center justify-start border-b border-slate-100 pb-4">
                      <VendorLogo
                        src={partner.logoSrc}
                        alt={`${partner.name} official partner logo`}
                        name={partner.name}
                        className="h-9 w-auto max-w-[160px] object-contain"
                      />
                    </div>
                    <div className="mt-4 text-xs font-medium text-[#0B34D6]">{partner.domain}</div>
                    <h3 className="mt-1 font-display text-lg font-bold text-[#040B29]">
                      {partner.name}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">{partner.summary}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Interactive Contact & Request a Demo Section */}
        <section id="contact" className="border-t border-slate-200 bg-white py-14 sm:py-20 lg:py-24">
          <motion.div
            initial={{opacity: 0, y: 20}}
            whileInView={{opacity: 1, y: 0}}
            viewport={VIEWPORT_ONCE}
            transition={{duration: 0.45, ease: EASE_OUT}}
            className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
          >
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
              <div className="min-w-0 lg:col-span-5">
                <div className="mb-6 overflow-hidden rounded-xl border border-slate-200 bg-[#071A66]">
                  <ResilientImage
                    src="/assets/aistudio/logo-GSD_a8de37a5.jpg"
                    alt="GSD Technologies Egypt — Digital Transformation Experts"
                    fallbackTitle="GSD Technologies Egypt"
                    className="h-24 w-full object-cover object-center"
                  />
                </div>
                <p className="text-xs font-medium text-[#0B34D6]">
                  Your Partner in Digital Transformation · MEA &amp; Beyond
                </p>
                <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-[#040B29] sm:text-3xl [text-wrap:balance]">
                  Ready to transform your operations?
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-slate-600">
                  Let&apos;s build your AI-powered future together. Share your site footprint,
                  camera environment, or workflow goals with our Cairo engineering team for a
                  tailored technical walkthrough.
                </p>

                <dl className="mt-8 space-y-5 border-t border-slate-200 pt-8 text-sm">
                  <div className="flex items-start gap-3">
                    <Building2 className="mt-0.5 h-4 w-4 shrink-0 text-[#0B34D6]" />
                    <div className="min-w-0">
                      <dt className="font-semibold text-[#040B29]">{COMPANY_INFO.legalName}</dt>
                      <dd className="mt-0.5 break-words text-slate-600">{COMPANY_INFO.address}</dd>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="mt-0.5 h-4 w-4 shrink-0 text-[#0B34D6]" />
                    <div className="min-w-0">
                      <dt className="font-semibold text-[#040B29]">Sales &amp; Engineering Email</dt>
                      <dd className="mt-0.5 font-mono text-slate-700">
                        <a
                          href={`mailto:${COMPANY_INFO.email}`}
                          className="break-all hover:text-[#0B34D6] hover:underline"
                        >
                          {COMPANY_INFO.email}
                        </a>
                      </dd>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="mt-0.5 h-4 w-4 shrink-0 text-[#0B34D6]" />
                    <div className="min-w-0">
                      <dt className="font-semibold text-[#040B29]">Direct Telephone</dt>
                      <dd className="mt-1 flex flex-col gap-1 font-mono text-slate-700">
                        {COMPANY_INFO.phones.map((phone) => (
                          <a
                            key={phone}
                            href={`tel:${phone}`}
                            className="hover:text-[#0B34D6] hover:underline"
                          >
                            {phone}
                          </a>
                        ))}
                      </dd>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="mt-0.5 h-4 w-4 shrink-0 text-[#0B34D6]" />
                    <div className="min-w-0">
                      <dt className="font-semibold text-[#040B29]">Business Hours</dt>
                      <dd className="mt-0.5 text-slate-600">{COMPANY_INFO.hours}</dd>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#0B34D6]" />
                    <div className="min-w-0">
                      <dt className="font-semibold text-[#040B29]">Website</dt>
                      <dd className="mt-0.5 font-mono text-slate-600">{COMPANY_INFO.domain}</dd>
                    </div>
                  </div>
                </dl>
              </div>

              <div className="rounded-xl border border-slate-200 bg-[#F8FAFC] p-6 sm:p-8 lg:col-span-7">
                {submittedRecord ? (
                  <div className="flex h-full flex-col justify-between py-4">
                    <div>
                      <div className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-[#0B34D6] text-white">
                        <Check className="h-5 w-5" />
                      </div>
                      <h3 className="mt-5 font-display text-2xl font-bold text-[#040B29]">
                        Demo request received
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-slate-600">
                        Thank you, <span className="font-semibold text-[#040B29]">{submittedRecord.name}</span>.
                        Your inquiry for{' '}
                        <span className="font-semibold text-[#040B29]">
                          {submittedRecord.solution}
                        </span>{' '}
                        has been logged for our engineering team in Maadi, Cairo. We will follow up
                        via <span className="font-mono text-slate-800">{submittedRecord.email}</span>.
                      </p>
                    </div>
                    <div className="mt-8">
                      <button
                        type="button"
                        onClick={() => setSubmittedRecord(null)}
                        className="min-h-[44px] rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-[#040B29] hover:border-[#0B34D6] hover:text-[#0B34D6]"
                      >
                        Send Another Inquiry
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} noValidate className="space-y-5">
                    <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                      <h3 className="font-display text-lg font-semibold text-[#040B29]">
                        Send a Note or Request a Demo
                      </h3>
                      <Layers className="h-4 w-4 text-slate-400" />
                    </div>

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="demo-name"
                          className="block text-xs font-medium text-slate-700"
                        >
                          Full Name *
                        </label>
                        <input
                          ref={nameInputRef}
                          id="demo-name"
                          type="text"
                          value={form.name}
                          onChange={(e) => setForm((prev) => ({...prev, name: e.target.value}))}
                          placeholder="Ahmed Mansour"
                          className="mt-1.5 w-full rounded-md border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-[#0B132B] placeholder:text-slate-400 focus:border-[#0B34D6] focus:outline-none"
                        />
                        {formErrors.name && (
                          <p className="mt-1 text-xs font-medium text-red-700">{formErrors.name}</p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="demo-company"
                          className="block text-xs font-medium text-slate-700"
                        >
                          Organization
                        </label>
                        <input
                          id="demo-company"
                          type="text"
                          value={form.company}
                          onChange={(e) => setForm((prev) => ({...prev, company: e.target.value}))}
                          placeholder="Company or Plant Name"
                          className="mt-1.5 w-full rounded-md border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-[#0B132B] placeholder:text-slate-400 focus:border-[#0B34D6] focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="demo-email"
                          className="block text-xs font-medium text-slate-700"
                        >
                          Work Email *
                        </label>
                        <input
                          id="demo-email"
                          type="email"
                          value={form.email}
                          onChange={(e) => setForm((prev) => ({...prev, email: e.target.value}))}
                          placeholder="name@company.com"
                          className="mt-1.5 w-full rounded-md border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-[#0B132B] placeholder:text-slate-400 focus:border-[#0B34D6] focus:outline-none"
                        />
                        {formErrors.email && (
                          <p className="mt-1 text-xs font-medium text-red-700">
                            {formErrors.email}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="demo-phone"
                          className="block text-xs font-medium text-slate-700"
                        >
                          Phone Number
                        </label>
                        <input
                          id="demo-phone"
                          type="tel"
                          value={form.phone}
                          onChange={(e) => setForm((prev) => ({...prev, phone: e.target.value}))}
                          placeholder="+20 10 ..."
                          className="mt-1.5 w-full rounded-md border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-[#0B132B] placeholder:text-slate-400 focus:border-[#0B34D6] focus:outline-none"
                        />
                        {formErrors.phone && (
                          <p className="mt-1 text-xs font-medium text-red-700">
                            {formErrors.phone}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="demo-solution"
                        className="block text-xs font-medium text-slate-700"
                      >
                        Solution or Platform of Interest
                      </label>
                      <select
                        id="demo-solution"
                        value={form.solution}
                        onChange={(e) => setForm((prev) => ({...prev, solution: e.target.value}))}
                        className="mt-1.5 min-h-[44px] w-full rounded-md border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-[#0B132B] focus:border-[#0B34D6] focus:outline-none"
                      >
                        {ECOSYSTEM_SERVICES.map((service) => {
                          const optionValue = `${service.name} — ${service.category}`;
                          return (
                            <option key={service.id} value={optionValue}>
                              {optionValue}
                            </option>
                          );
                        })}
                        {VERTICAL_SOLUTIONS.map((vertical) => {
                          const optionValue = `${vertical.name} Solutions`;
                          return (
                            <option key={vertical.id} value={optionValue}>
                              {optionValue}
                            </option>
                          );
                        })}
                        <option value="Deployment Inquiry: Cement & Heavy Industry">
                          Deployment Inquiry: Cement &amp; Heavy Industry
                        </option>
                        <option value="Deployment Inquiry: Heavy Manufacturing">
                          Deployment Inquiry: Heavy Manufacturing
                        </option>
                        <option value="Deployment Inquiry: Oil, Gas & Fleet Logistics">
                          Deployment Inquiry: Oil, Gas &amp; Fleet Logistics
                        </option>
                        <option value="Deployment Inquiry: Multi-Branch Fashion Retail">
                          Deployment Inquiry: Multi-Branch Fashion Retail
                        </option>
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="demo-notes"
                        className="block text-xs font-medium text-slate-700"
                      >
                        Site Details or Objectives
                      </label>
                      <textarea
                        id="demo-notes"
                        rows={3}
                        value={form.notes}
                        onChange={(e) => setForm((prev) => ({...prev, notes: e.target.value}))}
                        placeholder="Number of cameras, sites, fleet vehicles, or target KPIs..."
                        className="mt-1.5 w-full rounded-md border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-[#0B132B] placeholder:text-slate-400 focus:border-[#0B34D6] focus:outline-none"
                      />
                    </div>

                    <div className="flex flex-col items-stretch justify-between gap-4 pt-2 sm:flex-row sm:items-center">
                      <p className="text-xs text-slate-500">
                        Direct response from GSD Technologies Egypt · Maadi, Cairo
                      </p>
                      <button
                        type="submit"
                        className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-md bg-[#0B34D6] px-6 py-2.5 text-sm font-semibold text-white whitespace-nowrap shrink-0 transition-colors duration-150 hover:bg-[#06249E] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0B34D6]"
                      >
                        <span>Submit Request</span>
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        </section>
      </main>

      {/* Quiet Enterprise Footer */}
      <footer className="bg-[#040B29] text-slate-300">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-14 lg:px-8">
          <div className="grid grid-cols-1 gap-10 border-b border-white/10 pb-10 md:grid-cols-12">
            <div className="md:col-span-5">
              <div className="font-display text-lg font-bold text-white">GSD Technologies Egypt</div>
              <p className="mt-2 max-w-sm text-sm leading-relaxed text-slate-400">
                Digital Transformation Experts. Turning passive surveillance and operational data
                into real-time industrial safety and measurable ROI across Egypt and MEA.
              </p>
            </div>

            <div className="md:col-span-4">
              <div className="text-xs font-semibold text-white">Navigation</div>
              <ul className="mt-3 grid grid-cols-2 gap-y-2.5 text-sm">
                {[
                  {label: 'Our Solutions', id: 'solutions'},
                  {label: 'Services Ecosystem', id: 'ecosystem'},
                  {label: 'Customers', id: 'customers'},
                  {label: 'Success Stories', id: 'success-stories'},
                  {label: 'Our Partners', id: 'partners'},
                  {label: 'About GSD', id: 'about'},
                  {label: 'Contact Us', id: 'contact'},
                ].map((link) => (
                  <li key={link.id}>
                    <a
                      href={`#${link.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection(link.id);
                      }}
                      className="inline-block py-0.5 text-slate-400 transition-colors hover:text-white"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="md:col-span-3">
              <div className="text-xs font-semibold text-white">Cairo Office</div>
              <p className="mt-3 text-sm leading-relaxed text-slate-400">{COMPANY_INFO.address}</p>
              <div className="mt-3 flex flex-col gap-1.5 font-mono text-xs text-[#BDE5F6]">
                <a href={`mailto:${COMPANY_INFO.email}`} className="hover:underline">
                  {COMPANY_INFO.email}
                </a>
                {COMPANY_INFO.phones.map((phone) => (
                  <a key={phone} href={`tel:${phone}`} className="hover:underline">
                    {phone}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col items-start justify-between gap-4 text-xs text-slate-400 sm:flex-row sm:items-center">
            <p>Copyright © 2026 GSD Technologies Egypt — All Rights Reserved.</p>
            <div className="flex items-center gap-4 font-mono text-slate-400">
              <a
                href="/sitemap.xml"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-white hover:underline"
              >
                sitemap.xml
              </a>
              <span aria-hidden="true">·</span>
              <span>gsd-me.com</span>
            </div>
          </div>
        </div>
      </footer>
      </div>
    </MotionConfig>
  );
}
