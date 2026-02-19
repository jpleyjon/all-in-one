import { describe, it } from 'node:test';
import assert from 'node:assert';
import { capitalizeWords } from './capitalize-words';

describe('capitalizeWords', () => {
  it('should capitalize each word', () => {
    assert.equal(capitalizeWords('hello world'), 'Hello World');
  });

  it('should preserve separators', () => {
    assert.equal(capitalizeWords('hello-world_and test'), 'Hello-World_And Test');
  });

  it('should keep existing uppercase letters', () => {
    assert.equal(capitalizeWords('hELLO wORLD'), 'HELLO WORLD');
  });

  it('should handle empty string', () => {
    assert.equal(capitalizeWords(''), '');
  });
});
