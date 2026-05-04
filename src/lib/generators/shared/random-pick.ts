import { randomInt } from '../../number/random-int';
import { assertRandomSource } from './assert-random-source';
import type { RandomSource } from './types';

/**
 * Picks a random item from a non-empty array.
 *
 * @param values Candidate values.
 * @param random Random source returning values in `[0, 1)`.
 * @returns Random item from `values`.
 * @throws {RangeError} If `values` is empty.
 */
export function randomPick<T>(values: readonly T[], random: RandomSource = Math.random): T {
  if (!Array.isArray(values) || values.length === 0) {
    throw new RangeError('values must be a non-empty array.');
  }

  assertRandomSource(random);

  return values[randomInt(0, values.length - 1, random)];
}
