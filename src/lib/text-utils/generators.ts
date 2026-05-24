const LOREM_WORDS = [
  "lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing",
  "elit", "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore",
  "et", "dolore", "magna", "aliqua", "enim", "ad", "minim", "veniam",
  "quis", "nostrud", "exercitation", "ullamco", "laboris", "nisi", "aliquip",
  "ex", "ea", "commodo", "consequat", "duis", "aute", "irure", "in",
  "reprehenderit", "voluptate", "velit", "esse", "cillum", "fugiat", "nulla",
  "pariatur", "excepteur", "sint", "occaecat", "cupidatat", "non", "proident",
  "sunt", "culpa", "qui", "officia", "deserunt", "mollit", "anim", "id",
  "est", "laborum",
];

export function generateLoremWords(count: number, rng: () => number = Math.random): string {
  if (count <= 0) return "";
  const out: string[] = [];
  for (let i = 0; i < count; i++) {
    const idx = i < LOREM_WORDS.length && i < 5
      ? i
      : Math.floor(rng() * LOREM_WORDS.length);
    const word = LOREM_WORDS[idx] ?? "lorem";
    out.push(i === 0 ? word.charAt(0).toUpperCase() + word.slice(1) : word);
  }
  return out.join(" ") + ".";
}

export function generateLoremParagraphs(count: number, rng: () => number = Math.random): string {
  if (count <= 0) return "";
  const paragraphs: string[] = [];
  for (let p = 0; p < count; p++) {
    const sentences = 3 + Math.floor(rng() * 4);
    const parts: string[] = [];
    for (let s = 0; s < sentences; s++) {
      const len = 6 + Math.floor(rng() * 12);
      parts.push(generateLoremWords(len, rng));
    }
    paragraphs.push(parts.join(" "));
  }
  return paragraphs.join("\n\n");
}

export function generateSlug(input: string, fallback = "untitled"): string {
  if (!input) return fallback;
  const slug = input
    .normalize("NFKD")
    .replace(/\p{M}/gu, "")
    .toLocaleLowerCase()
    .replace(/[^a-z0-9\s_-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return slug || fallback;
}

export interface RandomStringOptions {
  length: number;
  upper?: boolean;
  lower?: boolean;
  numbers?: boolean;
  symbols?: boolean;
}

const CHARS = {
  upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  lower: "abcdefghijklmnopqrstuvwxyz",
  numbers: "0123456789",
  symbols: "!@#$%^&*()-_=+[]{};:,.<>?/|~",
};

export function generateRandomString(
  opts: RandomStringOptions,
  rng: () => number = Math.random,
): string {
  const { length, upper = true, lower = true, numbers = true, symbols = false } = opts;
  if (length <= 0) return "";
  let pool = "";
  if (upper) pool += CHARS.upper;
  if (lower) pool += CHARS.lower;
  if (numbers) pool += CHARS.numbers;
  if (symbols) pool += CHARS.symbols;
  if (!pool) return "";
  let out = "";
  for (let i = 0; i < length; i++) {
    out += pool.charAt(Math.floor(rng() * pool.length));
  }
  return out;
}

export type PasswordStrength = "very-weak" | "weak" | "fair" | "strong" | "very-strong";

export function passwordStrength(password: string): PasswordStrength {
  if (!password) return "very-weak";
  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (password.length >= 16) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^a-zA-Z0-9]/.test(password)) score++;
  if (score <= 1) return "very-weak";
  if (score <= 3) return "weak";
  if (score <= 4) return "fair";
  if (score <= 5) return "strong";
  return "very-strong";
}
