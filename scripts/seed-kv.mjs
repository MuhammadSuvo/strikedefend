/**
 * Upload data/*.json into Cloudflare KV (binding: CONTENT_KV).
 *
 * Usage (after creating the KV namespace and setting its id in wrangler.jsonc):
 *   npx wrangler kv key put --binding=CONTENT_KV "data:site-settings.json" --path=./data/site-settings.json --remote
 *
 * Or run this helper:
 *   npm run data:kv-seed          # local/miniflare KV
 *   npm run data:kv-seed -- --remote
 */
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const dataDir = path.join(root, "data");
const remote = process.argv.includes("--remote");

const files = fs.readdirSync(dataDir).filter((f) => f.endsWith(".json"));
if (!files.length) {
  console.error("No JSON files found in data/");
  process.exit(1);
}

for (const file of files) {
  const key = `data:${file}`;
  const filePath = path.join(dataDir, file);
  const args = [
    "wrangler",
    "kv",
    "key",
    "put",
    "--binding=CONTENT_KV",
    key,
    `--path=${filePath}`,
    ...(remote ? ["--remote"] : [])
  ];
  console.log(`Putting ${key}...`);
  const result = spawnSync("npx", args, { cwd: root, stdio: "inherit", shell: true });
  if (result.status !== 0) process.exit(result.status ?? 1);
}

console.log(`Seeded ${files.length} keys into CONTENT_KV${remote ? " (remote)" : " (local)"}.`);
