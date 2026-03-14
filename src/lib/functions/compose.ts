import { identity } from './identity';

/**
 * Creates a function that composes functions from right to left.
 *
 * @param fns Functions to compose.
 * @returns A function that applies the last function to the input, then the previous, etc.
 * @throws {TypeError} If any item in `fns` is not a function.
 */
export function compose<T>(): (value: T) => T;
export function compose<T, R>(fn: (value: T) => R): (value: T) => R;
export function compose<A, B, C>(fn2: (value: B) => C, fn1: (value: A) => B): (value: A) => C;
export function compose<A, B, C, D>(
  fn3: (value: C) => D,
  fn2: (value: B) => C,
  fn1: (value: A) => B,
): (value: A) => D;
export function compose<A, B, C, D, E>(
  fn4: (value: D) => E,
  fn3: (value: C) => D,
  fn2: (value: B) => C,
  fn1: (value: A) => B,
): (value: A) => E;
export function compose<A, B, C, D, E, F>(
  fn5: (value: E) => F,
  fn4: (value: D) => E,
  fn3: (value: C) => D,
  fn2: (value: B) => C,
  fn1: (value: A) => B,
): (value: A) => F;
export function compose(
  ...fns: ReadonlyArray<(value: unknown) => unknown>
): (value: unknown) => unknown {
  if (fns.some((fn) => typeof fn !== 'function')) {
    throw new TypeError('fns must be functions.');
  }

  if (fns.length === 0) {
    return identity;
  }

  return (value: unknown): unknown => fns.reduceRight((result, fn) => fn(result), value);
}
