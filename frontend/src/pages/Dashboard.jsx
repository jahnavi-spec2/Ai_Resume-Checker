import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getDashboardStatsApi } from "../api/dashboard";
import {
  FileText,
  Sparkles,
  Award,
  TrendingUp,
  Upload,
  Target,
  ArrowRight,
  Clock,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";

export default function Dashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadStats = async () => {
      try {
        const response = await getDashboardStatsApi();
        setStats(response.data.stats);
      } 
      catch (err) {
       
        if (err.response?.status === 401) {
          setError("Session expired or unauthenticated. Please sign in to view dashboard data.");
        } else {
          setError("Could not load dashboard data. Ensure backend server is running.");
        }
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-[400px]">
        <div className="flex items-center gap-3 text-emerald-400 font-medium">
          <div className="w-5 h-5 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin"></div>
          <span>Loading Dashboard Intelligence...</span>
        </div>
      </div>
    );
  }

  const {
    totalResumes = 0,
    totalAnalyses = 0,
    averageScore = 0,
    highestScore = 0,
    recentAnalysis = null,
    recentResumes = [],
  } = stats || {};

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto w-full">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-slate-900 via-slate-900 to-emerald-950/40 p-6 rounded-2xl border border-slate-800/80 shadow-lg">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight flex items-center gap-2">
            Welcome back, <span className="text-emerald-400">{user?.name || "User"}</span>! 👋
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Here is your AI resume intelligence overview and ATS score metrics.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            to="/resumes"
            className="flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm rounded-xl transition-all shadow-lg shadow-emerald-600/20"
          >
            <Upload className="w-4 h-4" />
            Upload Resume
          </Link>
          <Link
            to="/job-match"
            className="flex items-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-emerald-400 border border-emerald-500/30 font-semibold text-sm rounded-xl transition-all"
          >
            <Target className="w-4 h-4 " />
            Job Match
          </Link>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-300 text-sm">
          {error}
        </div>
      )}

      {/* 4 stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Total resiumes */}
        <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl flex items-center justify-between shadow-sm">
          <div>
            <p className="text-xs font-medium text-slate-400">Total Resumes</p>
            <p className="text-2xl font-bold text-white mt-1">{totalResumes}</p>
          </div>
          <div className="p-3 bg-emerald-500/10 border  border-emerald-500/20 rounded-xl text-emerald-400  shadow-lg shadow-emerald-500/10
                transition-all duration-300 ease-out
                hover:scale-110
                hover:bg-emerald-500/20
                hover:shadow-xl hover:shadow-emerald-500/25">
            <FileText className="w-6 h-6" />
          </div>
        </div>

        {/* AI Scans performed */}
        <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl flex items-center justify-between shadow-sm">
          <div>
            <p className="text-xs font-medium text-slate-400">AI Scans Run</p>
            <p className="text-2xl font-bold text-white mt-1">{totalAnalyses}</p>
          </div>
          <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400  shadow-lg shadow-emerald-500/10
                transition-all duration-300 ease-out
                hover:scale-110
                hover:bg-emerald-500/20
                hover:shadow-xl hover:shadow-emerald-500/25">
            <Sparkles className="w-6 h-6" />
          </div>
        </div>

        {/* average score */}
        <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl flex items-center justify-between shadow-sm">
          <div>
            <p className="text-xs font-medium text-slate-400">Average ATS Score</p>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-2xl font-bold text-emerald-400">{averageScore}</span>
              <span className="text-xs text-slate-400">/ 100</span>
            </div>
          </div>
          <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400  shadow-lg shadow-emerald-500/10
                transition-all duration-300 ease-out
                hover:scale-110
                hover:bg-emerald-500/20
                hover:shadow-xl hover:shadow-emerald-500/25">
            <TrendingUp className="w-6 h-6" />
          </div>
        </div>

        {/* Highest Score */}
        <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl flex items-center justify-between shadow-sm">
          <div>
            <p className="text-xs font-medium text-slate-400">Highest Score</p>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-2xl font-bold text-amber-400">{highestScore}</span>
              <span className="text-xs text-slate-400">/ 100</span>
            </div>
          </div>
          <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-amber-400  shadow-lg shadow-amber-500/10
                transition-all duration-300 ease-out
                hover:scale-110
                hover:bg-amber-500/20
                hover:shadow-xl hover:shadow-amber-500/25">
            <Award className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Grid Section: Recent Resumes & Latest Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Resumes Card */}
        <div className="bg-slate-900/70 border border-slate-800 p-6 rounded-2xl flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <FileText className="w-4 h-4 text-emerald-400" />
                Recent Resumes
              </h2>
              <Link
                to="/resumes"
                className="text-xs font-semibold text-emerald-400 hover:underline flex items-center gap-1"
              >
                View All <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            {recentResumes.length === 0 ? (
              <div className="text-center py-8 bg-slate-950/40 rounded-xl border border-slate-800/60">
                <p className="text-sm text-slate-400">No resumes uploaded yet.</p>
                <Link
                  to="/resumes"
                  className="inline-block mt-3 px-4 py-2 bg-emerald-600/20 text-emerald-300 border border-emerald-500/30 rounded-lg text-xs font-semibold hover:bg-emerald-600/30 transition-all"
                >
                  Upload First Resume
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {recentResumes.map((resume) => (
                  <div
                    key={resume._id}
                    className="p-3.5 bg-slate-950/50 border border-slate-800/80 rounded-xl flex items-center justify-between hover:border-slate-700 transition-colors"
                  >
                    <div className="flex items-center gap-3 truncate">
                      <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-lg">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div className="truncate">
                        <p className="text-sm font-semibold text-slate-200 truncate">{resume.title}</p>
                        <p className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                          <Clock className="w-3 h-3" />
                          Updated {new Date(resume.updatedAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <Link
                      to={`/resumes/${resume._id}`}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 rounded-lg transition-colors"
                    >
                      View
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Latest Scan Card */}
        <div className="bg-slate-900/70 border border-slate-800 p-6 rounded-2xl flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                Latest Scan Result
              </h2>
              {recentAnalysis && (
                <Link
                  to="/history"
                  className="text-xs font-semibold text-emerald-400 hover:underline flex items-center gap-1"
                >
                  History <ArrowRight className="w-3 h-3" />
                </Link>
              )}
            </div>

            {!recentAnalysis ? (
              <div className="text-center py-8 bg-slate-950/40 rounded-xl border border-slate-800/60">
                <p className="text-sm text-slate-400">No ATS scans performed yet.</p>
                <p className="text-xs text-slate-400 mt-1">Upload a resume to run your first AI analysis!</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="p-4 bg-slate-950/60 border border-slate-800/80 rounded-xl flex items-center justify-between">
                  <div>
                    <p className="text-xs text-slate-400 font-medium">Resume: {recentAnalysis.resume?.title || "Untitled"}</p>
                    <p className="text-xs text-emerald-400 font-medium mt-0.5">Role: {recentAnalysis.targetRole || "General ATS"}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-bold text-emerald-400">{recentAnalysis.score}</span>
                    <span className="text-xs text-slate-400">/100</span>
                  </div>
                </div>

                {/* Missing Keywords Snippet */}
                {recentAnalysis.missingKeywords?.length > 0 && (
                  <div>
                    <p className="text-xs font-semibold text-slate-400 mb-2 flex items-center gap-1">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                      Missing Keywords Highlight:
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {recentAnalysis.missingKeywords.slice(0, 5).map((kw, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 bg-amber-500/10 text-amber-300 border border-amber-500/20 text-[11px] rounded-lg font-medium"
                        >
                          {kw}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
