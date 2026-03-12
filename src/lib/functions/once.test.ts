import assert from 'node:assert';
import { describe, it } from 'node:test';
import { once } from './once';

describe('once', () => {
  it('invokes the function only once', () => {
    let calls = 0;

    const add = once((value: number) => {
      calls += 1;

      return value + 1;
    });

    assert.equal(add(1), 2);
    assert.equal(add(2), 2);
    assert.equal(calls, 1);
  });

  it('throws for invalid function', () => {
    assert.throws(() => once(1 as never), TypeError, 'fn must be a function.');
  });

  it('preserves this when wrapped function is used as a method', () => {
    let calls = 0;

    const obj = {
      value: 1,
      increment(this: { value: number }) {
        calls += 1;

        this.value += 1;

        return this.value;
      },
    };

    obj.increment = once(obj.increment);

    assert.equal(obj.increment(), 2);
    assert.equal(obj.increment(), 2);
    assert.equal(obj.value, 2);
    assert.equal(calls, 1);
  });
});
