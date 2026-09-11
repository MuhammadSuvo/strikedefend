export type LongformFlow = string[];

export type LongformMapItem = { label: string; children?: string[] };

export type LongformTestArea = {
  title: string;
  intro: string;
  items: string[];
  goal: string;
  expectedTitle?: string;
  expectedFlow?: string[];
  abuseTitle?: string;
  abuseFlow?: string[];
};

export type LongformProcessStep = {
  step: string;
  title: string;
  intro: string;
  items: string[];
  footer: string;
  mapTitle?: string;
  mapItems?: LongformMapItem[];
};

export type LongformFinding = {
  vulnerabilityLabel: string;
  vulnerability: string;
  severityLabel: string;
  severity: string;
  componentLabel: string;
  component: string;
  riskLabel: string;
  risk: string;
  evidenceLabel: string;
  evidence: string;
  recommendationLabel: string;
  recommendation: string;
};

export type LongformHighlight = { title: string; text: string };

export type ServiceLongform = {
  introHeadline: string;
  introParagraphs: string[];
  heroHighlights: LongformHighlight[];
  heroTags: string[];
  platformBadge: string;
  platformTitle: string;
  platformIntro: string;
  platformItems: LongformHighlight[];
  heroCta: string;
  secondaryCta: string;
  bottomCta: string;
  whatWeTestTitle: string;
  whatWeTestIntro: string;
  testAreas: LongformTestArea[];
  howTitle: string;
  howIntro: string;
  howFlow: LongformFlow;
  howSteps: LongformProcessStep[];
  findingIntro: string;
  finding: LongformFinding;
  findingToFixTitle: string;
  findingToFixIntro: string;
  findingToFixFlow: LongformFlow;
  receiveTitle: string;
  receiveIntro: string;
  receiveItems: string[];
  receiveCards: LongformHighlight[];
  processOverview: { step: string; title: string; text: string }[];
  comparisonTitle: string;
  comparisonBlurb: string;
  comparisonCta: string;
  scannerCode: string;
  testerCode: string;
  scannerResult: string;
  testerResult: string;
  whyManualTitle: string;
  whyManualIntro: string;
  scannerTitle: string;
  scannerFlow: LongformFlow;
  testerTitle: string;
  testerFlow: LongformFlow;
  whyManualConclusion: string;
  contextTitle: string;
  contextQuote1: string;
  contextQuote2: string;
  contextIntro: string;
  contextItems: string[];
  questionsTitle: string;
  questionsIntro: string;
  questions: string[];
  closeTitle: string;
  closeBody: string;
  closeHighlights: string[];
  closeQuestion: string;
};

export const AI_PLATFORM_DEFAULTS = {
  platformBadge: "AI + Human Penetration Testing Platform",
  platformTitle: "AI + Human Penetration Testing Platform",
  platformIntro:
    "We combine AI-powered analysis with senior penetration testers — delivering faster coverage and the human judgment attackers still require.",
  platformItems: [
    {
      title: "AI-Assisted Discovery",
      text: "Intelligent automation accelerates reconnaissance, pattern matching, and coverage across large attack surfaces."
    },
    {
      title: "Human Validation",
      text: "Expert testers confirm real impact, chain findings, and uncover business-logic flaws tools alone miss."
    },
    {
      title: "Smarter Prioritization",
      text: "Risk is ranked by exploitability and business harm — so your team fixes what matters first."
    }
  ],
  aiIntroLine:
    "Powered by our AI + Human Penetration Testing Platform: machine-speed analysis guided by expert testers who prove real-world risk.",
  aiHighlight: {
    title: "AI + Human Platform",
    text: "AI-assisted coverage with expert validation."
  }
} as const;

/** Fill AI + Human platform messaging while preserving service-specific copy. */
export function withAiPlatform(
  longform: Omit<ServiceLongform, "platformBadge" | "platformTitle" | "platformIntro" | "platformItems"> &
    Partial<Pick<ServiceLongform, "platformBadge" | "platformTitle" | "platformIntro" | "platformItems">>
): ServiceLongform {
  const hasAiIntro = longform.introParagraphs.some((p) => /AI\s*\+\s*Human/i.test(p));
  const highlights = [...longform.heroHighlights];
  const hasAiHighlight = highlights.some((h) => /AI\s*\+\s*Human/i.test(h.title));
  if (!hasAiHighlight) {
    highlights.unshift({ ...AI_PLATFORM_DEFAULTS.aiHighlight });
    if (highlights.length > 4) highlights.pop();
  }
  const tags = longform.heroTags.some((t) => /AI\s*\+\s*Human/i.test(t))
    ? longform.heroTags
    : ["AI + Human", ...longform.heroTags];
  const blurb = (longform.comparisonBlurb || "").trim();
  const comparisonBlurb =
    !blurb
      ? "Our AI + Human Penetration Testing Platform pairs intelligent automation with senior testers who prove real risk — not just scanner noise."
      : /AI\s*\+\s*Human/i.test(blurb)
        ? blurb
        : `${blurb} Built on our AI + Human Penetration Testing Platform.`;

  return {
    ...longform,
    platformBadge: longform.platformBadge || AI_PLATFORM_DEFAULTS.platformBadge,
    platformTitle: longform.platformTitle || AI_PLATFORM_DEFAULTS.platformTitle,
    platformIntro: longform.platformIntro || AI_PLATFORM_DEFAULTS.platformIntro,
    platformItems: longform.platformItems?.length
      ? longform.platformItems
      : AI_PLATFORM_DEFAULTS.platformItems.map((item) => ({ ...item })),
    introParagraphs: hasAiIntro
      ? longform.introParagraphs
      : [...longform.introParagraphs, AI_PLATFORM_DEFAULTS.aiIntroLine],
    heroHighlights: highlights,
    heroTags: tags.slice(0, 6),
    comparisonBlurb,
    scannerTitle:
      longform.scannerTitle === "Scanner" || longform.scannerTitle === "What Scanners See"
        ? "AI / Scanners Alone"
        : longform.scannerTitle,
    testerTitle:
      longform.testerTitle === "Penetration tester" || longform.testerTitle === "What We Find"
        ? "AI + Human Testing"
        : longform.testerTitle
  };
}

