import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getUserAnalysesApi,
  deleteAnalysisApi,
  exportAnalysisReportApi,
} from "../api/analyses";
import {
  History as HistoryIcon,
  Download,
  Trash2,
  Search,
  Calendar,
  FileText,
  AlertCircle,
  Tag,
} from "lucide-react";

export default function History() {
  const [analyses, setAnalyses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [downloadingId, setDownloadingId] = useState(null);

  const fetchHistory = async () => {
    try {
      setLoading(true);
      const res = await getUserAnalysesApi();
      setAnalyses(res.data.analyses || []);
    } catch (err) {
      console.error("Error fetching analysis history:", err);
      setError("Failed to load analysis history.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this analysis record?")) return;

    try {
      await deleteAnalysisApi(id);
      setAnalyses((prev) => prev.filter((a) => a._id !== id));
    } catch (err) {
      console.error("Delete error:", err);
      setError("Failed to delete record.");
    }
  };

  const handleExport = async (id, title) => {
    try {
      setDownloadingId(id);
      const res = await exportAnalysisReportApi(id, "txt");

      // Trigger browser file download using Blob
      const blob = new Blob([res.data], { type: "text/plain" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `ATS_Report_${title.replace(/\s+/g, "_")}.txt`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Export error:", err);
      setError("Failed to export report.");
    } finally {
      setDownloadingId(null);
    }
  };

  const filteredAnalyses = analyses.filter((item) => {
    const titleMatch = item.resume?.title?.toLowerCase().includes(search.toLowerCase());
    const roleMatch = item.targetRole?.toLowerCase().includes(search.toLowerCase());
    return titleMatch || roleMatch;
  });

  const getScoreBadgeClass = (score) => {
    if (score >= 75) return "bg-emerald-500/10 text-emerald-400 border-emerald-500/30";
    if (score >= 50) return "bg-amber-500/10 text-amber-400 border-amber-500/30";
    return "bg-rose-500/10 text-rose-400 border-rose-500/30";
  };

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto w-full">
      {/* Header & Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight flex items-center gap-2">
            Analysis <span className="text-emerald-400">History</span> 📜
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Review past ATS evaluation reports and download formatted summary text files.
          </p>
        </div>

        {/* Search input */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search by title or role..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-sm text-slate-200 focus:outline-none focus:border-emerald-500 transition-colors placeholder:text-slate-600"
          />
        </div>
      </div>

      {error && (
        <div className="p-4 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-300 text-sm flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* History List */}
      {loading ? (
        <div className="py-16 text-center text-slate-400 flex items-center justify-center gap-2">
          <div className="w-5 h-5 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin"></div>
          <span>Loading History Records...</span>
        </div>
      ) : filteredAnalyses.length === 0 ? (
        <div className="text-center py-16 bg-slate-900/40 border border-slate-800 rounded-2xl">
          <HistoryIcon className="w-10 h-10 text-slate-600 mx-auto mb-3" />
          <p className="text-slate-300 font-medium">No analysis history found</p>
          <p className="text-xs text-slate-500 mt-1">
            Run an AI scan from any resume detail page to save history.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredAnalyses.map((item) => (
            <div
              key={item._id}
              className="bg-slate-900/80 border border-slate-800/80 hover:border-slate-700 p-5 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all shadow-sm"
            >
              <div className="space-y-2 max-w-xl">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-lg">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white leading-tight">
                      {item.resume?.title || "Untitled Resume"}
                    </h3>
                    <p className="text-xs text-emerald-400 font-medium mt-0.5">
                      Target Role: {item.targetRole || "General ATS"}
                    </p>
                  </div>
                </div>

                {/* Missing Keywords preview */}
                {item.missingKeywords?.length > 0 && (
                  <div className="flex items-center gap-1.5 flex-wrap pt-1">
                    <span className="text-[11px] text-slate-500 flex items-center gap-1">
                      <Tag className="w-3 h-3" /> Missing:
                    </span>
                    {item.missingKeywords.slice(0, 4).map((kw, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 bg-amber-500/10 text-amber-300 border border-amber-500/20 text-[10px] rounded-md font-medium"
                      >
                        {kw}
                      </span>
                    ))}
                  </div>
                )}

                <p className="text-[11px] text-slate-500 flex items-center gap-1 pt-1">
                  <Calendar className="w-3 h-3" />
                  Analyzed on {new Date(item.createdAt).toLocaleString()}
                </p>
              </div>

              {/* Score & Actions */}
              <div className="flex items-center justify-between md:justify-end gap-4 border-t md:border-t-0 pt-3 md:pt-0 border-slate-800/80">
                <div
                  className={`px-4 py-2 rounded-xl border text-center font-bold text-lg ${getScoreBadgeClass(
                    item.score
                  )}`}
                >
                  {item.score} <span className="text-xs text-slate-400">/ 100</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleExport(item._id, item.resume?.title || "Report")}
                    disabled={downloadingId === item._id}
                    className="flex items-center gap-1.5 px-3.5 py-2 bg-emerald-600/20 hover:bg-emerald-600 text-emerald-300 hover:text-white border border-emerald-500/30 text-xs font-semibold rounded-xl transition-all"
                  >
                    <Download className="w-3.5 h-3.5" />
                    {downloadingId === item._id ? "Exporting..." : "Export .txt"}
                  </button>

                  <button
                    onClick={() => handleDelete(item._id)}
                    title="Delete Record"
                    className="p-2 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-xl transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
