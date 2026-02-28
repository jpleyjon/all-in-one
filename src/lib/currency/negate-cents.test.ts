import assert from 'node:assert';
import { describe, it } from 'node:test';
import { negateCents } from './negate-cents';

describe('negateCents', () => {
  it('negates cents', () => {
    assert.equal(negateCents(120), -120);
    assert.equal(negateCents(-120), 120);
    assert.equal(negateCents(0), 0);
  });

  it('throws for invalid inputs', () => {
    assert.throws(() => negateCents(1.5), RangeError, 'cents must be a safe integer.');
  });
});
