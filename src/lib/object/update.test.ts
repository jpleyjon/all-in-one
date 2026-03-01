import assert from 'node:assert';
import { describe, it } from 'node:test';
import { update } from './update';

describe('update', () => {
  it('updates nested values using updater callback', () => {
    const input = { score: { value: 10 } };
    const output = update(input, 'score.value', (current) => (current as number) + 5);

    assert.deepEqual(output, { score: { value: 15 } });
    assert.deepEqual(input, { score: { value: 10 } });
  });

  it('updates missing values', () => {
    const output = update({ user: {} }, 'user.age', (current) => ((current ?? 0) as number) + 1);
    assert.deepEqual(output, { user: { age: 1 } });
  });

  it('throws for invalid updater and input', () => {
    assert.throws(
      () => update({ a: 1 }, 'a', 'x' as never),
      TypeError,
      'updater must be a function.',
    );
    assert.throws(
      () => update(null as never, 'a', (value) => value),
      TypeError,
      'input must be a non-null object.',
    );
  });
});
