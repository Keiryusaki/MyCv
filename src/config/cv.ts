/**
 * Single source of truth for CV content.
 * Localized fields use { id, en }; resolve them with `pick(value, lang)` or the
 * `useT()` hook. Edit any value here and every page updates automatically.
 */
import type { L } from "@/i18n";
import { withBasePath } from "@/lib/basePath";

export const profile = {
  name: "Eka Dian Purnama",
  role: { id: "UI/UX Engineer", en: "UI/UX Engineer" } as L,
  location: "Cimanggis, Depok, Indonesia",
  email: "ekaeaa@gmail.com",
  /** Optional — leave "" to hide the phone row on the PDF. */
  phone: "",
  tagline: {
    id: "UI/UX Engineer yang merancang antarmuka rapi hingga ke detail — memadukan keahlian desain klasik (Illustrator, Photoshop, Figma) dengan frontend berbantuan AI di Vue, React, dan Laravel. Fotografer di waktu luang.",
    en: "UI/UX Engineer crafting pixel-perfect interfaces — pairing classic design craft (Illustrator, Photoshop, Figma) with AI-assisted frontend in Vue, React, and Laravel. Photographer at heart.",
  } as L,
  instagram: "https://instagram.com/kei_photograph",
  liveSite: "",
  /** Public-facing photos (served from /public). */
  photo: withBasePath("/pp.jpg"),
  idCard: withBasePath("/id-card-mitreka.jpg"),
};

/** Longer personal bio for the "About Me" section (webview). */
export const bio: L = {
  id: "Saya seorang UI/UX Engineer sekaligus desainer visual yang senang menjembatani desain dan kode. Berlatar desain grafis dan fotografi, saya terbiasa menerjemahkan kebutuhan brand menjadi antarmuka yang rapi — lalu mewujudkannya langsung ke front-end. Belakangan, saya banyak mengeksplorasi alur kerja desain dan pengembangan yang dibantu AI.",
  en: "I'm a UI/UX Engineer and visual designer who enjoys bridging design and code. With a background in graphic design and photography, I translate brand needs into polished interfaces — then build them straight into the front-end. Lately, I've been exploring AI-assisted design and development workflows.",
};

/** Link to the design system referenced in Current Work. */
export const currentWorkLink = "https://keiryusaki.github.io/MitrekaStyleMockup/";

/**
 * "Pekerjaan saat ini" — free text shown on the PDF (optional section).
 * This is the default seed; it can also be edited live in the Export panel.
 */
export const currentWork: L = {
  id: "Sebagai UI/UX Engineer di Mitreka Solusi Indonesia, saya menangani kebutuhan desain internal maupun klien — mulai dari cover laporan, ID card, kartu nama, spanduk, dan flyer kegiatan, hingga konten gambar dan video. Untuk kebutuhan klien, saya merancang mockup aplikasi web dan kerap langsung mewujudkannya menjadi halaman front-end siap pakai (HTML, Laravel, Vue, atau React), sehingga developer tinggal mengintegrasikannya dengan backend. Terbaru, saya membangun design system, komponen, dan panduannya untuk developer — dikerjakan dengan bantuan AI dan mengikuti framework yang ditetapkan klien dalam KAK (Kerangka Acuan Kerja). Contohnya, design system internal Mitreka di keiryusaki.github.io/MitrekaStyleMockup.",
  en: "As a UI/UX Engineer at Mitreka Solusi Indonesia, I handle both internal and client-facing design work — from report covers, ID cards, business cards, banners, and event flyers to image and video content. For client projects I design web-app mockups and often build them directly into ready-to-use front-end pages (HTML, Laravel, Vue, or React), so developers only need to wire them to the backend. Most recently I built a design system, its components, and developer guidelines — AI-assisted and following the framework defined in the client's terms of reference (KAK). For example, Mitreka's internal design system at keiryusaki.github.io/MitrekaStyleMockup.",
};

