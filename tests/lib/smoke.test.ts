import { describe, it, expect } from "vitest";
import * as utils from "@/lib/text-utils";
import { CATEGORIES, TOOLS } from "@/lib/tool-registry";

describe("library surface", () => {
  it("exports all transformation entry points", () => {
    const expected = [
      "toUpperCase",
      "toLowerCase",
      "toTitleCase",
      "toSentenceCase",
      "toCamelCase",
      "toPascalCase",
      "toSnakeCase",
      "toKebabCase",
      "toScreamingSnakeCase",
      "reverseText",
      "reverseWords",
      "removeExtraSpaces",
      "removeAllWhitespace",
      "trimEachLine",
      "removeDuplicateLines",
      "sortLines",
      "reverseLines",
      "shuffleLines",
    ];
    for (const k of expected) {
      expect(typeof (utils as Record<string, unknown>)[k]).toBe("function");
    }
  });

  it("exports all analysis + encoding + generator + developer entry points", () => {
    const expected = [
      "computeStats",
      "wordFrequency",
      "characterFrequency",
      "base64Encode",
      "base64Decode",
      "urlEncode",
      "urlDecode",
      "htmlEncode",
      "htmlDecode",
      "generateLoremWords",
      "generateLoremParagraphs",
      "generateSlug",
      "generateRandomString",
      "passwordStrength",
      "formatJson",
      "minifyJson",
      "validateJson",
      "findReplace",
      "countOccurrences",
      "computeDiff",
    ];
    for (const k of expected) {
      expect(typeof (utils as Record<string, unknown>)[k]).toBe("function");
    }
  });
});

describe("tool registry", () => {
  it("has 5 categories", () => {
    expect(CATEGORIES).toHaveLength(5);
  });
  it("has at least 15 tools", () => {
    expect(TOOLS.length).toBeGreaterThanOrEqual(15);
  });
  it("every tool references a known category", () => {
    const ids = new Set(CATEGORIES.map((c) => c.id));
    for (const t of TOOLS) {
      expect(ids.has(t.category.id)).toBe(true);
    }
  });
  it("tool ids are unique", () => {
    const ids = TOOLS.map((t) => t.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});
