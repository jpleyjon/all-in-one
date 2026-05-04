import { assertRandomSource } from './assert-random-source';
import type { RandomSource } from './types';
import type { WeightedValue } from '../types';

/**
 * Picks a value using weighted probabilities.
 *
 * @param values Weighted candidate values.
 * @param random Random source returning values in `[0, 1)`.
 * @returns Selected value.
 * @throws {RangeError} If the input weights are invalid.
 */
export function randomWeightedPick<T>(
  values: readonly WeightedValue<T>[],
  random: RandomSource = Math.random,
): T {
  if (!Array.isArray(values) || values.length === 0) {
    throw new RangeError('values must be a non-empty array.');
  }

  assertRandomSource(random);

  let totalWeight = 0;

  for (const entry of values) {
    if (!Number.isFinite(entry.weight) || entry.weight <= 0) {
      throw new RangeError('weight must be a finite number greater than 0.');
    }

    totalWeight += entry.weight;
  }

  let threshold = random() * totalWeight;

  for (const entry of values) {
    threshold -= entry.weight;

    if (threshold < 0) {
      return entry.value;
    }
  }

  return values[values.length - 1].value;
}
