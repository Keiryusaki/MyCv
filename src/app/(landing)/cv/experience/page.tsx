"use client";

import { Briefcase, GraduationCap } from "lucide-react";
import { Section, SectionHeader } from "@/components/Section";
import { Timeline, type TimelineItem } from "@/components/Timeline";
import { Certifications } from "@/components/Certifications";
import { education, experience } from "@/config/cv";
import { ui, useT } from "@/i18n";

export default function ExperiencePage() {
  const { t } = useT();

  const workItems: TimelineItem[] = experience.map((e) => ({
    period: t(e.period),
    title: t(e.role),
    subtitle: e.org,
    body: t(e.body),
    tags: e.tags,
  }));

  const eduItems: TimelineItem[] = education.map((e) => ({
    period: t(e.period),
    title: e.school,
    subtitle: t(e.detail),
  }));

  return (
    <Section decor="b">
      <SectionHeader
        eyebrow={t(ui.careerPath)}
        title={
          <>
            {t(ui.experienceTimeline).split(" ")[0]}{" "}
            <span className="accent-text">{t(ui.experienceTimeline).split(" ").slice(1).join(" ")}</span>
          </>
        }
        subtitle={t(ui.experienceSub)}
      />
      <div className="mt-4">
        <Timeline items={workItems} icon={<Briefcase size={13} />} />
      </div>

      {/* ===== Education timeline ===== */}
      <div className="mt-14 border-t border-line/10 pt-14">
        <SectionHeader
          eyebrow={t(ui.background)}
          title={<span className="accent-text">{t(ui.education)}</span>}
          subtitle={t(ui.educationSub)}
        />
        <div className="mt-4">
          <Timeline items={eduItems} icon={<GraduationCap size={13} />} />
        </div>
      </div>

      {/* ===== Certifications ===== */}
      <div className="mt-14 border-t border-line/10 pt-14">
        <SectionHeader
          eyebrow={t(ui.credentials)}
          title={<span className="accent-text">{t(ui.certifications)}</span>}
          subtitle={t(ui.certificationsSub)}
        />
        <div className="mt-4">
          <Certifications />
        </div>
      </div>
    </Section>
  );
}
