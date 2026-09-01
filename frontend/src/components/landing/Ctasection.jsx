import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { DarkPanel } from "./Darkpanel";

export function CTASection() {
  return (
    <section className="px-3 sm:px-6 mt-28 sm:mt-36" style={{ maxWidth: 1240, marginLeft: "auto", marginRight: "auto" }}>
      <DarkPanel className="px-6 sm:px-12 lg:px-20 py-16 sm:py-24 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/8 border border-white/10">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          <span className="text-[11px] tracking-wide text-white/85 uppercase font-semibold">
            Free forever for your first 3 analyses
          </span>
        </div>

        <h2 className="font-display text-[36px] sm:text-[52px] lg:text-[64px] leading-[1.04] tracking-tight text-white mt-6 max-w-3xl mx-auto">
          Stop guessing what
          <br />
          recruiters <span className="text-emerald-300">actually see.</span>
        </h2>

        <p className="text-white/65 text-base sm:text-lg mt-5 max-w-xl mx-auto leading-relaxed">
          Upload your resume now. Get your ATS score, fixable issues, and AI rewrites in under 15 seconds.
        </p>

        <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/register"
            className="inline-flex items-center gap-2 h-12 px-6 rounded-full font-semibold text-[14px] text-white bg-gradient-to-br from-emerald-500 via-emerald-700 to-emerald-900 hover:opacity-90"
          >
            Start free ATS analysis
            <ArrowRight size={15} />
          </Link>
          <Link
            to="/login"
            className="inline-flex items-center gap-2 h-12 px-5 rounded-full font-medium text-[14px] text-white bg-white/8 border border-white/12 hover:bg-white/12"
          >
            I already have an account
          </Link>
        </div>

        <div className="mt-6 inline-flex items-center gap-1.5 text-[12px] text-white/50">
          <ShieldCheck size={13} className="text-emerald-400" />
          No credit card · We never store your resume PDF
        </div>
      </DarkPanel>
    </section>
  );
}