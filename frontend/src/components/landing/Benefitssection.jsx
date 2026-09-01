import { PhoneCall, ShieldCheck, Zap, Search, Sparkles } from "lucide-react";
import { SectionHeader } from "./Featuressection";

const BENEFITS = [
  { icon: PhoneCall, title: "3.2× more callbacks", desc: "Users hit interview rates that matched their target roles, not their fears.", span: "lg:col-span-3" },
  { icon: ShieldCheck, title: "Parsed by every ATS", desc: "Greenhouse, Lever, Workday — your resume now reads cleanly to all of them.", span: "lg:col-span-3" },
  { icon: Sparkles, title: "Bullets that brag, not bore", desc: "Quantified outcomes, strong verbs, and your voice — never the AI's.", span: "lg:col-span-2" },
  { icon: Zap, title: "Apply in minutes, not weeks", desc: "Tailor your resume to a JD in under 60 seconds.", span: "lg:col-span-2" },
  { icon: Search, title: "Match the right keywords", desc: "We surface the exact terms recruiters search for.", span: "lg:col-span-2" },
];

export function BenefitsSection() {
  return (
    <section className="px-3 sm:px-6 mt-28 sm:mt-36" style={{ maxWidth: 1240, marginLeft: "auto", marginRight: "auto" }}>
      <SectionHeader eyebrow="Outcomes" title={<>The point isn't a better resume. It's a better offer.</>} sub="What our users actually report after their second analysis." />

      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 sm:gap-5">
        {BENEFITS.map((b) => (
          <div
            key={b.title}
            className={`rounded-[22px] bg-[var(--surface)] border border-[var(--border)] shadow-card hover:shadow-hover transition-shadow p-5 sm:p-6 ${b.span}`}
          >
            <div className="h-10 w-10 rounded-2xl bg-[var(--accent-soft)] text-[var(--accent-strong)] flex items-center justify-center mb-4">
              <b.icon size={16} strokeWidth={2.25} />
            </div>
            <h3 className="font-display text-[17px] font-semibold text-[var(--ink)]">{b.title}</h3>
            <p className="text-[13px] text-[var(--ink-muted)] mt-1.5 leading-relaxed">{b.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}