import { describe, it } from 'node:test';
import assert from 'node:assert';
import { sample } from './sample';

describe('sample', () => {
  it('should pick a deterministic item when custom random is provided', () => {
    assert.equal(sample(['a', 'b', 'c'], () => 0.4), 'b');
  });

  it('should return undefined for empty arrays', () => {
    assert.equal(sample([], () => 0.5), undefined);
  });
});
