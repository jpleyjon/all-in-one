/**
 * Creates a function that only executes at most once.
 *
 * @param fn Function to wrap.
 * @returns A function that invokes `fn` at most once and caches the result.
 * @throws {TypeError} If `fn` is not a function.
 */
export function once<TArgs extends unknown[], TReturn>(
  fn: (...args: TArgs) => TReturn,
): (...args: TArgs) => TReturn {
  if (typeof fn !== 'function') {
    throw new TypeError('fn must be a function.');
  }

  let called = false;
  let result: TReturn;

  return (...args: TArgs): TReturn => {
    if (!called) {
      called = true;
      result = fn(...args);
    }

    return result;
  };
}
