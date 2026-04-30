import assert from 'node:assert';
import { describe, it } from 'node:test';

import { listTicTacToeMoves } from './list-tic-tac-toe-moves';
import type { TicTacToeState } from './types';

describe('listTicTacToeMoves', () => {
  it('returns all board positions in row-major order for a new game', () => {
    const state: TicTacToeState = {
      board: [null, null, null, null, null, null, null, null, null],
      currentPlayer: 'X',
      winner: null,
      status: 'in_progress',
      movesPlayed: 0,
    };

    assert.deepEqual(listTicTacToeMoves(state), [
      { row: 0, column: 0 },
      { row: 0, column: 1 },
      { row: 0, column: 2 },
      { row: 1, column: 0 },
      { row: 1, column: 1 },
      { row: 1, column: 2 },
      { row: 2, column: 0 },
      { row: 2, column: 1 },
      { row: 2, column: 2 },
    ]);
  });

  it('returns only empty cells', () => {
    const state: TicTacToeState = {
      board: ['X', null, 'O', null, 'X', null, null, null, 'O'],
      currentPlayer: 'O',
      winner: null,
      status: 'in_progress',
      movesPlayed: 4,
    };

    assert.deepEqual(listTicTacToeMoves(state), [
      { row: 0, column: 1 },
      { row: 1, column: 0 },
      { row: 1, column: 2 },
      { row: 2, column: 0 },
      { row: 2, column: 1 },
    ]);
  });

  it('returns no moves after the game is over', () => {
    const state: TicTacToeState = {
      board: ['X', 'X', 'X', 'O', 'O', null, null, null, null],
      currentPlayer: 'X',
      winner: 'X',
      status: 'won',
      movesPlayed: 5,
    };

    assert.deepEqual(listTicTacToeMoves(state), []);
  });
});
