import { randomDigitString } from './shared/random-digit-string';
import type { GeneratorOptions } from './types';

/**
 * Generates a US postal code.
 *
 * @param options Optional generator settings.
 * @returns Five-digit postal code.
 */
export function generatePostalCode(options: GeneratorOptions = {}): string {
  return randomDigitString(5, options.random);
}
