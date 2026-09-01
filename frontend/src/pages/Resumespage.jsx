import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UploadCloud, FileText, Trash2, ChevronRight } from "lucide-react";

// TEMP dummy data — replace this with a real fetch once your backend
// route (e.g. GET /api/resumes) exists. Shape stays the same either way,
// so nothing else in this file needs to change.
const DUMMY_RESUMES = [
  { id: "1", title: "Senior Frontend Engineer Resume", versions: 3, updatedAt: "2026-05-27" },
  { id: "2", title: "Full Stack Engineer Resume", versions: 2, updatedAt: "2026-05-21" },
  { id: "3", title: "Engineering Manager Resume", versions: 2, updatedAt: "2026-05-16" },
  { id: "4", title: "Startup Founder Resume", versions: 1, updatedAt: "2026-05-09" },
];

export default function ResumesPage() {
  const [resumes, setResumes] = useState(DUMMY_RESUMES);
  const navigate = useNavigate();

  function handleFileDrop(e) {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (!file) return;
    uploadResume(file);
  }

  function handleFilePick(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    uploadResume(file);
  }

  // Replace this with: POST /api/resumes (multipart form with the PDF)
  // then push the returned resume object into state.
  function uploadResume(file) {
    const newResume = {
      id: crypto.randomUUID(),
      title: file.name.replace(/\.pdf$/i, ""),
      versions: 1,
      updatedAt: new Date().toISOString().slice(0, 10),
    };
    setResumes((prev) => [newResume, ...prev]);
  }

  function handleDelete(id) {
    setResumes((prev) => prev.filter((r) => r.id !== id));
  }

  return (
    <div>
      <h1 className="font-display text-[26px] font-semibold">Your Resumes</h1>
      <p className="text-[14px] text-[var(--ink-muted)] mt-1">
        Upload a new one or pick up where you left off.
      </p>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-5">
        {/* Upload box */}
        <div className="rounded-[22px] bg-[var(--surface)] border border-[var(--border)] shadow-card p-6">
          <h3 className="font-semibold text-[15px]">Upload a resume</h3>
          <p className="text-[12px] text-[var(--ink-muted)] mt-1">
            PDF only. We extract the text and create version V1.
          </p>

          <label
            onDrop={handleFileDrop}
            onDragOver={(e) => e.preventDefault()}
            className="mt-5 flex flex-col items-center justify-center gap-2 h-56 rounded-2xl border-2 border-dashed border-[var(--border)] bg-[var(--surface-2)] cursor-pointer hover:border-[var(--accent)] transition-colors"
          >
            <div className="h-11 w-11 rounded-2xl bg-[var(--surface)] border border-[var(--border)] flex items-center justify-center">
              <UploadCloud size={18} className="text-[var(--accent-strong)]" />
            </div>
            <div className="text-[14px] font-semibold">Drop your resume PDF</div>
            <div className="text-[12px] text-[var(--ink-muted)]">
              or click to browse · max 5 MB · PDF only
            </div>
            <input type="file" accept="application/pdf" className="hidden" onChange={handleFilePick} />
          </label>
        </div>

        {/* Resume list */}
        <div className="flex flex-col gap-3">
          {resumes.map((r) => (
            <div
              key={r.id}
              onClick={() => navigate(`/resumes/${r.id}`)}
              className="flex items-center gap-3 rounded-[18px] bg-[var(--surface)] border border-[var(--border)] shadow-card hover:shadow-hover transition-shadow p-4 cursor-pointer"
            >
              <div className="h-10 w-10 rounded-xl bg-[var(--accent-soft)] text-[var(--accent-strong)] flex items-center justify-center shrink-0">
                <FileText size={16} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[14px] font-semibold truncate">{r.title}</div>
                <div className="text-[12px] text-[var(--ink-muted)]">Updated {r.updatedAt}</div>
              </div>
              <span className="text-[11px] px-2.5 py-1 rounded-full bg-[var(--surface-2)] text-[var(--ink-muted)] font-medium shrink-0">
                {r.versions} version{r.versions > 1 ? "s" : ""}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(r.id);
                }}
                className="h-8 w-8 rounded-lg flex items-center justify-center text-[var(--ink-muted)] hover:bg-red-50 hover:text-red-500 shrink-0"
              >
                <Trash2 size={14} />
              </button>
              <ChevronRight size={16} className="text-[var(--ink-muted)] shrink-0" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}