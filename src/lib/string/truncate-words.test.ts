import { describe, it } from 'node:test';
import assert from 'node:assert';
import { truncateWords } from './truncate-words';

describe('truncateWords', () => {
  it('should return normalized text when within limit', () => {
    assert.equal(
      truncateWords('hello   world', 2),
      'hello world',
    );
  });

  it('should truncate by word count with default suffix', () => {
    assert.equal(
      truncateWords('one two three four', 2),
      'one two...',
    );
  });

  it('should truncate by word count with custom suffix', () => {
    assert.equal(
      truncateWords('one two three four', 3, ' [more]'),
      'one two three [more]',
    );
  });

  it('should return empty string when maxWords is zero', () => {
    assert.equal(truncateWords('one two three', 0), '');
  });

  it('should return empty string for blank input', () => {
    assert.equal(truncateWords('   \n\t ', 3), '');
  });

  it('should throw for invalid maxWords', () => {
    assert.throws(
      () => truncateWords('one two', -1),
      RangeError,
      'maxWords must be a non-negative integer.',
    );

    assert.throws(
      () => truncateWords('one two', 1.5),
      RangeError,
      'maxWords must be a non-negative integer.',
    );
  });
});
