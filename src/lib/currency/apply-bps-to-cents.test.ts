import assert from 'node:assert';
import { describe, it } from 'node:test';
import { applyBpsToCents } from './apply-bps-to-cents';

describe('applyBpsToCents', () => {
  it('applies basis points to cents', () => {
    assert.equal(applyBpsToCents(1000, 250), 1025);
    assert.equal(applyBpsToCents(1000, -500), 950);
  });

  it('supports custom rounding mode', () => {
    assert.equal(applyBpsToCents(1, 15000, 'half-even'), 2);
  });

  it('throws for invalid inputs', () => {
    assert.throws(
      () => applyBpsToCents(100, Number.POSITIVE_INFINITY),
      RangeError,
      'bps must be a finite number.',
    );
    assert.throws(() => applyBpsToCents(1.5, 250), RangeError, 'cents must be a safe integer.');
  });
});
