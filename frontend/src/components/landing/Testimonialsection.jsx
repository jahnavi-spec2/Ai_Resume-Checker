import { Star } from "lucide-react";
import { SectionHeader } from "./Featuressection";

const TESTIMONIALS = [
  { name: "Priya S.", role: "Frontend Engineer", quote: "Went from 3 callbacks in 2 months to 5 in one week after fixing what it flagged." },
  { name: "Daniel K.", role: "Backend Engineer", quote: "The keyword gaps were the thing recruiters never told me about. Obvious in hindsight." },
  { name: "Meera T.", role: "Product Designer", quote: "Rewrites actually sounded like me, not generic AI fluff. Applied same day." },
];

export function TestimonialsSection() {
  return (
    <section className="px-3 sm:px-6 mt-28 sm:mt-36" style={{ maxWidth: 1240, marginLeft: "auto", marginRight: "auto" }}>
      <SectionHeader eyebrow="Testimonials" title={<>People who stopped guessing.</>} sub="A few of the 47,300+ resumes we've analyzed." />

      <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-5">
        {TESTIMONIALS.map((t) => (
          <div key={t.name} className="rounded-[22px] bg-[var(--surface)] border border-[var(--border)] shadow-card p-6">
            <div className="flex gap-0.5 text-amber-400 mb-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={13} fill="currentColor" strokeWidth={0} />
              ))}
            </div>
            <p className="text-[13.5px] text-[var(--ink)] leading-relaxed">"{t.quote}"</p>
            <div className="mt-4 text-[12px] text-[var(--ink-muted)]">
              <span className="font-semibold text-[var(--ink)]">{t.name}</span> · {t.role}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}