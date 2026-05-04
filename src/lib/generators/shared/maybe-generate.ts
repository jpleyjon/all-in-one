import { assertRandomSource } from './assert-random-source';
import type { RandomSource } from './types';

/**
 * Returns a generated value or `null` based on a probability threshold.
 *
 * @param generator Value factory.
 * @param probability Probability of generating a value.
 * @param random Random source returning values in `[0, 1)`.
 * @returns Generated value or `null`.
 */
export function maybeGenerate<T>(
  generator: () => T,
  probability = 0.5,
  random: RandomSource = Math.random,
): T | null {
  if (typeof generator !== 'function') {
    throw new TypeError('generator must be a function.');
  }

  if (!Number.isFinite(probability) || probability < 0 || probability > 1) {
    throw new RangeError('probability must be a finite number between 0 and 1.');
  }

  assertRandomSource(random);

  return random() < probability ? generator() : null;
}
