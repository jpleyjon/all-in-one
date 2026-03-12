import assert from 'node:assert';
import { describe, it } from 'node:test';
import { noop } from './noop';

describe('noop', () => {
  it('returns undefined for arbitrary arguments', () => {
    assert.equal(noop(1, 'x', { a: 1 }), undefined);
  });
});
