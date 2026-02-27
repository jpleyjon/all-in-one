import assert from 'node:assert';
import { describe, it } from 'node:test';
import { fromUnixTimestamp } from './from-unix-timestamp';

describe('fromUnixTimestamp', () => {
  it('converts unix seconds to Date', () => {
    assert.equal(fromUnixTimestamp(1).toISOString(), '1970-01-01T00:00:01.000Z');
  });

  it('throws for non-finite numbers', () => {
    assert.throws(
      () => fromUnixTimestamp(Number.POSITIVE_INFINITY),
      RangeError,
      'seconds must be a finite number.',
    );
  });
});
