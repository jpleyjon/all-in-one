import { randomInt } from '../number/random-int';
import { STREET_NAMES } from './data/street-names';
import { STREET_TYPES } from './data/street-types';
import { randomPick } from './shared/random-pick';
import type { GeneratorOptions } from './types';

/**
 * Generates a street address line.
 *
 * @param options Optional generator settings.
 * @returns US-style street address.
 */
export function generateStreetAddress(options: GeneratorOptions = {}): string {
  const streetNumber = randomInt(100, 9999, options.random);
  const streetName = randomPick(STREET_NAMES, options.random);
  const streetType = randomPick(STREET_TYPES, options.random);

  return `${streetNumber} ${streetName} ${streetType}`;
}
