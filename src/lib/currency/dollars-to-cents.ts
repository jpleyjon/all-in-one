export type MoneyInput = number | string;

/**
 * Converts a decimal dollar amount to integer cents using exact decimal parsing.
 *
 * @param amount Dollar amount as number or decimal string.
 * @returns Amount in cents.
 * @throws {RangeError} If amount is invalid or out of safe integer range.
 */
export function dollarsToCents(amount: MoneyInput): number {
  if (typeof amount === 'number' && !Number.isFinite(amount)) {
    throw new RangeError('amount must be a finite number.');
  }

  const raw = String(amount).trim();
  if (raw.length === 0) {
    throw new RangeError('amount must be a valid decimal number.');
  }

  const sign = raw.startsWith('-') ? -1 : 1;
  const unsigned = raw.replace(/^[-+]/, '');
  const decimalPattern = /^(\d+)(?:\.(\d+))?$|^\.(\d+)$/;
  const match = decimalPattern.exec(unsigned);

  if (match === null) {
    throw new RangeError('amount must be a valid decimal number.');
  }

  const wholePart = match[1] ?? '0';
  const fractionalPart = match[2] ?? match[3] ?? '';

  if (fractionalPart.length > 2) {
    throw new RangeError('amount must have at most 2 decimal places.');
  }

  const paddedFraction = fractionalPart.padEnd(2, '0');
  const wholeNumber = Number(wholePart);
  if (!Number.isSafeInteger(wholeNumber)) {
    throw new RangeError('amount is out of safe integer range.');
  }

  const cents = wholeNumber * 100 + Number(paddedFraction);
  if (!Number.isSafeInteger(cents)) {
    throw new RangeError('amount is out of safe integer range.');
  }

  return sign * cents;
}
