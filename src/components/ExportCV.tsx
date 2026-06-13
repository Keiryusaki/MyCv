"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { FileDown } from "lucide-react";
import { ui, useT } from "@/i18n";

// react-pdf is browser-only and heavy — load the panel on demand, never on SSR.
const ExportPanel = dynamic(() => import("./ExportPanel").then((m) => m.ExportPanel), { ssr: false });

export function ExportCV() {
  const { t } = useT();
  const [open, setOpen] = useState(false);

  // Deep-link: /cv/summary?export=1 opens the export panel directly.
  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("export") === "1") setOpen(true);
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="no-print group inline-flex items-center gap-2 rounded-xl border border-primary/40 bg-primary/10 px-5 py-3 text-sm font-semibold text-primary backdrop-blur-md transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-primary/60 hover:shadow-glow active:translate-y-0"
      >
        <FileDown size={17} className="transition-transform group-hover:scale-110" />
        {t(ui.exportPdf)}
      </button>

      {open && <ExportPanel onClose={() => setOpen(false)} />}
    </>
  );
}
