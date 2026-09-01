import { Link } from "react-router-dom";
import { ArrowRight, Play, Sparkles, ShieldCheck } from "lucide-react";
import { DarkPanel } from "./DarkPanel";
import { HeroPreview } from "./Heropreview";

export function HeroSection() {
  return (
    <section className="relative w-full">
      <DarkPanel className="w-full min-h-[760px] lg:min-h-[820px]" radius="rounded-b-[40px] sm:rounded-b-[56px]">
        <div
          className="grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-12 lg:gap-10 items-center px-6 sm:px-10 lg:px-16 pt-32 sm:pt-36 lg:pt-40 pb-16 lg:pb-24"
          style={{ maxWidth: 1280, marginLeft: "auto", marginRight: "auto" }}
        >
          <div className="text-white">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/8 border border-white/10">
              <Sparkles size={12} className="text-emerald-300" />
              <span className="text-[11px] tracking-wide text-white/85 uppercase font-semibold">
                Now scoring against ATS 2026 criteria
              </span>
            </div>

            <h1 className="font-display text-[48px] sm:text-[64px] lg:text-[80px] leading-[0.98] tracking-tight mt-7">
              Beat the ATS.
              <br />
              <span className="text-white/50">Land more</span>{" "}
              <span className="text-emerald-300">interviews.</span>
            </h1>

            <p className="text-white/65 text-base sm:text-lg lg:text-[19px] mt-6 max-w-[540px] leading-relaxed">
              Upload your resume. Get an instant ATS score, fixable issues, and AI-rewritten bullets
              that actually sound like you — built for engineers, by engineers.
            </p>

            <div className="flex flex-wrap items-center gap-3 mt-8">
              <Link
                to="/register"
                className="inline-flex items-center gap-2 h-12 px-5 rounded-full font-semibold text-[14px] text-white bg-gradient-to-br from-emerald-500 via-emerald-700 to-emerald-900 hover:opacity-90"
              >
                Upload your resume
                <ArrowRight size={15} />
              </Link>
              <a
                href="#how-it-works"
                className="inline-flex items-center gap-2 h-12 px-5 rounded-full font-medium text-[14px] text-white bg-white/8 border border-white/12 hover:bg-white/12"
              >
                <Play size={13} fill="currentColor" />
                See how it works
              </a>
            </div>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-8 text-[12px] text-white/55">
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck size={13} className="text-emerald-400" />
                No credit card required
              </span>
              <span>Free ATS analysis</span>
              <span>47,300+ resumes analyzed</span>
            </div>
          </div>

          <div className="relative">
            <HeroPreview />
          </div>
        </div>
      </DarkPanel>
    </section>
  );
}