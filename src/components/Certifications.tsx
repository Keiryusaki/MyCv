"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { Award, ChevronLeft, ChevronRight, ExternalLink, Maximize2, X } from "lucide-react";
import { certifications } from "@/config/cv";
import { ui, useT } from "@/i18n";

type Cert = (typeof certifications)[number];

export function Certifications() {
  const { t } = useT();
  // Lightbox navigates only the certs that actually have an image.
  const gallery = certifications.filter((c) => c.image);
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
      else if (e.key === "ArrowRight") setActive((i) => (i === null ? i : (i + 1) % gallery.length));
      else if (e.key === "ArrowLeft") setActive((i) => (i === null ? i : (i - 1 + gallery.length) % gallery.length));
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [active, gallery.length]);

  const openCert = (cert: Cert) => {
    if (cert.image) {
      setActive(gallery.indexOf(cert));
    } else if (cert.url) {
      window.open(cert.url, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {certifications.map((c, i) => {
          const interactive = Boolean(c.image || c.url);
          return (
            <div
              key={`${c.date.en}-${i}`}
              className="glass glass-sheen card-rich flex flex-col overflow-hidden p-0"
            >
              {/* Thumbnail */}
              <button
                type="button"
                onClick={() => openCert(c)}
                disabled={!interactive}
                aria-label={c.image ? `${t(ui.viewCertificate)}: ${t(c.title)}` : t(c.title)}
                className="group relative aspect-[4/3] w-full overflow-hidden disabled:cursor-default"
              >
                {c.image ? (
                  <>
                    <Image src={c.image} alt={t(c.title)} fill sizes="(max-width: 1024px) 100vw, 360px" className="object-cover object-top" />
                    <span className="absolute inset-0 grid place-items-center bg-app/40 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100">
                      <span className="inline-flex items-center gap-2 rounded-xl bg-primary/20 px-4 py-2 text-sm font-semibold text-primary ring-1 ring-primary/40">
                        <Maximize2 size={15} /> {t(ui.viewCertificate)}
                      </span>
                    </span>
                  </>
                ) : (
                  <span
                    className="grid h-full w-full place-items-center"
                    style={{
                      backgroundImage: `linear-gradient(140deg, rgb(var(--color-primary) / 0.18), rgb(var(--color-accent) / 0.12))`,
                    }}
                  >
                    <Award size={30} className="text-primary/70" />
                  </span>
                )}
              </button>

              {/* Body */}
              <div className="flex flex-1 flex-col gap-1 p-5">
                <h3 className="text-base font-semibold text-ink">{t(c.title)}</h3>
                <p className="text-sm text-ink-muted">{c.issuer}</p>
                <div className="mt-2 flex items-center justify-between">
                  <span className="font-mono text-xs text-primary">{t(c.date)}</span>
                  {c.url && (
                    <a
                      href={c.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-ink-muted transition-colors hover:text-primary"
                    >
                      <ExternalLink size={13} /> {t(ui.verifyCredential)}
                    </a>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ===== Full-screen lightbox ===== */}
      {active !== null &&
        createPortal(
          <div
            className="fixed inset-0 z-[70] grid place-items-center bg-app/90 p-4 backdrop-blur-md animate-fade-in"
            role="dialog"
            aria-modal="true"
            aria-label={t(gallery[active]!.title)}
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

            {gallery.length > 1 && (
              <>
                <button
                  type="button"
                  aria-label="Previous"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActive((i) => (i === null ? i : (i - 1 + gallery.length) % gallery.length));
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
                    setActive((i) => (i === null ? i : (i + 1) % gallery.length));
                  }}
                  className="absolute right-3 grid h-11 w-11 place-items-center rounded-full bg-app/60 text-ink ring-1 ring-line/15 transition-colors hover:text-primary sm:right-6"
                >
                  <ChevronRight size={22} />
                </button>
              </>
            )}

            <figure
              className="flex max-h-[88vh] w-full max-w-4xl flex-col items-center gap-3"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Plain img + natural sizing so portrait docs (A4 surat tugas) fill
                  the height and stay readable, while landscape certs stay wide. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={gallery[active]!.image as string}
                alt={t(gallery[active]!.title)}
                className="max-h-[80vh] w-auto max-w-full rounded-2xl object-contain ring-1 ring-line/15"
              />
              <figcaption className="flex items-center gap-3 text-sm text-ink-muted">
                <span className="text-ink">{t(gallery[active]!.title)}</span>
                <span className="font-mono text-xs">{t(gallery[active]!.date)}</span>
                {gallery.length > 1 && (
                  <span className="font-mono text-xs">
                    {active + 1} / {gallery.length}
                  </span>
                )}
              </figcaption>
            </figure>
          </div>,
          document.body,
        )}
    </>
  );
}
