"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Briefcase,
  Camera,
  ExternalLink,
  Heart,
  Instagram,
  Mail,
  MapPin,
  Sparkles,
} from "lucide-react";
import { Section, SectionHeader } from "@/components/Section";
import { GlassCard } from "@/components/GlassCard";
import { ExportCV } from "@/components/ExportCV";
import { HeroCanvas } from "@/components/HeroCanvas";
import { ImageLightbox } from "@/components/ImageLightbox";
import { PhotoCarousel } from "@/components/PhotoCarousel";
import { SkillIcon } from "@/components/SkillIcon";
import {
  bio,
  currentWork,
  currentWorkLink,
  highlights,
  hobbies,
  profile,
  skills,
  type SkillCategory,
} from "@/config/cv";
import { ui, useT } from "@/i18n";

const levelStyles: Record<string, string> = {
  Expert: "bg-primary/15 text-primary ring-primary/40",
  Advanced: "bg-accent/15 text-accent ring-accent/40",
  Proficient: "bg-success/15 text-success ring-success/40",
};

const levelLabels = {
  Expert: ui.levelExpert,
  Advanced: ui.levelAdvanced,
  Proficient: ui.levelProficient,
};

const categoryLabels: Record<SkillCategory, { id: string; en: string }> = {
  design: { id: "Desain & Visual", en: "Design & Visual" },
  frontend: { id: "Frontend & Web", en: "Frontend & Web" },
};

const skillCategories: SkillCategory[] = ["design", "frontend"];

