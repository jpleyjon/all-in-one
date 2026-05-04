import { generateCity } from './generate-city';
import { generatePostalCode } from './generate-postal-code';
import { generateStateCode } from './generate-state-code';
import { generateStreetAddress } from './generate-street-address';
import type { GenerateAddressOptions, GeneratedAddress } from './types';

/**
 * Generates a US-style address object.
 *
 * @param options Optional generator settings.
 * @returns Generated address fields.
 */
export function generateAddress(options: GenerateAddressOptions = {}): GeneratedAddress {
  return {
    streetAddress: generateStreetAddress(options),
    city: generateCity(options),
    stateCode: generateStateCode(options),
    postalCode: generatePostalCode(options),
  };
}
