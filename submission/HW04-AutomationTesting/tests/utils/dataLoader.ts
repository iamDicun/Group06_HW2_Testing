import fs from "fs";
import path from "path";

const DATA_DIR = path.join(__dirname, "..", "..", "test-data");

/** Doc mot file JSON trong thu muc test-data, mong doi ket qua la mot array. */
export function loadTestData<T = Record<string, unknown>>(filename: string): T[] {
  const raw = fs.readFileSync(path.join(DATA_DIR, filename), "utf-8");
  const parsed = JSON.parse(raw) as T[] | Record<string, unknown>;
  if (Array.isArray(parsed)) return parsed;
  throw new Error(`Expected an array in test-data/${filename}`);
}

/** Doc mot file JSON (object) trong thu muc test-data. */
export function loadJsonObject<T = Record<string, unknown>>(filename: string): T {
  const raw = fs.readFileSync(path.join(DATA_DIR, filename), "utf-8");
  return JSON.parse(raw) as T;
}

/**
 * Thay the toan bo placeholder "{{ts}}" (timestamp) trong du lieu test
 * bang gia tri truyen vao -> dam bao tinh doc lap cua moi lan chay.
 */
export function substituteTimestamp<T>(value: T, ts: number): T {
  if (Array.isArray(value)) {
    return value.map((item) => substituteTimestamp(item, ts)) as unknown as T;
  }
  if (value !== null && typeof value === "object") {
    const out: Record<string, unknown> = {};
    for (const [key, item] of Object.entries(value)) {
      out[key] = substituteTimestamp(item, ts);
    }
    return out as T;
  }
  if (typeof value === "string") {
    return value.replaceAll("{{ts}}", String(ts)) as unknown as T;
  }
  return value;
}
