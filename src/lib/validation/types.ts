// c8 ignore file
export type ValidationPredicate<T = unknown> = (value: unknown) => value is T;

export type ShapeValidator = (value: unknown) => boolean;

export type ValidationShape = Record<string, ShapeValidator>;

export type UuidVersion = 1 | 3 | 4 | 5;

export interface UrlValidationOptions {
  protocols?: string[];
  allowLocalhost?: boolean;
}
