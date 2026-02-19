import { describe, it } from 'node:test';
import assert from 'node:assert';
import { mask } from './mask';

describe('mask', () => {
  it('should mask the middle with default options', () => {
    assert.equal(mask('1234567890'), '12******90');
  });

  it('should support custom visible bounds', () => {
    assert.equal(mask('1234567890', 1, 3), '1******890');
    assert.equal(mask('1234567890', 3, 0), '123*******');
  });

  it('should support custom mask characters', () => {
    assert.equal(mask('1234567890', 2, 2, '#'), '12######90');
    assert.equal(mask('1234567890', 2, 2, 'xy'), '12xyxyxy90');
  });

  it('should return original input when nothing needs masking', () => {
    assert.equal(mask('1234', 2, 2), '1234');
    assert.equal(mask('1234', 3, 2), '1234');
  });

  it('should throw for invalid visibleStart', () => {
    assert.throws(
      () => mask('1234', -1, 2),
      RangeError,
      'visibleStart must be a non-negative integer.',
    );

    assert.throws(
      () => mask('1234', 1.5, 2),
      RangeError,
      'visibleStart must be a non-negative integer.',
    );
  });

  it('should throw for invalid visibleEnd', () => {
    assert.throws(
      () => mask('1234', 2, -1),
      RangeError,
      'visibleEnd must be a non-negative integer.',
    );

    assert.throws(
      () => mask('1234', 2, 1.5),
      RangeError,
      'visibleEnd must be a non-negative integer.',
    );
  });

  it('should throw for empty mask character', () => {
    assert.throws(
      () => mask('1234', 1, 1, ''),
      Error,
      'maskChar cannot be empty.',
    );
  });
});
