export function toUpperCase(input: string): string {
  return input.toLocaleUpperCase();
}

export function toLowerCase(input: string): string {
  return input.toLocaleLowerCase();
}

export function toTitleCase(input: string): string {
  if (!input) return "";
  return input
    .toLocaleLowerCase()
    .split(/(\s+)/)
    .map((part) => {
      if (/^\s+$/.test(part) || part.length === 0) return part;
      return part.charAt(0).toLocaleUpperCase() + part.slice(1);
    })
    .join("");
}

export function toSentenceCase(input: string): string {
  if (!input) return "";
  const lower = input.toLocaleLowerCase();
  return lower.replace(/(^\s*|[.!?]\s+)([\p{L}])/gu, (_, lead, ch: string) => lead + ch.toLocaleUpperCase());
}

function tokenize(input: string): string[] {
  if (!input) return [];
  return input
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2")
    .split(/[^\p{L}\p{N}]+/u)
    .filter(Boolean);
}

export function toCamelCase(input: string): string {
  const tokens = tokenize(input);
  if (tokens.length === 0) return "";
  return tokens
    .map((tok, i) => {
      const lower = tok.toLocaleLowerCase();
      if (i === 0) return lower;
      return lower.charAt(0).toLocaleUpperCase() + lower.slice(1);
    })
    .join("");
}

export function toPascalCase(input: string): string {
  const tokens = tokenize(input);
  if (tokens.length === 0) return "";
  return tokens
    .map((tok) => {
      const lower = tok.toLocaleLowerCase();
      return lower.charAt(0).toLocaleUpperCase() + lower.slice(1);
    })
    .join("");
}

export function toSnakeCase(input: string): string {
  return tokenize(input).map((t) => t.toLocaleLowerCase()).join("_");
}

export function toKebabCase(input: string): string {
  return tokenize(input).map((t) => t.toLocaleLowerCase()).join("-");
}

export function toScreamingSnakeCase(input: string): string {
  return tokenize(input).map((t) => t.toLocaleUpperCase()).join("_");
}

export function reverseText(input: string): string {
  return Array.from(input).reverse().join("");
}

export function reverseWords(input: string): string {
  return input.split(/(\s+)/).reverse().join("");
}

export function removeExtraSpaces(input: string): string {
  return input.replace(/[ \t]+/g, " ").replace(/ ?\n ?/g, "\n").trim();
}

export function removeAllWhitespace(input: string): string {
  return input.replace(/\s+/g, "");
}

export function trimEachLine(input: string): string {
  return input
    .split("\n")
    .map((l) => l.trim())
    .join("\n");
}

export function removeDuplicateLines(input: string): string {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const line of input.split("\n")) {
    if (!seen.has(line)) {
      seen.add(line);
      out.push(line);
    }
  }
  return out.join("\n");
}

export function sortLines(input: string, direction: "asc" | "desc" = "asc"): string {
  const lines = input.split("\n");
  const sorted = [...lines].sort((a, b) => a.localeCompare(b));
  return (direction === "asc" ? sorted : sorted.reverse()).join("\n");
}

export function reverseLines(input: string): string {
  return input.split("\n").reverse().join("\n");
}

export function shuffleLines(input: string, rng: () => number = Math.random): string {
  const lines = input.split("\n");
  for (let i = lines.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    const a = lines[i]!;
    const b = lines[j]!;
    lines[i] = b;
    lines[j] = a;
  }
  return lines.join("\n");
}
