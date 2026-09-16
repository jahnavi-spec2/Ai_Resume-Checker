import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { 
  Target, 
  Sparkles, 
  FileText, 
  CheckCircle2, 
  AlertTriangle, 
  Tag, 
  Award, 
  Briefcase, 
  ArrowRight,
  Layers,
  Trash2,
  Clock
} from "lucide-react";
import { getUserResumes } from "@/api/resumes";
import { analyzeJobMatch, getUserJobMatches, deleteJobMatch } from "@/api/jobMatch";

export default function JobMatch() {
  const [searchParams] = useSearchParams();
  const preselectedResumeId = searchParams.get("resumeId");

  const [resumes, setResumes] = useState([]);
  const [selectedResumeId, setSelectedResumeId] = useState(preselectedResumeId || "");
  const [selectedVersionId, setSelectedVersionId] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");

  const [loadingResumes, setLoadingResumes] = useState(true);
  const [analyzing, setAnalyzing] = useState(false);
  const [matchResult, setMatchResult] = useState(null);
  const [pastMatches, setPastMatches] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Fetch user resumes
  useEffect(() => {
    async function loadResumes() {
      try {
        setLoadingResumes(true);
        const res = await getUserResumes();
        const list = res?.data?.resumes || [];
        setResumes(list);

        if (list.length > 0) {
          const defaultId = preselectedResumeId && list.some(r => r._id === preselectedResumeId)
            ? preselectedResumeId
            : list[0]._id;
          setSelectedResumeId(defaultId);
        }
      } catch (err) {
        console.error("Failed to load resumes:", err);
      } finally {
        setLoadingResumes(false);
      }
    }
    loadResumes();
    loadPastMatches();
  }, [preselectedResumeId]);

  // Update available versions when selected resume changes
  const activeResume = resumes.find((r) => r._id === selectedResumeId);
  useEffect(() => {
    if (activeResume && activeResume.versions?.length > 0) {
      setSelectedVersionId(activeResume.currentVersionId || activeResume.versions[0]._id);
    } else {
      setSelectedVersionId("");
    }
  }, [selectedResumeId, activeResume]);

  async function loadPastMatches() {
    try {
      setLoadingHistory(true);
      const res = await getUserJobMatches();
      setPastMatches(res?.data?.jobMatches || []);
    } catch (err) {
      console.error("Failed to load past job matches:", err);
    } finally {
      setLoadingHistory(false);
    }
  }

  async function handleRunMatch(e) {
    e.preventDefault();
    if (!selectedResumeId) {
      setErrorMsg("Please select a resume.");
      return;
    }
    if (!jobDescription.trim()) {
      setErrorMsg("Please enter a Job Description.");
      return;
    }

    try {
      setErrorMsg("");
      setAnalyzing(true);
      const res = await analyzeJobMatch({
        resumeId: selectedResumeId,
        versionId: selectedVersionId || undefined,
        jobTitle: jobTitle.trim() || "Target Position",
        jobDescription: jobDescription.trim(),
      });

      const matchData = res?.data?.jobMatch;
      setMatchResult(matchData);
      loadPastMatches();
    } catch (err) {
      console.error("Job match error:", err);
      setErrorMsg(err.response?.data?.message || "Failed to analyze job match. Please try again.");
    } finally {
      setAnalyzing(false);
    }
  }

  async function handleDeleteMatch(id) {
    try {
      await deleteJobMatch(id);
      setPastMatches((prev) => prev.filter((m) => m._id !== id));
      if (matchResult && matchResult._id === id) {
        setMatchResult(null);
      }
    } catch (err) {
      console.error("Delete job match error:", err);
    }
  }

  const getScoreColor = (score) => {
    if (score >= 80) return "text-emerald-400 border-emerald-500/30 bg-emerald-500/10";
    if (score >= 60) return "text-amber-400 border-amber-500/30 bg-amber-500/10";
    return "text-rose-400 border-rose-500/30 bg-rose-500/10";
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-xs font-semibold text-emerald-400 mb-2">
            <Target className="w-3.5 h-3.5" />
            AI Role Matching & ATS Alignment
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Job Description Matcher
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Compare your resume against a target job posting to find skill gaps, keyword matches, and tailored improvements.
          </p>
        </div>
      </div>

      {errorMsg && (
        <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl text-xs text-rose-300 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 shrink-0 text-rose-400" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Main Grid: Form Left (5 cols) & Results Right (7 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Match Input Form */}
        <div className="lg:col-span-5 space-y-6">
          <form onSubmit={handleRunMatch} className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl space-y-5 shadow-xl">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-emerald-400" />
              Configure Match Parameters
            </h2>

            {/* Select Resume */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300">Select Resume</label>
              {loadingResumes ? (
                <div className="text-xs text-slate-500 py-2">Loading resumes...</div>
              ) : resumes.length === 0 ? (
                <div className="text-xs text-amber-400 p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl">
                  No resumes found. Please upload a resume first.
                </div>
              ) : (
                <select
                  value={selectedResumeId}
                  onChange={(e) => setSelectedResumeId(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                >
                  {resumes.map((r) => (
                    <option key={r._id} value={r._id}>
                      {r.title} ({r.versions?.length || 1} version{r.versions?.length === 1 ? "" : "s"})
                    </option>
                  ))}
                </select>
              )}
            </div>

            {/* Select Version if available */}
            {activeResume && activeResume.versions?.length > 1 && (
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-emerald-400" />
                  Select Resume Version
                </label>
                <select
                  value={selectedVersionId}
                  onChange={(e) => setSelectedVersionId(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                >
                  {activeResume.versions.map((v) => (
                    <option key={v._id} value={v._id}>
                      {v.label} ({v.sourceType})
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Target Job Title */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300">Target Job Title (Optional)</label>
              <input
                type="text"
                placeholder="e.g. Senior Frontend Developer"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
              />
            </div>

            {/* Job Description */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300">Target Job Description</label>
              <textarea
                rows={7}
                placeholder="Paste the full job posting requirements, responsibilities, and qualifications here..."
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-emerald-500 leading-relaxed font-sans"
              />
            </div>

            <button
              type="submit"
              disabled={analyzing || resumes.length === 0}
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-semibold text-xs rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              {analyzing ? (
                <>
                  <Sparkles className="w-4 h-4 animate-spin text-emerald-300" />
                  Running AI Matching Engine...
                </>
              ) : (
                <>
                  <Target className="w-4 h-4" />
                  Analyze Job Match
                </>
              )}
            </button>
          </form>

          {/* Past Job Matches History */}
          {pastMatches.length > 0 && (
            <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl space-y-3">
              <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-emerald-400" />
                Recent Match History
              </h3>
              <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
                {pastMatches.map((item) => (
                  <div
                    key={item._id}
                    onClick={() => setMatchResult(item)}
                    className={`p-3 rounded-xl border text-xs cursor-pointer transition-all flex items-center justify-between gap-3 ${
                      matchResult?._id === item._id
                        ? "bg-emerald-500/10 border-emerald-500/40 text-emerald-200"
                        : "bg-slate-950 border-slate-800/80 text-slate-300 hover:border-slate-700"
                    }`}
                  >
                    <div className="min-w-0">
                      <div className="font-semibold text-slate-200 truncate">{item.jobTitle}</div>
                      <div className="text-[11px] text-slate-500 flex items-center gap-2 mt-0.5">
                        <span>{item.resume?.title || "Resume"}</span>
                        <span>•</span>
                        <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className={`px-2.5 py-1 rounded-lg border font-bold text-xs ${getScoreColor(item.matchScore)}`}>
                        {item.matchScore}%
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteMatch(item._id);
                        }}
                        className="p-1 text-slate-500 hover:text-rose-400 transition-colors"
                        title="Delete Match"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: AI Match Results (7 cols) */}
        <div className="lg:col-span-7">
          {!matchResult ? (
            <div className="bg-slate-900/40 border border-slate-800 p-10 rounded-2xl text-center space-y-4">
              <Target className="w-12 h-12 text-emerald-400/40 mx-auto" />
              <h3 className="text-base font-bold text-white">No Job Match Selected</h3>
              <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
                Select a resume, paste the target Job Description on the left, and click <strong>"Analyze Job Match"</strong> to generate your match score, missing skills, and tailored suggestions.
              </p>
            </div>
          ) : (
            <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl space-y-6 shadow-xl">
              {/* Match Score Card Header */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 bg-slate-950/80 border border-slate-800 rounded-xl">
                <div>
                  <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">
                    Role Compatibility Analysis
                  </span>
                  <h3 className="text-lg font-bold text-white mt-0.5">{matchResult.jobTitle}</h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Evaluated against: <span className="text-slate-200 font-medium">{matchResult.resume?.title || "Selected Resume"}</span>
                  </p>
                </div>
                <div className={`px-6 py-3 rounded-2xl border font-extrabold text-3xl flex flex-col items-center justify-center shrink-0 ${getScoreColor(matchResult.matchScore)}`}>
                  <span>{matchResult.matchScore}%</span>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider font-normal mt-0.5">Match Score</span>
                </div>
              </div>

              {/* Matching Skills */}
              {matchResult.matchingSkills?.length > 0 && (
                <div className="space-y-2.5">
                  <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" /> Matching Required Skills ({matchResult.matchingSkills.length})
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {matchResult.matchingSkills.map((sk, idx) => (
                      <span key={idx} className="px-3 py-1.5 bg-emerald-500/10 text-emerald-300 border border-emerald-500/25 text-xs rounded-xl font-medium flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Missing Skills */}
              {matchResult.missingSkills?.length > 0 && (
                <div className="space-y-2.5">
                  <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4" /> Missing Required Skills ({matchResult.missingSkills.length})
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {matchResult.missingSkills.map((sk, idx) => (
                      <span key={idx} className="px-3 py-1.5 bg-amber-500/10 text-amber-300 border border-amber-500/25 text-xs rounded-xl font-medium flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Missing Keywords */}
              {matchResult.missingKeywords?.length > 0 && (
                <div className="space-y-2.5">
                  <h4 className="text-xs font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Tag className="w-4 h-4" /> Important Keywords Missing in Resume
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {matchResult.missingKeywords.map((kw, idx) => (
                      <span key={idx} className="px-3 py-1 bg-rose-500/10 text-rose-300 border border-rose-500/20 text-xs rounded-lg font-mono">
                        + {kw}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Experience Gaps */}
              {matchResult.experienceGaps?.length > 0 && (
                <div className="space-y-2.5">
                  <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                    <Layers className="w-4 h-4 text-emerald-400" /> Qualification & Experience Gaps
                  </h4>
                  <ul className="space-y-2">
                    {matchResult.experienceGaps.map((gap, idx) => (
                      <li key={idx} className="p-3.5 bg-slate-950 border border-slate-800 text-xs text-slate-300 rounded-xl leading-relaxed">
                        • {gap}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* AI Tailoring Suggestions */}
              {matchResult.suggestions?.length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4" /> Actionable Resume Tailoring Tips
                  </h4>
                  <div className="space-y-2.5">
                    {matchResult.suggestions.map((sug, idx) => (
                      <div key={idx} className="p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-xl text-xs text-emerald-200 flex items-start gap-3 leading-relaxed">
                        <ArrowRight className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{sug}</span>
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
