import Image from "next/image";
import {
  DEFAULT_HERO_VISUALS,
  getDefaultHeroVisual,
  type HeroVisualConfig,
  type HeroVisualNode,
  type ServiceVisualVariant
} from "@/lib/hero-visuals";

export type { ServiceVisualVariant };

const DOT: Record<string, string> = {
  cyan: "bg-cyan-400 border-cyan-400/30 text-cyan-300",
  violet: "bg-violet-400 border-violet-400/30 text-violet-300",
  amber: "bg-amber-400 border-amber-400/30 text-amber-300",
  rose: "bg-rose-400 border-rose-400/30 text-rose-300",
  emerald: "bg-emerald-400 border-emerald-400/30 text-emerald-300"
};

export function ServiceHeroVisual({
  variant,
  compact,
  imageUrl,
  label,
  nodes,
  command,
  lines
}: {
  variant: ServiceVisualVariant;
  compact?: boolean;
  imageUrl?: string | null;
  label?: string;
  nodes?: HeroVisualNode[];
  command?: string;
  lines?: string[];
}) {
  const fallback = getDefaultHeroVisual(variant) ?? DEFAULT_HERO_VISUALS.web;
  const cfg: HeroVisualConfig = {
    label: label || fallback.label,
    nodes: nodes && nodes.length ? nodes : fallback.nodes,
    command: command || fallback.command,
    lines: lines && lines.length ? lines : fallback.lines
  };

  return (
    <div className={`relative ${compact ? "max-w-md" : ""}`}>
      <div
        aria-hidden
        className="absolute -inset-3 rounded-3xl bg-gradient-to-br from-cyan-500/20 via-violet-500/10 to-amber-500/15 blur-2xl"
      />
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-ink-900 shadow-glow">
        {imageUrl ? (
          <div className="bg-white p-2 sm:p-3">
            <Image
              src={imageUrl}
              alt={cfg.label || "Service illustration"}
              width={1200}
              height={900}
              className="h-auto w-full rounded-lg object-contain"
              priority={!compact}
            />
          </div>
        ) : (
          <div className={`relative bg-gradient-to-br from-ink-800 via-ink-900 to-ink-950 ${compact ? "p-5" : "p-6 sm:p-8"} ${compact ? "min-h-[240px]" : "min-h-[300px] sm:min-h-[340px]"}`}>
            <div
              aria-hidden
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(6,182,212,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.12) 1px, transparent 1px)",
                backgroundSize: "28px 28px"
              }}
            />
            <div className="relative flex h-full flex-col items-center justify-center">
              {cfg.nodes.map((n) => (
                <div
                  key={`${n.text}-${n.x}-${n.y}`}
                  className={`absolute rounded-lg border px-2 py-1 text-[10px] font-medium sm:text-xs ${DOT[n.color]?.split(" ").slice(2).join(" ") ?? "text-cyan-300"} border-white/10 bg-ink-800/80`}
                  style={{ left: n.x, top: n.y, transform: "translate(-50%, -50%)" }}
                >
                  {n.text}
                </div>
              ))}
              <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-2xl border border-brand/50 bg-brand/15 shadow-[0_0_40px_rgba(6,182,212,0.35)] sm:h-20 sm:w-20">
                <svg viewBox="0 0 24 24" className="h-8 w-8 text-brand sm:h-10 sm:w-10" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 2 4 6v6c0 5 3.5 9.5 8 10 4.5-.5 8-5 8-10V6l-8-4z" />
                </svg>
              </div>
              <p className="relative z-10 mt-4 text-center text-[10px] font-medium uppercase tracking-widest text-white/40 sm:text-xs">
                {cfg.label}
              </p>
            </div>
          </div>
        )}
        <div className="border-t border-white/10 bg-ink-950/90 px-4 py-3 font-mono text-[10px] leading-5 text-white/70 sm:text-xs">
          <div className="mb-1 flex gap-1.5">
            <span className="h-2 w-2 rounded-full bg-red-500/70" />
            <span className="h-2 w-2 rounded-full bg-yellow-400/70" />
            <span className="h-2 w-2 rounded-full bg-green-500/70" />
          </div>
          <div className="text-white/40">{cfg.command}</div>
          {cfg.lines.map((line, i) => (
            <div key={i}>
              <span className={line.startsWith("[!]") ? "text-rose-400" : "text-emerald-400"}>
                {line.slice(0, 3)}
              </span>
              {line.slice(3)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
