import React from "react";
import { Link } from "react-router-dom";
import {
  Sparkles,
  Zap,
  Target,
  FileText,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  Layers,
} from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-emerald-500 ">
   
      <header className="border-b border-slate-800 bg-slate-900 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <span className="font-extrabold text-lg text-white ">
              Resume<span className="text-emerald-400">AI</span>
            </span>
          </div>

          <div className="flex items-center gap-4">
            <Link
              to="/login"
              className="text-xs font-semibold text-slate-400 hover:text-white "
            >
              Sign In
            </Link>
            <Link
              to="/register"
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-xl shadow-lg shadow-emerald-600/20 transition-all flex items-center gap-1.5"
            >
              Get Started <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-6 max-w-5xl mx-auto text-center space-y-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-emerald-500/10 border border-emerald-500/25 rounded-full text-xs font-semibold text-emerald-400">
          <Zap className="w-3.5 h-3.5" />
          Next-Gen AI Resume Checker & Job Tailoring Engine
        </div>

        <h1 className="text-4xl  font-extrabold text-white  leading-[1.1]">
          Craft an ATS-Proof Resume with{" "}
          <span className="bg-gradient-to-r from-emerald-400  via-teal-300 to-emerald-500 bg-clip-text text-transparent">
            AI Intelligence
          </span>
        </h1>

        <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto ">
          Score your resume against Applicant Tracking Systems, get instant bullet-point rewrites, and match your skills to target Job Descriptions in seconds.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <Link
            to="/register"
            className="w-full sm:w-auto px-8 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm rounded-xl shadow-xl shadow-emerald-600/25 transition-all flex items-center justify-center gap-2"
          >
            Create Free Account <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/login"
            className="w-full sm:w-auto px-8 py-3.5 bg-slate-900 hover:bg-slate-800 text-slate-200 font-semibold text-sm rounded-xl border border-slate-800 transition-all flex items-center justify-center gap-2"
          >
            Sign In to Dashboard
          </Link>
        </div>

        {/* Feature Badges */}
        <div className="pt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
          <span className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Free PDF Text Extraction
          </span>
          <span className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Gemini AI Powered
          </span>
          <span className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Role-Specific Matching
          </span>
        </div>
      </section>

      {/* Core Features Section */}
      <section className="py-16 px-6 max-w-7xl mx-auto border-t border-slate-800/80 space-y-12">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Everything You Need to Land Interviews
          </h2>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Built specifically for job seekers who want data-driven resume optimization.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Feature 1 */}
          <div className="bg-slate-900/70 border border-slate-800 p-6 rounded-2xl space-y-3">
            <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl w-fit">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">ATS Score Evaluation</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Get an overall ATS compatibility score out of 100, formatted issues highlight, and key strengths breakdown.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-slate-900/70 border border-slate-800 p-6 rounded-2xl space-y-3">
            <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl w-fit">
              <Target className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Job Description Matcher</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Paste any job description to discover missing required skills, keyword gaps, and tailored bullet point suggestions.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-slate-900/70 border border-slate-800 p-6 rounded-2xl space-y-3">
            <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl w-fit">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Version Management</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Maintain multiple resume versions for different tech stacks or companies, and toggle active versions easily.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 py-8 px-6 text-center text-xs text-slate-500">
        <p>© 2026 ResumeAI. Powered by Google Gemini AI & Express Backend.</p>
      </footer>
    </div>
  );
}