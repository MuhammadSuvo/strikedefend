import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { randomBytes } from "crypto";

const MIME_EXT: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif"
};

export function isAllowedImage(file: File) {
  return Boolean(MIME_EXT[file.type]);
}

function sanitizeFolder(folder: string) {
  return folder
    .split("/")
    .map((part) => part.replace(/[^a-zA-Z0-9_-]/g, ""))
    .filter(Boolean)
    .slice(0, 4);
}

export async function saveImageLocally(
  buffer: Buffer,
  folder: string,
  mimeType: string
): Promise<{ url: string; publicId: string }> {
  const ext = MIME_EXT[mimeType] || "jpg";
  const parts = sanitizeFolder(folder);
  const dir = path.join(process.cwd(), "public", "uploads", ...parts);
  await mkdir(dir, { recursive: true });
  const filename = `${Date.now()}-${randomBytes(4).toString("hex")}.${ext}`;
  await writeFile(path.join(dir, filename), buffer);
  const url = `/uploads/${parts.join("/")}/${filename}`;
  return { url, publicId: filename };
}
