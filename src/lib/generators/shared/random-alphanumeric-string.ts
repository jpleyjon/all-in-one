import { randomBool } from './random-bool';
import { randomAlphaString } from './random-alpha-string';
import { randomDigitString } from './random-digit-string';
import { assertRandomSource } from './assert-random-source';
import type { RandomSource } from './types';

/**
 * Generates a random lowercase alphanumeric string with a fixed length.
 *
 * @param length Desired output length.
 * @param random Random source returning values in `[0, 1)`.
 * @returns Alphanumeric string of the requested length.
 * @throws {RangeError} If `length` is invalid.
 */
export function randomAlphanumericString(
  length: number,
  random: RandomSource = Math.random,
): string {
  if (!Number.isInteger(length) || length < 0) {
    throw new RangeError('length must be a non-negative integer.');
  }

  assertRandomSource(random);

  let value = '';

  for (let index = 0; index < length; index += 1) {
    value += randomBool(0.5, random) ? randomAlphaString(1, random) : randomDigitString(1, random);
  }

  return value;
}
