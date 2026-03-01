import assert from 'node:assert';
import { describe, it } from 'node:test';
import { randomFloat } from './random-float';

describe('randomFloat', () => {
  it('returns deterministic values with custom random source', () => {
    assert.equal(
      randomFloat(10, 20, () => 0),
      10,
    );
    assert.equal(
      randomFloat(10, 20, () => 0.5),
      15,
    );
  });

  it('throws for invalid inputs', () => {
    assert.throws(() => randomFloat(Number.NaN, 2), RangeError, 'min must be a finite number.');
    assert.throws(() => randomFloat(1, Number.NaN), RangeError, 'max must be a finite number.');
    assert.throws(() => randomFloat(2, 1), RangeError, 'min must be less than or equal to max.');
    assert.throws(() => randomFloat(1, 2, 1 as never), TypeError, 'random must be a function.');
    assert.throws(
      () => randomFloat(1, 2, () => -1),
      RangeError,
      'random() must return a finite number in [0, 1).',
    );
    assert.throws(
      () => randomFloat(1, 2, () => 1),
      RangeError,
      'random() must return a finite number in [0, 1).',
    );
    assert.throws(
      () => randomFloat(1, 2, () => Number.NaN),
      RangeError,
      'random() must return a finite number in [0, 1).',
    );
  });
});
