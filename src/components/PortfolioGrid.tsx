"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { ArrowUpRight, ExternalLink, Maximize2, X } from "lucide-react";
import { projects } from "@/config/cv";
import { ProjectGallery } from "@/components/ProjectGallery";
import { ui, useT } from "@/i18n";

type Project = (typeof projects)[number];

/**
 * Card header surface. Shows the project's cover (images[0]) when present;
 * otherwise falls back to a hued gradient panel standing in for one.
 */
function Mockup({ project, className = "" }: { project: Project; className?: string }) {
  const cover = project.images?.[0];
  if (cover) {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={cover}
          alt={project.title}
          className="h-full w-full object-cover object-top"
          loading="lazy"
        />
      </div>
    );
  }

  return (
    <div
      className={`relative grid place-items-center overflow-hidden ${className}`}
      style={{
        backgroundImage: `linear-gradient(140deg, hsl(${project.hue} 75% 50% / 0.55), hsl(${project.hue + 45} 70% 30% / 0.55))`,
      }}
    >
      {/* Faux browser chrome */}
      <div className="absolute left-3 top-3 flex gap-1.5">
        <span className="h-2 w-2 rounded-full bg-white/40" />
        <span className="h-2 w-2 rounded-full bg-white/40" />
        <span className="h-2 w-2 rounded-full bg-white/40" />
      </div>
      <span className="font-mono text-lg font-bold text-white/85">{project.title}</span>
    </div>
  );
}

export function PortfolioGrid() {
  const { t } = useT();
  const [active, setActive] = useState<Project | null>(null);

  // Close on Escape + lock body scroll while the lightbox is open.
  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setActive(null);
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [active]);

  return (
    <>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => (
          <button
            key={p.title}
            type="button"
            onClick={() => setActive(p)}
            className="glass glass-sheen card-rich group flex flex-col overflow-hidden p-0 text-left"
          >
            <div className="relative">
              <Mockup project={p} className="aspect-[16/10] w-full" />
              <span className="absolute inset-0 grid place-items-center bg-app/40 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
                <span className="inline-flex items-center gap-2 rounded-xl bg-primary/20 px-4 py-2 text-sm font-semibold text-primary ring-1 ring-primary/40">
                  <Maximize2 size={15} /> {t(ui.zoomIn)}
                </span>
              </span>
            </div>
            <div className="flex flex-1 flex-col gap-2 p-5">
              <span className="eyebrow">{t(p.category)}</span>
              <h3 className="text-lg font-semibold text-ink">{p.title}</h3>
              <p className="flex-1 text-sm text-ink-muted line-clamp-3">{t(p.blurb)}</p>
              <div className="mt-1 flex flex-wrap gap-1.5">
                {p.stack.map((t) => (
                  <span
                    key={t}
                    className="rounded-md bg-white/5 px-2 py-0.5 text-[0.7rem] font-medium text-ink-muted ring-1 ring-line/10"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* ===== Lightbox — portaled to <body> so the fixed overlay escapes the
           section's transformed ancestor (animate-fade-up) and covers the viewport. ===== */}
      {active &&
        createPortal(
          <div
            className="fixed inset-0 z-[70] grid place-items-center bg-app/80 p-4 backdrop-blur-md animate-fade-in"
            role="dialog"
            aria-modal="true"
            aria-label={`${active.title} preview`}
            onClick={() => setActive(null)}
          >
          <div
            className="glass glass-sheen relative flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden p-0"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              aria-label="Close"
              onClick={() => setActive(null)}
              className="absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-lg bg-app/60 text-ink ring-1 ring-line/15 transition-colors hover:text-primary"
            >
              <X size={18} />
            </button>
            <ProjectGallery
              images={active.images ?? []}
              title={active.title}
              hue={active.hue}
              className="shrink-0"
            />
            <div className="flex flex-col gap-3 overflow-y-auto p-6">
              <div className="flex flex-col gap-1">
                <span className="eyebrow">{t(active.category)}</span>
                <h3 className="text-2xl font-bold text-ink">{active.title}</h3>
              </div>
              <p className="text-sm leading-relaxed text-ink-muted">{t(active.blurb)}</p>
              <div className="flex flex-wrap gap-1.5">
                {active.stack.map((t) => (
                  <span
                    key={t}
                    className="rounded-md bg-white/5 px-2 py-0.5 text-[0.7rem] font-medium text-ink-muted ring-1 ring-line/10"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <a
                href={active.live}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-flex w-fit items-center gap-2 rounded-xl bg-primary/15 px-4 py-2.5 text-sm font-semibold text-primary ring-1 ring-primary/40 transition-transform duration-200 hover:-translate-y-0.5"
              >
                <ExternalLink size={15} />
                {t(ui.viewLive)}
                <ArrowUpRight size={15} />
              </a>
            </div>
          </div>
          </div>,
          document.body,
        )}
    </>
  );
}
