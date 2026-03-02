import assert from 'node:assert';
import { describe, it } from 'node:test';
import { splitPathWithDelimiter } from './split-path-with-delimiter';

describe('splitPathWithDelimiter', () => {
  it('splits delimited paths and normalizes numeric segments', () => {
    assert.deepEqual(splitPathWithDelimiter('items/0/name', '/'), ['items', 0, 'name']);
  });

  it('returns an empty array for an empty path', () => {
    assert.deepEqual(splitPathWithDelimiter('', '.'), []);
  });
});
