import assert from 'node:assert';
import { describe, it } from 'node:test';
import { humanizeDuration } from './humanize-duration';

describe('humanizeDuration', () => {
  it('formats positive durations', () => {
    assert.equal(humanizeDuration(0), '0ms');
    assert.equal(humanizeDuration(90061001), '1d 1h 1m 1s 1ms');
    assert.equal(humanizeDuration(3600000), '1h');
    assert.equal(humanizeDuration(550), '550ms');
  });

  it('formats negative and fractional durations', () => {
    assert.equal(humanizeDuration(-65000), '-1m 5s');
    assert.equal(humanizeDuration(0.9), '0ms');
  });

  it('throws for non-finite numbers', () => {
    assert.throws(
      () => humanizeDuration(Number.NEGATIVE_INFINITY),
      RangeError,
      'milliseconds must be a finite number.',
    );
  });
});
