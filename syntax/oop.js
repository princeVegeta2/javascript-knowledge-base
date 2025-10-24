console.log("============= JS OOP PLAYGROUND =============");

/**
 * 1) CLASS BASICS: constructor, instance fields, methods, toString
 */
class Animal {
  // Public instance fields
  name;
  age;

  // Private field (hard-private)
  #secret = "I eat quietly";

  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  speak() {
    return `${this.name} makes a sound.`;
  }

  // Getter/Setter (encapsulation)
  get secret() {
    return `(redacted)`;
  }
  set secret(val) {
    // pretend to validate or log; we won’t allow writes
    console.warn("secret is read-only; ignoring", val);
  }

  // Customize stringification
  toString() {
    return `Animal(${this.name}, ${this.age})`;
  }

  // Custom JSON serialization
  toJSON() {
    return { type: "Animal", name: this.name, age: this.age };
  }

  // Static members (class-wide)
  static kingdom = "Animalia";
  static describe() {
    return `All creatures belong to ${this.kingdom}.`;
  }
}

console.log("\n-- 1) Class basics --");
const a1 = new Animal("Creature", 2);
console.log(a1.speak());
console.log(String(a1));
console.log("kingdom:", Animal.kingdom, "|", Animal.describe());
console.log("get secret:", a1.secret);
a1.secret = "new secret"; // blocked
console.log("JSON:", JSON.stringify(a1));


/**
 * 2) INHERITANCE & POLYMORPHISM: extends, super, override
 */
class Lion extends Animal {
  #kills = 0;

  constructor(name, age) {
    super(name, age); // must call before accessing this
  }

  hunt() {
    this.#kills++;
    return `${this.name} hunted (#${this.#kills}).`;
  }

  // Override
  speak() {
    return `${this.name} roars!`;
  }

  // Call parent version if you need to
  parentSpeak() {
    return super.speak();
  }

  // Private static field/method
  static #species = "Panthera leo";
  static species() {
    return this.#species;
  }
}

console.log("\n-- 2) Inheritance & polymorphism --");
const l1 = new Lion("Simba", 5);
console.log(l1.speak(), "| parent:", l1.parentSpeak());
console.log(l1.hunt(), l1.hunt());
console.log("species:", Lion.species());

const zoo = [a1, l1];
console.log("Polymorphic speak():");
for (const z of zoo) console.log(" -", z.speak()); // dynamic dispatch


/**
 * 3) COMPOSITION: “has-a” instead of “is-a”
 */
class Engine {
  constructor(hp) { this.hp = hp; }
  start() { return `Engine(${this.hp}hp) started`; }
}

class Car {
  engine; // composed
  constructor(hp) {
    this.engine = new Engine(hp);
  }
  drive() { return `${this.engine.start()} → Car driving`; }
}

console.log("\n-- 3) Composition --");
console.log(new Car(200).drive());


/**
 * 4) PROTOTYPES: classic function constructor + prototype methods
 * (Classes are sugar over prototypes.)
 */
function OldSchoolPoint(x, y) {
  this.x = x; this.y = y;
}
OldSchoolPoint.prototype.len = function () {
  return Math.hypot(this.x, this.y);
};

console.log("\n-- 4) Prototypes --");
const p = new OldSchoolPoint(3, 4);
console.log("len:", p.len(), "| instanceof OldSchoolPoint:", p instanceof OldSchoolPoint);


/**
 * 5) THIS BINDING: methods lose `this` if extracted; use bind/arrow
 */
console.log("\n-- 5) this-binding --");
const loseThis = a1.speak;
try { console.log("lost this:", loseThis()); } catch (e) { console.log("lost this error:", e.message); }
const boundSpeak = a1.speak.bind(a1);
console.log("bound speak:", boundSpeak());

class Button {
  constructor(label) {
    this.label = label;
    // Arrow captures lexical this
    this.onClick = () => `Clicked ${this.label}`;
  }
}
const btn = new Button("OK");
const cb = btn.onClick; // still works
console.log("arrow captured this:", cb());


/**
 * 6) MIXINS: copy methods into a prototype
 */
console.log("\n-- 6) Mixins --");
const CanRun = {
  run() { return `${this.name ?? "It"} runs fast!`; }
};
Object.assign(Animal.prototype, CanRun);
console.log("mixin run():", a1.run(), "|", l1.run());


/**
 * 7) IMMUTABILITY & COPY: class fields vs shared references
 */
