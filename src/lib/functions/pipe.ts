import { identity } from './identity';

/**
 * Creates a function that composes functions from left to right.
 *
 * @param fns Functions to compose.
 * @returns A function that applies the first function to the input, then the next, etc.
 * @throws {TypeError} If any item in `fns` is not a function.
 */
export function pipe<T>(): (value: T) => T;
export function pipe<T, R>(fn: (value: T) => R): (value: T) => R;
export function pipe<A, B, C>(fn1: (value: A) => B, fn2: (value: B) => C): (value: A) => C;
export function pipe<A, B, C, D>(fn1: (value: A) => B, fn2: (value: B) => C, fn3: (value: C) => D): (value: A) => D;
export function pipe<A, B, C, D, E>(
  fn1: (value: A) => B,
  fn2: (value: B) => C,
  fn3: (value: C) => D,
  fn4: (value: D) => E,
): (value: A) => E;
export function pipe<A, B, C, D, E, F>(
  fn1: (value: A) => B,
  fn2: (value: B) => C,
  fn3: (value: C) => D,
  fn4: (value: D) => E,
  fn5: (value: E) => F,
): (value: A) => F;
export function pipe(...fns: ReadonlyArray<(value: unknown) => unknown>): (value: unknown) => unknown {
  if (fns.some((fn) => typeof fn !== 'function')) {
    throw new TypeError('fns must be functions.');
  }

  if (fns.length === 0) {
    return identity;
  }

  return (value: unknown): unknown => fns.reduce((result, fn) => fn(result), value);
}
