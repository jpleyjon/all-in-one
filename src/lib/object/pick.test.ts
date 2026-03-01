import assert from 'node:assert';
import { describe, it } from 'node:test';
import { pick } from './pick';

describe('pick', () => {
  it('returns only selected keys', () => {
    const input = { id: 1, name: 'Ada', active: true };
    assert.deepEqual(pick(input, ['id', 'active']), { id: 1, active: true });
  });

  it('ignores missing keys', () => {
    const input = { id: 1 };
    assert.deepEqual(pick(input, ['id', 'name' as never]), { id: 1 });
  });

  it('throws for invalid input', () => {
    assert.throws(
      () => pick(null as never, ['id' as never]),
      TypeError,
      'input must be a plain object.',
    );
  });
});
