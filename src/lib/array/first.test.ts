import { describe, it } from 'node:test';
import assert from 'node:assert';
import { first } from './first';

describe('first', () => {
  it('should return the first element', () => {
    assert.equal(first([10, 20, 30]), 10);
  });

  it('should return undefined for empty arrays', () => {
    assert.equal(first([]), undefined);
  });
});
