"use client";

import { ui, useT } from "@/i18n";

export function SiteFooter() {
  const { t } = useT();
  return (
    <footer className="no-print border-t border-line/10 px-5 py-6 sm:px-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 text-xs text-ink-muted sm:flex-row">
        <span>
          &copy; 2026 · {t(ui.designedByPrefix)}{" "}
          <span className="accent-text font-semibold">Eka D. Purnama</span>
        </span>
        <span>
          {t(ui.builtWith)} <span className="font-mono">Next.js · Tailwind · lucide-react</span>
        </span>
      </div>
    </footer>
  );
}
