import { describe, it, expect } from "vitest";
import {
  toUpperCase,
  toLowerCase,
  toTitleCase,
  toSentenceCase,
  toCamelCase,
  toPascalCase,
  toSnakeCase,
  toKebabCase,
  toScreamingSnakeCase,
  reverseText,
  reverseWords,
  removeExtraSpaces,
  removeAllWhitespace,
  trimEachLine,
  removeDuplicateLines,
  sortLines,
  reverseLines,
  shuffleLines,
} from "@/lib/text-utils/transformations";

describe("case transformations", () => {
  it("toUpperCase basic", () => {
    expect(toUpperCase("hello")).toBe("HELLO");
  });
  it("toUpperCase empty", () => {
    expect(toUpperCase("")).toBe("");
  });
  it("toLowerCase basic", () => {
    expect(toLowerCase("HELLO")).toBe("hello");
  });
  it("toTitleCase basic", () => {
    expect(toTitleCase("hello world")).toBe("Hello World");
  });
  it("toTitleCase preserves whitespace", () => {
    expect(toTitleCase("  hello   world  ")).toBe("  Hello   World  ");
  });
  it("toTitleCase empty", () => {
    expect(toTitleCase("")).toBe("");
  });
  it("toSentenceCase basic", () => {
    expect(toSentenceCase("hello world. how are you?")).toBe("Hello world. How are you?");
  });
  it("toSentenceCase empty", () => {
    expect(toSentenceCase("")).toBe("");
  });
});

describe("programming case", () => {
  it("toCamelCase basic", () => {
    expect(toCamelCase("hello world")).toBe("helloWorld");
  });
  it("toCamelCase empty", () => {
    expect(toCamelCase("")).toBe("");
  });
  it("toCamelCase multiple spaces", () => {
    expect(toCamelCase("multiple   spaces")).toBe("multipleSpaces");
  });
  it("toCamelCase from kebab", () => {
    expect(toCamelCase("hello-world-foo")).toBe("helloWorldFoo");
  });
  it("toCamelCase from snake", () => {
    expect(toCamelCase("hello_world_foo")).toBe("helloWorldFoo");
  });
  it("toCamelCase from pascal", () => {
    expect(toCamelCase("HelloWorld")).toBe("helloWorld");
  });
  it("toPascalCase basic", () => {
    expect(toPascalCase("hello world")).toBe("HelloWorld");
  });
  it("toSnakeCase basic", () => {
    expect(toSnakeCase("HelloWorldFoo")).toBe("hello_world_foo");
  });
  it("toKebabCase basic", () => {
    expect(toKebabCase("HelloWorldFoo")).toBe("hello-world-foo");
  });
  it("toScreamingSnakeCase basic", () => {
    expect(toScreamingSnakeCase("hello world")).toBe("HELLO_WORLD");
  });
});

describe("reversing", () => {
  it("reverseText basic", () => {
    expect(reverseText("abcd")).toBe("dcba");
  });
  it("reverseText empty", () => {
    expect(reverseText("")).toBe("");
  });
  it("reverseText unicode (emoji)", () => {
    expect(reverseText("a🦊b")).toBe("b🦊a");
  });
  it("reverseWords basic", () => {
    expect(reverseWords("one two three")).toBe("three two one");
  });
});

describe("whitespace", () => {
  it("removeExtraSpaces", () => {
    expect(removeExtraSpaces("  hello    world  ")).toBe("hello world");
  });
  it("removeAllWhitespace", () => {
    expect(removeAllWhitespace("a b\tc\nd")).toBe("abcd");
  });
  it("trimEachLine", () => {
    expect(trimEachLine("  a  \n  b  ")).toBe("a\nb");
  });
});

describe("line ops", () => {
  it("removeDuplicateLines", () => {
    expect(removeDuplicateLines("a\nb\na\nc\nb")).toBe("a\nb\nc");
  });
  it("sortLines asc", () => {
    expect(sortLines("b\na\nc")).toBe("a\nb\nc");
  });
  it("sortLines desc", () => {
    expect(sortLines("b\na\nc", "desc")).toBe("c\nb\na");
  });
  it("reverseLines", () => {
    expect(reverseLines("1\n2\n3")).toBe("3\n2\n1");
  });
  it("shuffleLines deterministic with seed rng", () => {
    let i = 0;
    const seq = [0.1, 0.9, 0.3];
    const rng = () => seq[i++ % seq.length] ?? 0.5;
    const out = shuffleLines("a\nb\nc\nd", rng);
    expect(out.split("\n").sort()).toEqual(["a", "b", "c", "d"]);
  });
});
