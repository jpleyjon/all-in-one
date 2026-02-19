import { describe, it } from 'node:test';
import assert from 'node:assert';
import { compact } from './compact';

describe('compact', () => {
  it('should remove falsy values', () => {
    assert.deepEqual(
      compact([0, 1, '', 'hello', false, true, null, undefined]),
      [1, 'hello', true],
    );
  });

  it('should keep truthy values', () => {
    assert.deepEqual(compact(['0', 'false', [], {}]), ['0', 'false', [], {}]);
  });
});
