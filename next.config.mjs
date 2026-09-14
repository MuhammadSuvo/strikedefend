/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "ui-avatars.com" }
    ]
  }
};

export default nextConfig;

// Optional: set ENABLE_CF_DEV=1 to use Wrangler bindings (CONTENT_KV) in `next dev`.
if (process.env.ENABLE_CF_DEV === "1") {
  try {
    const { initOpenNextCloudflareForDev } = await import("@opennextjs/cloudflare");
    initOpenNextCloudflareForDev();
  } catch (err) {
    console.warn("[cloudflare] initOpenNextCloudflareForDev failed:", err);
  }
}
