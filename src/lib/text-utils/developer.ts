import { diffLines, type Change } from "diff";

export interface JsonResult {
  ok: boolean;
  value: string;
  error?: string;
  errorPosition?: { line: number; column: number };
}

function extractJsonErrorPosition(input: string, message: string): { line: number; column: number } | undefined {
  const m = /position (\d+)/i.exec(message);
  if (!m || !m[1]) return undefined;
  const pos = Number(m[1]);
  const upTo = input.slice(0, pos);
  const line = upTo.split("\n").length;
  const lastNl = upTo.lastIndexOf("\n");
  const column = lastNl === -1 ? pos + 1 : pos - lastNl;
  return { line, column };
}

export function formatJson(input: string, indent = 2): JsonResult {
  const trimmed = input.trim();
  if (!trimmed) return { ok: true, value: "" };
  try {
    const parsed = JSON.parse(trimmed) as unknown;
    return { ok: true, value: JSON.stringify(parsed, null, indent) };
  } catch (e) {
    const message = e instanceof Error ? e.message : "Invalid JSON";
    return {
      ok: false,
      value: "",
      error: message,
      errorPosition: extractJsonErrorPosition(trimmed, message),
    };
  }
}

export function minifyJson(input: string): JsonResult {
  const trimmed = input.trim();
  if (!trimmed) return { ok: true, value: "" };
  try {
    const parsed = JSON.parse(trimmed) as unknown;
    return { ok: true, value: JSON.stringify(parsed) };
  } catch (e) {
    const message = e instanceof Error ? e.message : "Invalid JSON";
    return {
      ok: false,
      value: "",
      error: message,
      errorPosition: extractJsonErrorPosition(trimmed, message),
    };
  }
}

export function validateJson(input: string): JsonResult {
  const trimmed = input.trim();
  if (!trimmed) return { ok: true, value: "(empty)" };
  try {
    JSON.parse(trimmed);
    return { ok: true, value: "Valid JSON" };
  } catch (e) {
    const message = e instanceof Error ? e.message : "Invalid JSON";
    return {
      ok: false,
      value: "",
      error: message,
      errorPosition: extractJsonErrorPosition(trimmed, message),
    };
  }
}

export interface FindReplaceOptions {
  find: string;
  replace: string;
  regex?: boolean;
  caseSensitive?: boolean;
}

export interface FindReplaceResult {
  output: string;
  count: number;
  error?: string;
}

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function findReplace(input: string, opts: FindReplaceOptions): FindReplaceResult {
  const { find, replace, regex = false, caseSensitive = true } = opts;
  if (!find) return { output: input, count: 0 };
  let pattern: RegExp;
  try {
    const source = regex ? find : escapeRegExp(find);
    const flags = "g" + (caseSensitive ? "" : "i");
    pattern = new RegExp(source, flags);
  } catch (e) {
    return { output: input, count: 0, error: e instanceof Error ? e.message : "Invalid regex" };
  }
  let count = 0;
  const output = input.replace(pattern, () => {
    count++;
    return replace;
  });
  return { output, count };
}

export function countOccurrences(input: string, opts: FindReplaceOptions): number {
  const { find, regex = false, caseSensitive = true } = opts;
  if (!find || !input) return 0;
  try {
    const source = regex ? find : escapeRegExp(find);
    const flags = "g" + (caseSensitive ? "" : "i");
    const pattern = new RegExp(source, flags);
    const matches = input.match(pattern);
    return matches ? matches.length : 0;
  } catch {
    return 0;
  }
}

export type DiffChange = Change;

export function computeDiff(left: string, right: string): DiffChange[] {
  return diffLines(left, right);
}
