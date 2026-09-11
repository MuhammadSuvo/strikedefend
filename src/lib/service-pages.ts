export type ServicePageContent = {
  slug: string;
  title: string;
  shortTitle: string;
  metaDescription: string;
  heroBadge: string;
  heroTitle: string;
  heroSubtitle: string;
  heroPrimaryCta: string;
  heroSecondaryCta: string;
  visual: "web" | "mobile" | "cloud" | "monitoring";
  whyTitle: string;
  whyItems: { title: string; text: string }[];
  overviewTitle: string;
  overviewText: string;
  overviewList: string[];
  assessTitle: string;
  assessItems: string[];
  standards: string[];
  processTitle: string;
  processSteps: { step: string; title: string; text?: string }[];
  tools: string[];
  industries: string[];
  deliverables: { title: string; items: string[] }[];
  faqs: { question: string; answer: string }[];
  ctaHeadline: string;
  ctaSubtitle: string;
  ctaText: string;
  icon: string;
};

export const SERVICE_NAV_LINKS = [
  { slug: "web-application-pentesting", label: "Web Application Pentesting" },
  { slug: "mobile-application-pentesting", label: "Mobile Application Pentesting" },
  { slug: "api-security-testing", label: "API Security Testing" },
  { slug: "cloud-penetration-testing", label: "Cloud Penetration Testing" },
  { slug: "network-security-testing", label: "Network Security Testing" },
  { slug: "vulnerability-assessment", label: "Vulnerability Assessment" },
  { slug: "continuous-security-monitoring", label: "Continuous Security Monitoring" }
] as const;

