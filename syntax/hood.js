/**
 * ================================================================
 *                 HOW JAVASCRIPT “WORKS” (NODE.JS)
 * ================================================================
 *
 * 1) SINGLE-THREADED JS
 *    - JS runs on a single thread: one call stack executes your code.
 *    - Memory: objects live on the heap; function calls push frames
 *      onto the call stack (LIFO).
 *
 * 2) THE HOST PROVIDES ASYNC
 *    - JS itself has no timers, network, filesystem—those are provided
 *      by the host (Browser “Web APIs”, Node’s libuv & C++ bindings).
 *    - When you call setTimeout, fs.readFile, fetch, etc., the *host*
 *      handles them and later queues callbacks to JS.
 *
 * 3) EVENT LOOP (HIGH LEVEL)
 *    - The event loop continually:
 *        a) Executes all synchronous code on the call stack.
 *        b) When idle, pulls the next queued *task* and runs its callback.
 *    - Different “queues”/“phases” exist. In Node (libuv), major ones:
 *        Timers → Pending → Idle/Prepare → Poll (I/O) → Check → Close
 *      (and microtasks woven in between—see below).
 *
 * 4) TASKS (“MACROTASKS”) vs MICROTASKS
 *    - Macrotasks (aka “tasks”): setTimeout/setInterval, setImmediate,
 *      I/O callbacks, UI events, etc.
 *    - Microtasks: Promise reactions (.then/.catch/.finally), queueMicrotask,
 *      and (Node-only) process.nextTick (special queue).
 *
 *    ORDERING RULES (important):
 *      • After *every* macrotask callback finishes, Node drains:
 *          (a) process.nextTick queue (Node-specific; runs before microtasks)
 *          (b) Microtask queue (Promises, queueMicrotask)
 *      • In browsers: only microtasks (no nextTick).
 *
 * 5) PROMISES & ASYNC/AWAIT
 *    - Promise callbacks (then/catch/finally) are *microtasks*.
 *      They run ASAP after the current stack unwinds, before the next macrotask.
 *    - async/await is syntax sugar over Promises—`await` yields to the event
 *      loop and resumes in a microtask.
 *
 * 6) setTimeout(0) vs setImmediate (Node)
 *    - From the main script:
 *        Usually setTimeout(0) fires *before* setImmediate (Timers phase runs
 *        before Check phase), but actual timing can vary slightly.
 *    - From inside an I/O callback:
 *        setImmediate fires *before* setTimeout(0) (because after Poll,
 *        we go to Check before the next Timers phase).
 *
 * 7) Starvation / Ordering gotchas
 *    - process.nextTick can starve the event loop if you schedule it
 *      recursively; it always runs before microtasks and before yielding
 *      to the next macrotask. Use sparingly.
 *
 * 8) Bottom line mental model
 *    - Sync code runs now.
 *    - When it completes, run nextTick(s), then microtasks (Promises).
 *    - Then pick the next macrotask (timers, I/O, setImmediate), run its
 *      callback, and again drain nextTick → microtasks.
 *
 * The code below demonstrates these orderings with clear logs.
 */

// ----------------------- LIVE DEMOS -----------------------
import fs from "node:fs";
import { setImmediate } from "node:timers";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Helper to print a header
function header(title) {
  console.log("\n" + "-".repeat(70));
  console.log(title);
  console.log("-".repeat(70));
}

// Demo 1: Synchronous vs microtasks vs timers vs immediate on main tick
header("DEMO 1: main tick ordering (sync → nextTick → microtasks → timers/check)");

console.log("[sync] start main script");

process.nextTick(() => {
  console.log("[nextTick] runs before microtasks");
});

queueMicrotask(() => {
  console.log("[microtask] queueMicrotask");
});

Promise.resolve().then(() => {
  console.log("[microtask] Promise.then #1");
}).then(() => {
  console.log("[microtask] Promise.then #2 (chained)");
});

