import type { ReactNode } from "react";
import { Shards, type ShardVariant } from "./Shards";

export function Section({
  id,
  children,
  className = "",
  decor = false,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  /** Render a decorative shard layer behind the content so glass cards frost it.
   *  Pass a variant ("a" | "b" | "c") so each section looks different. */
  decor?: boolean | ShardVariant;
}) {
  // Centered content column. The decor variant moves these to an INNER wrapper
  // so the outer <section> can be full-width and the shards bleed edge-to-edge
  // (instead of being clipped to the content column).
  const container = "mx-auto w-full max-w-6xl px-5 py-12 sm:px-8 sm:py-16";
  const style = id ? { scrollMarginTop: "5rem" } : undefined;

  if (!decor) {
    return (
      <section id={id} className={`${container} ${className}`} style={style}>
        {children}
      </section>
    );
  }

  const variant: ShardVariant = decor === true ? "a" : decor;
  // CRITICAL for the glass frost — mirrors HeroCanvas's proven layout:
  //   1. wrap = `isolate` → it becomes the backdrop-filter "backdrop root".
  //   2. <Shards> sits behind (its own `-z-10`) inside that isolated root.
  //   3. content = `relative` with NO z-index.
  // DO NOT put an entrance animation (animate-fade-in/up), transform, opacity<1,
  // filter, or will-change on THIS section or any ancestor of it. Verified via
  // headless screenshots: Chromium promotes an animated element (even opacity-only
  // fade-in, fill-mode `both`) to a composited backdrop-root layer that kills the
  // cards' frost — this is THE recurring "frost disappeared" regression. Animate a
  // glass-free element instead (e.g. a heading). The timeline node dots already
  // supply entrance motion without touching a glass ancestor.
  return (
    <section id={id} className={`relative isolate overflow-hidden ${className}`} style={style}>
      <Shards variant={variant} />
      <div className={`relative ${container}`}>{children}</div>
    </section>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  center = false,
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: string;
  center?: boolean;
}) {
  return (
    <div className={`mb-8 flex flex-col gap-2 ${center ? "items-center text-center" : ""}`}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">{title}</h2>
      {subtitle && <p className="max-w-2xl text-sm text-ink-muted sm:text-base">{subtitle}</p>}
    </div>
  );
}
