import Link from "next/link";
import {
  ArrowRight,
  Cloud,
  FileSearch,
  Globe,
  KeyRound,
  LucideIcon,
  Network,
  Workflow
} from "lucide-react";
import {
  getSecurityColorStyles,
  type SecurityCapability,
  type SecurityHotspot,
  type SecurityStat,
  type SecurityTerminalLine
} from "@/lib/security-capabilities";

const ICON_MAP: Record<string, LucideIcon> = {
  globe: Globe,
  network: Network,
  key: KeyRound,
  keyround: KeyRound,
  workflow: Workflow,
  cloud: Cloud,
  file: FileSearch,
  filesearch: FileSearch
};

type Props = {
  enabled: boolean;
  tag: string;
  title: string;
  subtitle: string;
  capabilities: SecurityCapability[];
  hotspots: SecurityHotspot[];
  stats: SecurityStat[];
  terminal: SecurityTerminalLine[];
  ctaText: string;
  ctaLink: string;
};

export function SecurityCapabilities(props: Props) {
  if (!props.enabled) return null;

  return (
    <section className="border-y border-white/5 bg-ink-800/30">
      <div className="section py-16 sm:py-20">
        <div className="max-w-3xl">
          <span className="tag">{props.tag}</span>
          <h2 className="mt-3 text-2xl font-bold sm:text-3xl md:text-4xl">{props.title}</h2>
          <p className="mt-3 text-sm text-white/70 sm:text-base">{props.subtitle}</p>
        </div>

        <div className="mt-10 grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
          <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
            {props.capabilities.map((item) => {
              const styles = getSecurityColorStyles(item.color);
              const Icon = ICON_MAP[item.icon.toLowerCase()] ?? Globe;
              return (
                <div
                  key={`${item.title}-${item.icon}`}
                  className={`rounded-xl border ${styles.border} bg-white/[0.02] p-4 sm:p-5`}
                >
                  <div className={`inline-flex rounded-lg ${styles.bg} p-2.5`}>
                    <Icon className={`h-5 w-5 ${styles.text}`} />
                  </div>
                  <h3 className="mt-3 font-semibold">{item.title}</h3>
                  <p className="mt-1 text-sm text-white/60">{item.text}</p>
                </div>
              );
            })}
          </div>

          <SecurityMap hotspots={props.hotspots} terminal={props.terminal} />
        </div>

        {(props.stats.length > 0 || props.ctaText) && (
          <div className="mt-10 flex flex-col items-start justify-between gap-6 border-t border-white/5 pt-8 sm:flex-row sm:items-center">
            {props.stats.length > 0 && (
              <div className="flex flex-wrap gap-6 text-sm text-white/60">
                {props.stats.map((stat) => (
                  <div key={`${stat.value}-${stat.label}`}>
                    <span className="text-lg font-bold text-white">{stat.value}</span> {stat.label}
                  </div>
                ))}
              </div>
            )}
            {props.ctaText && (
              <Link href={props.ctaLink || "/services"} className="btn btn-outline">
                {props.ctaText} <ArrowRight className="h-4 w-4" />
              </Link>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

function SecurityMap({
  hotspots,
  terminal
}: {
  hotspots: SecurityHotspot[];
  terminal: SecurityTerminalLine[];
}) {
  return (
    <div className="relative">
      <div
        aria-hidden
        className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-cyan-500/20 via-violet-500/10 to-amber-500/20 blur-2xl"
      />
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-ink-900 shadow-glow">
        <div className="relative aspect-[4/3] bg-gradient-to-br from-ink-800 via-ink-900 to-ink-950 p-6 sm:p-8">
          <div
            aria-hidden
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                "linear-gradient(rgba(6,182,212,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.15) 1px, transparent 1px)",
              backgroundSize: "32px 32px"
            }}
          />

          <svg className="absolute inset-0 h-full w-full" aria-hidden>
            {hotspots.map((spot) => {
              const line = getSecurityColorStyles(spot.color).line;
              return (
                <line
                  key={spot.label}
                  x1="50%"
                  y1="50%"
                  x2={spot.x}
                  y2={spot.y}
                  stroke={line}
                  strokeWidth="1"
                />
              );
            })}
          </svg>

          <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
            <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl border border-brand/40 bg-brand/10 shadow-[0_0_40px_rgba(6,182,212,0.35)] sm:h-24 sm:w-24">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-400/20 to-violet-500/20" />
              <svg
                viewBox="0 0 24 24"
                className="relative h-10 w-10 text-brand sm:h-12 sm:w-12"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M12 2 4 6v6c0 5 3.5 9.5 8 10 4.5-.5 8-5 8-10V6l-8-4z" />
                <path d="m9 12 2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>

          {hotspots.map((spot) => {
            const dot = getSecurityColorStyles(spot.color).dot;
            return (
              <div
                key={spot.label}
                className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
                style={{ left: spot.x, top: spot.y }}
              >
                <div className="relative flex items-center gap-2">
                  <span className={`relative flex h-3 w-3 rounded-full ${dot}`}>
                    <span className={`absolute inset-0 animate-ping rounded-full ${dot} opacity-60`} />
                  </span>
                  <span className="whitespace-nowrap rounded-full border border-white/10 bg-ink-800/90 px-2.5 py-1 text-[11px] font-medium text-white shadow-lg backdrop-blur sm:text-xs">
                    {spot.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {terminal.length > 0 && (
          <div className="border-t border-white/10 bg-ink-950/80 px-4 py-3 font-mono text-[10px] leading-5 text-white/70 sm:px-5 sm:text-xs sm:leading-6">
            <div className="mb-1 flex gap-1.5">
              <span className="h-2 w-2 rounded-full bg-red-500/70" />
              <span className="h-2 w-2 rounded-full bg-yellow-400/70" />
              <span className="h-2 w-2 rounded-full bg-green-500/70" />
            </div>
            {terminal.map((line, i) => (
              <div key={i}>
                <span className={line.status === "!" ? "text-rose-400" : "text-emerald-400"}>
                  [{line.status}]
                </span>{" "}
                {line.text}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
