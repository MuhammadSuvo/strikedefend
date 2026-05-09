import { saveFaq } from "@/app/admin/actions";
import { FormCard, SaveBar } from "@/components/admin/Toolbar";

type F = { id?: string; question?: string; answer?: string; order?: number; published?: boolean };

export function FaqForm({ item }: { item?: F }) {
  return (
    <form action={saveFaq} className="max-w-3xl">
      {item?.id && <input type="hidden" name="id" value={item.id} />}
      <FormCard>
        <div>
          <label className="label">Question</label>
          <input className="input" name="question" defaultValue={item?.question} required />
        </div>
        <div className="mt-4">
          <label className="label">Answer</label>
          <textarea className="input" rows={5} name="answer" defaultValue={item?.answer} required />
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <div>
            <label className="label">Order</label>
            <input className="input" type="number" name="order" defaultValue={item?.order ?? 0} />
          </div>
          <div className="flex items-center gap-2 pt-7">
            <input id="pubf" type="checkbox" name="published" defaultChecked={item?.published ?? true} />
            <label htmlFor="pubf" className="text-sm">Published</label>
          </div>
        </div>
      </FormCard>
      <SaveBar />
    </form>
  );
}
