import type { ReactNode } from "react";
import { ArrowDown, Bot, ShieldCheck, UserCheck } from "lucide-react";
import type { ExtraCard } from "@/lib/service-extras";

export function AgentWorkflow({
  title,
  subtitle,
  manager,
  specialists,
  pipeline
}: {
  title: string;
  subtitle: string;
  manager: string;
  specialists: ExtraCard[];
  pipeline: ExtraCard[];
}) {
  return (
    <section className="border-y border-white/5 bg-ink-800/30">
      <div className="section py-16 sm:py-20">
        <span className="tag">Agent workflow</span>
        <h2 className="mt-3 max-w-3xl text-2xl font-bold sm:text-3xl md:text-4xl">{title}</h2>
        {subtitle && <p className="mt-3 max-w-3xl text-sm text-white/70 sm:text-base">{subtitle}</p>}

        <div className="relative mt-12 overflow-hidden rounded-2xl border border-white/10 bg-ink-900 p-5 shadow-glow sm:p-8">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                "radial-gradient(circle at 50% 0%, rgba(6,182,212,0.16), transparent 55%), linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
              backgroundSize: "auto, 32px 32px, 32px 32px"
            }}
          />

          <div className="relative mx-auto flex max-w-4xl flex-col items-center">
            <WorkflowNode
              title={manager}
              text="Coordinates the engagement, assigns specialist agents, and keeps the test in scope."
              accent
              icon={<Bot className="h-5 w-5" />}
            />
            <Connector />

            <div className="grid w-full gap-3 sm:grid-cols-3">
              {specialists.map((item) => (
                <WorkflowNode key={item.title} title={item.title} text={item.text} />
              ))}
            </div>
            <Connector />

            {pipeline.map((item, i) => (
              <div key={item.title} className="flex w-full flex-col items-center">
                <WorkflowNode
                  title={item.title}
                  text={item.text}
                  icon={i === pipeline.length - 1 ? <UserCheck className="h-5 w-5" /> : <ShieldCheck className="h-5 w-5" />}
                  highlight={i === pipeline.length - 1}
                />
                {i < pipeline.length - 1 && <Connector />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Connector() {
  return (
    <div className="flex flex-col items-center py-2 text-brand/70">
      <div className="h-4 w-px bg-brand/40 sm:h-6" />
      <ArrowDown className="h-4 w-4" />
    </div>
  );
}

function WorkflowNode({
  title,
  text,
  accent,
  highlight,
  icon
}: {
  title: string;
  text?: string;
  accent?: boolean;
  highlight?: boolean;
  icon?: ReactNode;
}) {
  return (
    <div
      className={`w-full max-w-xl rounded-xl border px-4 py-4 text-center sm:px-5 ${
        accent
          ? "border-brand/40 bg-brand/10 shadow-[0_0_30px_rgba(6,182,212,0.18)]"
          : highlight
            ? "border-amber-400/30 bg-amber-400/10"
            : "border-white/10 bg-white/[0.04]"
      }`}
    >
      <div className="flex items-center justify-center gap-2">
        {icon && <span className={accent || highlight ? "text-brand" : "text-white/60"}>{icon}</span>}
        <h3 className="font-semibold">{title}</h3>
      </div>
      {text && <p className="mt-1.5 text-xs text-white/60 sm:text-sm">{text}</p>}
    </div>
  );
}
