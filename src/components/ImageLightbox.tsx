"use client";

import { useEffect, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

/**
 * Wraps any trigger content in a button that opens a full-screen lightbox of a
 * single image (Esc / click-outside to close). Use for one-off images that
 * aren't part of a carousel — e.g. the Mitreka ID credential on the summary.
 */
export function ImageLightbox({
  src,
  alt,
  caption,
  children,
  className = "",
}: {
  src: string;
  alt: string;
  caption?: string;
  children: ReactNode;
  className?: string;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={className}>
        {children}
      </button>

      {open &&
        createPortal(
          <div
            className="fixed inset-0 z-[70] grid place-items-center bg-app/90 p-4 backdrop-blur-md animate-fade-in"
            role="dialog"
            aria-modal="true"
            aria-label={alt}
            onClick={() => setOpen(false)}
          >
            <button
              type="button"
              aria-label="Close"
              onClick={() => setOpen(false)}
              className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-lg bg-app/60 text-ink ring-1 ring-line/15 transition-colors hover:text-primary"
            >
              <X size={20} />
            </button>

            <figure
              className="flex max-h-[88vh] w-full max-w-3xl flex-col items-center gap-3"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Plain img: the source aspect ratio is unknown, so let it size
                  naturally (object-contain) rather than forcing a fixed box. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={alt}
                className="max-h-[82vh] w-auto max-w-full rounded-2xl object-contain ring-1 ring-line/15"
              />
              {caption && <figcaption className="text-sm text-ink-muted">{caption}</figcaption>}
            </figure>
          </div>,
          document.body,
        )}
    </>
  );
}
