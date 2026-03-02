import assert from 'node:assert';
import { describe, it } from 'node:test';
import { deepMergeValue } from './deep-merge-value';

describe('deepMergeValue', () => {
  it('deep merges plain objects recursively', () => {
    const left = { user: { name: 'Ada', age: 30 }, active: true };
    const right = { user: { age: 31 }, role: 'admin' };

    const output = deepMergeValue(left, right) as Record<string, unknown>;
    assert.deepEqual(output, { user: { name: 'Ada', age: 31 }, active: true, role: 'admin' });
    assert.deepEqual(left, { user: { name: 'Ada', age: 30 }, active: true });
  });

  it('replaces non-plain branches with cloned right value', () => {
    const date = new Date('2024-01-01T00:00:00.000Z');
    const output = deepMergeValue({ value: 1 }, date) as Date;

    assert.equal(output.getTime(), date.getTime());
    assert.notEqual(output, date);
  });
});
