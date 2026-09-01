import { Gauge, Sparkles, KeyRound, Layers, GitCompare, LineChart, FileDown } from "lucide-react";

export function SectionHeader({ eyebrow, title, sub, center = true }) {
  return (
    <div className={center ? "text-center max-w-3xl mx-auto" : "max-w-3xl"}>
      {eyebrow && (
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--accent-soft)] text-[var(--accent-strong)] text-[11px] font-semibold uppercase tracking-[0.12em]">
          {eyebrow}
        </div>
      )}
      <h2 className="font-display text-[34px] sm:text-[44px] lg:text-[52px] leading-[1.05] tracking-tight text-[var(--ink)] mt-4">
        {title}
      </h2>
      {sub && <p className="text-[15px] sm:text-base text-[var(--ink-muted)] mt-4 leading-relaxed">{sub}</p>}
    </div>
  );
}

// Reusable little bar-list preview used inside a couple of feature cards.
function ScoreBars() {
  const bars = [
    { label: "Keywords", value: 88 },
    { label: "Format", value: 74 },
    { label: "Impact", value: 91 },
  ];
  return (
    <div className="rounded-2xl bg-[var(--surface-2)] border border-[var(--border)] p-4 space-y-2.5">
      {bars.map((b) => (
        <div key={b.label}>
          <div className="flex justify-between text-[11px] text-[var(--ink-muted)] mb-1">
            <span>{b.label}</span>
            <span className="text-[var(--ink)] font-semibold">{b.value}</span>
          </div>
          <div className="h-1.5 rounded-full bg-[var(--surface)] overflow-hidden">
            <div
              className="h-full rounded-full bg-[var(--accent)]"
              style={{ width: `${b.value}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function RewritePreview() {
  return (
    <div className="rounded-2xl bg-[var(--surface-2)] border border-[var(--border)] p-4 space-y-2">
      <div className="rounded-xl bg-[var(--surface)] border border-[var(--border)] p-3">
        <div className="text-[9px] uppercase text-[var(--ink-muted)] font-semibold mb-1">Before</div>
        <div className="text-[12px] text-[var(--ink-muted)] line-through">Worked on backend stuff</div>
      </div>
      <div className="rounded-xl bg-[var(--accent-soft)] p-3">
        <div className="text-[9px] uppercase text-[var(--accent-strong)] font-semibold mb-1">After</div>
        <div className="text-[12px] text-[var(--ink)]">Built 6 Node services handling 4.2M req/day.</div>
      </div>
    </div>
  );
}

function KeywordsPreview() {
  return (
    <div className="rounded-2xl bg-[var(--surface-2)] border border-[var(--border)] p-4">
      <div className="text-[10px] uppercase text-[var(--ink-muted)] font-semibold mb-2">
        Job: Senior Frontend @ Stripe
      </div>
      <div className="flex flex-wrap gap-1.5 mb-2.5">
        {["React", "TypeScript", "Node.js"].map((k) => (
          <span key={k} className="px-2 py-0.5 rounded-full bg-[var(--accent-soft)] text-[var(--accent-strong)] text-[10px] font-semibold">
            ✓ {k}
          </span>
        ))}
      </div>
      <div className="flex flex-wrap gap-1.5">
        {["GraphQL", "Docker"].map((k) => (
          <span key={k} className="px-2 py-0.5 rounded-full bg-red-100 text-red-600 text-[10px] font-semibold">
            + {k}
          </span>
        ))}
      </div>
    </div>
  );
}

function VersionsPreview() {
  const versions = [{ l: "V1", s: 62 }, { l: "V2", s: 78 }, { l: "V3", s: 86 }];
  return (
    <div className="rounded-2xl bg-[var(--surface-2)] border border-[var(--border)] p-4 flex items-center gap-2">
      {versions.map((v, i) => (
        <div
          key={v.l}
          className={`flex-1 rounded-xl p-2.5 ${
            i === versions.length - 1
              ? "bg-[var(--accent-soft)] border border-[var(--accent)]/30"
              : "bg-[var(--surface)] border border-[var(--border)]"
          }`}
        >
          <div className="text-[9px] uppercase text-[var(--ink-muted)] font-semibold">{v.l}</div>
          <div className="text-[20px] font-semibold mt-0.5">{v.s}</div>
        </div>
      ))}
    </div>
  );
}

function DiffPreview() {
  return (
    <div className="rounded-2xl bg-[var(--surface-2)] border border-[var(--border)] p-3 space-y-1 font-mono text-[11px]">
      <div className="flex gap-2 px-2 py-1 rounded-md bg-red-50">
        <span className="text-red-500 font-bold w-3">−</span>
        <span className="text-[var(--ink-muted)] line-through">helped team</span>
      </div>
      <div className="flex gap-2 px-2 py-1 rounded-md bg-[var(--accent-soft)]">
        <span className="text-green-600 font-bold w-3">+</span>
        <span className="text-[var(--ink)]">led 4-person frontend pod</span>
      </div>
    </div>
  );
}

function ChartPreview() {
  const pts = [42, 58, 51, 67, 74, 81, 86];
  const w = 320, h = 90;
  const stepX = w / (pts.length - 1);
  const path = pts.map((p, i) => `${i === 0 ? "M" : "L"} ${i * stepX} ${h - p}`).join(" ");
  return (
    <div className="rounded-2xl bg-[var(--surface-2)] border border-[var(--border)] p-4">
      <div className="text-[10px] uppercase text-[var(--ink-muted)] font-semibold mb-2">
        Score over 7 iterations
      </div>
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-[90px]">
        <path d={path} fill="none" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    </div>
  );
}

function PdfPreview() {
  return (
    <div className="rounded-2xl bg-[var(--surface-2)] border border-[var(--border)] p-4 flex items-center justify-center">
      <div className="w-[110px] h-[130px] rounded-lg bg-[var(--surface)] border border-[var(--border)] shadow-card p-2 space-y-1.5">
        <div className="h-1.5 w-12 rounded-full bg-[var(--ink)]" />
        <div className="h-1 w-16 rounded-full bg-[var(--border)]" />
        <div className="pt-1.5 h-1 w-10 rounded-full bg-[var(--accent)]" />
      </div>
    </div>
  );
}

const FEATURES = [
  { icon: Gauge, title: "ATS Score Analysis", desc: "Section-level scoring against the same parsers Greenhouse and Lever run.", preview: <ScoreBars />, span: "lg:col-span-2" },
  { icon: Sparkles, title: "AI Resume Rewrite", desc: "Bullets rewritten in your voice, with quantified outcomes.", preview: <RewritePreview /> },
  { icon: KeyRound, title: "Keyword Optimization", desc: "Matches your resume against any job description.", preview: <KeywordsPreview /> },
  { icon: Layers, title: "Version History", desc: "Every iteration scored, dated, and one click away.", preview: <VersionsPreview /> },
  { icon: GitCompare, title: "Diff Comparison", desc: "See exactly what changed between versions.", preview: <DiffPreview /> },
  { icon: LineChart, title: "Analytics Dashboard", desc: "Track score evolution and issues resolved over time.", preview: <ChartPreview />, span: "lg:col-span-2" },
  { icon: FileDown, title: "PDF Export", desc: "Rebuilt with a clean ATS-friendly template.", preview: <PdfPreview /> },
];

export function FeaturesSection() {
  return (
    <section id="features" className="px-3 sm:px-6 mt-18 sm:mt-36" style={{ maxWidth: 1240, marginLeft: "auto", marginRight: "auto" }}>
      <SectionHeader
        eyebrow="Features"
        title={<>Everything your resume needs to <span className="text-[var(--accent-strong)]">actually land.</span></>}
        sub="Eight surgical tools built around one workflow: upload, analyze, rewrite, ship."
      />

      <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {FEATURES.map((f) => (
          <div
            key={f.title}
            className={`rounded-[22px] border border-[var(--border)] shadow-card hover:shadow-hover transition-shadow bg-[var(--surface)] p-5 sm:p-6 ${f.span || ""}`}
          >
            <div className="flex items-start gap-3">
              <div className="h-10 w-10 rounded-2xl flex items-center justify-center shrink-0 bg-[var(--accent-soft)] text-[var(--accent-strong)]">
                <f.icon size={17} strokeWidth={2.25} />
              </div>
              <div>
                <h3 className="font-display text-[17px] font-semibold text-[var(--ink)]">{f.title}</h3>
                <p className="text-[13px] text-[var(--ink-muted)] mt-1 leading-relaxed">{f.desc}</p>
              </div>
            </div>
            <div className="mt-5">{f.preview}</div>
          </div>
        ))}
      </div>
    </section>
  );
}