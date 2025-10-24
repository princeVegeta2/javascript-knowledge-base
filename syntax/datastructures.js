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
// HIGHER ORDER ITERATION METHODS
// Foreach
console.log(`arr.forEach(fn) iterates through the array and performs an action. It does not return anything`);
console.log(`Lets display each item of arr using arr.forEach((a) => console.log(a))`);
arr.forEach((a) => console.log(`This is an element obtained through foreach: ${a}`));
// Map
console.log(`.map() transforms each element and returns a new array. Lets create a new array mappedArr and divide each element of ${arr} by two`);
const mappedArr = arr.map((a) => a / 2);
console.log(`arr.map((a) => a / 2) resulted in: ${mappedArr}`);
// Filter
console.log(`.filter() goes through each element of the array and adds them to the new array if they are true. Lets find all even numbers on ${arr}`);
const filteredArr = arr.filter((a) => a % 2 === 0);
console.log(`Filter result : ${filteredArr}`);
// Find
console.log(`find() returns the first element matching a condition. Lets find the first even number in ${arr}`);
console.log(`Found number: ${arr.find(v => v % 2 === 0)}`);
// Index
console.log(`findIndex() returns a first found index of a value. Lets find the index of the first even number in ${arr}`);
console.log(`First even number index: ${arr.findIndex(v => v % 2 === 0)}`);
// Some and Every
console.log(`some() returns true if at least one element satisfies the condition. every() returns true if all elements do. Lets find out if we have at least one odd or all even: `);
console.log(`All numbers in ${arr} are even: ${arr.every(v => v % 2 === 0)}. At least one number is odd: ${arr.some(v => v % 2 !== 0)}`);
// Reduce
console.log(`reduce() takes an array and reduces it to a single value — by applying a callback function repeatedly to each element, carrying forward an “accumulator”.`);
console.log(`Lets find a sum of all elements of ${arr}`);
console.log(`The sum of all elements is: ${arr.reduce((acc, val) => acc + val, 0)}`);
console.log(`Here arr.reduce((acc, val) => acc + val, 0 -> accumulator(initial value 0, and value. And we add each value to the accumulator then defined the initial value of acc())`);
// Flatten
console.log(`flat(depth) flattens the mutlidimensional array according to depth specified`);
const nestedArr = [1, [2, 3], [4, [5, 6]]];
console.log(`Lets flatten the array ${nestedArr} one level down: ${nestedArr.flat(1)}`);
// Sort
const unsorted = [2, 1, 55, 20, 100];
console.log(`Sort simply sorts an array. It mutates an existing array AND returns a reference to it so that you can save it as a new array`);
console.log(`Lets sort ${unsorted}: ${unsorted.sort((a, b) => a - b)}`);
console.log(`You can sort the array without mutation by creating a slice of it first: nums.slice().sort(). sort() when empty sorts alphabetically`);
// Reverse
const sorted = unsorted.sort((a, b) => a - b);
console.log(`reverse() reverses the order of elements, mutates the original array`);
console.log(`Lets reverse our sorted ${sorted} array: ${sorted.reverse()}`);
console.log(`Spread operator creates a shallow copy of the new array which shares no reference with the old one.`);
const spreadArr1 = [1, 2];
const spreadArr2 = [3, 4];
const mixed = [0, ...spreadArr1, "middle", ...spreadArr2, 5];
console.log(`Lets mix ${spreadArr1} and ${spreadArr2}: const mixed = [0, ...spreadArr1, "middle", ...spreadArr2, 5]; Result ${mixed}`);
// ------------------Practice: Objects--------------------
console.log("---------------OBJECTS---------------");

// Declarations
const obj = { name: "Leo", age: 5 };
console.log(`Object with initialized values:`, obj);

const obj2 = new Object();
console.log(`Empty object via constructor:`, obj2);

// Adding / Updating properties
console.log(`Add a new prop (breed) and update age`);
obj.breed = "Lion";
obj.age = 6;
console.log(`After add/update:`, obj);

// Bracket vs dot & computed property names
const key = "continent";
obj[key] = "Africa";
console.log(`Bracket add with computed key "${key}":`, obj);

// Accessing
console.log(`Access via dot: name=${obj.name}, via bracket: age=${obj["age"]}`);

// Existence checks
console.log(`"age" in obj?`, "age" in obj);
console.log(`hasOwn (ES2022):`, Object.hasOwn(obj, "breed"));
console.log(`legacy hasOwnProperty:`, obj.hasOwnProperty("breed"));

