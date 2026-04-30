import assert from 'node:assert';
import { describe, it } from 'node:test';

import { isTicTacToeGameOver } from './is-tic-tac-toe-game-over';
import type { TicTacToeState } from './types';

describe('isTicTacToeGameOver', () => {
  it('returns false for games in progress', () => {
    const state: TicTacToeState = {
      board: [null, null, null, null, null, null, null, null, null],
      currentPlayer: 'X',
      winner: null,
      status: 'in_progress',
      movesPlayed: 0,
    };

    assert.equal(isTicTacToeGameOver(state), false);
  });

  it('returns true for won games', () => {
    const state: TicTacToeState = {
      board: ['X', 'X', 'X', null, null, null, null, null, null],
      currentPlayer: 'X',
      winner: 'X',
      status: 'won',
      movesPlayed: 3,
    };

    assert.equal(isTicTacToeGameOver(state), true);
  });

  it('returns true for drawn games', () => {
    const state: TicTacToeState = {
      board: ['X', 'O', 'X', 'X', 'O', 'O', 'O', 'X', 'X'],
      currentPlayer: 'X',
      winner: null,
      status: 'draw',
      movesPlayed: 9,
    };

    assert.equal(isTicTacToeGameOver(state), true);
  });
});
