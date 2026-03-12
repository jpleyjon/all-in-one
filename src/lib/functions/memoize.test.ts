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

  it('keeps cache keys distinct when argument payloads include separators', () => {
    let calls = 0;
    const getValue = memoize((...args: string[]) => {
      calls += 1;

      return args.join('-');
    });

    assert.equal(getValue('a|string:b|string:c'), 'a|string:b|string:c');
    assert.equal(getValue('a', 'b', 'c'), 'a-b-c');
    assert.equal(calls, 2);

    assert.equal(getValue('a|string:b|string:c'), 'a|string:b|string:c');
    assert.equal(getValue('a', 'b', 'c'), 'a-b-c');
    assert.equal(calls, 2);
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

  it('keeps cache keys distinct across mixed-type boundary collisions', () => {
    let calls = 0;
    const getValue = memoize((...args: unknown[]) => {
      calls += 1;

      return args.join('|');
    });

    assert.equal(getValue('a|boolean:true'), 'a|boolean:true');
    assert.equal(getValue('a', true), 'a|true');
    assert.equal(getValue('a|number:1'), 'a|number:1');
    assert.equal(getValue('a', 1), 'a|1');

    assert.equal(getValue('a|boolean:true'), 'a|boolean:true');
    assert.equal(getValue('a', true), 'a|true');
    assert.equal(getValue('a|number:1'), 'a|number:1');
    assert.equal(getValue('a', 1), 'a|1');

    assert.equal(calls, 4);
  });

  it('preserves this when memoized function is used as an object method', () => {
    let calls = 0;

    const item = {
      value: 1,
      getLabel(this: { value: number }) {
        calls += 1;
        this.value += 1;

        return this.value;
      },
    };

    item.getLabel = memoize(item.getLabel);

    assert.equal(item.getLabel(), 2);
    assert.equal(item.getLabel(), 2);
    assert.equal(item.value, 2);
    assert.equal(calls, 1);
  });

  it('keeps memoized results isolated per shared receiver context', () => {
    let calls = 0;
    const getValue = memoize(function (this: { value: number }) {
      calls += 1;

      this.value += 1;

      return this.value;
    });

    const first = { value: 1, getValue };
    const second = { value: 10, getValue };

    assert.equal(first.getValue(), 2);
    assert.equal(second.getValue(), 11);
    assert.equal(first.getValue(), 2);
    assert.equal(second.getValue(), 11);
    assert.equal(calls, 2);
  });

  it('reuses object-argument cache per receiver for single-argument object calls', () => {
    let calls = 0;
    const getTotal = memoize(function (this: { offset: number }, value: { amount: number }) {
      calls += 1;

      return this.offset + value.amount;
    });

    const receiver = { offset: 10, getTotal };
    const value = { amount: 5 };

    assert.equal(receiver.getTotal(value), 15);
    assert.equal(receiver.getTotal(value), 15);
    assert.equal(calls, 1);
  });
});
