import assert from 'node:assert';
import { describe, it } from 'node:test';
import { randomInt } from './random-int';

describe('randomInt', () => {
  it('returns deterministic values with custom random source', () => {
    assert.equal(
      randomInt(1, 3, () => 0),
      1,
    );
    assert.equal(
      randomInt(1, 3, () => 0.9999),
      3,
    );
  });

  it('throws for invalid inputs', () => {
    assert.throws(() => randomInt(1.2, 2), RangeError, 'min must be an integer.');
    assert.throws(() => randomInt(1, 2.2), RangeError, 'max must be an integer.');
    assert.throws(() => randomInt(2, 1), RangeError, 'min must be less than or equal to max.');
    assert.throws(() => randomInt(1, 2, 1 as never), TypeError, 'random must be a function.');
    assert.throws(
      () => randomInt(1, 2, () => -1),
      RangeError,
      'random() must return a finite number in [0, 1).',
    );
    assert.throws(
      () => randomInt(1, 2, () => 1),
      RangeError,
      'random() must return a finite number in [0, 1).',
    );
    assert.throws(
      () => randomInt(1, 2, () => Number.NaN),
      RangeError,
      'random() must return a finite number in [0, 1).',
    );
  });
});
