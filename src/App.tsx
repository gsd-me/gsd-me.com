import React, {useEffect, useRef, useState} from 'react';
import {motion, MotionConfig} from 'motion/react';
import {
  AlertCircle,
  ArrowRight,
  Building2,
  Check,
  Clock,
  Factory,
  Globe,
  Layers,
  Loader2,
  Mail,
  MapPin,
  Menu,
  Phone,
  Send,
  ShieldAlert,
  ShieldCheck,
  ShoppingBag,
  Truck,
  Wrench,
  X,
} from 'lucide-react';
import {ECOSYSTEM_SERVICES} from './data/gsdContent';
import {ECOSYSTEM_SERVICES_AR, getGsdContent} from './data/gsdContentAr';
import {getSolutionSubpageById, getSolutionSubpages} from './data/solutionSubpagesAr';
import {
  getSectionByPathname,
  isSolutionSubpageId,
  SECTION_SEO_BY_ID,
  SectionId,
} from './seo/sectionMeta';
import {useSectionSeo} from './seo/useSectionSeo';
import {CarrotVisionDashboardPreview} from './components/CarrotVisionDashboardPreview';
import {SolutionSubpageView} from './components/SolutionSubpageView';
import {PageHeaderBanner} from './components/PageHeaderBanner';
import {useLanguage, type Language} from './i18n/LanguageContext';
import {UI_STRINGS} from './i18n/uiStrings';

const STORY_ICONS = {
  cement: Factory,
  manufacturing: ShieldAlert,
  workshop: Wrench,
  fleet: Truck,
  retail: ShoppingBag,
} as const;

const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

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

const SALES_EMAIL_ENDPOINT = 'https://formsubmit.co/ajax/sales@gsd-me.com';

const DEFAULT_EN_SOLUTION = `${ECOSYSTEM_SERVICES[0].name} — ${ECOSYSTEM_SERVICES[0].category}`;
const DEFAULT_AR_SOLUTION = `${ECOSYSTEM_SERVICES_AR[0].name} — ${ECOSYSTEM_SERVICES_AR[0].category}`;

function getInitialForm(lang: Language): DemoFormState {
  return {
    name: '',
    company: '',
    email: '',
    phone: '',
    solution: lang === 'ar' ? DEFAULT_AR_SOLUTION : DEFAULT_EN_SOLUTION,
    notes: '',
  };
}

function buildSalesMailtoUrl(
  record: Partial<DemoFormState>,
  lang: Language,
  recipientEmail: string,
  sourceUrl?: string,
): string {
  const defaultSol = lang === 'ar' ? DEFAULT_AR_SOLUTION : DEFAULT_EN_SOLUTION;
  const solution = record.solution?.trim() || defaultSol;
  const senderLabel = record.name?.trim() || (lang === 'ar' ? 'زائر الموقع' : 'Website Visitor');
  const companyLabel = record.company?.trim();
  const subject =
    lang === 'ar'
      ? `استفسار GSD (${solution}) — ${senderLabel}${companyLabel ? ` (${companyLabel})` : ''}`
      : `GSD Inquiry (${solution}) — ${senderLabel}${companyLabel ? ` (${companyLabel})` : ''}`;

  const pageLink =
    sourceUrl || (typeof window !== 'undefined' ? window.location.href : 'https://gsd-me.com');

  const lines =
    lang === 'ar'
      ? [
          'السادة فريق مبيعات GSD Technologies مصر،',
          '',
          'مرفق تفاصيل طلب العرض التوضيحي / التجربة الميدانية:',
          '',
          `الاسم الكامل: ${record.name?.trim() || '[يرجى كتابة الاسم]'}`,
          `الشركة / المؤسسة: ${companyLabel || 'غير محدد'}`,
          `البريد الإلكتروني للعمل: ${record.email?.trim() || '[يرجى كتابة البريد]'}`,
          `رقم الهاتف: ${record.phone?.trim() || 'غير محدد'}`,
          `الحل / المنصة المطلوبة: ${solution}`,
          `تفاصيل الموقع أو الأهداف: ${record.notes?.trim() || 'غير محدد'}`,
          `صفحة المصدر: ${pageLink}`,
        ]
      : [
          'Hello GSD Technologies Egypt Sales Team,',
          '',
          'Please find my demo / POC / contact inquiry details below:',
          '',
          `Full Name: ${record.name?.trim() || '[Please enter your name]'}`,
          `Organization: ${companyLabel || 'Not specified'}`,
          `Work Email: ${record.email?.trim() || '[Please enter your work email]'}`,
          `Phone Number: ${record.phone?.trim() || 'Not specified'}`,
          `Solution / Platform: ${solution}`,
          `Site Details / Objectives: ${record.notes?.trim() || 'Not specified'}`,
          `Source Page: ${pageLink}`,
        ];

  return `mailto:${recipientEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
    lines.join('\n'),
  )}`;
}

function resolveInitialRoute(): SectionId {
  if (typeof window === 'undefined') {
    return 'top';
  }
  const fromPath = getSectionByPathname(window.location.pathname);
  if (fromPath) {
    return fromPath;
  }
  const hashId = window.location.hash.replace('#', '') as SectionId;
  if (hashId && hashId in SECTION_SEO_BY_ID) {
    return hashId;
  }
  return 'top';
}

