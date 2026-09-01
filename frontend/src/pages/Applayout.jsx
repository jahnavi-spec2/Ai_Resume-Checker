import { NavLink, Outlet } from "react-router-dom";
import {
  LayoutGrid,
  FileText,
  BarChart2,
  Layers,
  History as HistoryIcon,
  Settings,
  LogOut,
  Search,
  Bell,
} from "lucide-react";

// Every logged-in page (Dashboard, Resumes, Insights, History, Settings)
// renders INSIDE this shell via <Outlet />. This file only handles the
// sidebar + topbar — it never needs to change when you add page content.

const NAV_ITEMS = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutGrid },
  { to: "/resumes", label: "Resumes", icon: FileText },
  { to: "/insights", label: "Insights", icon: BarChart2 },
  { to: "/versions", label: "Versions", icon: Layers },
  { to: "/history", label: "History", icon: HistoryIcon },
];

export function AppLayout({ user }) {
  return (
    <div className="min-h-screen flex bg-[var(--bg)] text-[var(--ink)]">
      {/* Sidebar */}
      <aside className="w-16 shrink-0 flex flex-col items-center py-5 border-r border-[var(--border)]">
        <div className="h-9 w-9 rounded-xl bg-[var(--accent-soft)] flex items-center justify-center mb-8">
          <div className="h-4 w-4 rounded-full bg-[var(--accent-strong)]" />
        </div>

        <nav className="flex flex-col gap-2 flex-1">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `h-10 w-10 rounded-xl flex items-center justify-center transition-colors ${
                  isActive
                    ? "bg-[var(--ink)] text-[var(--bg)]"
                    : "text-[var(--ink-muted)] hover:bg-[var(--surface-2)]"
                }`
              }
              title={item.label}
            >
              <item.icon size={18} />
            </NavLink>
          ))}
        </nav>

        <div className="flex flex-col gap-2 items-center">
          <NavLink
            to="/settings"
            className="h-10 w-10 rounded-xl flex items-center justify-center text-[var(--ink-muted)] hover:bg-[var(--surface-2)]"
            title="Settings"
          >
            <Settings size={18} />
          </NavLink>
          <button
            className="h-10 w-10 rounded-xl flex items-center justify-center text-[var(--ink-muted)] hover:bg-[var(--surface-2)]"
            title="Log out"
          >
            <LogOut size={18} />
          </button>
          <div className="h-9 w-9 rounded-full bg-[var(--accent-soft)] text-[var(--accent-strong)] flex items-center justify-center text-xs font-semibold mt-2">
            {user?.name ? user.name[0] : "A"}
          </div>
        </div>
      </aside>

      {/* Main column */}
      <div className="flex-1 min-w-0">
        {/* Topbar: greeting + search live inside each page, but search/bell
            are reused often enough that a shared component is worth it */}
        <div className="flex items-center justify-end gap-3 px-8 pt-6">
          <div className="flex items-center gap-2 h-9 px-3 rounded-full border border-[var(--border)] bg-[var(--surface)] text-[13px] text-[var(--ink-muted)] w-64">
            <Search size={14} />
            <span>Search resumes, keywords, rewrites...</span>
          </div>
          <button className="h-9 w-9 rounded-full bg-[var(--surface)] border border-[var(--border)] flex items-center justify-center">
            <Bell size={15} />
          </button>
        </div>

        <main className="px-8 pb-12">
          <Outlet />
        </main>
      </div>
    </div>
  );
}