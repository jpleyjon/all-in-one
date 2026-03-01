import assert from 'node:assert';
import { describe, it } from 'node:test';
import { mapRange } from './map-range';

describe('mapRange', () => {
  it('maps values between ranges', () => {
    assert.equal(mapRange(5, 0, 10, 0, 100), 50);
    assert.equal(mapRange(5, 0, 10, 100, 0), 50);
  });

  it('supports clamped outputs', () => {
    assert.equal(mapRange(20, 0, 10, 0, 100, true), 100);
    assert.equal(mapRange(20, 0, 10, 100, 0, true), 0);
  });

  it('throws for invalid inputs', () => {
    assert.throws(
      () => mapRange(Number.NaN, 0, 1, 0, 1),
      RangeError,
      'value must be a finite number.',
    );
    assert.throws(
      () => mapRange(1, Number.NaN, 1, 0, 1),
      RangeError,
      'inMin must be a finite number.',
    );
    assert.throws(
      () => mapRange(1, 0, Number.NaN, 0, 1),
      RangeError,
      'inMax must be a finite number.',
    );
    assert.throws(
      () => mapRange(1, 0, 1, Number.NaN, 1),
      RangeError,
      'outMin must be a finite number.',
    );
    assert.throws(
      () => mapRange(1, 0, 1, 0, Number.NaN),
      RangeError,
      'outMax must be a finite number.',
    );
    assert.throws(() => mapRange(1, 1, 1, 0, 1), RangeError, 'inMin and inMax must be different.');
    assert.throws(
      () => mapRange(1, 0, 1, 0, 1, 'yes' as never),
      TypeError,
      'clampOutput must be a boolean.',
    );
  });
});
