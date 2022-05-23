import { expect } from 'vitest';

/**
 * 所有用于测试的类型
 */
export const types = {

  // Undefined
  undefined: [undefined],

  // Null
  null: [null],

  // String
  string: ['', ' ', 'Zw'],

  // Number
  number: [-6.6, -6, -0, 0, 6, 6.6, -Infinity, Infinity],

  // Numeric String
  numericString: ['-6.6', '-6', '-0', '0', '6', '6.6'],

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
    Object.create({ Zw: 1 }),
  ],

  // Array
  array: [
    [],
    [1, 2, 3],
    ['a', 'b', 'c'],
    new Array(2),
  ],

  // Function
  function: [
    function Zw() {},
    function () {},
    () => {},
    async function () {}, // eslint-disable-line no-empty-function
    function* () {}, // eslint-disable-line no-empty-function
    async function* () {}, // eslint-disable-line no-empty-function
  ],

  // RegExp
  regExp: [
    /\w/,
    new RegExp('\\w'), // eslint-disable-line prefer-regex-literals
  ],

  // Promise
  promise: [
    new Promise(() => {}),
    Promise.resolve(),
  ],

  // Promise Like
  promiseLike: [
    {
      then() {},
      catch() {},
    },
  ],

};

/** 需要测试的类型数组 */
type CheckTypes = (keyof typeof types)[];
/** 其余选项 */
interface Options {
  /**
   * 是否反向测试
   * @default false
   */
  reverse?: boolean
}

export function testTypes(
  fn: (v: any) => boolean,
  checkTypes: CheckTypes,
  options: Options = {},
) {
  const keys = Object.keys(types) as CheckTypes;
  const isReverse = !!options.reverse;

  for (const key of keys) {
    const values = types[key];

    if (checkTypes.includes(key)) {
      for (const value of values)
        expect(fn(value)).toBe(!isReverse);
    }
    else {
      for (const value of values)
        expect(fn(value)).toBe(isReverse);
    }
  }
}
