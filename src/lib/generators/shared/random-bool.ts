import { assertRandomSource } from './assert-random-source';
import type { RandomSource } from './types';

/**
 * Generates a random boolean with the provided true probability.
 *
 * @param trueProbability Probability of returning `true`.
 * @param random Random source returning values in `[0, 1)`.
 * @returns Random boolean.
 * @throws {RangeError} If `trueProbability` is outside `[0, 1]`.
 */
export function randomBool(trueProbability = 0.5, random: RandomSource = Math.random): boolean {
  if (!Number.isFinite(trueProbability) || trueProbability < 0 || trueProbability > 1) {
    throw new RangeError('trueProbability must be a finite number between 0 and 1.');
  }

  assertRandomSource(random);

  return random() < trueProbability;
}
