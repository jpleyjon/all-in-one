import { describe, it } from 'node:test';
import assert from 'node:assert';
import { groupBy } from './group-by';

describe('groupBy', () => {
  it('should group items by selector key', () => {
    const output = groupBy(['one', 'two', 'three', 'six'], (item) => item.length);

    assert.deepEqual(output, {
      3: ['one', 'two', 'six'],
      5: ['three'],
    });
  });

  it('should return an empty object for empty input', () => {
    assert.deepEqual(
      groupBy([], (value) => value),
      {},
    );
  });
});
