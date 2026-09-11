/** Parse a JSON array stored as a Prisma String (SQLite-friendly). */
export function parseJsonArray<T = unknown>(value: unknown, fallback: T[] = []): T[] {
  if (Array.isArray(value)) return value as T[];
  if (typeof value !== "string" || !value.trim()) return fallback;
  try {
    const parsed = JSON.parse(value) as unknown;
    return Array.isArray(parsed) ? (parsed as T[]) : fallback;
  } catch {
    return fallback;
  }
}

export function toJsonString(value: unknown, fallback = "[]"): string {
  try {
    return JSON.stringify(value ?? JSON.parse(fallback));
  } catch {
    return fallback;
  }
}
