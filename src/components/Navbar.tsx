"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FileUser, GitBranch, Languages, LayoutGrid, Menu, X } from "lucide-react";
import { ui, useLang } from "@/i18n";

const links = [
  { href: "/cv/summary", label: ui.navSummary, icon: FileUser },
  { href: "/cv/experience", label: ui.navExperience, icon: GitBranch },
  { href: "/cv/portfolio", label: ui.navPortfolio, icon: LayoutGrid },
];

function LangToggle({ className = "" }: { className?: string }) {
  const { lang, toggle } = useLang();
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle language"
      className={`inline-flex items-center gap-1.5 rounded-lg border border-line/15 px-2.5 py-1.5 text-xs font-semibold text-ink-muted transition-colors hover:border-primary/40 hover:text-primary ${className}`}
    >
      <Languages size={14} />
      <span className="font-mono uppercase">{lang}</span>
    </button>
  );
}

export function Navbar() {
  const pathname = usePathname() ?? "/";
  const { lang } = useLang();
  const [open, setOpen] = useState(false);

  // Close the mobile menu whenever the route changes.
  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="no-print sticky top-0 z-50 border-b border-line/10 bg-app/20 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3 sm:px-8">
        <Link href="/cv/summary" className="flex items-center gap-2 font-mono text-sm font-bold tracking-tight">
          <span className="grid h-7 w-7 place-items-center rounded-lg bg-primary/15 text-primary shadow-glow">
            CV
          </span>
          <span className="text-ink">
            curriculum<span className="accent-text">.vitae</span>
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-2 sm:flex">
          <ul className="flex items-center gap-1">
            {links.map(({ href, label, icon: Icon }) => {
              const active = pathname.startsWith(href);
              return (
                <li key={href}>
                  <Link
                    href={href}
                    className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                      active ? "bg-primary/10 text-primary shadow-glow" : "text-ink-muted hover:text-ink"
                    }`}
                  >
                    <Icon size={15} />
                    {label[lang]}
                  </Link>
                </li>
              );
            })}
          </ul>
          <LangToggle />
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-2 sm:hidden">
          <LangToggle />
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="grid h-9 w-9 place-items-center rounded-lg border border-line/15 text-ink"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      {open && (
        <div className="border-b border-line/10 bg-app/90 backdrop-blur-md sm:hidden">
          <ul className="mx-auto flex max-w-6xl flex-col gap-1 px-5 py-3">
            {links.map(({ href, label, icon: Icon }) => {
              const active = pathname.startsWith(href);
              return (
                <li key={href}>
                  <Link
                    href={href}
                    className={`flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium ${
                      active ? "bg-primary/10 text-primary" : "text-ink-muted"
                    }`}
                  >
                    <Icon size={16} />
                    {label[lang]}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </header>
  );
}
