import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { resumeApi } from "../api/resumes";
import { analyzeResumeApi } from "../api/analyses";
import {
  FileText,
  Sparkles,
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  Tag,
  RefreshCw,
  Layers,
  Award,
  Plus,
  Zap,
  Target,
} from "lucide-react";

export default function ResumeDetail() {
  const { id } = useParams();
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);
  const [analyzing, setAnalyzing] = useState(false);
  const [targetRole, setTargetRole] = useState("");
  const [analysisResult, setAnalysisResult] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // New Version modal / state
  const [showAddVersion, setShowAddVersion] = useState(false);
  const [versionLabel, setVersionLabel] = useState("");
  const [versionText, setVersionText] = useState("");
  const [addingVersion, setAddingVersion] = useState(false);

  const fetchResumeDetail = async () => {
    try {
      setLoading(true);
      const response = await resumeApi.getById(id);
      setResume(response.data.resume);
    } catch (err) {
      console.error("Error fetching resume detail:", err);
      setError("Failed to load resume details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResumeDetail();
  }, [id]);

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-[400px]">
        <div className="flex items-center gap-3 text-emerald-400 font-medium">
          <div className="w-5 h-5 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin"></div>
          <span>Loading Resume & Version History...</span>
        </div>
      </div>
    );
  }

  if (!resume) {
    return (
      <div className="p-8 text-center text-slate-400">
        <p>Resume not found.</p>
        <Link to="/resumes" className="mt-4 inline-block text-emerald-400 font-semibold hover:underline">
          Back to Resumes
        </Link>
      </div>
    );
  }

  // Active version helper
  const activeVersion =
    resume.versions?.find((v) => v._id === resume.currentVersionId) ||
    resume.versions?.[0];

  // Handle switching active version
  const handleSetActiveVersion = async (versionId) => {
    try {
      setError("");
      const res = await resumeApi.setCurrentVersion(id, versionId);
      setResume(res.data.resume);
      setSuccess("Active version updated!");
    } catch (err) {
      console.error(err);
      setError("Could not switch version.");
    }
  };

  // Handle running AI ATS Analysis
  const handleRunAnalysis = async (e) => {
    e.preventDefault();
    try {
      setAnalyzing(true);
      setError("");
      setSuccess("");

      const res = await analyzeResumeApi(id, targetRole);
      setAnalysisResult(res.data.analysis);
      setSuccess("AI ATS Analysis completed successfully!");
    } catch (err) {
      console.error("Analysis error:", err);
      setError(err.response?.data?.message || "Failed to run AI analysis.");
    } finally {
      setAnalyzing(false);
    }
  };

  // Handle adding a new version
  const handleCreateVersion = async (e) => {
    e.preventDefault();
    if (!versionLabel || !versionText) {
      setError("Label and Raw Text are required to create a version.");
      return;
    }
    try {
      setAddingVersion(true);
      setError("");
      const res = await resumeApi.addVersion(id, {
        label: versionLabel,
        rawText: versionText,
        sourceType: "rewrite",
        setAsCurrent: true,
      });
      setResume(res.data.resume);
      setSuccess("New version created and set as active!");
      setShowAddVersion(false);
      setVersionLabel("");
      setVersionText("");
    } catch (err) {
      console.error(err);
      setError("Failed to create new version.");
    } finally {
      setAddingVersion(false);
    }
  };

  const getScoreColor = (score) => {
    if (score >= 75) return "text-emerald-400 border-emerald-500/40 bg-emerald-500/10";
    if (score >= 50) return "text-amber-400 border-amber-500/40 bg-amber-500/10";
    return "text-rose-400 border-rose-500/40 bg-rose-500/10";
  };

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto w-full">
      {/* Navigation Topbar */}
      <div className="flex items-center justify-between">
        <Link
          to="/resumes"
          className="flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-emerald-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Resumes
        </Link>
        <div className="flex items-center gap-3">
          <Link
            to={`/job-match?resumeId=${resume._id}`}
            className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-emerald-400 border border-emerald-500/30 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <Target className="w-3.5 h-3.5" />
            Match to Job Description
          </Link>
          <span className="px-3 py-1.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-xl text-xs font-semibold flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5" />
            {resume.versions?.length || 1} Version(s)
          </span>
        </div>
      </div>

      {/* Notifications */}
      {error && (
        <div className="p-4 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-300 text-sm flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-300 text-sm flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{success}</span>
        </div>
      )}

      {/* Title & Analysis Trigger Banner */}
      <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl space-y-4 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-3">
              <FileText className="w-6 h-6 text-emerald-400" />
              {resume.title}
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Active Version: <span className="text-emerald-400 font-semibold">{activeVersion?.label || "Original"}</span>
            </p>
          </div>

          {/* AI Analysis Bar */}
          <form onSubmit={handleRunAnalysis} className="flex flex-col sm:flex-row items-center gap-3">
            <input
              type="text"
              placeholder="Target Role (e.g. React Engineer)"
              value={targetRole}
              onChange={(e) => setTargetRole(e.target.value)}
              className="px-3.5 py-2 bg-slate-950/80 border border-slate-800 rounded-xl text-sm text-slate-200 focus:outline-none focus:border-emerald-500 transition-colors placeholder:text-slate-600 w-full sm:w-64"
            />
            <button
              type="submit"
              disabled={analyzing}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white text-sm font-semibold rounded-xl transition-all shadow-lg shadow-emerald-600/20 shrink-0"
            >
              {analyzing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Evaluating with Gemini AI...</span>
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4" />
                  Run AI ATS Scan
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* 2-Column Main Content View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Version Switcher & Text Viewer (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <Layers className="w-4 h-4 text-emerald-400" />
                Resume Versions
              </h2>
              <button
                onClick={() => setShowAddVersion(!showAddVersion)}
                className="text-xs font-semibold text-emerald-400 hover:underline flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> Add Version
              </button>
            </div>

            {/* Version Pills */}
            <div className="space-y-2">
              {resume.versions?.map((v) => {
                const isActive = v._id === resume.currentVersionId;
                return (
                  <div
                    key={v._id}
                    className={`p-3 rounded-xl border flex items-center justify-between text-xs transition-all ${
                      isActive
                        ? "bg-emerald-500/10 border-emerald-500/40 text-emerald-300 font-semibold"
                        : "bg-slate-950/40 border-slate-800/80 text-slate-400 hover:border-slate-700"
                    }`}
                  >
                    <div>
                      <p className="font-semibold text-slate-200">{v.label}</p>
                      <span className="text-[10px] text-slate-500 capitalize">{v.sourceType} version</span>
                    </div>
                    {isActive ? (
                      <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 rounded-md text-[10px]">
                        Active
                      </span>
                    ) : (
                      <button
                        onClick={() => handleSetActiveVersion(v._id)}
                        className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-md text-[11px]"
                      >
                        Set Active
                      </button>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Form to Add Rewritten Version */}
            {showAddVersion && (
              <form onSubmit={handleCreateVersion} className="pt-4 border-t border-slate-800 space-y-3">
                <input
                  type="text"
                  placeholder="Version Label (e.g. Tailored for Frontend)"
                  value={versionLabel}
                  onChange={(e) => setVersionLabel(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                />
                <textarea
                  rows={4}
                  placeholder="Paste modified/rewritten resume text here..."
                  value={versionText}
                  onChange={(e) => setVersionText(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-emerald-500 font-mono"
                />
                <button
                  type="submit"
                  disabled={addingVersion}
                  className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs rounded-xl"
                >
                  {addingVersion ? "Saving..." : "Save New Version"}
                </button>
              </form>
            )}
          </div>

          {/* Active Version Raw Text Display */}
          <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl space-y-3">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <FileText className="w-4 h-4 text-emerald-400" />
              Extracted Resume Text
            </h2>
            <div className="p-4 bg-slate-950 border border-slate-800/80 rounded-xl max-h-[400px] overflow-y-auto font-mono text-xs text-slate-300 whitespace-pre-wrap leading-relaxed">
              {activeVersion?.rawText || "No text found in version."}
            </div>
          </div>
        </div>

        {/* Right Column: AI Analysis Report (7 cols) */}
        <div className="lg:col-span-7">
          {!analysisResult ? (
            <div className="bg-slate-900/40 border border-slate-800 p-8 rounded-2xl text-center space-y-3">
              <Sparkles className="w-10 h-10 text-emerald-400/50 mx-auto" />
              <h3 className="text-base font-bold text-white">No AI Analysis Run Yet</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Enter an optional target role above and click <strong>"Run AI ATS Scan"</strong> to generate your score, missing keywords, and bullet rewrites.
              </p>
            </div>
          ) : (
            <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl space-y-6 shadow-xl">
              {/* ATS Score Card */}
              <div className="flex items-center justify-between p-5 bg-slate-950/80 border border-slate-800 rounded-xl">
                <div>
                  <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
                    <Award className="w-4 h-4 text-emerald-400" />
                    Overall ATS Compatibility Score
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Evaluated for: <span className="text-emerald-400 font-medium">{analysisResult.targetRole || "General Software Engineering"}</span>
                  </p>
                </div>
                <div className={`px-5 py-3 rounded-xl border font-bold text-3xl ${getScoreColor(analysisResult.score)}`}>
                  {analysisResult.score} <span className="text-xs text-slate-400">/100</span>
                </div>
              </div>

              {/* Strengths */}
              {analysisResult.strengths?.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" /> Key Strengths
                  </h4>
                  <ul className="space-y-1.5">
                    {analysisResult.strengths.map((str, idx) => (
                      <li key={idx} className="p-3 bg-emerald-500/5 border border-emerald-500/20 text-xs text-emerald-200 rounded-xl flex items-start gap-2">
                        <span className="text-emerald-400 font-bold">•</span>
                        <span>{str}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Issues */}
              {analysisResult.issues?.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4" /> Formatting & Content Issues
                  </h4>
                  <ul className="space-y-1.5">
                    {analysisResult.issues.map((iss, idx) => (
                      <li key={idx} className="p-3 bg-amber-500/5 border border-amber-500/20 text-xs text-amber-200 rounded-xl flex items-start gap-2">
                        <span className="text-amber-400 font-bold">•</span>
                        <span>{iss}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Missing Keywords */}
              {analysisResult.missingKeywords?.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Tag className="w-4 h-4" /> Missing Critical Keywords
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {analysisResult.missingKeywords.map((kw, idx) => (
                      <span key={idx} className="px-3 py-1.5 bg-amber-500/10 text-amber-300 border border-amber-500/30 text-xs rounded-xl font-medium">
                        + {kw}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Bullet Rewrites */}
              {analysisResult.rewrites?.length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4" /> AI Suggested Bullet Rewrites
                  </h4>
                  <div className="space-y-3">
                    {analysisResult.rewrites.map((rw, idx) => (
                      <div key={idx} className="p-4 bg-slate-950/80 border border-slate-800 rounded-xl space-y-2 text-xs">
                        <div className="text-slate-400">
                          <span className="font-bold text-rose-400">Original: </span>
                          <span className="line-through">{rw.original}</span>
                        </div>
                        <div className="text-emerald-300 pt-1 border-t border-slate-800/80">
                          <span className="font-bold text-emerald-400">Suggested ATS Version: </span>
                          <span>{rw.suggestion}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
 