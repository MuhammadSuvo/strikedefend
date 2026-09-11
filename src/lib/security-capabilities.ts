export type SecurityCapability = {
  icon: string;
  color: string;
  title: string;
  text: string;
};

export type SecurityHotspot = {
  label: string;
  color: string;
  x: string;
  y: string;
};

export type SecurityStat = {
  value: string;
  label: string;
};

export type SecurityTerminalLine = {
  status: "+" | "!";
  text: string;
};

export const SECURITY_COLOR_STYLES: Record<
  string,
  { text: string; bg: string; border: string; dot: string; line: string }
> = {
  cyan: {
    text: "text-cyan-400",
    bg: "bg-cyan-400/10",
    border: "border-cyan-400/20",
    dot: "bg-cyan-400",
    line: "rgba(34,211,238,0.35)"
  },
  violet: {
    text: "text-violet-400",
    bg: "bg-violet-400/10",
    border: "border-violet-400/20",
    dot: "bg-violet-400",
    line: "rgba(167,139,250,0.35)"
  },
  amber: {
    text: "text-amber-400",
    bg: "bg-amber-400/10",
    border: "border-amber-400/20",
    dot: "bg-amber-400",
    line: "rgba(251,191,36,0.35)"
  },
  rose: {
    text: "text-rose-400",
    bg: "bg-rose-400/10",
    border: "border-rose-400/20",
    dot: "bg-rose-400",
    line: "rgba(251,113,133,0.35)"
  },
  emerald: {
    text: "text-emerald-400",
    bg: "bg-emerald-400/10",
    border: "border-emerald-400/20",
    dot: "bg-emerald-400",
    line: "rgba(52,211,153,0.35)"
  },
  sky: {
    text: "text-sky-400",
    bg: "bg-sky-400/10",
    border: "border-sky-400/20",
    dot: "bg-sky-400",
    line: "rgba(56,189,248,0.35)"
  }
};

export const DEFAULT_SECURITY_CAPABILITIES: SecurityCapability[] = [
  {
    icon: "globe",
    color: "cyan",
    title: "Web Application Testing",
    text: "OWASP Top 10, XSS, SQLi, CSRF, and session handling."
  },
  {
    icon: "network",
    color: "violet",
    title: "API & GraphQL Security",
    text: "Broken auth, excessive data exposure, and injection flaws."
  },
  {
    icon: "key",
    color: "amber",
    title: "Authentication & Access",
    text: "IDOR, privilege escalation, and MFA bypass attempts."
  },
  {
    icon: "workflow",
    color: "rose",
    title: "Business Logic Flaws",
    text: "Workflow abuse, payment tampering, and race conditions."
  },
  {
    icon: "cloud",
    color: "emerald",
    title: "Cloud & Infrastructure",
    text: "Misconfigs, exposed secrets, and IAM weaknesses."
  },
  {
    icon: "file",
    color: "sky",
    title: "Actionable Reporting",
    text: "Severity-rated findings, PoC steps, and a free retest."
  }
];

export const DEFAULT_SECURITY_HOTSPOTS: SecurityHotspot[] = [
  { label: "Web App", color: "cyan", x: "18%", y: "22%" },
  { label: "API", color: "violet", x: "78%", y: "28%" },
  { label: "Auth", color: "amber", x: "82%", y: "58%" },
  { label: "Logic", color: "rose", x: "62%", y: "78%" },
  { label: "Cloud", color: "emerald", x: "22%", y: "72%" },
  { label: "Report", color: "sky", x: "48%", y: "12%" }
];

export const DEFAULT_SECURITY_STATS: SecurityStat[] = [
  { value: "6", label: "layers tested" },
  { value: "OWASP", label: "aligned" },
  { value: "Free", label: "retest included" }
];

export const DEFAULT_SECURITY_TERMINAL: SecurityTerminalLine[] = [
  { status: "+", text: "Auth bypass........... tested" },
  { status: "!", text: "IDOR on /api/users.... critical" },
  { status: "+", text: "Cloud IAM review...... passed" }
];

export function getSecurityColorStyles(color: string) {
  return SECURITY_COLOR_STYLES[color] ?? SECURITY_COLOR_STYLES.cyan;
}
