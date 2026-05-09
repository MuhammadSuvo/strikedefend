"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Upload, X } from "lucide-react";

export function ImageUploader({
  name,
  defaultValue,
  folder
}: {
  name: string;
  defaultValue?: string | null;
  folder?: string;
}) {
  const [value, setValue] = useState<string>(defaultValue || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  async function onPick(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setLoading(true);
    setError(null);
    try {
      const fd = new FormData();
      fd.append("file", file);
      if (folder) fd.append("folder", folder);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");
      setValue(data.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setLoading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <div>
      <input type="hidden" name={name} value={value} />
      {value ? (
        <div className="relative inline-block">
          <Image
            src={value}
            alt="Uploaded"
            width={240}
            height={160}
            className="h-40 w-auto rounded-lg border border-white/10 object-cover"
          />
          <button
            type="button"
            onClick={() => setValue("")}
            className="absolute -right-2 -top-2 rounded-full border border-white/10 bg-ink-800 p-1 text-white/80 hover:text-red-400"
            aria-label="Remove image"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <label className="flex h-32 w-full max-w-md cursor-pointer items-center justify-center gap-2 rounded-lg border border-dashed border-white/10 bg-white/[0.02] text-sm text-white/60 hover:border-brand/40 hover:text-white">
          <Upload className="h-4 w-4" />
          {loading ? "Uploading..." : "Click to upload image"}
          <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={onPick} />
        </label>
      )}
      {error && <p className="mt-2 text-sm text-red-400">{error}</p>}
    </div>
  );
}
