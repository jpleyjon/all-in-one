import assert from 'node:assert';
import { describe, it } from 'node:test';
import { omit } from './omit';

describe('omit', () => {
  it('excludes selected keys', () => {
    const input = { id: 1, name: 'Ada', active: true };
    assert.deepEqual(omit(input, ['active']), { id: 1, name: 'Ada' });
  });

  it('returns shallow copy when no keys are excluded', () => {
    const input = { id: 1 };
    const result = omit(input, []);

    assert.deepEqual(result, input);
    assert.notEqual(result, input);
  });

  it('throws for invalid input', () => {
    assert.throws(
      () => omit(null as never, ['id' as never]),
      TypeError,
      'input must be a plain object.',
    );
  });
});
