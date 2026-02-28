import assert from 'node:assert';
import { describe, it } from 'node:test';
import { centsToDollarsString } from './cents-to-dollars-string';

describe('centsToDollarsString', () => {
  it('converts cents to exact fixed-point dollar strings', () => {
    assert.equal(centsToDollarsString(1234), '12.34');
    assert.equal(centsToDollarsString(5), '0.05');
    assert.equal(centsToDollarsString(-5), '-0.05');
    assert.equal(centsToDollarsString(0), '0.00');
  });

  it('throws for non-safe integers', () => {
    assert.throws(() => centsToDollarsString(0.1), RangeError, 'cents must be a safe integer.');
  });
});