export type SkillLevel = "Expert" | "Advanced" | "Proficient";
/** Icon key — mapped to a brand logo / monogram in components/SkillIcon.tsx. */
export type SkillIconKey =
  | "illustrator"
  | "photoshop"
  | "figma"
  | "aiprompt"
  | "lightroom"
  | "premiere"
  | "canva"
  | "affinity"
  | "tailwind"
  | "bootstrap"
  | "vue"
  | "react"
  | "laravel";

export type SkillCategory = "design" | "frontend";

/**
 * NOTE: levels below are my best estimate — adjust them to match how you'd
 * actually rate yourself (Expert / Advanced / Proficient).
 */
export const skills: {
  name: string;
  level: SkillLevel;
  note: L;
  category: SkillCategory;
  icon: SkillIconKey;
}[] = [
  // ── Design & Visual ───────────────────────────────────────────────
  { name: "Adobe Illustrator", level: "Expert", icon: "illustrator", category: "design", note: { id: "Vektor, branding, ilustrasi", en: "Vector, branding, illustration" } },
  { name: "Adobe Photoshop", level: "Expert", icon: "photoshop", category: "design", note: { id: "Retouching, compositing, aset web", en: "Retouching, compositing, web assets" } },
  { name: "Figma", level: "Expert", icon: "figma", category: "design", note: { id: "UI design, prototyping, design system", en: "UI design, prototyping, design system" } },
  { name: "AI Prompting for Design", level: "Expert", icon: "aiprompt", category: "design", note: { id: "Generate komponen & desain via AI agent", en: "Generate components & designs via AI agent" } },
  { name: "Adobe Lightroom", level: "Advanced", icon: "lightroom", category: "design", note: { id: "Color grading & editing foto", en: "Color grading & photo editing" } },
  { name: "Adobe Premiere Pro", level: "Advanced", icon: "premiere", category: "design", note: { id: "Editing video & motion", en: "Video editing & motion" } },
  { name: "Canva", level: "Advanced", icon: "canva", category: "design", note: { id: "Konten cepat & template", en: "Fast content & templates" } },
  { name: "Affinity", level: "Proficient", icon: "affinity", category: "design", note: { id: "Desain vektor & raster", en: "Vector & raster design" } },
  // ── Frontend & Web ────────────────────────────────────────────────
  { name: "Tailwind CSS", level: "Advanced", icon: "tailwind", category: "frontend", note: { id: "Styling utility-first", en: "Utility-first styling" } },
  { name: "Bootstrap CSS", level: "Advanced", icon: "bootstrap", category: "frontend", note: { id: "Layout responsif cepat", en: "Fast responsive layouts" } },
  { name: "Vue", level: "Advanced", icon: "vue", category: "frontend", note: { id: "Komponen UI (dibantu AI agent)", en: "UI components (AI-assisted)" } },
  { name: "React", level: "Advanced", icon: "react", category: "frontend", note: { id: "Komponen UI (dibantu AI agent)", en: "UI components (AI-assisted)" } },
  { name: "Laravel", level: "Proficient", icon: "laravel", category: "frontend", note: { id: "Backend & integrasi web", en: "Backend & web integration" } },
];

export const highlights: { value: string; label: L }[] = [
  { value: "11+", label: { id: "Tahun sebagai UI/UX", en: "Years as UI/UX" } },
  { value: "15+", label: { id: "Tahun di dunia IT", en: "Years in IT" } },
  { value: "13", label: { id: "Tools & framework", en: "Tools & frameworks" } },
  { value: "3", label: { id: "Posisi profesional", en: "Professional roles" } },
];