export const EMPTY_LONGFORM: ServiceLongform = {
  introHeadline: "",
  introParagraphs: [],
  heroHighlights: [],
  heroTags: [],
  platformBadge: AI_PLATFORM_DEFAULTS.platformBadge,
  platformTitle: AI_PLATFORM_DEFAULTS.platformTitle,
  platformIntro: AI_PLATFORM_DEFAULTS.platformIntro,
  platformItems: AI_PLATFORM_DEFAULTS.platformItems.map((item) => ({ ...item })),
  heroCta: "Request a Security Assessment",
  secondaryCta: "View Our Process",
  bottomCta: "Get Started Now",
  whatWeTestTitle: "What We Test",
  whatWeTestIntro: "",
  testAreas: [],
  howTitle: "How Our Penetration Testing Works",
  howIntro: "",
  howFlow: [],
  howSteps: [],
  findingIntro: "",
  finding: {
    vulnerabilityLabel: "Vulnerability",
    vulnerability: "",
    severityLabel: "Severity",
    severity: "",
    componentLabel: "Affected Component",
    component: "",
    riskLabel: "Risk",
    risk: "",
    evidenceLabel: "Evidence",
    evidence: "",
    recommendationLabel: "Recommendation",
    recommendation: ""
  },
  findingToFixTitle: "From Finding to Fix",
  findingToFixIntro: "",
  findingToFixFlow: [],
  receiveTitle: "What You Receive",
  receiveIntro: "",
  receiveItems: [],
  receiveCards: [],
  processOverview: [],
  comparisonTitle: "Beyond Automated Scanning",
  comparisonBlurb: "",
  comparisonCta: "Learn How We Think",
  scannerCode: "",
  testerCode: "",
  scannerResult: "",
  testerResult: "",
  whyManualTitle: "Why Manual Penetration Testing Matters",
  whyManualIntro: "",
  scannerTitle: "Scanner",
  scannerFlow: [],
  testerTitle: "Penetration tester",
  testerFlow: [],
  whyManualConclusion: "",
  contextTitle: "Security Testing With Real Business Context",
  contextQuote1: "",
  contextQuote2: "",
  contextIntro: "",
  contextItems: [],
  questionsTitle: "Security Should Be Tested Before It Becomes an Incident",
  questionsIntro: "",
  questions: [],
  closeTitle: "",
  closeBody: "",
  closeHighlights: [],
  closeQuestion: ""
};

