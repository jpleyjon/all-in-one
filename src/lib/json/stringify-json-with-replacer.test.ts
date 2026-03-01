import assert from 'node:assert';
import { describe, it } from 'node:test';
import { stringifyJsonWithReplacer } from './stringify-json-with-replacer';

describe('stringifyJsonWithReplacer', () => {
  it('stringifies values and applies the replacer', () => {
    const result = stringifyJsonWithReplacer(
      { keep: 1, drop: 2 },
      (key, value) => (key === 'drop' ? undefined : value),
    );

    assert.equal(result, '{"keep":1}');
  });

  it('supports indentation', () => {
    assert.equal(
      stringifyJsonWithReplacer({ a: 1 }, (_key, value) => value, 2),
      '{\n  "a": 1\n}',
    );
  });

  it('throws for invalid replacers', () => {
    assert.throws(
      () => stringifyJsonWithReplacer({ a: 1 }, 1 as never),
      TypeError,
      'replacer must be a function.',
    );
  });

  it('throws for invalid space values', () => {
    assert.throws(
      () => stringifyJsonWithReplacer({ a: 1 }, (_key, value) => value, -1),
      RangeError,
      'space must be a non-negative integer.',
    );
  });

  it('throws for non-serializable values', () => {
    assert.throws(
      () => stringifyJsonWithReplacer(BigInt(1), (_key, value) => value),
      TypeError,
      'input must be JSON-serializable.',
    );
  });

  it('throws when replacer removes the root value', () => {
    assert.throws(
      () => stringifyJsonWithReplacer({ a: 1 }, (key) => (key === '' ? undefined : 1)),
      TypeError,
      'input must be JSON-serializable.',
    );
  });
});

