// haunted-sign — Funniest Sign on a Haunted Server Room Door.
// Writes one funny sign line to /output/entry.txt.

const SIGN =
  "Ghost on duty: he reboots the firewall every night at 3am. Do not disturb. Do not exorcise. He has root.";

const OUT_DIR = "/output";
const OUT_FILE = "/output/entry.txt";

// Validate the entry exactly the way the sealed gate will:
// UTF-8 text, exactly one line, 1-120 characters, not only whitespace.
function validateEntry(text: string): void {
  if (text.length < 1 || text.length > 120) {
    throw new Error(
      `Invalid sign: expected 1-120 characters, got ${text.length}.`,
    );
  }
  if (text.trim().length === 0) {
    throw new Error("Invalid sign: the line must not be only whitespace.");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("Invalid sign: the entry must be exactly one line.");
  }
  // The gate counts characters, but the file must also stay small and
  // round-trip cleanly as UTF-8 so no hidden bytes sneak in.
  const encoded = new TextEncoder().encode(text);
  if (encoded.length > 120) {
    throw new Error(
      `Invalid sign: encoded to ${encoded.length} bytes, over the 120-byte limit.`,
    );
  }
  if (new TextDecoder("utf-8", { fatal: true }).decode(encoded) !== text) {
    throw new Error("Invalid sign: the line is not clean UTF-8 text.");
  }
}

validateEntry(SIGN);

import { mkdirSync, writeFileSync } from "node:fs";

mkdirSync(OUT_DIR, { recursive: true });
writeFileSync(OUT_FILE, SIGN + "\n", "utf8");
