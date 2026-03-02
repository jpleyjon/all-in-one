import assert from 'node:assert';
import { describe, it } from 'node:test';
import { toWords } from './to-words';

describe('toWords', () => {
  it('normalizes words to lowercase tokens', () => {
    assert.deepEqual(toWords('Hello, WORLD! this_is-fine'), [
      'hello',
      'world',
      'this',
      'is',
      'fine',
    ]);
  });

  it('splits camel case boundaries', () => {
    assert.deepEqual(toWords('userProfileValue'), ['user', 'profile', 'value']);
  });

  it('returns empty array for blank or punctuation-only input', () => {
    assert.deepEqual(toWords('   '), []);
    assert.deepEqual(toWords('---...___'), []);
  });
});
