import { FIRST_NAMES } from './data/first-names';
import { randomPick } from './shared/random-pick';
import type { GeneratorOptions } from './types';

/**
 * Generates a first name.
 *
 * @param options Optional generator settings.
 * @returns Random first name.
 */
export function generateFirstName(options: GeneratorOptions = {}): string {
  return randomPick(FIRST_NAMES, options.random);
}
