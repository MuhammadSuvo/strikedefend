import { ImageUploader } from "@/components/admin/ImageUploader";
import { saveService } from "@/app/admin/actions";
import { FormCard, SaveBar } from "@/components/admin/Toolbar";
import { parseJsonArray } from "@/lib/json";
import { parseServiceRecord } from "@/lib/service-content";
import { stringifyPipeRows } from "@/lib/service-longform";
import type { ServiceRecord } from "@/lib/data-types";

function stringifyStructured(items: unknown, keys: string[]): string {
  if (!Array.isArray(items)) return "";
  return items
    .map((it) => {
      const obj = it as Record<string, string>;
      return keys.map((k) => obj?.[k] ?? "").join(" | ");
    })
    .join("\n");
}

function stringifyList(items: unknown): string {
  return parseJsonArray<string>(items).join("\n");
}

function stringifyDeliverables(items: unknown): string {
  if (!Array.isArray(items)) return "";
  return items
    .map((it) => {
      const d = it as { title?: string; items?: string[] };
      return `${d.title ?? ""} | ${(d.items ?? []).join("; ")}`;
    })
    .join("\n");
}

type Props = { service?: ServiceRecord };

export function ServiceForm({ service }: Props) {
  const page = service ? parseServiceRecord(service) : null;
  const longform = page?.extras.longform;

  return (
    <form action={saveService} className="max-w-3xl space-y-6">
      {service?.id && <input type="hidden" name="id" value={service.id} />}

      <FormCard>
        <h2 className="font-semibold">Basic Info</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <label className="label">Title</label>
            <input className="input" name="title" defaultValue={service?.title} required />
          </div>
          <div>
            <label className="label">Slug (auto if empty)</label>
            <input className="input" name="slug" defaultValue={service?.slug} placeholder="web-application-pentesting" />
          </div>
          <div>
            <label className="label">Short Title (cards)</label>
            <input className="input" name="shortTitle" defaultValue={service?.shortTitle} />
          </div>
          <div>
            <label className="label">Order</label>
            <input className="input" type="number" name="order" defaultValue={service?.order ?? 0} />
          </div>
        </div>
        <div className="mt-4">
          <label className="label">Short Text (listing cards)</label>
          <input className="input" name="shortText" defaultValue={service?.shortText} required />
        </div>
        <div className="mt-4">
          <label className="label">Meta Description (SEO)</label>
          <textarea className="input" name="metaDescription" rows={2} defaultValue={service?.metaDescription} />
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <div>
            <label className="label">Icon</label>
            <select className="input" name="icon" defaultValue={service?.icon ?? "shield"}>
              {["shield", "globe", "cloud", "cpu", "activity", "network", "lock", "code"].map((i) => (
                <option key={i} value={i}>{i}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="label">Hero Visual</label>
            <select className="input" name="visual" defaultValue={service?.visual ?? "web"}>
              {["web", "mobile", "cloud", "monitoring"].map((v) => (
                <option key={v} value={v}>{v}</option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-2 pt-7">
            <input id="pub" type="checkbox" name="published" defaultChecked={service?.published ?? true} />
            <label htmlFor="pub" className="text-sm">Published</label>
          </div>
        </div>
        <div className="mt-4">
          <label className="label">Visual label</label>
          <input className="input" name="visualLabel" defaultValue={page?.extras.visualLabel} placeholder="Cloud Infrastructure Scan" />
        </div>
        <div className="mt-4">
          <label className="label">Visual tags (one per line: text | color | x | y)</label>
          <p className="mb-2 text-xs text-white/50">
            Colors: cyan, violet, amber, rose, emerald. Positions as percentages, e.g. 16% | 18%.
          </p>
          <textarea
            className="input font-mono text-xs"
            name="visualNodes"
            rows={6}
            defaultValue={stringifyStructured(page?.extras.visualNodes, ["text", "color", "x", "y"])}
          />
        </div>
        <div className="mt-4">
          <label className="label">Terminal command</label>
          <input className="input font-mono text-xs" name="visualCommand" defaultValue={page?.extras.visualCommand} />
        </div>
        <div className="mt-4">
          <label className="label">Terminal lines (one per line, start with [+] or [!])</label>
          <textarea
            className="input font-mono text-xs"
            name="visualLines"
            rows={4}
            defaultValue={(page?.extras.visualLines ?? []).join("\n")}
          />
        </div>
      </FormCard>

      <FormCard>
        <h2 className="font-semibold">Hero image</h2>
        <p className="mt-1 text-xs text-white/50">
          Upload, replace, or remove the hero graphic. Changes are saved with this service and appear on the public page after you click Save.
        </p>
        <div className="mt-4">
          <ImageUploader
            name="imageUrl"
            defaultValue={page?.imageUrl ?? service?.imageUrl ?? ""}
            folder="strikedefend/services"
            helpText="After uploading or replacing, click Save changes at the bottom of this page."
          />
        </div>
      </FormCard>

      <FormCard>
        <h2 className="font-semibold">Hero Section</h2>
        <div className="mt-4 space-y-4">
          <div>
            <label className="label">Badge</label>
            <input className="input" name="heroBadge" defaultValue={page?.heroBadge ?? "AI + Human Penetration Testing Platform"} />
          </div>
          <div>
            <label className="label">Hero Subtitle</label>
            <textarea className="input" name="heroSubtitle" rows={3} defaultValue={page?.heroSubtitle} required />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="label">Primary CTA Text</label>
              <input className="input" name="heroPrimaryCta" defaultValue={page?.heroPrimaryCta ?? "Get Free Consultation"} />
            </div>
            <div>
              <label className="label">Secondary CTA Text</label>
              <input className="input" name="heroSecondaryCta" defaultValue={page?.heroSecondaryCta ?? "Contact with Us"} />
            </div>
          </div>
        </div>
      </FormCard>

      <FormCard>
        <h2 className="font-semibold">Longform page content</h2>
        <p className="mt-1 text-xs text-white/50">
          Enable this for the article-style layout (hero, what we test, process, comparison, deliverables, CTA). Every field below is stored in the database — add, edit, or clear content anytime, then Save.
        </p>
        <div className="mt-4 space-y-4">
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              name="longformEnabled"
              defaultChecked={page?.extras.longformEnabled}
              className="h-4 w-4 accent-brand"
            />
            <span className="text-sm">Use longform layout on the public service page</span>
          </label>
          <div>
            <label className="label">Intro headline</label>
            <input className="input" name="introHeadline" defaultValue={longform?.introHeadline} />
          </div>
          <div>
            <label className="label">Intro paragraphs (one per line)</label>
            <textarea className="input" name="introParagraphs" rows={5} defaultValue={(longform?.introParagraphs ?? []).join("\n")} />
          </div>
          <div>
            <label className="label">Platform badge</label>
            <input
              className="input"
              name="platformBadge"
              defaultValue={longform?.platformBadge ?? "AI + Human Penetration Testing Platform"}
            />
          </div>
          <div>
            <label className="label">Platform section title</label>
            <input
              className="input"
              name="platformTitle"
              defaultValue={longform?.platformTitle ?? "AI + Human Penetration Testing Platform"}
            />
          </div>
          <div>
            <label className="label">Platform intro</label>
            <textarea className="input" name="platformIntro" rows={2} defaultValue={longform?.platformIntro} />
          </div>
          <div>
            <label className="label">Platform points (one per line: title | text)</label>
            <textarea
              className="input font-mono text-xs"
              name="platformItems"
              rows={4}
              defaultValue={stringifyStructured(longform?.platformItems, ["title", "text"])}
            />
          </div>
          <div>
            <label className="label">Hero CTA / secondary / bottom CTA (one per line)</label>
            <textarea
              className="input font-mono text-xs"
              name="heroCtas"
              rows={3}
              defaultValue={[longform?.heroCta, longform?.secondaryCta, longform?.bottomCta].filter(Boolean).join("\n")}
            />
          </div>
          <div>
            <label className="label">Hero highlights (one per line: title | text)</label>
            <textarea
              className="input font-mono text-xs"
              name="heroHighlights"
              rows={4}
              defaultValue={stringifyStructured(longform?.heroHighlights, ["title", "text"])}
            />
          </div>
          <div>
            <label className="label">Hero tags (one per line)</label>
            <textarea className="input font-mono text-xs" name="heroTags" rows={4} defaultValue={(longform?.heroTags ?? []).join("\n")} />
          </div>
          <div>
            <label className="label">Process overview (one per line: step | title | text)</label>
            <textarea
              className="input font-mono text-xs"
              name="processOverview"
              rows={8}
              defaultValue={stringifyStructured(longform?.processOverview, ["step", "title", "text"])}
            />
          </div>
          <div>
            <label className="label">Receive cards (one per line: title | text)</label>
            <textarea
              className="input font-mono text-xs"
              name="receiveCards"
              rows={6}
              defaultValue={stringifyStructured(longform?.receiveCards, ["title", "text"])}
            />
          </div>
          <div>
            <label className="label">Comparison title</label>
            <input className="input" name="comparisonTitle" defaultValue={longform?.comparisonTitle} />
          </div>
          <div>
            <label className="label">Comparison blurb</label>
            <textarea className="input" name="comparisonBlurb" rows={2} defaultValue={longform?.comparisonBlurb} />
          </div>
          <div>
            <label className="label">Comparison CTA button</label>
            <input className="input" name="comparisonCta" defaultValue={longform?.comparisonCta} />
          </div>
          <div>
            <label className="label">Scanner / tester code and results</label>
            <textarea className="input font-mono text-xs" name="scannerCode" rows={4} defaultValue={longform?.scannerCode} />
            <input className="input mt-2" name="scannerResult" defaultValue={longform?.scannerResult} placeholder="No issues found." />
            <textarea className="input mt-2 font-mono text-xs" name="testerCode" rows={4} defaultValue={longform?.testerCode} />
            <input className="input mt-2" name="testerResult" defaultValue={longform?.testerResult} placeholder="High Risk Vulnerability" />
          </div>
          <div>
            <label className="label">How it works title</label>
            <input className="input" name="howTitle" defaultValue={longform?.howTitle} />
          </div>
          <div>
            <label className="label">How it works intro</label>
            <textarea className="input" name="howIntro" rows={2} defaultValue={longform?.howIntro} />
          </div>
          <div>
            <label className="label">How it works flow (one step per line)</label>
            <textarea className="input font-mono text-xs" name="howFlow" rows={8} defaultValue={(longform?.howFlow ?? []).join("\n")} />
          </div>
          <div>
            <label className="label">How it works steps (one per line: step | title | intro | items; | footer | map title | map items)</label>
            <p className="mb-2 text-xs text-white/50">Map items example: Login; APIs: Users, Orders, Payments</p>
            <textarea
              className="input font-mono text-xs"
              name="howSteps"
              rows={8}
              defaultValue={stringifyPipeRows(longform?.howSteps, ["step", "title", "intro", "items", "footer", "mapTitle", "mapItems"])}
            />
          </div>
          <div>
            <label className="label">What we test title</label>
            <input className="input" name="whatWeTestTitle" defaultValue={longform?.whatWeTestTitle} />
          </div>
          <div>
            <label className="label">What we test intro</label>
            <textarea className="input" name="whatWeTestIntro" rows={2} defaultValue={longform?.whatWeTestIntro} />
          </div>
          <div>
            <label className="label">Test areas (one per line: title | intro | items; | goal | expected title | expected flow &gt; | abuse title | abuse flow &gt;)</label>
            <textarea
              className="input font-mono text-xs"
              name="testAreas"
              rows={10}
              defaultValue={stringifyPipeRows(longform?.testAreas, ["title", "intro", "items", "goal", "expectedTitle", "expectedFlow", "abuseTitle", "abuseFlow"])}
            />
          </div>
          <div>
            <label className="label">Sample finding intro</label>
            <input className="input" name="findingIntro" defaultValue={longform?.findingIntro} />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="label">Finding — vulnerability</label>
              <input className="input" name="findingVulnerability" defaultValue={longform?.finding?.vulnerability} />
            </div>
            <div>
              <label className="label">Finding — severity</label>
              <input className="input" name="findingSeverity" defaultValue={longform?.finding?.severity} />
            </div>
            <div>
              <label className="label">Finding — component</label>
              <input className="input" name="findingComponent" defaultValue={longform?.finding?.component} />
            </div>
            <div>
              <label className="label">Finding — risk</label>
              <input className="input" name="findingRisk" defaultValue={longform?.finding?.risk} />
            </div>
          </div>
          <div>
            <label className="label">Finding — evidence</label>
            <textarea className="input" name="findingEvidence" rows={2} defaultValue={longform?.finding?.evidence} />
          </div>
          <div>
            <label className="label">Finding — recommendation</label>
            <textarea className="input" name="findingRecommendation" rows={2} defaultValue={longform?.finding?.recommendation} />
          </div>
          <div>
            <label className="label">From finding to fix title</label>
            <input className="input" name="findingToFixTitle" defaultValue={longform?.findingToFixTitle} />
          </div>
          <div>
            <label className="label">From finding to fix intro</label>
            <textarea className="input" name="findingToFixIntro" rows={3} defaultValue={longform?.findingToFixIntro} />
          </div>
          <div>
            <label className="label">From finding to fix flow (one per line)</label>
            <textarea className="input font-mono text-xs" name="findingToFixFlow" rows={6} defaultValue={(longform?.findingToFixFlow ?? []).join("\n")} />
          </div>
          <div>
            <label className="label">What you receive title</label>
            <input className="input" name="receiveTitle" defaultValue={longform?.receiveTitle} />
          </div>
          <div>
            <label className="label">What you receive intro</label>
            <input className="input" name="receiveIntro" defaultValue={longform?.receiveIntro} />
          </div>
          <div>
            <label className="label">What you receive (one per line)</label>
            <textarea className="input font-mono text-xs" name="receiveItems" rows={6} defaultValue={(longform?.receiveItems ?? []).join("\n")} />
          </div>
          <div>
            <label className="label">Why manual title</label>
            <input className="input" name="whyManualTitle" defaultValue={longform?.whyManualTitle} />
          </div>
          <div>
            <label className="label">Why manual intro</label>
            <textarea className="input" name="whyManualIntro" rows={2} defaultValue={longform?.whyManualIntro} />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="label">Scanner title</label>
              <input className="input" name="scannerTitle" defaultValue={longform?.scannerTitle} />
            </div>
            <div>
              <label className="label">Tester title</label>
              <input className="input" name="testerTitle" defaultValue={longform?.testerTitle} />
            </div>
          </div>
          <div>
            <label className="label">Scanner flow (one per line)</label>
            <textarea className="input font-mono text-xs" name="scannerFlow" rows={4} defaultValue={(longform?.scannerFlow ?? []).join("\n")} />
          </div>
          <div>
            <label className="label">Tester flow (one per line)</label>
            <textarea className="input font-mono text-xs" name="testerFlow" rows={4} defaultValue={(longform?.testerFlow ?? []).join("\n")} />
          </div>
          <div>
            <label className="label">Why manual conclusion</label>
            <textarea className="input" name="whyManualConclusion" rows={2} defaultValue={longform?.whyManualConclusion} />
          </div>
          <div>
            <label className="label">Business context title</label>
            <input className="input" name="contextTitle" defaultValue={longform?.contextTitle} />
          </div>
          <div>
            <label className="label">Quote we don&apos;t simply ask</label>
            <input className="input" name="contextQuote1" defaultValue={longform?.contextQuote1} />
          </div>
          <div>
            <label className="label">Quote we also ask</label>
            <input className="input" name="contextQuote2" defaultValue={longform?.contextQuote2} />
          </div>
          <div>
            <label className="label">Business context intro</label>
            <input className="input" name="contextIntro" defaultValue={longform?.contextIntro} />
          </div>
          <div>
            <label className="label">Business context items (one per line)</label>
            <textarea className="input font-mono text-xs" name="contextItems" rows={5} defaultValue={(longform?.contextItems ?? []).join("\n")} />
          </div>
          <div>
            <label className="label">Questions title</label>
            <input className="input" name="questionsTitle" defaultValue={longform?.questionsTitle} />
          </div>
          <div>
            <label className="label">Questions intro</label>
            <textarea className="input" name="questionsIntro" rows={3} defaultValue={longform?.questionsIntro} />
          </div>
          <div>
            <label className="label">Questions (one per line)</label>
            <textarea className="input font-mono text-xs" name="questions" rows={6} defaultValue={(longform?.questions ?? []).join("\n")} />
          </div>
          <div>
            <label className="label">Closing title</label>
            <input className="input" name="closeTitle" defaultValue={longform?.closeTitle} />
          </div>
          <div>
            <label className="label">Closing body</label>
            <textarea className="input" name="closeBody" rows={3} defaultValue={longform?.closeBody} />
          </div>
          <div>
            <label className="label">Closing highlights (one per line)</label>
            <textarea className="input font-mono text-xs" name="closeHighlights" rows={4} defaultValue={(longform?.closeHighlights ?? []).join("\n")} />
          </div>
          <div>
            <label className="label">Closing question</label>
            <textarea className="input" name="closeQuestion" rows={2} defaultValue={longform?.closeQuestion} />
          </div>
        </div>
      </FormCard>

      <FormCard>
        <h2 className="font-semibold">Why Choose</h2>
        <div className="mt-4 space-y-4">
          <div>
            <label className="label">Section Title</label>
            <input className="input" name="whyTitle" defaultValue={page?.whyTitle ?? "Why Choose This Service?"} />
          </div>
          <div>
            <label className="label">Items (one per line: title | text)</label>
            <textarea
              className="input font-mono text-xs"
              name="whyItems"
              rows={6}
              defaultValue={stringifyStructured(page?.whyItems, ["title", "text"])}
            />
          </div>
        </div>
      </FormCard>

      <FormCard>
        <h2 className="font-semibold">Overview</h2>
        <div className="mt-4 space-y-4">
          <div>
            <label className="label">Overview Title</label>
            <input className="input" name="overviewTitle" defaultValue={page?.overviewTitle ?? "Overview"} />
          </div>
          <div>
            <label className="label">Overview Text</label>
            <textarea className="input" name="overviewText" rows={4} defaultValue={page?.overviewText ?? service?.description} />
          </div>
          <div>
            <label className="label">Full Description (legacy field)</label>
            <textarea className="input" name="description" rows={3} defaultValue={service?.description} />
          </div>
          <div>
            <label className="label">Overview List (one item per line)</label>
            <textarea className="input font-mono text-xs" name="overviewList" rows={6} defaultValue={stringifyList(page?.overviewList)} />
          </div>
        </div>
      </FormCard>

      <FormCard>
        <h2 className="font-semibold">What We Assess</h2>
        <div className="mt-4 space-y-4">
          <div>
            <label className="label">Section Title</label>
            <input className="input" name="assessTitle" defaultValue={page?.assessTitle ?? "What We Assess"} />
          </div>
          <div>
            <label className="label">Items (one per line)</label>
            <textarea className="input font-mono text-xs" name="assessItems" rows={6} defaultValue={stringifyList(page?.assessItems)} />
          </div>
          <div>
            <label className="label">Card Features (one per line, optional)</label>
            <textarea className="input font-mono text-xs" name="features" rows={4} defaultValue={stringifyList(service?.features)} />
          </div>
        </div>
      </FormCard>

      <FormCard>
        <h2 className="font-semibold">Standards, Process &amp; Tools</h2>
        <p className="mt-1 text-xs text-white/50">
          These blocks appear on the public service page. Add, edit, or remove items anytime, then save.
        </p>
        <div className="mt-4 space-y-4">
          <div>
            <label className="label">Standards heading</label>
            <input className="input" name="standardsTitle" defaultValue={page?.extras.standardsTitle} />
          </div>
          <div>
            <label className="label">Standards subtitle</label>
            <textarea className="input" name="standardsSubtitle" rows={2} defaultValue={page?.extras.standardsSubtitle} />
          </div>
          <div>
            <label className="label">Industry Standards (one per line)</label>
            <textarea className="input font-mono text-xs" name="standards" rows={6} defaultValue={stringifyList(page?.standards)} />
          </div>
          <div>
            <label className="label">Process Title</label>
            <input className="input" name="processTitle" defaultValue={page?.processTitle ?? "Process"} />
          </div>
          <div>
            <label className="label">Process subtitle</label>
            <textarea className="input" name="processSubtitle" rows={2} defaultValue={page?.extras.processSubtitle} />
          </div>
          <div>
            <label className="label">Process Steps (one per line: step | title | text)</label>
            <textarea
              className="input font-mono text-xs"
              name="processSteps"
              rows={6}
              defaultValue={stringifyStructured(page?.processSteps, ["step", "title", "text"])}
            />
          </div>
          <div>
            <label className="label">Tools heading</label>
            <input className="input" name="toolsTitle" defaultValue={page?.extras.toolsTitle} />
          </div>
          <div>
            <label className="label">Tools (one per line)</label>
            <textarea className="input font-mono text-xs" name="tools" rows={6} defaultValue={stringifyList(page?.tools)} />
          </div>
          <div>
            <label className="label">Industries (one per line)</label>
            <textarea className="input font-mono text-xs" name="industries" rows={4} defaultValue={stringifyList(page?.industries)} />
          </div>
        </div>
      </FormCard>

      <FormCard>
        <h2 className="font-semibold">Deliverables &amp; FAQ</h2>
        <div className="mt-4 space-y-4">
          <div>
            <label className="label">Deliverables (one per line: title | item1; item2)</label>
            <textarea
              className="input font-mono text-xs"
              name="deliverables"
              rows={6}
              defaultValue={stringifyDeliverables(page?.deliverables)}
            />
          </div>
          <div>
            <label className="label">FAQs (one per line: question | answer)</label>
            <textarea
              className="input font-mono text-xs"
              name="faqs"
              rows={6}
              defaultValue={stringifyStructured(page?.faqs, ["question", "answer"])}
            />
          </div>
        </div>
      </FormCard>

      <FormCard>
        <h2 className="font-semibold">Agent Workflow &amp; Extra Content</h2>
        <p className="mt-1 text-xs text-white/50">
          Optional sections such as the agent diagram, how it works, benefits, and why this service is needed.
        </p>
        <div className="mt-4 space-y-4">
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              name="workflowEnabled"
              defaultChecked={page?.extras.workflowEnabled}
              className="h-4 w-4 accent-brand"
            />
            <span className="text-sm">Show agent workflow diagram</span>
          </label>
          <div>
            <label className="label">Workflow Title</label>
            <input className="input" name="workflowTitle" defaultValue={page?.extras.workflowTitle} />
          </div>
          <div>
            <label className="label">Workflow Subtitle</label>
            <textarea className="input" name="workflowSubtitle" rows={2} defaultValue={page?.extras.workflowSubtitle} />
          </div>
          <div>
            <label className="label">Manager Agent</label>
            <input className="input" name="workflowManager" defaultValue={page?.extras.workflowManager} />
          </div>
          <div>
            <label className="label">Specialist agents (one per line: title | text)</label>
            <textarea
              className="input font-mono text-xs"
              name="workflowSpecialists"
              rows={4}
              defaultValue={stringifyStructured(page?.extras.workflowSpecialists, ["title", "text"])}
            />
          </div>
          <div>
            <label className="label">Pipeline agents (one per line: title | text)</label>
            <textarea
              className="input font-mono text-xs"
              name="workflowPipeline"
              rows={6}
              defaultValue={stringifyStructured(page?.extras.workflowPipeline, ["title", "text"])}
            />
          </div>
          <div>
            <label className="label">How it works title</label>
            <input className="input" name="howItWorksTitle" defaultValue={page?.extras.howItWorksTitle} />
          </div>
          <div>
            <label className="label">How it works (one per line: title | text)</label>
            <textarea
              className="input font-mono text-xs"
              name="howItWorksItems"
              rows={5}
              defaultValue={stringifyStructured(page?.extras.howItWorksItems, ["title", "text"])}
            />
          </div>
          <div>
            <label className="label">Benefits title</label>
            <input className="input" name="benefitsTitle" defaultValue={page?.extras.benefitsTitle} />
          </div>
          <div>
            <label className="label">Benefits (one per line: title | text)</label>
            <textarea
              className="input font-mono text-xs"
              name="benefitsItems"
              rows={5}
              defaultValue={stringifyStructured(page?.extras.benefitsItems, ["title", "text"])}
            />
          </div>
          <div>
            <label className="label">Why needed title</label>
            <input className="input" name="whyNeededTitle" defaultValue={page?.extras.whyNeededTitle} />
          </div>
          <div>
            <label className="label">Why needed intro</label>
            <textarea className="input" name="whyNeededText" rows={3} defaultValue={page?.extras.whyNeededText} />
          </div>
          <div>
            <label className="label">Why needed items (one per line: title | text)</label>
            <textarea
              className="input font-mono text-xs"
              name="whyNeededItems"
              rows={5}
              defaultValue={stringifyStructured(page?.extras.whyNeededItems, ["title", "text"])}
            />
          </div>
        </div>
      </FormCard>

      <FormCard>
        <h2 className="font-semibold">Bottom CTA</h2>
        <div className="mt-4 space-y-4">
          <div>
            <label className="label">CTA Headline</label>
            <input className="input" name="ctaHeadline" defaultValue={page?.ctaHeadline ?? "Ready to get started?"} />
          </div>
          <div>
            <label className="label">CTA Subtitle</label>
            <textarea className="input" name="ctaSubtitle" rows={2} defaultValue={page?.ctaSubtitle} />
          </div>
          <div>
            <label className="label">CTA Button Text</label>
            <input className="input" name="ctaText" defaultValue={page?.ctaText ?? "Request Assessment"} />
          </div>
        </div>
      </FormCard>

      <SaveBar />
    </form>
  );
}
