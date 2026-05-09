import { Bot, Gauge, Shield, ShieldCheck, Cpu, Activity, Code2, Lock } from "lucide-react";

const map = {
  shield: Shield,
  shieldcheck: ShieldCheck,
  gauge: Gauge,
  bot: Bot,
  cpu: Cpu,
  activity: Activity,
  code: Code2,
  lock: Lock
} as const;

export function ServiceIcon({ name, className }: { name?: string | null; className?: string }) {
  const key = (name ?? "shield").toLowerCase().replace(/\s+/g, "") as keyof typeof map;
  const Icon = map[key] ?? Shield;
  return <Icon className={className ?? "h-6 w-6 text-brand"} />;
}
