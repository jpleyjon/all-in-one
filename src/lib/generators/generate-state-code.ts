import { STATE_CODES } from './data/state-codes';
import { randomPick } from './shared/random-pick';
import type { GeneratorOptions } from './types';

/**
 * Generates a US state code.
 *
 * @param options Optional generator settings.
 * @returns Two-letter state code.
 */
export function generateStateCode(options: GeneratorOptions = {}): string {
  return randomPick(STATE_CODES, options.random);
}
