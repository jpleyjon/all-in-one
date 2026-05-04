import { randomInt } from '../../number/random-int';
import { assertRandomSource } from './assert-random-source';
import type { RandomSource } from './types';

const ALPHA_CHARACTERS = 'abcdefghijklmnopqrstuvwxyz';

/**
 * Generates a random lowercase alphabetic string with a fixed length.
 *
 * @param length Desired output length.
 * @param random Random source returning values in `[0, 1)`.
 * @returns Alphabetic string of the requested length.
 * @throws {RangeError} If `length` is invalid.
 */
export function randomAlphaString(length: number, random: RandomSource = Math.random): string {
  if (!Number.isInteger(length) || length < 0) {
    throw new RangeError('length must be a non-negative integer.');
  }

  assertRandomSource(random);

  let value = '';

  for (let index = 0; index < length; index += 1) {
    value += ALPHA_CHARACTERS[randomInt(0, ALPHA_CHARACTERS.length - 1, random)];
  }

  return value;
}
