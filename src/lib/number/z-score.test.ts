import assert from 'node:assert';
import { describe, it } from 'node:test';
import { zScore } from './z-score';

describe('zScore', () => {
  it('computes z-score values', () => {
    assert.equal(zScore(12, 10, 2), 1);
    assert.equal(zScore(8, 10, 2), -1);
  });

  it('throws for invalid inputs', () => {
    assert.throws(() => zScore(Number.NaN, 0, 1), RangeError, 'value must be a finite number.');
    assert.throws(() => zScore(1, Number.NaN, 1), RangeError, 'meanValue must be a finite number.');
    assert.throws(
      () => zScore(1, 0, 0),
      RangeError,
      'standardDeviationValue must be a positive finite number.',
    );
  });
});
