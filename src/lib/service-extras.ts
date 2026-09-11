import { getDefaultHeroVisual } from "@/lib/hero-visuals";
import { EMPTY_LONGFORM, parseLongform, API_LONGFORM, MOBILE_LONGFORM, MONITORING_LONGFORM, NETWORK_LONGFORM, VULN_LONGFORM, WEB_LONGFORM, type ServiceLongform } from "@/lib/service-longform";

export type ExtraCard = { title: string; text: string };
export type VisualNode = { text: string; color: string; x: string; y: string };

export type ServiceExtras = {
  workflowEnabled: boolean;
  workflowTitle: string;
  workflowSubtitle: string;
  workflowManager: string;
  workflowSpecialists: ExtraCard[];
  workflowPipeline: ExtraCard[];
  howItWorksTitle: string;
  howItWorksItems: ExtraCard[];
  benefitsTitle: string;
  benefitsItems: ExtraCard[];
  whyNeededTitle: string;
  whyNeededText: string;
  whyNeededItems: ExtraCard[];
  visualLabel: string;
  visualNodes: VisualNode[];
  visualCommand: string;
  visualLines: string[];
  standardsTitle: string;
  standardsSubtitle: string;
  processSubtitle: string;
  toolsTitle: string;
  longformEnabled: boolean;
  longform: ServiceLongform;
};

export type AgentWorkflowContent = {
  title: string;
  subtitle: string;
  manager: string;
  specialists: ExtraCard[];
  pipeline: ExtraCard[];
};

export const HOME_AGENT_WORKFLOW: AgentWorkflowContent = {
  title: "Pentest Agent Workflow",
  subtitle:
    "A manager agent coordinates specialist agents in parallel, then validates, evidences, and scores findings before a human reviews the report.",
  manager: "Pentest Manager Agent",
  specialists: [
    {
      title: "Recon Agent",
      text: "Maps assets, endpoints, identities, and the full attack surface."
    },
    {
      title: "Authentication Agent",
      text: "Tests login flows, sessions, MFA, privilege boundaries, and access paths."
    },
    {
      title: "API Security Agent",
      text: "Assesses APIs, authz, data exposure, and business-logic weaknesses."
    }
  ],
  pipeline: [
    {
      title: "Validation Agent",
      text: "Confirms each finding is real, reproducible, and in scope."
    },
    {
      title: "Evidence Agent",
      text: "Collects proof, screenshots, logs, and reproduction notes."
    },
    {
      title: "Severity Agent",
      text: "Rates impact and likelihood using CVSS and business context."
    },
    {
      title: "Reporting Agent",
      text: "Turns findings into a developer-ready report with fix guidance."
    },
    {
      title: "Human Review",
      text: "A senior engineer reviews every finding before delivery."
    }
  ]
};

export const EMPTY_SERVICE_EXTRAS: ServiceExtras = {
  workflowEnabled: false,
  workflowTitle: "Agent Workflow",
  workflowSubtitle: "",
  workflowManager: "Pentest Manager Agent",
  workflowSpecialists: [],
  workflowPipeline: [],
  howItWorksTitle: "How it works",
  howItWorksItems: [],
  benefitsTitle: "Benefits",
  benefitsItems: [],
  whyNeededTitle: "Why your applications need this",
  whyNeededText: "",
  whyNeededItems: [],
  visualLabel: "",
  visualNodes: [],
  visualCommand: "",
  visualLines: [],
  standardsTitle: "Aligned with Industry Standards",
  standardsSubtitle:
    "Our assessments follow internationally recognized security frameworks for comprehensive and consistent testing.",
  processSubtitle: "",
  toolsTitle: "Tools & Technologies",
  longformEnabled: false,
  longform: EMPTY_LONGFORM
};

export const WEB_SERVICE_EXTRAS: ServiceExtras = {
  ...EMPTY_SERVICE_EXTRAS,
  longformEnabled: true,
  longform: WEB_LONGFORM,
  visualLabel: getDefaultHeroVisual("web").label,
  visualNodes: getDefaultHeroVisual("web").nodes,
  visualCommand: getDefaultHeroVisual("web").command,
  visualLines: getDefaultHeroVisual("web").lines,
  standardsTitle: "Built Around Industry Security Practices",
  standardsSubtitle: "Our web application testing methodology can align with established security guidance including:"
};

export const MONITORING_SERVICE_EXTRAS: ServiceExtras = {
  ...EMPTY_SERVICE_EXTRAS,
  longformEnabled: true,
  longform: MONITORING_LONGFORM,
  visualLabel: getDefaultHeroVisual("monitoring").label,
  visualNodes: getDefaultHeroVisual("monitoring").nodes,
  visualCommand: getDefaultHeroVisual("monitoring").command,
  visualLines: getDefaultHeroVisual("monitoring").lines,
  standardsTitle: "Aligned with Continuous Security Practices",
  standardsSubtitle:
    "Our monitoring program maps to frameworks your security and compliance teams already use, including:"
};

