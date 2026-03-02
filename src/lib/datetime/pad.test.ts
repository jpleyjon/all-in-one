import assert from 'node:assert';
import { describe, it } from 'node:test';
import { pad } from './pad';

describe('pad', () => {
  it('pads numeric values to the requested width', () => {
    assert.equal(pad(5, 2), '05');
    assert.equal(pad(12, 4), '0012');
  });

  it('returns the original value when width is already met', () => {
    assert.equal(pad(123, 2), '123');
  });
});
