import assert from 'node:assert';
import { describe, it } from 'node:test';
import * as games from '.';

describe('games index', () => {
  it('re-exports all public helpers', () => {
    const exported = [
      'createTicTacToeState',
      'getTicTacToeStatus',
      'getTicTacToeWinner',
      'isTicTacToeGameOver',
      'listTicTacToeMoves',
      'playTicTacToeMove',
    ] as const;

    exported.forEach((name) => {
      assert.equal(typeof (games as Record<string, unknown>)[name], 'function');
    });
  });
});
