"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "id" | "en";

/** A localized string: one value per supported language. */
export type L = { id: string; en: string };

/** Resolve a localized string for the active language. */
export function pick(value: L, lang: Lang): string {
  return value[lang];
}

const STORAGE_KEY = "cv-lang";

type Ctx = { lang: Lang; setLang: (l: Lang) => void; toggle: () => void };
const LanguageContext = createContext<Ctx | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Default to English for SSR; hydrate the stored choice after mount so the
  // first client render matches the server (no hydration mismatch).
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY) as Lang | null;
    if (stored === "id" || stored === "en") setLangState(stored);
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    window.localStorage.setItem(STORAGE_KEY, l);
  };
  const toggle = () => setLang(lang === "id" ? "en" : "id");

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggle }}>{children}</LanguageContext.Provider>
  );
}

export function useLang(): Ctx {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used within a LanguageProvider");
  return ctx;
}

/** Convenience hook: returns the active lang plus a `t(localizedString)` picker. */
export function useT() {
  const { lang } = useLang();
  return { lang, t: (value: L) => value[lang] };
}

/** ─── UI string dictionary (chrome, labels, buttons) ─────────────────── */
export const ui = {
  navSummary: { id: "Ringkasan", en: "Summary" },
  navExperience: { id: "Pengalaman", en: "Experience" },
  navPortfolio: { id: "Portofolio", en: "Portfolio" },

  // Summary page
  summaryEyebrow: { id: "Ringkasan Eksekutif", en: "Executive Summary" },
  capabilities: { id: "Kompetensi", en: "Capabilities" },
  skillMatrix: { id: "Matriks Keahlian", en: "Skill Matrix" },
  skillMatrixSub: {
    id: "Kompetensi inti dinilai berdasarkan kedalaman — badge bersih, bukan progress bar.",
    en: "Core competencies graded by depth — clean badges over noisy progress bars.",
  },
  exportPdf: { id: "Ekspor PDF", en: "Export PDF" },
  exportTitle: { id: "Export CV", en: "Export CV" },
  exportInclude: { id: "Pilih bagian yang ditampilkan", en: "Choose what to include" },
  secPhoto: { id: "Foto", en: "Photo" },
  secCurrentWork: { id: "Pekerjaan Saat Ini", en: "Current Work" },
  currentWorkPlaceholder: {
    id: "Tulis pekerjaan/proyek yang sedang kamu kerjakan…",
    en: "Describe the work/project you're currently doing…",
  },
  downloadPdf: { id: "Download PDF", en: "Download PDF" },
  preparingPdf: { id: "Menyiapkan…", en: "Preparing…" },
  livePreview: { id: "Pratinjau langsung", en: "Live preview" },
  printTipsTitle: { id: "Sebelum cetak / simpan PDF", en: "Before you print / save as PDF" },
  printTipsIntro: {
    id: "Biar hasilnya rapi sesuai desain, atur dialog cetak seperti ini:",
    en: "For the designed look, set the print dialog like this:",
  },
  printTip1: { id: 'Destination: pilih "Save as PDF"', en: 'Destination: choose "Save as PDF"' },
  printTip2: { id: 'Margins: pilih "None" atau "Default"', en: 'Margins: set to "None" or "Default"' },
  printTip3: {
    id: 'Centang "Background graphics" — wajib, biar sidebar navy ikut tercetak',
    en: 'Tick "Background graphics" — required so the navy sidebar prints',
  },
  printContinue: { id: "Lanjut Cetak", en: "Continue to Print" },
  printCancel: { id: "Batal", en: "Cancel" },
  printDontShow: { id: "Jangan tampilkan lagi", en: "Don't show this again" },
  beyondScreen: { id: "Di luar layar", en: "Beyond the screen" },
  aboutMe: { id: "Tentang Saya", en: "About Me" },
  aboutEyebrow: { id: "Perkenalan", en: "Get to know me" },
  aboutSub: {
    id: "Sedikit cerita di balik pekerjaan — dan apa yang saya nikmati di waktu luang.",
    en: "A bit about who I am — and what I enjoy outside of work.",
  },
  currentWorkEyebrow: { id: "Sedang dikerjakan", en: "What I'm working on" },
  viewDesignSystem: { id: "Lihat Design System", en: "View Design System" },
  photography: { id: "Fotografi", en: "Visual Photography" },
  photographySub: {
    id: "Fotografi produk & jalanan — pilihan bingkai.",
    en: "Product & street photography — selected frames.",
  },
  photographyBlurb: {
    id: "Arsip foto yang terus bertambah dengan color grading dan dokumentasi di balik layar.",
    en: "A growing archive of color-graded shots and behind-the-scenes work.",
  },
  viewInstagram: { id: "Lihat di Instagram", en: "View on Instagram" },
  seeTimeline: { id: "Lihat timeline pengalaman", en: "See experience timeline" },
  browsePortfolio: { id: "Jelajahi portofolio", en: "Browse portfolio" },
  mitrekaId: { id: "ID Karyawan Mitreka", en: "Mitreka Employee ID" },

  // Experience page
  careerPath: { id: "Jejak karier", en: "Career path" },
  experienceTimeline: { id: "Timeline Pengalaman", en: "Experience Timeline" },
  experienceSub: {
    id: "Perjalanan vertikal antar peran — node menyala saat di-scroll dan melebar saat di-hover.",
    en: "A vertical journey through roles — nodes light up as you scroll, and expand on hover.",
  },
  background: { id: "Latar belakang", en: "Background" },
  education: { id: "Pendidikan", en: "Education" },
  educationSub: { id: "Pendidikan formal, terbaru di atas.", en: "Formal education, most recent first." },
  credentials: { id: "Kredensial", en: "Credentials" },
  certifications: { id: "Sertifikat & Surat Tugas", en: "Certificates & Letters" },
  certificationsSub: {
    id: "Sertifikat dan surat tugas resmi — klik untuk melihat.",
    en: "Certificates and official assignment letters — click to view.",
  },
  viewCertificate: { id: "Lihat dokumen", en: "View document" },
  verifyCredential: { id: "Verifikasi", en: "Verify" },

  // Portfolio page
  selectedWork: { id: "Karya pilihan", en: "Selected work" },
  portfolioTitle: { id: "Portofolio Interaktif", en: "Interactive Portfolio" },
  portfolioSub: {
    id: "Ketuk kartu untuk memperbesar mockup di lightbox dan menuju project live.",
    en: "Tap any card to zoom the mockup in a lightbox and jump to the live project.",
  },
  zoomIn: { id: "Perbesar", en: "Zoom in" },
  viewLive: { id: "Lihat Project Live", en: "View Live Project" },

  // PDF resume section labels
  contact: { id: "Kontak", en: "Contact" },
  skillsLabel: { id: "Keahlian", en: "Skills" },
  achievementsLabel: { id: "Prestasi", en: "Achievements" },
  hobbiesLabel: { id: "Hobi", en: "Hobbies" },

  // Skill levels
  levelExpert: { id: "Ahli", en: "Expert" },
  levelAdvanced: { id: "Mahir", en: "Advanced" },
  levelProficient: { id: "Cakap", en: "Proficient" },

  // Footer
  footerNote: {
    id: "Dibuat dengan sistem desain Cyber-Enterprise Glassmorphism.",
    en: "Built with the Cyber-Enterprise Glassmorphism system.",
  },
  designedByPrefix: { id: "Dirancang & dibangun oleh", en: "Designed & built by" },
  builtWith: { id: "Dibuat dengan", en: "Built with" },
} satisfies Record<string, L>;
