import { randomDigitString } from './shared/random-digit-string';
import type { GenerateBankAccountNumberOptions } from './types';

/**
 * Generates a numeric bank account number string.
 *
 * @param options Optional generator settings.
 * @returns Numeric account number.
 * @throws {RangeError} If `length` is invalid.
 */
export function generateBankAccountNumber(options: GenerateBankAccountNumberOptions = {}): string {
  const length = options.length ?? 12;

  if (!Number.isInteger(length) || length <= 0) {
    throw new RangeError('length must be a positive integer.');
  }

  return randomDigitString(length, options.random);
}
