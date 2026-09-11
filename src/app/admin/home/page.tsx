import { getHomeContent } from "@/lib/settings";
import { saveHome } from "@/app/admin/actions";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { Toolbar, FormCard, SaveBar } from "@/components/admin/Toolbar";

export const dynamic = "force-dynamic";

function stringifyStructured(items: unknown, keys: string[]): string {
  if (!Array.isArray(items)) return "";
  return items
    .map((it) => {
      const obj = it as Record<string, string>;
      return keys.map((k) => obj?.[k] ?? "").join(" | ");
    })
    .join("\n");
}

function stringifyTerminal(items: unknown): string {
  if (!Array.isArray(items)) return "";
  return items
    .map((it) => {
      const line = it as { status?: string; text?: string };
      return `${line.status ?? "+"} | ${line.text ?? ""}`;
    })
    .join("\n");
}

export default async function AdminHomePage() {
  const home = await getHomeContent();

  return (
    <div className="max-w-3xl">
      <Toolbar title="Home Content" description="Edit the public homepage." />
      <form action={saveHome}>
        <div className="space-y-6">
          <FormCard>
            <h2 className="font-semibold">Hero</h2>
            <div className="mt-4 space-y-4">
              <div>
                <label className="label">Headline</label>
                <input className="input" name="heroHeadline" defaultValue={home.heroHeadline} required />
              </div>
              <div>
                <label className="label">Subtitle</label>
                <textarea className="input" name="heroSubtitle" rows={3} defaultValue={home.heroSubtitle} required />
              </div>
              <div>
                <label className="label">Hero Image</label>
                <ImageUploader name="heroImageUrl" defaultValue={home.heroImageUrl} folder="strikedefend/home" />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="label">Primary CTA Text</label>
                  <input className="input" name="primaryCtaText" defaultValue={home.primaryCtaText} />
                </div>
                <div>
                  <label className="label">Primary CTA Link</label>
                  <input className="input" name="primaryCtaLink" defaultValue={home.primaryCtaLink} />
                </div>
                <div>
                  <label className="label">Secondary CTA Text</label>
                  <input className="input" name="secondaryCtaText" defaultValue={home.secondaryCtaText} />
                </div>
                <div>
                  <label className="label">Secondary CTA Link</label>
                  <input className="input" name="secondaryCtaLink" defaultValue={home.secondaryCtaLink} />
                </div>
              </div>
            </div>
          </FormCard>

          <FormCard>
            <h2 className="font-semibold">End-to-End Security Testing</h2>
            <p className="mt-1 text-xs text-white/50">
              The colorful security capabilities section shown after services on the homepage.
            </p>
            <div className="mt-4 space-y-4">
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  name="securityEnabled"
                  defaultChecked={home.securityEnabled}
                  className="h-4 w-4 accent-brand"
                />
                <span className="text-sm">Show section on homepage</span>
              </label>
              <div>
                <label className="label">Tag</label>
                <input className="input" name="securityTag" defaultValue={home.securityTag} />
              </div>
              <div>
                <label className="label">Headline</label>
                <input className="input" name="securityTitle" defaultValue={home.securityTitle} required />
              </div>
              <div>
                <label className="label">Subtitle</label>
                <textarea className="input" name="securitySubtitle" rows={3} defaultValue={home.securitySubtitle} />
              </div>
              <div>
                <label className="label">
                  Capability cards (one per line, format: icon | color | title | text)
                </label>
                <p className="mb-2 text-xs text-white/50">
                  Icons: globe, network, key, workflow, cloud, file. Colors: cyan, violet, amber, rose, emerald, sky.
                </p>
                <textarea
                  className="input font-mono text-xs"
                  name="securityCapabilities"
                  rows={8}
                  defaultValue={stringifyStructured(home.securityCapabilities, ["icon", "color", "title", "text"])}
                />
              </div>
              <div>
                <label className="label">
                  Map hotspots (one per line, format: label | color | x | y)
                </label>
                <p className="mb-2 text-xs text-white/50">Use percentages for x and y, e.g. 18% and 22%.</p>
                <textarea
                  className="input font-mono text-xs"
                  name="securityHotspots"
                  rows={6}
                  defaultValue={stringifyStructured(home.securityHotspots, ["label", "color", "x", "y"])}
                />
              </div>
              <div>
                <label className="label">Stats (one per line, format: value | label)</label>
                <textarea
                  className="input font-mono text-xs"
                  name="securityStats"
                  rows={4}
                  defaultValue={stringifyStructured(home.securityStats, ["value", "label"])}
                />
              </div>
              <div>
                <label className="label">Terminal lines (one per line, format: + or ! | text)</label>
                <textarea
                  className="input font-mono text-xs"
                  name="securityTerminal"
                  rows={4}
                  defaultValue={stringifyTerminal(home.securityTerminal)}
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="label">CTA Text</label>
                  <input className="input" name="securityCtaText" defaultValue={home.securityCtaText} />
                </div>
                <div>
                  <label className="label">CTA Link</label>
                  <input className="input" name="securityCtaLink" defaultValue={home.securityCtaLink} />
                </div>
              </div>
            </div>
          </FormCard>

          <FormCard>
            <h2 className="font-semibold">Agent Workflow</h2>
            <p className="mt-1 text-xs text-white/50">
              The Pentest Manager Agent diagram on the homepage. Same structure as the Cloud service page.
            </p>
            <div className="mt-4 space-y-4">
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  name="workflowEnabled"
                  defaultChecked={home.workflowEnabled}
                  className="h-4 w-4 accent-brand"
                />
                <span className="text-sm">Show agent workflow on homepage</span>
              </label>
              <div>
                <label className="label">Title</label>
                <input className="input" name="workflowTitle" defaultValue={home.workflowTitle} />
              </div>
              <div>
                <label className="label">Subtitle</label>
                <textarea className="input" name="workflowSubtitle" rows={2} defaultValue={home.workflowSubtitle} />
              </div>
              <div>
                <label className="label">Manager Agent</label>
                <input className="input" name="workflowManager" defaultValue={home.workflowManager} />
              </div>
              <div>
                <label className="label">Specialist agents (one per line: title | text)</label>
                <textarea
                  className="input font-mono text-xs"
                  name="workflowSpecialists"
                  rows={4}
                  defaultValue={stringifyStructured(home.workflowSpecialists, ["title", "text"])}
                />
              </div>
              <div>
                <label className="label">Pipeline agents (one per line: title | text)</label>
                <textarea
                  className="input font-mono text-xs"
                  name="workflowPipeline"
                  rows={6}
                  defaultValue={stringifyStructured(home.workflowPipeline, ["title", "text"])}
                />
              </div>
            </div>
          </FormCard>

          <FormCard>
            <h2 className="font-semibold">Why Choose Us</h2>
            <div className="mt-4 space-y-4">
              <div>
                <label className="label">Title</label>
                <input className="input" name="whyTitle" defaultValue={home.whyTitle} />
              </div>
              <div>
                <label className="label">Subtitle</label>
                <textarea className="input" name="whySubtitle" rows={2} defaultValue={home.whySubtitle} />
              </div>
              <div>
                <label className="label">Items (one per line, format: title | text)</label>
                <textarea
                  className="input font-mono text-xs"
                  name="whyItems"
                  rows={6}
                  defaultValue={stringifyStructured(home.whyItems, ["title", "text"])}
                />
              </div>
            </div>
          </FormCard>

          <FormCard>
            <h2 className="font-semibold">Process</h2>
            <div className="mt-4 space-y-4">
              <div>
                <label className="label">Title</label>
                <input className="input" name="processTitle" defaultValue={home.processTitle} />
              </div>
              <div>
                <label className="label">Steps (one per line, format: step | title | text)</label>
                <textarea
                  className="input font-mono text-xs"
                  name="processSteps"
                  rows={6}
                  defaultValue={stringifyStructured(home.processSteps, ["step", "title", "text"])}
                />
              </div>
            </div>
          </FormCard>

          <FormCard>
            <h2 className="font-semibold">YouTube Video</h2>
            <p className="mt-1 text-xs text-white/50">
              Embed a YouTube video on the homepage. Toggle off to hide it without deleting the URL.
            </p>
            <div className="mt-4 space-y-4">
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  name="videoEnabled"
                  defaultChecked={home.videoEnabled}
                  className="h-4 w-4 accent-brand"
                />
                <span className="text-sm">Show video section on homepage</span>
              </label>
              <div>
                <label className="label">YouTube URL</label>
                <input
                  className="input"
                  name="videoUrl"
                  defaultValue={home.videoUrl ?? ""}
                  placeholder="https://www.youtube.com/watch?v=..."
                />
                <p className="mt-1 text-xs text-white/50">
                  Accepts youtube.com/watch?v=, youtu.be/, or youtube.com/embed/ links.
                </p>
              </div>
              <div>
                <label className="label">Section Title</label>
                <input className="input" name="videoTitle" defaultValue={home.videoTitle} />
              </div>
              <div>
                <label className="label">Section Subtitle</label>
                <textarea className="input" name="videoSubtitle" rows={2} defaultValue={home.videoSubtitle} />
              </div>
            </div>
          </FormCard>

          <FormCard>
            <h2 className="font-semibold">CTA Section</h2>
            <div className="mt-4 space-y-4">
              <div>
                <label className="label">CTA Headline</label>
                <input className="input" name="ctaHeadline" defaultValue={home.ctaHeadline} />
              </div>
              <div>
                <label className="label">CTA Subtitle</label>
                <textarea className="input" name="ctaSubtitle" rows={2} defaultValue={home.ctaSubtitle} />
              </div>
            </div>
          </FormCard>
        </div>
        <SaveBar />
      </form>
    </div>
  );
}
