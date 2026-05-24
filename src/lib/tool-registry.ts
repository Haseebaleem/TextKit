import type { LucideIcon } from "lucide-react";
import {
  Binary,
  Braces,
  CaseSensitive,
  ChartBar,
  Code2,
  Diff,
  FileText,
  Hash,
  Key,
  Link as LinkIcon,
  Replace,
  Shuffle,
  Sparkles,
  Type,
  Wand2,
} from "lucide-react";

export interface ToolMeta {
  id: string;
  name: string;
  description: string;
  category: ToolCategory;
  path: string;
  hash: string;
  icon: LucideIcon;
  keywords: string[];
}

export interface ToolCategory {
  id: string;
  name: string;
  path: string;
  icon: LucideIcon;
  description: string;
}

export const CATEGORIES: ToolCategory[] = [
  {
    id: "transformations",
    name: "Transformations",
    path: "/tools/transformations",
    icon: Wand2,
    description: "Case, reverse, whitespace, line operations",
  },
  {
    id: "analysis",
    name: "Analysis",
    path: "/tools/analysis",
    icon: ChartBar,
    description: "Live text statistics & frequency",
  },
  {
    id: "encoding",
    name: "Encoding",
    path: "/tools/encoding",
    icon: Binary,
    description: "Base64, URL, HTML entities",
  },
  {
    id: "generators",
    name: "Generators",
    path: "/tools/generators",
    icon: Sparkles,
    description: "Lorem, slugs, random strings, passwords",
  },
  {
    id: "developer",
    name: "Developer",
    path: "/tools/developer",
    icon: Code2,
    description: "JSON, find & replace, diff",
  },
];

function cat(id: string): ToolCategory {
  const c = CATEGORIES.find((x) => x.id === id);
  if (!c) throw new Error(`Unknown category: ${id}`);
  return c;
}

export const TOOLS: ToolMeta[] = [
  {
    id: "case-conversion",
    name: "Case Conversion",
    description: "UPPER, lower, Title, Sentence",
    category: cat("transformations"),
    path: "/tools/transformations",
    hash: "case",
    icon: CaseSensitive,
    keywords: ["upper", "lower", "title", "sentence", "case"],
  },
  {
    id: "programming-case",
    name: "Programming Case",
    description: "camel, Pascal, snake, kebab, SCREAMING",
    category: cat("transformations"),
    path: "/tools/transformations",
    hash: "programming",
    icon: Type,
    keywords: ["camel", "pascal", "snake", "kebab", "constant"],
  },
  {
    id: "reverse",
    name: "Reverse Text",
    description: "Reverse characters or word order",
    category: cat("transformations"),
    path: "/tools/transformations",
    hash: "reverse",
    icon: Shuffle,
    keywords: ["reverse", "flip"],
  },
  {
    id: "whitespace",
    name: "Whitespace",
    description: "Remove extra/all spaces, trim lines",
    category: cat("transformations"),
    path: "/tools/transformations",
    hash: "whitespace",
    icon: FileText,
    keywords: ["whitespace", "spaces", "trim"],
  },
  {
    id: "lines",
    name: "Line Operations",
    description: "Sort, dedupe, reverse, shuffle",
    category: cat("transformations"),
    path: "/tools/transformations",
    hash: "lines",
    icon: Shuffle,
    keywords: ["sort", "dedupe", "shuffle", "reverse", "lines"],
  },
  {
    id: "analysis",
    name: "Text Analysis",
    description: "Counts, reading time, frequencies",
    category: cat("analysis"),
    path: "/tools/analysis",
    hash: "stats",
    icon: ChartBar,
    keywords: ["count", "words", "characters", "reading", "frequency"],
  },
  {
    id: "base64",
    name: "Base64",
    description: "UTF-8 safe encode / decode",
    category: cat("encoding"),
    path: "/tools/encoding",
    hash: "base64",
    icon: Binary,
    keywords: ["base64", "btoa", "atob"],
  },
  {
    id: "url-encode",
    name: "URL Encoding",
    description: "encodeURIComponent / decodeURIComponent",
    category: cat("encoding"),
    path: "/tools/encoding",
    hash: "url",
    icon: LinkIcon,
    keywords: ["url", "uri", "percent"],
  },
  {
    id: "html-encode",
    name: "HTML Entities",
    description: "Escape and unescape HTML",
    category: cat("encoding"),
    path: "/tools/encoding",
    hash: "html",
    icon: Hash,
    keywords: ["html", "entities", "escape"],
  },
  {
    id: "lorem",
    name: "Lorem Ipsum",
    description: "Words or paragraphs",
    category: cat("generators"),
    path: "/tools/generators",
    hash: "lorem",
    icon: FileText,
    keywords: ["lorem", "placeholder", "ipsum"],
  },
  {
    id: "slug",
    name: "Slug",
    description: "URL-friendly slug from text",
    category: cat("generators"),
    path: "/tools/generators",
    hash: "slug",
    icon: LinkIcon,
    keywords: ["slug", "url", "seo"],
  },
  {
    id: "random",
    name: "Random String",
    description: "Configurable charset",
    category: cat("generators"),
    path: "/tools/generators",
    hash: "random",
    icon: Shuffle,
    keywords: ["random", "string", "token"],
  },
  {
    id: "password",
    name: "Password",
    description: "Generator with strength meter",
    category: cat("generators"),
    path: "/tools/generators",
    hash: "password",
    icon: Key,
    keywords: ["password", "secure", "strength"],
  },
  {
    id: "json",
    name: "JSON",
    description: "Format, minify, validate",
    category: cat("developer"),
    path: "/tools/developer",
    hash: "json",
    icon: Braces,
    keywords: ["json", "format", "minify", "validate"],
  },
  {
    id: "find-replace",
    name: "Find & Replace",
    description: "Regex, case-insensitive, count",
    category: cat("developer"),
    path: "/tools/developer",
    hash: "find-replace",
    icon: Replace,
    keywords: ["find", "replace", "regex", "search"],
  },
  {
    id: "diff",
    name: "Text Diff",
    description: "Side-by-side line diff",
    category: cat("developer"),
    path: "/tools/developer",
    hash: "diff",
    icon: Diff,
    keywords: ["diff", "compare", "merge"],
  },
];
