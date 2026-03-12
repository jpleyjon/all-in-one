import assert from 'node:assert';
import { describe, it } from 'node:test';
import { memoize } from './memoize';

describe('memoize', () => {
  it('caches results for primitive arguments', () => {
    let calls = 0;
    const getDouble = memoize((value: number) => {
      calls += 1;

      return value * 2;
    });

    assert.equal(getDouble(2), 4);
    assert.equal(getDouble(2), 4);
    assert.equal(calls, 1);
  });

  it('uses object identity for single object arguments when no resolver is provided', () => {
    let calls = 0;
    const user = { id: 1 };
    const getId = memoize((target: { id: number }) => {
      calls += 1;

      return target.id;
    });

    assert.equal(getId(user), 1);
    assert.equal(getId(user), 1);
    assert.equal(calls, 1);
  });

  it('uses a custom resolver when provided', () => {
    let calls = 0;
    const getValue = memoize(
      (value: number, multiplier: number) => {
        calls += 1;

        return value * multiplier;
      },
      (value, multiplier) => `${value}-${multiplier}`,
    );

    assert.equal(getValue(2, 3), 6);
    assert.equal(getValue(2, 3), 6);
    assert.equal(calls, 1);
  });

  it('throws when function is invalid', () => {
    assert.throws(() => memoize(1 as never), TypeError, 'fn must be a function.');
  });

  it('caches zero-argument calls', () => {
    let calls = 0;
    const getRandom = memoize(() => {
      calls += 1;

      return Math.random();
    });

    const value = getRandom();

    assert.equal(getRandom(), value);
    assert.equal(calls, 1);
  });

  it('generates cache keys from default resolver for diverse values', () => {
    let calls = 0;
    const getLabel = memoize((_value: unknown, label: string) => {
      calls += 1;

      return label;
    });

    const stringValue = () => getLabel('abc', 'string');
    const numberValue = () => getLabel(3, 'number');
    const negativeZeroValue = () => getLabel(-0, 'negative-zero');
    const booleanValue = () => getLabel(true, 'boolean');
    const bigintValue = () => getLabel(BigInt(5), 'bigint');
    const symbolValue = () => getLabel(Symbol.for('memoize'), 'symbol');
    const memoizeFn = () => 'value';
    const functionValue = () => getLabel(memoizeFn, 'function');
    const undefinedValue = () => getLabel(undefined as never, 'undefined');
    const nullValue = () => getLabel(null, 'null');
    const objectValue = () => {
      const obj = { id: 1 };

      return getLabel(obj, 'object');
    };

    const circular: { self?: unknown } = {};
    circular.self = circular;
    const circularValue = () => getLabel(circular, 'circular');

    assert.equal(stringValue(), 'string');
    assert.equal(stringValue(), 'string');
    assert.equal(numberValue(), 'number');
    assert.equal(numberValue(), 'number');
    assert.equal(negativeZeroValue(), 'negative-zero');
    assert.equal(negativeZeroValue(), 'negative-zero');
    assert.equal(booleanValue(), 'boolean');
    assert.equal(booleanValue(), 'boolean');
    assert.equal(bigintValue(), 'bigint');
    assert.equal(bigintValue(), 'bigint');
    assert.equal(symbolValue(), 'symbol');
    assert.equal(symbolValue(), 'symbol');
    assert.equal(functionValue(), 'function');
    assert.equal(functionValue(), 'function');
    assert.equal(undefinedValue(), 'undefined');
    assert.equal(undefinedValue(), 'undefined');
    assert.equal(nullValue(), 'null');
    assert.equal(nullValue(), 'null');
    assert.equal(objectValue(), 'object');
    assert.equal(objectValue(), 'object');
    assert.equal(circularValue(), 'circular');
    assert.equal(circularValue(), 'circular');

    assert.equal(calls, 11);
  });

  it('throws when resolver is invalid', () => {
    assert.throws(() => memoize((value: number) => value, 1 as never), TypeError, 'resolver must be a function.');
  });

  it('throws when resolver returns non-string', () => {
    const getValue = memoize(
      (value: number) => value,
      (() => 1 as never),
    );

    assert.throws(() => getValue(1), TypeError, 'resolver must return a string.');
  });
});
