import { describe, it } from 'node:test';
import assert from 'node:assert';
import { normalizeWhitespace } from './normalize-whitespace';

describe('normalizeWhitespace', () => {
  it('should collapse repeated spaces', () => {
    assert.equal(normalizeWhitespace('hello   world'), 'hello world');
  });

  it('should collapse tabs and newlines', () => {
    assert.equal(
      normalizeWhitespace('hello\t\tworld\n\nnext'),
      'hello world next',
    );
  });

  it('should trim leading and trailing whitespace', () => {
    assert.equal(normalizeWhitespace('   hello world   '), 'hello world');
  });

  it('should return empty string for all-whitespace input', () => {
    assert.equal(normalizeWhitespace('   \n\t  '), '');
  });
});
