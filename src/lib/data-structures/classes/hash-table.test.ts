import { describe, it } from 'node:test';
import assert from 'node:assert';
import HashTable from './hash-table';

describe('HashTable', () => {
  it('should create a hash table with default capacity', () => {
    const table = new HashTable<number>();

    assert.equal(table.capacity, 16);
    assert.equal(table.size, 0);
  });

  it('should create a hash table with custom capacity', () => {
    const table = new HashTable<number>(8);

    assert.equal(table.capacity, 8);
    assert.equal(table.size, 0);
  });

  it('should throw if capacity is not a positive integer', () => {
    assert.throws(
      () => new HashTable<number>(0),
      RangeError,
      'Capacity must be a positive integer.',
    );

    assert.throws(
      () => new HashTable<number>(1.5),
      RangeError,
      'Capacity must be a positive integer.',
    );
  });

  it('should set and get values by key', () => {
    const table = new HashTable<number>();

    table.set('one', 1);
    table.set('two', 2);

    assert.equal(table.get('one'), 1);
    assert.equal(table.get('two'), 2);
    assert.equal(table.size, 2);
  });

  it('should update an existing key without changing size', () => {
    const table = new HashTable<number>();

    table.set('key', 1);
    table.set('key', 2);

    assert.equal(table.get('key'), 2);
    assert.equal(table.size, 1);
  });

  it('should return undefined for unknown keys', () => {
    const table = new HashTable<number>();

    assert.equal(table.get('missing'), undefined);
  });

  it('should distinguish between has and get when value is undefined', () => {
    const table = new HashTable<number | undefined>();

    table.set('empty', undefined);

    assert.equal(table.get('empty'), undefined);
    assert.equal(table.has('empty'), true);
    assert.equal(table.has('missing'), false);
  });

  it('should remove keys', () => {
    const table = new HashTable<number>();

    table.set('one', 1);
    table.set('two', 2);

    assert.equal(table.remove('one'), true);
    assert.equal(table.has('one'), false);
    assert.equal(table.size, 1);
    assert.equal(table.remove('missing'), false);
  });

  it('should handle collisions', () => {
    const table = new HashTable<number>(1);

    table.set('a', 1);
    table.set('b', 2);
    table.set('c', 3);

    assert.equal(table.get('a'), 1);
    assert.equal(table.get('b'), 2);
    assert.equal(table.get('c'), 3);
    assert.equal(table.size, 3);
    assert.deepStrictEqual(table.keys(), ['a', 'b', 'c']);
    assert.deepStrictEqual(table.values(), [1, 2, 3]);
    assert.deepStrictEqual(table.entries(), [['a', 1], ['b', 2], ['c', 3]]);
  });

  it('should clear all entries and preserve capacity', () => {
    const table = new HashTable<number>(4);

    table.set('one', 1);
    table.set('two', 2);
    table.clear();

    assert.equal(table.size, 0);
    assert.equal(table.capacity, 4);
    assert.deepStrictEqual(table.keys(), []);
    assert.deepStrictEqual(table.values(), []);
    assert.deepStrictEqual(table.entries(), []);
  });
});
