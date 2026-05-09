import { v2 as cloudinary } from "cloudinary";

const configured = Boolean(
  process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET
);

if (configured) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
  });
}

export { cloudinary, configured as cloudinaryConfigured };

export async function uploadBufferToCloudinary(
  buffer: Buffer,
  folder = "strikedefend"
): Promise<{ url: string; publicId: string }> {
  if (!configured) {
    throw new Error("Cloudinary is not configured. Set CLOUDINARY_* env vars.");
  }
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder, resource_type: "image" },
      (error, result) => {
        if (error || !result) return reject(error || new Error("Upload failed"));
        resolve({ url: result.secure_url, publicId: result.public_id });
      }
    );
    stream.end(buffer);
  });
}
