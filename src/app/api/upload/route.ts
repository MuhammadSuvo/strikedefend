import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { uploadBufferToCloudinary, cloudinaryConfigured } from "@/lib/cloudinary";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  if (!cloudinaryConfigured) {
    return NextResponse.json(
      { error: "Cloudinary not configured. Set CLOUDINARY_* env vars." },
      { status: 500 }
    );
  }

  const formData = await req.formData();
  const file = formData.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Missing file" }, { status: 400 });
  }
  if (file.size > 8 * 1024 * 1024) {
    return NextResponse.json({ error: "File too large (max 8MB)." }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const folder = (formData.get("folder") as string) || "strikedefend";
  try {
    const result = await uploadBufferToCloudinary(buffer, folder);
    return NextResponse.json(result);
  } catch (err) {
    console.error("upload error", err);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
