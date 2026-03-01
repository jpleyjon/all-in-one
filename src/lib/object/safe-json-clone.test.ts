import assert from 'node:assert';
import { describe, it } from 'node:test';
import { safeJsonClone } from './safe-json-clone';

describe('safeJsonClone', () => {
  it('clones JSON-serializable values', () => {
    const input = {
      id: 1,
      user: { name: 'Ada' },
      tags: ['math'],
    };

    const result = safeJsonClone(input);

    assert.deepEqual(result, input);
    assert.notEqual(result, input);
    assert.notEqual(result.user, input.user);
    assert.notEqual(result.tags, input.tags);
  });

  it('applies JSON serialization behavior', () => {
    const input = { createdAt: new Date('2024-01-01T00:00:00.000Z') };
    const result = safeJsonClone(input) as unknown as { createdAt: string };

    assert.equal(result.createdAt, '2024-01-01T00:00:00.000Z');
  });

  it('throws for non-serializable values', () => {
    const circular: { self?: unknown } = {};
    circular.self = circular;
    const throwingToJson = {
      toJSON(): never {
        throw new Error('boom');
      },
    };

    assert.throws(() => safeJsonClone(undefined), TypeError, 'input must be JSON-serializable.');
    assert.throws(() => safeJsonClone(circular), TypeError, 'input must be JSON-serializable.');
    assert.throws(
      () => safeJsonClone(throwingToJson),
      TypeError,
      'input must be JSON-serializable.',
    );
  });
});
