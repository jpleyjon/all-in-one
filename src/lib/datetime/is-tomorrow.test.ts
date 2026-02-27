import assert from 'node:assert';
import { describe, it } from 'node:test';
import { isTomorrow } from './is-tomorrow';

describe('isTomorrow', () => {
  it('detects whether a date is tomorrow', () => {
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);

    assert.equal(isTomorrow(tomorrow), true);
    assert.equal(isTomorrow(now), false);
  });
});
