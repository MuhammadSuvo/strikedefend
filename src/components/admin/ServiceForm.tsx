import { ImageUploader } from "@/components/admin/ImageUploader";
import { saveService } from "@/app/admin/actions";
import { FormCard, SaveBar } from "@/components/admin/Toolbar";

type Service = {
  id?: string;
  slug?: string;
  title?: string;
  shortText?: string;
  description?: string;
  icon?: string | null;
  imageUrl?: string | null;
  features?: unknown;
  order?: number;
  published?: boolean;
};

export function ServiceForm({ service }: { service?: Service }) {
  const features = Array.isArray(service?.features) ? (service!.features as string[]).join("\n") : "";
  return (
    <form action={saveService} className="max-w-3xl space-y-6">
      {service?.id && <input type="hidden" name="id" value={service.id} />}
      <FormCard>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="label">Title</label>
            <input className="input" name="title" defaultValue={service?.title} required />
          </div>
          <div>
            <label className="label">Slug (auto if empty)</label>
            <input className="input" name="slug" defaultValue={service?.slug} />
          </div>
        </div>
        <div className="mt-4">
          <label className="label">Short Text</label>
          <input className="input" name="shortText" defaultValue={service?.shortText} required />
        </div>
        <div className="mt-4">
          <label className="label">Full Description</label>
          <textarea className="input" rows={5} name="description" defaultValue={service?.description} required />
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <div>
            <label className="label">Icon</label>
            <select className="input" name="icon" defaultValue={service?.icon ?? "shield"}>
              {["shield", "shieldcheck", "gauge", "bot", "cpu", "activity", "code", "lock"].map((i) => (
                <option key={i} value={i}>{i}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="label">Order</label>
            <input className="input" type="number" name="order" defaultValue={service?.order ?? 0} />
          </div>
          <div className="flex items-center gap-2 pt-7">
            <input id="pub" type="checkbox" name="published" defaultChecked={service?.published ?? true} />
            <label htmlFor="pub" className="text-sm">Published</label>
          </div>
        </div>
        <div className="mt-4">
          <label className="label">Features (one per line)</label>
          <textarea className="input" rows={5} name="features" defaultValue={features} />
        </div>
        <div className="mt-4">
          <label className="label">Service Image (optional)</label>
          <ImageUploader name="imageUrl" defaultValue={service?.imageUrl ?? ""} folder="strikedefend/services" />
        </div>
      </FormCard>
      <SaveBar />
    </form>
  );
}
