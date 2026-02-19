import { describe, it } from 'node:test';
import assert from 'node:assert';
import { uniqueBy } from './unique-by';

describe('uniqueBy', () => {
  it('should remove duplicates by key and keep first item', () => {
    const input = [
      { id: 1, name: 'a' },
      { id: 2, name: 'b' },
      { id: 1, name: 'c' },
    ];

    assert.deepEqual(
      uniqueBy(input, (item) => item.id),
      [
        { id: 1, name: 'a' },
        { id: 2, name: 'b' },
      ],
    );
  });

  it('should expose index and source to selector', () => {
    const input = ['a', 'b', 'c'];
    assert.deepEqual(
      uniqueBy(input, (_item, index, source) => `${source.length}-${index % 2}`),
      ['a', 'b'],
    );
  });
});
