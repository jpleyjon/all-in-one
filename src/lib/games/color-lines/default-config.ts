import type { ColorLinesConfig } from './types';

export const DEFAULT_COLOR_LINES_CONFIG: ColorLinesConfig = {
  rows: 9,
  columns: 9,
  minLineLength: 5,
  spawnCount: 3,
  previewCount: 3,
  palette: ['red', 'blue', 'green', 'yellow', 'purple', 'orange', 'cyan'],
  spawnPolicy: 'after_non_clear_move',
  moveRule: 'path_through_empty_cells',
  pointsPerClearedBall: 1,
};
