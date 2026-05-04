import assert from 'node:assert';
import { describe, it } from 'node:test';

import { createUniqueGenerator } from './create-unique-generator';

describe('createUniqueGenerator', () => {
  it('returns unique values across calls', () => {
    let index = 0;
    const unique = createUniqueGenerator(() => ['a', 'b', 'c'][index++]);

    assert.equal(unique(), 'a');
    assert.equal(unique(), 'b');
    assert.equal(unique(), 'c');
  });

  it('throws when uniqueness is exhausted', () => {
    const unique = createUniqueGenerator(() => 'same', { maxAttempts: 2 });

    assert.equal(unique(), 'same');
    assert.throws(() => unique(), Error);
  });

  it('validates inputs', () => {
    assert.throws(() => createUniqueGenerator(null as never), TypeError);
    assert.throws(() => createUniqueGenerator(() => 'x', { maxAttempts: 0 }), RangeError);
  });
});