export const experience: {
  period: L;
  role: L;
  org: string;
  body: L;
  tags: string[];
}[] = [
  {
    period: { id: "2015 — Sekarang", en: "2015 — Present" },
    role: { id: "UI/UX Engineer", en: "UI/UX Engineer" },
    org: "Mitreka Solusi Indonesia",
    body: {
      id: "Merancang antarmuka dan pengalaman pengguna, lalu mengimplementasikannya ke frontend. Membangun komponen Vue & React serta menyesuaikan desain dengan framework — dipercepat dengan bantuan AI agent.",
      en: "Designing user interfaces and experiences, then implementing them on the frontend. Building Vue & React components and adapting designs to the framework — accelerated with an AI agent.",
    },
    tags: ["UI/UX", "Vue", "React", "Laravel", "AI-assisted"],
  },
  {
    period: { id: "2013 — 2015", en: "2013 — 2015" },
    role: { id: "Instruktur Laboratorium", en: "Laboratory Instructor" },
    org: "Bina Sarana Informatika",
    body: {
      id: "Mengajar praktikum laboratorium: pemrograman C#, Jaringan Komputer, dan Elektro untuk mahasiswa diploma.",
      en: "Taught laboratory practicums: C# programming, Computer Networking, and Electronics for diploma students.",
    },
    tags: ["C#", "Networking", "Electronics"],
  },
  {
    period: { id: "2011 — 2012", en: "2011 — 2012" },
    role: { id: "Asisten Instruktur Laboratorium", en: "Assistant Laboratory Instructor" },
    org: "Bina Sarana Informatika",
    body: {
      id: "Mendampingi praktikum laboratorium: pemrograman C++, Delphi, Jaringan Komputer, dan Elektro.",
      en: "Assisted laboratory practicums: C++, Delphi, Computer Networking, and Electronics.",
    },
    tags: ["C++", "Delphi", "Networking", "Electronics"],
  },
];

export const education: { period: L; school: string; detail: L }[] = [
  {
    period: { id: "2009 — 2012", en: "2009 — 2012" },
    school: "AMIK Bina Sarana Informatika",
    detail: { id: "D3 — Teknik Komputer", en: "Diploma — Computer Engineering" },
  },
  {
    period: { id: "2007 — 2009", en: "2007 — 2009" },
    school: "SMA Negeri 1 Baturetno, Wonogiri",
    detail: { id: "Sekolah Menengah Atas", en: "Senior High School" },
  },
  {
    period: { id: "2004 — 2006", en: "2004 — 2006" },
    school: "SMP Negeri 1 Giritontro, Wonogiri",
    detail: { id: "Sekolah Menengah Pertama", en: "Junior High School" },
  },
  {
    period: { id: "1999 — 2004", en: "1999 — 2004" },
    school: "SD Negeri 2 Giritontro, Wonogiri",
    detail: { id: "Sekolah Dasar", en: "Elementary School" },
  },
];

/**
 * Credentials — certificates AND official letters (e.g. teaching assignment
 * letters / surat tugas) — shown on /cv/experience under Education.
 * Drop each document image in /public/certificates and reference it root-relative.
 *   title: localized label of the document (it's NOT always a certificate).
 *   image: a jpg/png → previewable in a full-screen lightbox.
 *   url:   optional verification / source link — opens in a new tab.
 * A card with no `image` but a `url` opens the link directly.
 */
export const certifications: {
  title: L;
  issuer: string;
  date: L;
  image?: string;
  url?: string;
}[] = [
  {
    title: { id: "Surat Tugas Mengajar", en: "Teaching Assignment Letter" },
    issuer: "AMIK Bina Sarana Informatika",
    date: { id: "Ganjil 2014/2015", en: "Odd Sem. 2014/2015" },
    image: withBasePath("/certificates/4.jpg"),
  },
  {
    title: { id: "Surat Tugas Mengajar", en: "Teaching Assignment Letter" },
    issuer: "AMIK Bina Sarana Informatika",
    date: { id: "Genap 2013/2014", en: "Even Sem. 2013/2014" },
    image: withBasePath("/certificates/3.jpg"),
  },
  {
    title: { id: "Surat Tugas Mengajar", en: "Teaching Assignment Letter" },
    issuer: "AMIK Bina Sarana Informatika",
    date: { id: "Ganjil 2013/2014", en: "Odd Sem. 2013/2014" },
    image: withBasePath("/certificates/2.jpg"),
  },
  {
    title: { id: "Surat Tugas Mengajar", en: "Teaching Assignment Letter" },
    issuer: "AMIK Bina Sarana Informatika",
    date: { id: "Genap 2012/2013", en: "Even Sem. 2012/2013" },
    image: withBasePath("/certificates/1.jpg"),
  },
];

