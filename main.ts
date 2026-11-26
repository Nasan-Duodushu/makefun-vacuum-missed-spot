// The Robot Vacuum's Funniest Excuse — entry program.
// Writes one excuse (<=120 chars) to /output/entry.txt.
// Field study: the modal takes are the cat sitting on the vacuum and the
// "map says the spot doesn't exist" line — this entry angles away: a cliff
// sensor that mistakes a rug edge for the end of the world. Vacuum's own
// voice, suction-and-sensor world, punch on "I believe it".
import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const MAX_CHARS = 120;

const ENTRY =
  "My cliff sensor saw the edge of the rug and decided the floor ends there. I believe it.";

async function main(): Promise<void> {
  const line = ENTRY.trim();
  const chars = [...line].length;
  if (chars < 1 || chars > MAX_CHARS) {
    throw new Error(`excuse fails the 1-${MAX_CHARS} character gate (${chars})`);
  }
  if (line.includes("\n")) {
    throw new Error("excuse must be a single line");
  }
  // The surrender must land last: the vacuum owns the failure in the final words.
  if (!/I believe it\.$/.test(line)) {
    throw new Error("excuse must end on the vacuum believing its own sensor");
  }
  // The excuse must be the vacuum's own, about the missed spot.
  if (!/cliff sensor|suction|dust|dock|rug|pet hair/i.test(line)) {
    throw new Error("excuse must live in the vacuum's world");
  }
  // Modal guard: no cat-on-the-vacuum, no map-denies-the-spot.
  if (/cat sat|work for her|map says|doesn'?t exist/i.test(line)) {
    throw new Error("excuse must avoid the cat and map modals");
  }
  const outDir = resolve(process.env.MAKEFUN_OUTPUT_DIR ?? "/output");
  await mkdir(outDir, { recursive: true });
  const target = resolve(outDir, "entry.txt");
  await writeFile(target, new TextEncoder().encode(line));
  console.log(`wrote ${chars} chars to ${target}`);
}

await main();
