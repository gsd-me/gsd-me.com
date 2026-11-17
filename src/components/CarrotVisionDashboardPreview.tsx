import React, {useState} from 'react';
import {
  AlertTriangle,
  Camera,
  CheckCircle2,
  Flame,
  ShieldCheck,
  UserCheck,
} from 'lucide-react';

type TimeWindow = '24h' | '7d';

const DASHBOARD_DATA: Record<
  TimeWindow,
  {
    windowLabel: string;
    totalViolations: number;
    violationDelta: string;
    camerasOnline: number;
    camerasTotal: number;
    offlineNote: string;
    reviewedCount: number;
    reviewedPct: string;
    pendingCount: number;
    thermalPeak: string;
    thermalNote: string;
    modelBreakdown: {
      name: string;
      count: number;
      pct: number;
      color: string;
      strokeDasharray: string;
      strokeDashoffset: string;
    }[];
    timelinePoints: string;
    timelineArea: string;
    peakLabel: string;
    topZones: {zone: string; cam: string; count: number; pct: number}[];
    events: {
      id: string;
      time: string;
      model: string;
      zone: string;
      match: string;
      status: 'Pending Review' | 'Confirmed' | 'Escalated';
    }[];
  }
> = {
  '24h': {
    windowLabel: '24h Shift Window',
    totalViolations: 119,
    violationDelta: '-18% vs 7d avg',
    camerasOnline: 40,
    camerasTotal: 43,
    offlineNote: '3 offline · CAM-004, CAM-005, YRD-12',
    reviewedCount: 142,
    reviewedPct: '77.2%',
    pendingCount: 42,
    thermalPeak: '153.8°C',
    thermalNote: 'Suez-Th3-Thermal · RDF Storage',
    modelBreakdown: [
      {
        name: 'PPE Compliance',
        count: 45,
        pct: 38,
        color: '#38BDF8',
        strokeDasharray: '86 140',
        strokeDashoffset: '0',
      },
      {
        name: 'Restricted Zones',
        count: 30,
        pct: 25,
        color: '#3B82F6',
        strokeDasharray: '56.5 169.5',
        strokeDashoffset: '-86',
      },
      {
        name: 'Smoke & Fire AI',
        count: 25,
        pct: 21,
        color: '#F59E0B',
        strokeDasharray: '47.5 178.5',
        strokeDashoffset: '-142.5',
      },
      {
        name: 'Crane & Activity',
        count: 19,
        pct: 16,
        color: '#F43F5E',
        strokeDasharray: '36.2 189.8',
        strokeDashoffset: '-190',
      },
    ],
    timelinePoints: '0,64 42,58 84,61 126,38 168,26 210,44 252,31 294,18 336,42 378,52 420,48',
    timelineArea:
      '0,84 0,64 42,58 84,61 126,38 168,26 210,44 252,31 294,18 336,42 378,52 420,48 420,84',
    peakLabel: 'Shift Peak · 14:00–16:00',
    topZones: [
      {zone: 'Packer M-C 4 · Packing Line', cam: 'CAM-001', count: 38, pct: 84},
      {zone: 'Suez RDF Fuel Storage', cam: 'Suez-Th3', count: 29, pct: 64},
      {zone: 'Overhead Crane Bay 2', cam: 'CAM-014', count: 24, pct: 53},
      {zone: 'Boiler Red Zone BR2', cam: 'CAM-021', count: 16, pct: 35},
    ],
    events: [
      {
        id: 'EVT-2025-001',
        time: '14:22:09',
        model: 'Hard Hat Missing',
        zone: 'Packer M-C 4',
        match: 'Face ID 96.4% · Staff #1042',
        status: 'Pending Review',
      },
      {
        id: 'EVT-2025-003',
        time: '14:15:44',
        model: 'Thermal Hotspot 153.8°C',
        zone: 'Suez-Th3-Thermal',
        match: 'Assigned · Shift HSE Officer',
        status: 'Escalated',
      },
      {
        id: 'EVT-2025-004',
        time: '13:48:17',
        model: 'Crane Zone Intrusion',
        zone: 'Crane Bay 2',
        match: 'PLC Interlock Warning Sent',
        status: 'Confirmed',
      },
    ],
  },
  '7d': {
    windowLabel: '7-Day Plant Summary',
    totalViolations: 742,
    violationDelta: '-24% vs prior week',
    camerasOnline: 41,
    camerasTotal: 43,
    offlineNote: '95.3% average stream uptime',
    reviewedCount: 718,
    reviewedPct: '96.8%',
    pendingCount: 24,
    thermalPeak: '153.8°C',
    thermalNote: '2 thermal anomalies contained early',
    modelBreakdown: [
      {
        name: 'PPE Compliance',
        count: 298,
        pct: 40,
        color: '#38BDF8',
        strokeDasharray: '90.5 135.5',
        strokeDashoffset: '0',
      },
      {
        name: 'Restricted Zones',
        count: 192,
        pct: 26,
        color: '#3B82F6',
        strokeDasharray: '58.8 167.2',
        strokeDashoffset: '-90.5',
      },
      {
        name: 'Smoke & Fire AI',
        count: 134,
        pct: 18,
        color: '#F59E0B',
        strokeDasharray: '40.7 185.3',
        strokeDashoffset: '-149.3',
      },
      {
        name: 'Crane & Activity',
        count: 118,
        pct: 16,
        color: '#F43F5E',
        strokeDasharray: '36.2 189.8',
        strokeDashoffset: '-190',
      },
    ],
    timelinePoints: '0,52 42,46 84,39 126,44 168,31 210,24 252,36 294,41 336,29 378,22 420,19',
    timelineArea:
      '0,84 0,52 42,46 84,39 126,44 168,31 210,24 252,36 294,41 336,29 378,22 420,19 420,84',
    peakLabel: 'Weekly Trend · Downward (-24%)',
    topZones: [
      {zone: 'Packer M-C 4 · Packing Line', cam: 'CAM-001', count: 214, pct: 88},
      {zone: 'Loading & Dispatch Dock', cam: 'CAM-008', count: 168, pct: 69},
      {zone: 'Suez RDF Fuel Storage', cam: 'Suez-Th3', count: 121, pct: 50},
      {zone: 'Overhead Crane Bay 2', cam: 'CAM-014', count: 94, pct: 39},
    ],
    events: [
      {
        id: 'EVT-2025-718',
        time: 'Thu 16:04',
        model: 'Forklift Aisle Proximity',
        zone: 'Loading Dock',
        match: 'Face ID 94.8% · Operator #219',
        status: 'Confirmed',
      },
      {
        id: 'EVT-2025-709',
        time: 'Wed 11:30',
        model: 'Smoke Plume Early Alert',
        zone: 'Pump Hall',
        match: 'WhatsApp + Control Room Alert',
        status: 'Escalated',
      },
      {
        id: 'EVT-2025-695',
        time: 'Tue 09:12',
        model: 'Safety Vest Non-Compliance',
        zone: 'Packer M-C 4',
        match: 'CAPA Ticket Logged · Shift A',
        status: 'Confirmed',
      },
    ],
  },
};

