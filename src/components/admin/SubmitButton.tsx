"use client";

import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";

type Props = {
  children: React.ReactNode;
  className?: string;
  pendingLabel?: React.ReactNode;
  title?: string;
  ariaLabel?: string;
};

export function SubmitButton({ children, className, pendingLabel, title, ariaLabel }: Props) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      title={title}
      aria-label={ariaLabel}
      aria-busy={pending}
      className={`${className ?? ""} ${pending ? "cursor-not-allowed opacity-60" : ""}`.trim()}
    >
      {pending ? (
        <span className="inline-flex items-center gap-2">
          <Loader2 className="h-4 w-4 animate-spin" />
          {pendingLabel}
        </span>
      ) : (
        children
      )}
    </button>
  );
}