export const WEB_LONGFORM = withAiPlatform({
  introHeadline: "Find Vulnerabilities. Protect What Matters.",
  introParagraphs: [
    "We identify the security weaknesses attackers actually exploit — then give your team a clear path to fix them before they become an incident."
  ],
  heroHighlights: [
    { title: "Expert Security Testers", text: "Senior engineers, not scanners alone." },
    { title: "Real-World Attack Simulation", text: "We test the way attackers think." },
    { title: "Detailed Actionable Reports", text: "Evidence, impact, and fix guidance." },
    { title: "Fix & Retest Included", text: "We verify remediation after you patch." }
  ],
  heroTags: ["Authentication", "API Security", "SQL Injection", "Access Control", "XSS"],
  heroCta: "Request a Security Assessment",
  secondaryCta: "View Our Process",
  bottomCta: "Get Started Now",
  whatWeTestTitle: "What We Test",
  whatWeTestIntro: "Our assessment covers the major security areas of your web application.",
  testAreas: [
    {
      title: "Authentication Security",
      intro: "We evaluate how securely users access your application. Testing can include:",
      items: [
        "Login functionality",
        "Password policies",
        "MFA implementation",
        "Password reset flows",
        "Account enumeration",
        "Brute-force protections",
        "Authentication bypass scenarios"
      ],
      goal: "Prevent unauthorized users from gaining access to accounts."
    },
    {
      title: "Authorization & Access Control",
      intro: "Authentication answers **“Who are you?”** Authorization answers **“What are you allowed to do?”** We test whether users can access data or functionality outside their assigned permissions. Examples include:",
      items: [
        "IDOR / Broken Object Level Authorization",
        "Role manipulation",
        "Horizontal privilege escalation",
        "Vertical privilege escalation",
        "Unauthorized resource access",
        "Admin functionality exposure"
      ],
      goal: "Ensure users can only access the resources and actions they are authorized to use."
    },
    {
      title: "Input Validation & Injection Testing",
      intro: "Applications constantly process user-controlled input. We examine how securely that input is handled and test for vulnerabilities such as:",
      items: [
        "Cross-Site Scripting (XSS)",
        "SQL Injection",
        "Command Injection",
        "Server-Side Template Injection",
        "Path Traversal",
        "Parameter manipulation",
        "Malicious file uploads"
      ],
      goal: "Prevent user input from becoming executable commands, scripts, or database queries."
    },
    {
      title: "API Security Testing",
      intro: "Modern applications often depend heavily on APIs. We test APIs for weaknesses involving:",
      items: [
        "Authentication",
        "Authorization",
        "Token handling",
        "Object access",
        "Parameter manipulation",
        "Excessive data exposure",
        "Rate limiting",
        "Mass assignment",
        "Business logic abuse"
      ],
      goal: "Protect the services and data powering your web application. API testing is aligned with common OWASP API Security risks."
    },
    {
      title: "Session Management Testing",
      intro: "A secure login is not enough if the user session itself can be compromised. We review:",
      items: [
        "Session cookies",
        "Authentication tokens",
        "Session expiration",
        "Logout functionality",
        "Token invalidation",
        "Session fixation",
        "Cookie security attributes"
      ],
      goal: "Prevent stolen or manipulated sessions from being used to hijack user accounts."
    },
    {
      title: "Business Logic Testing",
      intro: "Some of the most serious vulnerabilities cannot be discovered by scanners. Our testers analyze how your application is intended to work and look for ways those workflows could be abused.",
      items: [
        "Price manipulation",
        "Workflow bypass",
        "Coupon abuse",
        "Payment manipulation",
        "Quantity manipulation",
        "Approval bypass",
        "Unauthorized state changes"
      ],
      goal: "Protect not only your application code, but also your business processes.",
      expectedTitle: "Expected workflow",
      expectedFlow: ["User selects product", "Price calculated", "Payment completed", "Order created"],
      abuseTitle: "Possible abuse scenario",
      abuseFlow: [
        "User selects product",
        "Request intercepted",
        "Price / quantity manipulated",
        "Server accepts modified request",
        "Unexpected business impact"
      ]
    }
  ],
  howTitle: "Our Testing Process",
  howIntro: "A structured assessment from authorization through retest.",
  howFlow: [
    "Scope & Authorization",
    "Reconnaissance",
    "Attack Surface Mapping",
    "Security Testing",
    "Manual Exploitation",
    "Impact Validation",
    "Risk Assessment",
    "Detailed Reporting",
    "Remediation",
    "Retesting"
  ],
  howSteps: [
    {
      step: "01",
      title: "Scope & Authorization",
      intro: "Every engagement starts by defining exactly what can and cannot be tested. We establish:",
      items: [
        "Target applications",
        "Domains and APIs",
        "Test environments",
        "User roles",
        "Allowed testing techniques",
        "Testing windows",
        "Restricted activities"
      ],
      footer: "This ensures testing remains **controlled, authorized, and safe**."
    },
    {
      step: "02",
      title: "Reconnaissance",
      intro: "We explore the application to understand its attack surface. We identify:",
      items: [
        "Pages",
        "APIs",
        "Parameters",
        "Authentication flows",
        "User roles",
        "Technologies",
        "Third-party integrations",
        "Sensitive functionality"
      ],
      footer: "The objective is to understand the application the way an attacker might."
    },
    {
      step: "03",
      title: "Attack Surface Mapping",
      intro: "Every discovered component becomes part of the security test map.",
      items: [],
      footer: "This helps ensure critical functionality is not overlooked.",
      mapTitle: "Web Application",
      mapItems: [
        { label: "Login" },
        { label: "Registration" },
        { label: "User Profile" },
        { label: "Admin Panel" },
        { label: "File Upload" },
        { label: "Search" },
        { label: "Payments" },
        { label: "APIs", children: ["Users", "Orders", "Products", "Payments"] }
      ]
    },
    {
      step: "04",
      title: "Security Testing",
      intro: "Testing is performed across multiple security areas. Automated tools help discover potential weaknesses, while manual testing validates whether they represent real security risks.",
      items: [],
      footer: "",
      mapTitle: "Application",
      mapItems: [
        { label: "Authentication" },
        { label: "Authorization" },
        { label: "Session Management" },
        { label: "Input Validation" },
        { label: "API Security" },
        { label: "Business Logic" },
        { label: "Configuration" },
        { label: "Client-Side Security" }
      ]
    },
    {
      step: "05",
      title: "Exploitation & Validation",
      intro: "Potential vulnerabilities are carefully validated to determine whether they can actually be exploited. We focus on proving impact while minimizing risk to the environment. Each confirmed issue is supported by evidence such as:",
      items: [
        "Request and response details",
        "Reproduction steps",
        "Screenshots",
        "Technical explanation",
        "Observed security impact"
      ],
      footer: ""
    },
    {
      step: "06",
      title: "Risk Assessment",
      intro: "Not every vulnerability carries the same level of risk. We evaluate findings based on factors such as:",
      items: [
        "Exploitability",
        "Required privileges",
        "Data exposure",
        "Business impact",
        "Technical impact",
        "Attack complexity"
      ],
      footer: "Findings are prioritized so your team knows **what needs attention first**."
    },
    {
      step: "07",
      title: "Actionable Reporting",
      intro: "You receive more than a vulnerability list. Each confirmed finding can include:",
      items: [],
      footer: "This gives developers the information they need to understand, reproduce, and fix the issue."
    }
  ],
  findingIntro: "Each confirmed finding can include:",
  finding: {
    vulnerabilityLabel: "Vulnerability",
    vulnerability: "Broken Object Level Authorization",
    severityLabel: "Severity",
    severity: "High",
    componentLabel: "Affected Component",
    component: "GET /api/users/{userId}",
    riskLabel: "Risk",
    risk: "Authenticated users may access information belonging to other users.",
    evidenceLabel: "Evidence",
    evidence: "Reproducible request and response demonstrating unauthorized access.",
    recommendationLabel: "Recommendation",
    recommendation: "Implement server-side ownership and authorization validation for every object request."
  },
  findingToFixTitle: "From Finding to Fix",
  findingToFixIntro: "Our work does not have to end when the report is delivered. Retesting confirms whether vulnerabilities have been properly resolved and whether the remediation introduced additional security concerns.",
  findingToFixFlow: [
    "Vulnerability Found",
    "Technical Validation",
    "Risk Prioritization",
    "Developer Remediation",
    "Security Retest",
    "Verified Fix"
  ],
  receiveTitle: "What You Receive",
  receiveIntro: "Everything your developers and leadership need to understand risk and fix it.",
  receiveItems: [
    "Executive security summary",
    "Detailed technical penetration-testing report",
    "Confirmed vulnerability findings",
    "Severity and risk ratings",
    "Reproduction steps",
    "Supporting evidence",
    "Remediation recommendations",
    "Vulnerability prioritization",
    "Retest results"
  ],
  receiveCards: [
    { title: "Executive Summary", text: "A clear view of risk for leadership, without the noise." },
    { title: "Validated Findings", text: "Every issue is confirmed, reproducible, and in scope." },
    { title: "Risk Prioritization", text: "Know what to fix first based on real business impact." },
    { title: "Technical Evidence", text: "Requests, responses, and steps your developers can follow." },
    { title: "Remediation Guidance", text: "Practical fix recommendations, not generic scanner text." },
    { title: "Retest Results", text: "We verify patches and check that fixes did not create new issues." }
  ],
  processOverview: [
    { step: "1", title: "Scope", text: "Agree targets, roles, and rules of engagement." },
    { step: "2", title: "Discover", text: "Map pages, APIs, and the attack surface." },
    { step: "3", title: "Map", text: "Chart users, workflows, and critical functions." },
    { step: "4", title: "Test", text: "Manual testing across auth, APIs, and logic." },
    { step: "5", title: "Validate", text: "Prove impact safely with evidence." },
    { step: "6", title: "Analyze", text: "Score risk by exploitability and business harm." },
    { step: "7", title: "Report", text: "Deliver findings your team can act on." },
    { step: "8", title: "Fix & Retest", text: "Verify remediation after you patch." }
  ],
  comparisonTitle: "Beyond Automated Scanning",
  comparisonBlurb: "Attackers don't follow the rules. We test workflows, permissions, and business logic scanners never see.",
  comparisonCta: "Learn How We Think",
  scannerCode: "GET /api/users/123 HTTP/1.1\nHost: app.example.com\n\nHTTP/1.1 200 OK",
  testerCode: "GET /api/users/124 HTTP/1.1\nAuthorization: Bearer <session>\n\nUser ID changed. Another user's data returned.",
  scannerResult: "No issues found.",
  testerResult: "High Risk Vulnerability",
  whyManualTitle: "Why Manual Penetration Testing Matters",
  whyManualIntro: "Automated scanners are valuable, but they cannot fully understand how your business works.",
  scannerTitle: "Scanner",
  scannerFlow: ["Scanner", "Endpoint returned HTTP 200", "No issue detected"],
  testerTitle: "Penetration tester",
  testerFlow: [
    "Should this user be allowed to access this endpoint?",
    "No",
    "Authorization vulnerability discovered"
  ],
  whyManualConclusion: "That difference is why our approach combines **Automation + Human Analysis + Business Context**.",
  contextTitle: "Security Testing With Real Business Context",
  contextQuote1: "Is the endpoint technically vulnerable?",
  contextQuote2: "What could an attacker actually achieve?",
  contextIntro: "This helps uncover risks involving:",
  contextItems: [
    "Customer information",
    "Financial transactions",
    "Administrative privileges",
    "Confidential documents",
    "Internal workflows",
    "Sensitive APIs",
    "Business-critical operations"
  ],
  questionsTitle: "Security Should Be Tested Before It Becomes an Incident",
  questionsIntro: "Your application may appear to work perfectly while still containing hidden security weaknesses. A penetration test helps answer important questions:",
  questions: [
    "Can one customer access another customer's information?",
    "Can normal users reach administrative functionality?",
    "Can API parameters be manipulated?",
    "Can application workflows be bypassed?",
    "Can sensitive information be exposed?",
    "Can an attacker turn a small vulnerability into a larger compromise?"
  ],
  closeTitle: "Secure Today. Stay Protected Tomorrow.",
  closeBody:
    "Whether you are preparing for a production release, reviewing an existing application, or strengthening your security program, penetration testing provides a realistic view of your application's security posture.",
  closeHighlights: [
    "Discover vulnerabilities.",
    "Understand the real risk.",
    "Fix what matters.",
    "Verify the remediation."
  ],
  closeQuestion: "Ready to Assess Your Application? Start with a controlled, authorized security assessment and understand where your application is truly exposed."
});

