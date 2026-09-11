import Link from "next/link";
import Image from "next/image";
import { Inter } from "next/font/google";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  ClipboardList,
  Code2,
  FileText,
  FlaskConical,
  GitBranch,
  KeyRound,
  Lock,
  Map,
  RefreshCw,
  Search,
  Settings2,
  Shield,
  ShieldAlert,
  Users
} from "lucide-react";
import type { ServicePageContent } from "@/lib/service-content";
import { MOBILE_LONGFORM, MONITORING_LONGFORM, API_LONGFORM, NETWORK_LONGFORM, VULN_LONGFORM, WEB_LONGFORM, withAiPlatform } from "@/lib/service-longform";

const inter = Inter({ subsets: ["latin"], display: "swap" });

const TEST_ICONS = [Lock, KeyRound, Code2, Shield, GitBranch, Settings2];
const TEST_COLORS = ["#4f70ff", "#22c55e", "#f59e0b", "#8b5cf6", "#ef4444", "#21d4fd"];
const PROCESS_ICONS = [ClipboardList, Search, Map, FlaskConical, CheckCircle2, BarChart3, FileText, RefreshCw];
const RECEIVE_ICONS = [FileText, ShieldAlert, BarChart3, Code2, CheckCircle2, RefreshCw];

function first<T>(value: T[] | undefined, fallback: T[]) {
  return value && value.length ? value : fallback;
}

function longformFallback(slug: string) {
  if (slug === "continuous-security-monitoring") return MONITORING_LONGFORM;
  if (slug === "mobile-application-pentesting") return MOBILE_LONGFORM;
  if (slug === "api-security-testing") return API_LONGFORM;
  if (slug === "network-security-testing") return NETWORK_LONGFORM;
  if (slug === "vulnerability-assessment") return VULN_LONGFORM;
  return WEB_LONGFORM;
}

