import assert from 'node:assert';
import { describe, it } from 'node:test';
import { clampCents } from './clamp-cents';

describe('clampCents', () => {
  it('clamps values to bounds', () => {
    assert.equal(clampCents(50, 100, 200), 100);
    assert.equal(clampCents(250, 100, 200), 200);
    assert.equal(clampCents(150, 100, 200), 150);
  });

  it('throws for invalid input values', () => {
    assert.throws(() => clampCents(0.5, 0, 1), RangeError, 'cents must be a safe integer.');
    assert.throws(() => clampCents(0, 0.5, 1), RangeError, 'min must be a safe integer.');
    assert.throws(() => clampCents(0, 0, 1.5), RangeError, 'max must be a safe integer.');
  });

  it('throws when min is greater than max', () => {
    assert.throws(
      () => clampCents(100, 200, 100),
      RangeError,
      'min must be less than or equal to max.',
    );
  });
});
