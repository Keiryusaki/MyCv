# Kei CV — Project Guide

Web-CV pribadi untuk **Eka Dian Purnama** (UI/UX Engineer). Next.js static site,
bilingual (ID/EN), dengan export PDF. Di-deploy ke GitHub Pages.

## TL;DR buat ngubah konten
**Semua isi CV ada di satu file: [`src/config/cv.ts`](src/config/cv.ts).**
Edit di situ — semua halaman & PDF otomatis ikut update. Jarang perlu nyentuh file lain
buat sekadar ganti teks/data.

## Stack
- **Next.js 15** (App Router, `output: "export"` → static HTML di `out/`)
- **React 19** + **Tailwind CSS 3**
- **@react-pdf/renderer** — generate PDF di browser (bukan `window.print`)
- **lucide-react** / **react-icons** — ikon

## Commands
```bash
npm run dev     # dev server
npm run build   # build + static export ke out/ (juga ngecek TypeScript)
```
Selalu `npm run build` sebelum commit — itu yang ngecek type & mastiin export jalan.

## Struktur
```
src/
├─ config/cv.ts          ← SUMBER KONTEN TUNGGAL (profile, skills, experience, dll)
├─ i18n/index.tsx        ← teks UI + helper bahasa (type L, useT, pick)
├─ app/(landing)/cv/
│   ├─ summary/          ← halaman ringkasan (About, Current Work, skills)
│   ├─ experience/       ← timeline
│   └─ portfolio/        ← galeri + lightbox
└─ components/
    ├─ ExportPanel.tsx   ← modal export PDF (pilih section + live preview)
    └─ CVDocument.tsx    ← layout PDF-nya (react-pdf)
```

## Konvensi penting
- **Bilingual**: field yang dwibahasa pakai tipe `L = { id, en }`. Resolve dengan
  `useT()`/`pick(value, lang)`. Kalau nambah teks baru, isi `id` **dan** `en`.
- **Newline di teks panjang**: `\n\n` = jeda paragraf. Webview butuh class
  `whitespace-pre-line`; PDF (`<Text>` react-pdf) nge-render `\n` otomatis.
- **Current Work seed**: default-nya di `cv.ts` (`currentWork`), tapi bisa di-edit live
  di Export panel & disimpan ke localStorage. **Kalau ngubah seed-nya, bump `WORK_KEY`**
  di [`ExportPanel.tsx`](src/components/ExportPanel.tsx) (mis. `...-v3` → `-v4`) biar
  user lama keambil teks baru, bukan draf lama dari storage.
- **Base path**: di GitHub Actions, basePath = `/<nama-repo>` (lihat
  [`next.config.mjs`](next.config.mjs)). Aset publik harus dibungkus
  `withBasePath()` dari [`src/lib/basePath.ts`](src/lib/basePath.ts), jangan hardcode `/`.
- **Glass / glassmorphism**: efek `.glass` (backdrop-filter) **mati** kalau ada
  ancestor yang dapet `transform`, `filter`, `opacity`, `will-change`, atau `contain`.
  Jangan taruh properti itu di ancestor kartu glass.

## Deploy
Push ke `main` → workflow [`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml)
build & publish `out/` ke GitHub Pages.

## Aset
Foto publik diserve dari `public/` (mis. `public/pp.jpg`). Path di `cv.ts` dibungkus
`withBasePath()`.