setTimeout(() => {
  console.log("[timer] setTimeout 0ms (Timers phase)");
}, 0);

setImmediate(() => {
  console.log("[check] setImmediate (Check phase)");
});

console.log("[sync] end main script");

// Demo 2: async/await resumes as a microtask
header("DEMO 2: async/await resumes in microtasks");

(async () => {
  console.log("[sync] inside async IIFE before await");
  await null; // same as Promise.resolve()
  console.log("[microtask] async resumed after await");
})();

// Demo 3: I/O callback context: setImmediate vs setTimeout(0)
header("DEMO 3: inside I/O callback → setImmediate beats setTimeout(0)");

const tempFile = join(__dirname, ".event-loop-demo.tmp");
fs.writeFileSync(tempFile, "hello");

fs.readFile(tempFile, "utf8", (err, data) => {
  if (err) throw err;
  console.log("[I/O] fs.readFile callback");

  setTimeout(() => {
    console.log("[timer] setTimeout(0) inside I/O callback");
  }, 0);

  setImmediate(() => {
    console.log("[check] setImmediate inside I/O callback (usually before timeout)");
  });

  // Microtasks inside an I/O callback:
  process.nextTick(() => {
    console.log("[nextTick] inside I/O callback (before microtasks)");
  });

  Promise.resolve().then(() => {
    console.log("[microtask] Promise.then inside I/O callback");
  });
});

// Demo 4: nextTick vs microtasks draining order (be careful!)
header("DEMO 4: nextTick drains fully before microtasks; avoid starvation");

process.nextTick(() => {
  console.log("[nextTick] A");
});
process.nextTick(() => {
  console.log("[nextTick] B (still before microtasks)");
});

Promise.resolve().then(() => {
  console.log("[microtask] Promise.then after draining ALL nextTicks");
});

// Demo 5: Nested scheduling (show draining after each macrotask)
header("DEMO 5: draining microtasks after each macrotask callback");

setTimeout(() => {
  console.log("[timer] T1 callback");
  Promise.resolve().then(() => {
    console.log("[microtask] after T1");
  });
  setTimeout(() => {
    console.log("[timer] T2 callback (scheduled by T1)");
    queueMicrotask(() => {
      console.log("[microtask] after T2");
    });
  }, 0);
}, 0);

// Clean up temp file eventually
setTimeout(() => {
  try { fs.unlinkSync(tempFile); } catch {}
}, 50);

/**
 * --------------------------------------------------------------
 * EXPECTED ORDER HIGHLIGHTS (typical in Node, may vary slightly):
 *
 * DEMO 1 (main tick):
 *   [sync] start
 *   [sync] end
 *   [nextTick] ...
 *   [microtask] queueMicrotask
 *   [microtask] Promise.then #1
 *   [microtask] Promise.then #2
 *   [timer] setTimeout 0ms
 *   [check] setImmediate
 *
 * DEMO 2:
 *   [sync] inside async IIFE before await
 *   [microtask] async resumed after await
 *
 * DEMO 3 (inside I/O callback):
 *   [I/O] fs.readFile callback
 *   [nextTick] inside I/O callback
 *   [microtask] Promise.then inside I/O callback
 *   [check] setImmediate inside I/O callback   <-- typically before timeout
 *   [timer] setTimeout(0) inside I/O callback
 *
 * DEMO 4:
 *   [nextTick] A
 *   [nextTick] B
 *   [microtask] Promise.then ...
 *
 * DEMO 5:
 *   [timer] T1 callback
 *   [microtask] after T1
 *   [timer] T2 callback
 *   [microtask] after T2
 *
 * Takeaways:
 *  - Sync logs first, then nextTick(s), then microtasks, then timers/immediate.
 *  - nextTick runs before Promise microtasks; don’t overuse it.
 *  - From I/O callbacks, setImmediate typically precedes setTimeout(0).
 *  - After every macrotask callback, Node drains nextTick → microtasks.
 */
