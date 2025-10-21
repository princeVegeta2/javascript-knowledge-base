/*
    JavaScript Data Structures Overview
    -----------------------------------

    JavaScript’s core data structures fall into two broad categories:
    1. Primitive wrappers (String, Number, Boolean, BigInt, Symbol)
    2. Reference-based containers (Array, Object, Map, Set, WeakMap, WeakSet)

    -------------------------------------------------------
    1. ARRAYS  →  Ordered list-like collections (index-based)
    -------------------------------------------------------

    Declaration:
        const arr = [1, 2, 3];
        const arr2 = new Array(3); // [empty × 3]

    Common Methods (non-mutating unless noted):

    • .push(el)       → adds element at end (mutates)
    • .pop()          → removes last element (mutates)
    • .shift()        → removes first element (mutates)
    • .unshift(el)    → adds element at start (mutates)
    • .splice(start, deleteCount, ...items)
                      → insert/remove elements anywhere (mutates)
    • .slice(start, end)
                      → copies portion (non-mutating)
    • .concat(arr2)   → merges arrays (non-mutating)
    • .includes(x)    → true if element found
    • .indexOf(x)     → index of element or -1
    • .join(sep)      → joins elements into string

    Higher-Order Iteration Methods (create new arrays unless stated):

    • .forEach(fn)    → iterate, returns undefined
    • .map(fn)        → transform each element → returns NEW array
    • .filter(fn)     → keep elements where fn returns true
    • .find(fn)       → returns FIRST matching element (or undefined)
    • .findIndex(fn)  → returns index of first match
    • .some(fn)       → true if ANY element passes test
    • .every(fn)      → true if ALL elements pass test
    • .reduce(fn, acc)
                      → folds array → single value (sum, object, etc.)
    • .flat(depth)    → flattens nested arrays
    • .sort(fn)       → sorts (mutates)
    • .reverse()      → reverses order (mutates)

    -------------------------------------------------------
    2. OBJECTS  →  Key–value pairs (unordered)
    -------------------------------------------------------

    Declaration:
        const obj = { name: "Leo", age: 5 };
        const obj2 = new Object();

    Methods & Utilities:
    • Object.keys(obj)      → ["name","age"]
    • Object.values(obj)    → ["Leo",5]
    • Object.entries(obj)   → [["name","Leo"],["age",5]]
    • Object.assign(target, source)
                            → shallow copy / merge
    • Object.freeze(obj)    → make immutable
    • delete obj.key        → removes property

    Iteration:
        for (const key in obj) { ... }          // enumerable props
        for (const [k, v] of Object.entries(obj)) { ... } // modern way

    -------------------------------------------------------
    3. MAP  →  Key–value pairs with key of ANY type (ordered)
    -------------------------------------------------------

    Declaration:
        const map = new Map();
        map.set("a", 1);
        map.get("a");        // 1
        map.has("a");        // true
        map.delete("a");     // removes key
        map.size;            // count
        map.clear();         // empties map
        for (const [k,v] of map) { ... }

    Notes:
        • preserves insertion order
        • better than Object when keys are not strings

    -------------------------------------------------------
    4. SET  →  Collection of unique values
    -------------------------------------------------------

    Declaration:
        const set = new Set([1,2,3,3]); // {1,2,3}
        set.add(4);
        set.has(2);     // true
        set.delete(1);
        set.size;       // 2
        set.clear();

    Conversion:
        [...set]        → back to array
        new Set(array)  → remove duplicates

    -------------------------------------------------------
    5. WEAKMAP & WEAKSET  →  GC-sensitive collections
    -------------------------------------------------------

    • WeakMap: keys must be objects, values held weakly (not preventing GC)
    • WeakSet: similar but stores only object references
    • No .size or iteration — used for private data caches or memory-safe references.

    -------------------------------------------------------
    6. STRING (primitive but array-like)
    -------------------------------------------------------

    • "abc".length            → 3
    • "abc".charAt(1)         → "b"
    • "abc"[1]                → "b"
    • "abc".includes("a")     → true
    • "abc".indexOf("b")      → 1
    • "abc".toUpperCase()     → "ABC"
    • "a-b-c".split("-")      → ["a","b","c"]
    • ["a","b","c"].join("-") → "a-b-c"
    • "  hi  ".trim()         → "hi"
    • Template literals       → `Hello ${name}`

    -------------------------------------------------------
    7. SPECIALIZED STRUCTURES (less common)
    -------------------------------------------------------

    • Date       → new Date(), .getFullYear(), .toISOString()
    • RegExp     → /pattern/, .test(), .exec()
    • ArrayBuffer / TypedArray  → binary data (for performance)
    • JSON       → JSON.parse(str), JSON.stringify(obj)

    -------------------------------------------------------
    PERFORMANCE NOTES
    -------------------------------------------------------

    • Arrays are optimized for dense numeric indices.
    • Sparse arrays behave like objects internally (slower).
    • Map/Set are generally faster than Object for frequent add/remove.
    • Primitives are copied by value; Objects/Arrays by reference.
    • Modern JS engines heavily optimize immutable patterns (use const + new arrays).

    -------------------------------------------------------
    SUMMARY
    -------------------------------------------------------

    - Array → ordered list
    - Object → key–value map (string/symbol keys)
    - Map → key–value with any key type
    - Set → unique values
    - WeakMap / WeakSet → memory-safe references
    - String → text data (immutable)
    - Date / RegExp / TypedArray → specialized use cases
*/
