import { CITIES } from './data/cities';
import { randomPick } from './shared/random-pick';
import type { GeneratorOptions } from './types';

/**
 * Generates a city name.
 *
 * @param options Optional generator settings.
 * @returns Random city.
 */
export function generateCity(options: GeneratorOptions = {}): string {
  return randomPick(CITIES, options.random);
}