export const MONITORING_LONGFORM = withAiPlatform({
  introHeadline: "Proactive Security. Real-Time Visibility. Faster Response.",
  introParagraphs: [
    "Move beyond point-in-time tests. Continuous Security Monitoring keeps watch over your assets, alerts on real risk, and helps your team respond before issues become incidents."
  ],
  heroHighlights: [
    { title: "24/7 Visibility", text: "Ongoing observation of logs, events, and changes." },
    { title: "Faster Detection", text: "Suspicious activity and anomalies flagged early." },
    { title: "Guided Response", text: "Triage, contain, and improve controls with clear next steps." },
    { title: "Continuous Improvement", text: "Metrics, trends, and recommendations every cycle." }
  ],
  heroTags: ["Asset Discovery", "Cloud Monitoring", "Identity & Access", "API Monitoring", "SIEM Visibility"],
  heroCta: "Request Monitoring Demo",
  secondaryCta: "View Our Process",
  bottomCta: "Start Continuous Monitoring",
  whatWeTestTitle: "What We Monitor",
  whatWeTestIntro: "Coverage across the domains that matter for continuous risk reduction.",
  testAreas: [
    {
      title: "Network Monitoring",
      intro: "We watch network exposure and traffic patterns for unexpected risk.",
      items: ["Traffic analysis", "Open ports", "Public exposure", "Service changes"],
      goal: "Traffic, ports, exposure."
    },
    {
      title: "Endpoint Monitoring",
      intro: "We track device health and malware-related signals across your endpoints.",
      items: ["Device inventory", "Malware indicators", "Health checks", "Configuration drift"],
      goal: "Devices, malware, health."
    },
    {
      title: "Cloud Monitoring",
      intro: "We monitor cloud accounts, configurations, and activity for risky changes.",
      items: ["Account activity", "Misconfigurations", "Public resources", "Privilege changes"],
      goal: "Accounts, configurations, activity."
    },
    {
      title: "Application & API Monitoring",
      intro: "We look for errors, abuse patterns, and suspicious requests against apps and APIs.",
      items: ["Error spikes", "Abuse signals", "Suspicious requests", "Auth anomalies"],
      goal: "Errors, abuse, suspicious requests."
    },
    {
      title: "Identity & Access Monitoring",
      intro: "We monitor login activity, privilege changes, and MFA-related events.",
      items: ["Login anomalies", "Privilege changes", "MFA events", "Access reviews"],
      goal: "Logins, privileges, MFA events."
    },
    {
      title: "Log & SIEM Visibility",
      intro: "We correlate events into actionable dashboards your team can use.",
      items: ["Correlated events", "Dashboards", "Alert routing", "Trend views"],
      goal: "Correlated events, dashboards."
    }
  ],
  howTitle: "Continuous Security Lifecycle",
  howIntro: "A continuous loop from discovery through reporting and improvement.",
  howFlow: [
    "Asset Discovery",
    "Baseline & Configuration Review",
    "Continuous Monitoring",
    "Alerting & Detection",
    "Investigation & Triage",
    "Response & Remediation",
    "Reporting & Improvement"
  ],
  howSteps: [],
  findingIntro: "",
  finding: { ...EMPTY_LONGFORM.finding },
  findingToFixTitle: "From Alert to Fix",
  findingToFixIntro: "",
  findingToFixFlow: [],
  receiveTitle: "What You Receive",
  receiveIntro: "Ongoing visibility your security and engineering teams can act on.",
  receiveItems: [
    "Live monitoring dashboard",
    "Prioritized alerts",
    "Investigation guidance",
    "Remediation recommendations",
    "Monthly posture reports",
    "Trend and risk metrics"
  ],
  receiveCards: [
    { title: "Monitoring Dashboard", text: "Live asset inventory, open findings, and severity breakdown." },
    { title: "Alert Notifications", text: "Critical issue alerts via Slack, email, or ticketing." },
    { title: "Investigation Notes", text: "Validate, prioritize, and assess impact with clear context." },
    { title: "Remediation Guidance", text: "Contain, fix, and improve controls with actionable steps." },
    { title: "Monthly Reports", text: "New findings, resolved issues, and posture trends." },
    { title: "Continuous Improvement", text: "Metrics and recommendations that tighten security over time." }
  ],
  processOverview: [
    { step: "1", title: "Asset Discovery", text: "Inventory systems, apps, APIs, and cloud assets." },
    { step: "2", title: "Baseline Review", text: "Secure settings and expected state." },
    { step: "3", title: "Continuous Monitoring", text: "24/7 observation of logs, events, and changes." },
    { step: "4", title: "Alerting & Detection", text: "Suspicious activity, anomalies, and threats." },
    { step: "5", title: "Investigation & Triage", text: "Validate, prioritize, and assess impact." },
    { step: "6", title: "Response & Remediation", text: "Contain, fix, and improve controls." },
    { step: "7", title: "Reporting & Improvement", text: "Metrics, trends, and recommendations." }
  ],
  comparisonTitle: "Beyond Point-in-Time Testing",
  comparisonBlurb:
    "Annual assessments leave gaps between engagements. Continuous monitoring closes that window with real-time visibility and faster response.",
  comparisonCta: "Talk to a Security Expert",
  scannerCode: "Last pentest: 11 months ago\nNew subdomain published: api-staging.example.com\nOpen port: 8443\n\nStatus: Unknown risk until next annual test",
  testerCode: "Asset change detected: api-staging.example.com\nExposure alert: public service on 8443\nTriage: high priority\nResponse: contain + harden within hours",
  scannerResult: "Blind spot until next test",
  testerResult: "Detected and actioned continuously",
  whyManualTitle: "",
  whyManualIntro: "",
  scannerTitle: "Point-in-Time Testing",
  scannerFlow: [],
  testerTitle: "Continuous Monitoring",
  testerFlow: [],
  whyManualConclusion: "",
  contextTitle: "",
  contextQuote1: "",
  contextQuote2: "",
  contextIntro: "",
  contextItems: [],
  questionsTitle: "",
  questionsIntro: "",
  questions: [],
  closeTitle: "Stay Protected Between Pentests.",
  closeBody:
    "Authorized security monitoring and continuous risk reduction — so your team sees exposure as it appears, not months later.",
  closeHighlights: [
    "Discover assets.",
    "Detect threats early.",
    "Respond faster.",
    "Improve continuously."
  ],
  closeQuestion: "Ready for always-on security visibility?"
});

