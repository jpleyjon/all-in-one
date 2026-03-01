/**
 * Checks whether a numeric string passes the Luhn checksum.
 *
 * @param value Value to validate.
 * @returns `true` when value passes Luhn validation.
 */
export function isLuhnNumber(value: unknown): value is string {
  if (typeof value !== 'string') {
    return false;
  }

  const normalized = value.replace(/[\s-]/g, '');

  if (!/^\d+$/.test(normalized)) {
    return false;
  }

  let sum = 0;
  let shouldDouble = false;

  for (let index = normalized.length - 1; index >= 0; index -= 1) {
    let digit = Number(normalized[index]);

    if (shouldDouble) {
      digit *= 2;

      if (digit > 9) {
        digit -= 9;
      }
    }

    sum += digit;
    shouldDouble = !shouldDouble;
  }

  return sum % 10 === 0;
}