/**
 * Achievements (Prestasi) — shown on the PDF resume only. Grounded in real work;
 * edit/add freely (e.g. competition wins, certifications, formal awards).
 */
export const achievements: L[] = [
  {
    id: "Mockup website yang saya bangun (Laravel + Bootstrap) diadopsi Pusdatin dan kini menjadi situs resmi BPT Komdigi (bpt.komdigi.go.id).",
    en: "A website mockup I built (Laravel + Bootstrap) was adopted by Pusdatin and now serves as the official BPT Komdigi site (bpt.komdigi.go.id).",
  },
  {
    id: "Membangun design system internal Mitreka beserta live documentation — komponennya saya rancang dan kode sendiri (dibantu AI).",
    en: "Built Mitreka's internal design system with live documentation — components designed and coded by me (AI-assisted).",
  },
  {
    id: "Merancang dan merilis company profile CITS Indonesia ke production (citsindonesia.co.id) dalam waktu singkat untuk kebutuhan tender.",
    en: "Designed and shipped the CITS Indonesia company-profile site to production (citsindonesia.co.id) on short notice for a tender.",
  },
  {
    id: "Dipercaya sebagai Dosen / Instruktur Laboratorium di AMIK Bina Sarana Informatika (2013–2015).",
    en: "Served as a Lecturer / Lab Instructor at AMIK Bina Sarana Informatika (2013–2015).",
  },
];

/**
 * Photography thumbnails for the carousel + lightbox.
 * PLACEHOLDER: leave `src` empty to render a colored gradient tile. Drop real
 * images in /public (e.g. /photos/foo.jpg) and set `src: "/photos/foo.jpg"`.
 */
export const photos: { src?: string; hue: number; caption?: L }[] = [
  { src: withBasePath("/photos/jpo.jpg"), hue: 280, caption: { id: "Karya foto #1", en: "Photo #1" } },
  { src: withBasePath("/photos/sunset.webp"), hue: 280, caption: { id: "Karya foto #2", en: "Photo #2" } },
  { src: withBasePath("/photos/prau.jpg"), hue: 280, caption: { id: "Karya foto #3", en: "Photo #3" } },
  { src: withBasePath("/photos/nightjpo.jpg"), hue: 280, caption: { id: "Karya foto #4", en: "Photo #4" } },
  { src: withBasePath("/photos/nabila.jpg"), hue: 280, caption: { id: "Karya foto #5", en: "Photo #5" } },
  { src: withBasePath("/photos/capucinno.jpg"), hue: 280, caption: { id: "Karya foto #6", en: "Photo #6" } },
  { src: withBasePath("/photos/mywife.jpg"), hue: 280, caption: { id: "Karya foto #7", en: "Photo #7" } },
  { src: withBasePath("/photos/ayu.jpg"), hue: 280, caption: { id: "Karya foto #8", en: "Photo #8" } },
];

/** Hobbies (Hobi) — shown on the PDF only. */
export const hobbies: L[] = [
  {
    id: "Fotografi & videografi — memahami teknik dasar pengambilan foto dan video",
    en: "Photography & videography — comfortable with core photo and video techniques",
  },
  {
    id: "Mengembangkan aplikasi berbantuan AI: web (Vue, React, Laravel), desktop (Node, Rust), dan command-line (Python, Node, Go)",
    en: "Building apps (AI-assisted): web (Vue, React, Laravel), desktop (Node, Rust), and command-line (Python, Node, Go)",
  },
  {
    id: "Aplikasi CV online ini saya rancang dan bangun sendiri menggunakan Next.js + Tailwind CSS",
    en: "I designed and built this online CV app myself with Next.js + Tailwind CSS",
  },
];

/**
 * Portfolio is still placeholder — send me your real projects (title, blurb,
 * tech stack, link, and ideally a screenshot) and I'll swap these out.
 */
