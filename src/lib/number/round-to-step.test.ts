import assert from 'node:assert';
import { describe, it } from 'node:test';
import { roundToStep } from './round-to-step';

describe('roundToStep', () => {
  it('rounds with half-up mode by default', () => {
    assert.equal(roundToStep(5.24, 0.1), 5.2);
    assert.equal(roundToStep(5.25, 0.1), 5.3);
    assert.equal(roundToStep(-5.25, 0.1), -5.3);
  });

  it('supports half-even mode', () => {
    assert.equal(roundToStep(2.5, 1, 'half-even'), 2);
    assert.equal(roundToStep(3.5, 1, 'half-even'), 4);
    assert.equal(roundToStep(2.4, 1, 'half-even'), 2);
    assert.equal(roundToStep(2.6, 1, 'half-even'), 3);
  });

  it('supports up/down/toward-zero/away-from-zero modes', () => {
    assert.equal(roundToStep(2.1, 1, 'up'), 3);
    assert.equal(roundToStep(2.9, 1, 'down'), 2);
    assert.equal(roundToStep(-2.9, 1, 'toward-zero'), -2);
    assert.equal(roundToStep(-2.1, 1, 'away-from-zero'), -3);
    assert.equal(roundToStep(2.1, 1, 'away-from-zero'), 3);
  });

  it('does not leak floating point noise in rounded step values', () => {
    assert.equal(roundToStep(5.25, 0.1), 5.3);
    assert.equal(roundToStep(-5.25, 0.1), -5.3);
  });

  it('supports scientific-notation step values', () => {
    assert.equal(roundToStep(1.6e-7, 1e-7), 2e-7);
    assert.equal(roundToStep(1.4e-7, 1e-7), 1e-7);
    assert.equal(roundToStep(2.6e-7, 1.5e-7), 3e-7);
  });

  it('does not throw for tiny step values beyond toFixed precision limits', () => {
    assert.equal(roundToStep(2.6e-101, 1e-101), 3e-101);
    assert.equal(roundToStep(5e-324, 5e-324), 5e-324);
  });

  it('normalizes negative zero to zero', () => {
    assert.equal(roundToStep(-0.004, 0.01, 'toward-zero'), 0);
  });

  it('throws for invalid inputs', () => {
    assert.throws(() => roundToStep(Number.NaN, 1), RangeError, 'value must be a finite number.');
    assert.throws(() => roundToStep(1, 0), RangeError, 'step must be a positive finite number.');
    assert.throws(() => roundToStep(1, -1), RangeError, 'step must be a positive finite number.');
    assert.throws(
      () => roundToStep(1, 1, 'invalid' as never),
      TypeError,
      'mode must be a supported rounding mode.',
    );
  });
});
