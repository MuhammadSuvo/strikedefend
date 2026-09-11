"use client";

import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { savePricing } from "@/app/admin/actions";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { FormCard, SaveBar } from "@/components/admin/Toolbar";
import type { ComparisonRow, PricingContent, PricingPlan, PricingTheme } from "@/lib/pricing";

const ICONS = ["globe", "shield", "scan", "check", "api", "lock", "key", "workflow", "cloud", "users", "path", "file", "refresh", "headset"];
const THEMES: PricingTheme[] = ["blue", "gold", "purple"];

const EMPTY_PLAN: PricingPlan = {
  title: "",
  tagline: "",
  text: "",
  includesFrom: "",
  items: [],
  price: "",
  priceNote: "One-time Assessment",
  ctaText: "Get started",
  ctaLink: "/contact",
  theme: "blue",
  featured: false,
  badge: ""
};

const EMPTY_ROW: ComparisonRow = { feature: "", icon: "shield", values: [] };

export function PricingForm({ initial }: { initial: PricingContent }) {
  const [plans, setPlans] = useState<PricingPlan[]>(initial.plans);
  const [comparison, setComparison] = useState<ComparisonRow[]>(
    initial.comparison.map((row) => ({
      ...row,
      values: padValues(row.values, initial.plans.length)
    }))
  );

  function updatePlan(index: number, patch: Partial<PricingPlan>) {
    setPlans((current) => current.map((plan, i) => (i === index ? { ...plan, ...patch } : plan)));
  }

  function addPlan() {
    const theme = THEMES[plans.length % THEMES.length];
    setPlans((current) => [...current, { ...EMPTY_PLAN, theme }]);
    setComparison((rows) => rows.map((row) => ({ ...row, values: [...row.values, "dash"] })));
  }

  function removePlan(index: number) {
    setPlans((current) => current.filter((_, i) => i !== index));
    setComparison((rows) =>
      rows.map((row) => ({
        ...row,
        values: row.values.filter((_, i) => i !== index)
      }))
    );
  }

  function updateRow(index: number, patch: Partial<ComparisonRow>) {
    setComparison((rows) => rows.map((row, i) => (i === index ? { ...row, ...patch } : row)));
  }

  return (
    <form action={savePricing} className="space-y-6">
      <input type="hidden" name="plansJson" value={JSON.stringify(plans)} />
      <input type="hidden" name="comparisonJson" value={JSON.stringify(comparison)} />

      <FormCard>
        <h2 className="font-semibold">Hero</h2>
        <div className="mt-4 space-y-4">
          <div>
            <label className="label">Eyebrow</label>
            <input className="input" name="eyebrow" defaultValue={initial.eyebrow} />
          </div>
          <div>
            <label className="label">Title</label>
            <input className="input" name="title" defaultValue={initial.title} required />
          </div>
          <div>
            <label className="label">Subtitle</label>
            <textarea className="input" name="subtitle" rows={3} defaultValue={initial.subtitle} />
          </div>
          <div>
            <label className="label">Hero image (optional — leave empty to use the laptop graphic)</label>
            <ImageUploader name="imageUrl" defaultValue={initial.imageUrl || ""} folder="strikedefend/pricing" />
          </div>
        </div>
      </FormCard>

      {plans.map((plan, index) => (
        <FormCard key={index}>
          <div className="flex items-center justify-between gap-3">
            <h2 className="font-semibold">Plan {index + 1}{plan.title ? ` — ${plan.title}` : ""}</h2>
            <button
              type="button"
              onClick={() => removePlan(index)}
              className="inline-flex items-center gap-1 text-sm text-white/60 hover:text-red-400"
            >
              <Trash2 className="h-4 w-4" /> Remove
            </button>
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <label className="label">Name</label>
              <input
                className="input"
                value={plan.title}
                onChange={(e) => updatePlan(index, { title: e.target.value })}
              />
            </div>
            <div>
              <label className="label">Tagline</label>
              <input
                className="input"
                value={plan.tagline}
                onChange={(e) => updatePlan(index, { tagline: e.target.value })}
              />
            </div>
            <div className="sm:col-span-2">
              <label className="label">Who it is for</label>
              <textarea
                className="input"
                rows={2}
                value={plan.text}
                onChange={(e) => updatePlan(index, { text: e.target.value })}
              />
            </div>
            <div className="sm:col-span-2">
              <label className="label">Includes-from line (e.g. Everything in Basic, plus:)</label>
              <input
                className="input"
                value={plan.includesFrom}
                onChange={(e) => updatePlan(index, { includesFrom: e.target.value })}
              />
            </div>
            <div className="sm:col-span-2">
              <label className="label">Features (one per line)</label>
              <textarea
                className="input font-mono text-xs"
                rows={10}
                value={plan.items.join("\n")}
                onChange={(e) =>
                  updatePlan(index, {
                    items: e.target.value.split("\n")
                  })
                }
              />
            </div>
            <div>
              <label className="label">Price</label>
              <input
                className="input"
                value={plan.price}
                onChange={(e) => updatePlan(index, { price: e.target.value })}
              />
            </div>
            <div>
              <label className="label">Price note</label>
              <input
                className="input"
                value={plan.priceNote}
                onChange={(e) => updatePlan(index, { priceNote: e.target.value })}
              />
            </div>
            <div>
              <label className="label">Button text</label>
              <input
                className="input"
                value={plan.ctaText}
                onChange={(e) => updatePlan(index, { ctaText: e.target.value })}
              />
            </div>
            <div>
              <label className="label">Button link</label>
              <input
                className="input"
                value={plan.ctaLink}
                onChange={(e) => updatePlan(index, { ctaLink: e.target.value })}
              />
            </div>
            <div>
              <label className="label">Theme</label>
              <select
                className="input"
                value={plan.theme}
                onChange={(e) => updatePlan(index, { theme: e.target.value as PricingTheme })}
              >
                {THEMES.map((theme) => (
                  <option key={theme} value={theme}>
                    {theme}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="label">Badge (leave empty to hide)</label>
              <input
                className="input"
                value={plan.badge}
                onChange={(e) => updatePlan(index, { badge: e.target.value, featured: Boolean(e.target.value) })}
              />
            </div>
          </div>
        </FormCard>
      ))}

      <button
        type="button"
        onClick={addPlan}
        className="inline-flex items-center gap-2 text-sm font-semibold text-brand hover:underline"
      >
        <Plus className="h-4 w-4" /> Add plan
      </button>

      <FormCard>
        <h2 className="font-semibold">Quick comparison</h2>
        <div className="mt-4">
          <label className="label">Section title</label>
          <input className="input" name="comparisonTitle" defaultValue={initial.comparisonTitle} />
        </div>
        <p className="mt-3 text-xs text-white/50">
          Use <code>check</code> for a tick, <code>dash</code> for —, or any label such as Basic / Advanced.
        </p>
        <div className="mt-4 space-y-3">
          {comparison.map((row, index) => (
            <div key={index} className="rounded-lg border border-white/10 p-3">
              <div className="mb-2 flex justify-end">
                <button
                  type="button"
                  onClick={() => setComparison((rows) => rows.filter((_, i) => i !== index))}
                  className="text-white/50 hover:text-red-400"
                  aria-label="Remove row"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              <div className="grid gap-2 sm:grid-cols-[1fr_8rem]">
                <input
                  className="input"
                  placeholder="Feature"
                  value={row.feature}
                  onChange={(e) => updateRow(index, { feature: e.target.value })}
                />
                <select
                  className="input"
                  value={row.icon}
                  onChange={(e) => updateRow(index, { icon: e.target.value })}
                >
                  {ICONS.map((icon) => (
                    <option key={icon} value={icon}>
                      {icon}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mt-2 grid gap-2 sm:grid-cols-3">
                {plans.map((plan, planIndex) => (
                  <div key={`${index}-${planIndex}`}>
                    <label className="label">{plan.title || `Plan ${planIndex + 1}`}</label>
                    <input
                      className="input"
                      value={row.values[planIndex] ?? ""}
                      onChange={(e) => {
                        const values = padValues(row.values, plans.length);
                        values[planIndex] = e.target.value;
                        updateRow(index, { values });
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() =>
            setComparison((rows) => [...rows, { ...EMPTY_ROW, values: plans.map(() => "dash") }])
          }
          className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand hover:underline"
        >
          <Plus className="h-4 w-4" /> Add comparison row
        </button>
      </FormCard>

      <FormCard>
        <h2 className="font-semibold">Bottom CTA</h2>
        <div className="mt-4 space-y-4">
          <div>
            <label className="label">Headline</label>
            <input className="input" name="ctaHeadline" defaultValue={initial.ctaHeadline} />
          </div>
          <div>
            <label className="label">Subtitle</label>
            <textarea className="input" name="ctaSubtitle" rows={3} defaultValue={initial.ctaSubtitle} />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="label">Button text</label>
              <input className="input" name="ctaText" defaultValue={initial.ctaText} />
            </div>
            <div>
              <label className="label">Button link</label>
              <input className="input" name="ctaLink" defaultValue={initial.ctaLink} />
            </div>
          </div>
        </div>
      </FormCard>

      <SaveBar />
    </form>
  );
}

function padValues(values: string[], count: number) {
  const next = [...values];
  while (next.length < count) next.push("dash");
  return next.slice(0, count);
}
