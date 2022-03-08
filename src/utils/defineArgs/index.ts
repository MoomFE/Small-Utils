import { isFunction } from '@/utils';


interface OArgs {
  [key: number]: any;
}


export function defineArgs<T>(func: (...args: any[]) => T, oArgs: OArgs) {
  return function (...userArgs: any[]) {
    const args = [];
    const argsLength = Object.keys(oArgs).length + userArgs.length;

    let userArgsIndex = 0;
    let index = 0;

    for (; index < argsLength; index++) {
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
