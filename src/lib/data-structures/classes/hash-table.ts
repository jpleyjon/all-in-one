type THashEntry<T> = [key: string, value: T];

/**
 * Hash table implementation using separate chaining.
 *
 * Keys are strings and values are generic.
 *
 * @template T Stored value type.
 */
export default class HashTable<T> {
  private _buckets: THashEntry<T>[][];

  private _capacity: number;

  private _size: number;

  /**
   * Creates a new hash table.
   *
   * @param capacity Number of internal buckets. Defaults to 16.
   * @throws {RangeError} If capacity is not a positive integer.
   */
  constructor(capacity = 16) {
    if (!Number.isInteger(capacity) || capacity < 1) {
      throw new RangeError('Capacity must be a positive integer.');
    }

    this._capacity = capacity;
    this._size = 0;
    this._buckets = Array.from({ length: capacity }, () => []);
  }

  /**
   * Returns the number of stored key/value pairs.
   *
   * @returns Entry count.
   */
  get size(): number {
    return this._size;
  }

  /**
   * Returns the number of internal buckets.
   *
   * @returns Bucket count.
   */
  get capacity(): number {
    return this._capacity;
  }

  /**
   * Inserts or updates a value by key.
   *
   * @param key Entry key.
   * @param value Entry value.
   */
  set(key: string, value: T): void {
    const bucket = this._buckets[this._hash(key)];
    const entry = this._findEntry(bucket, key);

    if (entry) {
      entry[1] = value;
      return;
    }

    bucket.push([key, value]);
    this._size += 1;
  }

  /**
   * Gets a value by key.
   *
   * @param key Entry key.
   * @returns The stored value, or `undefined` when the key does not exist.
   */
  get(key: string): T | undefined {
    const bucket = this._buckets[this._hash(key)];
    const entry = this._findEntry(bucket, key);

    if (!entry) {
      return undefined;
    }

    return entry[1];
  }

  /**
   * Checks if a key exists.
   *
   * @param key Entry key.
   * @returns `true` when the key exists.
   */
  has(key: string): boolean {
    const bucket = this._buckets[this._hash(key)];
    return this._findEntry(bucket, key) !== undefined;
  }

  /**
   * Removes an entry by key.
   *
   * @param key Entry key.
   * @returns `true` when an entry was removed.
   */
  remove(key: string): boolean {
    const bucket = this._buckets[this._hash(key)];
    const index = bucket.findIndex(([entryKey]) => entryKey === key);

    if (index === -1) {
      return false;
    }

    bucket.splice(index, 1);
    this._size -= 1;
    return true;
  }

  /**
   * Removes all entries from the hash table.
   */
  clear(): void {
    this._buckets = Array.from({ length: this._capacity }, () => []);
    this._size = 0;
  }

  /**
   * Returns all keys.
   *
   * @returns Keys in bucket scan order.
   */
  keys(): string[] {
    const keys: string[] = [];

    this._buckets.forEach((bucket) => {
      bucket.forEach(([key]) => {
        keys.push(key);
      });
    });

    return keys;
  }

  /**
   * Returns all values.
   *
   * @returns Values in bucket scan order.
   */
  values(): T[] {
    const values: T[] = [];

    this._buckets.forEach((bucket) => {
      bucket.forEach(([, value]) => {
        values.push(value);
      });
    });

    return values;
  }

  /**
   * Returns all key/value entries.
   *
   * @returns Entries in bucket scan order.
   */
  entries(): THashEntry<T>[] {
    const entries: THashEntry<T>[] = [];

    this._buckets.forEach((bucket) => {
      bucket.forEach(([key, value]) => {
        entries.push([key, value]);
      });
    });

    return entries;
  }

  /**
   * Hashes a key into a bucket index.
   *
   * @param key Key to hash.
   * @returns Bucket index.
   */
  private _hash(key: string): number {
    let hash = 0;
    const prime = 31;

    for (let index = 0; index < key.length; index += 1) {
      hash = (hash * prime + key.charCodeAt(index)) % this._capacity;
    }

    return hash;
  }

  /**
   * Finds an entry inside a bucket.
   *
   * @param bucket Bucket to scan.
   * @param key Key to match.
   * @returns Matched entry or `undefined`.
   */
  private _findEntry(bucket: THashEntry<T>[], key: string): THashEntry<T> | undefined {
    return bucket.find(([entryKey]) => entryKey === key);
  }
}
