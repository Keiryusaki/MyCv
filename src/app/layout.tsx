import type { Metadata } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const sans = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });

// Favicon: the navbar "CV" badge rebuilt as an inline SVG (cyan-400 on navy).
// Embedded as a base64 data URI so it isn't affected by the GitHub Pages basePath
// (a /favicon.ico would 404 under the /<repo>/ subpath).
const faviconDataUri =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIgdmlld0JveD0iMCAwIDMyIDMyIj48cmVjdCB4PSIxLjUiIHk9IjEuNSIgd2lkdGg9IjI5IiBoZWlnaHQ9IjI5IiByeD0iOCIgZmlsbD0iIzBhMjgzNSIgc3Ryb2tlPSIjMjJkM2VlIiBzdHJva2Utb3BhY2l0eT0iMC41NSIgc3Ryb2tlLXdpZHRoPSIxLjUiLz48dGV4dCB4PSIxNiIgeT0iMTciIGZvbnQtZmFtaWx5PSInSmV0QnJhaW5zIE1vbm8nLCdTRk1vbm8tUmVndWxhcicsdWktbW9ub3NwYWNlLE1lbmxvLG1vbm9zcGFjZSIgZm9udC1zaXplPSIxMyIgZm9udC13ZWlnaHQ9IjcwMCIgbGV0dGVyLXNwYWNpbmc9IjAuNSIgZmlsbD0iIzIyZDNlZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZG9taW5hbnQtYmFzZWxpbmU9ImNlbnRyYWwiPkNWPC90ZXh0Pjwvc3ZnPgo=";

export const metadata: Metadata = {
  title: "Curriculum Vitae — Cyber-Enterprise CV",
  description:
    "A modern, responsive web CV built with the Cyber-Enterprise Glassmorphism design system: executive summary, animated timeline, and an interactive portfolio.",
  icons: { icon: { url: faviconDataUri, type: "image/svg+xml" } },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`dark ${sans.variable} ${mono.variable}`}>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
