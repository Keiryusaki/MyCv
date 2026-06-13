import type { ReactNode } from "react";

/** Frosted glass container with optional rich hover (lift + neon glow). */
export function GlassCard({
  children,
  className = "",
  hover = true,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  as?: "div" | "article" | "li" | "a";
}) {
  return (
    <Tag
      className={`glass glass-sheen p-6 ${hover ? "card-rich" : ""} ${className}`}
    >
      {children}
    </Tag>
  );
}
