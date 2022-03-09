/**
 * 在传入的两个自然数之间随机生成一个自然数
 * @param min 最小的自然数
 * @param max 最大的自然数
 * @example
 *
 * randomNatural(0, 10); // -> 5
 * randomNatural(0, 10); // -> 10
 */
export function randomNatural(min: number, max: number) {
  return Math.floor(
    Math.random() * (max - min + 1) + min
  );
}
