import { describe, it, expect } from "vitest";
import {
  generateLoremWords,
  generateLoremParagraphs,
  generateSlug,
  generateRandomString,
  passwordStrength,
} from "@/lib/text-utils/generators";

describe("lorem", () => {
  it("words zero -> empty", () => {
    expect(generateLoremWords(0)).toBe("");
  });
  it("words count", () => {
    const out = generateLoremWords(10, () => 0);
    expect(out.split(" ").length).toBe(10);
    expect(out.endsWith(".")).toBe(true);
  });
  it("paragraphs zero -> empty", () => {
    expect(generateLoremParagraphs(0)).toBe("");
  });
  it("paragraphs count", () => {
    const out = generateLoremParagraphs(3, () => 0);
    expect(out.split("\n\n").length).toBe(3);
  });
});

describe("slug", () => {
  it("basic", () => {
    expect(generateSlug("Hello World!")).toBe("hello-world");
  });
  it("strips diacritics", () => {
    expect(generateSlug("Café déjà vu")).toBe("cafe-deja-vu");
  });
  it("collapses separators", () => {
    expect(generateSlug("a   b__c--d")).toBe("a-b-c-d");
  });
  it("fallback when nothing useful", () => {
    expect(generateSlug("###")).toBe("untitled");
  });
  it("empty", () => {
    expect(generateSlug("")).toBe("untitled");
  });
  it("custom fallback", () => {
    expect(generateSlug("", "default")).toBe("default");
  });
});

describe("random string", () => {
  it("zero length", () => {
    expect(generateRandomString({ length: 0 })).toBe("");
  });
  it("no charset -> empty", () => {
    expect(
      generateRandomString({ length: 10, upper: false, lower: false, numbers: false, symbols: false }),
    ).toBe("");
  });
  it("only digits", () => {
    const out = generateRandomString(
      { length: 20, upper: false, lower: false, numbers: true },
      () => 0.5,
    );
    expect(out.length).toBe(20);
    expect(out).toMatch(/^[0-9]+$/);
  });
  it("deterministic with fixed rng", () => {
    const a = generateRandomString({ length: 8 }, () => 0);
    const b = generateRandomString({ length: 8 }, () => 0);
    expect(a).toBe(b);
  });
});

describe("password strength", () => {
  it("empty -> very-weak", () => {
    expect(passwordStrength("")).toBe("very-weak");
  });
  it("short alpha -> weak", () => {
    expect(passwordStrength("abc")).toBe("very-weak");
  });
  it("long mixed -> very-strong", () => {
    expect(passwordStrength("Abcdefgh1234!@#$")).toBe("very-strong");
  });
});
