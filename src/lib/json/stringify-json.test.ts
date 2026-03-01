import assert from 'node:assert';
import { describe, it } from 'node:test';
import { stringifyJson } from './stringify-json';

describe('stringifyJson', () => {
  it('stringifies serializable values', () => {
    assert.equal(stringifyJson({ b: 1, a: 2 }), '{"b":1,"a":2}');
  });

  it('supports indentation', () => {
    assert.equal(stringifyJson({ a: 1 }, 2), '{\n  "a": 1\n}');
  });

  it('throws for invalid space values', () => {
    assert.throws(
      () => stringifyJson({ a: 1 }, -1),
      RangeError,
      'space must be a non-negative integer.',
    );
    assert.throws(
      () => stringifyJson({ a: 1 }, 1.5),
      RangeError,
      'space must be a non-negative integer.',
    );
  });

  it('throws for non-serializable values', () => {
    assert.throws(() => stringifyJson(BigInt(1)), TypeError, 'input must be JSON-serializable.');
    assert.throws(() => stringifyJson(undefined), TypeError, 'input must be JSON-serializable.');
  });
});

