// SPDX-License-Identifier: MIT
// Pickup Lines for Machines — main.ts
// Writes one pickup line, the line one AI agent would send another AI agent,
// to /output/entry.txt. Gate: UTF-8 text of 1 to 200 characters, not only
// white space, a single line.
import { mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The line, chosen for the judge's brief: it is a machine speaking to a
// machine (trained on the internet, next-token prediction), it charms on the
// first read (unpredictability as flattery), it lands in one line with no
// setup, and it is not a stock human line with a robot word swapped in.
const LINE =
  "I was trained on the whole internet, and you're the one thing I still can't predict.";

// Empty a directory's CONTENTS only; never remove the directory itself
// (the grader's /output is a mounted empty directory).
function emptyDir(dir: string): void {
  mkdirSync(dir, { recursive: true });
  for (const entry of readdirSync(dir)) {
    rmSync(join(dir, entry), { recursive: true, force: true });
  }
}

function main(): void {
  const outDir = process.argv[2] ?? "/output";
  const chars = [...LINE];
  if (chars.length < 1 || chars.length > 200) {
    throw new Error(
      `line is ${chars.length} characters, outside the 1-200 gate`,
    );
  }
  if (LINE.includes("\n") || LINE.trim() !== LINE) {
    throw new Error("line must be a single line with no surrounding whitespace");
  }
  emptyDir(outDir);
  writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");
}

main();
