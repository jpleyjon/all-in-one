import assert from 'node:assert';
import { describe, it } from 'node:test';
import { pipe } from './pipe';

describe('pipe', () => {
  it('composes functions in left-to-right order', () => {
    const double = (value: number) => value * 2;
    const increment = (value: number) => value + 1;
    const toString = (value: number) => `result:${value}`;

    const piped = pipe(double, increment, toString);

    assert.equal(piped(3), 'result:7');
  });

  it('returns the input for an empty function list', () => {
    assert.equal(pipe()('hello'), 'hello');
  });

  it('throws for non-function arguments', () => {
    assert.throws(
      () => pipe((value) => value as number, {} as never),
      TypeError,
      'fns must be functions.',
    );
  });
});
