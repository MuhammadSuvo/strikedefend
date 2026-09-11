"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Upload, X } from "lucide-react";

export function ImageUploader({
  name,
  defaultValue,
  folder,
  helpText
}: {
  name: string;
  defaultValue?: string | null;
  folder?: string;
  helpText?: string;
}) {
  const [value, setValue] = useState<string>(defaultValue || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setValue(defaultValue || "");
  }, [defaultValue]);

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
    <div className="space-y-3">
      <input type="hidden" name={name} value={value} />
      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp,image/gif"
        className="hidden"
        onChange={onPick}
      />

      {value ? (
        <div className="relative inline-block max-w-full">
          <Image
            src={value}
            alt="Current image"
            width={480}
            height={320}
            unoptimized
            className="max-h-56 w-auto rounded-lg border border-white/10 bg-white object-contain"
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
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={loading}
          className="flex h-32 w-full max-w-md cursor-pointer items-center justify-center gap-2 rounded-lg border border-dashed border-white/10 bg-white/[0.02] text-sm text-white/60 hover:border-brand/40 hover:text-white disabled:opacity-60"
        >
          <Upload className="h-4 w-4" />
          {loading ? "Uploading..." : "Click to upload image"}
        </button>
      )}

      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={loading}
          className="rounded-lg border border-white/10 px-3 py-1.5 text-xs text-white/80 hover:border-brand/40 hover:text-white disabled:opacity-60"
        >
          {loading ? "Uploading..." : value ? "Replace image" : "Upload image"}
        </button>
        {value && (
          <button
            type="button"
            onClick={() => setValue("")}
            className="rounded-lg border border-white/10 px-3 py-1.5 text-xs text-white/60 hover:text-red-400"
          >
            Remove
          </button>
        )}
      </div>

      <div>
        <label className="label">Image URL</label>
        <input
          className="input font-mono text-xs"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="/images/example.png or https://..."
        />
      </div>

      <p className="text-xs text-white/50">
        {helpText || "Upload or replace this image anytime, then click Save changes."}
      </p>
      {error && <p className="text-sm text-red-400">{error}</p>}
    </div>
  );
}
