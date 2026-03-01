import assert from 'node:assert';
import { describe, it } from 'node:test';
import { omitBy } from './omit-by';

describe('omitBy', () => {
  it('omits entries by predicate', () => {
    const result = omitBy({ a: 1, b: 2, c: 3 }, (value) => value > 1);
    assert.deepEqual(result, { a: 1 });
  });

  it('throws for invalid input', () => {
    assert.throws(
      () => omitBy(null as never, () => true),
      TypeError,
      'input must be a plain object.',
    );
  });
});
