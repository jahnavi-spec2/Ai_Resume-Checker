import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  TrendingUp,
  Award,
  AlertTriangle,
  Tag,
  CheckCircle2,
  FileText,
  Sparkles,
  ArrowRight,
  RefreshCw,
} from "lucide-react";
import { getUserAnalysesApi } from "@/api/analyses";

export default function Insights() {
  const [analyses, setAnalyses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadInsights() {
      try {
        setLoading(true);
        const res = await getUserAnalysesApi();
        setAnalyses(res?.data?.analyses || []);
      } catch (err) {
        console.error("Failed to fetch analyses for insights:", err);
      } finally {
        setLoading(false);
      }
    }
    loadInsights();
  }, []);

  // Compute aggregated stats
  const totalScans = analyses.length;
  const avgScore = totalScans > 0
    ? Math.round(analyses.reduce((acc, curr) => acc + (curr.score || 0), 0) / totalScans)
    : 0;

  const topTierCount = analyses.filter((a) => a.score >= 80).length;
  const moderateTierCount = analyses.filter((a) => a.score >= 60 && a.score < 80).length;
  const lowTierCount = analyses.filter((a) => a.score < 60).length;

  // Aggregate missing keywords across all scans
  const keywordMap = {};
  analyses.forEach((a) => {
    a.missingKeywords?.forEach((kw) => {
      const clean = kw.trim().toLowerCase();
      keywordMap[clean] = (keywordMap[clean] || 0) + 1;
    });
  });

  const topMissingKeywords = Object.entries(keywordMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto w-full">
      {/* Header */}
      <div className="border-b border-slate-800/80 pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-xs font-semibold text-emerald-400 mb-2">
          <TrendingUp className="w-3.5 h-3.5" />
          AI Performance Analytics
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Resume & ATS Insights
        </h1>
        <p className="text-slate-400 text-sm mt-1">
          Deep-dive analysis into your overall resume quality, missing keywords, and score distributions.
        </p>
      </div>

      {loading ? (
        <div className="p-12 text-center bg-slate-900/40 border border-slate-800 rounded-2xl">
          <RefreshCw className="w-6 h-6 text-emerald-400 animate-spin mx-auto mb-2" />
          <p className="text-xs text-slate-400">Loading AI Insights Intelligence...</p>
        </div>
      ) : totalScans === 0 ? (
        <div className="p-12 text-center bg-slate-900/40 border border-slate-800 rounded-2xl space-y-3">
          <Sparkles className="w-10 h-10 text-emerald-400/40 mx-auto" />
          <h3 className="text-base font-bold text-white">No Scan Data Available</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Run an AI ATS scan on your resume to unlock score metrics and keyword gap analysis.
          </p>
          <Link
            to="/resumes"
            className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs rounded-xl transition-all"
          >
            Go to Resumes <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Top Metrics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl">
              <p className="text-xs text-slate-400 font-medium">Average ATS Score</p>
              <div className="flex items-baseline gap-1 mt-2">
                <span className="text-3xl font-bold text-emerald-400">{avgScore}</span>
                <span className="text-xs text-slate-400">/ 100</span>
              </div>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl">
              <p className="text-xs text-slate-400 font-medium">Total AI Scans</p>
              <p className="text-3xl font-bold text-white mt-2">{totalScans}</p>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl">
              <p className="text-xs text-slate-400 font-medium">Top Tier (80+ Score)</p>
              <p className="text-3xl font-bold text-emerald-300 mt-2">{topTierCount}</p>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl">
              <p className="text-xs text-slate-400 font-medium">Needs Attention (&lt;60)</p>
              <p className="text-3xl font-bold text-amber-400 mt-2">{lowTierCount}</p>
            </div>
          </div>

          {/* 2-Column: Most Frequent Missing Keywords + Score Distribution */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Top Missing Keywords (7 cols) */}
            <div className="lg:col-span-7 bg-slate-900/80 border border-slate-800 p-6 rounded-2xl space-y-4">
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <Tag className="w-4 h-4 text-emerald-400" />
                Most Frequently Missing Keywords Across All Scans
              </h2>
              {topMissingKeywords.length === 0 ? (
                <p className="text-xs text-slate-400">No missing keywords detected!</p>
              ) : (
                <div className="space-y-2.5">
                  {topMissingKeywords.map(([keyword, count], idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-slate-950/70 border border-slate-800/80 rounded-xl flex items-center justify-between text-xs"
                    >
                      <span className="font-semibold text-slate-200 capitalize">+ {keyword}</span>
                      <span className="px-2.5 py-1 bg-amber-500/10 text-amber-300 border border-amber-500/20 rounded-lg text-[11px] font-bold">
                        Missing in {count} scan{count > 1 ? "s" : ""}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Score Tier Distribution (5 cols) */}
            <div className="lg:col-span-5 bg-slate-900/80 border border-slate-800 p-6 rounded-2xl space-y-4">
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <Award className="w-4 h-4 text-emerald-400" />
                Score Tier Breakdown
              </h2>
              <div className="space-y-3 pt-2">
                <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-emerald-300 font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>ATS Ready (80 - 100)</span>
                  </div>
                  <span className="font-bold text-emerald-400">{topTierCount} scans</span>
                </div>

                <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-amber-300 font-semibold">
                    <AlertTriangle className="w-4 h-4 text-amber-400" />
                    <span>Moderate Match (60 - 79)</span>
                  </div>
                  <span className="font-bold text-amber-400">{moderateTierCount} scans</span>
                </div>

                <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-rose-300 font-semibold">
                    <AlertTriangle className="w-4 h-4 text-rose-400" />
                    <span>Needs Tailoring (&lt; 60)</span>
                  </div>
                  <span className="font-bold text-rose-400">{lowTierCount} scans</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
