import { describe, it } from 'node:test';
import assert from 'node:assert';
import { truncate } from './truncate';

describe('truncate', () => {
  it('should return original text when within max length', () => {
    assert.equal(truncate('hello', 10), 'hello');
    assert.equal(truncate('hello', 5), 'hello');
  });

  it('should truncate and append the default suffix', () => {
    assert.equal(truncate('hello world', 8), 'hello...');
  });

  it('should truncate with a custom suffix', () => {
    assert.equal(truncate('hello world', 9, '..'), 'hello w..');
  });

  it('should truncate without suffix when suffix length is >= max length', () => {
    assert.equal(truncate('hello world', 3), 'hel');
    assert.equal(truncate('hello world', 4, '####'), 'hell');
  });

  it('should return empty string when max length is zero', () => {
    assert.equal(truncate('hello world', 0), '');
  });

  it('should throw for invalid max length', () => {
    assert.throws(
      () => truncate('hello', -1),
      RangeError,
      'maxLength must be a non-negative integer.',
    );
    assert.throws(
      () => truncate('hello', 1.5),
      RangeError,
      'maxLength must be a non-negative integer.',
    );
  });
});