export const MOBILE_LONGFORM = withAiPlatform({
  introHeadline: "Secure Mobile Apps End to End.",
  introParagraphs: [
    "We test iOS and Android applications from the device layer to the backend API — finding insecure storage, weak auth, API flaws, and real exploit paths before attackers do."
  ],
  heroHighlights: [
    { title: "iOS & Android Coverage", text: "Native and hybrid apps tested on real attack paths." },
    { title: "Static + Dynamic Testing", text: "Binaries, runtime behavior, traffic, and storage." },
    { title: "API & Backend Included", text: "Mobile clients and their services tested together." },
    { title: "Fix & Retest Included", text: "We verify remediation after you patch." }
  ],
  heroTags: ["Authentication", "Local Storage", "API Security", "Session Management", "Device Security"],
  heroCta: "Request a Mobile Assessment",
  secondaryCta: "View Our Process",
  bottomCta: "Get Started Now",
  whatWeTestTitle: "What We Test",
  whatWeTestIntro: "Focused testing areas across the mobile application and its backend.",
  testAreas: [
    {
      title: "Authentication Testing",
      intro: "We evaluate how securely users authenticate into the mobile app.",
      items: ["Login flows", "MFA", "Password resets", "Biometrics", "Account recovery"],
      goal: "Login, MFA, resets."
    },
    {
      title: "Local Data Storage",
      intro: "We inspect how sensitive data is stored on the device.",
      items: ["Files", "Cache", "Secrets", "Keychain / Keystore", "Logs"],
      goal: "Files, cache, secrets."
    },
    {
      title: "Device & Platform Security",
      intro: "We assess platform controls and device-level exposure.",
      items: ["Root / jailbreak detection", "Permissions", "Debug flags", "Binary protections"],
      goal: "Root/jailbreak, permissions."
    },
    {
      title: "API & Backend Testing",
      intro: "We test the services powering the mobile app for abuse and access flaws.",
      items: ["Tokens", "Endpoints", "Authorization", "Abuse scenarios", "Data exposure"],
      goal: "Tokens, endpoints, abuse."
    },
    {
      title: "Session Management",
      intro: "We review how sessions and tokens remain valid and secure over time.",
      items: ["Cookies", "Tokens", "Timeouts", "Logout", "Token invalidation"],
      goal: "Cookies, tokens, timeout."
    },
    {
      title: "Input Validation & Logic",
      intro: "We look for injection flaws and business-logic abuse unique to mobile workflows.",
      items: ["XSS", "Injection", "Business logic", "Parameter manipulation", "Workflow bypass"],
      goal: "XSS, injection, business logic."
    }
  ],
  howTitle: "Our Testing Process",
  howIntro: "A structured mobile assessment from authorization through retest.",
  howFlow: [
    "Scope & Authorization",
    "Reconnaissance",
    "Static Analysis",
    "Dynamic Testing",
    "Exploitation & Validation",
    "Reporting & Remediation",
    "Retest & Verification"
  ],
  howSteps: [],
  findingIntro: "",
  finding: { ...EMPTY_LONGFORM.finding },
  findingToFixTitle: "From Finding to Fix",
  findingToFixIntro: "",
  findingToFixFlow: [],
  receiveTitle: "What You Receive",
  receiveIntro: "Clear findings your mobile and backend teams can act on.",
  receiveItems: [
    "Executive summary",
    "Platform-specific findings",
    "Evidence and reproduction steps",
    "Risk ratings",
    "Remediation guidance",
    "Retest results"
  ],
  receiveCards: [
    { title: "Executive Summary", text: "A clear view of mobile app risk for leadership." },
    { title: "Platform Findings", text: "iOS and Android issues with impact and evidence." },
    { title: "API & Backend Issues", text: "Token, endpoint, and authorization weaknesses." },
    { title: "Technical Evidence", text: "Requests, screenshots, and steps developers can follow." },
    { title: "Remediation Guidance", text: "Practical fixes for client and server-side flaws." },
    { title: "Retest Results", text: "We verify patches and confirm issues are resolved." }
  ],
  processOverview: [
    { step: "1", title: "Scope & Authorization", text: "Apps, platforms, environments." },
    { step: "2", title: "Reconnaissance", text: "Map screens, APIs, permissions." },
    { step: "3", title: "Static Analysis", text: "Code, binaries, secrets." },
    { step: "4", title: "Dynamic Testing", text: "Runtime behavior, traffic, storage." },
    { step: "5", title: "Exploitation & Validation", text: "Safely verify real impact." },
    { step: "6", title: "Reporting & Remediation", text: "Findings, risk, fixes." },
    { step: "7", title: "Retest & Verification", text: "Confirm vulnerabilities are resolved." }
  ],
  comparisonTitle: "Beyond Automated Mobile Scans",
  comparisonBlurb:
    "Scanners miss runtime abuse, insecure storage paths, and business-logic flaws. We combine static analysis, dynamic testing, and manual exploitation on real mobile attack paths.",
  comparisonCta: "Talk to a Security Expert",
  scannerCode: "Scan APK/IPA\nCheck known CVEs\nFlag insecure permissions\n\nResult: Limited client-side findings",
  testerCode: "Intercept mobile API traffic\nModify auth token / object ID\nAccess another user's data\n\nResult: Confirmed high-risk IDOR",
  scannerResult: "Surface-level issues only",
  testerResult: "Real exploit path validated",
  whyManualTitle: "",
  whyManualIntro: "",
  scannerTitle: "Automated Mobile Scan",
  scannerFlow: [],
  testerTitle: "Manual Mobile Pentest",
  testerFlow: [],
  whyManualConclusion: "",
  contextTitle: "",
  contextQuote1: "",
  contextQuote2: "",
  contextIntro: "",
  contextItems: [],
  questionsTitle: "",
  questionsIntro: "",
  questions: [],
  closeTitle: "Protect Your Mobile App Users.",
  closeBody:
    "Authorized security testing only — from device storage and sessions to APIs and business logic, with clear remediation and retest.",
  closeHighlights: [
    "Find mobile vulnerabilities.",
    "Validate real impact.",
    "Fix what matters.",
    "Verify the remediation."
  ],
  closeQuestion: "Ready to secure your mobile application?"
});

