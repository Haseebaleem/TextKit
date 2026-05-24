function bytesToBase64(bytes: Uint8Array): string {
  let binary = "";
  const chunkSize = 0x8000;
  for (let i = 0; i < bytes.length; i += chunkSize) {
    const chunk = bytes.subarray(i, i + chunkSize);
    binary += String.fromCharCode(...chunk);
  }
  return btoa(binary);
}

function base64ToBytes(input: string): Uint8Array {
  const binary = atob(input);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

export function base64Encode(input: string): string {
  if (!input) return "";
  const bytes = new TextEncoder().encode(input);
  return bytesToBase64(bytes);
}

export function base64Decode(input: string): string {
  if (!input) return "";
  const bytes = base64ToBytes(input);
  return new TextDecoder("utf-8", { fatal: false }).decode(bytes);
}

export function urlEncode(input: string): string {
  if (!input) return "";
  return encodeURIComponent(input);
}

export function urlDecode(input: string): string {
  if (!input) return "";
  return decodeURIComponent(input);
}

const HTML_ENCODE_MAP: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

export function htmlEncode(input: string): string {
  if (!input) return "";
  return input.replace(/[&<>"']/g, (ch) => HTML_ENCODE_MAP[ch] ?? ch);
}

const HTML_DECODE_MAP: Record<string, string> = {
  "&amp;": "&",
  "&lt;": "<",
  "&gt;": ">",
  "&quot;": '"',
  "&#39;": "'",
  "&apos;": "'",
  "&nbsp;": " ",
};

export function htmlDecode(input: string): string {
  if (!input) return "";
  return input
    .replace(/&(?:amp|lt|gt|quot|apos|nbsp|#39);/g, (m) => HTML_DECODE_MAP[m] ?? m)
    .replace(/&#(\d+);/g, (_, code: string) => String.fromCodePoint(Number(code)))
    .replace(/&#x([0-9a-fA-F]+);/g, (_, code: string) => String.fromCodePoint(parseInt(code, 16)));
}