export const MOBILE_SERVICE_EXTRAS: ServiceExtras = {
  ...EMPTY_SERVICE_EXTRAS,
  longformEnabled: true,
  longform: MOBILE_LONGFORM,
  visualLabel: getDefaultHeroVisual("mobile").label,
  visualNodes: getDefaultHeroVisual("mobile").nodes,
  visualCommand: getDefaultHeroVisual("mobile").command,
  visualLines: getDefaultHeroVisual("mobile").lines,
  standardsTitle: "Aligned with Mobile Security Standards",
  standardsSubtitle:
    "Our mobile assessments follow OWASP MASVS, MSTG, and related guidance for iOS and Android testing:"
};

export const API_SERVICE_EXTRAS: ServiceExtras = {
  ...EMPTY_SERVICE_EXTRAS,
  longformEnabled: true,
  longform: API_LONGFORM,
  visualLabel: getDefaultHeroVisual("web").label,
  visualNodes: [
    { text: "Auth", color: "cyan", x: "16%", y: "22%" },
    { text: "BOLA", color: "rose", x: "78%", y: "24%" },
    { text: "Tokens", color: "amber", x: "18%", y: "72%" },
    { text: "Logic", color: "violet", x: "76%", y: "70%" }
  ],
  visualCommand: "$ strikedefend api-test --target api.example.com",
  visualLines: ["[+] Endpoint discovery.......... done", "[!] BOLA on /orders/{id}...... high", "[+] Token validation review..... passed"],
  standardsTitle: "Aligned with API Security Standards",
  standardsSubtitle: "Our API methodology maps to OWASP API Security Top 10 and related guidance:"
};

export const NETWORK_SERVICE_EXTRAS: ServiceExtras = {
  ...EMPTY_SERVICE_EXTRAS,
  longformEnabled: true,
  longform: NETWORK_LONGFORM,
  visualLabel: getDefaultHeroVisual("cloud").label,
  visualNodes: [
    { text: "Perimeter", color: "cyan", x: "16%", y: "20%" },
    { text: "Services", color: "violet", x: "80%", y: "24%" },
    { text: "Firewall", color: "amber", x: "18%", y: "70%" },
    { text: "Paths", color: "rose", x: "78%", y: "72%" }
  ],
  visualCommand: "$ strikedefend network-test --scope perimeter+internal",
  visualLines: ["[+] Host discovery.............. done", "[!] Exposed admin service..... high", "[+] Segmentation review......... running"],
  standardsTitle: "Aligned with Network Security Practices",
  standardsSubtitle: "Our network assessments align with PTES, NIST, CIS, and MITRE ATT&CK guidance:"
};

export const VULN_SERVICE_EXTRAS: ServiceExtras = {
  ...EMPTY_SERVICE_EXTRAS,
  longformEnabled: true,
  longform: VULN_LONGFORM,
  visualLabel: getDefaultHeroVisual("monitoring").label,
  visualNodes: [
    { text: "Scan", color: "cyan", x: "18%", y: "22%" },
    { text: "Validate", color: "emerald", x: "78%", y: "24%" },
    { text: "Score", color: "amber", x: "20%", y: "72%" },
    { text: "Fix", color: "violet", x: "76%", y: "70%" }
  ],
  visualCommand: "$ strikedefend vuln-assess --scope enterprise",
  visualLines: ["[+] Asset inventory............. done", "[+] Manual validation........... running", "[!] Critical CVE prioritized.. high"],
  standardsTitle: "Aligned with Vulnerability Management Practices",
  standardsSubtitle: "Our assessments use CVSS, CVE intelligence, CIS, and NIST-aligned prioritization:"
};

