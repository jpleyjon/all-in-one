import assert from 'node:assert';
import { describe, it } from 'node:test';
import { multiplyCents } from './multiply-cents';

describe('multiplyCents', () => {
  it('multiplies with half-up rounding by default', () => {
    assert.equal(multiplyCents(105, 1.1), 116);
    assert.equal(multiplyCents(-105, 1.1), -116);
  });

  it('supports half-even rounding', () => {
    assert.equal(multiplyCents(1, 2.5, 'half-even'), 2);
    assert.equal(multiplyCents(3, 0.5, 'half-even'), 2);
    assert.equal(multiplyCents(1, 2.4, 'half-even'), 2);
    assert.equal(multiplyCents(1, 2.6, 'half-even'), 3);
    assert.equal(multiplyCents(-1, 2.4, 'half-even'), -2);
  });

  it('supports down and up rounding', () => {
    assert.equal(multiplyCents(101, 1.01, 'down'), 102);
    assert.equal(multiplyCents(101, 1.01, 'up'), 103);
    assert.equal(multiplyCents(-101, 1.01, 'down'), -103);
    assert.equal(multiplyCents(-101, 1.01, 'up'), -102);
  });

  it('throws for invalid inputs', () => {
    assert.throws(() => multiplyCents(1.5, 2), RangeError, 'cents must be a safe integer.');
    assert.throws(
      () => multiplyCents(100, Number.POSITIVE_INFINITY),
      RangeError,
      'factor must be a finite number.',
    );
    assert.throws(
      () => multiplyCents(100, 1, 'invalid' as never),
      RangeError,
      "mode must be one of: 'half-up', 'half-even', 'down', 'up'.",
    );
  });

  it('throws for numeric overflow conditions', () => {
    assert.throws(
      () => multiplyCents(Number.MAX_SAFE_INTEGER, 1e308),
      RangeError,
      'result is out of numeric range.',
    );

    assert.throws(
      () => multiplyCents(Number.MAX_SAFE_INTEGER, 1.1),
      RangeError,
      'result is out of safe integer range.',
    );
  });
});
