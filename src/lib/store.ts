/**
 * Content store: Cloudflare Workers KV in production, local JSON files in Node/dev.
 * Keys are stored as `data:<filename>` (e.g. data:site-settings.json).
 */

export function newId(prefix = "id") {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

export function dataKey(filename: string) {
  return `data:${filename}`;
}

type KvNamespaceLike = {
  get(key: string, options?: "text" | { type: "text" }): Promise<string | null>;
  put(key: string, value: string): Promise<void>;
};

const SEED_LOADERS: Record<string, () => Promise<unknown>> = {
  "users.json": () => import("../../data/users.json").then((m) => m.default),
  "site-settings.json": () => import("../../data/site-settings.json").then((m) => m.default),
  "home.json": () => import("../../data/home.json").then((m) => m.default),
  "about.json": () => import("../../data/about.json").then((m) => m.default),
  "pricing.json": () => import("../../data/pricing.json").then((m) => m.default),
  "services.json": () => import("../../data/services.json").then((m) => m.default),
  "testimonials.json": () => import("../../data/testimonials.json").then((m) => m.default),
  "faqs.json": () => import("../../data/faqs.json").then((m) => m.default),
  "blog-posts.json": () => import("../../data/blog-posts.json").then((m) => m.default),
  "leads.json": () => import("../../data/leads.json").then((m) => m.default)
};

async function loadBundledSeed<T>(filename: string): Promise<T | undefined> {
  const loader = SEED_LOADERS[filename];
  if (!loader) return undefined;
  try {
    return (await loader()) as T;
  } catch {
    return undefined;
  }
}

async function getContentKv(): Promise<KvNamespaceLike | null> {
  if (process.env.FORCE_FS_STORE === "1") return null;

  try {
    const { getCloudflareContext } = await import("@opennextjs/cloudflare");
    const ctx = await getCloudflareContext({ async: true });
    const kv = (ctx.env as { CONTENT_KV?: KvNamespaceLike } | undefined)?.CONTENT_KV;
    if (kv) return kv;
  } catch {
    // Not running under OpenNext / no Cloudflare context (typical local `next dev`).
  }

  return null;
}

async function readFromFs<T>(filename: string, fallback: T): Promise<T> {
  const fs = await import("fs/promises");
  const path = await import("path");
  const filePath = path.join(process.cwd(), "data", filename);
  try {
    const raw = await fs.readFile(filePath, "utf8");
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

async function writeToFs<T>(filename: string, data: T): Promise<void> {
  const fs = await import("fs/promises");
  const path = await import("path");
  const dir = path.join(process.cwd(), "data");
  await fs.mkdir(dir, { recursive: true });
  const filePath = path.join(dir, filename);
  await fs.writeFile(filePath, `${JSON.stringify(data, null, 2)}\n`, "utf8");
}

export async function readJsonFile<T>(filename: string, fallback: T): Promise<T> {
  const kv = await getContentKv();
  if (kv) {
    const raw = await kv.get(dataKey(filename), "text");
    if (raw) {
      try {
        return JSON.parse(raw) as T;
      } catch {
        // fall through to seed/fallback
      }
    }
    const seed = await loadBundledSeed<T>(filename);
    if (seed !== undefined) {
      try {
        await kv.put(dataKey(filename), JSON.stringify(seed));
      } catch {
        // Read-only or quota — still serve seed.
      }
      return seed;
    }
    return fallback;
  }

  return readFromFs(filename, fallback);
}

export async function writeJsonFile<T>(filename: string, data: T): Promise<void> {
  const payload = JSON.stringify(data);
  const kv = await getContentKv();
  if (kv) {
    await kv.put(dataKey(filename), payload);
    return;
  }
  await writeToFs(filename, data);
}

export async function readSingleton<T>(filename: string, fallback: T): Promise<T> {
  const data = await readJsonFile<T | null>(filename, null);
  return data ?? fallback;
}

export async function writeSingleton<T>(filename: string, data: T): Promise<void> {
  await writeJsonFile(filename, data);
}

/** @deprecated No-op kept for older call sites; KV does not need a directory. */
export async function ensureDataDir() {
  const kv = await getContentKv();
  if (kv) return;
  const fs = await import("fs/promises");
  const path = await import("path");
  await fs.mkdir(path.join(process.cwd(), "data"), { recursive: true });
}
