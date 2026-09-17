/**
 * Push only data/users.json into Cloudflare KV (CONTENT_KV).
 * Usage: npm run data:kv-users -- --remote
 */
import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const filePath = path.join(root, "data", "users.json");
const remote = process.argv.includes("--remote");

const args = [
  "wrangler",
  "kv",
  "key",
  "put",
  "--binding=CONTENT_KV",
  "data:users.json",
  `--path=${filePath}`,
  ...(remote ? ["--remote"] : [])
];

console.log(`Updating data:users.json in CONTENT_KV${remote ? " (remote)" : " (local)"}...`);
const result = spawnSync("npx", args, { cwd: root, stdio: "inherit", shell: true });
process.exit(result.status ?? 1);
