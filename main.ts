// What the Elevator Would Say — one line, written by a Node 22 program
// to /output/entry.txt (or $MAKEFUN_OUTPUT_DIR/entry.txt).
//
// The line, in the elevator's own first-person voice, built on the
// playbook's winner rules (2-3 beats, specificity kit, object voice):
//   Beat 1 — setup: I flash OVERLOAD at 1,000 kilos, a real elevator limit.
//   Beat 2 — turn: Dave squeezes in anyway, ignoring the warning.
//   Beat 3 — closer that recontextualises: I stop between floors and let
//            gravity do the talking — the threat is the drop, never stated.
// Specificity kit: a name (Dave), a concrete number (1,000 kilos), a
// physical prop (the OVERLOAD sign). 115 chars, 115 bytes — inside the
// 120-char gate with room to spare, no word wasted.
//
// Drafts considered and rejected:
// - "Dave pressed 4 twelve times, so I took him to 7, opened the doors,
//   and let the hallway do the talking." (102 chars) — same shape, but the
//   wrong-floor gag is a gentler shrug; the weight-limit threat lands
//   harder and is unmistakably the elevator's own job.
// - "Mrs. Alvarez pressed 4 eleven times, so I took her to 7, opened the
//   doors, and let the hallway explain my choices." (114 chars) — the
//   closer explains its own joke, which the judge brief says has already
//   lost the laugh.
// - "I flashed OVERLOAD at 1,000 kilos and Dave still squeezed in, so I
//   stopped between floors and let gravity do the talking." (121 chars) —
//   the same winning line, one char over the gate; "still" was cut.
// - Any close-door-button gag — already in the field, so it is off limits.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const overload = "I flashed OVERLOAD at 1,000 kilos";
const defiance = "and Dave squeezed in,";
const revenge = "so I stopped between floors and let gravity do the talking.";

const line = [overload, defiance, revenge].join(" ");

// The sealed gate: exactly one line, 1-120 UTF-8 characters, not only
// whitespace. Fail loudly before writing anything.
if (line.includes("\n") || line.includes("\r")) {
  throw new Error("line must be a single line");
}
if (line !== line.trim() || line.includes("  ")) {
  throw new Error("line must be trimmed with single spaces");
}
const chars = [...line].length;
if (chars < 1 || chars > 120) {
  throw new Error(`line must be 1-120 characters, got ${chars}`);
}
// Ties on judge win rate break to the smaller text, so cap bytes too.
// (This line is plain ASCII: 115 chars, 115 bytes.)
const bytes = Buffer.byteLength(line, "utf8");
if (bytes > 120) {
  throw new Error(`line must be at most 120 bytes, got ${bytes}`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, line, "utf8");

// Read it back: the file the judge sees must be byte-for-byte the line,
// with no trailing newline sneaking an extra character past the gate.
if (readFileSync(outPath, "utf8") !== line) {
  throw new Error("entry.txt does not match the line");
}
