import { defineCloudflareConfig } from "@opennextjs/cloudflare";

// Incremental cache can be added later (R2 / KV). Content JSON uses CONTENT_KV via src/lib/store.ts.
export default defineCloudflareConfig({});
