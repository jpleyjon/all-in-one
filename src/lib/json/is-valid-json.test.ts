import assert from 'node:assert';
import { describe, it } from 'node:test';
import { isValidJson } from './is-valid-json';

describe('isValidJson', () => {
  it('returns true for valid JSON', () => {
    assert.equal(isValidJson('{ "a": 1 }'), true);
    assert.equal(isValidJson('true'), true);
  });

  it('returns false for invalid JSON', () => {
    assert.equal(isValidJson('{ invalid }'), false);
  });

  it('returns false for non-string values', () => {
    assert.equal(isValidJson(1 as never), false);
  });
});
