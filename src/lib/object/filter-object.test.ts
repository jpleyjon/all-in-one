import assert from 'node:assert';
import { describe, it } from 'node:test';
import { filterObject } from './filter-object';

describe('filterObject', () => {
  it('filters entries by predicate', () => {
    const input = { a: 1, b: 2, c: 3 };
    const result = filterObject(input, (value) => value % 2 === 1);

    assert.deepEqual(result, { a: 1, c: 3 });
  });

  it('throws for invalid input', () => {
    assert.throws(
      () => filterObject(1 as never, () => true),
      TypeError,
      'input must be a plain object.',
    );
  });
});
