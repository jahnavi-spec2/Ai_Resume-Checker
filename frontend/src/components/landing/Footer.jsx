import { Link } from "react-router-dom";
import AILogo from "@/components/layout/AILogo";
import { Github, Twitter, Linkedin } from "lucide-react";

const COLUMNS = [
  { title: "Product", links: ["Features", "How it works", "Dashboard", "Pricing"] },
  { title: "Company", links: ["About", "Blog", "Careers", "Press"] },
  { title: "Resources", links: ["Resume templates", "ATS guide", "Changelog", "Support"] },
  { title: "Legal", links: ["Privacy", "Terms", "Cookies", "Security"] },
];

export function Footer() {
  return (
    <footer className="px-3 sm:px-6 mt-28 sm:mt-18 pb-12" style={{ maxWidth: 1240, marginLeft: "auto", marginRight: "auto" }}>
      <div className="rounded-[28px] bg-[var(--surface)] border border-[var(--border)] shadow-card p-8 sm:p-12">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 sm:gap-10">
          <div className="col-span-2">
            <Link to="/" className="flex items-center gap-2.5">
              <AILogo />
              <span className="font-display text-[16px] font-semibold text-[var(--ink)]">Resume Roaster</span>
            </Link>
            <p className="text-[13px] text-[var(--ink-muted)] mt-4 max-w-xs leading-relaxed">
              AI-powered ATS scoring and resume rewrites — built for engineers who'd rather ship than polish.
            </p>
            <div className="flex items-center gap-2 mt-5">
              {[Github, Twitter, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="h-8 w-8 rounded-full bg-[var(--surface-2)] hover:bg-[var(--accent-soft)] text-[var(--ink-muted)] hover:text-[var(--accent-strong)] flex items-center justify-center">
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <div className="text-[11px] uppercase tracking-[0.12em] text-[var(--ink)] font-semibold mb-4">{col.title}</div>
              <ul className="space-y-2.5">
                {col.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="text-[13px] text-[var(--ink-muted)] hover:text-[var(--ink)]">{l}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 pt-6 border-t border-[var(--border)] flex flex-col sm:flex-row items-center justify-between gap-3 text-[12px] text-[var(--ink-muted)]">
          <div>© 2026 Resume Roaster. All rights reserved.</div>
          <div className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--success)]" />
            All systems operational
          </div>
        </div>
      </div>
    </footer>
  );
}