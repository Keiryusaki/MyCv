"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

export type TimelineItem = {
  period: string;
  title: string;
  subtitle?: string;
  body?: string;
  tags?: string[];
};

function TimelineNode({
  item,
  index,
  icon,
}: {
  item: TimelineItem;
  index: number;
  icon: ReactNode;
}) {
  const ref = useRef<HTMLLIElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        // Light the node as soon as any part enters the viewport; keep it lit
        // once seen. (No negative bottom margin, so items pinned at the very
        // bottom of the page — which can't scroll further up — still activate.)
        if (entry.isIntersecting) {
          setActive(true);
          io.unobserve(entry.target);
        }
      },
      { rootMargin: "0px", threshold: 0.1 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const hasDetail = Boolean(item.body || (item.tags && item.tags.length));

  return (
    <li ref={ref} className="group relative pl-12 sm:pl-16" style={{ transitionDelay: `${index * 60}ms` }}>
      {/* Node dot on the axis */}
      <span
        className={`absolute left-[0.65rem] top-1.5 z-10 grid h-7 w-7 -translate-x-1/2 place-items-center rounded-full border transition-all duration-500 sm:left-[1.15rem] ${
          active
            ? "border-primary/60 bg-primary/20 text-primary shadow-glow"
            : "border-line/20 bg-app text-ink-muted"
        } group-hover:border-primary/70 group-hover:bg-primary/25 group-hover:text-primary group-hover:shadow-glow-lg`}
      >
        {icon}
      </span>

      {/* Card — entrance is opacity-only (no translate). A lingering transform
          would make this card a backdrop root and kill its glass frost, so the
          slide-in is intentionally dropped; the node dot supplies the motion. */}
      <div
        className={`glass glass-sheen card-rich p-5 transition-all duration-500 sm:p-6 ${
          active ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <h3 className="text-lg font-semibold text-ink">{item.title}</h3>
          <span className="font-mono text-xs text-primary">{item.period}</span>
        </div>
        {item.subtitle && <p className="text-sm font-medium text-accent">{item.subtitle}</p>}

        {hasDetail && (
          <div
            className={`grid transition-all duration-500 ease-out ${
              active ? "mt-3 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
            } group-hover:mt-3 group-hover:grid-rows-[1fr] group-hover:opacity-100`}
          >
            <div className="overflow-hidden">
              {item.body && <p className="text-sm leading-relaxed text-ink-muted">{item.body}</p>}
              {item.tags && item.tags.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {item.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full bg-white/5 px-2.5 py-0.5 text-[0.7rem] font-medium text-ink-muted ring-1 ring-line/10"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </li>
  );
}

export function Timeline({ items, icon }: { items: TimelineItem[]; icon: ReactNode }) {
  return (
    <ol className="relative flex flex-col gap-8">
      {/* Vertical neon axis */}
      <span
        className="absolute bottom-2 left-[0.65rem] top-2 w-px -translate-x-1/2 sm:left-[1.15rem]"
        aria-hidden="true"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, rgb(var(--color-primary) / 0.6), rgb(var(--color-accent) / 0.4), transparent)",
        }}
      />
      {items.map((item, i) => (
        <TimelineNode key={`${item.title}-${item.period}`} item={item} index={i} icon={icon} />
      ))}
    </ol>
  );
}
