import assert from 'node:assert';
import { describe, it } from 'node:test';
import { mergeWith } from './merge-with';

describe('mergeWith', () => {
  it('merges objects and resolves conflicts with resolver', () => {
    const result = mergeWith(
      (currentValue, incomingValue, key) => {
        if (key === 'count') {
          return (currentValue as number) + (incomingValue as number);
        }

        return incomingValue;
      },
      { count: 1, label: 'first' },
      { count: 2, label: 'second', active: true },
    );

    assert.deepEqual(result, { count: 3, label: 'second', active: true });
  });

  it('clones incoming values for non-conflict keys', () => {
    const source = { tags: ['a', 'b'] };
    const result = mergeWith((current, incoming) => current ?? incoming, {}, source);

    assert.deepEqual(result, source);
    assert.notEqual(result.tags, source.tags);
  });

  it('throws for invalid resolver and inputs', () => {
    assert.throws(
      () => mergeWith(null as never, { a: 1 }),
      TypeError,
      'resolver must be a function.',
    );
    assert.throws(
      () => mergeWith((current, incoming) => incoming, { a: 1 }, [] as never),
      TypeError,
      'inputs[1] must be a plain object.',
    );
  });
});
