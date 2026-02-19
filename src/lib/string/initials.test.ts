import { describe, it } from 'node:test';
import assert from 'node:assert';
import { initials } from './initials';

describe('initials', () => {
  it('should return first two initials by default', () => {
    assert.equal(initials('joao ley'), 'JL');
  });

  it('should respect custom max', () => {
    assert.equal(initials('joao pablo ley', 3), 'JPL');
    assert.equal(initials('joao pablo ley', 1), 'J');
  });

  it('should split camel and pascal case boundaries', () => {
    assert.equal(initials('joaoLey ExampleValue', 4), 'JLEV');
  });

  it('should return empty string when max is zero', () => {
    assert.equal(initials('joao ley', 0), '');
  });

  it('should return empty string for blank input', () => {
    assert.equal(initials('   ... --- '), '');
  });

  it('should throw for invalid max', () => {
    assert.throws(
      () => initials('joao ley', -1),
      RangeError,
      'max must be a non-negative integer.',
    );

    assert.throws(
      () => initials('joao ley', 1.2),
      RangeError,
      'max must be a non-negative integer.',
    );
  });
});
