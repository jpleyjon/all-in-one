import { randomDigitString } from './shared/random-digit-string';
import type { GeneratorOptions } from './types';

/**
 * Generates a US Social Security number string.
 *
 * @param options Optional generator settings.
 * @returns SSN formatted as `XXX-XX-XXXX`.
 */
export function generateSSN(options: GeneratorOptions = {}): string {
  let area = '000';

  while (area === '000' || area === '666' || area.startsWith('9')) {
    area = randomDigitString(3, options.random);
  }

  let group = '00';

  while (group === '00') {
    group = randomDigitString(2, options.random);
  }

  let serial = '0000';

  while (serial === '0000') {
    serial = randomDigitString(4, options.random);
  }

  return `${area}-${group}-${serial}`;
}
