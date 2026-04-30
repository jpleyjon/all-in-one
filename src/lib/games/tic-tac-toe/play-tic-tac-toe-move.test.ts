import assert from 'node:assert';
import { describe, it } from 'node:test';

import { createTicTacToeState } from './create-tic-tac-toe-state';
import { playTicTacToeMove } from './play-tic-tac-toe-move';
import type { TicTacToeState } from './types';

describe('playTicTacToeMove', () => {
  it('places a mark, switches player, and leaves the input unchanged', () => {
    const state = createTicTacToeState();
    const nextState = playTicTacToeMove(state, { row: 1, column: 1 });

    assert.equal(state.board[4], null);
    assert.equal(nextState.board[4], 'X');
    assert.notEqual(nextState.board, state.board);
    assert.equal(nextState.currentPlayer, 'O');
    assert.equal(nextState.movesPlayed, 1);
    assert.equal(nextState.status, 'in_progress');
    assert.equal(nextState.winner, null);
  });

  it('detects a winning move and keeps the winning player as current', () => {
    const state: TicTacToeState = {
      board: ['X', 'X', null, 'O', 'O', null, null, null, null],
      currentPlayer: 'X',
      winner: null,
      status: 'in_progress',
      movesPlayed: 4,
    };

    const nextState = playTicTacToeMove(state, { row: 0, column: 2 });

    assert.equal(nextState.winner, 'X');
    assert.equal(nextState.status, 'won');
    assert.equal(nextState.currentPlayer, 'X');
    assert.equal(nextState.movesPlayed, 5);
  });

  it('detects a draw on the final move', () => {
    const state: TicTacToeState = {
      board: ['X', 'O', 'X', 'X', 'O', 'O', 'O', 'X', null],
      currentPlayer: 'X',
      winner: null,
      status: 'in_progress',
      movesPlayed: 8,
    };

    const nextState = playTicTacToeMove(state, { row: 2, column: 2 });

    assert.equal(nextState.winner, null);
    assert.equal(nextState.status, 'draw');
    assert.equal(nextState.currentPlayer, 'X');
    assert.equal(nextState.movesPlayed, 9);
  });

  it('switches back to player X after a non-terminal O move', () => {
    const state: TicTacToeState = {
      board: ['X', null, null, null, null, null, null, null, null],
      currentPlayer: 'O',
      winner: null,
      status: 'in_progress',
      movesPlayed: 1,
    };

    const nextState = playTicTacToeMove(state, { row: 1, column: 1 });

    assert.equal(nextState.board[4], 'O');
    assert.equal(nextState.status, 'in_progress');
    assert.equal(nextState.winner, null);
    assert.equal(nextState.currentPlayer, 'X');
    assert.equal(nextState.movesPlayed, 2);
  });

  it('throws for invalid position shapes', () => {
    const state = createTicTacToeState();

    assert.throws(
      () => playTicTacToeMove(state, null as never),
      TypeError,
      'position must be an object.',
    );
    assert.throws(
      () => playTicTacToeMove(state, { column: 0 } as never),
      TypeError,
      'position must include row and column.',
    );
    assert.throws(
      () => playTicTacToeMove(state, { row: 0 } as never),
      TypeError,
      'position must include row and column.',
    );
    assert.throws(
      () => playTicTacToeMove(state, { row: 0, column: 1.5 }),
      TypeError,
      'position.column must be an integer.',
    );
    assert.throws(
      () => playTicTacToeMove(state, { row: 0.5, column: 1 }),
      TypeError,
      'position.row must be an integer.',
    );
  });

  it('throws for out-of-bounds positions', () => {
    const state = createTicTacToeState();

    assert.throws(
      () => playTicTacToeMove(state, { row: -1, column: 0 }),
      RangeError,
      'position.row must be between 0 and 2.',
    );
    assert.throws(
      () => playTicTacToeMove(state, { row: 0, column: 3 }),
      RangeError,
      'position.column must be between 0 and 2.',
    );
  });

  it('throws for occupied cells', () => {
    const state: TicTacToeState = {
      board: ['X', null, null, null, null, null, null, null, null],
      currentPlayer: 'O',
      winner: null,
      status: 'in_progress',
      movesPlayed: 1,
    };

    assert.throws(
      () => playTicTacToeMove(state, { row: 0, column: 0 }),
      Error,
      'cell is already occupied.',
    );
  });

  it('throws when moves are attempted after game over', () => {
    const state: TicTacToeState = {
      board: ['X', 'X', 'X', 'O', 'O', null, null, null, null],
      currentPlayer: 'X',
      winner: 'X',
      status: 'won',
      movesPlayed: 5,
    };

    assert.throws(
      () => playTicTacToeMove(state, { row: 2, column: 2 }),
      Error,
      'cannot play a move after the game is over.',
    );
  });
});