export function CarrotVisionDashboardPreview() {
  const [timeWindow, setTimeWindow] = useState<TimeWindow>('24h');
  const [verifiedIds, setVerifiedIds] = useState<Record<string, 'Correct' | 'False'>>({});
  const data = DASHBOARD_DATA[timeWindow];

  return (
    <figure className="mt-8 border-t border-slate-200 pt-8">
      <div className="mb-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-medium text-[#0B34D6]">
            Carrot Vision Control Room · Live Dashboard Preview
          </p>
          <h4 className="mt-1 font-display text-lg font-bold text-[#040B29]">
            HSE Overview, Operational Heat Zones &amp; Event Verification Hub
          </h4>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setTimeWindow('24h')}
            className={`min-h-[36px] rounded-md px-3 py-1.5 text-xs font-medium whitespace-nowrap shrink-0 transition-colors ${
              timeWindow === '24h'
                ? 'bg-[#040B29] text-white'
                : 'border border-slate-200 bg-white text-slate-700 hover:border-slate-300'
            }`}
          >
            24h Shift
          </button>
          <button
            type="button"
            onClick={() => setTimeWindow('7d')}
            className={`min-h-[36px] rounded-md px-3 py-1.5 text-xs font-medium whitespace-nowrap shrink-0 transition-colors ${
              timeWindow === '7d'
                ? 'bg-[#040B29] text-white'
                : 'border border-slate-200 bg-white text-slate-700 hover:border-slate-300'
            }`}
          >
            7-Day Summary
          </button>
        </div>
      </div>

      {/* Dark Control Room UI Mockup Frame */}
      <div className="overflow-hidden rounded-xl border border-[#1E2E68] bg-[#040B29] text-white shadow-sm">
        {/* Top Console Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 bg-[#071342] px-4 py-3 sm:px-6">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <ShieldCheck className="h-4 w-4 shrink-0 text-[#BDE5F6]" />
            <span className="font-display font-semibold text-white">
              Carrot Vision HSE Console
            </span>
            <span aria-hidden="true" className="text-white/30">
              ·
            </span>
            <span className="text-slate-300">On-Premise Edge Node</span>
            <span aria-hidden="true" className="hidden text-white/30 sm:inline">
              ·
            </span>
            <span className="hidden font-mono text-[#BDE5F6] sm:inline">{data.windowLabel}</span>
          </div>

          <div className="flex items-center gap-4 font-mono text-xs text-slate-300 tabular-nums">
            <span>{data.camerasOnline}/{data.camerasTotal} Feeds Online</span>
            <span aria-hidden="true" className="text-white/30">
              ·
            </span>
            <span className="text-[#BDE5F6]">Local Storage Encrypted</span>
          </div>
        </div>

        {/* 4-Metric KPI Strip */}
        <div className="grid grid-cols-1 divide-y divide-white/10 border-b border-white/10 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
          <div className="p-4 sm:p-5">
            <div className="flex items-center justify-between text-xs text-slate-300">
              <span>Violations Logged</span>
              <AlertTriangle className="h-3.5 w-3.5 text-amber-400" />
            </div>
            <div className="mt-2 font-mono text-2xl font-bold text-white tabular-nums">
              {data.totalViolations}
            </div>
            <div className="mt-1 font-mono text-xs text-[#BDE5F6]">{data.violationDelta}</div>
          </div>

          <div className="p-4 sm:p-5">
            <div className="flex items-center justify-between text-xs text-slate-300">
              <span>Camera Health</span>
              <Camera className="h-3.5 w-3.5 text-[#BDE5F6]" />
            </div>
            <div className="mt-2 font-mono text-2xl font-bold text-white tabular-nums">
              {data.camerasOnline} / {data.camerasTotal}
            </div>
            <div className="mt-1 font-mono text-xs text-slate-300">{data.offlineNote}</div>
          </div>

          <div className="p-4 sm:p-5">
            <div className="flex items-center justify-between text-xs text-slate-300">
              <span>Event Validation</span>
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
            </div>
            <div className="mt-2 flex items-baseline gap-2 font-mono tabular-nums">
              <span className="text-2xl font-bold text-white">{data.reviewedCount}</span>
              <span className="text-xs text-emerald-300">{data.reviewedPct} reviewed</span>
            </div>
            <div className="mt-1 font-mono text-xs text-slate-300">
              {data.pendingCount} pending officer sign-off
            </div>
          </div>

          <div className="p-4 sm:p-5">
            <div className="flex items-center justify-between text-xs text-slate-300">
              <span>Thermal RDF Peak</span>
              <Flame className="h-3.5 w-3.5 text-rose-400" />
            </div>
            <div className="mt-2 font-mono text-2xl font-bold text-rose-300 tabular-nums">
              {data.thermalPeak}
            </div>
            <div className="mt-1 font-mono text-xs text-slate-300">{data.thermalNote}</div>
          </div>
        </div>

        {/* Analytics & Events Body */}
        <div className="grid grid-cols-1 gap-6 p-4 sm:p-6 lg:grid-cols-12">
          {/* Left: Donut Chart - Violations by AI Model */}
          <div className="rounded-lg border border-white/10 bg-[#08164D]/80 p-4 lg:col-span-4">
            <div className="flex items-center justify-between">
              <h5 className="font-display text-sm font-semibold text-white">
                Violations by AI Model
              </h5>
              <span className="font-mono text-xs text-slate-300 tabular-nums">
                n = {data.totalViolations}
              </span>
            </div>

            <div className="mt-4 flex flex-col items-center gap-4 sm:flex-row lg:flex-col xl:flex-row">
              <div className="relative h-28 w-28 shrink-0">
                <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90" aria-hidden="true">
                  <circle
                    cx="50"
                    cy="50"
                    r="36"
                    fill="transparent"
                    stroke="rgba(255,255,255,0.08)"
                    strokeWidth="12"
                  />
                  {data.modelBreakdown.map((seg) => (
                    <circle
                      key={seg.name}
                      cx="50"
                      cy="50"
                      r="36"
                      fill="transparent"
                      stroke={seg.color}
                      strokeWidth="12"
                      strokeDasharray={seg.strokeDasharray}
                      strokeDashoffset={seg.strokeDashoffset}
                    />
                  ))}
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="font-mono text-lg font-bold text-white tabular-nums">
                    {data.totalViolations}
                  </span>
                  <span className="text-[10px] text-slate-300">Alerts</span>
                </div>
              </div>

              <ul className="w-full space-y-2.5 text-xs">
                {data.modelBreakdown.map((item) => (
                  <li key={item.name} className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <span
                        className="h-2.5 w-2.5 shrink-0 rounded-sm"
                        style={{backgroundColor: item.color}}
                      />
                      <span className="truncate text-slate-200">{item.name}</span>
                    </div>
                    <span className="font-mono text-slate-200 tabular-nums shrink-0">
                      {item.count} ({item.pct}%)
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Center: 24h Alert Timeline & Top Zones */}
          <div className="flex flex-col justify-between rounded-lg border border-white/10 bg-[#08164D]/80 p-4 lg:col-span-4">
            <div>
              <div className="flex items-center justify-between gap-2">
                <h5 className="font-display text-sm font-semibold text-white">
                  Alert Timeline &amp; Hot Zones
                </h5>
                <span className="font-mono text-[11px] text-[#BDE5F6]">{data.peakLabel}</span>
              </div>

              <div className="mt-3 rounded-md border border-white/10 bg-[#040B29]/70 p-2.5">
                <svg
                  viewBox="0 0 420 88"
                  className="h-20 w-full overflow-visible"
                  role="img"
                  aria-label="Carrot Vision alert timeline trend"
                >
                  <defs>
                    <linearGradient id="carrotTimelineGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.35" />
                      <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>
                  <line x1="0" y1="22" x2="420" y2="22" stroke="rgba(255,255,255,0.07)" />
                  <line x1="0" y1="52" x2="420" y2="52" stroke="rgba(255,255,255,0.07)" />
                  <polygon points={data.timelineArea} fill="url(#carrotTimelineGrad)" />
                  <polyline
                    fill="none"
                    stroke="#38BDF8"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    points={data.timelinePoints}
                  />
                </svg>
                <div className="mt-1 flex justify-between font-mono text-[10px] text-slate-400 tabular-nums">
                  <span>00:00</span>
                  <span>06:00</span>
                  <span>12:00</span>
                  <span>18:00</span>
                  <span>23:00</span>
                </div>
              </div>
            </div>

            <div className="mt-4 space-y-2.5">
              {data.topZones.map((row) => (
                <div key={row.zone}>
                  <div className="flex items-center justify-between text-xs">
                    <span className="truncate text-slate-200">{row.zone}</span>
                    <span className="font-mono text-[#BDE5F6] tabular-nums shrink-0">
                      {row.cam} · {row.count}
                    </span>
                  </div>
                  <div className="mt-1 h-1.5 w-full overflow-hidden rounded-sm bg-white/10">
                    <div
                      className="h-full bg-[#38BDF8]"
                      style={{width: `${row.pct}%`}}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Events Queue & Face ID Match Verification */}
          <div className="rounded-lg border border-white/10 bg-[#08164D]/80 p-4 lg:col-span-4">
            <div className="flex items-center justify-between gap-2">
              <h5 className="font-display text-sm font-semibold text-white">
                Events Queue &amp; Face ID
              </h5>
              <span className="flex items-center gap-1 font-mono text-[11px] text-[#BDE5F6]">
                <UserCheck className="h-3.5 w-3.5" />
                <span>Directory Sync</span>
              </span>
            </div>

            <div className="mt-3 divide-y divide-white/10">
              {data.events.map((evt) => {
                const userDecision = verifiedIds[evt.id];
                return (
                  <div key={evt.id} className="py-3 first:pt-1 last:pb-0">
                    <div className="flex items-center justify-between gap-2 font-mono text-[11px] text-slate-300 tabular-nums">
                      <span className="text-[#BDE5F6]">{evt.id}</span>
                      <span>{evt.time}</span>
                    </div>
                    <div className="mt-1 text-xs font-semibold text-white">{evt.model}</div>
                    <div className="mt-0.5 text-[11px] text-slate-300">
                      {evt.zone} · {evt.match}
                    </div>
                    <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
                      <span className="font-mono text-[11px] text-slate-300">
                        Status: {userDecision ?? evt.status}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() =>
                            setVerifiedIds((prev) => ({...prev, [evt.id]: 'Correct'}))
                          }
                          className={`rounded px-2 py-1 text-[11px] font-medium transition-colors ${
                            userDecision === 'Correct'
                              ? 'bg-emerald-500 text-[#040B29]'
                              : 'border border-white/20 bg-white/5 text-slate-200 hover:bg-white/15'
                          }`}
                        >
                          Correct
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            setVerifiedIds((prev) => ({...prev, [evt.id]: 'False'}))
                          }
                          className={`rounded px-2 py-1 text-[11px] font-medium transition-colors ${
                            userDecision === 'False'
                              ? 'bg-amber-400 text-[#040B29]'
                              : 'border border-white/20 bg-white/5 text-slate-200 hover:bg-white/15'
                          }`}
                        >
                          False
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <figcaption className="mt-3 text-xs text-slate-500">
        Sample dashboard view — illustrative HSE KPIs, camera health status, and Face ID event
        verification workflow (actual plant feeds run 100% locally on site servers).
      </figcaption>
    </figure>
  );
}
