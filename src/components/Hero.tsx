import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ShieldCheck } from "lucide-react";

type Props = {
  headline: string;
  subtitle: string;
  imageUrl: string | null;
  primaryCtaText: string;
  primaryCtaLink: string;
  secondaryCtaText: string;
  secondaryCtaLink: string;
};

export function Hero(props: Props) {
  return (
    <section className="relative overflow-hidden border-b border-white/5 bg-ink-900">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-grid-fade opacity-50"
        style={{ backgroundSize: "auto, 40px 40px, 40px 40px" }}
      />
      <div className="section relative grid gap-10 py-14 sm:py-20 md:grid-cols-2 md:gap-8 md:py-28 lg:py-32">
        <div>
          <span className="tag">
            <ShieldCheck className="mr-1 h-3.5 w-3.5" /> Trusted by modern engineering teams
          </span>
          <h1 className="mt-5 text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
            {props.headline}
          </h1>
          <p className="mt-5 max-w-xl text-base text-white/70 sm:text-lg">{props.subtitle}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={props.primaryCtaLink} className="btn btn-primary">
              {props.primaryCtaText} <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href={props.secondaryCtaLink} className="btn btn-outline">
              {props.secondaryCtaText}
            </Link>
          </div>
          <div className="mt-10 grid grid-cols-3 gap-3 text-center text-[11px] text-white/60 sm:gap-4 sm:text-xs">
            <div><div className="text-xl font-bold text-white sm:text-2xl">100%</div>Senior engineers</div>
            <div><div className="text-xl font-bold text-white sm:text-2xl">48h</div>Avg. response</div>
            <div><div className="text-xl font-bold text-white sm:text-2xl">Free</div>Retest included</div>
          </div>
        </div>
        <div className="relative">
          <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-br from-brand/20 to-transparent blur-2xl" />
          <div className="relative rounded-2xl border border-white/10 bg-ink-800 p-2 shadow-glow">
            {props.imageUrl ? (
              <Image
                src={props.imageUrl}
                alt="StrikeDefend platform"
                width={1200}
                height={800}
                className="rounded-xl object-cover"
                priority
              />
            ) : (
              <HeroPlaceholder />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroPlaceholder() {
  return (
    <div className="aspect-[5/4] rounded-xl bg-gradient-to-br from-ink-700 via-ink-800 to-ink-900 p-6 font-mono text-xs text-brand">
      <div className="mb-4 flex gap-1.5">
        <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-green-500/70" />
      </div>
      <pre className="whitespace-pre-wrap leading-6 text-white/80">
{`$ strikedefend scan --target https://yourapp.com
[+] Auth bypass...........  passed
[+] IDOR check.............  passed
[!] CSP weakness...........  ${'⚠'} review
[+] Rate-limit auth........  passed
[+] SSRF.................  passed

✓ Report ready in /reports/strikedefend-2026.pdf`}
      </pre>
    </div>
  );
}