// Deleting
console.log(`delete obj.breed`);
delete obj.breed;
console.log(`After delete:`, obj);

// Optional chaining & nullish coalescing
const user = { profile: { handle: "big-cat" } };
console.log(`Optional chaining: user.profile?.handle =`, user.profile?.handle);
console.log(`Optional chaining miss: user.settings?.theme =`, user.settings?.theme);
console.log(`Nullish coalescing default: user.settings?.theme ?? "light" =`, user.settings?.theme ?? "light");

// Object utilities
console.log(`Object.keys:`, Object.keys(obj));
console.log(`Object.values:`, Object.values(obj));
console.log(`Object.entries:`, Object.entries(obj));

const entries = [["species", "Panthera leo"], ["weightKg", 190]];
console.log(`Object.fromEntries (reverse of entries):`, Object.fromEntries(entries));

// Shallow copy / merge (Object.assign & spread)
const base = { a: 1, nested: { x: 10 } };
const extra = { b: 2 };
const merged1 = Object.assign({}, base, extra); // shallow
const merged2 = { ...base, ...extra };          // shallow
console.log(`Shallow copies via assign/spread:`, merged1, merged2);

// Demonstrate shallow copy pitfall
merged1.nested.x = 99; // mutates base.nested too (same reference)
console.log(`Shallow pitfall (nested shared): base=`, base, `merged1=`, merged1);

// Deep copy (safe for JSON-able data) — NOTE: loses Dates, functions, Maps/Sets
const deepCopy = JSON.parse(JSON.stringify(base));
deepCopy.nested.x = 123;
console.log(`Deep copy via JSON trick: base=`, base, `deepCopy=`, deepCopy);

// Better deep clone for structured data (Node 17+/modern browsers)
const structClone = structuredClone({ d: new Date(), arr: [1,2], nested: { y: 7 } });
structClone.nested.y = 100;
console.log(`structuredClone result:`, structClone);

// Immutability helpers
const freezeMe = { lock: true };
Object.freeze(freezeMe);
console.log(`Object.freeze -> locked:`, freezeMe, ` isFrozen=`, Object.isFrozen(freezeMe));
// freezeMe.lock = false; // would be ignored or throw in strict mode

const sealMe = { a: 1 };
Object.seal(sealMe);
sealMe.a = 2; // allowed (modify existing)
console.log(`Object.seal -> modified existing prop:`, sealMe, ` isSealed=`, Object.isSealed(sealMe));

// defineProperty (control descriptors)
const d = {};
Object.defineProperty(d, "id", {
  value: 42,
  writable: false,
  enumerable: true,
  configurable: false
});
console.log(`defineProperty non-writable id:`, d);
// d.id = 100; // ignored/throws in strict mode

// Iteration patterns
const animal = { name: "Cheetah", speed: 120 };
console.log(`for...in (own + enumerable + inherited):`);
for (const k in animal) {
  if (Object.hasOwn(animal, k)) {
    console.log(`  ${k}:`, animal[k]);
  }
}

console.log(`Object.entries + for...of (recommended):`);
for (const [k, v] of Object.entries(animal)) {
  console.log(`  ${k}:`, v);
}

// Transform an object (entries -> map -> fromEntries)
const upper = Object.fromEntries(
  Object.entries(animal).map(([k, v]) => [k.toUpperCase(), v])
);
console.log(`Transform keys to upper via entries/fromEntries:`, upper);

// Pattern: index an array of objects by id
const zoo = [
  { id: 1, name: "Lion" },
  { id: 2, name: "Tiger" },
  { id: 3, name: "Leopard" },
];
const byId = zoo.reduce((acc, cur) => (acc[cur.id] = cur, acc), {});
console.log(`Index by id via reduce:`, byId, `→ byId[2]=`, byId[2]);

// Pattern: immutable update (don’t mutate original)
const updatedZoo = zoo.map(a => a.id === 2 ? { ...a, name: "Bengal Tiger" } : a);
console.log(`Immutable update with spread:`, updatedZoo, `original:`, zoo);

// Pattern: safe nested updates
const state = { user: { prefs: { theme: "light", lang: "en" } } };
const newState = {
  ...state,
  user: {
    ...state.user,
    prefs: {
      ...state.user.prefs,
      theme: "dark",
    }
  }
};
console.log(`Immutable nested update:`, newState);

// JSON (serialize/parse)
const json = JSON.stringify(obj);
console.log(`JSON.stringify →`, json);
console.log(`JSON.parse →`, JSON.parse(json));