export default function SummaryPage() {
  const { t } = useT();

  return (
    <>
      {/* ===== Hero: Executive Summary — content floats over animated particle
           canvas (no container card); only the small elements are glass. ===== */}
      <HeroCanvas className="border-b border-line/10">
        {/* No `animate-fade-up` here: its lingering transform would become a
            backdrop root and stop the glass cards from frosting the canvas. */}
        <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
              <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-3xl ring-1 ring-primary/30 shadow-glow">
                <Image src={profile.photo} alt={profile.name} fill sizes="112px" className="object-cover" priority />
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="eyebrow flex items-center gap-1.5">
                  <Sparkles size={13} className="text-primary" />
                  {t(ui.summaryEyebrow)}
                </span>
                <h1 className="text-4xl font-bold tracking-tight text-ink sm:text-5xl">{profile.name}</h1>
                <p className="text-lg font-medium text-primary">{t(profile.role)}</p>
                <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-ink-muted">
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin size={14} /> {profile.location}
                  </span>
                  <a
                    href={`mailto:${profile.email}`}
                    className="inline-flex items-center gap-1.5 transition-colors hover:text-primary"
                  >
                    <Mail size={14} /> {profile.email}
                  </a>
                </div>
              </div>
            </div>
            <ExportCV />
          </div>

          <p className="mt-6 max-w-3xl text-base leading-relaxed text-ink-muted">{t(profile.tagline)}</p>

          {/* Mitreka ID credential (glass) — opens the card in a lightbox */}
          <ImageLightbox
            src={profile.idCard}
            alt={t(ui.mitrekaId)}
            caption={t(ui.mitrekaId)}
            className="glass glass-sheen mt-6 inline-flex items-center gap-3 p-2 pr-4 text-left transition-colors hover:border-primary/40"
          >
            <span className="relative h-10 w-16 overflow-hidden rounded-md ring-1 ring-line/15">
              <Image src={profile.idCard} alt={t(ui.mitrekaId)} fill sizes="64px" className="object-cover" />
            </span>
            <span className="flex flex-col">
              <span className="inline-flex items-center gap-1 text-sm font-medium text-ink">
                <BadgeCheck size={14} className="text-success" /> {t(ui.mitrekaId)}
              </span>
              <span className="text-xs text-ink-muted">Mitreka Solusi Indonesia</span>
            </span>
          </ImageLightbox>

          {/* Highlight stats (glass) */}
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {highlights.map((h) => (
              <div key={h.label.en} className="glass glass-sheen card-rich px-4 py-3 text-center">
                <div className="font-mono text-2xl font-bold text-ink">{h.value}</div>
                <div className="text-xs text-ink-muted">{t(h.label)}</div>
              </div>
            ))}
          </div>
        </div>
      </HeroCanvas>

      {/* ===== Body sections ===== */}
      <Section decor="b">
        {/* Current work */}
        <div>
          <SectionHeader eyebrow={t(ui.currentWorkEyebrow)} title={t(ui.secCurrentWork)} />
          <GlassCard className="p-6">
            <div className="flex items-start gap-4">
              <span className="icon-chip shrink-0">
                <Briefcase size={20} />
              </span>
              <div className="flex flex-col gap-4">
                <p className="text-sm leading-relaxed text-ink-muted sm:text-base">{t(currentWork)}</p>
                <a
                  href={currentWorkLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-fit items-center gap-2 rounded-xl bg-primary/15 px-4 py-2.5 text-sm font-semibold text-primary ring-1 ring-primary/40 transition-transform duration-200 hover:-translate-y-0.5"
                >
                  <ExternalLink size={15} />
                  {t(ui.viewDesignSystem)}
                  <ArrowUpRight size={15} />
                </a>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Skill matrix */}
        <div className="mt-14 border-t border-line/10 pt-14">
          <SectionHeader eyebrow={t(ui.capabilities)} title={t(ui.skillMatrix)} subtitle={t(ui.skillMatrixSub)} />
          {skillCategories.map((category) => (
            <div key={category} className="mb-6 last:mb-0">
              <h3 className="eyebrow mb-3">{t(categoryLabels[category])}</h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {skills
                  .filter((sk) => sk.category === category)
                  .map((sk) => (
                    <GlassCard key={sk.name} className="flex items-center gap-4 p-5">
                      <span className="brand-tile grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white/5 ring-1 ring-line/10">
                        <SkillIcon icon={sk.icon} />
                      </span>
                      <div className="flex min-w-0 flex-1 flex-col gap-1">
                        <div className="flex items-center justify-between gap-2">
                          <h4 className="truncate font-semibold text-ink">{sk.name}</h4>
                          <span
                            className={`shrink-0 rounded-full px-2.5 py-0.5 text-[0.7rem] font-semibold uppercase tracking-wide ring-1 ${levelStyles[sk.level]}`}
                          >
                            {t(levelLabels[sk.level])}
                          </span>
                        </div>
                        <p className="truncate text-sm text-ink-muted">{t(sk.note)}</p>
                      </div>
                    </GlassCard>
                  ))}
              </div>
            </div>
          ))}
        </div>

        {/* About me (bio + hobbies + photography) */}
        <div className="mt-14 border-t border-line/10 pt-14">
          <SectionHeader eyebrow={t(ui.aboutEyebrow)} title={t(ui.aboutMe)} subtitle={t(ui.aboutSub)} />

          {/* Bio + Hobbies side by side */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <GlassCard className="p-6">
              <p className="text-sm leading-relaxed text-ink-muted sm:text-base">{t(bio)}</p>
            </GlassCard>

            <GlassCard className="p-6">
              <h3 className="eyebrow mb-4 flex items-center gap-1.5">
                <Heart size={13} className="text-primary" />
                {t(ui.hobbiesLabel)}
              </h3>
              <ul className="flex flex-col gap-3">
                {hobbies.map((h) => (
                  <li key={h.en} className="flex items-start gap-3 text-sm text-ink-muted">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    {t(h)}
                  </li>
                ))}
              </ul>
            </GlassCard>
          </div>

          {/* Photography — full-width carousel + lightbox */}
          <GlassCard className="mt-4 p-6">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <h3 className="eyebrow flex items-center gap-1.5">
                <Camera size={13} className="text-accent" />
                {t(ui.photography)}
              </h3>
              <a
                href={profile.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-accent/15 px-4 py-2 text-sm font-semibold text-accent ring-1 ring-accent/40 transition-transform duration-200 hover:-translate-y-0.5"
              >
                <Instagram size={16} />
                {t(ui.viewInstagram)}
                <ArrowRight size={15} />
              </a>
            </div>
            <PhotoCarousel />
            <p className="mt-3 text-sm text-ink-muted">{t(ui.photographyBlurb)}</p>
          </GlassCard>
        </div>

        {/* Cross-links */}
        <div className="mt-14 flex flex-wrap gap-3 border-t border-line/10 pt-12">
          <Link
            href="/cv/experience"
            className="inline-flex items-center gap-2 rounded-xl border border-line/15 px-4 py-2.5 text-sm font-medium text-ink-muted transition-colors hover:border-primary/40 hover:text-primary"
          >
            {t(ui.seeTimeline)} <ArrowRight size={15} />
          </Link>
          <Link
            href="/cv/portfolio"
            className="inline-flex items-center gap-2 rounded-xl border border-line/15 px-4 py-2.5 text-sm font-medium text-ink-muted transition-colors hover:border-primary/40 hover:text-primary"
          >
            {t(ui.browsePortfolio)} <ArrowRight size={15} />
          </Link>
        </div>
      </Section>
    </>
  );
}
