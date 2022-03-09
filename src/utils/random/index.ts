/**
 * 在传入的两个自然数之间随机生成一个自然数
 * @param from 最小的自然数
 * @param to 最大的自然数
 * @example
 *
 * randomNatural(0, 10); // -> 5
 * randomNatural(0, 10); // -> 10
 */
export function randomNatural(from: number, to: number) {
  return Math.floor(
    Math.random() * (to - from + 1) + from
  );
}
