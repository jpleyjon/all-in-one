import assert from 'node:assert';
import { describe, it } from 'node:test';
import { isBefore } from './is-before';

describe('isBefore', () => {
  it('compares dates', () => {
    const early = new Date(2024, 0, 1, 10);
    const late = new Date(2024, 0, 2, 10);

    assert.equal(isBefore(early, late), true);
    assert.equal(isBefore(late, early), false);
    assert.equal(isBefore(early, early), false);
  });
});
