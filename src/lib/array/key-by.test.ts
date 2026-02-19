import { describe, it } from 'node:test';
import assert from 'node:assert';
import { keyBy } from './key-by';

describe('keyBy', () => {
  it('should index values by selector key', () => {
    const input = [
      { id: 'u1', name: 'alpha' },
      { id: 'u2', name: 'beta' },
    ];

    assert.deepEqual(keyBy(input, (item) => item.id), {
      u1: { id: 'u1', name: 'alpha' },
      u2: { id: 'u2', name: 'beta' },
    });
  });

  it('should overwrite previous values for duplicate keys', () => {
    const input = [
      { id: 'u1', score: 1 },
      { id: 'u1', score: 2 },
    ];

    assert.deepEqual(keyBy(input, (item) => item.id), {
      u1: { id: 'u1', score: 2 },
    });
  });
});
