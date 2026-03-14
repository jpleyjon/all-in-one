/**
 * Creates a debounced function that delays execution until `wait` ms have elapsed since
 * the last call.
 *
 * @param fn Function to debounce.
 * @param wait Debounce window in milliseconds.
 * @returns Debounced function.
 * @throws {TypeError} If `fn` is not a function.
 * @throws {RangeError} If `wait` is not a non-negative finite number.
 */
export function debounce<TArgs extends unknown[], TReturn>(
  fn: (...args: TArgs) => TReturn,
  wait: number,
): (...args: TArgs) => TReturn | undefined {
  if (typeof fn !== 'function') {
    throw new TypeError('fn must be a function.');
  }

  if (!Number.isFinite(wait) || wait < 0) {
    throw new RangeError('wait must be a finite non-negative number.');
  }

  let timer: ReturnType<typeof setTimeout> | undefined;
  let latestInvocation: (() => TReturn) | undefined;
  let result: TReturn;

  return function debounced(this: unknown, ...args: TArgs): TReturn | undefined {
    latestInvocation = () => fn.apply(this, args);

    if (timer !== undefined) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      timer = undefined;

      if (latestInvocation !== undefined) {
        result = latestInvocation();
        latestInvocation = undefined;
      }
    }, wait);

    return result;
  };
}
