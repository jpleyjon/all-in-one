import { describe, it } from 'node:test';
import assert from 'node:assert';
import { equalsIgnoreCase } from './equals-ignore-case';

describe('equalsIgnoreCase', () => {
  it('should return true for equal strings with different casing', () => {
    assert.equal(equalsIgnoreCase('Hello', 'hELLo'), true);
  });

  it('should return false for different strings', () => {
    assert.equal(equalsIgnoreCase('hello', 'world'), false);
  });

  it('should treat empty strings as equal', () => {
    assert.equal(equalsIgnoreCase('', ''), true);
  });
});
