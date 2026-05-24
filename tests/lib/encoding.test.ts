import { describe, it, expect } from "vitest";
import {
  base64Encode,
  base64Decode,
  urlEncode,
  urlDecode,
  htmlEncode,
  htmlDecode,
} from "@/lib/text-utils/encoding";

describe("base64", () => {
  it("empty", () => {
    expect(base64Encode("")).toBe("");
    expect(base64Decode("")).toBe("");
  });
  it("ASCII roundtrip", () => {
    const v = "Hello, world!";
    expect(base64Decode(base64Encode(v))).toBe(v);
  });
  it("encodes unicode (ñ)", () => {
    expect(base64Encode("ñ")).toBe("w7E=");
  });
  it("decodes unicode (ñ)", () => {
    expect(base64Decode("w7E=")).toBe("ñ");
  });
  it("emoji roundtrip", () => {
    const v = "🦊 fox";
    expect(base64Decode(base64Encode(v))).toBe(v);
  });
  it("urdu roundtrip", () => {
    const v = "سلام دنیا";
    expect(base64Decode(base64Encode(v))).toBe(v);
  });
});

describe("url encoding", () => {
  it("encode reserved chars", () => {
    expect(urlEncode("hello world?")).toBe("hello%20world%3F");
  });
  it("decode roundtrip", () => {
    const v = "a b/c?d=e&f";
    expect(urlDecode(urlEncode(v))).toBe(v);
  });
  it("empty", () => {
    expect(urlEncode("")).toBe("");
    expect(urlDecode("")).toBe("");
  });
});

describe("html encoding", () => {
  it("encodes ampersand and tags", () => {
    expect(htmlEncode("<a href=\"x\">&'</a>")).toBe(
      "&lt;a href=&quot;x&quot;&gt;&amp;&#39;&lt;/a&gt;",
    );
  });
  it("decode roundtrip", () => {
    const v = "<b>'x'&y</b>";
    expect(htmlDecode(htmlEncode(v))).toBe(v);
  });
  it("decode numeric entity", () => {
    expect(htmlDecode("&#65;")).toBe("A");
  });
  it("decode hex entity", () => {
    expect(htmlDecode("&#x41;")).toBe("A");
  });
});
