
import { AlertCircle, Sparkles, CheckCircle2, ArrowRight, TrendingUp } from "lucide-react";

const RADIUS = 78;
const ARC = Math.PI * RADIUS;
const SCORE = 86;
const OFFSET = ARC - ARC * (SCORE / 100);

export function HeroPreview() {
  return (
    <div className="relative w-full h-[460px] sm:h-[520px]">
      {/* Gauge card */}
      <div
        className="absolute top-6 left-1/2 -translate-x-1/2 w-[280px] sm:w-[300px] rounded-[22px] border border-white/10 p-5"
        style={{ background: "linear-gradient(160deg, #1F2A24 0%, #16181D 45%, #0F1115 100%)" }}
      >
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="text-[10px] uppercase tracking-wide text-white/45 font-semibold">
              ATS Readiness
            </div>
            <div className="text-[11px] text-white/55 mt-0.5">Senior_Frontend.pdf</div>
          </div>
          <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-400/15 text-emerald-300 text-[10px] font-semibold">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Strong
          </div>
        </div>

        <div className="relative mx-auto w-[200px]">
          <svg viewBox="0 0 200 120" className="w-full h-auto block">
            <path
              d={`M 22 105 A ${RADIUS} ${RADIUS} 0 0 1 178 105`}
              fill="none"
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="10"
              strokeLinecap="round"
            />
            <path
              d={`M 22 105 A ${RADIUS} ${RADIUS} 0 0 1 178 105`}
              fill="none"
              stroke="#8FB39C"
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={ARC}
              strokeDashoffset={OFFSET}
            />
          </svg>
          <div className="absolute inset-x-0 top-[48%] flex flex-col items-center">
            <div className="text-[42px] font-semibold text-white leading-none">{SCORE}</div>
            <div className="text-[10px] text-white/45 mt-0.5">out of 100</div>
          </div>
        </div>

        <div className="mt-3 flex justify-center">
          <div className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-emerald-400/15 text-emerald-200 text-[10px] font-semibold">
            <TrendingUp size={10} /> +18 vs V1
          </div>
        </div>
      </div>

      {/* Issues card */}
      <div
        className="absolute bottom-10 left-0 sm:-left-4 w-[230px] rounded-[18px] border border-white/10 p-4"
        style={{ background: "rgba(22,24,29,0.95)" }}
      >
        <div className="flex items-center gap-2 mb-3">
          <div className="h-6 w-6 rounded-lg bg-red-400/15 text-red-300 flex items-center justify-center">
            <AlertCircle size={12} />
          </div>
          <div className="text-[11px] font-semibold text-white">Top issues</div>
          <div className="ml-auto text-[10px] text-white/45">5</div>
        </div>
        {["Weak action verbs", "Missing keywords: React, AWS", "Inconsistent dates"].map((t) => (
          <div key={t} className="flex items-center gap-2 py-1.5">
            <div className="h-1.5 w-1.5 rounded-full bg-amber-400" />
            <div className="text-[11px] text-white/75 truncate">{t}</div>
          </div>
        ))}
      </div>

      {/* Rewrite card */}
      <div
        className="absolute bottom-4 right-0 sm:-right-4 w-[260px] rounded-[18px] border border-white/10 p-4"
        style={{ background: "rgba(22,24,29,0.95)" }}
      >
        <div className="flex items-center gap-2 mb-3">
          <div className="h-6 w-6 rounded-lg bg-emerald-400/15 text-emerald-200 flex items-center justify-center">
            <Sparkles size={12} />
          </div>
          <div className="text-[11px] font-semibold text-white">AI rewrite</div>
          <div className="ml-auto inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-emerald-400/15 text-emerald-200 text-[9px] font-semibold">
            <CheckCircle2 size={9} /> improved
          </div>
        </div>
        <div className="text-[10px] uppercase text-white/40 font-semibold mb-1">Before</div>
        <div className="text-[11px] text-white/55 line-through">Worked on dashboards for the team</div>
        <div className="flex items-center gap-1.5 my-2 text-white/30">
          <ArrowRight size={11} />
          <span className="text-[9px] uppercase text-emerald-200 font-semibold">After</span>
        </div>
        <div className="text-[11px] text-white">
          Shipped 4 React analytics dashboards used by 12k+ users, cutting load time 38%.
        </div>
      </div>

      {/* Keyword pills */}
      <div className="absolute top-2 right-2 sm:right-6 flex flex-col gap-1.5 items-end">
        {["React", "TypeScript", "AWS"].map((k) => (
          <div
            key={k}
            className="px-2.5 py-1 rounded-full bg-white/10 border border-white/10 text-[10px] font-semibold text-white"
          >
            +{k}
          </div>
        ))}
      </div>
    </div>
  );
}