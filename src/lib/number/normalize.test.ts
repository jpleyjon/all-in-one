import assert from 'node:assert';
import { describe, it } from 'node:test';
import { normalize } from './normalize';

describe('normalize', () => {
  it('normalizes values', () => {
    assert.equal(normalize(5, 0, 10), 0.5);
    assert.equal(normalize(20, 10, 30), 0.5);
  });

  it('throws for invalid inputs', () => {
    assert.throws(() => normalize(Number.NaN, 0, 1), RangeError, 'value must be a finite number.');
    assert.throws(() => normalize(1, Number.NaN, 1), RangeError, 'min must be a finite number.');
    assert.throws(() => normalize(1, 0, Number.NaN), RangeError, 'max must be a finite number.');
    assert.throws(() => normalize(1, 1, 1), RangeError, 'min and max must be different.');
  });
});
