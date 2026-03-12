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
});
