/**
 * Splits cents using weights while preserving total.
 *
 * @param cents Total amount in cents.
 * @param weights Allocation weights.
 * @returns Allocated cent parts.
 * @throws {RangeError} If inputs are invalid.
 */
export function weightedAllocateCents(cents: number, weights: readonly number[]): number[] {
  if (!Number.isSafeInteger(cents)) {
    throw new RangeError('cents must be a safe integer.');
  }

  if (weights.length === 0) {
    throw new RangeError('weights must contain at least one value.');
  }

  let totalWeight = 0;

  weights.forEach((weight, index) => {
    if (!Number.isFinite(weight) || weight < 0) {
      throw new RangeError(`weights[${index}] must be a non-negative finite number.`);
    }

    totalWeight += weight;
  });

  if (totalWeight === 0) {
    throw new RangeError('weights must contain at least one value greater than 0.');
  }

  if (cents === 0) {
    return new Array<number>(weights.length).fill(0);
  }

  const sign = cents < 0 ? -1 : 1;
  const absoluteCents = Math.abs(cents);

  const baseParts = new Array<number>(weights.length).fill(0);
  const fractions = new Array<{ index: number; fraction: number }>(weights.length);

  let allocated = 0;

  for (let index = 0; index < weights.length; index += 1) {
    const exact = (absoluteCents * weights[index]) / totalWeight;
    const base = Math.floor(exact);

    baseParts[index] = base;
    allocated += base;

    fractions[index] = {
      index,
      fraction: exact - base,
    };
  }

  const remainder = absoluteCents - allocated;

  fractions.sort((left, right) => {
    if (right.fraction === left.fraction) {
      return left.index - right.index;
    }

    return right.fraction - left.fraction;
  });

  for (let index = 0; index < remainder; index += 1) {
    const fraction = fractions[index];
    baseParts[fraction.index] += 1;
  }

  return baseParts.map((value) => value * sign);
}
