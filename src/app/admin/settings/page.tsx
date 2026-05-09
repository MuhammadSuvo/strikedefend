import { getSiteSettings } from "@/lib/settings";
import { saveSettings } from "@/app/admin/actions";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { Toolbar, FormCard, SaveBar } from "@/components/admin/Toolbar";

export const dynamic = "force-dynamic";

export default async function AdminSettings() {
  const s = await getSiteSettings();
  return (
    <div className="max-w-3xl">
      <Toolbar title="Site Settings" description="Logo, branding colors, contact info, and footer." />
      <form action={saveSettings} className="space-y-6">
        <FormCard>
          <h2 className="font-semibold">Branding</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <label className="label">Site Name</label>
              <input className="input" name="siteName" defaultValue={s.siteName} required />
            </div>
            <div>
              <label className="label">Tagline</label>
              <input className="input" name="tagline" defaultValue={s.tagline} />
            </div>
            <div>
              <label className="label">Primary Color</label>
              <div className="flex items-center gap-2">
                <input className="input" name="primaryColor" defaultValue={s.primaryColor} />
                <span className="h-9 w-9 shrink-0 rounded border border-white/10" style={{ background: s.primaryColor }} />
              </div>
            </div>
            <div>
              <label className="label">Accent Color</label>
              <div className="flex items-center gap-2">
                <input className="input" name="accentColor" defaultValue={s.accentColor} />
                <span className="h-9 w-9 shrink-0 rounded border border-white/10" style={{ background: s.accentColor }} />
              </div>
            </div>
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <label className="label">Logo</label>
              <ImageUploader name="logoUrl" defaultValue={s.logoUrl} folder="strikedefend/branding" />
            </div>
            <div>
              <label className="label">Favicon</label>
              <ImageUploader name="faviconUrl" defaultValue={s.faviconUrl} folder="strikedefend/branding" />
            </div>
          </div>
        </FormCard>

        <FormCard>
          <h2 className="font-semibold">Contact</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <label className="label">Email</label>
              <input className="input" type="email" name="email" defaultValue={s.email} required />
            </div>
            <div>
              <label className="label">Phone</label>
              <input className="input" name="phone" defaultValue={s.phone} />
            </div>
            <div className="sm:col-span-2">
              <label className="label">Address</label>
              <input className="input" name="address" defaultValue={s.address} />
            </div>
          </div>
        </FormCard>

        <FormCard>
          <h2 className="font-semibold">Footer & Social</h2>
          <div className="mt-4 space-y-4">
            <div>
              <label className="label">Footer Text</label>
              <input className="input" name="footerText" defaultValue={s.footerText} />
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <label className="label">Twitter URL</label>
                <input className="input" name="twitterUrl" defaultValue={s.twitterUrl ?? ""} />
              </div>
              <div>
                <label className="label">LinkedIn URL</label>
                <input className="input" name="linkedinUrl" defaultValue={s.linkedinUrl ?? ""} />
              </div>
              <div>
                <label className="label">GitHub URL</label>
                <input className="input" name="githubUrl" defaultValue={s.githubUrl ?? ""} />
              </div>
            </div>
          </div>
        </FormCard>

        <SaveBar />
      </form>
    </div>
  );
}
