import assert from 'node:assert';
import { describe, it } from 'node:test';
import * as colorLines from '.';

describe('color-lines index', () => {
  it('re-exports all public helpers', () => {
    const exported = [
      'canMoveColorLinesBall',
      'createColorLinesState',
      'findColorLinesMatches',
      'isColorLinesGameOver',
      'listColorLinesMoves',
      'moveColorLinesBall',
      'spawnColorLinesBalls',
    ] as const;

    exported.forEach((name) => {
      assert.equal(typeof (colorLines as Record<string, unknown>)[name], 'function');
    });
  });
});
