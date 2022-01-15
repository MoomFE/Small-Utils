import { expect } from 'vitest';


export const types = {

  // Undefined
  undefined: [undefined],

  // Null
  null: [null],

  // String
  string: ['', ' ', 'Zw'],

  // Number
  number: [-0, 0, 6, 6.6, -Infinity, Infinity],

  // NaN
  nan: [NaN],

  // Boolean
  boolean: [true, false],

  // Symbol
  symbol: [Symbol(''), Symbol.iterator],

  // BigInt
  bigint: [-0n, 0n, 6n],

  // Object
  object: [
    {},
    { Zw: 1 },
    Object.create(null),
    Object.create({ Zw: 1 })
  ],

  // Array
  array: [
    [],
    [1, 2, 3],
    ['a', 'b', 'c'],
    new Array(2)
  ],

  // Function
  function: [
    function Zw() {},
    function () {},
    () => {},
    async function () {}, // eslint-disable-line no-empty-function
    function* () {}, // eslint-disable-line no-empty-function
    async function* () {} // eslint-disable-line no-empty-function
  ],

  // RegExp
  regExp: [
    /\w/,
    new RegExp('\\w') // eslint-disable-line prefer-regex-literals
  ],

  // Promise
  promise: [
    new Promise(() => {}),
    Promise.resolve(),
    Promise.reject()
  ],

  // Promise Like
  promiseLike: [
    {
      then() {},
      catch() {}
    }
  ]

};


export function testTypes(
  fn: (v: any) => boolean,
  checkTypes: (keyof typeof types)[]
) {
  const keys = Object.keys(types) as (keyof typeof types)[];

  for (const key of keys) {
    const values = types[key];

    if (checkTypes.includes(key)) {
      for (const value of values) {
        expect(fn(value)).toBe(true);
      }
    } else {
      for (const value of values) {
        expect(fn(value)).toBe(false);
      }
    }
  }
}
