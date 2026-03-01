// c8 ignore file
export type ObjectRecord = Record<string, unknown>;

export type PathSegment = string | number;

export type ObjectPath = string | readonly PathSegment[];

export interface FlattenObjectOptions {
  delimiter?: string;
}

export interface UnflattenObjectOptions {
  delimiter?: string;
}

export type MergeWithResolver = (
  currentValue: unknown,
  incomingValue: unknown,
  key: string,
) => unknown;

export interface CleanObjectOptions {
  deep?: boolean;
  removeUndefined?: boolean;
  removeNull?: boolean;
  removeEmptyString?: boolean;
  removeEmptyObject?: boolean;
  removeEmptyArray?: boolean;
}

export interface DiffValueChange {
  before: unknown;
  after: unknown;
}

export interface DiffObjectsResult {
  added: ObjectRecord;
  removed: ObjectRecord;
  changed: Record<string, DiffValueChange>;
}
