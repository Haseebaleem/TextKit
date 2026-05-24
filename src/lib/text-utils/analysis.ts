export interface TextStats {
  characters: number;
  charactersNoSpaces: number;
  words: number;
  sentences: number;
  paragraphs: number;
  lines: number;
  readingTimeMin: number;
  speakingTimeMin: number;
  avgWordLength: number;
}

export function countCharacters(input: string): number {
  return Array.from(input).length;
}

export function countCharactersNoSpaces(input: string): number {
  return Array.from(input.replace(/\s/g, "")).length;
}

export function countWords(input: string): number {
  const trimmed = input.trim();
  if (!trimmed) return 0;
  return trimmed.split(/\s+/u).length;
}

export function countSentences(input: string): number {
  const trimmed = input.trim();
  if (!trimmed) return 0;
  const matches = trimmed.match(/[^.!?\n]+(?:[.!?]+|$)/g);
  return matches ? matches.filter((s) => s.trim().length > 0).length : 0;
}

export function countParagraphs(input: string): number {
  const trimmed = input.trim();
  if (!trimmed) return 0;
  return trimmed.split(/\n{2,}/).filter((p) => p.trim().length > 0).length;
}

export function countLines(input: string): number {
  if (input.length === 0) return 0;
  return input.split("\n").length;
}

export function readingTimeMinutes(input: string, wpm = 200): number {
  const words = countWords(input);
  if (words === 0) return 0;
  return words / wpm;
}

export function speakingTimeMinutes(input: string, wpm = 130): number {
  const words = countWords(input);
  if (words === 0) return 0;
  return words / wpm;
}

export function averageWordLength(input: string): number {
  const trimmed = input.trim();
  if (!trimmed) return 0;
  const words = trimmed.split(/\s+/u);
  const total = words.reduce((sum, w) => sum + Array.from(w).length, 0);
  return total / words.length;
}

export function wordFrequency(input: string, limit = 10): Array<[string, number]> {
  const trimmed = input.trim().toLocaleLowerCase();
  if (!trimmed) return [];
  const freq = new Map<string, number>();
  for (const raw of trimmed.split(/\s+/u)) {
    const w = raw.replace(/^[^\p{L}\p{N}]+|[^\p{L}\p{N}]+$/gu, "");
    if (!w) continue;
    freq.set(w, (freq.get(w) ?? 0) + 1);
  }
  return [...freq.entries()]
    .sort((a, b) => (b[1] - a[1]) || a[0].localeCompare(b[0]))
    .slice(0, limit);
}

export function characterFrequency(input: string, limit = 10): Array<[string, number]> {
  if (!input) return [];
  const freq = new Map<string, number>();
  for (const ch of Array.from(input)) {
    if (/\s/.test(ch)) continue;
    freq.set(ch, (freq.get(ch) ?? 0) + 1);
  }
  return [...freq.entries()]
    .sort((a, b) => (b[1] - a[1]) || a[0].localeCompare(b[0]))
    .slice(0, limit);
}

export function computeStats(input: string): TextStats {
  return {
    characters: countCharacters(input),
    charactersNoSpaces: countCharactersNoSpaces(input),
    words: countWords(input),
    sentences: countSentences(input),
    paragraphs: countParagraphs(input),
    lines: countLines(input),
    readingTimeMin: readingTimeMinutes(input),
    speakingTimeMin: speakingTimeMinutes(input),
    avgWordLength: averageWordLength(input),
  };
}
