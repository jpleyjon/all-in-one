import assert from 'node:assert';
import { describe, it } from 'node:test';

import { maybeGenerate } from './maybe-generate';

describe('maybeGenerate', () => {
  it('returns a value or null based on probability', () => {
    assert.equal(
      maybeGenerate(
        () => 'value',
        1,
        () => 0,
      ),
      'value',
    );
    assert.equal(
      maybeGenerate(
        () => 'value',
        0,
        () => 0.999,
      ),
      null,
    );
  });

  it('validates inputs', () => {
    assert.throws(() => maybeGenerate(null as never), TypeError);
    assert.throws(() => maybeGenerate(() => 'value', -0.1), RangeError);
    assert.throws(() => maybeGenerate(() => 'value', 1.1), RangeError);
    assert.throws(() => maybeGenerate(() => 'value', 0.5, null as never), TypeError);
  });
});