export const projects: {
  title: string;
  category: L;
  blurb: L;
  stack: string[];
  live: string;
  /** Hue used for the generated mockup gradient (0–360). */
  hue: number;
  /**
   * Real screenshots/photos for this project. Give each project ITS OWN folder
   * under /public/portfolio so files never mix, then list them root-relative:
   *   public/portfolio/<project-folder>/cover.png, 1.png, 2.png …
   *   images: ["/portfolio/<project-folder>/cover.png", "/portfolio/<project-folder>/1.png"]
   * The card header shows images[0]. In the modal: 1 image → single view,
   * >1 → carousel (arrows + dots), click any image → full-screen lightbox.
   * Omit/empty → the generated gradient mockup is shown instead.
   */
  images?: string[];
}[] = [
  {
    title: "Mitreka Design System",
    category: { id: "Design System", en: "Design System" },
    blurb: {
      id: "Design system sekaligus live documentation untuk produk web app Mitreka — panduan tunggal yang memandu developer membangun antarmuka secara konsisten. Seluruh komponen di live docs ini saya rancang dan bangun sendiri dengan bantuan AI.",
      en: "A design system and live documentation for Mitreka's web-app products — a single source of truth that guides developers to build interfaces consistently. Every component in the live docs was designed and built by me, AI-assisted.",
    },
    stack: ["Vue", "Laravel", "Tailwind"],
    live: "https://keiryusaki.github.io/MitrekaStyleMockup/#/",
    hue: 190,
    images: [withBasePath("/portfolio/mitreka-design-system/cover.png"), withBasePath("/portfolio/mitreka-design-system/colors.png"), withBasePath("/portfolio/mitreka-design-system/buttons.png")],
  },
  {
    title: "Web Compro CITS Indonesia",
    category: { id: "Company Profile", en: "Company Profile" },
    blurb: {
      id: "Company profile CITS Indonesia yang dibangun dadakan untuk kebutuhan tender, menggantikan situs lama yang sudah di-takedown. Alih-alih sekadar mockup, saya kerjakan langsung menjadi situs siap produksi dengan Next.js + Tailwind — konsep sepenuhnya saya, dipercepat dengan bantuan AI. Kini sudah mengudara: prototipe di GitHub Pages (keiryusaki.github.io/cits) dan live production di citsindonesia.co.id. Masih murni front-end karena backend belum dikerjakan.",
      en: "A company-profile site for CITS Indonesia, built on short notice for a tender after the previous site was taken down. Rather than a mere mockup, I shipped a production-ready build in Next.js + Tailwind — entirely my concept, accelerated with AI. It's now live: a GitHub Pages prototype (keiryusaki.github.io/cits) plus production at citsindonesia.co.id. Still pure front-end, as the backend isn't built yet.",
    },
    stack: ["Next.js", "Tailwind", "AI-assisted"],
    live: "https://citsindonesia.co.id/",
    hue: 210,
    images: [withBasePath("/portfolio/web-compro-cits/cover.png"), withBasePath("/portfolio/web-compro-cits/about-0.png"), withBasePath("/portfolio/web-compro-cits/about-1.png"), withBasePath("/portfolio/web-compro-cits/layanan-0.png"), withBasePath("/portfolio/web-compro-cits/layanan-1.png"), withBasePath("/portfolio/web-compro-cits/product-0.png"), withBasePath("/portfolio/web-compro-cits/contact-0.png")],
  },
  {
    title: "Naraya Brand Identity",
    category: { id: "Brand Identity", en: "Brand Identity" },
    blurb: {
      id: "Penyempurnaan logo sekaligus penyusunan sistem identitas visual Naraya Teknologi Indonesia — hingga implementasinya sebagai komponen logo live di Naraya Design System. Berangkat dari logo yang diberikan owner untuk saya review, saya merapikan mark, menyusun sistem dua warna (primary & deep blue) dengan arah gradasi, mendefinisikan token warna (HEX/RGB/CMYK), dan membuat rangkaian varian: full-color (light/dark), monokrom, serta app icon/favicon. Varian icon/full/monochrome itu kini hidup sebagai komponen SVG aksesibel (5 ukuran) yang dipakai di produk.",
      en: "Logo refinement and visual identity system for Naraya Teknologi Indonesia — through to its implementation as a live logo component in the Naraya Design System. Starting from a logo the owner shared for my review, I refined the mark, built a two-color system (primary & deep blue) with a defined gradient direction, set the color tokens (HEX/RGB/CMYK), and produced a full variant set: full-color (light/dark), monochrome, and app icon/favicon. The icon/full/mono variants now live as an accessible SVG component (5 sizes) used across the product.",
    },
    stack: ["Illustrator", "SVG", "React"],
    live: "https://ui.naraya.ai/docs/brand/logo",
    hue: 220,
    images: [withBasePath("/portfolio/naraya-brand-identity/cover.jpg"), withBasePath("/portfolio/naraya-brand-identity/logo-full.png"), withBasePath("/portfolio/naraya-brand-identity/logo-full-dblue-white.png"), withBasePath("/portfolio/naraya-brand-identity/logo-full-dblue.png"), withBasePath("/portfolio/naraya-brand-identity/logo-full-dblue-white.png")],
  },
  {
    title: "Photography Set",
    category: { id: "Fotografi", en: "Photography" },
    blurb: { id: "Placeholder — kumpulan karya foto (lihat Instagram).", en: "Placeholder — photography collection (see Instagram)." },
    stack: ["Lightroom", "Photoshop"],
    live: "https://instagram.com/kei_photograph",
    hue: 320,
    images: [withBasePath("/photos/nightjpo.jpg"), withBasePath("/photos/capucinno.jpg")],
  },
  {
    title: "Web BPT Komdigi",
    category: { id: "Situs Pemerintah", en: "Government Website" },
    blurb: {
      id: "Situs resmi BPT Komdigi (Balai Pelatihan Talenta Komunikasi dan Digital, Kementerian Komunikasi dan Digital RI) yang saya bangun langsung di Laravel + Bootstrap — bukan sekadar desain, tapi front-end siap pakai mencakup informasi program pelatihan, publikasi, dan pendaftaran. Rancangan ini diterima Pusdatin dan kini mengudara sebagai situs resmi mereka, dengan kredit 'Designed By Mitreka' masih terpasang di footer.",
      en: "The official site for BPT Komdigi (the Communication & Digital Talent Training Center under Indonesia's Ministry of Communication and Digital), built straight in Laravel + Bootstrap — not just a design but a ready-to-use front-end covering training programs, publications, and registration. Pusdatin adopted the design and it now runs as their official live site, with a 'Designed By Mitreka' credit still in the footer.",
    },
    stack: ["Laravel", "Bootstrap"],
    live: "https://bpt.komdigi.go.id/Home",
    hue: 220,
    images: [withBasePath("/portfolio/web-bpt-komdigi/cover.png"), withBasePath("/portfolio/web-bpt-komdigi/home-1.png")],
  },
  {
    title: "HRIS Mobile App",
    category: { id: "UI Aplikasi Mobile", en: "Mobile App UI" },
    blurb: {
      id: "Mockup aplikasi mobile HRIS — termasuk fitur live attendance (absensi real-time) — yang biasanya saya rancang di Figma, tapi kali ini saya bangun langsung interaktif dengan Vue sebagai bagian dari Mitreka Design System. Bukan gambar statis: alurnya bisa diklik dan dicoba langsung di browser, dipercepat dengan bantuan AI.",
      en: "A mobile HRIS app mockup — including a live-attendance (real-time check-in) flow — that I'd normally design in Figma but this time built directly as an interactive prototype in Vue, as part of the Mitreka Design System. Not static screens: the flow is clickable and testable right in the browser, AI-assisted.",
    },
    stack: ["Vue", "Tailwind"],
    live: "https://keiryusaki.github.io/MitrekaStyleMockup/#/mockup-hris-admin/live-attendance",
    hue: 260,
    images: [withBasePath("/portfolio/hris-mobile/cover.png"), withBasePath("/portfolio/hris-mobile/home-0.png"), withBasePath("/portfolio/hris-mobile/karyawan-0.png"), withBasePath("/portfolio/hris-mobile/req-0.png"), withBasePath("/portfolio/hris-mobile/pengaturan-0.png")],
  },
];
