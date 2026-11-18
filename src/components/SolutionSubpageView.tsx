import React from 'react';
import {ArrowLeft, ArrowRight, Check, ShieldCheck} from 'lucide-react';
import type {SolutionSubpageData} from '../data/solutionSubpages';
import {getSolutionSubpages} from '../data/solutionSubpagesAr';
import {CarrotVisionDashboardPreview} from './CarrotVisionDashboardPreview';
import {useLanguage} from '../i18n/LanguageContext';
import {UI_STRINGS} from '../i18n/uiStrings';

interface SolutionSubpageViewProps {
  data: SolutionSubpageData;
  onNavigateHub: (targetSection?: 'top' | 'ecosystem' | 'solutions' | 'contact') => void;
  onNavigateSubpage: (slug: string) => void;
  onRequestDemo: (preselectedSolution: string) => void;
}

export function SolutionSubpageView({
  data,
  onNavigateHub,
  onNavigateSubpage,
  onRequestDemo,
}: SolutionSubpageViewProps) {
  const {lang, isRtl} = useLanguage();
  const t = UI_STRINGS[lang];
  const siblingPages = getSolutionSubpages(lang).filter((item) => item.id !== data.id);

  return (
    <div className="bg-[#F8FAFC]">
      {/* Dedicated Sub-Page Hero: Single Clean H1 per Page */}
      <section className="relative overflow-hidden bg-[#040B29] text-white">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <img
            src={data.heroImage.src}
            alt=""
            className="h-full w-full object-cover object-center opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#0B34D6]/85 via-[#071A66]/88 to-[#040B29]/95" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          {/* Semantic Breadcrumb Navigation */}
          <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-2 text-xs text-slate-300"
          >
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                onNavigateHub('top');
              }}
              className="transition-colors hover:text-white hover:underline"
            >
              {t.common.homeBreadcrumb}
            </a>
            <span aria-hidden="true" className="text-white/40">
              /
            </span>
            <a
              href="/our-solutions"
              onClick={(e) => {
                e.preventDefault();
                onNavigateHub('solutions');
              }}
              className="transition-colors hover:text-white hover:underline"
            >
              {t.solutions.breadcrumb}
            </a>
            <span aria-hidden="true" className="text-white/40">
              /
            </span>
            <span className="font-medium text-[#BDE5F6]">{data.shortTitle}</span>
          </nav>

          <div className="mt-6 grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
            <div className="min-w-0 lg:col-span-7">
              <p className="text-xs font-medium text-[#BDE5F6]">
                {data.eyebrow} · {t.solutions.builtForPrefix} {data.personaBadge}
              </p>
              <h1 className="mt-3 font-display text-[clamp(2rem,3.8vw,3.35rem)] font-bold leading-[1.12] tracking-tight text-white [text-wrap:balance]">
                {data.h1}
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-200 sm:text-lg">
                {data.lead}
              </p>

              <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-5">
                <button
                  type="button"
                  onClick={() => onRequestDemo(data.demoPreselect)}
                  className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-md bg-white px-6 py-3 text-sm font-semibold text-[#040B29] whitespace-nowrap shrink-0 transition-colors hover:bg-[#BDE5F6]"
                >
                  <span>{t.solutions.bookWalkthrough}</span>
                  <ArrowRight className={`h-4 w-4 ${isRtl ? 'rotate-180' : ''}`} />
                </button>
                <a
                  href="/our-solutions"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigateHub('solutions');
                  }}
                  className="inline-flex min-h-[44px] items-center justify-center gap-1.5 text-sm font-medium text-[#BDE5F6] whitespace-nowrap shrink-0 transition-colors hover:text-white hover:underline sm:justify-start"
                >
                  <ArrowLeft className={`h-4 w-4 ${isRtl ? 'rotate-180' : ''}`} />
                  <span>{t.solutions.allHubBack}</span>
                </a>
              </div>
            </div>

            <div className="min-w-0 lg:col-span-5">
              <div className="overflow-hidden rounded-xl border border-white/15 bg-[#08164D]">
                <img
                  src={data.heroImage.src}
                  alt={data.heroImage.alt}
                  className="aspect-[16/10] w-full object-cover object-center"
                />
                <div className="divide-y divide-white/10 border-t border-white/10 px-5 py-3">
                  {data.platforms.map((platform) => (
                    <div
                      key={platform.name}
                      className="flex items-center justify-between gap-4 py-2.5 text-xs"
                    >
                      <div className="min-w-0">
                        <div className="font-display font-semibold text-white">
                          {platform.name}
                        </div>
                        <div className="text-slate-300">{platform.role}</div>
                      </div>
                      {platform.logoSrc && (
                        <img
                          src={platform.logoSrc}
                          alt={`${platform.name} logo`}
                          className="h-6 w-auto max-w-[96px] shrink-0 rounded bg-white/95 px-2 py-0.5 object-contain"
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 4-Column KPI Strip */}
          <div className="mt-12 grid grid-cols-1 gap-6 border-t border-white/15 pt-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {data.kpis.map((kpi) => (
              <div key={kpi.label} className="min-w-0">
                <div
                  dir="ltr"
                  className={`font-mono text-2xl font-semibold tracking-tight text-white tabular-nums sm:text-3xl ${
                    isRtl ? 'text-right' : 'text-left'
                  }`}
                >
                  {kpi.value}
                </div>
                <div className="mt-1 text-sm font-medium text-[#BDE5F6]">{kpi.label}</div>
                <div className="mt-0.5 text-xs text-slate-300">{kpi.context}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Buyer Persona Challenges & AI Resolution */}
      <section className="border-b border-slate-200 bg-white py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl border-b border-slate-200 pb-6">
            <p className="text-xs font-medium text-[#0B34D6]">
              {t.solutions.challengesEyebrowPrefix} {data.personaBadge}
            </p>
            <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-[#040B29] sm:text-3xl [text-wrap:balance]">
              {data.painPointsHeading}
            </h2>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">
            {data.personaPainPoints.map((item) => (
              <div
                key={item.index}
                className="flex min-w-0 flex-col justify-between rounded-xl border border-slate-200 bg-[#F8FAFC] p-6"
              >
                <div>
                  <div className="font-mono text-xs font-semibold text-[#0B34D6]">
                    {item.index} · {t.solutions.challengePrefix}
                  </div>
                  <h3 className="mt-2 font-display text-lg font-bold text-[#040B29]">
                    {item.challenge}
                  </h3>
                  <div className="mt-4 flex items-start gap-2.5 border-t border-slate-200 pt-4 text-sm leading-relaxed text-slate-700">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#0B34D6]" />
                    <span>{item.resolution}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Capabilities & Optional Carrot Vision Live Dashboard Preview */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-xs font-medium text-[#0B34D6]">{t.solutions.modulesEyebrow}</p>
          <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-[#040B29] sm:text-3xl [text-wrap:balance]">
            {data.capabilitiesHeading}
          </h2>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          {data.capabilities.map((cap) => (
            <div
              key={cap.title}
              className="rounded-xl border border-slate-200 bg-white p-6 sm:p-7"
            >
              <div className="text-xs font-medium text-[#0B34D6]">{cap.category}</div>
              <h3 className="mt-1.5 font-display text-lg font-bold text-[#040B29]">{cap.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{cap.detail}</p>
            </div>
          ))}
        </div>

        {data.includeCarrotDashboard && (
          <div className="mt-10 rounded-xl border border-slate-200 bg-white p-6 sm:p-8">
            <CarrotVisionDashboardPreview standalone />
          </div>
        )}

        {/* Verified Enterprise Deployments */}
        <div className="mt-12 rounded-xl border border-slate-200 bg-white p-6 sm:p-8">
          <div className="flex flex-col justify-between gap-4 border-b border-slate-200 pb-5 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-medium text-[#0B34D6]">{t.solutions.evidenceEyebrow}</p>
              <h2 className="mt-1 font-display text-xl font-bold text-[#040B29]">
                {t.solutions.evidenceHeading}
              </h2>
            </div>
            <button
              type="button"
              onClick={() => onRequestDemo(data.demoPreselect)}
              className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-md bg-[#0B34D6] px-5 py-2.5 text-xs font-semibold text-white whitespace-nowrap shrink-0 transition-colors hover:bg-[#06249E]"
            >
              <span>{t.solutions.requestCustomArch}</span>
              <ArrowRight className={`h-3.5 w-3.5 ${isRtl ? 'rotate-180' : ''}`} />
            </button>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
            {data.deploymentProof.map((proof) => (
              <div key={proof.client} className="flex items-start gap-3">
                <ShieldCheck className="mt-1 h-5 w-5 shrink-0 text-[#0B34D6]" />
                <div>
                  <div className="text-xs font-medium text-slate-500">{proof.sector}</div>
                  <h3 className="mt-0.5 font-display text-base font-bold text-[#040B29]">
                    {proof.client}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{proof.outcome}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cross-Navigation to Sibling Solution Pages */}
        <div className="mt-12 border-t border-slate-200 pt-10">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs font-medium text-[#0B34D6]">{t.solutions.crossNavEyebrow}</p>
              <h2 className="mt-1 font-display text-xl font-bold text-[#040B29]">
                {t.solutions.crossNavHeading}
              </h2>
            </div>
            <a
              href="/gsd-services-ecosystem"
              onClick={(e) => {
                e.preventDefault();
                onNavigateHub('ecosystem');
              }}
              className="text-xs font-semibold text-[#0B34D6] hover:underline"
            >
              {t.solutions.viewAllEcosystem}
            </a>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-3">
            {siblingPages.map((sub) => (
              <a
                key={sub.id}
                href={sub.slug}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigateSubpage(sub.slug);
                }}
                className="group flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-5 transition-colors hover:border-[#0B34D6]"
              >
                <div>
                  <div className="text-xs font-medium text-[#0B34D6]">{sub.personaBadge}</div>
                  <h3 className="mt-1.5 font-display text-base font-bold text-[#040B29] group-hover:text-[#0B34D6]">
                    {sub.shortTitle}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-600">{sub.hubSummary}</p>
                </div>
                <div className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-[#040B29] group-hover:text-[#0B34D6]">
                  <span>{t.solutions.exploreSolutionPage}</span>
                  <ArrowRight className={`h-3.5 w-3.5 ${isRtl ? 'rotate-180' : ''}`} />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
