import { Sparkles } from "lucide-react";
import {
  SiAffinity,
  SiBootstrap,
  SiCanva,
  SiFigma,
  SiLaravel,
  SiReact,
  SiTailwindcss,
  SiVuedotjs,
} from "react-icons/si";
import type { SkillIconKey } from "@/config/cv";

/** Adobe product "monogram" tile (Ai / Ps / Lr / Pr) — their actual logo style.
 *  Simple Icons removed Adobe product marks for trademark reasons, so we render
 *  a faithful lookalike: brand-tinted letters on a dark rounded square. */
function Monogram({ label, color }: { label: string; color: string }) {
  return (
    <span
      className="grid h-full w-full place-items-center rounded-[0.4rem] font-mono text-[0.78rem] font-bold leading-none"
      style={{ color, backgroundColor: "rgb(0 0 0 / 0.55)", boxShadow: `inset 0 0 0 1.5px ${color}` }}
    >
      {label}
    </span>
  );
}

const ICON_SIZE = 22;

/** Renders the brand logo for a skill, tinted in its signature color. */
export function SkillIcon({ icon }: { icon: SkillIconKey }) {
  switch (icon) {
    case "illustrator":
      return <Monogram label="Ai" color="#FF9A00" />;
    case "photoshop":
      return <Monogram label="Ps" color="#31A8FF" />;
    case "lightroom":
      return <Monogram label="Lr" color="#3DCFFF" />;
    case "premiere":
      return <Monogram label="Pr" color="#9999FF" />;
    case "figma":
      return <SiFigma size={ICON_SIZE} color="#F24E1E" />;
    case "canva":
      return <SiCanva size={ICON_SIZE} color="#00C4CC" />;
    case "affinity":
      return <SiAffinity size={ICON_SIZE} color="#1B72BE" />;
    case "tailwind":
      return <SiTailwindcss size={ICON_SIZE} color="#38BDF8" />;
    case "bootstrap":
      return <SiBootstrap size={ICON_SIZE} color="#7952B3" />;
    case "vue":
      return <SiVuedotjs size={ICON_SIZE} color="#41B883" />;
    case "react":
      return <SiReact size={ICON_SIZE} color="#61DAFB" />;
    case "laravel":
      return <SiLaravel size={ICON_SIZE} color="#FF2D20" />;
    case "aiprompt":
      return <Sparkles size={ICON_SIZE} className="text-primary" />;
  }
}
