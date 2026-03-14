import assert from 'node:assert';
import { describe, it } from 'node:test';
import { throttle } from './throttle';

describe('throttle', () => {
  it('invokes immediately and then throttles to trailing call', async () => {
    const values: number[] = [];
    const throttled = throttle((value: number) => {
      values.push(value);
    }, 40);

    throttled(1);
    throttled(2);
    throttled(3);

    assert.deepEqual(values, [1]);

    await new Promise((resolve) => {
      setTimeout(resolve, 70);
    });

    assert.deepEqual(values, [1, 3]);
  });

  it('invokes again after throttle window passes', async () => {
    const values: number[] = [];
    const throttled = throttle((value: number) => {
      values.push(value);
    }, 40);

    throttled(1);

    await new Promise((resolve) => {
      setTimeout(resolve, 70);
    });

    throttled(2);

    assert.deepEqual(values, [1, 2]);
  });

  it('throws for invalid function', () => {
    assert.throws(() => throttle(1 as never, 10), TypeError, 'fn must be a function.');
  });

  it('throws for invalid wait', () => {
    assert.throws(
      () => throttle(() => undefined, -1),
      RangeError,
      'wait must be a finite non-negative number.',
    );
  });

  it('clears a pending timeout when a throttled call occurs after the window', () => {
    const values: number[] = [];
    const originalDateNow = Date.now;
    let now = 10_000;

    Date.now = () => now;

    try {
      const throttled = throttle((value: number) => {
        values.push(value);
      }, 50);

      throttled(1);
      now += 1;
      throttled(2);
      now += 60;
      throttled(3);

      assert.deepEqual(values, [1, 3]);
    } finally {
      Date.now = originalDateNow;
    }
  });

  it('ignores invoke when latest args are already consumed', async () => {
    const values: number[] = [];
    const originalDateNow = Date.now;
    const originalClearTimeout = globalThis.clearTimeout;
    const originalSetTimeout = globalThis.setTimeout;
    let now = 10_000;

    Date.now = () => now;
    globalThis.clearTimeout = (() => undefined) as typeof globalThis.clearTimeout;

    try {
      const throttled = throttle((value: number) => {
        values.push(value);
      }, 50);

      throttled(1);
      now += 1;
      throttled(2);
      now += 60;
      throttled(3);

      await new Promise((resolve) => {
        originalSetTimeout(resolve, 100);
      });

      assert.deepEqual(values, [1, 3]);
    } finally {
      Date.now = originalDateNow;
      globalThis.clearTimeout = originalClearTimeout;
    }
  });
});
