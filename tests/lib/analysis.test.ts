import { describe, it, expect } from "vitest";
import {
  countCharacters,
  countCharactersNoSpaces,
  countWords,
  countSentences,
  countParagraphs,
  countLines,
  readingTimeMinutes,
  speakingTimeMinutes,
  averageWordLength,
  wordFrequency,
  characterFrequency,
  computeStats,
} from "@/lib/text-utils/analysis";

describe("counts", () => {
  it("countCharacters basic", () => {
    expect(countCharacters("hello")).toBe(5);
  });
  it("countCharacters counts emoji as 1", () => {
    expect(countCharacters("🦊")).toBe(1);
  });
  it("countCharactersNoSpaces", () => {
    expect(countCharactersNoSpaces("hello world")).toBe(10);
  });
  it("countWords empty", () => {
    expect(countWords("")).toBe(0);
  });
  it("countWords basic", () => {
    expect(countWords("hello world")).toBe(2);
  });
  it("countWords padded whitespace", () => {
    expect(countWords("  hello   world  ")).toBe(2);
  });
  it("countSentences basic", () => {
    expect(countSentences("Hello. World! How? Are you")).toBe(4);
  });
  it("countSentences empty", () => {
    expect(countSentences("")).toBe(0);
  });
  it("countParagraphs", () => {
    expect(countParagraphs("a\n\nb\n\nc")).toBe(3);
  });
  it("countLines empty", () => {
    expect(countLines("")).toBe(0);
  });
  it("countLines single", () => {
    expect(countLines("a\nb\nc")).toBe(3);
  });
});

describe("times", () => {
  it("readingTimeMinutes zero on empty", () => {
    expect(readingTimeMinutes("")).toBe(0);
  });
  it("readingTimeMinutes 200wpm", () => {
    const text = Array(200).fill("word").join(" ");
    expect(readingTimeMinutes(text)).toBeCloseTo(1, 5);
  });
  it("speakingTimeMinutes 130wpm", () => {
    const text = Array(130).fill("word").join(" ");
    expect(speakingTimeMinutes(text)).toBeCloseTo(1, 5);
  });
});

describe("averages + frequencies", () => {
  it("averageWordLength empty", () => {
    expect(averageWordLength("")).toBe(0);
  });
  it("averageWordLength basic", () => {
    expect(averageWordLength("ab cd")).toBe(2);
  });
  it("wordFrequency basic", () => {
    expect(wordFrequency("a a b c a b")).toEqual([
      ["a", 3],
      ["b", 2],
      ["c", 1],
    ]);
  });
  it("wordFrequency strips punctuation", () => {
    expect(wordFrequency("hello, hello! world.")).toEqual([
      ["hello", 2],
      ["world", 1],
    ]);
  });
  it("characterFrequency ignores whitespace", () => {
    const out = characterFrequency("aa b cc ");
    expect(out).toContainEqual(["a", 2]);
    expect(out).toContainEqual(["c", 2]);
    expect(out).toContainEqual(["b", 1]);
  });
  it("computeStats returns full shape", () => {
    const s = computeStats("Hello world. Bye.");
    expect(s.words).toBe(3);
    expect(s.sentences).toBe(2);
    expect(s.characters).toBeGreaterThan(0);
  });
});
