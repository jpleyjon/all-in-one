import { describe, it } from 'node:test';
import assert from 'node:assert';
import { sum } from './sum';

describe('sum', () => {
  it('should sum all values', () => {
    assert.equal(sum([1, 2, 3, 4]), 10);
  });

  it('should return zero for empty arrays', () => {
    assert.equal(sum([]), 0);
  });
});
