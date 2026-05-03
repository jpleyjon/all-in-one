import { indexToPosition } from '../shared/index-to-position';
import { positionToIndex } from '../shared/position-to-index';
import type { ColorLinesPosition, ColorLinesState } from './types';

function getCell(
  board: readonly (string | null)[],
  rows: number,
  columns: number,
  row: number,
  column: number,
): string | null | undefined {
  if (row < 0 || row >= rows || column < 0 || column >= columns) {
    return undefined;
  }

  return board[positionToIndex({ row, column }, columns)];
}

/**
 * Finds all cells that belong to lines meeting the configured threshold.
 *
 * @param state Current game state.
 * @returns Matched cell positions in row-major order.
 */
export function findColorLinesMatches(state: ColorLinesState): ColorLinesPosition[] {
  const { rows, columns, minLineLength } = state.config;
  const matchedIndexes = new Set<number>();
  const directions = [
    { rowDelta: 0, columnDelta: 1 },
    { rowDelta: 1, columnDelta: 0 },
    { rowDelta: 1, columnDelta: 1 },
    { rowDelta: 1, columnDelta: -1 },
  ];

  for (let row = 0; row < rows; row++) {
    for (let column = 0; column < columns; column++) {
      const cell = getCell(state.board, rows, columns, row, column);

      if (typeof cell !== 'string') {
        continue;
      }

      for (const { rowDelta, columnDelta } of directions) {
        const previousCell = getCell(
          state.board,
          rows,
          columns,
          row - rowDelta,
          column - columnDelta,
        );

        if (previousCell === cell) {
          continue;
        }

        const run: ColorLinesPosition[] = [];
        let currentRow = row;
        let currentColumn = column;

        while (getCell(state.board, rows, columns, currentRow, currentColumn) === cell) {
          run.push({ row: currentRow, column: currentColumn });
          currentRow += rowDelta;
          currentColumn += columnDelta;
        }

        if (run.length >= minLineLength) {
          run.forEach((position) => matchedIndexes.add(positionToIndex(position, columns)));
        }
      }
    }
  }

  return [...matchedIndexes]
    .sort((left, right) => left - right)
    .map((index) => indexToPosition(index, columns));
}
