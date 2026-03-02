import assert from 'node:assert';
import { describe, it } from 'node:test';
import { assertWeekStartsOn } from './assert-week-starts-on';

describe('assertWeekStartsOn', () => {
  it('does not throw for valid weekday indexes', () => {
    assert.doesNotThrow(() => assertWeekStartsOn(0));
    assert.doesNotThrow(() => assertWeekStartsOn(6));
  });

  it('throws for out-of-range or non-integer values', () => {
    assert.throws(
      () => assertWeekStartsOn(-1),
      RangeError,
      'weekStartsOn must be an integer between 0 and 6.',
    );
    assert.throws(
      () => assertWeekStartsOn(6.5),
      RangeError,
      'weekStartsOn must be an integer between 0 and 6.',
    );
  });
});
