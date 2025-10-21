/*
    JavaScript Data Structures Overview
    -----------------------------------

    JavaScript’s core data structures fall into two broad categories:
    1. Primitive wrappers (String, Number, Boolean, BigInt, Symbol)
    2. Reference-based containers (Array, Object, Map, Set, WeakMap, WeakSet)

    -------------------------------------------------------
    1. ARRAYS  →  Ordered list-like collections (index-based). Size can be changed dynamically
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

// ------------------Practice: Arrays--------------------
console.log("---------------ARRAYS---------------");
const arr = [1, 2, 3];
console.log(`Array with initialized values: ${arr}`);
const arr2 = new Array(3); // [empty × 3]
console.log(`Array initialized with 3 empty values: ${arr2}`);
// Pushing
arr.push(4);
console.log(`Mutated arr, added another element at end using .push(4): ${arr}`);
arr.push("String type");
console.log(`Arrays are not type-restricted. Pushing an element "String type": ${arr}`);
arr2.push(21);
console.log(`Pushing elements into an empty array, arr2.push(21): ${arr2}`);
// Popping
console.log(`Let's pop an element from the array: ${arr}`);
const popped = arr.pop();
console.log(`pop() removes the last element of the array and returns it. pop(): ${arr}, popped: ${popped}`);
// Shifting
console.log(`Shifting removes the first element of the array. Lets shift: ${arr}`);
const shifted = arr.shift();
console.log(`shift() removes the first element of the array and returns it. shift(): ${arr}, shifted: ${shifted}`);
// Unshifting
console.log(`Unshift adds an element to the beginning of the array. Lets shift 1 back into ${arr}`);
arr.unshift(1);
console.log(`unshift() added element 1 to the beginning of the array: ${arr}`);
// Splicing
console.log(`splice(start, deleteCount, ...items) splices an array and returns removed items. First you add a start index, amount of elements to delete after the index, and which ...items to insert after deletion`);
console.log(`arr.splice(1, 2, 21) - will remove two elements at the first index and one after, and insert 21 instead: ${arr}`);
const removedSplicing = arr.splice(1, 2, 21);
console.log(`Splice result: ${arr}, removed: ${removedSplicing}`);
arr.push(30);
console.log(`You can remove an exact element from an array if you know the index. Lets remove the third element(2) from arr: ${arr}`);
const removedSplicingTwo = arr.splice(2, 1);
arr.push(500);
console.log(`Element at index 2 removed from array: ${arr}, removed value ${removedSplicingTwo}`);
console.log(`slice() slices an array and creates a shallow copy. Lets slice the array ${arr} at index 0 and index 2(non-inclusive)`);
const slicedArr = arr.slice(0, 2);
console.log(`Sliced array: ${slicedArr}`);
console.log(`If you change the value at the element at the second(1) index from 21 to 2, it will not change the original arr since its primitive values: ${arr}`);
slicedArr[1] = 2;
console.log(`Sliced array after change: ${slicedArr}, original arr after change: ${arr}`);
const sliceTestArr = [ { name: "Lion" }, { name: "Tiger" }, { name: "Panther" }, { name: "Cheetah" } ];
console.log(`But if we use non-primitive types such as an object in the array, the value of an original array can be changed by modifying a sliced copy. Lets test it on array of objects: ${sliceTestArr.map((obj) => obj.name)}`);
const slicedArr2 = sliceTestArr.slice(2, 4);
console.log(`We created a new slice(2, 4) even though 4th index does not exist since its non-inclusive at end to take the last two objects: ${slicedArr2.map((obj) => obj.name)}. Original arr: ${sliceTestArr.map((obj) => obj.name)}`);
slicedArr2[1].name = "Jaguar";
console.log(`Now we changed slicedArr2's last index from Cheetah to Jaguar: ${slicedArr2.map((obj) => obj.name)} and it changed the original arr's last element as well: ${sliceTestArr.map((obj) => obj.name)}`);
// Concat
const arr3 = [1, 2, 3];
const arr4 = [21, 22, 23];
const concatenatedArr = arr3.concat(arr4);
console.log(`concat() concatenates two arrays and returns a new one. Non mutating. Lets concatenate arr3: ${arr3} and arr4: ${arr4} -> ${concatenatedArr}. Original arrs not changed: ${arr3} & ${arr4}`);
// Includes
console.log(`.includes(x) returns true if an element is found within an array. Lets find out if 1 is in ${arr}: ${arr.includes(1)}`);
// Indexof
console.log(`.indexof(x) returns an index of a first occurence of value. If there are multiple, it will only return the first. Lets find an index of 500 in ${arr}: ${arr.indexOf(500)}`);
// join
const joinArr = ["This", "is", "an", "array", "of", "strings"];
console.log(`.join(sep) joins every element of an array into a string, using a separator character. Lets join(" ") with a space as a separator ${joinArr}: ${joinArr.join(" ")}`);