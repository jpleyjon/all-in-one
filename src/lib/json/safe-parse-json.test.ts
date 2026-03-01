import assert from 'node:assert';
import { describe, it } from 'node:test';
import { safeParseJson } from './safe-parse-json';

describe('safeParseJson', () => {
  it('returns a success result for valid JSON', () => {
    const result = safeParseJson<{ a: number }>('{ "a": 1 }');

    assert.equal(result.ok, true);
    if (result.ok) {
      assert.deepEqual(result.value, { a: 1 });
    }
  });

  it('returns a failure result for invalid JSON', () => {
    const result = safeParseJson('{ invalid }');

    assert.equal(result.ok, false);
    if (!result.ok) {
      assert.ok(result.error instanceof SyntaxError);
    }
  });

  it('returns a failure result for non-string input', () => {
    const result = safeParseJson(123 as never);

    assert.equal(result.ok, false);
    if (!result.ok) {
      assert.ok(result.error instanceof SyntaxError);
      assert.equal(result.error.message, 'input must be valid JSON.');
    }
  });
});
