import Link from "next/link";
import { SubmitButton } from "@/components/admin/SubmitButton";

export function Toolbar({
  title,
  description,
  actionHref,
  actionLabel
}: {
  title: string;
  description?: string;
  actionHref?: string;
  actionLabel?: string;
}) {
  return (
    <div className="mb-6 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
      <div>
        <h1 className="text-2xl font-bold">{title}</h1>
        {description && <p className="mt-1 text-sm text-white/60">{description}</p>}
      </div>
      {actionHref && (
        <Link href={actionHref} className="btn btn-primary">
          {actionLabel ?? "New"}
        </Link>
      )}
    </div>
  );
}

export function FormCard({ children }: { children: React.ReactNode }) {
  return <div className="rounded-xl border border-white/10 bg-ink-800 p-6">{children}</div>;
}

export function SaveBar({ saveLabel = "Save changes" }: { saveLabel?: string }) {
  return (
    <div className="mt-6 flex justify-end gap-2">
      <SubmitButton className="btn btn-primary" pendingLabel="Saving...">
        {saveLabel}
      </SubmitButton>
    </div>
  );
}
