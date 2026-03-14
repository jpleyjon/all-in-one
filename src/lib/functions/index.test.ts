import assert from 'node:assert';
import { describe, it } from 'node:test';
import * as functions from '.';

describe('functions index', () => {
  it('re-exports all public helpers', () => {
    const exported = [
      'identity',
      'noop',
      'tap',
      'compose',
      'pipe',
      'once',
      'memoize',
      'debounce',
      'throttle',
    ] as const;

    exported.forEach((name) => {
      assert.equal(typeof (functions as Record<string, unknown>)[name], 'function');
    });
  });
});
