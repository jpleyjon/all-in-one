// c8 ignore file
export type SafeParseJsonSuccess<T> = { ok: true; value: T };

export type SafeParseJsonFailure = { ok: false; error: SyntaxError };

export type SafeParseJsonResult<T> = SafeParseJsonSuccess<T> | SafeParseJsonFailure;

export type JsonReviver = (key: string, value: unknown) => unknown;

export type JsonReplacer = (key: string, value: unknown) => unknown;