export const CLOUD_SERVICE_EXTRAS: ServiceExtras = {
  workflowEnabled: true,
  workflowTitle: "Cloud Pentest Agent Workflow",
  workflowSubtitle: HOME_AGENT_WORKFLOW.subtitle,
  workflowManager: HOME_AGENT_WORKFLOW.manager,
  workflowSpecialists: HOME_AGENT_WORKFLOW.specialists.map((item, i) =>
    i === 0
      ? { title: item.title, text: "Maps cloud assets, identities, public exposure, and attack surface." }
      : i === 1
        ? { title: item.title, text: "Tests IAM, federation, tokens, privilege boundaries, and access paths." }
        : { title: item.title, text: "Assesses APIs, gateways, authz, data exposure, and cloud-connected services." }
  ),
  workflowPipeline: HOME_AGENT_WORKFLOW.pipeline,
  howItWorksTitle: "How it works",
  howItWorksItems: [
    {
      title: "1. Orchestrate",
      text: "The Pentest Manager Agent scopes the cloud environment and assigns specialist agents."
    },
    {
      title: "2. Investigate in parallel",
      text: "Recon, Authentication, and API Security agents run together to cover more of the attack surface."
    },
    {
      title: "3. Validate and prove",
      text: "Validation and Evidence agents confirm each issue and attach reproduction steps."
    },
    {
      title: "4. Score and report",
      text: "Severity and Reporting agents produce a ranked report, then a human reviews it before you receive it."
    }
  ],
  benefitsTitle: "Benefits",
  benefitsItems: [
    {
      title: "AI + Human platform",
      text: "Cloud testing runs on our AI + Human Penetration Testing Platform — AI-assisted discovery with senior engineer validation."
    },
    {
      title: "Broader coverage, faster",
      text: "Specialist agents work in parallel so IAM, APIs, and exposed assets are tested together — not one after another."
    },
    {
      title: "Fewer false positives",
      text: "Every candidate finding is validated and evidenced before it reaches the report."
    },
    {
      title: "Actionable severity",
      text: "Issues are scored by real cloud impact: data exposure, privilege escalation, and blast radius."
    },
    {
      title: "Human quality control",
      text: "A senior engineer still reviews the output, so you get speed without losing judgment."
    }
  ],
  whyNeededTitle: "Why your applications need this",
  whyNeededText:
    "Cloud-hosted applications change constantly. New identities, APIs, buckets, and services appear with every deploy. Our AI + Human Penetration Testing Platform follows how attackers move through cloud environments — combining intelligent automation with expert validation.",
  whyNeededItems: [
    {
      title: "Cloud identity is the new perimeter",
      text: "Most cloud breaches start with IAM mistakes, over-privileged roles, or leaked credentials — not a classic firewall gap."
    },
    {
      title: "APIs expose the business",
      text: "Your application logic now lives behind APIs and gateways. If authz is weak, attackers can reach data without touching the UI."
    },
    {
      title: "Misconfigurations spread quickly",
      text: "One public bucket, open security group, or wildcard policy can expose production data across accounts."
    },
    {
      title: "Compliance still requires proof",
      text: "Audits and customers expect evidence that cloud controls were tested, validated, and reported with severity."
    }
  ],
  visualLabel: getDefaultHeroVisual("cloud").label,
  visualNodes: getDefaultHeroVisual("cloud").nodes,
  visualCommand: getDefaultHeroVisual("cloud").command,
  visualLines: getDefaultHeroVisual("cloud").lines,
  standardsTitle: "Aligned with Industry Standards",
  standardsSubtitle:
    "Our cloud assessments follow CIS, NIST, ISO 27001, SOC 2, and MITRE ATT&CK so findings map to frameworks your auditors and customers already use.",
  processSubtitle:
    "A structured engagement from written authorization through reconnaissance, configuration review, safe validation, and hardening guidance.",
  toolsTitle: "Tools & Technologies",
  longformEnabled: false,
  longform: EMPTY_LONGFORM
};

export function parseServiceExtras(value: unknown): ServiceExtras {
  const fallback = EMPTY_SERVICE_EXTRAS;
  if (!value) return fallback;
  let parsed: Partial<ServiceExtras> = {};
  if (typeof value === "string") {
    if (!value.trim()) return fallback;
    try {
      parsed = JSON.parse(value) as Partial<ServiceExtras>;
    } catch {
      return fallback;
    }
  } else if (typeof value === "object") {
    parsed = value as Partial<ServiceExtras>;
  }
  return {
    ...fallback,
    ...parsed,
    workflowSpecialists: Array.isArray(parsed.workflowSpecialists) ? parsed.workflowSpecialists : fallback.workflowSpecialists,
    workflowPipeline: Array.isArray(parsed.workflowPipeline) ? parsed.workflowPipeline : fallback.workflowPipeline,
    howItWorksItems: Array.isArray(parsed.howItWorksItems) ? parsed.howItWorksItems : fallback.howItWorksItems,
    benefitsItems: Array.isArray(parsed.benefitsItems) ? parsed.benefitsItems : fallback.benefitsItems,
    whyNeededItems: Array.isArray(parsed.whyNeededItems) ? parsed.whyNeededItems : fallback.whyNeededItems,
    visualNodes: Array.isArray(parsed.visualNodes) ? parsed.visualNodes : fallback.visualNodes,
    visualLines: Array.isArray(parsed.visualLines) ? parsed.visualLines : fallback.visualLines,
    standardsTitle: parsed.standardsTitle || fallback.standardsTitle,
    standardsSubtitle: parsed.standardsSubtitle || fallback.standardsSubtitle,
    processSubtitle: parsed.processSubtitle || fallback.processSubtitle,
    toolsTitle: parsed.toolsTitle || fallback.toolsTitle,
    longformEnabled: Boolean(parsed.longformEnabled),
    longform: parseLongform(parsed.longform)
  };
}

export function withHeroVisualDefaults(extras: ServiceExtras, variant: string | null | undefined): ServiceExtras {
  const defaults = getDefaultHeroVisual(variant);
  return {
    ...extras,
    visualLabel: extras.visualLabel || defaults.label,
    visualNodes: extras.visualNodes.length ? extras.visualNodes : defaults.nodes,
    visualCommand: extras.visualCommand || defaults.command,
    visualLines: extras.visualLines.length ? extras.visualLines : defaults.lines
  };
}

export function hasServiceExtras(extras: ServiceExtras) {
  return (
    extras.workflowEnabled ||
    extras.howItWorksItems.length > 0 ||
    extras.benefitsItems.length > 0 ||
    extras.whyNeededItems.length > 0 ||
    Boolean(extras.whyNeededText) ||
    extras.longformEnabled
  );
}
