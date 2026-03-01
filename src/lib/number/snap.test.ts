import assert from 'node:assert';
import { describe, it } from 'node:test';
import { snap } from './snap';

describe('snap', () => {
  it('snaps to nearest anchor and resolves ties to lower anchor', () => {
    assert.equal(snap(5.2, [1, 5, 10]), 5);
    assert.equal(snap(5, [6, 4]), 4);
  });

  it('throws for invalid inputs', () => {
    assert.throws(() => snap(Number.NaN, [1]), RangeError, 'value must be a finite number.');
    assert.throws(
      () => snap(1, 1 as never),
      TypeError,
      'anchors must be an array of finite numbers.',
    );
    assert.throws(() => snap(1, []), RangeError, 'anchors must contain at least one value.');
    assert.throws(() => snap(1, [Number.NaN]), RangeError, 'anchors[0] must be a finite number.');
    assert.throws(
      () => snap(1, [1, Number.NaN]),
      RangeError,
      'anchors[1] must be a finite number.',
    );
  });
});
