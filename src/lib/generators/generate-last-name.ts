import { LAST_NAMES } from './data/last-names';
import { randomPick } from './shared/random-pick';
import type { GeneratorOptions } from './types';

/**
 * Generates a last name.
 *
 * @param options Optional generator settings.
 * @returns Random last name.
 */
export function generateLastName(options: GeneratorOptions = {}): string {
  return randomPick(LAST_NAMES, options.random);
}
