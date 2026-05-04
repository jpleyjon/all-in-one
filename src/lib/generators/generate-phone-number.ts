import { randomInt } from '../number/random-int';
import { randomDigitString } from './shared/random-digit-string';
import type { GeneratePhoneNumberOptions } from './types';

/**
 * Generates a US-style phone number.
 *
 * @param options Optional generator settings.
 * @returns Phone number in the requested format.
 */
export function generatePhoneNumber(options: GeneratePhoneNumberOptions = {}): string {
  const areaCode = `${randomInt(2, 9, options.random)}${randomDigitString(2, options.random)}`;
  const exchange = `${randomInt(2, 9, options.random)}${randomDigitString(2, options.random)}`;
  const lineNumber = randomDigitString(4, options.random);

  if (options.format === 'digits') {
    return `${areaCode}${exchange}${lineNumber}`;
  }

  return `(${areaCode}) ${exchange}-${lineNumber}`;
}
