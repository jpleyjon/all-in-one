import assert from 'node:assert';
import { describe, it } from 'node:test';
import { stableStringifyJson } from './stable-stringify-json';

describe('stableStringifyJson', () => {
  it('sorts object keys recursively and keeps array order', () => {
    const input = {
      z: [{ b: 1, a: 2 }],
      b: 1,
      a: { d: 4, c: 3 },
    };

    assert.equal(stableStringifyJson(input), '{"a":{"c":3,"d":4},"b":1,"z":[{"a":2,"b":1}]}');
  });

  it('supports indentation', () => {
    assert.equal(stableStringifyJson({ b: 1, a: 2 }, 2), '{\n  "a": 2,\n  "b": 1\n}');
  });

  it('throws for invalid space values', () => {
    assert.throws(
      () => stableStringifyJson({ a: 1 }, -1),
      RangeError,
      'space must be a non-negative integer.',
    );
    assert.throws(
      () => stableStringifyJson({ a: 1 }, 1.5),
      RangeError,
      'space must be a non-negative integer.',
    );
  });

  it('throws for non-serializable values', () => {
    assert.throws(
      () => stableStringifyJson(BigInt(1)),
      TypeError,
      'input must be JSON-serializable.',
    );
    assert.throws(
      () => stableStringifyJson(undefined),
      TypeError,
      'input must be JSON-serializable.',
    );
  });
});
