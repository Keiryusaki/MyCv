import type { ReactNode } from "react";
import { Navbar } from "@/components/Navbar";
import { Ornament } from "@/components/Ornament";
import { SiteFooter } from "@/components/SiteFooter";
import { LanguageProvider } from "@/i18n";

/** Shared marketing/CV shell: ornament backdrop, sticky navbar, footer.
 *  PDF export is generated on demand by the Export panel (react-pdf). */
export default function LandingLayout({ children }: { children: ReactNode }) {
  return (
    <LanguageProvider>
      <Ornament />
      <Navbar />
      <main className="min-h-screen">{children}</main>
      <SiteFooter />
    </LanguageProvider>
  );
}
