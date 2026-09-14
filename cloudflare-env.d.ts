/* Ambient types for Cloudflare bindings used by this app.
 * Regenerate with: npm run cf-typegen
 */

interface KVNamespace {
  get(key: string, options?: "text" | { type: "text" }): Promise<string | null>;
  put(key: string, value: string): Promise<void>;
}

interface Fetcher {
  fetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response>;
}

interface CloudflareEnv {
  CONTENT_KV: KVNamespace;
  ASSETS?: Fetcher;
}

export {};
