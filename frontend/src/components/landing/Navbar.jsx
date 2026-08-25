import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ArrowRight } from "lucide-react";
import AILogo from "@/components/layout/AILogo";

const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Dashboard", href: "#dashboard-preview" },
  { label: "Pricing", href: "#pricing" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 8);
    }

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className="fixed top-3 left-0 right-0 z-50 px-3 sm:px-6">
      <div
        className={`max-w-[1240px] mx-auto rounded-full border transition-colors duration-200 ${
          scrolled
            ? "bg-[var(--surface)]/90 border-[var(--border)] shadow-card backdrop-blur"
            : "bg-[var(--surface)]/95 border-transparent"
        }`}
      >
        <div className="flex items-center justify-between gap-4 px-3 sm:px-4 py-2">

          <Link to="/" className="flex items-center gap-2.5 p-1">
            <AILogo />

            <span className="font-display text-[15px] font-semibold text-[var(--ink)] hidden sm:inline">
              Resume Roaster
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-3.5 py-1.5 rounded-full text-[13px] font-medium text-[var(--ink-muted)] hover:text-[var(--ink)] hover:bg-[var(--surface-2)]"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">

            <Link
              to="/login"
              className="hidden sm:inline-flex h-9 px-4 rounded-full text-[13px] font-medium text-[var(--ink)] hover:bg-[var(--surface-2)] items-center"
            >
              Sign in
            </Link>

            <Link
              to="/register"
              className="inline-flex items-center gap-1.5 h-9 pl-4 pr-3.5 rounded-full bg-[var(--ink)] text-[var(--bg)] text-[13px] font-semibold hover:opacity-90"
            >
              Get Started
              <ArrowRight size={13} />
            </Link>

            <button
              onClick={() => setMenuOpen((open) => !open)}
              className="md:hidden h-9 w-9 rounded-full flex items-center justify-center text-[var(--ink)] hover:bg-[var(--surface-2)]"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={16} /> : <Menu size={16} />}
            </button>

          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden border-t border-[var(--border)] px-3 py-3 space-y-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="block px-3 py-2 rounded-xl text-sm font-medium text-[var(--ink)] hover:bg-[var(--surface-2)]"
              >
                {link.label}
              </a>
            ))}

            <Link
              to="/login"
              className="block px-3 py-2 rounded-xl text-sm font-medium text-[var(--ink)] hover:bg-[var(--surface-2)]"
            >
              Sign in
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}