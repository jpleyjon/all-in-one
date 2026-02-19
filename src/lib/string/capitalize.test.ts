import { describe, it } from 'node:test';
import assert from 'node:assert';
import { capitalize } from './capitalize';

describe('capitalize', () => {
  it('should capitalize the first letter', () => {
    assert.equal(capitalize('hello world'), 'Hello world');
  });

  it('should keep the rest of the string unchanged', () => {
    assert.equal(capitalize('hELLO'), 'HELLO');
  });

  it('should return empty string when input is empty', () => {
    assert.equal(capitalize(''), '');
  });

  it('should handle non-letter first characters', () => {
    assert.equal(capitalize('1hello'), '1hello');
    assert.equal(capitalize(' hello'), ' hello');
  });
});
