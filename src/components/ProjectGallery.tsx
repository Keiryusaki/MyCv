"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";

/** Generated gradient mockup — fallback when a project has no real images. */
function GradientMockup({ title, hue, className = "" }: { title: string; hue: number; className?: string }) {
  return (
    <div
      className={`relative grid place-items-center overflow-hidden ${className}`}
      style={{
        backgroundImage: `linear-gradient(140deg, hsl(${hue} 75% 50% / 0.55), hsl(${hue + 45} 70% 30% / 0.55))`,
      }}
    >
      <div className="absolute left-3 top-3 flex gap-1.5">
        <span className="h-2 w-2 rounded-full bg-white/40" />
        <span className="h-2 w-2 rounded-full bg-white/40" />
        <span className="h-2 w-2 rounded-full bg-white/40" />
      </div>
      <span className="font-mono text-lg font-bold text-white/85">{title}</span>
    </div>
  );
}

/**
 * Project image area for the portfolio modal.
 *   0 images → gradient mockup fallback
 *   1 image  → single image (click → lightbox)
 *   >1       → carousel, one image per slide (arrows + dots), click → lightbox
 * The lightbox is a full-screen portal (mirrors the summary photo lightbox).
 */
export function ProjectGallery({
  images,
  title,
  hue,
  className = "",
}: {
  images: string[];
  title: string;
  hue: number;
  className?: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const count = images.length;
  const isCarousel = count > 1;

  // Keep the dot/counter in sync with manual swipe/scroll.
  const onScroll = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setIndex(Math.round(el.scrollLeft / el.clientWidth));
  }, []);

  const goTo = useCallback((i: number) => {
    const el = trackRef.current;
    if (!el) return;
    const clamped = Math.max(0, Math.min(i, count - 1));
    el.scrollTo({ left: clamped * el.clientWidth, behavior: "smooth" });
    setIndex(clamped);
  }, [count]);

  // Lightbox: Esc to close, arrows to navigate, lock body scroll. Listen in the
  // CAPTURE phase + stopPropagation so Esc closes THIS lightbox first without also
  // bubbling to the parent modal's window-level Esc handler (which would close both).
  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        setLightbox(null);
      } else if (e.key === "ArrowRight") {
        e.stopPropagation();
        setLightbox((i) => (i === null ? i : (i + 1) % count));
      } else if (e.key === "ArrowLeft") {
        e.stopPropagation();
        setLightbox((i) => (i === null ? i : (i - 1 + count) % count));
      }
    };
    window.addEventListener("keydown", onKey, true);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey, true);
      document.body.style.overflow = prev;
    };
  }, [lightbox, count]);

  if (count === 0) {
    return <GradientMockup title={title} hue={hue} className={`aspect-[16/9] w-full ${className}`} />;
  }

  return (
    <div className={`relative ${className}`}>
      {/* Slides — scroll-snap, one image per view. */}
      <div
        ref={trackRef}
        onScroll={onScroll}
        className="flex aspect-[16/9] w-full snap-x snap-mandatory overflow-x-auto scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {images.map((src, i) => (
          <button
            key={src}
            type="button"
            onClick={() => setLightbox(i)}
            aria-label={`Open image ${i + 1} of ${count}`}
            className="group relative h-full w-full shrink-0 snap-start overflow-hidden"
          >
            <Image src={src} alt={`${title} — ${i + 1}`} fill sizes="(max-width: 768px) 100vw, 768px" className="object-cover object-top" />
            <span className="absolute inset-0 grid place-items-center bg-app/30 opacity-0 backdrop-blur-[2px] transition-opacity duration-200 group-hover:opacity-100">
              <span className="inline-flex items-center gap-2 rounded-lg bg-app/60 px-3 py-1.5 text-xs font-medium text-ink ring-1 ring-line/15">
                <Maximize2 size={14} /> Preview
              </span>
            </span>
          </button>
        ))}
      </div>

      {isCarousel && (
        <>
          {/* Arrows */}
          <button
            type="button"
            aria-label="Previous image"
            onClick={() => goTo(index - 1)}
            disabled={index === 0}
            className="absolute left-3 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full border border-line/15 bg-app/70 text-ink backdrop-blur-md transition-colors hover:text-primary disabled:opacity-0"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            aria-label="Next image"
            onClick={() => goTo(index + 1)}
            disabled={index === count - 1}
            className="absolute right-3 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full border border-line/15 bg-app/70 text-ink backdrop-blur-md transition-colors hover:text-primary disabled:opacity-0"
          >
            <ChevronRight size={18} />
          </button>

          {/* Dots */}
          <div className="absolute inset-x-0 bottom-3 flex items-center justify-center gap-1.5">
            {images.map((src, i) => (
              <button
                key={src}
                type="button"
                aria-label={`Go to image ${i + 1}`}
                aria-current={i === index}
                onClick={() => goTo(i)}
                className={`h-1.5 rounded-full transition-all duration-200 ${
                  i === index ? "w-5 bg-primary" : "w-1.5 bg-white/40 hover:bg-white/70"
                }`}
              />
            ))}
          </div>
        </>
      )}

      {/* ===== Full-screen lightbox (portaled, above the modal) ===== */}
      {lightbox !== null &&
        createPortal(
          <div
            className="fixed inset-0 z-[80] grid place-items-center bg-app/90 p-4 backdrop-blur-md animate-fade-in"
            role="dialog"
            aria-modal="true"
            aria-label={`${title} image ${lightbox + 1} of ${count}`}
            onClick={() => setLightbox(null)}
          >
            <button
              type="button"
              aria-label="Close"
              onClick={() => setLightbox(null)}
              className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-lg bg-app/60 text-ink ring-1 ring-line/15 transition-colors hover:text-primary"
            >
              <X size={20} />
            </button>

            {isCarousel && (
              <>
                <button
                  type="button"
                  aria-label="Previous"
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightbox((i) => (i === null ? i : (i - 1 + count) % count));
                  }}
                  className="absolute left-3 z-10 grid h-11 w-11 place-items-center rounded-full bg-app/60 text-ink ring-1 ring-line/15 transition-colors hover:text-primary sm:left-6"
                >
                  <ChevronLeft size={22} />
                </button>
                <button
                  type="button"
                  aria-label="Next"
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightbox((i) => (i === null ? i : (i + 1) % count));
                  }}
                  className="absolute right-3 z-10 grid h-11 w-11 place-items-center rounded-full bg-app/60 text-ink ring-1 ring-line/15 transition-colors hover:text-primary sm:right-6"
                >
                  <ChevronRight size={22} />
                </button>
              </>
            )}

            <figure
              className="flex max-h-[85vh] w-full max-w-4xl flex-col items-center gap-3"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl ring-1 ring-line/15">
                <Image
                  src={images[lightbox]!}
                  alt={`${title} — ${lightbox + 1}`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 1024px"
                  className="object-contain"
                />
              </div>
              {isCarousel && (
                <figcaption className="font-mono text-xs text-ink-muted">
                  {lightbox + 1} / {count}
                </figcaption>
              )}
            </figure>
          </div>,
          document.body,
        )}
    </div>
  );
}
