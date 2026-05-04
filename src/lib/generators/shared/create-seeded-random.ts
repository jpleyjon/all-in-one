import type { RandomSource } from './types';

function normalizeSeed(seed: number | string): number {
  const value = String(seed);
  let hash = 2166136261;

  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }

  return hash >>> 0;
}

/**
 * Creates a deterministic pseudo-random number generator.
 *
 * @param seed Seed value used to initialize the generator.
 * @returns Random source returning values in `[0, 1)`.
 */
export function createSeededRandom(seed: number | string): RandomSource {
  let state = normalizeSeed(seed);

  return (): number => {
    state = (state + 0x6d2b79f5) >>> 0;
    let value = state;

    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);

    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}
