"use client";

import { useState } from "react";
import { ArrowRight, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const NAV_LINKS = [
  { label: "Projects", href: "#Projects" },
  { label: "Prompt Registry", href: "#registry" },
  { label: "A/B Analytics", href: "#ab-engine", live: true },
  { label: "Docs", href: "#features" },
  { label: "Pricing", href: "#pricing" },
];

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-50 w-full backdrop-blur-md border-b"
      style={{
        background: "rgba(14,14,17,0.85)",
        borderColor: "rgba(76,70,63,0.3)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
        {/* Brand */}
        <a href="#" className="flex items-center gap-2 group">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200"
            style={{
              background: "var(--surface-high)",
              border: "1px solid rgba(152,143,135,0.3)",
            }}
          >
            <Terminal size={16} style={{ color: "var(--primary-color)" }} />
          </div>
          <div className="flex items-center gap-1.5">
            <span
              className="font-semibold tracking-tight text-sm"
              style={{
                fontFamily: "var(--font-space-grotesk)",
                color: "var(--primary-color)",
              }}
            >
              PromptPulse
            </span>
            <Badge
              variant="secondary"
              className="px-1.5 py-0.5 text-[9px] uppercase tracking-wider"
            >
              ops
            </Badge>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav
          className="hidden md:flex items-center gap-6"
          style={{ color: "var(--on-surface-variant)", fontSize: "13px" }}
        >
          {NAV_LINKS.map(({ label, href, live }) => (
            <a
              key={label}
              href={href}
              className="flex items-center gap-1 transition-colors duration-150 hover:text-[color:var(--primary-color)]"
            >
              {label}
              {live && (
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              )}
            </a>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            className="hidden sm:inline-flex text-sm"
            onClick={() => scrollTo("auth-section")}
          >
            Sign In
          </Button>
          <Button
            variant="brand"
            size="sm"
            onClick={() => scrollTo("auth-section")}
          >
            Get Started Free
            <ArrowRight size={14} />
          </Button>

          {/* Mobile hamburger */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            <div className="flex flex-col gap-1">
              <span className="w-4 h-0.5 rounded bg-[var(--on-surface)]" />
              <span className="w-4 h-0.5 rounded bg-[var(--on-surface)]" />
              <span className="w-4 h-0.5 rounded bg-[var(--on-surface)]" />
            </div>
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          className="md:hidden border-t px-6 py-4 flex flex-col gap-3"
          style={{
            background: "var(--surface-lowest)",
            borderColor: "var(--outline-variant)",
          }}
        >
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              onClick={() => setMenuOpen(false)}
              className="text-sm py-1 transition-colors hover:text-[color:var(--primary-color)]"
              style={{ color: "var(--on-surface-variant)" }}
            >
              {label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
