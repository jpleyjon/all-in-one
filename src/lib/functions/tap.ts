/**
 * Calls `interceptor` with `value`, then returns `value`.
 *
 * @param value Value to pass through.
 * @param interceptor Side-effect callback.
 * @returns The original value.
 * @throws {TypeError} If `interceptor` is not a function.
 */
export function tap<T>(value: T, interceptor: (value: T) => unknown): T {
  if (typeof interceptor !== 'function') {
    throw new TypeError('interceptor must be a function.');
  }

  interceptor(value);

  return value;
}
