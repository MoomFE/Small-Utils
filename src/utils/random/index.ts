/**
 * 在传入的两个自然数之间随机生成一个自然数
 * @param from 最小的自然数
 * @param to 最大的自然数
 * @example
 *
 * randomNatural(0, 10); // -> 0 ~ 10
 */
export function randomNatural(from: number, to: number) {
  return Math.floor(
    Math.random() * (to - from + 1) + from,
  );
}

/**
 * 在传入的两个数字之间随机生成一个数字
 * @example
 *
 * random(0, 10); // -> 0 ~ 10
 * random(10, 0); // -> 0 ~ 10
 * random(-10, 10); // -> -10 ~ 10
 */
export function random(...args: number[]) {
  let [from = 0, to = 10] = args;

  if (args.length === 1)
    [from, to] = [0, from];

  if (from > to)
    [from, to] = [to, from];

  if (from > 0)
    return randomNatural(from, to);

  const result = randomNatural(0, to + Math.abs(from));

  if (result > to)
    return to - result;

  return result;
}

/**
 * 随机一个英文字母
 * @param uppercase 是否大写 ( default: false )
 * @example
 *
 * randomLetter(); // -> a ~ z
 * randomLetter(true); // -> A ~ Z
 */
export function randomLetter(uppercase = false) {
  return String.fromCharCode(
    uppercase ? randomNatural(65, 90) : randomNatural(97, 122),
  );
}