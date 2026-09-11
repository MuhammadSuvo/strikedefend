import fs from "fs/promises";
import path from "path";

export const DATA_DIR = path.join(process.cwd(), "data");

export function newId(prefix = "id") {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

export async function ensureDataDir() {
  await fs.mkdir(DATA_DIR, { recursive: true });
}

export async function readJsonFile<T>(filename: string, fallback: T): Promise<T> {
  await ensureDataDir();
  const filePath = path.join(DATA_DIR, filename);
  try {
    const raw = await fs.readFile(filePath, "utf8");
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export async function writeJsonFile<T>(filename: string, data: T): Promise<void> {
  await ensureDataDir();
  const filePath = path.join(DATA_DIR, filename);
  await fs.writeFile(filePath, `${JSON.stringify(data, null, 2)}\n`, "utf8");
}

export async function readSingleton<T>(filename: string, fallback: T): Promise<T> {
  const data = await readJsonFile<T | null>(filename, null);
  return data ?? fallback;
}

export async function writeSingleton<T>(filename: string, data: T): Promise<void> {
  await writeJsonFile(filename, data);
}