export function ServiceLongformPage({ service }: { service: ServicePageContent }) {
  const defaults = withAiPlatform(longformFallback(service.slug));
  const page = withAiPlatform(service.extras.longform);
  const headline =
    !page.introHeadline || page.introHeadline === "Find Security Weaknesses Before Attackers Do"
      ? defaults.introHeadline
      : page.introHeadline;
  const intro = first(page.introParagraphs, defaults.introParagraphs);
  const highlights = first(page.heroHighlights, defaults.heroHighlights);
  const tags = first(page.heroTags, defaults.heroTags);
  const platformBadge = page.platformBadge || defaults.platformBadge || service.heroBadge;
  const platformTitle = page.platformTitle || defaults.platformTitle;
  const platformIntro = page.platformIntro || defaults.platformIntro;
  const platformItems = first(page.platformItems, defaults.platformItems);
  const processSteps = first(page.processOverview, defaults.processOverview);
  const receiveCards = first(
    page.receiveCards,
    defaults.receiveCards.length
      ? defaults.receiveCards
      : page.receiveItems.map((title) => ({ title, text: "" }))
  );
  const comparisonTitle = page.comparisonTitle || defaults.comparisonTitle;
  const comparisonBlurb = page.comparisonBlurb || defaults.comparisonBlurb;
  const comparisonCta = page.comparisonCta || defaults.comparisonCta;
  const scannerCode = page.scannerCode || defaults.scannerCode;
  const testerCode = page.testerCode || defaults.testerCode;
  const scannerResult = page.scannerResult || defaults.scannerResult;
  const testerResult = page.testerResult || defaults.testerResult;
  const scannerTitle = page.scannerTitle || defaults.scannerTitle;
  const testerTitle = page.testerTitle || defaults.testerTitle;

  return (
    <div className={`web-landing ${inter.className}`}>
      <section className="web-hero">
        <div className="container">
          <div className="web-hero-grid">
            <div>
              <span className="web-platform-badge">{platformBadge}</span>
              <p className="web-kicker">{service.title}</p>
              <h1 className="web-hero-title">{headline}</h1>
              {intro.map((paragraph) => (
                <p key={paragraph.slice(0, 48)} className="web-hero-copy">
                  {paragraph}
                </p>
              ))}
              <div className="web-hero-actions">
                <Link href="/contact" className="web-btn web-btn-primary">
                  {page.heroCta || defaults.heroCta}
                </Link>
                <a href="#process" className="web-btn web-btn-ghost">
                  {page.secondaryCta || defaults.secondaryCta}
                </a>
              </div>
            </div>
            <div className="web-hero-visual">
              {tags.slice(0, 3).map((tag) => (
                <span key={tag} className="web-float-tag web-float-ok">
                  <CheckCircle2 className="h-3.5 w-3.5" /> {tag}
                </span>
              ))}
              {tags.slice(3).map((tag) => (
                <span key={tag} className="web-float-tag web-float-warn">
                  <ShieldAlert className="h-3.5 w-3.5" /> {tag}
                </span>
              ))}
              <div className="web-hero-frame">
                {service.imageUrl ? (
                  <Image
                    src={service.imageUrl}
                    alt={service.title}
                    width={720}
                    height={520}
                    className="h-auto w-full object-contain"
                    priority
                  />
                ) : (
                  <div className="web-hero-fallback">
                    <Shield className="h-16 w-16 text-[#4f70ff]" />
                  </div>
                )}
              </div>
            </div>
          </div>
          {highlights.length > 0 && (
            <div className="web-hero-bar">
              {highlights.map((item, i) => {
                const Icon = [Users, Shield, FileText, RefreshCw][i] ?? Shield;
                return (
                  <div key={item.title} className="web-hero-bar-item">
                    <Icon className="h-5 w-5 text-[#6b8cff]" />
                    <span>{item.title}</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {platformItems.length > 0 && (
        <section className="web-platform">
          <div className="container">
            <p className="web-platform-eyebrow">How we work</p>
            <h2 className="web-h2 web-h2-light">{platformTitle}</h2>
            {platformIntro && <p className="web-platform-intro">{platformIntro}</p>}
            <div className="web-platform-grid">
              {platformItems.slice(0, 3).map((item, i) => {
                const Icon = [Shield, Users, BarChart3][i] ?? Shield;
                return (
                  <article key={item.title} className="web-platform-card">
                    <div className="web-platform-card-icon">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {page.testAreas.length > 0 && (
        <section className="web-light">
          <div className="container">
            <h2 className="web-h2">{page.whatWeTestTitle || "What We Test"}</h2>
            <div className="web-card-grid">
              {page.testAreas.slice(0, 6).map((area, i) => {
                const Icon = TEST_ICONS[i] ?? Shield;
                const color = TEST_COLORS[i] ?? "#4f70ff";
                return (
                  <article key={area.title} className="web-card">
                    <div className="web-card-icon" style={{ background: `${color}18`, color }}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3>{area.title}</h3>
                    <p>{area.goal || area.intro.replace(/\*\*/g, "")}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {processSteps.length > 0 && (
        <section id="process" className="web-muted">
          <div className="container">
            <h2 className="web-h2">{page.howTitle || "Our Testing Process"}</h2>
            <div className="web-process">
              {processSteps.map((step, i) => {
                const Icon = PROCESS_ICONS[i] ?? ClipboardList;
                return (
                  <div key={`${step.step}-${step.title}`} className="web-process-step">
                    <div className="web-process-icon">
                      <Icon className="h-5 w-5" />
                    </div>
                    {i < processSteps.length - 1 && <span className="web-process-line" />}
                    <p className="web-process-num">
                      {step.step}. {step.title}
                    </p>
                    <p className="web-process-text">{step.text}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <section className="web-compare-wrap">
        <div className="container">
          <div className="web-compare">
            <div>
              <h2 className="web-h2 web-h2-light">{comparisonTitle}</h2>
              <div className="web-compare-grid">
                <div className="web-code">
                  <p className="web-code-label">{scannerTitle}</p>
                  <pre>{scannerCode}</pre>
                  <div className="web-code-foot web-code-bad">{scannerResult}</div>
                </div>
                <div className="web-vs">VS</div>
                <div className="web-code">
                  <p className="web-code-label">{testerTitle}</p>
                  <pre>{testerCode}</pre>
                  <div className="web-code-foot web-code-good">{testerResult}</div>
                </div>
              </div>
            </div>
            <div className="web-compare-aside">
              <p>{comparisonBlurb}</p>
              <Link href="/contact" className="web-btn web-btn-primary">
                {comparisonCta} <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {receiveCards.length > 0 && (
        <section className="web-light">
          <div className="container">
            <h2 className="web-h2">{page.receiveTitle || "What You Receive"}</h2>
            <div className="web-card-grid">
              {receiveCards.slice(0, 6).map((card, i) => {
                const Icon = RECEIVE_ICONS[i] ?? FileText;
                const color = TEST_COLORS[i] ?? "#4f70ff";
                return (
                  <article key={card.title} className="web-card">
                    <div className="web-card-icon" style={{ background: `${color}18`, color }}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3>{card.title}</h3>
                    {card.text && <p>{card.text}</p>}
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <section className="web-cta-wrap">
        <div className="container">
          <div className="web-cta">
            <div>
              <h2>
                {!page.closeTitle || page.closeTitle.startsWith("Protect Your Web Application")
                  ? defaults.closeTitle
                  : page.closeTitle}
              </h2>
              <p>{page.closeBody || service.ctaSubtitle}</p>
            </div>
            <Link href="/contact" className="web-btn web-btn-primary">
              {page.bottomCta || defaults.bottomCta} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
