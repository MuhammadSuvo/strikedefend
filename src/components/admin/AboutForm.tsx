"use client";

import { saveAbout } from "@/app/admin/actions";
import { FormCard, SaveBar } from "@/components/admin/Toolbar";
import { ImageUploader } from "@/components/admin/ImageUploader";
import type { AboutCard, AboutContent } from "@/lib/about";

function cardsToText(items: AboutCard[]) {
  return items.map((item) => `${item.title} | ${item.text}`).join("\n");
}

function Field({
  label,
  name,
  defaultValue,
  rows,
  help
}: {
  label: string;
  name: string;
  defaultValue?: string;
  rows?: number;
  help?: string;
}) {
  return (
    <div>
      <label className="label">{label}</label>
      {help && <p className="mb-1 text-xs text-white/45">{help}</p>}
      {rows ? (
        <textarea className="input" name={name} rows={rows} defaultValue={defaultValue} />
      ) : (
        <input className="input" name={name} defaultValue={defaultValue} />
      )}
    </div>
  );
}

export function AboutForm({ initial }: { initial: AboutContent }) {
  return (
    <form action={saveAbout} className="space-y-6">
      <FormCard>
        <h2 className="font-semibold">Hero</h2>
        <div className="mt-4 space-y-4">
          <Field label="Eyebrow" name="eyebrow" defaultValue={initial.eyebrow} />
          <Field label="Title" name="title" defaultValue={initial.title} />
          <Field label="Subtitle" name="subtitle" defaultValue={initial.subtitle} rows={2} />
          <Field
            label="Paragraphs (one per line)"
            name="paragraphs"
            defaultValue={initial.paragraphs.join("\n")}
            rows={4}
          />
          <ImageUploader
            name="heroImageUrl"
            defaultValue={initial.heroImageUrl}
            folder="strikedefend/about"
            helpText="Hero banner image shown on the right side of the About page."
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Primary CTA" name="primaryCta" defaultValue={initial.primaryCta} />
            <Field label="Primary CTA link" name="primaryCtaLink" defaultValue={initial.primaryCtaLink} />
            <Field label="Secondary CTA" name="secondaryCta" defaultValue={initial.secondaryCta} />
            <Field label="Secondary CTA link" name="secondaryCtaLink" defaultValue={initial.secondaryCtaLink} />
          </div>
        </div>
      </FormCard>

      <FormCard>
        <h2 className="font-semibold">Why We Exist + Mission</h2>
        <div className="mt-4 space-y-4">
          <Field label="Eyebrow" name="whyEyebrow" defaultValue={initial.whyEyebrow} />
          <Field label="Title" name="whyTitle" defaultValue={initial.whyTitle} />
          <Field label="Intro" name="whyIntro" defaultValue={initial.whyIntro} rows={3} />
          <Field
            label="Why items (one per line: title | text)"
            name="whyItems"
            defaultValue={cardsToText(initial.whyItems)}
            rows={6}
          />
          <Field label="Closing line" name="whyClosing" defaultValue={initial.whyClosing} rows={2} />
          <Field label="Mission title" name="missionTitle" defaultValue={initial.missionTitle} />
          <Field label="Mission body" name="missionBody" defaultValue={initial.missionBody} rows={3} />
        </div>
      </FormCard>

      <FormCard>
        <h2 className="font-semibold">What Makes Us Different</h2>
        <div className="mt-4 space-y-4">
          <Field label="Eyebrow" name="differentEyebrow" defaultValue={initial.differentEyebrow} />
          <Field label="Title" name="differentTitle" defaultValue={initial.differentTitle} />
          <Field
            label="Items (one per line: title | text)"
            name="differentItems"
            defaultValue={cardsToText(initial.differentItems)}
            rows={8}
          />
        </div>
      </FormCard>

      <FormCard>
        <h2 className="font-semibold">What We Protect</h2>
        <div className="mt-4 space-y-4">
          <Field label="Eyebrow" name="protectEyebrow" defaultValue={initial.protectEyebrow} />
          <Field label="Title" name="protectTitle" defaultValue={initial.protectTitle} />
          <Field
            label="Items (one per line: title | text)"
            name="protectItems"
            defaultValue={cardsToText(initial.protectItems)}
            rows={8}
          />
        </div>
      </FormCard>

      <FormCard>
        <h2 className="font-semibold">Security Approach</h2>
        <div className="mt-4 space-y-4">
          <Field label="Eyebrow" name="approachEyebrow" defaultValue={initial.approachEyebrow} />
          <Field label="Title" name="approachTitle" defaultValue={initial.approachTitle} />
          <Field label="Intro" name="approachIntro" defaultValue={initial.approachIntro} rows={2} />
          <Field
            label="Steps (one per line: title | text)"
            name="approachSteps"
            defaultValue={cardsToText(initial.approachSteps)}
            rows={8}
          />
        </div>
      </FormCard>

      <FormCard>
        <h2 className="font-semibold">Principles & Services</h2>
        <div className="mt-4 space-y-4">
          <Field label="Principles eyebrow" name="principlesEyebrow" defaultValue={initial.principlesEyebrow} />
          <Field label="Principles title" name="principlesTitle" defaultValue={initial.principlesTitle} />
          <Field
            label="Principles (one per line: title | text)"
            name="principles"
            defaultValue={cardsToText(initial.principles)}
            rows={7}
          />
          <Field label="Services title" name="servicesTitle" defaultValue={initial.servicesTitle} />
          <Field
            label="Services (one per line)"
            name="services"
            defaultValue={initial.services.join("\n")}
            rows={8}
          />
        </div>
      </FormCard>

      <FormCard>
        <h2 className="font-semibold">Beyond Scanning + Trust</h2>
        <div className="mt-4 space-y-4">
          <Field label="Beyond title" name="beyondTitle" defaultValue={initial.beyondTitle} />
          <Field label="Scanner label" name="beyondScannerLabel" defaultValue={initial.beyondScannerLabel} />
          <Field label="Scanner text" name="beyondScannerText" defaultValue={initial.beyondScannerText} rows={2} />
          <Field label="Tester label" name="beyondTesterLabel" defaultValue={initial.beyondTesterLabel} />
          <Field label="Tester text" name="beyondTesterText" defaultValue={initial.beyondTesterText} rows={2} />
          <Field label="Beyond intro" name="beyondIntro" defaultValue={initial.beyondIntro} />
          <Field
            label="Beyond items (one per line)"
            name="beyondItems"
            defaultValue={initial.beyondItems.join("\n")}
            rows={8}
          />
          <Field label="Beyond closing" name="beyondClose" defaultValue={initial.beyondClose} rows={2} />
          <Field label="Trust title" name="trustTitle" defaultValue={initial.trustTitle} />
          <Field label="Trust intro" name="trustIntro" defaultValue={initial.trustIntro} rows={3} />
          <Field
            label="Trust items (one per line: title | text)"
            name="trustItems"
            defaultValue={cardsToText(initial.trustItems)}
            rows={5}
          />
        </div>
      </FormCard>

      <FormCard>
        <h2 className="font-semibold">Clients, Expect, Closing CTA</h2>
        <div className="mt-4 space-y-4">
          <Field label="Who we work with title" name="clientsTitle" defaultValue={initial.clientsTitle} />
          <Field
            label="Clients (one per line: title | text)"
            name="clients"
            defaultValue={cardsToText(initial.clients)}
            rows={6}
          />
          <Field label="What you can expect title" name="expectTitle" defaultValue={initial.expectTitle} />
          <Field
            label="Expect items (one per line: title | text)"
            name="expectItems"
            defaultValue={cardsToText(initial.expectItems)}
            rows={6}
          />
          <Field label="Closing title" name="closingTitle" defaultValue={initial.closingTitle} />
          <Field label="Closing body" name="closingBody" defaultValue={initial.closingBody} rows={3} />
          <Field label="CTA title" name="ctaTitle" defaultValue={initial.ctaTitle} />
          <Field label="CTA subtitle" name="ctaSubtitle" defaultValue={initial.ctaSubtitle} rows={3} />
          <Field
            label="CTA highlights (one per line)"
            name="ctaHighlights"
            defaultValue={initial.ctaHighlights.join("\n")}
            rows={4}
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="CTA primary" name="ctaPrimary" defaultValue={initial.ctaPrimary} />
            <Field label="CTA primary link" name="ctaPrimaryLink" defaultValue={initial.ctaPrimaryLink} />
            <Field label="CTA secondary" name="ctaSecondary" defaultValue={initial.ctaSecondary} />
            <Field label="CTA secondary link" name="ctaSecondaryLink" defaultValue={initial.ctaSecondaryLink} />
          </div>
        </div>
      </FormCard>

      <SaveBar />
    </form>
  );
}
