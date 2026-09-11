export type HeroVisualNode = { text: string; color: string; x: string; y: string };

export type HeroVisualConfig = {
  label: string;
  nodes: HeroVisualNode[];
  command: string;
  lines: string[];
};

export type ServiceVisualVariant = "web" | "mobile" | "cloud" | "monitoring";

export const DEFAULT_HERO_VISUALS: Record<ServiceVisualVariant, HeroVisualConfig> = {
  web: {
    label: "Web Application Scan",
    nodes: [
      { text: "Frontend", color: "cyan", x: "15%", y: "20%" },
      { text: "API", color: "violet", x: "80%", y: "25%" },
      { text: "Auth", color: "amber", x: "78%", y: "65%" },
      { text: "Logic", color: "rose", x: "55%", y: "80%" }
    ],
    command: "$ strikedefend web-pentest --target app.example.com",
    lines: ["[+] OWASP Top 10 scan........ done", "[!] SQLi on /api/search...... critical", "[+] Session mgmt review...... passed"]
  },
  mobile: {
    label: "Mobile App Assessment",
    nodes: [
      { text: "iOS", color: "cyan", x: "18%", y: "25%" },
      { text: "Android", color: "violet", x: "78%", y: "22%" },
      { text: "Storage", color: "amber", x: "20%", y: "72%" },
      { text: "API", color: "emerald", x: "75%", y: "70%" }
    ],
    command: "$ strikedefend mobile-pentest --app com.example.app",
    lines: ["[+] Static analysis............ done", "[!] Insecure storage......... high", "[+] Certificate pinning........ passed"]
  },
  cloud: {
    label: "Cloud Infrastructure Scan",
    nodes: [
      { text: "AWS", color: "cyan", x: "16%", y: "18%" },
      { text: "Azure", color: "violet", x: "84%", y: "18%" },
      { text: "GCP", color: "amber", x: "12%", y: "48%" },
      { text: "Kubernetes", color: "emerald", x: "86%", y: "52%" },
      { text: "Microsoft 365", color: "rose", x: "22%", y: "80%" }
    ],
    command: "$ strikedefend cloud-pentest --scope multi-cloud",
    lines: [
      "[+] AWS / Azure / GCP......... in scope",
      "[+] Kubernetes cluster review. running",
      "[!] Microsoft 365 misconfig... high"
    ]
  },
  monitoring: {
    label: "Continuous Monitoring",
    nodes: [
      { text: "Scan", color: "cyan", x: "18%", y: "24%" },
      { text: "Alert", color: "rose", x: "78%", y: "26%" },
      { text: "Assets", color: "violet", x: "20%", y: "72%" },
      { text: "Report", color: "emerald", x: "74%", y: "70%" }
    ],
    command: "$ strikedefend monitor --status active",
    lines: ["[+] Weekly scan................ done", "[!] New subdomain exposed.... alert", "[+] SSL cert expiry check...... ok"]
  }
};

export function getDefaultHeroVisual(variant: string | null | undefined): HeroVisualConfig {
  const key = (variant ?? "web") as ServiceVisualVariant;
  return DEFAULT_HERO_VISUALS[key] ?? DEFAULT_HERO_VISUALS.web;
}
