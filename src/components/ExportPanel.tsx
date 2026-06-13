"use client";

import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import { Download, X } from "lucide-react";
import {
  achievements,
  currentWork as currentWorkSeed,
  education,
  experience,
  hobbies,
  profile,
  skills,
  type SkillLevel,
} from "@/config/cv";
import { ui, useT, type L } from "@/i18n";
import { CVDocument, type CVDocData } from "./CVDocument";

const levelLabels: Record<SkillLevel, L> = {
  Expert: ui.levelExpert,
  Advanced: ui.levelAdvanced,
  Proficient: ui.levelProficient,
};

type SectionKey =
  | "photo"
  | "contact"
  | "summary"
  | "currentWork"
  | "experience"
  | "education"
  | "skills"
  | "achievements"
  | "hobbies";

const SHOW_KEY = "cv-export-show";
// Bump the suffix whenever the default seed in cv.ts changes so returning
// users who never edited the text pick up the new default instead of a stale one.
const WORK_KEY = "cv-export-currentwork-v2";

const defaultShow: Record<SectionKey, boolean> = {
  photo: true,
  contact: true,
  summary: true,
  currentWork: true,
  experience: true,
  education: true,
  skills: true,
  achievements: true,
  hobbies: true,
};

export function ExportPanel({ onClose }: { onClose: () => void }) {
  const { t, lang } = useT();

  const [show, setShow] = useState<Record<SectionKey, boolean>>(defaultShow);
  const [workText, setWorkText] = useState<string>(t(currentWorkSeed));
  const [workDebounced, setWorkDebounced] = useState<string>(workText);

  // Restore saved preferences once on mount.
  useEffect(() => {
    try {
      const savedShow = window.localStorage.getItem(SHOW_KEY);
      if (savedShow) setShow({ ...defaultShow, ...JSON.parse(savedShow) });
      const savedWork = window.localStorage.getItem(WORK_KEY);
      if (savedWork !== null) {
        setWorkText(savedWork);
        setWorkDebounced(savedWork);
      }
    } catch {
      /* ignore corrupt storage */
    }
  }, []);

  // Debounce the free-text so the PDF doesn't re-render every keystroke.
  // (Persistence happens on actual edits, not here — so the cv.ts seed isn't
  // auto-saved on mount and stays in sync until the user deliberately changes it.)
  useEffect(() => {
    const id = setTimeout(() => setWorkDebounced(workText), 400);
    return () => clearTimeout(id);
  }, [workText]);

  const onWorkChange = (value: string) => {
    setWorkText(value);
    window.localStorage.setItem(WORK_KEY, value);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  const toggle = (key: SectionKey) =>
    setShow((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      window.localStorage.setItem(SHOW_KEY, JSON.stringify(next));
      return next;
    });

  // Build resolved PDF data. Rebuilds when language, toggles, or debounced text change.
  const data: CVDocData = useMemo(
    () => ({
      name: profile.name,
      role: t(profile.role),
      tagline: t(profile.tagline),
      photo: `${window.location.origin}${profile.photo}`,
      contact: {
        email: profile.email,
        location: profile.location,
        instagram: profile.instagram.replace(/^https?:\/\/(www\.)?instagram\.com\//, "@").replace(/\/$/, ""),
        phone: profile.phone || undefined,
      },
      education: education.map((e) => ({ school: e.school, detail: t(e.detail), period: t(e.period) })),
      skills: skills.map((sk) => ({ name: sk.name, level: t(levelLabels[sk.level]) })),
      experience: experience.map((e) => ({ role: t(e.role), org: e.org, period: t(e.period), body: t(e.body) })),
      achievements: achievements.map((a) => t(a)),
      hobbies: hobbies.map((h) => t(h)),
      currentWork: workDebounced,
      labels: {
        contact: t(ui.contact),
        education: t(ui.education),
        skills: t(ui.skillsLabel),
        experience: t(ui.navExperience),
        achievements: t(ui.achievementsLabel),
        hobbies: t(ui.hobbiesLabel),
        currentWork: t(ui.secCurrentWork),
      },
      show,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [lang, show, workDebounced],
  );

  const fileName = `CV-${profile.name.replace(/\s+/g, "-")}.pdf`;

  const sections: { key: SectionKey; label: string }[] = [
    { key: "photo", label: t(ui.secPhoto) },
    { key: "contact", label: t(ui.contact) },
    { key: "summary", label: t(ui.navSummary) },
    { key: "currentWork", label: t(ui.secCurrentWork) },
    { key: "experience", label: t(ui.navExperience) },
    { key: "education", label: t(ui.education) },
    { key: "skills", label: t(ui.skillsLabel) },
    { key: "achievements", label: t(ui.achievementsLabel) },
    { key: "hobbies", label: t(ui.hobbiesLabel) },
  ];

  // Portal to <body> so the fixed overlay escapes the profile card, whose
  // backdrop-filter / transform would otherwise become its containing block.
  return createPortal(
    <div
      className="no-print fixed inset-0 z-[70] grid place-items-center bg-app/85 p-3 backdrop-blur-md animate-fade-up sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={t(ui.exportTitle)}
      onClick={onClose}
    >
      <div
        className="glass glass-sheen relative flex h-[92vh] w-full max-w-5xl flex-col overflow-hidden p-0"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-line/10 px-5 py-3">
          <h3 className="text-base font-bold text-ink">{t(ui.exportTitle)}</h3>
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="grid h-8 w-8 place-items-center rounded-lg text-ink-muted transition-colors hover:text-primary"
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex min-h-0 flex-1 flex-col md:flex-row">
          {/* ===== Controls ===== */}
          <div className="flex w-full flex-col gap-4 overflow-y-auto border-b border-line/10 p-5 md:w-72 md:border-b-0 md:border-r">
            <div>
              <p className="eyebrow mb-2">{t(ui.exportInclude)}</p>
              <div className="flex flex-col gap-1.5">
                {sections.map(({ key, label }) => (
                  <label
                    key={key}
                    className="flex cursor-pointer items-center gap-2.5 rounded-lg px-2 py-1.5 text-sm text-ink transition-colors hover:bg-white/5"
                  >
                    <input
                      type="checkbox"
                      checked={show[key]}
                      onChange={() => toggle(key)}
                      className="h-4 w-4 accent-cyan-400"
                    />
                    {label}
                  </label>
                ))}
              </div>
            </div>

            {/* Current work free text */}
            <div className={show.currentWork ? "" : "opacity-50"}>
              <label className="eyebrow mb-1.5 block" htmlFor="cw">
                {t(ui.secCurrentWork)}
              </label>
              <textarea
                id="cw"
                value={workText}
                disabled={!show.currentWork}
                onChange={(e) => onWorkChange(e.target.value)}
                placeholder={t(ui.currentWorkPlaceholder)}
                rows={5}
                className="w-full resize-none rounded-lg border border-line/15 bg-white/5 p-2.5 text-sm text-ink outline-none transition-colors placeholder:text-ink-muted/60 focus:border-primary/50 disabled:cursor-not-allowed"
              />
            </div>

            <PDFDownloadLink
              document={<CVDocument data={data} />}
              fileName={fileName}
              className="mt-auto inline-flex items-center justify-center gap-2 rounded-xl bg-primary/15 px-4 py-3 text-sm font-semibold text-primary ring-1 ring-primary/40 transition-transform duration-200 hover:-translate-y-0.5"
            >
              {({ loading }) => (
                <>
                  <Download size={16} />
                  {loading ? t(ui.preparingPdf) : t(ui.downloadPdf)}
                </>
              )}
            </PDFDownloadLink>
          </div>

          {/* ===== Live preview ===== */}
          <div className="flex min-h-0 flex-1 flex-col bg-black/30">
            <span className="px-4 py-1.5 text-center text-[0.7rem] uppercase tracking-wider text-ink-muted">
              {t(ui.livePreview)}
            </span>
            <div className="min-h-0 flex-1">
              <PDFViewer showToolbar style={{ width: "100%", height: "100%", border: "none" }}>
                <CVDocument data={data} />
              </PDFViewer>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
