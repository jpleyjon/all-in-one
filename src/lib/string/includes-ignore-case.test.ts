import { describe, it } from 'node:test';
import assert from 'node:assert';
import { includesIgnoreCase } from './includes-ignore-case';

describe('includesIgnoreCase', () => {
  it('should return true when match exists with different casing', () => {
    assert.equal(includesIgnoreCase('Hello World', 'world'), true);
    assert.equal(includesIgnoreCase('Hello World', 'WORLD'), true);
  });

  it('should return false when match does not exist', () => {
    assert.equal(includesIgnoreCase('Hello World', 'planet'), false);
  });

  it('should follow native includes behavior for empty search', () => {
    assert.equal(includesIgnoreCase('Hello', ''), true);
  });
});
