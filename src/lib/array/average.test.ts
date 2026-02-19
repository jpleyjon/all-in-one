import { describe, it } from 'node:test';
import assert from 'node:assert';
import { average } from './average';

describe('average', () => {
  it('should calculate the arithmetic mean', () => {
    assert.equal(average([2, 4, 6]), 4);
  });

  it('should return zero for empty arrays', () => {
    assert.equal(average([]), 0);
  });
});
