import type { Falsy } from './types';

/**
 * Removes falsy values from an array.
 *
 * @param input Source array.
 * @returns A new array without falsy values.
 */
export function compact<T>(input: readonly T[]): Exclude<T, Falsy>[] {
  return input.filter((item): item is Exclude<T, Falsy> => Boolean(item));
}
