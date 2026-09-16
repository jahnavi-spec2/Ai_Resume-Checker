import React from "react";
import { useAuth } from "@/context/AuthContext";
import { User, Shield, Server, Key, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Settings() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto w-full">
      {/* Header */}
      <div className="border-b border-slate-800/80 pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-xs font-semibold text-emerald-400 mb-2">
          <Shield className="w-3.5 h-3.5" />
          Account & Configuration
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Account Settings
        </h1>
        <p className="text-slate-400 text-sm mt-1">
          Manage your account profile, security credentials, and API environment.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: User Profile Card (6 cols) */}
        <div className="lg:col-span-6 bg-slate-900/80 border border-slate-800 p-6 rounded-2xl space-y-6 shadow-xl">
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <User className="w-4 h-4 text-emerald-400" />
            User Profile Information
          </h2>

          <div className="flex items-center gap-4 p-4 bg-slate-950/80 border border-slate-800 rounded-xl">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-bold flex items-center justify-center text-lg shrink-0">
              {user?.name ? user.name[0].toUpperCase() : "U"}
            </div>
            <div>
              <h3 className="font-bold text-white text-base">{user?.name || "User"}</h3>
              <p className="text-xs text-slate-400 mt-0.5">{user?.email}</p>
            </div>
          </div>

          <div className="space-y-3 text-xs text-slate-300">
            <div className="p-3.5 bg-slate-950/50 border border-slate-800/80 rounded-xl flex items-center justify-between">
              <span className="text-slate-400">Account ID</span>
              <span className="font-mono text-emerald-400">{user?._id || "Active Session"}</span>
            </div>

            <div className="p-3.5 bg-slate-950/50 border border-slate-800/80 rounded-xl flex items-center justify-between">
              <span className="text-slate-400">Authentication Method</span>
              <span className="font-semibold text-slate-200">JWT HTTP-Only Cookies</span>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="w-full py-3 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-300 font-semibold text-xs rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            Sign Out of Account
          </button>
        </div>

        {/* Right Column: API & Environment Info (6 cols) */}
        <div className="lg:col-span-6 bg-slate-900/80 border border-slate-800 p-6 rounded-2xl space-y-6 shadow-xl">
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <Server className="w-4 h-4 text-emerald-400" />
            Backend API Configuration
          </h2>

          <div className="space-y-3 text-xs">
            <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-xl space-y-1">
              <span className="text-slate-400 font-medium">Backend API Endpoint</span>
              <p className="font-mono text-emerald-400 font-bold">http://localhost:8000/api/v1</p>
            </div>

            <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-xl space-y-1">
              <span className="text-slate-400 font-medium">AI Service Engine</span>
              <p className="text-slate-200 font-bold">Google Gemini Generative AI (@google/genai)</p>
            </div>

            <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-xl space-y-1">
              <span className="text-slate-400 font-medium">Database System</span>
              <p className="text-slate-200 font-bold">MongoDB Mongoose (Local Connection)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
