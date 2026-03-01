import assert from 'node:assert';
import { describe, it } from 'node:test';
import { isNonEmptyTrimmedString } from './is-non-empty-trimmed-string';

describe('isNonEmptyTrimmedString', () => {
  it('returns true for non-empty trimmed strings', () => {
    assert.equal(isNonEmptyTrimmedString('hello'), true);
    assert.equal(isNonEmptyTrimmedString('  hello  '), true);
  });

  it('returns false for blank or non-string values', () => {
    assert.equal(isNonEmptyTrimmedString('   '), false);
    assert.equal(isNonEmptyTrimmedString(''), false);
    assert.equal(isNonEmptyTrimmedString(1), false);
    assert.equal(isNonEmptyTrimmedString(null), false);
  });
});
