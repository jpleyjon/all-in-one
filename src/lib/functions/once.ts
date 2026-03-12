/**
 * Creates a function that only executes at most once.
 *
 * @param fn Function to wrap.
 * @returns A function that invokes `fn` at most once and caches the result.
 * @throws {TypeError} If `fn` is not a function.
 */
export function once<TThis = unknown, TArgs extends unknown[] = unknown[], TReturn>(
  fn: (this: TThis, ...args: TArgs) => TReturn,
): (this: TThis, ...args: TArgs) => TReturn {
  if (typeof fn !== 'function') {
    throw new TypeError('fn must be a function.');
  }

  let called = false;
  let result: TReturn;

  return function (this: TThis, ...args: TArgs): TReturn {
    if (!called) {
      called = true;
      result = fn.apply(this, args);
    }

    return result;
  };
}
