"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ImageOff, Maximize2, X } from "lucide-react";
import { photos } from "@/config/cv";
import { useT } from "@/i18n";

/** Gradient stand-in for a photo that has no real `src` yet. */
function Placeholder({ hue, className = "" }: { hue: number; className?: string }) {
  return (
    <div
      className={`grid place-items-center ${className}`}
      style={{
        backgroundImage: `linear-gradient(140deg, hsl(${hue} 70% 45% / 0.55), hsl(${hue + 40} 70% 28% / 0.6))`,
      }}
    >
      <ImageOff size={20} className="text-white/40" />
    </div>
  );
}

export function PhotoCarousel() {
  const { t } = useT();
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);

  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const [page, setPage] = useState(0);
  const [pages, setPages] = useState(1);

  // Recompute arrow/dot state from scroll metrics. One "page" = the visible
  // width (4 thumbnails on desktop), so arrows/dots paginate per view.
  const sync = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const { scrollLeft, clientWidth, scrollWidth } = el;
    setAtStart(scrollLeft <= 1);
    setAtEnd(scrollLeft + clientWidth >= scrollWidth - 1);
    setPages(Math.max(1, Math.round(scrollWidth / clientWidth)));
    setPage(Math.round(scrollLeft / clientWidth));
  }, []);

  useEffect(() => {
    sync();
    const el = trackRef.current;
    if (!el) return;
    const ro = new ResizeObserver(sync);
    ro.observe(el);
    return () => ro.disconnect();
  }, [sync]);

  const scrollByPage = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth, behavior: "smooth" });
  };

  const scrollToPage = (i: number) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollTo({ left: i * el.clientWidth, behavior: "smooth" });
  };

  // Lightbox: Esc to close, arrows to navigate, lock body scroll.
  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
      else if (e.key === "ArrowRight") setActive((i) => (i === null ? i : (i + 1) % photos.length));
      else if (e.key === "ArrowLeft") setActive((i) => (i === null ? i : (i - 1 + photos.length) % photos.length));
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [active]);

  const go = (dir: 1 | -1) =>
    setActive((i) => (i === null ? i : (i + dir + photos.length) % photos.length));

  return (
    <div className="relative">
      {/* Track */}
      <div
        ref={trackRef}
        onScroll={sync}
        className="flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {photos.map((p, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setActive(i)}
            aria-label={`Open ${p.caption ? t(p.caption) : `photo ${i + 1}`}`}
            className="group relative aspect-[4/3] w-[78%] shrink-0 snap-start overflow-hidden rounded-xl ring-1 ring-line/10 transition-transform duration-200 hover:-translate-y-0.5 sm:w-[calc((100%-0.75rem)/2)] lg:w-[calc((100%-2.25rem)/4)]"
          >
            {p.src ? (
              <Image src={p.src} alt={p.caption ? t(p.caption) : ""} fill sizes="(max-width: 640px) 78vw, (max-width: 1024px) 50vw, 25vw" className="object-cover" />
            ) : (
              <Placeholder hue={p.hue} className="h-full w-full" />
            )}
            <span className="absolute inset-0 grid place-items-center bg-app/40 opacity-0 backdrop-blur-[2px] transition-opacity duration-200 group-hover:opacity-100">
              <Maximize2 size={18} className="text-white" />
            </span>
          </button>
        ))}
      </div>

      {/* Arrows — hidden at the track edges (and entirely when nothing to scroll). */}
      {pages > 1 && (
        <>
          <button
            type="button"
            aria-label="Previous"
            onClick={() => scrollByPage(-1)}
            disabled={atStart}
            className="absolute -left-3 top-[calc(50%-0.5rem)] grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full border border-line/15 bg-app/70 text-ink backdrop-blur-md transition-colors hover:text-primary disabled:pointer-events-none disabled:opacity-0"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            aria-label="Next"
            onClick={() => scrollByPage(1)}
            disabled={atEnd}
            className="absolute -right-3 top-[calc(50%-0.5rem)] grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full border border-line/15 bg-app/70 text-ink backdrop-blur-md transition-colors hover:text-primary disabled:pointer-events-none disabled:opacity-0"
          >
            <ChevronRight size={18} />
          </button>
        </>
      )}

      {/* Dots — one per page (per view of 4). */}
      {pages > 1 && (
        <div className="mt-3 flex items-center justify-center gap-1.5">
          {Array.from({ length: pages }).map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to page ${i + 1}`}
              aria-current={i === page}
              onClick={() => scrollToPage(i)}
              className={`h-1.5 rounded-full transition-all duration-200 ${
                i === page ? "w-5 bg-primary" : "w-1.5 bg-white/40 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      )}

      {/* ===== Lightbox ===== */}
      {active !== null &&
        createPortal(
          <div
            className="no-print fixed inset-0 z-[70] grid place-items-center bg-app/85 p-4 backdrop-blur-md animate-fade-up"
            role="dialog"
            aria-modal="true"
            onClick={() => setActive(null)}
          >
            <button
              type="button"
              aria-label="Close"
              onClick={() => setActive(null)}
              className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-lg bg-app/60 text-ink ring-1 ring-line/15 transition-colors hover:text-primary"
            >
              <X size={20} />
            </button>

            <button
              type="button"
              aria-label="Previous"
              onClick={(e) => {
                e.stopPropagation();
                go(-1);
              }}
              className="absolute left-3 grid h-11 w-11 place-items-center rounded-full bg-app/60 text-ink ring-1 ring-line/15 transition-colors hover:text-primary sm:left-6"
            >
              <ChevronLeft size={22} />
            </button>
            <button
              type="button"
              aria-label="Next"
              onClick={(e) => {
                e.stopPropagation();
                go(1);
              }}
              className="absolute right-3 grid h-11 w-11 place-items-center rounded-full bg-app/60 text-ink ring-1 ring-line/15 transition-colors hover:text-primary sm:right-6"
            >
              <ChevronRight size={22} />
            </button>

            <figure
              className="flex max-h-[85vh] w-full max-w-3xl flex-col items-center gap-3"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl ring-1 ring-line/15">
                {photos[active]!.src ? (
                  <Image
                    src={photos[active]!.src as string}
                    alt={photos[active]!.caption ? t(photos[active]!.caption!) : ""}
                    fill
                    sizes="(max-width: 768px) 100vw, 768px"
                    className="object-contain"
                  />
                ) : (
                  <Placeholder hue={photos[active]!.hue} className="h-full w-full" />
                )}
              </div>
              <figcaption className="flex items-center gap-3 text-sm text-ink-muted">
                {photos[active]!.caption ? <span className="text-ink">{t(photos[active]!.caption!)}</span> : null}
                <span className="font-mono text-xs">
                  {active + 1} / {photos.length}
                </span>
              </figcaption>
            </figure>
          </div>,
          document.body,
        )}
    </div>
  );
}
