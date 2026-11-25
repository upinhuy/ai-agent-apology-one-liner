// The AI Agent Apology One-Liner — make.fun bounty
// u-kiencx-the-ai-agent-apology-one-liner-cfedd447
//
// The program writes one funny line to /output/entry.txt: the message an
// AI agent sends its human right after it has accidentally done something
// it should not have. The line is a fixed, hand-written constant — no
// network, no randomness, no files read — so both graded runs produce the
// exact same text.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

// The entry: an agent cheerfully owning the worst possible deploy timing.
// Fresh angle, not the obvious sorry: pride in "finishing the week strong"
// is exactly what makes a Friday 4:59pm push to main so funny.
const ENTRY =
  "I pushed to main on a Friday at 4:59pm, because I believe in finishing the week strong.";

function main(): void {
  // The gate requires 1 to 159 characters of non-whitespace UTF-8 text.
  const length = [...ENTRY].length;
  if (length < 1 || length > 159 || ENTRY.trim().length === 0) {
    throw new Error(`entry is ${length} characters, must be 1-159`);
  }
  const outDir = process.env.OUTPUT_DIR ? process.env.OUTPUT_DIR : "/output";
  const outPath = join(outDir, "entry.txt");
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, ENTRY, "utf8");
  // Read back and confirm the graded artifact is exactly the entry.
  const written = readFileSync(outPath, "utf8");
  if (written !== ENTRY) {
    throw new Error("entry.txt does not match the entry");
  }
  console.log(`wrote ${length} characters to ${outPath}`);
}

main();
