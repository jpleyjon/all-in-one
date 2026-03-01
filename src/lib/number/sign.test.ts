import assert from 'node:assert';
import { describe, it } from 'node:test';
import { sign } from './sign';

describe('sign', () => {
  it('returns number signs', () => {
    assert.equal(sign(-2), -1);
    assert.equal(sign(0), 0);
    assert.equal(sign(2), 1);
  });

  it('throws for invalid inputs', () => {
    assert.throws(() => sign(Number.NaN), RangeError, 'value must be a finite number.');
  });
});
