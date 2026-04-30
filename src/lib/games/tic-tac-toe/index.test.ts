import assert from 'node:assert';
import { describe, it } from 'node:test';
import * as ticTacToe from '.';

describe('tic-tac-toe index', () => {
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
      assert.equal(typeof (ticTacToe as Record<string, unknown>)[name], 'function');
    });
  });
});
