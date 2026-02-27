import assert from 'node:assert';
import { describe, it } from 'node:test';
import { isAfter } from './is-after';

describe('isAfter', () => {
  it('compares dates', () => {
    const early = new Date(2024, 0, 1, 10);
    const late = new Date(2024, 0, 2, 10);

    assert.equal(isAfter(late, early), true);
    assert.equal(isAfter(early, late), false);
    assert.equal(isAfter(early, early), false);
  });
});
