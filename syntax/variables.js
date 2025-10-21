/*
    Variables in JavaScript are of three types: const, let and var.
    `const` is a variable of any type which cannot be changed to anything else at runtime. It is always constant.
    `let` is a variable of any type which CAN be changed at runtime.
    `var` is a variable of any type which can be changed at runtime AND is hoisted: can be accessed before it is declared, but its value will be undefined.

    `var` is legacy and should be avoided.

    `const` prevents rebinding the variable name, but does not make the value immutable if it’s an object or array.

    Full immutability: Object.freeze(person);

    JavaScript has 7 primitive types and 1 non-primitive category(objects).

    Primitives:
    - string "hello" sequence of UTF-16 characters
    - number 42, 3.14, NaN, Infinity single "double preciision float", no int/float distinction
    - bigint 123n arbitrary-length integers
    - boolean true/false logical values 
    - undefined declared but uninitialized default value for uninitialized vars
    - symbol Symbol("Id") unique identifiers
    - null null intentianal absence of value

    Non-Primitives(mutable, stored by reference)
    - Object {}
    - Array []
    - Function function() {}
    Date, Map, Set, RegExp built-in object subtypes
*/

// Practice
const numOne = 10;
const numTwo = 3.14;
const numThree = numOne + numTwo;
console.log(`Num3: ${numThree}`); // 13.14


const stringOne = "Hello";
const stringTwo = " world";
let stringThree = stringOne + stringTwo;
console.log(`String concatenation: ${stringThree}`); // Hello world
stringThree = stringThree + 500;
console.log(`String concatenation with a number: ${stringThree}`); // Hello world500

console.log(`Hoisted variable pre-definition: ${hoistedOne}`); // undefined
var hoistedOne = "This is a hoisted variable";
console.log(`Hoisted variable post-definition: ${hoistedOne}`); // this is a hoisted variable

