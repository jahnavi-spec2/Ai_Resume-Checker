import { TrendingUp, Sparkles, ArrowRight, AlertCircle, CheckCircle2, KeyRound, Gauge, GitCompare } from "lucide-react";
import { DarkPanel } from "./Darkpanel";
import { SectionHeader } from "./Featuressection";

const SERIES = [42, 51, 58, 67, 74, 81, 86];

function KpiCard({ icon: Icon, label, value, suffix, delta, accent }) {
  return (
    <div className={`rounded-2xl p-5 border ${accent ? "bg-emerald-950 border-emerald-700/40" : "bg-white/[0.03] border-white/[0.07]"}`}>
      <div className="flex items-center gap-2 mb-3">
        <div className={`h-7 w-7 rounded-full flex items-center justify-center ${accent ? "bg-white/15 text-white" : "bg-emerald-400/15 text-emerald-200"}`}>
          <Icon size={13} />
        </div>
        <span className="text-[11px] text-white/55">{label}</span>
      </div>
      <div className="flex items-baseline gap-1">
        <span className="text-3xl font-semibold text-white">{value}</span>
        {suffix && <span className="text-[12px] text-white/45">{suffix}</span>}
      </div>
      {delta && (
        <div className="inline-flex items-center gap-1 mt-2 px-2 py-0.5 rounded-full bg-emerald-400/15 text-emerald-300 text-[10px] font-semibold">
          {delta}
        </div>
      )}
    </div>
  );
}

function DarkCard({ className = "", children }) {
  return <div className={`rounded-2xl bg-white/[0.03] border border-white/[0.07] p-5 ${className}`}>{children}</div>;
}

function AreaChart() {
  const w = 600, h = 140;
  const stepX = w / (SERIES.length - 1);
  const path = SERIES.map((p, i) => `${i === 0 ? "M" : "L"} ${i * stepX} ${h - (p / 100) * h}`).join(" ");
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-[140px]">
      <path d={path} fill="none" stroke="#B6CFC0" strokeWidth="2.5" strokeLinecap="round" />
      {SERIES.map((p, i) => (
        <circle key={i} cx={i * stepX} cy={h - (p / 100) * h} r="3.5" fill="#16181D" stroke="#B6CFC0" strokeWidth="2" />
      ))}
    </svg>
  );
}

export function DashboardPreviewSection() {
  return (
    <section id="dashboard-preview" className="px-3 sm:px-6 mt-28 sm:mt-36" style={{ maxWidth: 1240, marginLeft: "auto", marginRight: "auto" }}>
      <SectionHeader eyebrow="Inside the product" title={<>Every metric you'd ask for. None you wouldn't.</>} sub="A real glimpse at the dashboard you'll be using in two minutes." />

      <DarkPanel className="mt-12 p-4 sm:p-8 lg:p-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-5">
          <div className="lg:col-span-3"><KpiCard icon={Gauge} label="ATS Score" value="86" suffix="/100" delta="+18%" /></div>
          <div className="lg:col-span-3"><KpiCard icon={GitCompare} label="Versions" value="4" delta="+2" /></div>
          <div className="lg:col-span-3"><KpiCard icon={AlertCircle} label="Issues Fixed" value="11" delta="+7" /></div>
          <div className="lg:col-span-3"><KpiCard icon={KeyRound} label="Keywords Matched" value="24" suffix="/26" delta="+9" accent /></div>

          <DarkCard className="lg:col-span-7">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="text-[11px] uppercase text-white/45 font-semibold">Score Evolution</div>
                <div className="text-base font-semibold text-white mt-1">V1 → V4 over 3 weeks</div>
              </div>
              <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-400/15 text-emerald-200 text-[10px] font-semibold">
                <TrendingUp size={10} /> +44 pts
              </div>
            </div>
            <div className="flex items-baseline gap-2 mb-3">
              <div className="text-[44px] font-semibold text-white leading-none">86</div>
              <div className="text-[12px] text-white/50">/ 100</div>
            </div>
            <AreaChart />
          </DarkCard>

          <DarkCard className="lg:col-span-5">
            <div className="text-[11px] uppercase text-white/45 font-semibold">Score breakdown</div>
            <div className="text-base font-semibold text-white mt-1 mb-4">Where you're winning</div>
            {[{ label: "Keywords", value: 88 }, { label: "Format & ATS parsing", value: 74 }, { label: "Impact statements", value: 91 }, { label: "Readability", value: 82 }, { label: "Action verbs", value: 79 }].map((b) => (
              <div key={b.label} className="mb-3 last:mb-0">
                <div className="flex justify-between text-[11px] text-white/55 mb-1">
                  <span>{b.label}</span>
                  <span className="text-white font-semibold">{b.value}</span>
                </div>
                <div className="h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                  <div className="h-full rounded-full bg-emerald-400" style={{ width: `${b.value}%` }} />
                </div>
              </div>
            ))}
          </DarkCard>

          <DarkCard className="lg:col-span-7">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-[11px] uppercase text-white/45 font-semibold">Bullet rewrite</div>
                <div className="text-base font-semibold text-white mt-1">Apply all → new version</div>
              </div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-400/15 text-emerald-200 text-[10px] font-semibold">
                <Sparkles size={10} /> AI rewrite
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-[1fr_24px_1fr] gap-3 items-center">
              <div className="rounded-xl bg-white/[0.03] border border-white/[0.08] p-3">
                <div className="text-[9px] uppercase text-white/45 font-semibold mb-1">Original</div>
                <div className="text-[12.5px] text-white/70">Built dashboards for the analytics team</div>
              </div>
              <div className="flex justify-center text-white/30"><ArrowRight size={16} /></div>
              <div className="rounded-xl bg-emerald-400/10 border border-emerald-400/20 p-3">
                <div className="text-[9px] uppercase text-emerald-200 font-semibold mb-1">Rewritten</div>
                <div className="text-[12.5px] text-white">Shipped 4 React dashboards adopted by 12k users — cut load time 38%.</div>
              </div>
            </div>
          </DarkCard>

          <DarkCard className="lg:col-span-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="flex items-center gap-1.5 text-red-300 mb-2"><AlertCircle size={12} /><span className="text-[11px] uppercase font-semibold">Issues</span></div>
                {["Weak verbs", "Missing keywords", "Inconsistent dates"].map((s) => (
                  <div key={s} className="text-[11.5px] text-white/65 py-1 border-b border-white/[0.04] last:border-0">{s}</div>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1.5 text-emerald-300 mb-2"><CheckCircle2 size={12} /><span className="text-[11px] uppercase font-semibold">Strengths</span></div>
                {["Quantified outcomes", "Clean structure", "Strong action verbs"].map((s) => (
                  <div key={s} className="text-[11.5px] text-white/65 py-1 border-b border-white/[0.04] last:border-0">{s}</div>
                ))}
              </div>
            </div>
          </DarkCard>
        </div>
      </DarkPanel>
    </section>
  );
}