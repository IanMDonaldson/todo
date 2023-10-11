"use strict";

let arr = [];
let forEachArr = [];
let mapArr = [];

for (let i = 2_000; i > 0; i--) {
  arr.push([i, i * i, i * 2]);
}

let start = performance.now();
arr.forEach((a) => forEachArr.push({ ...a }));
let stop = performance.now();
let time1 = stop - start;

start = performance.now();
mapArr = arr.map((out) => {
  return { ...out };
});
stop = performance.now();

let time2 = stop - start;

console.table([time1, time2]);

function Configuration(input) {
  for (let key in input) this[key] = input[key];
  return this;
}

class TestClass {
  constructor(
    config = {
      test: true,
      works: false,
      good: "bad",
    }
  ) {
    for (let key in config) this[key] = config[key];
    this.config = new Configuration(config);
  }
  static logNothing() {
    console.log("nothing");
  }
}

console.log(
  new TestClass({
    works: true,
  })
);

TestClass.prototype.logNothing = () => console.log("something");

let newTest = new TestClass();
// TestClass.logNothing()
newTest.logNothing();
console.table([
  typeof TestClass,
  TestClass.prototype,
  typeof newTest,
  Object.prototype,
  typeof Configuration,
  typeof newTest.config,
]);
console.log(newTest.config);
console.log(this);

Object.prototype.toString = () => console.log('fuck you')
Number.prototype.toString = () => console.log('fuck YOU')

console.log(typeof Object)
console.log(typeof null)