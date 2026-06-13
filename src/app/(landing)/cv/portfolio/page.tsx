"use client";

import { Section, SectionHeader } from "@/components/Section";
import { PortfolioGrid } from "@/components/PortfolioGrid";
import { ui, useT } from "@/i18n";

export default function PortfolioPage() {
  const { t } = useT();
  const title = t(ui.portfolioTitle).split(" ");

  return (
    <Section decor="c">
      <SectionHeader
        eyebrow={t(ui.selectedWork)}
        title={
          <>
            {title[0]} <span className="accent-text">{title.slice(1).join(" ")}</span>
          </>
        }
        subtitle={t(ui.portfolioSub)}
      />
      <div className="mt-4">
        <PortfolioGrid />
      </div>
    </Section>
  );
}