export default function App() {
  const {lang, isRtl, toggleLang} = useLanguage();
  const t = UI_STRINGS[lang];
  const content = getGsdContent(lang);
  const localizedSubpages = getSolutionSubpages(lang);

  const [activeRouteId, setActiveRouteId] = useState<SectionId>(resolveInitialRoute);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeVerticalId, setActiveVerticalId] = useState(content.verticalSolutions[0].id);
  const [selectedStoryId, setSelectedStoryId] = useState(content.successStories[0].id);
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

  const [form, setForm] = useState<DemoFormState>(() => getInitialForm(lang));
  const [formErrors, setFormErrors] = useState<Partial<Record<keyof DemoFormState, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deliveryStatus, setDeliveryStatus] = useState<'sent' | 'fallback' | null>(null);
  const [submittedRecord, setSubmittedRecord] = useState<
    (DemoFormState & {sourceUrl: string}) | null
  >(null);

  const nameInputRef = useRef<HTMLInputElement>(null);

  useSectionSeo(activeRouteId, lang);

  // Sync default untouched solution string when toggling language
  useEffect(() => {
    setForm((prev) => {
      if (lang === 'ar') {
        if (prev.solution === DEFAULT_EN_SOLUTION) {
          return {...prev, solution: DEFAULT_AR_SOLUTION};
        }
        if (prev.solution === UI_STRINGS.en.contact.generalOption) {
          return {...prev, solution: UI_STRINGS.ar.contact.generalOption};
        }
      } else {
        if (prev.solution === DEFAULT_AR_SOLUTION) {
          return {...prev, solution: DEFAULT_EN_SOLUTION};
        }
        if (prev.solution === UI_STRINGS.ar.contact.generalOption) {
          return {...prev, solution: UI_STRINGS.en.contact.generalOption};
        }
      }
      return prev;
    });
    setFormErrors({});
  }, [lang]);

  useEffect(() => {
    const initialHash = window.location.hash.replace('#', '');
    if (initialHash) {
      window.setTimeout(() => {
        document.getElementById(initialHash)?.scrollIntoView({behavior: 'smooth'});
      }, 90);
    }

    const handlePopState = () => {
      const nextRoute = resolveInitialRoute();
      setActiveRouteId(nextRoute);
      const nextHash = window.location.hash.replace('#', '');
      if (nextHash) {
        window.setTimeout(() => {
          document.getElementById(nextHash)?.scrollIntoView({behavior: 'smooth'});
        }, 70);
      } else {
        window.scrollTo({top: 0});
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const activeVertical =
    content.verticalSolutions.find((v) => v.id === activeVerticalId) ?? content.verticalSolutions[0];
  const activeStory =
    content.successStories.find((s) => s.id === selectedStoryId) ?? content.successStories[0];
  const activeSubpage = isSolutionSubpageId(activeRouteId)
    ? getSolutionSubpageById(activeRouteId, lang) ?? null
    : null;

  const activeKnownOptions = new Set<string>([
    t.contact.generalOption,
    ...content.ecosystemServices.map((service) => `${service.name} — ${service.category}`),
    ...content.verticalSolutions.map((vertical) =>
      t.contact.solutionsSuffix ? `${vertical.name} ${t.contact.solutionsSuffix}` : vertical.name,
    ),
    ...content.successStories.map((story) => `${t.contact.pocPrefix} ${story.sector}`),
  ]);

  const navigateToRoute = (routeId: SectionId, innerHash?: string) => {
    setMobileMenuOpen(false);
    const config = SECTION_SEO_BY_ID[routeId] ?? SECTION_SEO_BY_ID.top;
    const nextUrl = innerHash ? `${config.slug}#${innerHash}` : config.slug;
    if (window.location.pathname + window.location.hash !== nextUrl) {
      window.history.pushState(null, '', nextUrl);
    }
    setActiveRouteId(routeId);
    if (innerHash) {
      window.setTimeout(() => {
        document.getElementById(innerHash)?.scrollIntoView({behavior: 'smooth'});
      }, 80);
    } else {
      window.scrollTo({top: 0, behavior: 'smooth'});
    }
  };

  const navigateToSubpage = (slug: string) => {
    const matched = getSectionByPathname(slug);
    if (matched) {
      navigateToRoute(matched);
    }
  };

  const handleRequestDemo = (preselectedSolution?: string) => {
    setForm((prev) => ({
      ...prev,
      solution: preselectedSolution || t.contact.generalOption,
    }));
    setFormErrors({});
    setDeliveryStatus(null);
    setSubmittedRecord(null);
    setMobileMenuOpen(false);
    navigateToRoute('contact', 'demo-form');
    window.setTimeout(() => {
      nameInputRef.current?.focus();
    }, 240);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    const errors: Partial<Record<keyof DemoFormState, string>> = {};

    if (!form.name.trim()) {
      errors.name = t.contact.errors.name;
    }
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      errors.email = t.contact.errors.email;
    }
    if (form.phone.trim() && !/^[+\d\s()-]{7,20}$/.test(form.phone.trim())) {
      errors.phone = t.contact.errors.phone;
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    setIsSubmitting(true);

    const snapshot: DemoFormState & {sourceUrl: string} = {
      name: form.name.trim(),
      company: form.company.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      solution: form.solution,
      notes: form.notes.trim(),
      sourceUrl: window.location.href,
    };

    try {
      const response = await fetch(SALES_EMAIL_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: snapshot.name,
          company: snapshot.company || t.contact.confirm.notSpecified,
          email: snapshot.email,
          phone: snapshot.phone || t.contact.confirm.notSpecified,
          solution: snapshot.solution,
          notes: snapshot.notes || '—',
          language: lang.toUpperCase(),
          sourcePage: snapshot.sourceUrl,
          recipient: content.companyInfo.email,
          _subject: `GSD Inquiry (${snapshot.solution}) — ${snapshot.name}${
            snapshot.company ? ` (${snapshot.company})` : ''
          }`,
          _replyto: snapshot.email,
          _template: 'table',
        }),
      });

      const payload = (await response.json().catch(() => null)) as
        | {success?: boolean | string}
        | null;

      if (response.ok && (payload?.success === true || payload?.success === 'true')) {
        setSubmittedRecord(snapshot);
        setDeliveryStatus('sent');
        setForm(getInitialForm(lang));
      } else {
        setSubmittedRecord(snapshot);
        setDeliveryStatus('fallback');
      }
    } catch {
      setSubmittedRecord(snapshot);
      setDeliveryStatus('fallback');
    } finally {
      setIsSubmitting(false);
    }
  };

  const navItems: {id: SectionId; label: string; slug: string}[] = [
    {id: 'about', label: t.nav.about, slug: '/about'},
    {id: 'ecosystem', label: t.nav.ecosystem, slug: '/gsd-services-ecosystem'},
    {id: 'solutions', label: t.nav.solutions, slug: '/our-solutions'},
    {id: 'success-stories', label: t.nav.caseStudies, slug: '/success-stories'},
    {id: 'partners', label: t.nav.partners, slug: '/our-partners'},
    {id: 'contact', label: t.nav.contact, slug: '/contact-us'},
  ];

  const isSolutionsActive =
    activeRouteId === 'solutions' || isSolutionSubpageId(activeRouteId);

  const arrowDirClass = isRtl ? 'rotate-180' : '';

  return (
    <MotionConfig reducedMotion="user">
      <div
        dir={isRtl ? 'rtl' : 'ltr'}
        className="flex min-h-screen flex-col overflow-x-clip bg-[#F8FAFC] text-[#0B132B] antialiased"
      >
        {/* Zone-disciplined 3-part Top Navigation Bar */}
        <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur-md">
          <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:gap-5 sm:px-6 lg:gap-6 lg:px-8">
            {/* Zone 1: Official GSD brand logo */}
            <a
              href="/"
              aria-label={t.brandAriaLabel}
              onClick={(e) => {
                e.preventDefault();
                navigateToRoute('top');
              }}
              className="flex items-center whitespace-nowrap shrink-0 rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0B34D6]"
            >
              {!logoFailed ? (
                <img
                  src="/assets/aistudio/logo-GSD_a8de37a5.jpg"
                  alt={t.logoAlt}
                  referrerPolicy="no-referrer"
                  onError={() => setLogoFailed(true)}
                  className="h-10 w-auto rounded-md object-contain sm:h-11"
                />
              ) : (
                <span className="font-display text-lg font-extrabold tracking-tight text-[#040B29]">
                  GSD Technologies
                </span>
              )}
            </a>

            {/* Zone 2: Clean single-line page links */}
            <nav
              aria-label={isRtl ? 'التنقل الرئيسي' : 'Primary Navigation'}
              className="hidden md:flex items-center gap-4 lg:gap-5 text-sm font-medium text-slate-600"
            >
              {navItems.map((item) => {
                const isActive =
                  item.id === 'solutions' ? isSolutionsActive : activeRouteId === item.id;
                return (
                  <a
                    key={item.id}
                    href={item.slug}
                    aria-current={isActive ? 'page' : undefined}
                    onClick={(e) => {
                      e.preventDefault();
                      navigateToRoute(item.id);
                    }}
                    className={`whitespace-nowrap shrink-0 py-1 transition-colors duration-150 ${
                      isActive
                        ? 'font-semibold text-[#0B34D6] underline underline-offset-8'
                        : 'hover:text-[#0B34D6] hover:underline hover:underline-offset-8'
                    }`}
                  >
                    {item.label}
                  </a>
                );
              })}
            </nav>

            {/* Zone 3: Language Switcher + Primary CTA + Mobile drawer toggle */}
            <div className="flex items-center gap-2 shrink-0 sm:gap-2.5">
              <button
                type="button"
                onClick={toggleLang}
                aria-label={t.nav.switchToAria}
                className="inline-flex min-h-[40px] items-center justify-center gap-1.5 rounded-md border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-[#040B29] whitespace-nowrap shrink-0 transition-colors hover:border-[#0B34D6] hover:text-[#0B34D6] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0B34D6]"
              >
                <Globe className="h-3.5 w-3.5 text-[#0B34D6]" />
                <span>{t.nav.switchToLabel}</span>
              </button>
              <button
                type="button"
                onClick={() => handleRequestDemo()}
                className="hidden sm:inline-flex min-h-[40px] items-center justify-center rounded-md bg-[#0B34D6] px-4 py-2 text-sm font-medium text-white whitespace-nowrap shrink-0 transition-colors duration-150 hover:bg-[#06249E] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0B34D6]"
              >
                {t.nav.requestDemo}
              </button>
              <button
                type="button"
                aria-label={mobileMenuOpen ? t.nav.closeMenuAria : t.nav.openMenuAria}
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
              <nav
                aria-label={isRtl ? 'قائمة التنقل للهاتف' : 'Mobile Navigation'}
                className="flex flex-col gap-1"
              >
                {[
                  {label: t.nav.home, id: 'top' as SectionId, slug: '/'},
                  {label: t.nav.about, id: 'about' as SectionId, slug: '/about'},
                  {
                    label: t.nav.ecosystem,
                    id: 'ecosystem' as SectionId,
                    slug: '/gsd-services-ecosystem',
                  },
                  {label: t.nav.solutions, id: 'solutions' as SectionId, slug: '/our-solutions'},
                  {
                    label: t.nav.caseStudies,
                    id: 'success-stories' as SectionId,
                    slug: '/success-stories',
                  },
                  {label: t.nav.partners, id: 'partners' as SectionId, slug: '/our-partners'},
                  {label: t.nav.contact, id: 'contact' as SectionId, slug: '/contact-us'},
                ].map((item) => {
                  const isCurrent = activeRouteId === item.id;
                  return (
                    <a
                      key={item.id}
                      href={item.slug}
                      onClick={(e) => {
                        e.preventDefault();
                        navigateToRoute(item.id);
                      }}
                      className={`flex min-h-[44px] items-center justify-between border-b border-slate-100 py-2 text-start text-sm font-medium hover:text-[#0B34D6] ${
                        isCurrent ? 'font-semibold text-[#0B34D6]' : 'text-slate-800'
                      }`}
                    >
                      <span>{item.label}</span>
                      <ArrowRight className={`h-4 w-4 text-slate-400 ${arrowDirClass}`} />
                    </a>
                  );
                })}
                <div className="mt-3 grid grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() => {
                      toggleLang();
                      setMobileMenuOpen(false);
                    }}
                    className="inline-flex min-h-[44px] items-center justify-center gap-1.5 rounded-md border border-slate-300 bg-white px-3 py-2.5 text-sm font-semibold text-[#040B29] hover:border-[#0B34D6] hover:text-[#0B34D6]"
                  >
                    <Globe className="h-4 w-4 text-[#0B34D6]" />
                    <span>{t.nav.switchToLabel}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRequestDemo()}
                    className="min-h-[44px] rounded-md bg-[#0B34D6] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#06249E]"
                  >
                    {t.nav.requestDemo}
                  </button>
                </div>
              </nav>
            </div>
          )}
        </header>

        <main id="top" className="flex-1">
          {/* ============================================================== */}
          {/* DEDICATED PERSONA SOLUTION SUB-PAGES (/solutions/*)            */}
          {/* ============================================================== */}
          {activeSubpage && (
            <SolutionSubpageView
              data={activeSubpage}
              onNavigateHub={(sec) => {
                if (sec === 'ecosystem') navigateToRoute('ecosystem');
                else if (sec === 'solutions') navigateToRoute('solutions');
                else if (sec === 'contact') navigateToRoute('contact');
                else navigateToRoute('top');
              }}
              onNavigateSubpage={navigateToSubpage}
              onRequestDemo={handleRequestDemo}
            />
          )}

          {/* ============================================================== */}
          {/* HOME PAGE (/)                                                  */}
          {/* ============================================================== */}
          {activeRouteId === 'top' && (
            <>
              <section className="relative overflow-hidden bg-[#040B29] text-white">
                <div aria-hidden="true" className="pointer-events-none absolute inset-0">
                  <ResilientImage
                    src={content.sectionImages.heroControlCenter.src}
                    alt=""
                    fallbackTitle={
                      isRtl ? 'مركز عمليات GSD للتحكم' : 'GSD Operations Command Center'
                    }
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
                    <motion.div
                      initial={{opacity: 0, y: 20}}
                      animate={{opacity: 1, y: 0}}
                      transition={{duration: 0.5, ease: EASE_OUT}}
                      className="flex min-w-0 flex-col justify-between lg:col-span-7"
                    >
                      <div>
                        <p className="text-xs font-medium tracking-wide text-[#BDE5F6]">
                          {t.home.eyebrow}
                        </p>
                        <h1 className="mt-4 max-w-2xl font-display text-[clamp(2rem,4vw,3.5rem)] font-bold leading-[1.12] tracking-tight text-white sm:mt-5 [text-wrap:balance]">
                          {t.home.heroH1}
                        </h1>
                        <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-200 sm:mt-6 sm:text-lg">
                          {t.home.heroLead}
                        </p>
                      </div>

                      <div className="mt-8 flex flex-col items-stretch gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:items-center sm:gap-6">
                        <button
                          type="button"
                          onClick={() => handleRequestDemo()}
                          className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-md bg-white px-6 py-3 text-sm font-semibold text-[#040B29] whitespace-nowrap shrink-0 transition-colors duration-150 hover:bg-[#BDE5F6] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                        >
                          <span>{t.nav.requestDemo}</span>
                          <ArrowRight className={`h-4 w-4 ${arrowDirClass}`} />
                        </button>
                        <a
                          href="/gsd-services-ecosystem"
                          onClick={(e) => {
                            e.preventDefault();
                            navigateToRoute('ecosystem');
                          }}
                          className="inline-flex min-h-[44px] items-center justify-center gap-1.5 text-sm font-medium text-[#BDE5F6] whitespace-nowrap shrink-0 transition-colors hover:text-white hover:underline hover:underline-offset-4 sm:justify-start"
                        >
                          <span>{t.home.heroExploreEcosystem}</span>
                          <ArrowRight className={`h-4 w-4 ${arrowDirClass}`} />
                        </a>
                      </div>
                    </motion.div>

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
                            alt={t.logoAlt}
                            referrerPolicy="no-referrer"
                            onError={() => setLogoFailed(true)}
                            className="block h-auto w-full object-contain"
                          />
                        ) : (
                          <div className="flex h-28 flex-col items-center justify-center px-6 text-center sm:h-32">
                            <span className="font-display text-2xl font-bold tracking-wider text-white">
                              GSD TECHNOLOGIES
                            </span>
                            <span className="mt-1 text-xs tracking-[0.22em] text-[#BDE5F6]">
                              {content.companyInfo.tagline}
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="relative flex-1 overflow-hidden">
                        <ResilientImage
                          src={content.sectionImages.heroControlCenter.src}
                          alt={content.sectionImages.heroControlCenter.alt}
                          fallbackTitle={
                            isRtl ? 'مركز عمليات GSD للتحكم' : 'GSD Operations Command Center'
                          }
                          className="aspect-[16/9] h-full w-full object-cover object-center"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#040B29] via-[#040B29]/30 to-transparent" />
                        <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                          <p className="text-xs font-medium text-[#BDE5F6]">
                            {t.home.heroCardEyebrow}
                          </p>
                          <p className="mt-1 font-display text-base font-semibold text-white sm:text-lg">
                            {t.home.heroCardTitle}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 px-5 py-4 text-xs text-slate-200 sm:px-6">
                        <a
                          dir="ltr"
                          href={`mailto:${content.companyInfo.email}`}
                          className="font-mono text-[#BDE5F6] transition-colors hover:text-white hover:underline"
                        >
                          {content.companyInfo.email}
                        </a>
                        <span aria-hidden="true" className="hidden text-white/30 sm:inline">
                          ·
                        </span>
                        <a
                          dir="ltr"
                          href={`tel:${content.companyInfo.phones[0]}`}
                          className="font-mono text-white transition-colors hover:text-[#BDE5F6] hover:underline"
                        >
                          {content.companyInfo.phones[0]}
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
                    {content.heroMetrics.map((metric) => (
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

              {/* Multi-Page Architecture Directory */}
              <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
                <div className="flex flex-col justify-between gap-4 border-b border-slate-200 pb-6 md:flex-row md:items-end">
                  <div>
                    <p className="text-xs font-medium text-[#0B34D6]">{t.home.directoryEyebrow}</p>
                    <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-[#040B29] sm:text-3xl">
                      {t.home.directoryHeading}
                    </h2>
                  </div>
                  <p className="max-w-md text-sm text-slate-600">{t.home.directorySubcopy}</p>
                </div>

                <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {t.home.directoryCards.map((card) => {
                    const slug = SECTION_SEO_BY_ID[card.id].slug;
                    return (
                      <a
                        key={card.id}
                        href={slug}
                        onClick={(e) => {
                          e.preventDefault();
                          navigateToRoute(card.id);
                        }}
                        className="group flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-6 transition-colors hover:border-[#0B34D6]"
                      >
                        <div>
                          <div className="font-mono text-xs font-semibold text-[#0B34D6]">
                            {card.index}
                          </div>
                          <h3 className="mt-2 font-display text-lg font-bold text-[#040B29] group-hover:text-[#0B34D6]">
                            {card.title}
                          </h3>
                          <p className="mt-2 text-sm leading-relaxed text-slate-600">
                            {card.subtitle}
                          </p>
                        </div>
                        <div className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold text-[#040B29] group-hover:text-[#0B34D6]">
                          <span>{card.cta}</span>
                          <ArrowRight className={`h-3.5 w-3.5 ${arrowDirClass}`} />
                        </div>
                      </a>
                    );
                  })}
                </div>
              </section>

              {/* Trusted By Leaders Strip on Home */}
              <section className="border-y border-slate-200 bg-white py-14 sm:py-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                  <div className="flex flex-col justify-between gap-4 border-b border-slate-200 pb-6 md:flex-row md:items-end">
                    <div>
                      <p className="text-xs font-medium text-[#0B34D6]">{t.home.customersEyebrow}</p>
                      <h2 className="mt-1 font-display text-2xl font-bold text-[#040B29]">
                        {t.home.customersHeading}
                      </h2>
                    </div>
                    <a
                      href="/success-stories"
                      onClick={(e) => {
                        e.preventDefault();
                        navigateToRoute('success-stories');
                      }}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0B34D6] hover:underline"
                    >
                      <span>{t.home.customersLink}</span>
                      <ArrowRight className={`h-3.5 w-3.5 ${arrowDirClass}`} />
                    </a>
                  </div>

                  <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                    {content.customers.map((customer) => (
                      <div
                        key={`${customer.name}-${customer.sector}`}
                        className="flex flex-col items-center justify-between rounded-xl border border-slate-200 bg-[#F8FAFC] p-4 text-center"
                      >
                        <div className="flex h-12 items-center justify-center">
                          <VendorLogo
                            src={customer.logoSrc}
                            alt={`${customer.name} logo`}
                            name={customer.name}
                            className="max-h-10 w-auto max-w-[120px] object-contain"
                          />
                        </div>
                        <div className="mt-2.5 text-xs font-semibold text-[#040B29]">
                          {customer.name}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Bottom CTA Band */}
              <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
                <div className="flex flex-col items-start justify-between gap-6 rounded-xl bg-[#040B29] p-8 text-white sm:flex-row sm:items-center sm:p-10">
                  <div>
                    <p className="text-xs font-medium text-[#BDE5F6]">{t.home.bottomCtaEyebrow}</p>
                    <h2 className="mt-1 font-display text-2xl font-bold text-white">
                      {t.home.bottomCtaTitle}
                    </h2>
                    <p className="mt-2 max-w-xl text-sm text-slate-300">{t.home.bottomCtaBody}</p>
                  </div>
                  <a
                    href="/contact-us"
                    onClick={(e) => {
                      e.preventDefault();
                      handleRequestDemo();
                    }}
                    className="inline-flex min-h-[44px] items-center gap-2 rounded-md bg-white px-6 py-3 text-sm font-semibold text-[#040B29] whitespace-nowrap shrink-0 transition-colors hover:bg-[#BDE5F6]"
                  >
                    <span>{t.home.bottomCtaButton}</span>
                    <ArrowRight className={`h-4 w-4 ${arrowDirClass}`} />
                  </a>
                </div>
              </section>
            </>
          )}

          {/* ============================================================== */}
          {/* ABOUT PAGE (/about)                                            */}
          {/* ============================================================== */}
          {activeRouteId === 'about' && (
            <>
              <PageHeaderBanner
                breadcrumbLabel={t.about.breadcrumb}
                eyebrow={t.about.eyebrow}
                title={t.about.title}
                description={content.companyInfo.story}
                onNavigateHome={() => navigateToRoute('top')}
                onRequestDemo={() => handleRequestDemo()}
              />

              <section className="border-b border-slate-200 bg-white py-14 sm:py-20">
                <div className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:gap-12 lg:px-8">
                  <div className="min-w-0 lg:col-span-5">
                    <div className="overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
                      <ResilientImage
                        src={content.sectionImages.aboutOffice.src}
                        alt={content.sectionImages.aboutOffice.alt}
                        fallbackTitle={content.companyInfo.legalName}
                        className="aspect-[4/3] w-full object-cover object-center"
                      />
                    </div>
                    <h2 className="mt-6 font-display text-xl font-bold text-[#040B29]">
                      {t.about.officeHeading}
                    </h2>
                    <p className="mt-3 text-sm leading-relaxed text-slate-600">
                      {t.about.officeSummary}
                    </p>
                  </div>

                  <div className="min-w-0 space-y-6 border-t border-slate-200 pt-8 lg:col-span-7 lg:border-s lg:border-t-0 lg:ps-10 lg:pt-0">
                    <div className="border-b border-slate-200 pb-6">
                      <div className="font-mono text-xs font-medium text-[#0B34D6]">01</div>
                      <h2 className="mt-1 font-display text-lg font-semibold text-[#040B29]">
                        {t.about.missionTitle}
                      </h2>
                      <p className="mt-2 text-sm leading-relaxed text-slate-600">
                        {content.companyInfo.mission}
                      </p>
                    </div>
                    <div className="border-b border-slate-200 pb-6">
                      <div className="font-mono text-xs font-medium text-[#0B34D6]">02</div>
                      <h2 className="mt-1 font-display text-lg font-semibold text-[#040B29]">
                        {t.about.visionTitle}
                      </h2>
                      <p className="mt-2 text-sm leading-relaxed text-slate-600">
                        {content.companyInfo.vision}
                      </p>
                    </div>
                    <div>
                      <div className="font-mono text-xs font-medium text-[#0B34D6]">03</div>
                      <h2 className="mt-1 font-display text-lg font-semibold text-[#040B29]">
                        {t.about.approachTitle}
                      </h2>
                      <p className="mt-2 text-sm leading-relaxed text-slate-600">
                        {content.companyInfo.approach}
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
                <div className="flex flex-col justify-between gap-4 border-b border-slate-200 pb-6 md:flex-row md:items-end">
                  <div>
                    <p className="text-xs font-medium text-[#0B34D6]">{t.about.customersEyebrow}</p>
                    <h2 className="mt-1 font-display text-2xl font-bold text-[#040B29]">
                      {t.about.customersHeading}
                    </h2>
                  </div>
                  <a
                    href="/our-partners"
                    onClick={(e) => {
                      e.preventDefault();
                      navigateToRoute('partners');
                    }}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0B34D6] hover:underline"
                  >
                    <span>{t.about.partnersLink}</span>
                    <ArrowRight className={`h-3.5 w-3.5 ${arrowDirClass}`} />
                  </a>
                </div>

                <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {content.customers.map((customer) => (
                    <div
                      key={`${customer.name}-${customer.sector}`}
                      className="flex min-w-0 flex-col justify-between rounded-xl border border-slate-200 bg-white p-5"
                    >
                      <div className="flex h-16 items-center justify-center py-2">
                        <VendorLogo
                          src={customer.logoSrc}
                          alt={`${customer.name} logo`}
                          name={customer.name}
                          className="max-h-12 w-auto max-w-[148px] object-contain"
                        />
                      </div>
                      <div className="mt-4 border-t border-slate-100 pt-3.5">
                        <h3 className="font-display text-sm font-bold text-[#040B29]">
                          {customer.name}
                        </h3>
                        <p className="mt-1 text-xs text-slate-600">{customer.sector}</p>
                        {customer.note && (
                          <p className="mt-1 text-xs text-slate-400">{customer.note}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </>
          )}

          {/* ============================================================== */}
          {/* ECOSYSTEM PAGE (/gsd-services-ecosystem)                       */}
          {/* ============================================================== */}
          {activeRouteId === 'ecosystem' && (
            <>
              <PageHeaderBanner
                breadcrumbLabel={t.ecosystem.breadcrumb}
                eyebrow={t.ecosystem.eyebrow}
                title={t.ecosystem.title}
                description={t.ecosystem.description}
                onNavigateHome={() => navigateToRoute('top')}
                onRequestDemo={() => handleRequestDemo()}
              />

              <section id="ecosystem" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
                {/* Editorial 16:9 Industrial AI Showcase Image */}
                <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-[#040B29]">
                  <ResilientImage
                    src={content.sectionImages.ecosystemIndustrial.src}
                    alt={content.sectionImages.ecosystemIndustrial.alt}
                    fallbackTitle="Industrial AI Video Analytics"
                    className="aspect-[16/10] min-h-[210px] w-full object-cover object-center sm:aspect-[16/8] lg:aspect-[16/7]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#040B29]/95 via-[#040B29]/45 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 flex flex-col justify-between gap-2 p-5 text-white sm:flex-row sm:items-end sm:p-8">
                    <div className="min-w-0">
                      <p className="text-xs font-medium text-[#BDE5F6]">
                        {t.ecosystem.bannerEyebrow}
                      </p>
                      <p className="mt-1 font-display text-base font-semibold sm:text-xl">
                        {t.ecosystem.bannerTitle}
                      </p>
                    </div>
                    <span className="font-mono text-xs text-slate-200 whitespace-nowrap shrink-0">
                      {t.ecosystem.bannerBadge}
                    </span>
                  </div>
                </div>

                <div className="mt-8 grid grid-cols-1 gap-6 sm:mt-10 lg:grid-cols-6">
                  {content.ecosystemServices.map((service, index) => {
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
                      <article
                        key={service.id}
                        id={`ecosystem-${service.id}`}
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

                            <h2 className="mt-4 font-display text-xl font-bold tracking-tight text-[#040B29] sm:text-2xl">
                              {service.name}
                            </h2>
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
                                  <div
                                    dir="ltr"
                                    className={`font-mono text-base font-semibold text-[#040B29] ${
                                      isRtl ? 'text-right' : 'text-left'
                                    }`}
                                  >
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
                                    document
                                      .getElementById('carrot-vision-qhse')
                                      ?.scrollIntoView({behavior: 'smooth'});
                                  }}
                                  className="inline-flex min-h-[44px] items-center gap-1.5 rounded-md border border-slate-200 px-3.5 py-2 text-xs font-medium text-slate-700 whitespace-nowrap shrink-0 transition-colors hover:border-[#0B34D6] hover:text-[#0B34D6]"
                                >
                                  <span>{t.ecosystem.openModuleLabel}</span>
                                </button>
                              )}
                              <button
                                type="button"
                                onClick={() => handleRequestDemo(`${service.name} — ${service.category}`)}
                                className="inline-flex min-h-[44px] items-center gap-1.5 rounded-md border border-slate-200 px-4 py-2 text-xs font-semibold text-[#040B29] whitespace-nowrap shrink-0 transition-colors hover:border-[#0B34D6] hover:bg-[#0B34D6] hover:text-white"
                              >
                                <span>{t.nav.requestDemo}</span>
                                <ArrowRight className={`h-3.5 w-3.5 ${arrowDirClass}`} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>

                {/* Interactive Ecosystem Platform Deep-Dive */}
                <div
                  id="carrot-vision-qhse"
                  className="mt-10 overflow-hidden rounded-xl border border-slate-200 bg-white sm:mt-12"
                >
                  <div
                    role="tablist"
                    aria-label={t.ecosystem.deepDiveHeading}
                    className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 bg-[#040B29] px-6 py-4 text-white sm:px-8"
                  >
                    <span className="text-xs font-medium text-[#BDE5F6]">
                      {t.ecosystem.deepDiveEyebrow}
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {(
                        [
                          {id: 'carrot-vision', label: `01. ${t.ecosystem.deepDiveTabs.carrot}`},
                          {
                            id: 'gsd-ai-attendance',
                            label: `07. ${t.ecosystem.deepDiveTabs.attendance}`,
                          },
                          {id: 'retail-command', label: `08. ${t.ecosystem.deepDiveTabs.retail}`},
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
                            <p className="text-xs font-medium text-[#0B34D6]">
                              {content.carrotVisionData.eyebrow}
                            </p>
                          </div>
                          <h2 className="mt-4 font-display text-2xl font-bold tracking-tight text-[#040B29] sm:text-3xl [text-wrap:balance]">
                            {content.carrotVisionData.title}
                          </h2>
                          <p className="mt-2 text-sm font-medium text-slate-800">
                            {content.carrotVisionData.tagline}
                          </p>
                          <p className="mt-3 text-sm leading-relaxed text-slate-600">
                            {content.carrotVisionData.summary}
                          </p>
                        </div>

                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center shrink-0">
                          <button
                            type="button"
                            onClick={() =>
                              handleRequestDemo(
                                `${content.ecosystemServices[0].name} — ${content.ecosystemServices[0].category}`,
                              )
                            }
                            className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-md bg-[#0B34D6] px-5 py-2.5 text-xs font-semibold text-white whitespace-nowrap shrink-0 transition-colors hover:bg-[#06249E]"
                          >
                            <span>{t.ecosystem.carrot.cta}</span>
                            <ArrowRight className={`h-3.5 w-3.5 ${arrowDirClass}`} />
                          </button>
                        </div>
                      </div>

                      <div
                        role="tablist"
                        aria-label={t.ecosystem.deepDiveTabs.carrot}
                        className="flex flex-wrap gap-2 border-b border-slate-200 bg-[#F8FAFC] px-6 py-3.5 sm:px-8"
                      >
                        {(
                          [
                            {id: 'architecture', label: t.ecosystem.carrot.tabs.architecture},
                            {id: 'modules', label: t.ecosystem.carrot.tabs.modules},
                            {id: 'standards', label: t.ecosystem.carrot.tabs.standards},
                            {id: 'proof', label: t.ecosystem.carrot.tabs.proof},
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
                                  : 'border border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:text-[#040B29]'
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
                            <div className="grid grid-cols-1 gap-6 border-b border-slate-200 pb-8 md:grid-cols-3">
                              {content.carrotVisionData.automatedAssistantPillars.map((pillar, idx) => (
                                <div key={pillar.title} className="min-w-0">
                                  <div className="font-mono text-xs font-medium text-[#0B34D6]">
                                    0{idx + 1} · {t.ecosystem.carrot.pillarPrefix}
                                  </div>
                                  <h3 className="mt-1.5 font-display text-lg font-bold text-[#040B29]">
                                    {pillar.title}
                                  </h3>
                                  <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
                                    {pillar.detail}
                                  </p>
                                </div>
                              ))}
                            </div>

                            <div>
                              <h3 className="font-display text-base font-bold text-[#040B29]">
                                {t.ecosystem.carrot.workflowHeading}
                              </h3>
                              <div className="mt-4 grid grid-cols-1 gap-6 border-b border-slate-200 pb-8 sm:grid-cols-2 lg:grid-cols-4">
                                {content.carrotVisionData.workflowSteps.map((step) => (
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
                              <h3 className="font-display text-base font-bold text-[#040B29]">
                                {t.ecosystem.carrot.whyHeading}
                              </h3>
                              <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
                                {content.carrotVisionData.differentiators.map((diff) => (
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
                            {content.carrotVisionData.suites.map((suite, suiteIdx) => (
                              <div
                                key={suite.id}
                                className={`min-w-0 ${
                                  suiteIdx >= 2 ? 'border-t border-slate-200 pt-6' : ''
                                } ${
                                  suiteIdx === 1
                                    ? 'border-t border-slate-200 pt-6 md:border-t-0 md:pt-0'
                                    : ''
                                }`}
                              >
                                <div className="font-mono text-xs font-medium text-[#0B34D6]">
                                  0{suiteIdx + 1} · {suite.subtitle}
                                </div>
                                <h3 className="mt-1 font-display text-lg font-bold text-[#040B29]">
                                  {suite.title}
                                </h3>
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
                                  {t.ecosystem.carrot.standardsEyebrow}
                                </p>
                                <h3 className="mt-1 font-display text-xl font-bold text-[#040B29]">
                                  {t.ecosystem.carrot.standardsHeading}
                                </h3>
                              </div>
                              <span className="font-mono text-xs text-slate-500 whitespace-nowrap shrink-0">
                                {t.ecosystem.carrot.standardsBadge}
                              </span>
                            </div>

                            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                              {content.carrotVisionData.standards.map((std) => (
                                <div key={std.code} className="min-w-0 border-b border-slate-100 pb-6">
                                  <div dir="ltr" className={`font-mono text-xs font-semibold text-[#0B34D6] ${isRtl ? 'text-right' : 'text-left'}`}>
                                    {std.code}
                                  </div>
                                  <h4 className="mt-1.5 font-display text-lg font-bold text-[#040B29]">
                                    {std.title}
                                  </h4>
                                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                                    {std.detail}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {carrotTab === 'proof' && (
                          <div className="space-y-8">
                            <div className="grid grid-cols-1 gap-6 border-b border-slate-200 pb-8 lg:grid-cols-3">
                              {content.carrotVisionData.controlRoomCapabilities.map((cap, idx) => (
                                <div key={cap.title} className="min-w-0">
                                  <div className="font-mono text-xs font-medium text-[#0B34D6]">
                                    0{idx + 1} · {t.ecosystem.carrot.controlPrefix}
                                  </div>
                                  <h3 className="mt-1.5 font-display text-base font-bold text-[#040B29]">
                                    {cap.title}
                                  </h3>
                                  <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
                                    {cap.detail}
                                  </p>
                                </div>
                              ))}
                            </div>

                            <div>
                              <h3 className="font-display text-base font-bold text-[#040B29]">
                                {t.ecosystem.carrot.proofHeading}
                              </h3>
                              <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2">
                                {content.carrotVisionData.liveSiteProofs.map((proof) => (
                                  <div
                                    key={proof.title}
                                    className="min-w-0 border-b border-slate-100 pb-5"
                                  >
                                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                                      <span className="font-medium text-slate-500">
                                        {proof.location}
                                      </span>
                                      {proof.metric && (
                                        <span className="font-mono font-semibold text-[#0B34D6]">
                                          {proof.metric}
                                        </span>
                                      )}
                                    </div>
                                    <h4 className="mt-1.5 font-display text-base font-bold text-[#040B29]">
                                      {proof.title}
                                    </h4>
                                    <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
                                      {proof.detail}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}

                        <CarrotVisionDashboardPreview />
                      </div>
                    </>
                  )}

                  {activeDeepDive === 'gsd-ai-attendance' && (
                    <>
                      <div className="flex flex-col justify-between gap-6 border-b border-slate-200 p-6 sm:p-8 lg:flex-row lg:items-end">
                        <div className="max-w-3xl">
                          <p className="text-xs font-medium text-[#0B34D6]">
                            {content.smartAttendanceData.eyebrow}
                          </p>
                          <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-[#040B29] sm:text-3xl [text-wrap:balance]">
                            {content.smartAttendanceData.title}
                          </h2>
                          <p className="mt-2 text-sm font-medium text-slate-800">
                            {content.smartAttendanceData.tagline}
                          </p>
                          <p className="mt-3 text-sm leading-relaxed text-slate-600">
                            {content.smartAttendanceData.summary}
                          </p>
                        </div>

                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center shrink-0">
                          <button
                            type="button"
                            onClick={() =>
                              handleRequestDemo(
                                `${content.ecosystemServices[6].name} — ${content.ecosystemServices[6].category}`,
                              )
                            }
                            className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-md bg-[#0B34D6] px-5 py-2.5 text-xs font-semibold text-white whitespace-nowrap shrink-0 transition-colors hover:bg-[#06249E]"
                          >
                            <span>{t.ecosystem.attendance.cta}</span>
                            <ArrowRight className={`h-3.5 w-3.5 ${arrowDirClass}`} />
                          </button>
                        </div>
                      </div>

                      <div
                        role="tablist"
                        aria-label={t.ecosystem.deepDiveTabs.attendance}
                        className="flex flex-wrap gap-2 border-b border-slate-200 bg-[#F8FAFC] px-6 py-3.5 sm:px-8"
                      >
                        {(
                          [
                            {id: 'overview', label: t.ecosystem.attendance.tabs.overview},
                            {id: 'hr-tools', label: t.ecosystem.attendance.tabs.hrTools},
                            {id: 'comparison', label: t.ecosystem.attendance.tabs.comparison},
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
                                  : 'border border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:text-[#040B29]'
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
                              {content.smartAttendanceData.savingsMetrics.map((metric) => (
                                <div key={metric.label} className="min-w-0">
                                  <div
                                    dir="ltr"
                                    className={`font-mono text-2xl font-bold text-[#0B34D6] sm:text-3xl ${
                                      isRtl ? 'text-right' : 'text-left'
                                    }`}
                                  >
                                    {metric.value}
                                  </div>
                                  <h3 className="mt-1.5 font-display text-base font-bold text-[#040B29]">
                                    {metric.label}
                                  </h3>
                                  <p className="mt-1 text-sm leading-relaxed text-slate-600">
                                    {metric.detail}
                                  </p>
                                </div>
                              ))}
                            </div>

                            <div>
                              <h3 className="font-display text-base font-bold text-[#040B29]">
                                {t.ecosystem.attendance.setupHeading}
                              </h3>
                              <div className="mt-4 grid grid-cols-1 gap-6 border-b border-slate-200 pb-8 sm:grid-cols-2 lg:grid-cols-4">
                                {content.smartAttendanceData.setupSteps.map((step) => (
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
                              <h3 className="font-display text-base font-bold text-[#040B29]">
                                {t.ecosystem.attendance.replacesHeading}
                              </h3>
                              <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-3">
                                {content.smartAttendanceData.challengesReplaced.map((item, idx) => (
                                  <div key={item.title} className="min-w-0">
                                    <div className="font-mono text-xs font-medium text-slate-500">
                                      0{idx + 1} · {t.ecosystem.attendance.replacesPrefix}
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
                            {content.smartAttendanceData.hrCapabilities.map((cap, idx) => (
                              <div key={cap.title} className="min-w-0 border-b border-slate-100 pb-6">
                                <div className="font-mono text-xs font-medium text-[#0B34D6]">
                                  0{idx + 1} · {t.ecosystem.attendance.hrPrefix}
                                </div>
                                <h3 className="mt-1.5 font-display text-lg font-bold text-[#040B29]">
                                  {cap.title}
                                </h3>
                                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                                  {cap.detail}
                                </p>
                              </div>
                            ))}
                          </div>
                        )}

                        {attendanceTab === 'comparison' && (
                          <div className="overflow-x-auto">
                            <table className="w-full min-w-[540px] border-collapse text-start text-sm">
                              <thead>
                                <tr className="border-b border-slate-200 text-xs font-semibold text-slate-500">
                                  <th className="py-3 pe-4 text-start">
                                    {t.ecosystem.attendance.tableHeaders.point}
                                  </th>
                                  <th className="bg-[#F8FAFC] px-4 py-3 text-start text-[#0B34D6]">
                                    {t.ecosystem.attendance.tableHeaders.inHouse}
                                  </th>
                                  <th className="py-3 ps-4 text-start">
                                    {t.ecosystem.attendance.tableHeaders.cloud}
                                  </th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-slate-100">
                                {content.smartAttendanceData.comparison.map((row) => (
                                  <tr key={row.point}>
                                    <td className="py-4 pe-4 font-semibold text-[#040B29]">
                                      {row.point}
                                    </td>
                                    <td className="bg-[#F8FAFC] px-4 py-4 font-medium text-[#040B29]">
                                      {row.inHouse}
                                    </td>
                                    <td className="py-4 ps-4 text-slate-600">{row.cloud}</td>
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
                            {content.retailCommandData.eyebrow}
                          </p>
                          <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-[#040B29] sm:text-3xl [text-wrap:balance]">
                            {content.retailCommandData.title}
                          </h2>
                          <p className="mt-2 text-sm font-medium text-slate-800">
                            {content.retailCommandData.tagline}
                          </p>
                          <p className="mt-3 text-sm leading-relaxed text-slate-600">
                            {content.retailCommandData.summary}
                          </p>
                        </div>

                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center shrink-0">
                          <button
                            type="button"
                            onClick={() =>
                              handleRequestDemo(
                                `${content.ecosystemServices[7].name} — ${content.ecosystemServices[7].category}`,
                              )
                            }
                            className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-md bg-[#0B34D6] px-5 py-2.5 text-xs font-semibold text-white whitespace-nowrap shrink-0 transition-colors hover:bg-[#06249E]"
                          >
                            <span>{t.ecosystem.retail.cta}</span>
                            <ArrowRight className={`h-3.5 w-3.5 ${arrowDirClass}`} />
                          </button>
                        </div>
                      </div>

                      <div
                        role="tablist"
                        aria-label={t.ecosystem.deepDiveTabs.retail}
                        className="flex flex-wrap gap-2 border-b border-slate-200 bg-[#F8FAFC] px-6 py-3.5 sm:px-8"
                      >
                        {(
                          [
                            {id: 'architecture', label: t.ecosystem.retail.tabs.architecture},
                            {id: 'virtual-manager', label: t.ecosystem.retail.tabs.virtualManager},
                            {id: 'roi', label: t.ecosystem.retail.tabs.roi},
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
                                  : 'border border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:text-[#040B29]'
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
                              {content.retailCommandData.architecturePillars.map((pillar) => (
                                <div key={pillar.index} className="min-w-0">
                                  <div className="font-mono text-xs font-medium text-[#0B34D6]">
                                    {pillar.index} · {pillar.subtitle}
                                  </div>
                                  <h3 className="mt-1.5 font-display text-lg font-bold text-[#040B29]">
                                    {pillar.title}
                                  </h3>
                                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                                    {pillar.detail}
                                  </p>
                                </div>
                              ))}
                            </div>

                            <div className="flex flex-col justify-between gap-4 border-b border-slate-200 pb-8 md:flex-row md:items-center">
                              <div>
                                <div className="text-xs font-medium text-[#0B34D6]">
                                  {t.ecosystem.retail.trueCrEyebrow}
                                </div>
                                <h3 className="mt-1 font-display text-lg font-bold text-[#040B29]">
                                  {t.ecosystem.retail.trueCrTitle}
                                </h3>
                              </div>
                              <div className="rounded-lg border border-slate-200 bg-[#F8FAFC] px-4 py-3 font-mono text-xs font-semibold text-[#040B29] sm:text-sm">
                                {content.retailCommandData.conversionFormula}
                              </div>
                            </div>

                            <div>
                              <h3 className="font-display text-base font-bold text-[#040B29]">
                                {t.ecosystem.retail.blindSpotsHeading}
                              </h3>
                              <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-3">
                                {content.retailCommandData.blindSpotsSolved.map((item) => (
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
                            {content.retailCommandData.virtualManagerCapabilities.map((cap) => (
                              <div
                                key={cap.index}
                                className="min-w-0 border-b border-slate-100 pb-6 lg:border-b-0 lg:pb-0"
                              >
                                <div className="font-mono text-xs font-medium text-[#0B34D6]">
                                  {cap.index} · {t.ecosystem.retail.executivePrefix}
                                </div>
                                <h3 className="mt-1.5 font-display text-lg font-bold text-[#040B29]">
                                  {cap.title}
                                </h3>
                                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                                  {cap.detail}
                                </p>
                              </div>
                            ))}
                          </div>
                        )}

                        {retailTab === 'roi' && (
                          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                            {content.retailCommandData.businessImpact.map((impact) => (
                              <div key={impact.index} className="min-w-0 border-b border-slate-100 pb-6">
                                <div className="font-mono text-xs font-medium text-[#0B34D6]">
                                  {impact.index} · {t.ecosystem.retail.roiPrefix}
                                </div>
                                <h3 className="mt-1.5 font-display text-lg font-bold text-[#040B29]">
                                  {impact.title}
                                </h3>
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
                </div>
              </section>
            </>
          )}

          {/* ============================================================== */}
          {/* SOLUTIONS HUB PAGE (/our-solutions)                            */}
          {/* ============================================================== */}
          {activeRouteId === 'solutions' && (
            <>
              <PageHeaderBanner
                breadcrumbLabel={t.solutions.breadcrumb}
                eyebrow={t.solutions.eyebrow}
                title={t.solutions.title}
                description={t.solutions.description}
                onNavigateHome={() => navigateToRoute('top')}
                onRequestDemo={() =>
                  handleRequestDemo(
                    t.contact.solutionsSuffix
                      ? `${activeVertical.name} ${t.contact.solutionsSuffix}`
                      : activeVertical.name,
                  )
                }
              />

              <section className="border-b border-slate-200 bg-white py-12 sm:py-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                  <div
                    role="tablist"
                    aria-label={t.solutions.sectorFocus}
                    className="flex flex-wrap gap-2 border-b border-slate-200 pb-4"
                  >
                    {content.verticalSolutions.map((vertical) => {
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

                  <div className="mt-8 grid grid-cols-1 gap-8 sm:mt-10 lg:grid-cols-12 lg:gap-10">
                    <div className="min-w-0 lg:col-span-5">
                      <p className="text-xs font-medium text-slate-500">
                        {t.solutions.sectorFocus}
                      </p>
                      <h2 className="mt-2 font-display text-2xl font-bold text-[#040B29]">
                        {activeVertical.name}
                      </h2>
                      <p className="mt-1 text-sm font-medium text-[#0B34D6]">
                        {activeVertical.tagline}
                      </p>
                      <p className="mt-4 text-sm leading-relaxed text-slate-600">
                        {activeVertical.summary}
                      </p>

                      <div className="mt-8 border-t border-slate-200 pt-6">
                        <h3 className="text-sm font-semibold text-[#040B29]">
                          {t.solutions.challengesHeading}
                        </h3>
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
                          onClick={() =>
                            handleRequestDemo(
                              t.contact.solutionsSuffix
                                ? `${activeVertical.name} ${t.contact.solutionsSuffix}`
                                : activeVertical.name,
                            )
                          }
                          className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-md bg-[#040B29] px-5 py-2.5 text-sm font-medium text-white whitespace-nowrap shrink-0 transition-colors hover:bg-[#0B34D6] sm:w-auto"
                        >
                          <span>
                            {t.solutions.discussPrefix} {activeVertical.name}
                            {t.solutions.discussSuffix ? ` ${t.solutions.discussSuffix}` : ''}
                          </span>
                          <ArrowRight className={`h-4 w-4 ${arrowDirClass}`} />
                        </button>
                      </div>
                    </div>

                    <div className="min-w-0 space-y-4 lg:col-span-7">
                      <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
                        <ResilientImage
                          src={content.sectionImages.solutionsFacility.src}
                          alt={content.sectionImages.solutionsFacility.alt}
                          fallbackTitle={activeVertical.name}
                          className="aspect-[16/10] w-full object-cover object-center sm:aspect-[16/9]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#040B29]/85 via-[#040B29]/20 to-transparent" />
                        <div className="absolute inset-x-0 bottom-0 p-4 text-white sm:p-5">
                          <p className="text-xs font-medium text-[#BDE5F6]">
                            {t.solutions.facilityEyebrow}
                          </p>
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
                              <h3 className="mt-2 font-display text-lg font-semibold text-[#040B29]">
                                {mod.title}
                              </h3>
                              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                                {mod.detail}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Dedicated Persona Sub-Pages Directory */}
                  <div className="mt-14 border-t border-slate-200 pt-10">
                    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                      <div>
                        <p className="text-xs font-medium text-[#0B34D6]">
                          {t.solutions.subpagesEyebrow}
                        </p>
                        <h2 className="mt-1 font-display text-xl font-bold text-[#040B29] sm:text-2xl">
                          {t.solutions.subpagesHeading}
                        </h2>
                      </div>
                      <span className="text-xs text-slate-500">{t.solutions.subpagesCountLabel}</span>
                    </div>

                    <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                      {localizedSubpages.map((sub) => (
                        <a
                          key={sub.id}
                          href={sub.slug}
                          onClick={(e) => {
                            e.preventDefault();
                            navigateToSubpage(sub.slug);
                          }}
                          className="group flex flex-col justify-between rounded-xl border border-slate-200 bg-[#F8FAFC] p-5 transition-colors hover:border-[#0B34D6] hover:bg-white"
                        >
                          <div>
                            <div className="text-xs font-medium text-[#0B34D6]">
                              {sub.personaBadge}
                            </div>
                            <h3 className="mt-1.5 font-display text-base font-bold text-[#040B29] group-hover:text-[#0B34D6]">
                              {sub.shortTitle}
                            </h3>
                            <p className="mt-2 text-xs leading-relaxed text-slate-600">
                              {sub.hubSummary}
                            </p>
                          </div>
                          <div className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-[#040B29] group-hover:text-[#0B34D6]">
                            <span>{t.solutions.openSubpage}</span>
                            <ArrowRight className={`h-3.5 w-3.5 ${arrowDirClass}`} />
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            </>
          )}

          {/* ============================================================== */}
          {/* CASE STUDIES PAGE (/success-stories)                           */}
          {/* ============================================================== */}
          {activeRouteId === 'success-stories' && (
            <>
              <PageHeaderBanner
                breadcrumbLabel={t.caseStudies.breadcrumb}
                eyebrow={t.caseStudies.eyebrow}
                title={t.caseStudies.title}
                description={t.caseStudies.description}
                onNavigateHome={() => navigateToRoute('top')}
                onRequestDemo={() =>
                  handleRequestDemo(`${t.contact.pocPrefix} ${activeStory.sector}`)
                }
                ctaLabel={t.caseStudies.ctaLabel}
              />

              <section className="bg-[#040B29] py-12 text-white sm:py-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                  <div className="grid grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-12">
                    {/* Story Selector List */}
                    <div className="flex min-w-0 flex-col gap-3 lg:col-span-5">
                      {content.successStories.map((story) => {
                        const isCurrent = story.id === activeStory.id;
                        const StoryIcon = STORY_ICONS[story.iconKey];
                        return (
                          <div
                            key={story.id}
                            className={`rounded-xl border p-4 transition-colors duration-150 sm:p-5 ${
                              isCurrent
                                ? 'border-[#BDE5F6]/50 bg-[#08164D]'
                                : 'border-white/10 bg-white/5 hover:border-white/25 hover:bg-white/10'
                            }`}
                          >
                            <button
                              type="button"
                              onClick={() => setSelectedStoryId(story.id)}
                              className="w-full text-start"
                            >
                              <div className="flex items-start gap-3">
                                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-white/15 bg-white/5 text-[#BDE5F6]">
                                  <StoryIcon className="h-4 w-4" />
                                </div>
                                <div className="min-w-0 flex-1">
                                  <div className="flex flex-wrap items-center gap-2 text-xs text-[#BDE5F6]">
                                    <span>{story.sector}</span>
                                    <span aria-hidden="true">·</span>
                                    <span className="text-slate-300">{story.location}</span>
                                  </div>
                                  <div className="mt-1.5 font-display text-base font-semibold text-white">
                                    {story.title}
                                  </div>
                                  <div className="mt-2 font-mono text-[11px] text-[#BDE5F6] tabular-nums">
                                    {story.roiMetric}
                                  </div>
                                </div>
                              </div>
                            </button>

                            <div className="mt-3 flex items-center justify-end border-t border-white/10 pt-2.5">
                              <button
                                type="button"
                                onClick={() =>
                                  handleRequestDemo(`${t.contact.pocPrefix} ${story.sector}`)
                                }
                                className="inline-flex items-center gap-1 text-xs font-medium text-[#BDE5F6] transition-colors hover:text-white hover:underline"
                              >
                                <span>
                                  {t.caseStudies.bookPocPrefix} {story.sector}
                                </span>
                                <ArrowRight className={`h-3 w-3 ${arrowDirClass}`} />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Active Story Breakdown */}
                    <div className="flex min-w-0 flex-col justify-between overflow-hidden rounded-xl border border-white/15 bg-[#08164D] lg:col-span-7">
                      <div className="relative h-48 w-full overflow-hidden border-b border-white/10 sm:h-60">
                        <ResilientImage
                          src={content.sectionImages.storiesCementFleet.src}
                          alt={content.sectionImages.storiesCementFleet.alt}
                          fallbackTitle={activeStory.sector}
                          className="h-full w-full object-cover object-center"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#08164D] via-[#08164D]/35 to-transparent" />
                        <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-center justify-between gap-2 px-5 pb-4 text-xs text-[#BDE5F6] sm:px-9">
                          <div className="flex flex-wrap items-center gap-2">
                            <span>{activeStory.sector}</span>
                            <span aria-hidden="true">·</span>
                            <span>{activeStory.location}</span>
                          </div>
                          <span className="font-mono text-[#BDE5F6] tabular-nums">
                            {activeStory.roiMetric}
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-1 flex-col justify-between p-5 sm:p-9">
                        <div>
                          <h2 className="font-display text-xl font-bold text-white sm:text-2xl">
                            {activeStory.title}
                          </h2>
                          <p className="mt-4 text-sm leading-relaxed text-slate-200">
                            {activeStory.challenge}
                          </p>

                          <div className="mt-7 border-t border-white/10 pt-6">
                            <h3 className="text-xs font-semibold tracking-wide text-[#BDE5F6]">
                              {t.caseStudies.deployedCapabilities}
                            </h3>
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
                          <p className="max-w-lg text-sm font-medium text-white">
                            {activeStory.outcome}
                          </p>
                          <button
                            type="button"
                            onClick={() =>
                              handleRequestDemo(`${t.contact.pocPrefix} ${activeStory.sector}`)
                            }
                            className="inline-flex min-h-[44px] items-center gap-1.5 rounded-md bg-white px-4 py-2 text-xs font-semibold text-[#040B29] whitespace-nowrap shrink-0 transition-colors hover:bg-[#BDE5F6]"
                          >
                            <span>{t.caseStudies.bookSelectedPoc}</span>
                            <ArrowRight className={`h-3.5 w-3.5 ${arrowDirClass}`} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
                <div className="border-b border-slate-200 pb-6">
                  <p className="text-xs font-medium text-[#0B34D6]">{t.caseStudies.clientsEyebrow}</p>
                  <h2 className="mt-1 font-display text-2xl font-bold text-[#040B29]">
                    {t.caseStudies.clientsHeading}
                  </h2>
                </div>
                <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {content.customers.map((customer) => (
                    <div
                      key={`${customer.name}-${customer.sector}`}
                      className="flex min-w-0 flex-col justify-between rounded-xl border border-slate-200 bg-white p-5"
                    >
                      <div className="flex h-16 items-center justify-center py-2">
                        <VendorLogo
                          src={customer.logoSrc}
                          alt={`${customer.name} logo`}
                          name={customer.name}
                          className="max-h-12 w-auto max-w-[148px] object-contain"
                        />
                      </div>
                      <div className="mt-4 border-t border-slate-100 pt-3.5">
                        <h3 className="font-display text-sm font-bold text-[#040B29]">
                          {customer.name}
                        </h3>
                        <p className="mt-1 text-xs text-slate-600">{customer.sector}</p>
                        {customer.note && (
                          <p className="mt-1 text-xs text-slate-400">{customer.note}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </>
          )}

          {/* ============================================================== */}
          {/* CUSTOMERS PAGE (/customers)                                    */}
          {/* ============================================================== */}
          {activeRouteId === 'customers' && (
            <>
              <PageHeaderBanner
                breadcrumbLabel={t.customers.breadcrumb}
                eyebrow={t.customers.eyebrow}
                title={t.customers.title}
                description={t.customers.description}
                onNavigateHome={() => navigateToRoute('top')}
                onRequestDemo={() => handleRequestDemo()}
              />

              <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-5">
                  {content.customers.map((customer) => (
                    <div
                      key={`${customer.name}-${customer.sector}`}
                      className="flex min-w-0 flex-col justify-between rounded-xl border border-slate-200 bg-white p-5"
                    >
                      <div className="flex h-16 items-center justify-center py-2">
                        <VendorLogo
                          src={customer.logoSrc}
                          alt={`${customer.name} logo`}
                          name={customer.name}
                          className="max-h-12 w-auto max-w-[148px] object-contain"
                        />
                      </div>
                      <div className="mt-4 border-t border-slate-100 pt-3.5">
                        <h2 className="font-display text-sm font-bold text-[#040B29]">
                          {customer.name}
                        </h2>
                        <p className="mt-1 text-xs leading-snug text-slate-600">{customer.sector}</p>
                        {customer.note && (
                          <p className="mt-1 text-xs leading-snug text-slate-400">{customer.note}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-10 flex justify-end">
                  <a
                    href="/success-stories"
                    onClick={(e) => {
                      e.preventDefault();
                      navigateToRoute('success-stories');
                    }}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0B34D6] hover:underline"
                  >
                    <span>{t.customers.exploreStoriesLink}</span>
                    <ArrowRight className={`h-4 w-4 ${arrowDirClass}`} />
                  </a>
                </div>
              </section>
            </>
          )}

          {/* ============================================================== */}
          {/* PARTNERS PAGE (/our-partners)                                  */}
          {/* ============================================================== */}
          {activeRouteId === 'partners' && (
            <>
              <PageHeaderBanner
                breadcrumbLabel={t.partners.breadcrumb}
                eyebrow={t.partners.eyebrow}
                title={t.partners.title}
                description={t.partners.description}
                onNavigateHome={() => navigateToRoute('top')}
                onRequestDemo={() => handleRequestDemo()}
              />

              <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {content.partners.map((partner) => (
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
                        <h2 className="mt-1 font-display text-lg font-bold text-[#040B29]">
                          {partner.name}
                        </h2>
                        <p className="mt-2 text-sm leading-relaxed text-slate-600">
                          {partner.summary}
                        </p>
                      </div>

                      <div className="mt-5 border-t border-slate-100 pt-4">
                        <a
                          href={`/gsd-services-ecosystem#ecosystem-${partner.ecosystemServiceId}`}
                          onClick={(e) => {
                            e.preventDefault();
                            navigateToRoute('ecosystem', `ecosystem-${partner.ecosystemServiceId}`);
                          }}
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0B34D6] transition-colors hover:text-[#040B29] hover:underline"
                        >
                          <span>{partner.ecosystemCta}</span>
                          <ArrowRight className={`h-3.5 w-3.5 ${arrowDirClass}`} />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </>
          )}

          {/* ============================================================== */}
          {/* CONTACT PAGE (/contact-us)                                     */}
          {/* ============================================================== */}
          {activeRouteId === 'contact' && (
            <>
              <PageHeaderBanner
                breadcrumbLabel={t.contact.breadcrumb}
                eyebrow={t.contact.eyebrow}
                title={t.contact.title}
                description={t.contact.description}
                onNavigateHome={() => navigateToRoute('top')}
              />

              <section id="contact" className="bg-white py-14 sm:py-20">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                  <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
                    <div className="min-w-0 lg:col-span-5">
                      <div className="mb-6 overflow-hidden rounded-xl border border-slate-200 bg-[#071A66]">
                        <ResilientImage
                          src="/assets/aistudio/logo-GSD_a8de37a5.jpg"
                          alt={t.logoAlt}
                          fallbackTitle={content.companyInfo.legalName}
                          className="block h-auto w-full object-contain"
                        />
                      </div>
                      <h2 className="font-display text-2xl font-bold tracking-tight text-[#040B29]">
                        {t.contact.directHeading}
                      </h2>
                      <p className="mt-3 text-sm leading-relaxed text-slate-600">
                        {t.contact.directBody}
                      </p>

                      <dl className="mt-8 space-y-5 border-t border-slate-200 pt-8 text-sm">
                        <div className="flex items-start gap-3">
                          <Building2 className="mt-0.5 h-4 w-4 shrink-0 text-[#0B34D6]" />
                          <div className="min-w-0">
                            <dt className="font-semibold text-[#040B29]">
                              {content.companyInfo.legalName}
                            </dt>
                            <dd className="mt-0.5 break-words text-slate-600">
                              {content.companyInfo.address}
                            </dd>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <Mail className="mt-0.5 h-4 w-4 shrink-0 text-[#0B34D6]" />
                          <div className="min-w-0">
                            <dt className="font-semibold text-[#040B29]">
                              {t.contact.emailLabel}
                            </dt>
                            <dd className="mt-0.5 font-mono text-slate-700">
                              <a
                                dir="ltr"
                                href={`mailto:${content.companyInfo.email}`}
                                className="break-all hover:text-[#0B34D6] hover:underline"
                              >
                                {content.companyInfo.email}
                              </a>
                            </dd>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <Phone className="mt-0.5 h-4 w-4 shrink-0 text-[#0B34D6]" />
                          <div className="min-w-0">
                            <dt className="font-semibold text-[#040B29]">
                              {t.contact.phoneLabel}
                            </dt>
                            <dd className="mt-1 flex flex-col gap-1 font-mono text-slate-700">
                              {content.companyInfo.phones.map((phone) => (
                                <a
                                  key={phone}
                                  dir="ltr"
                                  href={`tel:${phone}`}
                                  className={`hover:text-[#0B34D6] hover:underline ${
                                    isRtl ? 'text-right' : 'text-left'
                                  }`}
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
                            <dt className="font-semibold text-[#040B29]">
                              {t.contact.hoursLabel}
                            </dt>
                            <dd className="mt-0.5 text-slate-600">{content.companyInfo.hours}</dd>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#0B34D6]" />
                          <div className="min-w-0">
                            <dt className="font-semibold text-[#040B29]">
                              {t.contact.websiteLabel}
                            </dt>
                            <dd dir="ltr" className={`mt-0.5 font-mono text-slate-600 ${isRtl ? 'text-right' : 'text-left'}`}>
                              {content.companyInfo.domain}
                            </dd>
                          </div>
                        </div>
                      </dl>
                    </div>

                    <div
                      id="demo-form"
                      className="rounded-xl border border-slate-200 bg-[#F8FAFC] p-6 sm:p-8 lg:col-span-7"
                    >
                      {submittedRecord ? (
                        <div className="flex h-full flex-col justify-between py-2">
                          <div>
                            <div
                              className={`inline-flex h-10 w-10 items-center justify-center rounded-md text-white ${
                                deliveryStatus === 'fallback' ? 'bg-amber-600' : 'bg-[#0B34D6]'
                              }`}
                            >
                              {deliveryStatus === 'fallback' ? (
                                <AlertCircle className="h-5 w-5" />
                              ) : (
                                <Check className="h-5 w-5" />
                              )}
                            </div>

                            <h2 className="mt-5 font-display text-2xl font-bold text-[#040B29]">
                              {deliveryStatus === 'fallback'
                                ? t.contact.confirm.fallbackTitle
                                : `${t.contact.confirm.sentTitlePrefix} ${content.companyInfo.email}`}
                            </h2>

                            {deliveryStatus === 'fallback' ? (
                              <p className="mt-2 text-sm leading-relaxed text-slate-700">
                                {t.contact.confirm.fallbackDescPart1}{' '}
                                <span className="font-semibold text-[#040B29]">
                                  {submittedRecord.name}
                                </span>
                                {t.contact.confirm.fallbackDescPart2}{' '}
                                <span dir="ltr" className="font-mono font-semibold text-[#0B34D6]">
                                  {content.companyInfo.email}
                                </span>{' '}
                                {t.contact.confirm.fallbackDescPart3}
                              </p>
                            ) : (
                              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                                {t.contact.confirm.sentDescPart1}{' '}
                                <span className="font-semibold text-[#040B29]">
                                  {submittedRecord.name}
                                </span>
                                {t.contact.confirm.sentDescPart2}{' '}
                                <span className="font-semibold text-[#040B29]">
                                  {submittedRecord.solution}
                                </span>{' '}
                                {t.contact.confirm.sentDescPart3}{' '}
                                <span dir="ltr" className="font-mono font-semibold text-[#0B34D6]">
                                  {content.companyInfo.email}
                                </span>
                                {t.contact.confirm.sentDescPart4}{' '}
                                <span dir="ltr" className="font-mono text-slate-800">
                                  {submittedRecord.email}
                                </span>
                                .
                              </p>
                            )}

                            <dl className="mt-6 grid grid-cols-1 gap-3 rounded-lg border border-slate-200 bg-white p-4 text-xs sm:grid-cols-2">
                              <div>
                                <dt className="font-medium text-slate-500">
                                  {t.contact.nameLabel.replace(' *', '')}
                                </dt>
                                <dd className="mt-0.5 font-semibold text-[#040B29]">
                                  {submittedRecord.name}
                                </dd>
                              </div>
                              <div>
                                <dt className="font-medium text-slate-500">
                                  {t.contact.companyLabel}
                                </dt>
                                <dd className="mt-0.5 font-semibold text-[#040B29]">
                                  {submittedRecord.company || t.contact.confirm.notSpecified}
                                </dd>
                              </div>
                              <div>
                                <dt className="font-medium text-slate-500">
                                  {t.contact.emailFieldLabel.replace(' *', '')}
                                </dt>
                                <dd
                                  dir="ltr"
                                  className={`mt-0.5 font-mono text-[#040B29] ${
                                    isRtl ? 'text-right' : 'text-left'
                                  }`}
                                >
                                  {submittedRecord.email}
                                </dd>
                              </div>
                              <div>
                                <dt className="font-medium text-slate-500">
                                  {t.contact.phoneFieldLabel}
                                </dt>
                                <dd
                                  dir="ltr"
                                  className={`mt-0.5 font-mono text-[#040B29] ${
                                    isRtl ? 'text-right' : 'text-left'
                                  }`}
                                >
                                  {submittedRecord.phone || t.contact.confirm.notSpecified}
                                </dd>
                              </div>
                              <div className="sm:col-span-2">
                                <dt className="font-medium text-slate-500">
                                  {t.contact.solutionLabel}
                                </dt>
                                <dd className="mt-0.5 font-semibold text-[#040B29]">
                                  {submittedRecord.solution}
                                </dd>
                              </div>
                              {submittedRecord.notes && (
                                <div className="sm:col-span-2">
                                  <dt className="font-medium text-slate-500">
                                    {t.contact.notesLabel}
                                  </dt>
                                  <dd className="mt-0.5 whitespace-pre-wrap text-slate-700">
                                    {submittedRecord.notes}
                                  </dd>
                                </div>
                              )}
                            </dl>
                          </div>

                          <div className="mt-8 flex flex-wrap items-center gap-3">
                            <a
                              href={buildSalesMailtoUrl(
                                submittedRecord,
                                lang,
                                content.companyInfo.email,
                                submittedRecord.sourceUrl,
                              )}
                              className={`inline-flex min-h-[44px] items-center justify-center gap-2 rounded-md px-5 py-2.5 text-sm font-semibold whitespace-nowrap shrink-0 transition-colors ${
                                deliveryStatus === 'fallback'
                                  ? 'bg-[#0B34D6] text-white hover:bg-[#06249E]'
                                  : 'border border-slate-300 bg-white text-[#040B29] hover:border-[#0B34D6] hover:text-[#0B34D6]'
                              }`}
                            >
                              <Mail className="h-4 w-4" />
                              <span>
                                {deliveryStatus === 'fallback'
                                  ? `${t.contact.confirm.sendNowPrefix} ${content.companyInfo.email}`
                                  : t.contact.confirm.openCopyInApp}
                              </span>
                            </a>

                            <button
                              type="button"
                              onClick={() => {
                                if (deliveryStatus === 'fallback') {
                                  setForm({
                                    name: submittedRecord.name,
                                    company: submittedRecord.company,
                                    email: submittedRecord.email,
                                    phone: submittedRecord.phone,
                                    solution: submittedRecord.solution,
                                    notes: submittedRecord.notes,
                                  });
                                }
                                setSubmittedRecord(null);
                                setDeliveryStatus(null);
                              }}
                              className="min-h-[44px] rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-[#040B29] whitespace-nowrap shrink-0 hover:border-[#0B34D6] hover:text-[#0B34D6]"
                            >
                              {deliveryStatus === 'fallback'
                                ? t.contact.confirm.editDetails
                                : t.contact.confirm.sendAnother}
                            </button>
                          </div>
                        </div>
                      ) : (
                        <form onSubmit={handleFormSubmit} noValidate className="space-y-5">
                          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-4">
                            <div>
                              <h2 className="font-display text-lg font-semibold text-[#040B29]">
                                {t.contact.formTitle}
                              </h2>
                              <p className="mt-0.5 text-xs text-slate-600">
                                {t.contact.dispatchedTo}{' '}
                                <a
                                  dir="ltr"
                                  href={buildSalesMailtoUrl(form, lang, content.companyInfo.email)}
                                  className="font-mono font-medium text-[#0B34D6] hover:underline"
                                >
                                  {content.companyInfo.email}
                                </a>
                              </p>
                            </div>
                            <Layers className="h-4 w-4 shrink-0 text-slate-400" />
                          </div>

                          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                            <div>
                              <label
                                htmlFor="demo-name"
                                className="block text-xs font-medium text-slate-700"
                              >
                                {t.contact.nameLabel}
                              </label>
                              <input
                                ref={nameInputRef}
                                id="demo-name"
                                name="name"
                                type="text"
                                value={form.name}
                                onChange={(e) =>
                                  setForm((prev) => ({...prev, name: e.target.value}))
                                }
                                placeholder={t.contact.namePlaceholder}
                                className="mt-1.5 w-full rounded-md border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-[#0B132B] placeholder:text-slate-400 focus:border-[#0B34D6] focus:outline-none"
                              />
                              {formErrors.name && (
                                <p className="mt-1 text-xs font-medium text-red-700">
                                  {formErrors.name}
                                </p>
                              )}
                            </div>

                            <div>
                              <label
                                htmlFor="demo-company"
                                className="block text-xs font-medium text-slate-700"
                              >
                                {t.contact.companyLabel}
                              </label>
                              <input
                                id="demo-company"
                                name="company"
                                type="text"
                                value={form.company}
                                onChange={(e) =>
                                  setForm((prev) => ({...prev, company: e.target.value}))
                                }
                                placeholder={t.contact.companyPlaceholder}
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
                                {t.contact.emailFieldLabel}
                              </label>
                              <input
                                id="demo-email"
                                name="email"
                                type="email"
                                dir="ltr"
                                value={form.email}
                                onChange={(e) =>
                                  setForm((prev) => ({...prev, email: e.target.value}))
                                }
                                placeholder={t.contact.emailPlaceholder}
                                className={`mt-1.5 w-full rounded-md border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-[#0B132B] placeholder:text-slate-400 focus:border-[#0B34D6] focus:outline-none ${
                                  isRtl ? 'text-right' : 'text-left'
                                }`}
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
                                {t.contact.phoneFieldLabel}
                              </label>
                              <input
                                id="demo-phone"
                                name="phone"
                                type="tel"
                                dir="ltr"
                                value={form.phone}
                                onChange={(e) =>
                                  setForm((prev) => ({...prev, phone: e.target.value}))
                                }
                                placeholder={t.contact.phonePlaceholder}
                                className={`mt-1.5 w-full rounded-md border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-[#0B132B] placeholder:text-slate-400 focus:border-[#0B34D6] focus:outline-none ${
                                  isRtl ? 'text-right' : 'text-left'
                                }`}
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
                              {t.contact.solutionLabel}
                            </label>
                            <select
                              id="demo-solution"
                              name="solution"
                              value={form.solution}
                              onChange={(e) =>
                                setForm((prev) => ({...prev, solution: e.target.value}))
                              }
                              className="mt-1.5 min-h-[44px] w-full rounded-md border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-[#0B132B] focus:border-[#0B34D6] focus:outline-none"
                            >
                              {!activeKnownOptions.has(form.solution) && (
                                <option value={form.solution}>{form.solution}</option>
                              )}
                              <option value={t.contact.generalOption}>{t.contact.generalOption}</option>
                              {content.ecosystemServices.map((service) => {
                                const optionValue = `${service.name} — ${service.category}`;
                                return (
                                  <option key={service.id} value={optionValue}>
                                    {optionValue}
                                  </option>
                                );
                              })}
                              {content.verticalSolutions.map((vertical) => {
                                const optionValue = t.contact.solutionsSuffix
                                  ? `${vertical.name} ${t.contact.solutionsSuffix}`
                                  : vertical.name;
                                return (
                                  <option key={vertical.id} value={optionValue}>
                                    {optionValue}
                                  </option>
                                );
                              })}
                              {content.successStories.map((story) => {
                                const optionValue = `${t.contact.pocPrefix} ${story.sector}`;
                                return (
                                  <option key={story.id} value={optionValue}>
                                    {optionValue}
                                  </option>
                                );
                              })}
                            </select>
                          </div>

                          <div>
                            <label
                              htmlFor="demo-notes"
                              className="block text-xs font-medium text-slate-700"
                            >
                              {t.contact.notesLabel}
                            </label>
                            <textarea
                              id="demo-notes"
                              name="notes"
                              rows={3}
                              value={form.notes}
                              onChange={(e) =>
                                setForm((prev) => ({...prev, notes: e.target.value}))
                              }
                              placeholder={t.contact.notesPlaceholder}
                              className="mt-1.5 w-full rounded-md border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-[#0B132B] placeholder:text-slate-400 focus:border-[#0B34D6] focus:outline-none"
                            />
                          </div>

                          <div className="flex flex-col items-stretch justify-between gap-3 pt-2 sm:flex-row sm:items-center">
                            <a
                              href={buildSalesMailtoUrl(form, lang, content.companyInfo.email)}
                              className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-md border border-slate-300 bg-white px-4 py-2.5 text-xs font-semibold text-[#040B29] whitespace-nowrap shrink-0 transition-colors hover:border-[#0B34D6] hover:text-[#0B34D6]"
                            >
                              <Mail className="h-3.5 w-3.5" />
                              <span>{t.contact.sendViaApp}</span>
                            </a>
                            <button
                              type="submit"
                              disabled={isSubmitting}
                              className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-md bg-[#0B34D6] px-6 py-2.5 text-sm font-semibold text-white whitespace-nowrap shrink-0 transition-colors duration-150 hover:bg-[#06249E] disabled:cursor-not-allowed disabled:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0B34D6]"
                            >
                              {isSubmitting ? (
                                <>
                                  <Loader2 className="h-4 w-4 animate-spin" />
                                  <span>
                                    {t.contact.sendingPrefix} {content.companyInfo.email}...
                                  </span>
                                </>
                              ) : (
                                <>
                                  <Send className="h-4 w-4" />
                                  <span>
                                    {t.contact.sendRequestPrefix} {content.companyInfo.email}
                                  </span>
                                </>
                              )}
                            </button>
                          </div>
                        </form>
                      )}
                    </div>
                  </div>
                </div>
              </section>
            </>
          )}
        </main>

        {/* Quiet Enterprise Footer */}
        <footer className="bg-[#040B29] text-slate-300">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-14 lg:px-8">
            <div className="grid grid-cols-1 gap-10 border-b border-white/10 pb-10 md:grid-cols-12">
              <div className="md:col-span-4">
                <div className="font-display text-lg font-bold text-white">
                  {content.companyInfo.legalName}
                </div>
                <p className="mt-2 max-w-sm text-sm leading-relaxed text-slate-400">
                  {t.footer.description}
                </p>
              </div>

              <div className="md:col-span-2">
                <div className="text-xs font-semibold text-white">{t.footer.pagesHeading}</div>
                <ul className="mt-3 space-y-2 text-sm">
                  {[
                    {label: t.nav.home, id: 'top' as SectionId, slug: '/'},
                    {label: t.nav.about, id: 'about' as SectionId, slug: '/about'},
                    {
                      label: t.nav.ecosystem,
                      id: 'ecosystem' as SectionId,
                      slug: '/gsd-services-ecosystem',
                    },
                    {label: t.nav.solutions, id: 'solutions' as SectionId, slug: '/our-solutions'},
                    {
                      label: t.nav.caseStudies,
                      id: 'success-stories' as SectionId,
                      slug: '/success-stories',
                    },
                    {label: t.nav.partners, id: 'partners' as SectionId, slug: '/our-partners'},
                    {label: t.nav.contact, id: 'contact' as SectionId, slug: '/contact-us'},
                  ].map((link) => (
                    <li key={link.id}>
                      <a
                        href={link.slug}
                        onClick={(e) => {
                          e.preventDefault();
                          navigateToRoute(link.id);
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
                <div className="text-xs font-semibold text-white">
                  {t.footer.solutionPagesHeading}
                </div>
                <ul className="mt-3 space-y-2 text-sm">
                  {localizedSubpages.map((sub) => (
                    <li key={sub.id}>
                      <a
                        href={sub.slug}
                        onClick={(e) => {
                          e.preventDefault();
                          navigateToSubpage(sub.slug);
                        }}
                        className="inline-block py-0.5 text-slate-400 transition-colors hover:text-white"
                      >
                        {sub.shortTitle}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="md:col-span-3">
                <div className="text-xs font-semibold text-white">
                  {t.footer.cairoOfficeHeading}
                </div>
                <p className="mt-3 text-sm leading-relaxed text-slate-400">
                  {content.companyInfo.address}
                </p>
                <div className="mt-3 flex flex-col gap-1.5 font-mono text-xs text-[#BDE5F6]">
                  <a
                    dir="ltr"
                    href={`mailto:${content.companyInfo.email}`}
                    className={`hover:underline ${isRtl ? 'text-right' : 'text-left'}`}
                  >
                    {content.companyInfo.email}
                  </a>
                  {content.companyInfo.phones.map((phone) => (
                    <a
                      key={phone}
                      dir="ltr"
                      href={`tel:${phone}`}
                      className={`hover:underline ${isRtl ? 'text-right' : 'text-left'}`}
                    >
                      {phone}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-col items-start justify-between gap-4 text-xs text-slate-400 sm:flex-row sm:items-center">
              <p>{t.footer.copyright}</p>
              <div className="flex flex-wrap items-center gap-4 font-mono text-slate-400">
                <button
                  type="button"
                  onClick={toggleLang}
                  className="inline-flex items-center gap-1.5 font-sans text-xs font-medium text-[#BDE5F6] transition-colors hover:text-white hover:underline"
                >
                  <Globe className="h-3.5 w-3.5" />
                  <span>{t.nav.switchToLabel}</span>
                </button>
                <span aria-hidden="true">·</span>
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
