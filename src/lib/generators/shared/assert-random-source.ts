import type { RandomSource } from './types';

/**
 * Validates a random source function.
 *
 * @param random Random source to validate.
 * @returns Random source when valid.
 * @throws {TypeError} If `random` is not a function.
 */
export function assertRandomSource(random: RandomSource): RandomSource {
  if (typeof random !== 'function') {
    throw new TypeError('random must be a function.');
  }

  return random;
}
