import { describe, it } from 'node:test';
import assert from 'node:assert';
import { last } from './last';

describe('last', () => {
  it('should return the last element', () => {
    assert.equal(last([10, 20, 30]), 30);
  });

  it('should return undefined for empty arrays', () => {
    assert.equal(last([]), undefined);
  });
});
