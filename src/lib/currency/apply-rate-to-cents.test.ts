import assert from 'node:assert';
import { describe, it } from 'node:test';
import { applyRateToCents } from './apply-rate-to-cents';

describe('applyRateToCents', () => {
  it('applies positive and negative rates', () => {
    assert.equal(applyRateToCents(1000, 0.0825), 1083);
    assert.equal(applyRateToCents(1000, -0.15), 850);
  });

  it('supports custom rounding mode', () => {
    assert.equal(applyRateToCents(101, 0.01, 'down'), 102);
    assert.equal(applyRateToCents(101, 0.01, 'up'), 103);
  });

  it('throws for invalid rate', () => {
    assert.throws(
      () => applyRateToCents(100, Number.NaN),
      RangeError,
      'rate must be a finite number.',
    );
  });
});
