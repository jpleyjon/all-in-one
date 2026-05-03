// c8 ignore file
import type { GameGridPosition } from '../shared/types';

export type ColorLinesColor = string;

export type ColorLinesCell = ColorLinesColor | null;

export type ColorLinesStatus = 'in_progress' | 'game_over';

export type ColorLinesSpawnPolicy = 'after_non_clear_move' | 'after_every_valid_move';

export type ColorLinesMoveRule = 'path_through_empty_cells';

export type ColorLinesPosition = GameGridPosition;

export type ColorLinesRandom = () => number;

export type ColorLinesConfig = {
  rows: number;
  columns: number;
  minLineLength: number;
  spawnCount: number;
  previewCount: number;
  palette: readonly ColorLinesColor[];
  spawnPolicy: ColorLinesSpawnPolicy;
  moveRule: ColorLinesMoveRule;
  pointsPerClearedBall: number;
};

export type ColorLinesState = {
  board: readonly ColorLinesCell[];
  config: ColorLinesConfig;
  preview: readonly ColorLinesColor[];
  score: number;
  status: ColorLinesStatus;
  turn: number;
};