export const API_LONGFORM = withAiPlatform({
  introHeadline: "Secure the APIs That Power Your Product.",
  introParagraphs: [
    "We test REST and GraphQL APIs for authentication flaws, broken object authorization, token weaknesses, and abuse paths scanners miss — then help your team fix what matters."
  ],
  heroHighlights: [
    { title: "AuthZ Expertise", text: "BOLA/IDOR and privilege issues validated manually." },
    { title: "Token & Session Focus", text: "JWT, OAuth, API keys, and session handling reviewed." },
    { title: "Abuse Path Testing", text: "Rate limits, mass assignment, and logic abuse." },
    { title: "Fix & Retest Included", text: "We verify remediation after you patch." }
  ],
  heroTags: ["Authentication", "BOLA / IDOR", "Tokens", "Rate Limiting", "Business Logic"],
  heroCta: "Request an API Assessment",
  secondaryCta: "View Our Process",
  bottomCta: "Get Started Now",
  whatWeTestTitle: "What We Test",
  whatWeTestIntro: "Focused coverage across the API risks that lead to real compromise.",
  testAreas: [
    {
      title: "Authentication Testing",
      intro: "We evaluate how clients prove identity to your APIs.",
      items: ["Login flows", "MFA", "API keys", "OAuth / OIDC", "Credential stuffing defenses"],
      goal: "Login, MFA, identity."
    },
    {
      title: "Authorization & BOLA",
      intro: "We test whether users can access objects or actions outside their permissions.",
      items: ["IDOR / BOLA", "Function-level authz", "Role escalation", "Tenant isolation"],
      goal: "Object and role access control."
    },
    {
      title: "Tokens & Sessions",
      intro: "We review how tokens are issued, stored, validated, and revoked.",
      items: ["JWT handling", "Refresh tokens", "Expiration", "Invalidation", "Scope abuse"],
      goal: "Token security and lifecycle."
    },
    {
      title: "Input Validation",
      intro: "We probe parameters, payloads, and parsers for injection and manipulation.",
      items: ["Injection", "Mass assignment", "Parameter tampering", "Schema abuse"],
      goal: "Safe handling of untrusted input."
    },
    {
      title: "Rate Limiting & Abuse",
      intro: "We check whether APIs resist scraping, flooding, and automation abuse.",
      items: ["Rate limits", "Brute force", "Enumeration", "Resource exhaustion"],
      goal: "Abuse resistance."
    },
    {
      title: "Business Logic",
      intro: "We analyze workflows unique to your API for bypass and manipulation.",
      items: ["Workflow bypass", "Payment logic", "State abuse", "Privilege shortcuts"],
      goal: "Protect business processes behind APIs."
    }
  ],
  howTitle: "Our Testing Process",
  howIntro: "A structured API assessment from authorization through retest.",
  howFlow: [
    "Scope & Authorization",
    "Reconnaissance",
    "Authentication Testing",
    "Authorization Testing",
    "Abuse Testing",
    "Reporting & Remediation",
    "Retest & Verification"
  ],
  howSteps: [],
  findingIntro: "",
  finding: { ...EMPTY_LONGFORM.finding },
  findingToFixTitle: "From Finding to Fix",
  findingToFixIntro: "",
  findingToFixFlow: [],
  receiveTitle: "What You Receive",
  receiveIntro: "Clear API findings your developers can reproduce and fix.",
  receiveItems: [
    "Executive summary",
    "Validated API findings",
    "AuthZ evidence",
    "Risk ratings",
    "Remediation guidance",
    "Retest results"
  ],
  receiveCards: [
    { title: "Executive Summary", text: "API risk for leadership without the noise." },
    { title: "Validated Findings", text: "Confirmed issues with reproducible requests." },
    { title: "AuthZ Evidence", text: "Object and role access failures clearly demonstrated." },
    { title: "Risk Prioritization", text: "Know which endpoints to fix first." },
    { title: "Remediation Guidance", text: "Server-side checks and token hardening notes." },
    { title: "Retest Results", text: "We verify patches after remediation." }
  ],
  processOverview: [
    { step: "1", title: "Scope", text: "APIs, environments, roles, and rules." },
    { step: "2", title: "Discover", text: "Map endpoints, schemas, and auth flows." },
    { step: "3", title: "AuthN", text: "Test identity and credential handling." },
    { step: "4", title: "AuthZ", text: "Probe BOLA/IDOR and privilege boundaries." },
    { step: "5", title: "Abuse", text: "Rate limits, mass assignment, logic flaws." },
    { step: "6", title: "Report", text: "Prioritized findings with evidence." },
    { step: "7", title: "Retest", text: "Confirm vulnerabilities are resolved." }
  ],
  comparisonTitle: "Beyond Automated API Scans",
  comparisonBlurb:
    "Scanners often stop at HTTP 200. We ask whether this user should be allowed to perform that action — and prove the impact.",
  comparisonCta: "Talk to a Security Expert",
  scannerCode: "GET /api/orders/4821\nAuthorization: Bearer <user-token>\n\nHTTP/1.1 200 OK",
  testerCode: "GET /api/orders/4822\nAuthorization: Bearer <same-user-token>\n\nAnother customer's order returned.",
  scannerResult: "Looks fine — 200 OK",
  testerResult: "Broken object authorization",
  whyManualTitle: "",
  whyManualIntro: "",
  scannerTitle: "What Scanners See",
  scannerFlow: [],
  testerTitle: "What We Find",
  testerFlow: [],
  whyManualConclusion: "",
  contextTitle: "",
  contextQuote1: "",
  contextQuote2: "",
  contextIntro: "",
  contextItems: [],
  questionsTitle: "",
  questionsIntro: "",
  questions: [],
  closeTitle: "Protect Every Endpoint.",
  closeBody:
    "Authorized API security testing — authentication, authorization, tokens, abuse, and business logic — with remediation and retest.",
  closeHighlights: [
    "Find API vulnerabilities.",
    "Validate real impact.",
    "Fix what matters.",
    "Verify the remediation."
  ],
  closeQuestion: "Ready to secure your APIs?"
});

