import { Upload, Cpu, FileDown, ArrowRight, Check, Sparkles } from "lucide-react";
import { SectionHeader } from "./Featuressection";

function UploadVisual() {
  return (
    <div className="rounded-2xl bg-[var(--surface-2)] border border-[var(--border)] p-4 flex items-center gap-3">
      <div className="h-11 w-11 rounded-2xl bg-[var(--surface)] border border-[var(--border)] flex items-center justify-center">
        <div className="h-7 w-7 rounded-lg bg-[var(--accent)] flex items-center justify-center text-white">
          <Upload size={13} />
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-[12px] font-semibold text-[var(--ink)] truncate">resume_v3.pdf</div>
        <div className="text-[10px] text-[var(--ink-muted)]">412 KB · parsing…</div>
      </div>
      <div className="inline-flex items-center gap-1 h-5 px-2 rounded-full bg-[var(--accent-soft)] text-[var(--accent-strong)] text-[9px] font-semibold">
        <span className="h-1 w-1 rounded-full bg-[var(--accent)]" /> live
      </div>
    </div>
  );
}

function AnalyzeVisual() {
  const items = [
    { label: "Structure parsed", done: true },
    { label: "ATS rules checked", done: true },
    { label: "Generating rewrites…", done: false },
  ];
  return (
    <div className="rounded-2xl bg-[var(--surface-2)] border border-[var(--border)] p-4">
      <div className="text-[11px] font-semibold text-[var(--ink)] mb-3">Analyzing</div>
      <div className="space-y-1.5">
        {items.map((item) => (
          <div key={item.label} className="flex items-center gap-2">
            <div
              className={`h-4 w-4 rounded-full flex items-center justify-center ${
                item.done ? "bg-[var(--accent-soft)] text-[var(--accent-strong)]" : "border border-[var(--accent)]/40"
              }`}
            >
              {item.done && <Check size={9} strokeWidth={3.5} />}
            </div>
            <div className="text-[11px] text-[var(--ink-muted)]">{item.label}</div>
          </div>
        ))}
      </div>
      <div className="mt-3 pt-3 border-t border-[var(--border)] flex items-center justify-between">
        <div className="text-[10px] text-[var(--ink-muted)]">Predicted score</div>
        <div className="inline-flex items-center gap-1 text-[11px] font-bold text-[var(--accent-strong)]">
          <Sparkles size={10} /> 82 / 100
        </div>
      </div>
    </div>
  );
}

function DownloadVisual() {
  return (
    <div className="rounded-2xl bg-[var(--surface-2)] border border-[var(--border)] p-4 flex items-center gap-3">
      <div className="h-12 w-9 rounded-md bg-[var(--surface)] border border-[var(--border)] p-1.5 space-y-1">
        <div className="h-[2px] w-3/4 rounded bg-[var(--ink-muted)]/40" />
        <div className="h-[2px] w-full rounded bg-[var(--ink-muted)]/25" />
        <div className="h-[2px] w-5/6 rounded bg-[var(--ink-muted)]/25" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-[12px] font-semibold text-[var(--ink)] truncate">resume_v3_optimized.pdf</div>
        <div className="text-[10px] text-[var(--ink-muted)]">ATS-ready · 1 page</div>
      </div>
      <button className="h-9 w-9 rounded-full bg-[var(--ink)] text-[var(--bg)] flex items-center justify-center shrink-0">
        <FileDown size={13} />
      </button>
    </div>
  );
}

const STEPS = [
  { n: "01", icon: Upload, title: "Upload your resume", desc: "Drop a PDF or DOCX. We parse it in seconds.", Visual: UploadVisual },
  { n: "02", icon: Cpu, title: "AI analyzes & roasts", desc: "Scores against ATS rubrics, surfaces issues + strengths, drafts rewrites.", Visual: AnalyzeVisual },
  { n: "03", icon: FileDown, title: "Download optimized PDF", desc: "Apply rewrites, save a new version, export a clean PDF.", Visual: DownloadVisual },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="px-3 sm:px-6 mt-28 sm:mt-36" style={{ maxWidth: 1240, marginLeft: "auto", marginRight: "auto" }}>
      <SectionHeader
        eyebrow="How it works"
        title={<>From upload to interview-ready in 3 steps.</>}
        sub="No prompt engineering. No ten-step funnels. Drop, analyze, ship."
      />

      <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-5">
        {STEPS.map((s) => {
          const Icon = s.icon;
          const Visual = s.Visual;
          return (
            <div
              key={s.n}
              className="relative rounded-[28px] bg-[var(--surface)] border border-[var(--border)] shadow-card hover:shadow-hover transition-shadow p-7"
            >
              <div className="text-[13px] font-semibold text-[var(--accent-strong)]">Step {s.n}</div>

              <div className="mt-6 h-14 w-14 rounded-2xl flex items-center justify-center text-white bg-[var(--accent)]">
                <Icon size={22} strokeWidth={2} />
              </div>

              <h3 className="font-display text-[22px] font-semibold text-[var(--ink)] mt-6">{s.title}</h3>
              <p className="text-[13.5px] text-[var(--ink-muted)] mt-2.5 leading-relaxed">{s.desc}</p>

              <div className="mt-7">
                <Visual />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}