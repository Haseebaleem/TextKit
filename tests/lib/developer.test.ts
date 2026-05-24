import { describe, it, expect } from "vitest";
import {
  formatJson,
  minifyJson,
  validateJson,
  findReplace,
  countOccurrences,
  computeDiff,
} from "@/lib/text-utils/developer";

describe("json format/minify/validate", () => {
  it("format empty", () => {
    expect(formatJson("")).toEqual({ ok: true, value: "" });
  });
  it("format basic", () => {
    const r = formatJson('{"a":1,"b":[1,2]}');
    expect(r.ok).toBe(true);
    expect(r.value).toBe('{\n  "a": 1,\n  "b": [\n    1,\n    2\n  ]\n}');
  });
  it("format invalid", () => {
    const r = formatJson("{a:1}");
    expect(r.ok).toBe(false);
    expect(r.error).toBeTruthy();
  });
  it("minify basic", () => {
    const r = minifyJson('{ "a" : 1 ,\n "b" : 2 }');
    expect(r.ok).toBe(true);
    expect(r.value).toBe('{"a":1,"b":2}');
  });
  it("validate ok", () => {
    expect(validateJson('{"a":1}').ok).toBe(true);
  });
  it("validate invalid", () => {
    expect(validateJson("{").ok).toBe(false);
  });
});

describe("find & replace", () => {
  it("plain replace counts occurrences", () => {
    const r = findReplace("a b a c a", { find: "a", replace: "X" });
    expect(r.output).toBe("X b X c X");
    expect(r.count).toBe(3);
  });
  it("case insensitive", () => {
    const r = findReplace("Aa aA", { find: "a", replace: "X", caseSensitive: false });
    expect(r.count).toBe(4);
  });
  it("regex mode", () => {
    const r = findReplace("a1 b2 c3", { find: "\\d", replace: "#", regex: true });
    expect(r.output).toBe("a# b# c#");
    expect(r.count).toBe(3);
  });
  it("invalid regex returns error", () => {
    const r = findReplace("abc", { find: "(", replace: "x", regex: true });
    expect(r.error).toBeTruthy();
  });
  it("countOccurrences", () => {
    expect(countOccurrences("foo foo bar", { find: "foo", replace: "" })).toBe(2);
  });
  it("empty find -> 0 count", () => {
    expect(findReplace("hello", { find: "", replace: "x" }).count).toBe(0);
  });
});

describe("diff", () => {
  it("identical -> single unchanged chunk", () => {
    const out = computeDiff("a\nb\n", "a\nb\n");
    expect(out.length).toBe(1);
    expect(out[0]?.added).toBeFalsy();
    expect(out[0]?.removed).toBeFalsy();
  });
  it("detects addition", () => {
    const out = computeDiff("a\nb\n", "a\nb\nc\n");
    const added = out.find((c) => c.added);
    expect(added).toBeDefined();
    expect(added?.value).toContain("c");
  });
  it("detects removal", () => {
    const out = computeDiff("a\nb\nc\n", "a\nc\n");
    const removed = out.find((c) => c.removed);
    expect(removed).toBeDefined();
    expect(removed?.value).toContain("b");
  });
});
