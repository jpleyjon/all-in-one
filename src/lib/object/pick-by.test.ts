import assert from 'node:assert';
import { describe, it } from 'node:test';
import { pickBy } from './pick-by';

describe('pickBy', () => {
  it('picks entries by predicate', () => {
    const result = pickBy({ a: 1, b: 2, c: 3 }, (value) => value > 1);
    assert.deepEqual(result, { b: 2, c: 3 });
  });

  it('throws for invalid input', () => {
    assert.throws(
      () => pickBy(null as never, () => true),
      TypeError,
      'input must be a plain object.',
    );
  });
});