export const SERVICE_PAGES: ServicePageContent[] = [
  {
    slug: "web-application-pentesting",
    title: "Web Application Penetration Testing",
    shortTitle: "Web App Pentesting",
    metaDescription:
      "Senior web application penetration testing for OWASP Top 10, business logic, APIs, and authentication flaws.",
    heroBadge: "AI + Human Penetration Testing Platform",
    heroTitle: "Web Application Penetration Testing",
    heroSubtitle: "Find Security Weaknesses Before Attackers Do",
    heroPrimaryCta: "Get Free Consultation",
    heroSecondaryCta: "Contact with Us",
    visual: "web",
    icon: "globe",
    whyTitle: "Why Choose Web Application Pentesting?",
    whyItems: [
      { title: "Risk Identification", text: "Discover hidden security weaknesses before they reach production." },
      { title: "OWASP Coverage", text: "Full testing aligned with OWASP Top 10 and WSTG methodologies." },
      { title: "Business Logic Testing", text: "Go beyond scanners to find workflow and authorization flaws." },
      { title: "Developer-Ready Reports", text: "Clear severity ratings, PoC steps, and remediation guidance." }
    ],
    overviewTitle: "What is Web Application Pentesting?",
    overviewText:
      "Web application penetration testing simulates real-world attacks against your web apps, APIs, and supporting infrastructure. We identify vulnerabilities that automated tools miss — including authentication bypasses, IDOR, injection flaws, and business logic abuse — then deliver a report your team can act on immediately.",
    overviewList: [
      "Application & frontend review",
      "REST & GraphQL API testing",
      "Authentication & session management",
      "Authorization & access control",
      "Business logic & workflow abuse",
      "Infrastructure & deployment review"
    ],
    assessTitle: "What We Assess",
    assessItems: [
      "Web Applications",
      "REST APIs",
      "GraphQL Endpoints",
      "Authentication Flows",
      "Authorization Controls",
      "Session Management",
      "Business Logic",
      "Third-party Integrations"
    ],
    standards: [
      "OWASP Web Security Testing Guide",
      "OWASP Top 10",
      "OWASP API Security Top 10",
      "CVSS-based risk assessment",
      "Secure development best practices"
    ],
    processTitle: "Testing Process",
    processSteps: [
      { step: "01", title: "Discovery", text: "Confirm scope, access, and the testing window with your team." },
      { step: "02", title: "Reconnaissance", text: "Map applications, APIs, and the external attack surface." },
      { step: "03", title: "Vulnerability Analysis", text: "Manually test for OWASP issues, auth flaws, and business logic abuse." },
      { step: "04", title: "Exploitation & Validation", text: "Prove real impact safely and collect evidence for every finding." },
      { step: "05", title: "Reporting & Retest", text: "Deliver a developer-ready report, then retest after you remediate." }
    ],
    tools: ["Burp Suite", "OWASP ZAP", "Nmap", "SQLMap", "Postman", "FFUF", "Nuclei", "Playwright", "Amass", "Subfinder"],
    industries: ["SaaS", "FinTech", "E-Commerce", "Healthcare", "Education", "Government", "Enterprise", "Startups"],
    deliverables: [
      { title: "Executive Summary", items: ["Business overview", "Risk summary", "Security score"] },
      {
        title: "Technical Report",
        items: ["CVSS scoring", "Proof of concept", "Screenshots", "Evidence", "Risk level", "Recommendations"]
      },
      { title: "Remediation Guide", items: ["Fix recommendations", "Best practices", "Developer notes"] },
      { title: "Retest Report", items: ["Validation testing", "Resolved issues", "Updated report"] }
    ],
    faqs: [
      { question: "How long does a web pentest take?", answer: "Typically 1–2 weeks depending on scope and application complexity." },
      { question: "Do you sign an NDA?", answer: "Yes. All engagements are confidential and we sign your NDA before scoping." },
      { question: "Will testing affect production?", answer: "Testing is carefully planned. We prefer staging but can test production safely when required." },
      { question: "Is a retest included?", answer: "Yes. Every engagement includes one free retest after remediation." }
    ],
    ctaHeadline: "Ready to Assess Your Application?",
    ctaSubtitle: "Start with a controlled, authorized security assessment and understand where your application is truly exposed.",
    ctaText: "Request a Penetration Test"
  },
  {
    slug: "mobile-application-pentesting",
    title: "Mobile Application Pentesting",
    shortTitle: "Mobile App Pentesting",
    metaDescription:
      "iOS and Android penetration testing covering client-side security, API backends, data storage, and reverse engineering.",
    heroBadge: "AI + Human Penetration Testing Platform",
    heroTitle: "Mobile Application Penetration Testing",
    heroSubtitle:
      "Secure your mobile apps from the device layer to the backend API. We test iOS and Android applications for data leakage, insecure storage, API flaws, and reverse-engineering risks.",
    heroPrimaryCta: "Get Free Consultation",
    heroSecondaryCta: "Contact with Us",
    visual: "mobile",
    icon: "cpu",
    whyTitle: "Why Choose Mobile Application Pentesting?",
    whyItems: [
      { title: "Platform Coverage", text: "Dedicated testing for iOS, Android, and hybrid mobile apps." },
      { title: "Client & Server Side", text: "We test the app binary and its backend APIs together." },
      { title: "Data Protection", text: "Identify insecure storage, logging, and transmission of sensitive data." },
      { title: "Real Device Testing", text: "Testing on physical devices and emulators for accurate results." }
    ],
    overviewTitle: "What is Mobile Application Pentesting?",
    overviewText:
      "Mobile penetration testing evaluates your iOS and Android applications for security weaknesses at every layer — from local data storage and certificate pinning to backend API authorization and business logic. We combine static analysis, dynamic testing, and manual exploitation to mirror how attackers target mobile apps.",
    overviewList: [
      "iOS & Android app analysis",
      "Insecure data storage review",
      "API & backend testing",
      "Authentication & token handling",
      "Certificate pinning bypass",
      "Reverse engineering assessment"
    ],
    assessTitle: "What We Assess",
    assessItems: [
      "iOS Applications",
      "Android Applications",
      "Hybrid / React Native Apps",
      "Mobile Backend APIs",
      "Local Data Storage",
      "Network Communication",
      "Authentication & Biometrics",
      "Push Notification Security"
    ],
    standards: ["OWASP MASVS", "OWASP MSTG", "OWASP Mobile Top 10", "PTES", "NIST", "CWE", "CVSS"],
    processTitle: "Testing Process",
    processSteps: [
      { step: "01", title: "App Reconnaissance", text: "Review app stores, binaries, permissions, and backend endpoints." },
      { step: "02", title: "Static Analysis", text: "Inspect iOS and Android builds for insecure storage, secrets, and weak crypto." },
      { step: "03", title: "Dynamic Testing", text: "Instrument runtime behavior, traffic, and jailbreak or root scenarios." },
      { step: "04", title: "API & Backend Review", text: "Test mobile APIs for authz, session, and data-exposure flaws." },
      { step: "05", title: "Report & Retest", text: "Deliver platform-specific findings and verify fixes after remediation." }
    ],
    tools: ["Frida", "Objection", "MobSF", "Burp Suite", "jadx", "Hopper", "Postman", "ADB", "Nuclei"],
    industries: ["SaaS", "FinTech", "Healthcare", "E-Commerce", "Banking", "Enterprise", "Startups", "Government"],
    deliverables: [
      { title: "Executive Summary", items: ["App overview", "Risk summary", "Compliance notes"] },
      {
        title: "Technical Report",
        items: ["Platform-specific findings", "PoC steps", "Screenshots", "CVSS scores", "Risk ratings"]
      },
      { title: "Remediation Guide", items: ["Platform fix guidance", "Secure coding notes", "Best practices"] },
      { title: "Retest Report", items: ["Fix validation", "Updated findings", "Final sign-off"] }
    ],
    faqs: [
      { question: "Do you need source code?", answer: "No. We test black-box by default. Source code access can deepen coverage if available." },
      { question: "Which platforms do you support?", answer: "iOS, Android, and cross-platform frameworks like React Native and Flutter." },
      { question: "How long does mobile testing take?", answer: "Usually 1–2 weeks depending on app complexity and number of platforms." },
      { question: "Do you test backend APIs too?", answer: "Yes. Mobile apps are tested together with their API backends for full coverage." }
    ],
    ctaHeadline: "Ready to secure your mobile app?",
    ctaSubtitle: "Protect your users' data with a thorough mobile penetration test.",
    ctaText: "Request Assessment"
  },
  {
    slug: "cloud-penetration-testing",
    title: "Cloud Penetration Testing",
    shortTitle: "Cloud Pentesting",
    metaDescription:
      "AWS, Azure, and GCP penetration testing for misconfigurations, IAM weaknesses, exposed secrets, and cloud attack paths.",
    heroBadge: "AI + Human Penetration Testing Platform",
    heroTitle: "Cloud Penetration Testing",
    heroSubtitle:
      "Identify misconfigurations, privilege escalation paths, and exposed assets across your cloud environment before attackers find them.",
    heroPrimaryCta: "Get Free Consultation",
    heroSecondaryCta: "Contact with Us",
    visual: "cloud",
    icon: "cloud",
    whyTitle: "Why Choose Cloud Penetration Testing?",
    whyItems: [
      { title: "Misconfiguration Detection", text: "Find publicly exposed buckets, open security groups, and weak IAM policies." },
      { title: "Privilege Escalation", text: "Map attack paths from low-privilege access to admin control." },
      { title: "Multi-Cloud Support", text: "Testing across AWS, Azure, GCP, and hybrid environments." },
      { title: "Compliance Alignment", text: "Reports mapped to CIS benchmarks and cloud security frameworks." }
    ],
    overviewTitle: "What is Cloud Penetration Testing?",
    overviewText:
      "Cloud penetration testing evaluates your cloud infrastructure for security weaknesses unique to cloud environments — misconfigured IAM roles, exposed storage, overly permissive network policies, and secrets in code or environment variables. We simulate attacker techniques to validate your cloud security posture end to end.",
    overviewList: [
      "IAM & role policy review",
      "Storage & database exposure",
      "Network & firewall analysis",
      "Secrets & credential scanning",
      "Container & Kubernetes review",
      "Serverless function assessment"
    ],
    assessTitle: "What We Assess",
    assessItems: [
      "AWS Environments",
      "Azure Subscriptions",
      "Google Cloud Platform",
      "IAM & Access Policies",
      "S3 / Blob Storage",
      "Kubernetes Clusters",
      "Serverless Functions",
      "Network Configuration"
    ],
    standards: [
      "CIS Benchmarks",
      "NIST CSF",
      "ISO 27001",
      "SOC 2",
      "MITRE ATT&CK",
      "AWS Well-Architected",
      "PTES",
      "CVSS"
    ],
    processTitle: "Assessment Process",
    processSteps: [
      { step: "01", title: "Scope & Authorization", text: "Agree assets, accounts, permissions, and rules of engagement." },
      { step: "02", title: "Reconnaissance", text: "Discover cloud assets, identities, and public attack surface." },
      { step: "03", title: "Configuration Review", text: "Hunt IAM gaps, exposed storage, network holes, and secrets." },
      { step: "04", title: "Exploitation & Validation", text: "Prove privilege escalation and real impact without disruption." },
      { step: "05", title: "Reporting & Hardening", text: "Deliver findings, risk ratings, and cloud-specific fix guidance." }
    ],
    tools: [
      "AWS",
      "Microsoft Azure",
      "Google Cloud",
      "Kubernetes",
      "Terraform",
      "Docker",
      "Burp Suite",
      "Nmap",
      "Nuclei",
      "Prowler",
      "ScoutSuite",
      "kubectl",
      "TruffleHog",
      "Steampipe"
    ],
    industries: ["SaaS", "FinTech", "Healthcare", "Enterprise", "Government", "E-Commerce", "Startups", "Media"],
    deliverables: [
      { title: "Executive Summary", items: ["Cloud posture overview", "Critical risks", "Compliance gaps"] },
      {
        title: "Technical Report",
        items: ["Misconfiguration details", "Attack paths", "IAM findings", "Evidence", "CVSS scores"]
      },
      { title: "Hardening Guide", items: ["Cloud-specific fixes", "IAM recommendations", "Architecture notes"] },
      { title: "Retest Report", items: ["Fix validation", "Updated posture", "Final report"] }
    ],
    faqs: [
      { question: "Which cloud providers do you support?", answer: "AWS, Microsoft Azure, and Google Cloud Platform, including hybrid setups." },
      { question: "Do you need admin access?", answer: "Read-only or limited access is preferred. We scope access levels during kickoff." },
      { question: "Will this disrupt our cloud services?", answer: "No. Testing is non-destructive and coordinated with your team." },
      { question: "Can you test Kubernetes?", answer: "Yes. Container and Kubernetes security is included in cloud engagements." }
    ],
    ctaHeadline: "Ready to harden your cloud environment?",
    ctaSubtitle: "Gain visibility into cloud misconfigurations and attack paths before they're exploited.",
    ctaText: "Request Assessment"
  },
  {
    slug: "continuous-security-monitoring",
    title: "Continuous Security Monitoring",
    shortTitle: "Security Monitoring",
    metaDescription:
      "Continuous security monitoring with automated scanning, alerting, and ongoing vulnerability management for your applications and infrastructure.",
    heroBadge: "AI + Human Penetration Testing Platform",
    heroTitle: "Continuous Security Monitoring System",
    heroSubtitle:
      "Move from one-time assessments to ongoing visibility. Our monitoring system detects new vulnerabilities, misconfigurations, and exposure changes as your environment evolves.",
    heroPrimaryCta: "Get Free Consultation",
    heroSecondaryCta: "Contact with Us",
    visual: "monitoring",
    icon: "activity",
    whyTitle: "Why Choose Continuous Security Monitoring?",
    whyItems: [
      { title: "Always-On Visibility", text: "Detect new risks as code, infrastructure, and assets change." },
      { title: "Automated Scanning", text: "Scheduled scans for web apps, APIs, and cloud resources." },
      { title: "Alert & Triage", text: "Prioritized alerts with severity scoring so your team focuses on what matters." },
      { title: "Trend Reporting", text: "Track security posture improvements over time with monthly reports." }
    ],
    overviewTitle: "What is Continuous Security Monitoring?",
    overviewText:
      "Continuous Security Monitoring is an ongoing service that keeps watch over your applications, APIs, and cloud infrastructure. Instead of a single point-in-time test, we run scheduled assessments, monitor for new exposures, and alert your team when critical issues appear — so security keeps pace with your deployments.",
    overviewList: [
      "Scheduled vulnerability scans",
      "Asset & exposure monitoring",
      "Cloud configuration checks",
      "SSL & certificate monitoring",
      "Subdomain & attack surface tracking",
      "Monthly security reports"
    ],
    assessTitle: "What We Monitor",
    assessItems: [
      "Web Applications",
      "Public APIs",
      "Cloud Assets",
      "DNS & Subdomains",
      "SSL Certificates",
      "Open Ports & Services",
      "Credential Exposure",
      "Configuration Drift"
    ],
    standards: ["OWASP Top 10", "CIS Benchmarks", "CVSS", "NIST CSF", "MITRE ATT&CK", "CWE", "ISO 27001"],
    processTitle: "How It Works",
    processSteps: [
      { step: "01", title: "Baseline Assessment", text: "Establish current posture across apps, APIs, and cloud assets." },
      { step: "02", title: "Asset Discovery", text: "Inventory domains, services, certificates, and exposed infrastructure." },
      { step: "03", title: "Continuous Scanning", text: "Run scheduled checks as your environment and deployments change." },
      { step: "04", title: "Alert & Triage", text: "Send prioritized alerts so your team can act on what matters first." },
      { step: "05", title: "Monthly Reporting", text: "Track new findings, fixes, and security posture over time." }
    ],
    tools: ["Nuclei", "Burp Suite", "Nmap", "ScoutSuite", "Amass", "Subfinder", "SSL Labs", "Custom Dashboards", "Slack Alerts", "GitHub Actions"],
    industries: ["SaaS", "FinTech", "E-Commerce", "Healthcare", "Enterprise", "Startups", "Education", "Government"],
    deliverables: [
      { title: "Monitoring Dashboard", items: ["Live asset inventory", "Open findings", "Severity breakdown"] },
      { title: "Alert Notifications", items: ["Critical issue alerts", "Slack / email integration", "Triage guidance"] },
      { title: "Monthly Reports", items: ["New findings", "Resolved issues", "Trend analysis"] },
      { title: "Quarterly Review", items: ["Posture assessment", "Scope updates", "Strategic recommendations"] }
    ],
    faqs: [
      { question: "How is this different from a pentest?", answer: "Pentests are deep, manual engagements. Monitoring provides ongoing automated coverage between pentests." },
      { question: "How often do scans run?", answer: "Frequency is tailored to your environment — typically weekly or on each deployment." },
      { question: "Can we integrate with Slack?", answer: "Yes. Critical alerts can be delivered to Slack, email, or your ticketing system." },
      { question: "Does this replace annual pentesting?", answer: "No — it complements it. We recommend both for comprehensive coverage." }
    ],
    ctaHeadline: "Ready for always-on security?",
    ctaSubtitle: "Stop relying on annual tests alone. Get continuous visibility into your security posture.",
    ctaText: "Request Demo"
  },
  {
    slug: "api-security-testing",
    title: "API Security Testing",
    shortTitle: "API Security Testing",
    metaDescription:
      "API security testing for REST and GraphQL — authentication, authorization, BOLA/IDOR, tokens, abuse, and business logic.",
    heroBadge: "AI + Human Penetration Testing Platform",
    heroTitle: "API Security Testing",
    heroSubtitle:
      "Protect the services that power your product. We test authentication, authorization, tokens, object access, and API abuse paths attackers actually use.",
    heroPrimaryCta: "Get Free Consultation",
    heroSecondaryCta: "Contact with Us",
    visual: "web",
    icon: "code",
    whyTitle: "Why Choose API Security Testing?",
    whyItems: [
      { title: "AuthZ Depth", text: "BOLA/IDOR and privilege issues scanners routinely miss." },
      { title: "Token & Session Focus", text: "JWT, OAuth, API keys, and session handling reviewed end to end." },
      { title: "Abuse Scenarios", text: "Rate limits, mass assignment, and business-logic abuse." },
      { title: "Developer-Ready Reports", text: "Evidence, reproduction steps, and practical fix guidance." }
    ],
    overviewTitle: "What is API Security Testing?",
    overviewText:
      "API security testing evaluates how your APIs authenticate users, authorize object access, handle tokens, and resist abuse. We combine automated discovery with manual testing so authorization and business-logic flaws are validated — not just listed.",
    overviewList: [
      "Authentication & MFA flows",
      "Authorization / BOLA / IDOR",
      "Token and session security",
      "Excessive data exposure",
      "Rate limiting and abuse",
      "Business logic flaws"
    ],
    assessTitle: "What We Assess",
    assessItems: [
      "REST APIs",
      "GraphQL APIs",
      "Authentication endpoints",
      "Object-level authorization",
      "API gateways",
      "Webhook endpoints",
      "Partner / public APIs",
      "Mobile and web backends"
    ],
    standards: ["OWASP API Security Top 10", "OWASP ASVS", "PTES", "CWE", "CVSS", "NIST"],
    processTitle: "Testing Process",
    processSteps: [
      { step: "01", title: "Scope & Authorization", text: "Define APIs, environments, roles, and rules of engagement." },
      { step: "02", title: "Reconnaissance", text: "Map endpoints, schemas, auth flows, and attack surface." },
      { step: "03", title: "Security Testing", text: "Authn, authz, tokens, input validation, and abuse cases." },
      { step: "04", title: "Validation", text: "Prove impact safely with reproducible evidence." },
      { step: "05", title: "Report & Retest", text: "Deliver prioritized findings and verify fixes after remediation." }
    ],
    tools: ["Burp Suite", "Postman", "Insomnia", "Nuclei", "OWASP ZAP", "Custom scripts", "GraphQL tooling"],
    industries: ["SaaS", "FinTech", "E-Commerce", "Healthcare", "Enterprise", "Startups", "Mobile backends"],
    deliverables: [
      { title: "Executive Summary", items: ["API risk overview", "Business impact", "Priority actions"] },
      { title: "Technical Report", items: ["Endpoint evidence", "AuthZ findings", "CVSS ratings", "Fix guidance"] },
      { title: "Remediation Guide", items: ["Server-side checks", "Token hardening", "Developer notes"] },
      { title: "Retest Report", items: ["Fix validation", "Updated status", "Final sign-off"] }
    ],
    faqs: [
      { question: "Do you test GraphQL?", answer: "Yes. Query depth, authorization, and object access are included when in scope." },
      { question: "Do you need API documentation?", answer: "Docs help, but we can also discover and map APIs during reconnaissance." },
      { question: "Is BOLA/IDOR included?", answer: "Yes. Object-level and function-level authorization are core to every API engagement." },
      { question: "Is a retest included?", answer: "Yes. One free retest is included after remediation." }
    ],
    ctaHeadline: "Ready to harden your APIs?",
    ctaSubtitle: "Find authorization and abuse paths before attackers do.",
    ctaText: "Request Assessment"
  },
  {
    slug: "network-security-testing",
    title: "Network Security Testing",
    shortTitle: "Network Security Testing",
    metaDescription:
      "Network security testing for external and internal exposure — ports, services, segmentation, firewall rules, and attack paths.",
    heroBadge: "AI + Human Penetration Testing Platform",
    heroTitle: "Network Security Testing",
    heroSubtitle:
      "Identify exposed services, weak configurations, and attack paths across your network perimeter and internal segments before adversaries do.",
    heroPrimaryCta: "Get Free Consultation",
    heroSecondaryCta: "Contact with Us",
    visual: "cloud",
    icon: "network",
    whyTitle: "Why Choose Network Security Testing?",
    whyItems: [
      { title: "Exposure Mapping", text: "Discover open ports, services, and unexpected public assets." },
      { title: "Segmentation Checks", text: "Validate whether internal trust boundaries actually hold." },
      { title: "Attack Path Focus", text: "Connect findings into realistic paths an attacker could use." },
      { title: "Actionable Hardening", text: "Clear remediation prioritized by real risk." }
    ],
    overviewTitle: "What is Network Security Testing?",
    overviewText:
      "Network security testing evaluates your external perimeter and internal network for exposed services, weak configurations, insecure protocols, and paths that could lead to deeper compromise. We combine discovery, safe validation, and prioritized reporting.",
    overviewList: [
      "External attack surface mapping",
      "Port and service review",
      "Firewall and filtering checks",
      "Protocol and configuration weaknesses",
      "Internal segmentation testing",
      "Attack path analysis"
    ],
    assessTitle: "What We Assess",
    assessItems: [
      "Public IP ranges",
      "VPN and remote access",
      "Firewalls and ACLs",
      "Internal VLANs / segments",
      "Exposed admin services",
      "Legacy protocols",
      "Jump hosts",
      "Critical network services"
    ],
    standards: ["PTES", "NIST", "CIS Benchmarks", "MITRE ATT&CK", "CVSS", "CWE"],
    processTitle: "Testing Process",
    processSteps: [
      { step: "01", title: "Scope & Authorization", text: "Agree ranges, segments, windows, and safe testing rules." },
      { step: "02", title: "Discovery", text: "Inventory hosts, ports, services, and exposure." },
      { step: "03", title: "Security Testing", text: "Probe weaknesses and validate realistic attack paths." },
      { step: "04", title: "Impact Analysis", text: "Prioritize by exploitability and business impact." },
      { step: "05", title: "Report & Retest", text: "Deliver hardening guidance and verify remediation." }
    ],
    tools: ["Nmap", "Masscan", "Nuclei", "Burp Suite", "Wireshark", "Custom scripts", "Vulnerability scanners"],
    industries: ["Enterprise", "SaaS", "FinTech", "Healthcare", "Manufacturing", "Government", "Education"],
    deliverables: [
      { title: "Executive Summary", items: ["Exposure overview", "Critical paths", "Priority actions"] },
      { title: "Technical Report", items: ["Host/service findings", "Evidence", "Risk ratings", "Hardening steps"] },
      { title: "Attack Path Notes", items: ["Chained risks", "Trust boundary issues", "Remediation order"] },
      { title: "Retest Report", items: ["Fix validation", "Updated exposure", "Final status"] }
    ],
    faqs: [
      { question: "Do you test internal networks?", answer: "Yes. Internal segmentation testing can be included with authorized access." },
      { question: "Will testing disrupt production?", answer: "We use controlled techniques and agreed windows to minimize risk." },
      { question: "Do you need VPN access?", answer: "For internal testing, yes — scoped access is defined during kickoff." },
      { question: "Is a retest included?", answer: "Yes. One free retest is included after remediation." }
    ],
    ctaHeadline: "Ready to reduce network exposure?",
    ctaSubtitle: "Map your attack surface and close the paths that matter most.",
    ctaText: "Request Assessment"
  },
  {
    slug: "vulnerability-assessment",
    title: "Vulnerability Assessment",
    shortTitle: "Vulnerability Assessment",
    metaDescription:
      "Vulnerability assessment across apps, networks, and cloud assets — discovery, scanning, manual validation, risk scoring, and prioritized remediation.",
    heroBadge: "AI + Human Penetration Testing Platform",
    heroTitle: "Vulnerability Assessment",
    heroSubtitle:
      "Get a clear, prioritized view of known weaknesses across your environment — with manual validation so you fix what matters, not scanner noise.",
    heroPrimaryCta: "Get Free Consultation",
    heroSecondaryCta: "Contact with Us",
    visual: "monitoring",
    icon: "activity",
    whyTitle: "Why Choose Vulnerability Assessment?",
    whyItems: [
      { title: "Broad Coverage", text: "Apps, network assets, and cloud resources in one assessment." },
      { title: "Manual Validation", text: "Reduce false positives before they waste engineering time." },
      { title: "Risk Prioritization", text: "CVSS plus business context so teams know what to fix first." },
      { title: "Actionable Output", text: "Clear remediation guidance and optional retest." }
    ],
    overviewTitle: "What is a Vulnerability Assessment?",
    overviewText:
      "A vulnerability assessment identifies known weaknesses and misconfigurations across your assets, validates important findings, and ranks them by risk. It complements deeper penetration testing by giving you a structured, prioritized remediation roadmap.",
    overviewList: [
      "Asset inventory and discovery",
      "Authenticated and unauthenticated scanning",
      "Manual validation of key findings",
      "Misconfiguration review",
      "CVE and patch-gap analysis",
      "Prioritized remediation plan"
    ],
    assessTitle: "What We Assess",
    assessItems: [
      "Web applications",
      "Servers and endpoints",
      "Network services",
      "Cloud resources",
      "Container images",
      "Known CVE exposure",
      "Security misconfigurations",
      "Missing patches"
    ],
    standards: ["CVSS", "CVE/NVD", "CIS Benchmarks", "NIST CSF", "OWASP", "CWE"],
    processTitle: "Assessment Process",
    processSteps: [
      { step: "01", title: "Scope & Inventory", text: "Define assets, credentials, and assessment windows." },
      { step: "02", title: "Discovery & Scanning", text: "Identify hosts, services, and potential weaknesses." },
      { step: "03", title: "Manual Validation", text: "Confirm important findings and reduce false positives." },
      { step: "04", title: "Risk Scoring", text: "Prioritize by severity, exposure, and business impact." },
      { step: "05", title: "Report & Retest", text: "Deliver a remediation roadmap and verify critical fixes." }
    ],
    tools: ["Nuclei", "Nessus / OpenVAS-class scanners", "Nmap", "ScoutSuite", "Custom scripts", "CVE feeds"],
    industries: ["SaaS", "Enterprise", "FinTech", "Healthcare", "E-Commerce", "Education", "Government"],
    deliverables: [
      { title: "Executive Summary", items: ["Risk overview", "Top priorities", "Trend context"] },
      { title: "Validated Findings", items: ["Confirmed issues", "Evidence", "Severity ratings"] },
      { title: "Remediation Roadmap", items: ["Fix order", "Owner guidance", "Quick wins"] },
      { title: "Retest Report", items: ["Critical fix checks", "Updated status", "Residual risk"] }
    ],
    faqs: [
      { question: "How is this different from a pentest?", answer: "Assessments emphasize discovery and prioritization of known weaknesses. Pentests go deeper into manual exploitation and business logic." },
      { question: "Do you validate scanner findings?", answer: "Yes. Important findings are manually reviewed to reduce false positives." },
      { question: "Can this cover cloud assets?", answer: "Yes. Cloud resources and misconfigurations can be included in scope." },
      { question: "Is a retest included?", answer: "Critical remediation can be retested as part of the engagement." }
    ],
    ctaHeadline: "Ready for a clear risk picture?",
    ctaSubtitle: "Identify, validate, and prioritize vulnerabilities across your environment.",
    ctaText: "Request Assessment"
  }
];

export function getServicePage(slug: string): ServicePageContent | undefined {
  return SERVICE_PAGES.find((s) => s.slug === slug);
}

export function getAllServiceSlugs(): string[] {
  return SERVICE_PAGES.map((s) => s.slug);
}
