/** True when the app is running on Cloudflare Workers / Pages. */
export function isCloudflareRuntime() {
  return Boolean(
    process.env.CF_PAGES ||
      process.env.CF_PAGES_BRANCH ||
      process.env.CLOUDFLARE_ENV ||
      process.env.WORKERS_CI ||
      process.env.FORCE_CLOUDFLARE_RUNTIME === "1"
  );
}
