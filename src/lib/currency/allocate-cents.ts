/**
 * Splits integer cents into near-equal integer parts while preserving total.
 *
 * @param cents Total amount in cents.
 * @param parts Number of parts.
 * @returns Array of allocated cent amounts.
 * @throws {RangeError} If inputs are invalid.
 */
export function allocateCents(cents: number, parts: number): number[] {
  if (!Number.isSafeInteger(cents)) {
    throw new RangeError('cents must be a safe integer.');
  }

  if (!Number.isInteger(parts) || parts <= 0) {
    throw new RangeError('parts must be a positive integer.');
  }

  const baseShare = Math.trunc(cents / parts);
  const remainder = cents - baseShare * parts;
  const output = new Array<number>(parts).fill(baseShare);
  const delta = remainder >= 0 ? 1 : -1;

  for (let index = 0; index < Math.abs(remainder); index += 1) {
    output[index] += delta;
  }

  return output;
}
