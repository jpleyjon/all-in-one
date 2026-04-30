import assert from 'node:assert';
import { describe, it } from 'node:test';

import { getTicTacToeStatus } from './get-tic-tac-toe-status';
import type { TicTacToeState } from './types';

describe('getTicTacToeStatus', () => {
  it('returns in_progress when the game has open cells and no winner', () => {
    const state: TicTacToeState = {
      board: ['X', null, null, null, 'O', null, null, null, null],
      currentPlayer: 'X',
      winner: null,
      status: 'in_progress',
      movesPlayed: 2,
    };

    assert.equal(getTicTacToeStatus(state), 'in_progress');
  });

  it('returns won when the board has a winner', () => {
    const state: TicTacToeState = {
      board: ['X', 'X', 'X', 'O', 'O', null, null, null, null],
      currentPlayer: 'O',
      winner: null,
      status: 'in_progress',
      movesPlayed: 5,
    };

    assert.equal(getTicTacToeStatus(state), 'won');
  });

  it('returns draw when the board is full without a winner', () => {
    const state: TicTacToeState = {
      board: ['X', 'O', 'X', 'X', 'O', 'O', 'O', 'X', 'X'],
      currentPlayer: 'X',
      winner: null,
      status: 'in_progress',
      movesPlayed: 9,
    };

    assert.equal(getTicTacToeStatus(state), 'draw');
  });
});
