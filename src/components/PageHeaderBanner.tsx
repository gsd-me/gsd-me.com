import React from 'react';
import {ArrowRight} from 'lucide-react';

interface PageHeaderBannerProps {
  breadcrumbLabel: string;
  eyebrow: string;
  title: string;
  description: string;
  onNavigateHome: () => void;
  onRequestDemo?: () => void;
  ctaLabel?: string;
}

export function PageHeaderBanner({
  breadcrumbLabel,
  eyebrow,
  title,
  description,
  onNavigateHome,
  onRequestDemo,
  ctaLabel = 'Request a Demo',
}: PageHeaderBannerProps) {
  return (
    <section className="relative overflow-hidden bg-[#040B29] text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-25"
        style={{
          backgroundImage:
            'radial-gradient(circle at 82% 18%, rgba(189, 229, 246, 0.25) 0%, transparent 45%), linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)',
          backgroundSize: '100% 100%, 48px 48px, 48px 48px',
        }}
      />
      <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <nav
          aria-label="Breadcrumb"
          className="flex flex-wrap items-center gap-2 text-xs text-slate-300"
        >
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              onNavigateHome();
            }}
            className="transition-colors hover:text-white hover:underline"
          >
            Home
          </a>
          <span aria-hidden="true" className="text-white/40">
            /
          </span>
          <span className="font-medium text-[#BDE5F6]">{breadcrumbLabel}</span>
        </nav>

        <div className="mt-5 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-3xl">
            <p className="text-xs font-medium text-[#BDE5F6]">{eyebrow}</p>
            <h1 className="mt-2 font-display text-[clamp(1.9rem,3.6vw,3.1rem)] font-bold leading-[1.1] tracking-tight text-white [text-wrap:balance]">
              {title}
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-200 sm:text-base">
              {description}
            </p>
          </div>

          {onRequestDemo && (
            <button
              type="button"
              onClick={onRequestDemo}
              className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-md bg-white px-5 py-2.5 text-sm font-semibold text-[#040B29] whitespace-nowrap shrink-0 transition-colors hover:bg-[#BDE5F6]"
            >
              <span>{ctaLabel}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
