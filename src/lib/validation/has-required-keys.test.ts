import assert from 'node:assert';
import { describe, it } from 'node:test';
import { hasRequiredKeys } from './has-required-keys';

describe('hasRequiredKeys', () => {
  it('checks required own keys', () => {
    assert.equal(hasRequiredKeys({ a: 1, b: 2 }, ['a']), true);
    assert.equal(hasRequiredKeys({ a: 1 }, ['a', 'b']), false);
    assert.equal(hasRequiredKeys(null, ['a']), false);
    assert.equal(hasRequiredKeys({}, []), true);
  });

  it('does not count prototype keys', () => {
    const proto = { a: 1 };
    const input = Object.create(proto) as Record<string, unknown>;
    assert.equal(hasRequiredKeys(input, ['a']), false);
  });

  it('throws for invalid key lists', () => {
    assert.throws(
      () => hasRequiredKeys({}, 'a' as never),
      TypeError,
      'keys must be an array of non-empty strings.',
    );
    assert.throws(
      () => hasRequiredKeys({}, ['a', '']),
      TypeError,
      'keys must be an array of non-empty strings.',
    );
  });
});