export const NETWORK_LONGFORM = withAiPlatform({
  introHeadline: "Reduce Network Exposure Before Attackers Map It.",
  introParagraphs: [
    "We assess external and internal networks for open services, weak configurations, trust-boundary gaps, and realistic attack paths — then prioritize hardening that reduces risk."
  ],
  heroHighlights: [
    { title: "Perimeter Mapping", text: "Discover exposed hosts, ports, and services." },
    { title: "Segmentation Checks", text: "Validate whether internal boundaries hold." },
    { title: "Attack Path Focus", text: "Connect findings into realistic compromise paths." },
    { title: "Fix & Retest Included", text: "Verify critical remediation after you harden." }
  ],
  heroTags: ["External Exposure", "Ports & Services", "Firewall Rules", "Segmentation", "Attack Paths"],
  heroCta: "Request a Network Assessment",
  secondaryCta: "View Our Process",
  bottomCta: "Get Started Now",
  whatWeTestTitle: "What We Test",
  whatWeTestIntro: "Coverage across the network risks that create real entry points.",
  testAreas: [
    {
      title: "External Exposure",
      intro: "We identify what is reachable from the internet.",
      items: ["Public IPs", "Unexpected services", "Admin interfaces", "Legacy exposure"],
      goal: "Know what the internet can reach."
    },
    {
      title: "Ports & Services",
      intro: "We review listening services and insecure configurations.",
      items: ["Open ports", "Service versions", "Default configs", "Unsafe protocols"],
      goal: "Reduce unnecessary service exposure."
    },
    {
      title: "Firewall & Filtering",
      intro: "We evaluate whether filtering rules match intended policy.",
      items: ["ACL gaps", "Overly permissive rules", "Management access", "Egress risks"],
      goal: "Tighten trust boundaries."
    },
    {
      title: "Internal Segmentation",
      intro: "We test whether compromise in one segment can reach critical systems.",
      items: ["VLAN hopping risks", "Flat networks", "Jump host gaps", "Lateral movement paths"],
      goal: "Contain breaches."
    },
    {
      title: "Protocol Weaknesses",
      intro: "We look for insecure or outdated protocol usage.",
      items: ["Cleartext protocols", "Weak crypto", "Legacy services", "Auth weaknesses"],
      goal: "Eliminate outdated protocol risk."
    },
    {
      title: "Attack Path Analysis",
      intro: "We connect findings into realistic attacker journeys.",
      items: ["Chained exposures", "Privilege paths", "Critical asset reachability"],
      goal: "Prioritize by real compromise potential."
    }
  ],
  howTitle: "Our Testing Process",
  howIntro: "A structured network assessment from authorization through retest.",
  howFlow: [
    "Scope & Authorization",
    "Discovery",
    "Port & Service Mapping",
    "Vulnerability Testing",
    "Exploitation Validation",
    "Reporting",
    "Retest"
  ],
  howSteps: [],
  findingIntro: "",
  finding: { ...EMPTY_LONGFORM.finding },
  findingToFixTitle: "From Finding to Fix",
  findingToFixIntro: "",
  findingToFixFlow: [],
  receiveTitle: "What You Receive",
  receiveIntro: "Clear network findings your ops and security teams can act on.",
  receiveItems: [
    "Executive summary",
    "Exposure inventory",
    "Validated findings",
    "Attack path notes",
    "Hardening guidance",
    "Retest results"
  ],
  receiveCards: [
    { title: "Executive Summary", text: "Network risk and priority actions for leadership." },
    { title: "Exposure Inventory", text: "Hosts, ports, and services that matter." },
    { title: "Validated Findings", text: "Confirmed issues with evidence and context." },
    { title: "Attack Path Notes", text: "How findings could chain toward critical assets." },
    { title: "Hardening Guidance", text: "Practical remediation ordered by impact." },
    { title: "Retest Results", text: "Verify critical fixes after remediation." }
  ],
  processOverview: [
    { step: "1", title: "Scope", text: "Ranges, segments, and safe windows." },
    { step: "2", title: "Discover", text: "Inventory hosts and exposure." },
    { step: "3", title: "Map", text: "Ports, services, and trust edges." },
    { step: "4", title: "Test", text: "Probe weaknesses safely." },
    { step: "5", title: "Validate", text: "Confirm realistic impact." },
    { step: "6", title: "Report", text: "Prioritized hardening plan." },
    { step: "7", title: "Retest", text: "Confirm critical fixes held." }
  ],
  comparisonTitle: "Beyond Port Scans Alone",
  comparisonBlurb:
    "A port list is not a risk picture. We validate whether exposures create real attack paths — and what an adversary could reach next.",
  comparisonCta: "Talk to a Security Expert",
  scannerCode: "Host: 203.0.113.10\nOpen: 22, 443, 8080\n\nResult: Ports listed",
  testerCode: "8080 admin panel exposed\nDefault creds accepted\nPivot to internal segment possible",
  scannerResult: "Inventory only",
  testerResult: "Exploit path confirmed",
  whyManualTitle: "",
  whyManualIntro: "",
  scannerTitle: "Basic Network Scan",
  scannerFlow: [],
  testerTitle: "Manual Network Testing",
  testerFlow: [],
  whyManualConclusion: "",
  contextTitle: "",
  contextQuote1: "",
  contextQuote2: "",
  contextIntro: "",
  contextItems: [],
  questionsTitle: "",
  questionsIntro: "",
  questions: [],
  closeTitle: "Close the Paths That Matter.",
  closeBody:
    "Authorized network security testing — external exposure, internal segmentation, and attack-path analysis with clear hardening guidance.",
  closeHighlights: [
    "Map exposure.",
    "Validate attack paths.",
    "Harden what matters.",
    "Verify the fixes."
  ],
  closeQuestion: "Ready to reduce your network attack surface?"
});

export const VULN_LONGFORM = withAiPlatform({
  introHeadline: "Find. Validate. Prioritize. Fix.",
  introParagraphs: [
    "Our vulnerability assessments combine scanning with manual validation so your team gets a prioritized remediation roadmap — not a raw list of false positives."
  ],
  heroHighlights: [
    { title: "Broad Asset Coverage", text: "Apps, network, and cloud resources in scope." },
    { title: "Manual Validation", text: "Important findings confirmed before you invest fix time." },
    { title: "Risk Prioritization", text: "CVSS plus business context for clear order of work." },
    { title: "Retest Critical Fixes", text: "Verify the highest-risk items after remediation." }
  ],
  heroTags: ["Asset Inventory", "CVE Exposure", "Misconfigurations", "Risk Scoring", "Remediation"],
  heroCta: "Request a Vulnerability Assessment",
  secondaryCta: "View Our Process",
  bottomCta: "Get Started Now",
  whatWeTestTitle: "What We Assess",
  whatWeTestIntro: "A structured view of known weaknesses across your environment.",
  testAreas: [
    {
      title: "Web & Applications",
      intro: "Identify common weaknesses across web apps and related services.",
      items: ["Known app CVEs", "Misconfigurations", "Outdated components"],
      goal: "Application vulnerability visibility."
    },
    {
      title: "Network Assets",
      intro: "Scan and review hosts and services for known issues.",
      items: ["Open services", "Missing patches", "Insecure configs"],
      goal: "Network vulnerability visibility."
    },
    {
      title: "Cloud Resources",
      intro: "Review cloud assets for exposure and weak posture.",
      items: ["Public resources", "IAM gaps", "Storage exposure"],
      goal: "Cloud vulnerability visibility."
    },
    {
      title: "Misconfigurations",
      intro: "Find settings that create avoidable risk.",
      items: ["Default credentials", "Open admin paths", "Weak hardening"],
      goal: "Reduce config-driven risk."
    },
    {
      title: "Known CVEs",
      intro: "Map patch gaps against current vulnerability intelligence.",
      items: ["Critical CVEs", "Exploitable versions", "Priority patching"],
      goal: "Close known exploit windows."
    },
    {
      title: "Prioritization",
      intro: "Rank findings so teams fix the highest business risk first.",
      items: ["Severity", "Exposure", "Business impact", "Quick wins"],
      goal: "A remediation order that works."
    }
  ],
  howTitle: "Our Assessment Process",
  howIntro: "From inventory through prioritized remediation and retest.",
  howFlow: [
    "Scope",
    "Asset Inventory",
    "Scanning",
    "Manual Validation",
    "Risk Scoring",
    "Reporting",
    "Retest"
  ],
  howSteps: [],
  findingIntro: "",
  finding: { ...EMPTY_LONGFORM.finding },
  findingToFixTitle: "From Finding to Fix",
  findingToFixIntro: "",
  findingToFixFlow: [],
  receiveTitle: "What You Receive",
  receiveIntro: "A clear roadmap your security and engineering teams can execute.",
  receiveItems: [
    "Executive summary",
    "Validated findings",
    "Risk-ranked backlog",
    "Remediation roadmap",
    "Evidence package",
    "Critical retest results"
  ],
  receiveCards: [
    { title: "Executive Summary", text: "Overall risk and top priorities for leadership." },
    { title: "Validated Findings", text: "Confirmed issues with less scanner noise." },
    { title: "Risk Scoring", text: "Severity and business context for each item." },
    { title: "Remediation Roadmap", text: "A practical order of work for your teams." },
    { title: "Evidence Package", text: "Details your engineers need to reproduce and fix." },
    { title: "Critical Retest", text: "Verify the highest-risk fixes after remediation." }
  ],
  processOverview: [
    { step: "1", title: "Scope", text: "Assets, access, and windows." },
    { step: "2", title: "Inventory", text: "Discover systems and services." },
    { step: "3", title: "Scan", text: "Identify potential weaknesses." },
    { step: "4", title: "Validate", text: "Confirm important findings." },
    { step: "5", title: "Score", text: "Prioritize by real risk." },
    { step: "6", title: "Report", text: "Deliver an actionable roadmap." },
    { step: "7", title: "Retest", text: "Verify critical remediation." }
  ],
  comparisonTitle: "Beyond Raw Scanner Output",
  comparisonBlurb:
    "Unvalidated scan dumps waste engineering time. We confirm what matters, reduce false positives, and give you a prioritized path to lower risk.",
  comparisonCta: "Talk to a Security Expert",
  scannerCode: "1200 findings exported\nSeverity mixed\nMany unverified\n\nResult: Noisy backlog",
  testerCode: "Findings validated\nFalse positives removed\nTop 25 prioritized by exposure + impact",
  scannerResult: "Unfiltered noise",
  testerResult: "Actionable risk list",
  whyManualTitle: "",
  whyManualIntro: "",
  scannerTitle: "Raw Scan Dump",
  scannerFlow: [],
  testerTitle: "Validated Assessment",
  testerFlow: [],
  whyManualConclusion: "",
  contextTitle: "",
  contextQuote1: "",
  contextQuote2: "",
  contextIntro: "",
  contextItems: [],
  questionsTitle: "",
  questionsIntro: "",
  questions: [],
  closeTitle: "Turn Findings Into Fixes.",
  closeBody:
    "Authorized vulnerability assessment with discovery, validation, prioritization, and critical retest — so your teams know what to fix first.",
  closeHighlights: [
    "Discover weaknesses.",
    "Validate real risk.",
    "Prioritize remediation.",
    "Verify critical fixes."
  ],
  closeQuestion: "Ready for a clear vulnerability roadmap?"
});

