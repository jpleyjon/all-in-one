// c8 ignore file
export type TicTacToePlayer = 'X' | 'O';

export type TicTacToeCell = TicTacToePlayer | null;

export type TicTacToeStatus = 'in_progress' | 'won' | 'draw';

export type TicTacToePosition = {
  row: number;
  column: number;
};

export type TicTacToeState = {
  board: readonly TicTacToeCell[];
  currentPlayer: TicTacToePlayer;
  winner: TicTacToePlayer | null;
  status: TicTacToeStatus;
  movesPlayed: number;
};
