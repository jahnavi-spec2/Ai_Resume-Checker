import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Layers,
  FileText,
  CheckCircle2,
  ArrowRight,
  RefreshCw,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import { getUserResumes, setCurrentVersion } from "@/api/resumes";

export default function Versions() {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const [msg, setMsg] = useState("");

  const loadAllVersions = async () => {
    try {
      setLoading(true);
      const res = await getUserResumes();
      setResumes(res?.data?.resumes || []);
    } catch (err) {
      console.error("Failed to load versions:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAllVersions();
  }, []);

  const handleMakeActive = async (resumeId, versionId) => {
    try {
      setUpdatingId(versionId);
      setMsg("");
      await setCurrentVersion(resumeId, versionId);
      setMsg("Active version updated successfully!");
      await loadAllVersions();
    } catch (err) {
      console.error("Error setting current version:", err);
    } finally {
      setUpdatingId(null);
    }
  };

  // Flatten all versions into a list attached to parent resume metadata
  const allVersionsList = [];
  resumes.forEach((resume) => {
    resume.versions?.forEach((v) => {
      allVersionsList.push({
        ...v,
        resumeId: resume._id,
        resumeTitle: resume.title,
        isCurrent: v._id === resume.currentVersionId,
      });
    });
  });

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto w-full">
      {/* Header */}
      <div className="border-b border-slate-800/80 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-xs font-semibold text-emerald-400 mb-2">
            <Layers className="w-3.5 h-3.5" />
            Resume Version Control
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Version History Hub
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Manage, compare, and switch active tailored versions across all your resumes.
          </p>
        </div>
      </div>

      {msg && (
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-xs text-emerald-300 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{msg}</span>
        </div>
      )}

      {loading ? (
        <div className="p-12 text-center bg-slate-900/40 border border-slate-800 rounded-2xl">
          <RefreshCw className="w-6 h-6 text-emerald-400 animate-spin mx-auto mb-2" />
          <p className="text-xs text-slate-400">Fetching version history...</p>
        </div>
      ) : allVersionsList.length === 0 ? (
        <div className="p-12 text-center bg-slate-900/40 border border-slate-800 rounded-2xl space-y-3">
          <Layers className="w-10 h-10 text-slate-600 mx-auto" />
          <h3 className="text-base font-bold text-white">No Resume Versions Found</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Upload a resume to create your initial version (V1).
          </p>
          <Link
            to="/resumes"
            className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs rounded-xl transition-all"
          >
            Upload Resume <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Table / List View of Versions */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
            <div className="p-5 border-b border-slate-800/80 bg-slate-950/50 flex items-center justify-between">
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                All Created Versions ({allVersionsList.length})
              </h2>
            </div>

            <div className="divide-y divide-slate-800/80">
              {allVersionsList.map((ver) => (
                <div
                  key={ver._id}
                  className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-800/30 transition-colors"
                >
                  <div className="flex items-start gap-3.5 min-w-0">
                    <div className="p-2.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl shrink-0 mt-0.5">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2.5 flex-wrap">
                        <span className="font-bold text-white text-sm">{ver.label}</span>
                        {ver.isCurrent && (
                          <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-md text-[10px] font-bold">
                            Active Version
                          </span>
                        )}
                        <span className="px-2 py-0.5 bg-slate-800 text-slate-400 rounded-md text-[10px] capitalize">
                          {ver.sourceType}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-1 flex items-center gap-2">
                        <span>Belongs to: <strong className="text-slate-200">{ver.resumeTitle}</strong></span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
                    {!ver.isCurrent && (
                      <button
                        onClick={() => handleMakeActive(ver.resumeId, ver._id)}
                        disabled={updatingId === ver._id}
                        className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 rounded-xl transition-colors disabled:opacity-50"
                      >
                        {updatingId === ver._id ? "Setting..." : "Set as Active"}
                      </button>
                    )}
                    <Link
                      to={`/resumes/${ver.resumeId}`}
                      className="px-3.5 py-1.5 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors"
                    >
                      View & Edit <ExternalLink className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
