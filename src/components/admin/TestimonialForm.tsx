import { ImageUploader } from "@/components/admin/ImageUploader";
import { saveTestimonial } from "@/app/admin/actions";
import { FormCard, SaveBar } from "@/components/admin/Toolbar";

type T = {
  id?: string;
  name?: string;
  role?: string | null;
  company?: string | null;
  quote?: string;
  avatarUrl?: string | null;
  rating?: number;
  order?: number;
  published?: boolean;
};

export function TestimonialForm({ item }: { item?: T }) {
  return (
    <form action={saveTestimonial} className="max-w-3xl">
      {item?.id && <input type="hidden" name="id" value={item.id} />}
      <FormCard>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="label">Name</label>
            <input className="input" name="name" defaultValue={item?.name} required />
          </div>
          <div>
            <label className="label">Role</label>
            <input className="input" name="role" defaultValue={item?.role ?? ""} />
          </div>
          <div>
            <label className="label">Company</label>
            <input className="input" name="company" defaultValue={item?.company ?? ""} />
          </div>
          <div>
            <label className="label">Rating (1–5)</label>
            <input className="input" type="number" min={1} max={5} name="rating" defaultValue={item?.rating ?? 5} />
          </div>
        </div>
        <div className="mt-4">
          <label className="label">Quote</label>
          <textarea className="input" rows={4} name="quote" defaultValue={item?.quote} required />
        </div>
        <div className="mt-4">
          <label className="label">Avatar</label>
          <ImageUploader name="avatarUrl" defaultValue={item?.avatarUrl ?? ""} folder="strikedefend/avatars" />
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <div>
            <label className="label">Order</label>
            <input className="input" type="number" name="order" defaultValue={item?.order ?? 0} />
          </div>
          <div className="flex items-center gap-2 pt-7">
            <input id="pubt" type="checkbox" name="published" defaultChecked={item?.published ?? true} />
            <label htmlFor="pubt" className="text-sm">Published</label>
          </div>
        </div>
      </FormCard>
      <SaveBar />
    </form>
  );
}
