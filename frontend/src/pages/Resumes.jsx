import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  UploadCloud,
  FileText,
  Trash2,
  ChevronRight,
  Plus,
  Layers,
  Clock,
  Sparkles,
  AlertTriangle,
  Target,
} from "lucide-react";
import { getUserResumes, uploadResume, deleteResume } from "@/api/resumes";

export default function Resumes() {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [customTitle, setCustomTitle] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const navigate = useNavigate();

  const loadResumes = async () => {
    try {
      setLoading(true);
      const res = await getUserResumes();
      setResumes(res?.data?.resumes || []);
    } catch (err) {
      console.error("Failed to load resumes:", err);
      if (err.response?.status === 401) {
        setErrorMsg("Session expired or unauthenticated. Please sign in.");
      } else {
        setErrorMsg("Failed to fetch resumes. Ensure backend server is running on port 8000.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadResumes();
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== "application/pdf") {
        setErrorMsg("Only PDF files are supported.");
        return;
      }
      setSelectedFile(file);
      setErrorMsg("");
      if (!customTitle) {
        setCustomTitle(file.name.replace(/\.pdf$/i, ""));
      }
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      if (file.type !== "application/pdf") {
        setErrorMsg("Only PDF files are supported.");
        return;
      }
      setSelectedFile(file);
      setErrorMsg("");
      if (!customTitle) {
        setCustomTitle(file.name.replace(/\.pdf$/i, ""));
      }
    }
  };

  const handleUploadSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      setErrorMsg("Please select a PDF resume file to upload.");
      return;
    }

    try {
      setUploading(true);
      setErrorMsg("");
      setSuccessMsg("");

      const formData = new FormData();
      formData.append("file", selectedFile);
      if (customTitle.trim()) {
        formData.append("title", customTitle.trim());
      }

      await uploadResume(formData);
      setSuccessMsg("Resume uploaded and text extracted successfully!");
      setSelectedFile(null);
      setCustomTitle("");
      loadResumes();
    } catch (err) {
      console.error("Upload error:", err);
      setErrorMsg(
        err.response?.data?.message || "Failed to upload resume. Ensure PDF contains readable text."
      );
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteResume = async (id, title, e) => {
    e.stopPropagation();
    if (!window.confirm(`Are you sure you want to delete "${title}"?`)) return;

    try {
      await deleteResume(id);
      setResumes((prev) => prev.filter((r) => r._id !== id));
      setSuccessMsg(`Deleted "${title}"`);
    } catch (err) {
      console.error("Delete error:", err);
      setErrorMsg("Failed to delete resume.");
    }
  };

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <FileText className="w-7 h-7 text-emerald-400" />
            Resume Management
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Upload new PDF resumes, manage versions, and trigger AI ATS evaluations.
          </p>
        </div>
      </div>

      {/* Notifications */}
      {errorMsg && (
        <div className="p-4 bg-rose-500/10 border border-rose-500/30 rounded-xl text-xs sm:text-sm text-rose-300 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 shrink-0 text-rose-400" />
          <span>{errorMsg}</span>
        </div>
      )}

      {successMsg && (
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-xs sm:text-sm text-emerald-300 flex items-center gap-2">
          <Sparkles className="w-4 h-4 shrink-0 text-emerald-400" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Grid: Upload Box Left (5 cols) & Resumes List Right (7 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Drag & Drop PDF Upload Box */}
        <div className="lg:col-span-5">
          <form
            onSubmit={handleUploadSubmit}
            className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl space-y-5 shadow-xl"
          >
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <UploadCloud className="w-4 h-4 text-emerald-400" />
              Upload PDF Resume
            </h2>

            {/* Custom Title */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300">Resume Title (Optional)</label>
              <input
                type="text"
                placeholder="e.g. Senior Frontend Resume 2026"
                value={customTitle}
                onChange={(e) => setCustomTitle(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
              />
            </div>

            {/* Drag & Drop Zone */}
            <div
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
              className="relative flex flex-col items-center justify-center p-6 border-2 border-dashed border-slate-800 hover:border-emerald-500/50 bg-slate-950/60 rounded-2xl text-center cursor-pointer transition-colors group"
            >
              <input
                type="file"
                accept="application/pdf"
                onChange={handleFileChange}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-2xl mb-3 group-hover:scale-105 transition-transform">
                <UploadCloud className="w-6 h-6" />
              </div>
              {selectedFile ? (
                <div>
                  <p className="text-xs font-bold text-emerald-300 truncate max-w-[200px]">
                    {selectedFile.name}
                  </p>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    {(selectedFile.size / 1024).toFixed(1)} KB • PDF
                  </p>
                </div>
              ) : (
                <div>
                  <p className="text-xs font-bold text-slate-200">
                    Click to browse or drop your resume PDF
                  </p>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Max file size 5MB • Standard searchable PDF
                  </p>
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={uploading || !selectedFile}
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-semibold text-xs rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              {uploading ? (
                <>
                  <Sparkles className="w-4 h-4 animate-spin text-emerald-300" />
                  Extracting PDF Text...
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  Upload & Create Version 1
                </>
              )}
            </button>
          </form>
        </div>

        {/* Right Column: Resumes List */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
              <Layers className="w-4 h-4 text-emerald-400" />
              Your Uploaded Resumes ({resumes.length})
            </h2>
          </div>

          {loading ? (
            <div className="p-8 text-center bg-slate-900/40 border border-slate-800 rounded-2xl">
              <div className="w-5 h-5 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
              <p className="text-xs text-slate-400">Loading your resumes from database...</p>
            </div>
          ) : resumes.length === 0 ? (
            <div className="p-10 text-center bg-slate-900/40 border border-slate-800 rounded-2xl space-y-3">
              <FileText className="w-10 h-10 text-slate-600 mx-auto" />
              <p className="text-sm font-bold text-slate-300">No resumes uploaded yet</p>
              <p className="text-xs text-slate-400 max-w-xs mx-auto">
                Use the uploader on the left to upload your first resume PDF.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {resumes.map((r) => (
                <div
                  key={r._id}
                  onClick={() => navigate(`/resumes/${r._id}`)}
                  className="p-4 bg-slate-900/80 border border-slate-800 hover:border-emerald-500/40 rounded-2xl flex items-center justify-between transition-all cursor-pointer shadow-md group"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl group-hover:scale-105 transition-transform shrink-0">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-sm font-bold text-white truncate group-hover:text-emerald-300 transition-colors">
                        {r.title}
                      </h3>
                      <div className="flex items-center gap-3 text-[11px] text-slate-400 mt-1">
                        <span className="flex items-center gap-1">
                          <Layers className="w-3 h-3 text-emerald-400" />
                          {r.versions?.length || 1} Version(s)
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-slate-500" />
                          {new Date(r.updatedAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <Link
                      to={`/job-match?resumeId=${r._id}`}
                      onClick={(e) => e.stopPropagation()}
                      className="p-2 bg-slate-800 hover:bg-slate-700 text-emerald-400 rounded-lg text-xs font-medium transition-colors hidden sm:flex items-center gap-1"
                      title="Job Match with this resume"
                    >
                      <Target className="w-3.5 h-3.5" />
                      Match
                    </Link>

                    <button
                      onClick={(e) => handleDeleteResume(r._id, r.title, e)}
                      className="p-2 text-slate-500 hover:text-rose-400 hover:bg-slate-800/80 rounded-lg transition-colors"
                      title="Delete Resume"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 transition-colors" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
