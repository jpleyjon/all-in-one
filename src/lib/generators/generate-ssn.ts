import { randomDigitString } from './shared/random-digit-string';
import type { GeneratorOptions } from './types';

const MAX_ATTEMPTS = 100;

function pickValidPart(
  generator: () => string,
  isValid: (value: string) => boolean,
  message: string,
): string {
  for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt += 1) {
    const value = generator();

    if (isValid(value)) {
      return value;
    }
  }

  throw new Error(message);
}

/**
 * Generates a US Social Security number string.
 *
 * @param options Optional generator settings.
 * @returns SSN formatted as `XXX-XX-XXXX`.
 */
export function generateSSN(options: GeneratorOptions = {}): string {
  const area = pickValidPart(
    () => randomDigitString(3, options.random),
    (value) => value !== '000' && value !== '666' && !value.startsWith('9'),
    'unable to generate a valid SSN area within maxAttempts.',
  );

  const group = pickValidPart(
    () => randomDigitString(2, options.random),
    (value) => value !== '00',
    'unable to generate a valid SSN group within maxAttempts.',
  );

  const serial = pickValidPart(
    () => randomDigitString(4, options.random),
    (value) => value !== '0000',
    'unable to generate a valid SSN serial within maxAttempts.',
  );

  return `${area}-${group}-${serial}`;
}