function asString(value: unknown, fallback = "") {
  return typeof value === "string" ? value : fallback;
}

function asList(value: unknown, fallback: string[] = []): string[] {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : fallback;
}

function asMapItems(value: unknown): LongformMapItem[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => {
      if (typeof item === "string") return { label: item };
      if (item && typeof item === "object" && "label" in item) {
        const row = item as LongformMapItem;
        return {
          label: asString(row.label),
          children: asList(row.children)
        };
      }
      return null;
    })
    .filter((item): item is LongformMapItem => Boolean(item?.label));
}

export function parseLongform(value: unknown): ServiceLongform {
  const parsed = value && typeof value === "object" ? (value as Partial<ServiceLongform>) : {};
  const finding = parsed.finding ?? EMPTY_LONGFORM.finding;
  return {
    ...EMPTY_LONGFORM,
    ...parsed,
    introParagraphs: asList(parsed.introParagraphs),
    heroHighlights: Array.isArray(parsed.heroHighlights) ? parsed.heroHighlights : [],
    heroTags: asList(parsed.heroTags),
    testAreas: Array.isArray(parsed.testAreas) ? parsed.testAreas : [],
    howFlow: asList(parsed.howFlow),
    howSteps: Array.isArray(parsed.howSteps)
      ? parsed.howSteps.map((step) => ({
          ...step,
          items: asList(step.items),
          mapItems: asMapItems(step.mapItems)
        }))
      : [],
    finding: {
      ...EMPTY_LONGFORM.finding,
      ...finding
    },
    findingToFixFlow: asList(parsed.findingToFixFlow),
    receiveItems: asList(parsed.receiveItems),
    receiveCards: Array.isArray(parsed.receiveCards) ? parsed.receiveCards : [],
    processOverview: Array.isArray(parsed.processOverview) ? parsed.processOverview : [],
    platformItems: Array.isArray(parsed.platformItems) ? parsed.platformItems : [],
    scannerFlow: asList(parsed.scannerFlow),
    testerFlow: asList(parsed.testerFlow),
    contextItems: asList(parsed.contextItems),
    questions: asList(parsed.questions),
    closeHighlights: asList(parsed.closeHighlights)
  };
}

export function longformHasContent(longform: ServiceLongform) {
  return (
    longform.introParagraphs.length > 0 ||
    longform.testAreas.length > 0 ||
    longform.howSteps.length > 0 ||
    longform.howFlow.length > 0
  );
}

export function parsePipeRows(input: string, keys: string[]) {
  return input
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const parts = line.split("|").map((s) => s.trim());
      const obj: Record<string, string> = {};
      keys.forEach((k, i) => {
        obj[k] = parts[i] ?? "";
      });
      return obj;
    });
}

export function stringifyPipeRows(items: unknown, keys: string[]) {
  if (!Array.isArray(items)) return "";
  return items
    .map((item) => {
      const obj = item as Record<string, unknown>;
      return keys
        .map((key) => {
          const value = obj?.[key];
          if (Array.isArray(value)) {
            if (value[0] && typeof value[0] === "object") {
              return (value as LongformMapItem[])
                .map((row) => (row.children?.length ? `${row.label}: ${row.children.join(", ")}` : row.label))
                .join("; ");
            }
            return value.join(key.toLowerCase().includes("flow") ? " > " : "; ");
          }
          return typeof value === "string" ? value : "";
        })
        .join(" | ");
    })
    .join("\n");
}

export function parseTestAreas(input: string): LongformTestArea[] {
  return parsePipeRows(input, ["title", "intro", "items", "goal", "expectedTitle", "expectedFlow", "abuseTitle", "abuseFlow"]).map(
    (row) => ({
      title: row.title,
      intro: row.intro,
      items: row.items.split(";").map((s) => s.trim()).filter(Boolean),
      goal: row.goal,
      expectedTitle: row.expectedTitle,
      expectedFlow: row.expectedFlow.split(">").map((s) => s.trim()).filter(Boolean),
      abuseTitle: row.abuseTitle,
      abuseFlow: row.abuseFlow.split(">").map((s) => s.trim()).filter(Boolean)
    })
  );
}

export function parseHowSteps(input: string): LongformProcessStep[] {
  return parsePipeRows(input, ["step", "title", "intro", "items", "footer", "mapTitle", "mapItems"]).map((row) => ({
    step: row.step,
    title: row.title,
    intro: row.intro,
    items: row.items.split(";").map((s) => s.trim()).filter(Boolean),
    footer: row.footer,
    mapTitle: row.mapTitle,
    mapItems: row.mapItems
      .split(";")
      .map((s) => s.trim())
      .filter(Boolean)
      .map((item) => {
        const [label, rest] = item.split(":").map((s) => s.trim());
        return {
          label,
          children: rest ? rest.split(",").map((s) => s.trim()).filter(Boolean) : undefined
        };
      })
  }));
}

export function parseFlow(input: string) {
  return input
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
}
