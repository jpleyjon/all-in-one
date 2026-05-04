import { randomDigitString } from './shared/random-digit-string';
import type { GeneratorOptions } from './types';

/**
 * Generates a US routing number that satisfies the ABA checksum.
 *
 * @param options Optional generator settings.
 * @returns Nine-digit routing number.
 */
export function generateRoutingNumber(options: GeneratorOptions = {}): string {
  const base = randomDigitString(8, options.random).split('').map(Number);
  const checksum =
    (10 -
      ((3 * (base[0] + base[3] + base[6]) +
        7 * (base[1] + base[4] + base[7]) +
        (base[2] + base[5])) %
        10)) %
    10;

  return `${base.join('')}${checksum}`;
}
