import React, { useState, useEffect } from "react";
import {
  Download,
  Copy,
  Check,
  FileText,
  Layers,
  Sparkles,
  RefreshCw,
  AlertTriangle,
} from "lucide-react";
import { getUserResumes } from "@/api/resumes";

export default function Export() {
  const [resumes, setResumes] = useState([]);
  const [selectedResumeId, setSelectedResumeId] = useState("");
  const [selectedVersionId, setSelectedVersionId] = useState("");
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const res = await getUserResumes();
        const list = res?.data?.resumes || [];
        setResumes(list);
        if (list.length > 0) {
          setSelectedResumeId(list[0]._id);
        }
      } catch (err) {
        console.error("Failed to load resumes:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const activeResume = resumes.find((r) => r._id === selectedResumeId);

  useEffect(() => {
    if (activeResume && activeResume.versions?.length > 0) {
      setSelectedVersionId(activeResume.currentVersionId || activeResume.versions[0]._id);
    } else {
      setSelectedVersionId("");
    }
  }, [selectedResumeId, activeResume]);

  const activeVersion = activeResume?.versions?.find((v) => v._id === selectedVersionId) || activeResume?.versions?.[0];

  const handleCopyText = () => {
    if (!activeVersion?.rawText) return;
    navigator.clipboard.writeText(activeVersion.rawText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadFile = () => {
    if (!activeResume || !activeVersion) return;
    try {
      setDownloading(true);
      const filename = `${activeResume.title.replace(/[^a-zA-Z0-9_-]/g, "_")}_${activeVersion.label.replace(/\s+/g, "_")}.txt`;
      const blob = new Blob([activeVersion.rawText], { type: "text/plain;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Download error:", err);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto w-full">
      {/* Header */}
      <div className="border-b border-slate-800/80 pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-xs font-semibold text-emerald-400 mb-2">
          <Download className="w-3.5 h-3.5" />
          Document Export & Copy
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Export Resume Text
        </h1>
        <p className="text-slate-400 text-sm mt-1">
          Export raw text or download plain text files of your original or AI-tailored resume versions.
        </p>
      </div>

      {loading ? (
        <div className="p-12 text-center bg-slate-900/40 border border-slate-800 rounded-2xl">
          <RefreshCw className="w-6 h-6 text-emerald-400 animate-spin mx-auto mb-2" />
          <p className="text-xs text-slate-400">Loading export options...</p>
        </div>
      ) : resumes.length === 0 ? (
        <div className="p-12 text-center bg-slate-900/40 border border-slate-800 rounded-2xl space-y-3">
          <FileText className="w-10 h-10 text-slate-600 mx-auto" />
          <h3 className="text-base font-bold text-white">No Resumes Found</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Upload a resume first to enable text exporting.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Controls Left (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl space-y-5 shadow-xl">
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                Select Export Target
              </h2>

              {/* Select Resume */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-300">Select Resume</label>
                <select
                  value={selectedResumeId}
                  onChange={(e) => setSelectedResumeId(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                >
                  {resumes.map((r) => (
                    <option key={r._id} value={r._id}>
                      {r.title} ({r.versions?.length || 1} versions)
                    </option>
                  ))}
                </select>
              </div>

              {/* Select Version */}
              {activeResume && activeResume.versions?.length > 0 && (
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-emerald-400" />
                    Select Version
                  </label>
                  <select
                    value={selectedVersionId}
                    onChange={(e) => setSelectedVersionId(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                  >
                    {activeResume.versions.map((v) => (
                      <option key={v._id} value={v._id}>
                        {v.label} ({v.sourceType})
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Quick Actions */}
              <div className="pt-3 space-y-3">
                <button
                  onClick={handleDownloadFile}
                  disabled={downloading || !activeVersion?.rawText}
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-semibold text-xs rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  Download Plain Text (.txt)
                </button>

                <button
                  onClick={handleCopyText}
                  disabled={!activeVersion?.rawText}
                  className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs rounded-xl border border-slate-700/80 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      Copied to Clipboard!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-slate-400" />
                      Copy Raw Text to Clipboard
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Text Preview Right (7 cols) */}
          <div className="lg:col-span-7">
            <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl space-y-4 shadow-xl">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-bold text-white flex items-center gap-2">
                  <FileText className="w-4 h-4 text-emerald-400" />
                  Text Preview ({activeVersion?.label || "Version"})
                </h2>
                <span className="text-[11px] text-slate-400 font-mono">
                  {activeVersion?.rawText ? `${activeVersion.rawText.length} characters` : "Empty"}
                </span>
              </div>

              <div className="p-4 bg-slate-950 border border-slate-800/80 rounded-xl max-h-[500px] overflow-y-auto font-mono text-xs text-slate-300 whitespace-pre-wrap leading-relaxed">
                {activeVersion?.rawText || "No text available in selected version."}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
