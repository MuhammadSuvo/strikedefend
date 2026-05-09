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
