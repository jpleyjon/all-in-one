import assert from 'node:assert';
import { describe, it } from 'node:test';
import { tap } from './tap';

describe('tap', () => {
  it('passes through the original value', () => {
    let tapped: number | undefined;
    const input = 7;

    const output = tap(input, (value) => {
      tapped = value;
    });

    assert.equal(output, input);
    assert.equal(tapped, input);
  });

  it('throws for invalid interceptor', () => {
    assert.throws(
      () => tap('x', 1 as never),
      TypeError,
      'interceptor must be a function.',
    );
  });
});
