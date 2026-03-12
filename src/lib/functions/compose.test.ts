import assert from 'node:assert';
import { describe, it } from 'node:test';
import { compose } from './compose';

describe('compose', () => {
  it('composes functions in right-to-left order', () => {
    const double = (value: number) => value * 2;
    const increment = (value: number) => value + 1;
    const toString = (value: number) => `result:${value}`;

    const composed = compose(toString, increment, double);

    assert.equal(composed(3), 'result:7');
  });

  it('returns the input for an empty function list', () => {
    assert.equal(compose()(10), 10);
  });

  it('throws for non-function arguments', () => {
    assert.throws(() => compose((value) => value as number, 1 as never), TypeError, 'fns must be functions.');
  });
});
