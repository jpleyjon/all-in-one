import assert from 'node:assert';
import { describe, it } from 'node:test';

import { getTicTacToeWinner } from './get-tic-tac-toe-winner';
import type { TicTacToeState } from './types';

function createState(board: TicTacToeState['board']): TicTacToeState {
  return {
    board,
    currentPlayer: 'X',
    winner: null,
    status: 'in_progress',
    movesPlayed: board.filter((cell) => cell !== null).length,
  };
}

describe('getTicTacToeWinner', () => {
  it('detects row wins', () => {
    const winner = getTicTacToeWinner(
      createState(['X', 'X', 'X', null, 'O', null, 'O', null, null]),
    );

    assert.equal(winner, 'X');
  });

  it('detects column wins', () => {
    const winner = getTicTacToeWinner(
      createState(['O', 'X', null, 'O', 'X', null, 'O', null, 'X']),
    );

    assert.equal(winner, 'O');
  });

  it('detects diagonal wins', () => {
    const winner = getTicTacToeWinner(
      createState(['X', 'O', null, 'O', 'X', null, null, null, 'X']),
    );

    assert.equal(winner, 'X');
  });

  it('returns null when there is no winner', () => {
    const winner = getTicTacToeWinner(createState(['X', 'O', 'X', 'X', 'O', 'O', 'O', 'X', null]));

    assert.equal(winner, null);
  });
});
