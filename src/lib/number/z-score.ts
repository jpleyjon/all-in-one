/**
 * Computes z-score relative to a mean and standard deviation.
 *
 * @param value Value to normalize.
 * @param meanValue Mean baseline.
 * @param standardDeviationValue Standard deviation baseline.
 * @returns Z-score value.
 * @throws {RangeError} If inputs are invalid.
 */
export function zScore(value: number, meanValue: number, standardDeviationValue: number): number {
  if (!Number.isFinite(value)) {
    throw new RangeError('value must be a finite number.');
  }

  if (!Number.isFinite(meanValue)) {
    throw new RangeError('meanValue must be a finite number.');
  }

  if (!Number.isFinite(standardDeviationValue) || standardDeviationValue <= 0) {
    throw new RangeError('standardDeviationValue must be a positive finite number.');
  }

  return (value - meanValue) / standardDeviationValue;
}
