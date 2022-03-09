import { isFunction, isNumeric } from '@/utils';


interface OArgs {
  [key: number]: any;
}


export function defineArgs<T>(
  func: (...args: any[]) => T,
  oArgs: OArgs
) {
  return function (...userArgs: any[]) {
    const args: any[] = [];
    const maxOArgsIndex = Math.max(...Object.keys(oArgs).filter(isNumeric).map(Number));

    let userArgsIndex = 0;
    let index = 0;

    for (; index <= maxOArgsIndex || userArgsIndex < userArgs.length; index++) {
      let value;

      if (index in oArgs) {
        value = oArgs[index];
        value = isFunction(value) ? value() : value;
      } else {
        value = userArgs[userArgsIndex++];
      }

      args.push(value);
    }

    return func(...args);
  };
}
