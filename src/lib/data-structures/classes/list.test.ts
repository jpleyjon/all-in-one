import { describe, it } from 'node:test';
import assert from 'node:assert';
import { List } from './list';
import MockClass from '../fixtures/mock-class';

describe('List', () => {
  describe('Constructor', () => {
    it('should create an empty list without data', () => {
      const list = new List<number>();

      assert.ok(list);
      assert.strictEqual(list.size, 0);
      assert.strictEqual(list.isEmpty(), true);
      assert.strictEqual(list.head, null);
      assert.strictEqual(list.tail, null);
    });

    it('should create a list with initial data', () => {
      const mockObject = new MockClass(1);
      const list = new List<MockClass>();
      list.push(mockObject);

      assert.ok(list);
      assert.strictEqual(list.size, 1);
      assert.strictEqual(list.isEmpty(), false);
      assert.ok(list.head);
      assert.strictEqual(list.head, list.tail);
      assert.strictEqual(list.head!.data, mockObject);
    });

    it('should handle various data types', () => {
      const numberList = new List<number>();
      numberList.push(42);
      const stringList = new List<string>();
      stringList.push('hello');
      const booleanList = new List<boolean>();
      booleanList.push(true);
      const objectList = new List<{ value: number }>();
      objectList.push({ value: 1 });

      assert.strictEqual(numberList.size, 1);
      assert.strictEqual(stringList.size, 1);
      assert.strictEqual(booleanList.size, 1);
      assert.strictEqual(objectList.size, 1);
    });
  });

  describe('Push method', () => {
    it('should push items to an empty list', () => {
      const list = new List<number>();
      list.push(1);

      assert.strictEqual(list.size, 1);
      assert.strictEqual(list.head!.data, 1);
      assert.strictEqual(list.tail!.data, 1);
      assert.strictEqual(list.head, list.tail);
    });

    it('should push multiple items and maintain order', () => {
      const list = new List<number>();
      list.push(1);
      list.push(2);
      list.push(3);

      assert.strictEqual(list.size, 3);
      assert.strictEqual(list.head!.data, 1);
      assert.strictEqual(list.tail!.data, 3);
      assert.deepStrictEqual(list.toArray(), [1, 2, 3]);
    });

    it('should update tail correctly when pushing', () => {
      const list = new List<string>();
      list.push('first');
      list.push('second');
      list.push('third');

      assert.strictEqual(list.tail!.data, 'third');
      assert.strictEqual(list.tail!.next, null);
    });
  });

  describe('Unshift method', () => {
    it('should unshift to an empty list', () => {
      const list = new List<number>();
      list.unshift(1);

      assert.strictEqual(list.size, 1);
      assert.strictEqual(list.head!.data, 1);
      assert.strictEqual(list.tail!.data, 1);
    });

    it('should unshift to a non-empty list', () => {
      const list = new List<number>();
      list.push(2);
      list.unshift(1);

      assert.strictEqual(list.size, 2);
      assert.strictEqual(list.head!.data, 1);
      assert.strictEqual(list.tail!.data, 2);
      assert.deepStrictEqual(list.toArray(), [1, 2]);
    });

    it('should maintain correct links when unshifting', () => {
      const list = new List<string>();
      list.push('middle');
      list.unshift('first');
      list.push('last');

      assert.deepStrictEqual(list.toArray(), ['first', 'middle', 'last']);
    });
  });

  describe('InsertAt method', () => {
    it('should insert at index 0 (equivalent to unshift)', () => {
      const list = new List<number>();
      list.push(2);
      list.insertAt(0, 1);

      assert.strictEqual(list.size, 2);
      assert.deepStrictEqual(list.toArray(), [1, 2]);
    });

    it('should insert at the end (equivalent to push)', () => {
      const list = new List<number>();
      list.push(1);
      list.insertAt(1, 2);

      assert.strictEqual(list.size, 2);
      assert.deepStrictEqual(list.toArray(), [1, 2]);
    });

    it('should insert in the middle', () => {
      const list = new List<number>();
      list.push(1);
      list.push(3);
      list.push(4);
      list.insertAt(1, 2);

      assert.strictEqual(list.size, 4);
      assert.deepStrictEqual(list.toArray(), [1, 2, 3, 4]);
    });

    it('should insert in the middle of a larger list', () => {
      const list = new List<number>();
      // Create a list [0, 1, 2, 3, 4]
      for (let i = 0; i < 5; i++) {
        list.push(i);
      }

      // Insert 99 at index 2 -> [0, 1, 99, 2, 3, 4]
      list.insertAt(2, 99);

      assert.strictEqual(list.size, 6);
      assert.deepStrictEqual(list.toArray(), [0, 1, 99, 2, 3, 4]);

      // Insert 88 at index 4 -> [0, 1, 99, 2, 88, 3, 4]
      list.insertAt(4, 88);

      assert.strictEqual(list.size, 7);
      assert.deepStrictEqual(list.toArray(), [0, 1, 99, 2, 88, 3, 4]);
    });

    it('should return null for negative index', () => {
      const list = new List<number>();
      list.push(1);
      assert.strictEqual(list.insertAt(-1, 0), null);
    });

    it('should return null for index greater than size', () => {
      const list = new List<number>();
      list.push(1);
      assert.strictEqual(list.insertAt(2, 0), null);
    });

    it('should handle inserting into empty list at index 0', () => {
      const list = new List<number>();
      list.insertAt(0, 42);

      assert.strictEqual(list.size, 1);
      assert.strictEqual(list.head!.data, 42);
      assert.strictEqual(list.tail!.data, 42);
    });

    it('should insert at index 1 in a single-element list', () => {
      const list = new List<number>();
      list.push(1);
      list.insertAt(1, 2);

      assert.strictEqual(list.size, 2);
      assert.deepStrictEqual(list.toArray(), [1, 2]);
    });
  });

  describe('Find method', () => {
    it('should find items by callback', () => {
      const list = new List<number>();
      list.push(1);
      list.push(2);
      list.push(3);
      list.push(4);

      assert.strictEqual(list.find(data => data === 1)!.data, 1);
      assert.strictEqual(list.find(data => data === 2)!.data, 2);
      assert.strictEqual(list.find(data => data === 3)!.data, 3);
      assert.strictEqual(list.find(data => data === 4)!.data, 4);
    });

    it('should return null if item not found', () => {
      const list = new List<number>();
      list.push(1);
      assert.strictEqual(list.find(data => data === 2), null);
    });

    it('should work on empty list', () => {
      const list = new List<number>();
      assert.strictEqual(list.find(data => data === 1), null);
    });
  });

  describe('RemoveAt method', () => {
    it('should remove the only item from the list', () => {
      const list = new List<number>();
      list.push(1);
      list.removeAt(0);

      assert.strictEqual(list.size, 0);
      assert.strictEqual(list.isEmpty(), true);
      assert.strictEqual(list.head, null);
      assert.strictEqual(list.tail, null);
    });

    it('should remove item from the beginning', () => {
      const list = new List<number>();
      list.push(1);
      list.push(2);
      list.push(3);

      list.removeAt(0);

      assert.strictEqual(list.size, 2);
      assert.deepStrictEqual(list.toArray(), [2, 3]);
      assert.strictEqual(list.head!.data, 2);
    });

    it('should remove item from the end', () => {
      const list = new List<number>();
      list.push(1);
      list.push(2);
      list.push(3);
      list.push(4);

      list.removeAt(3);

      assert.strictEqual(list.size, 3);
      assert.deepStrictEqual(list.toArray(), [1, 2, 3]);
      assert.strictEqual(list.tail!.data, 3);
    });

    it('should remove item from the middle', () => {
      const list = new List<number>();
      list.push(1);
      list.push(2);
      list.push(3);
      list.push(4);

      list.removeAt(2);

      assert.strictEqual(list.size, 3);
      assert.deepStrictEqual(list.toArray(), [1, 2, 4]);
    });

    it('should return null for negative index', () => {
      const list = new List<number>();
      list.push(1);
      assert.strictEqual(list.removeAt(-1), null);
    });

    it('should return null for index >= size', () => {
      const list = new List<number>();
      list.push(1);
      assert.strictEqual(list.removeAt(1), null);
    });

    it('should return null on empty list', () => {
      const list = new List<number>();
      assert.strictEqual(list.removeAt(0), null);
    });
  });

  describe('Clear method', () => {
    it('should clear all elements from the list', () => {
      const list = new List<number>();
      list.push(1);
      list.push(2);
      list.push(3);

      list.clear();

      assert.strictEqual(list.size, 0);
      assert.strictEqual(list.isEmpty(), true);
      assert.strictEqual(list.head, null);
      assert.strictEqual(list.tail, null);
    });

    it('should work on empty list', () => {
      const list = new List<number>();

      list.clear();

      assert.strictEqual(list.size, 0);
      assert.strictEqual(list.isEmpty(), true);
    });
  });

  describe('ToArray method', () => {
    it('should return empty array for empty list', () => {
      const list = new List<number>();
      const array = list.toArray();

      assert.deepStrictEqual(array, []);
    });

    it('should return array with all elements in correct order', () => {
      const list = new List<number>();
      list.push(1);
      list.push(2);
      list.push(3);
      list.push(4);

      const array = list.toArray();
      assert.deepStrictEqual(array, [1, 2, 3, 4]);
    });

    it('should return new array (not reference to internal structure)', () => {
      const list = new List<number>();
      list.push(1);
      const array1 = list.toArray();
      const array2 = list.toArray();

      assert.notStrictEqual(array1, array2); // Different array instances
      assert.deepStrictEqual(array1, array2); // Same content
    });
  });

  describe('Iterator functionality', () => {
    it('should be iterable with for...of loop', () => {
      const list = new List<number>();
      list.push(1);
      list.push(2);
      list.push(3);

      const result: number[] = [];
      for (const item of list) {
        result.push(item);
      }

      assert.deepStrictEqual(result, [1, 2, 3]);
    });

    it('should work with empty list iterator', () => {
      const list = new List<number>();

      const result: number[] = [];
      for (const item of list) {
        result.push(item);
      }

      assert.deepStrictEqual(result, []);
    });

    it('should work with spread operator', () => {
      const list = new List<string>();
      list.push('a');
      list.push('b');
      list.push('c');

      const array = [...list];
      assert.deepStrictEqual(array, ['a', 'b', 'c']);
    });

    it('should work with Array.from', () => {
      const list = new List<number>();
      list.push(10);
      list.push(20);

      const array = Array.from(list);
      assert.deepStrictEqual(array, [10, 20]);
    });
  });

  describe('IsEmpty method', () => {
    it('should return true for empty list', () => {
      const list = new List<number>();
      assert.strictEqual(list.isEmpty(), true);
    });

    it('should return false for non-empty list', () => {
      const list = new List<number>();
      list.push(1);
      assert.strictEqual(list.isEmpty(), false);
    });

    it('should return true after clearing list', () => {
      const list = new List<number>();
      list.push(1);
      list.push(2);
      list.clear();
      assert.strictEqual(list.isEmpty(), true);
    });
  });

  describe('Size property', () => {
    it('should track size correctly through various operations', () => {
      const list = new List<number>();
      assert.strictEqual(list.size, 0);

      list.push(1);
      assert.strictEqual(list.size, 1);

      list.unshift(0);
      assert.strictEqual(list.size, 2);

      list.insertAt(1, 0.5);
      assert.strictEqual(list.size, 3);

      list.removeAt(1);
      assert.strictEqual(list.size, 2);

      list.clear();
      assert.strictEqual(list.size, 0);
    });
  });

  describe('Tail property', () => {
    it('should track tail correctly', () => {
      const list = new List<number>();
      assert.strictEqual(list.tail, null);

      list.push(1);
      assert.strictEqual(list.tail!.data, 1);

      list.push(2);
      assert.strictEqual(list.tail!.data, 2);

      list.unshift(0);
      assert.strictEqual(list.tail!.data, 2); // Tail should not change

      list.removeAt(2); // Remove tail
      assert.strictEqual(list.tail!.data, 1);

      list.clear();
      assert.strictEqual(list.tail, null);
    });
  });

  describe('Edge cases and error handling', () => {
    it('should handle mixed data types correctly', () => {
      const list = new List<any>();
      list.push(1);
      list.push('string');
      list.push(true);
      list.push({ key: 'value' });

      assert.strictEqual(list.size, 4);
      assert.deepStrictEqual(list.toArray(), [1, 'string', true, { key: 'value' }]);
    });

    it('should maintain integrity after multiple operations', () => {
      const list = new List<number>();

      // Complex sequence of operations
      list.push(1);              // [1]
      list.unshift(0);           // [0, 1]
      list.insertAt(1, 0.5);       // [0, 0.5, 1]
      list.push(2);              // [0, 0.5, 1, 2]
      list.removeAt(0);            // [0.5, 1, 2]
      list.insertAt(0, -1);        // [-1, 0.5, 1, 2]

      assert.strictEqual(list.size, 4);
      assert.deepStrictEqual(list.toArray(), [-1, 0.5, 1, 2]);
      assert.strictEqual(list.head!.data, -1);
      assert.strictEqual(list.tail!.data, 2);
    });
  });

  // Legacy tests (keep for compatibility)
  it('should create a list', () => {
    const _list = new List<MockClass>();
    const _mockObject = new MockClass(1);
    _list.push(_mockObject);

    assert.ok(_list);
  });

  it('should false if the list is not empty', () => {
    const _list = new List<MockClass>();
    const _mockObject = new MockClass(1);
    _list.push(_mockObject);

    assert.strictEqual(_list.isEmpty(), false);
  });

  it('should push an item to the list', () => {
    const _list = new List<MockClass>();
    const _mockObject = new MockClass(1);

    _list.push(_mockObject);

    assert.strictEqual(_list.size, 1);
  });

  it('should remove the only item from the list, given its index', () => {
    const _list = new List<number>();
    _list.push(1);

    _list.removeAt(0);

    assert.strictEqual(_list.size, 0);
  });

  it('should find an item in the list, given its index', () => {
    const _list = new List<number>();
    _list.push(1);
    _list.push(2);
    _list.push(3);
    _list.push(4);

    const _item = _list.find(data => data === 3);
    assert.strictEqual(_item!.data, 3);
  });

  it('should remove an item from the list, given its index', () => {
    const _list = new List<number>();
    _list.push(1);
    _list.push(2);
    _list.push(3);
    _list.push(4);

    _list.removeAt(3);
    assert.strictEqual(_list.size, 3);
  });

  it('should return an array with the items in the list', () => {
    const _list = new List<number>();
    _list.push(1);
    _list.push(2);
    _list.push(3);
    _list.push(4);

    const _array = _list.toArray();

    assert.deepStrictEqual(_array, [1, 2, 3, 4]);
  });

  it('should return null if the index is out of bounds when finding', () => {
    const _list = new List<number>();
    _list.push(1);

    assert.strictEqual(_list.find(data => data === 2), null);
  });

  it('should return null if the index is out of bounds when removing', () => {
    const _list = new List<number>();
    _list.push(1);

    assert.strictEqual(_list.removeAt(1), null);
  });
});