console.log("\n-- 7) Copying instances (shallow) --");
class Box {
  items = [];
  constructor(seed) { if (seed) this.items.push(seed); }
  add(x) { this.items.push(x); }
}
const b1 = new Box("A");
const b2 = Object.assign(Object.create(Object.getPrototypeOf(b1)), b1); // shallow copy
b2.add("B");
console.log("b1.items:", b1.items, "| b2.items:", b2.items, "(same array ref!)");

// If you want independent storage, deep copy the data you own:
const b3 = new Box();
b3.items = structuredClone(b1.items);
b3.add("C");
console.log("deep-ish clone → b1.items:", b1.items, "| b3.items:", b3.items);


/**
 * 8) “ABSTRACT” PATTERN: emulate abstract methods with throws
 */
console.log("\n-- 8) Abstract-ish base class --");
class Repository {
  save() { throw new Error("save() must be implemented"); }
  findById() { throw new Error("findById() must be implemented"); }
}
class MemoryRepo extends Repository {
  store = new Map();
  save(id, val) { this.store.set(id, val); }
  findById(id) { return this.store.get(id); }
}
const r = new MemoryRepo();
r.save(1, { n: "Leo" });
console.log("findById:", r.findById(1));


/**
 * 9) SYMBOLS & BRANDING (custom tagging)
 */
console.log("\n-- 9) Symbol.toStringTag --");
class Tagged { get [Symbol.toStringTag]() { return "TaggedThing"; } }
console.log(Object.prototype.toString.call(new Tagged())); // [object TaggedThing]


/**
 * 10) ASYNC INIT PATTERNS
 * Constructors themselves cannot be `async` (no `await` there),
 * but they *can* return an object. Returning a Promise “works”,
 * yet it turns `new C()` into a Promise — surprising ergonomics.
 * Prefer a static async factory or an async init() method.
 */

// 10a) (Your pattern) “Async constructor” that returns a Promise.
// ⚠ Caveat: `const inst = await new AsyncCtor()` works,
// but without await you just have a Promise, not an instance.
console.log("\n-- 10a) Async constructor (works but surprising) --");
class AsyncCtor {
  data;
  constructor(x) {
    return (async () => {
      await Promise.resolve(); // simulate async
      this.data = x * 2;
      return this;             // returning an object replaces `this`
    })();
  }
  getData() { return this.data; }
}
(async () => {
  const inst = await new AsyncCtor(21); // must await the constructor call result
  console.log("async-ctor data:", inst.getData());
})();

// 10b) Preferred: static async factory (idiomatic)
console.log("\n-- 10b) Static async factory (recommended) --");
class User {
  id; profile;
  constructor(id, profile) {
    this.id = id; this.profile = profile;
  }
  static async create(id) {
    // pretend to fetch profile:
    const profile = await Promise.resolve({ handle: "big-cat", karma: 9001 });
    return new User(id, profile);
  }
}
(async () => {
  const u = await User.create(42);
  console.log("factory user:", u.id, u.profile.handle);
})();

// 10c) Alternative: 2-phase init (async init() returning this)
console.log("\n-- 10c) Two-phase async init() --");
class DBClient {
  connected = false;
  async init() {
    await Promise.resolve();
    this.connected = true;
    return this; // allow chaining/awaiting
  }
  query(q) { if (!this.connected) throw new Error("not connected"); return `Result(${q})`; }
}
(async () => {
  const db = await new DBClient().init();
  console.log("db connected?", db.connected, "|", db.query("SELECT 1"));
})();


/**
 * 11) PATTERN: FACTORY vs CLASS
 */
console.log("\n-- 11) Factory function vs Class --");

function makeCounter(start = 0) {
  let n = start; // closure = private state
  return {
    inc() { n++; return n; },
    get value() { return n; }
  };
}

class Counter {
  #n;
  constructor(start = 0) { this.#n = start; }
  inc() { this.#n++; return this.#n; }
  get value() { return this.#n; }
}

const cf = makeCounter(5);
const cc = new Counter(5);
console.log("factory:", cf.inc(), cf.value, "| class:", cc.inc(), cc.value);


/**
 * 12) EDGE: instanceof with async-ctor
 * If you return `this` from the async IIFE in the constructor,
 * `await new C()` is an instance of C. But beware ergonomics:
 * without `await`, users have a Promise not an instance.
 */
console.log("\n-- 12) instanceof checks --");
(async () => {
  const x = await new AsyncCtor(1);
  console.log("x instanceof AsyncCtor:", x instanceof AsyncCtor); // true
})();

/**
 * 13) WRAP-UP
 */
console.log("\n============= END =============");
