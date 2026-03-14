import assert from 'node:assert';
import { describe, it } from 'node:test';
import { debounce } from './debounce';

describe('debounce', () => {
  it('delays invocation until wait elapses', async () => {
    let value = 0;
    const debounced = debounce((next: number) => {
      value = next;
    }, 30);

    debounced(1);
    debounced(2);
    debounced(3);

    assert.equal(value, 0);

    await new Promise((resolve) => {
      setTimeout(resolve, 60);
    });

    assert.equal(value, 3);
  });

  it('throws for invalid function', () => {
    assert.throws(() => debounce(1 as never, 10), TypeError, 'fn must be a function.');
  });

  it('throws for invalid wait', () => {
    assert.throws(
      () => debounce(() => undefined, -1),
      RangeError,
      'wait must be a finite non-negative number.',
    );
  });

  it('returns undefined before the first scheduled execution and then returns latest result', async () => {
    let value = 0;
    const debounced = debounce((next: number) => {
      value = next * 2;

      return value;
    }, 30);

    const firstResult = debounced(2);
    assert.equal(firstResult, undefined);

    await new Promise((resolve) => {
      setTimeout(resolve, 50);
    });

    assert.equal(value, 4);

    const secondResult = debounced(3);
    assert.equal(secondResult, 4);

    await new Promise((resolve) => {
      setTimeout(resolve, 50);
    });

    assert.equal(value, 6);
  });
});
