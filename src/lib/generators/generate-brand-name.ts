import { BRAND_WORDS } from './data/brand-words';
import { randomBool } from './shared/random-bool';
import { randomPick } from './shared/random-pick';
import type { GeneratorOptions } from './types';

/**
 * Generates a short brand-style name.
 *
 * @param options Optional generator settings.
 * @returns Random brand name.
 */
export function generateBrandName(options: GeneratorOptions = {}): string {
  const firstWord = randomPick(BRAND_WORDS, options.random);

  if (!randomBool(0.5, options.random)) {
    return firstWord;
  }

  return `${firstWord} ${randomPick(BRAND_WORDS, options.random)}`;
}
