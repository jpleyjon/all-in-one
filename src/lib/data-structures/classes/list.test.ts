import { describe, it } from 'node:test';
import assert from 'node:assert';
import List from './list';
import MockClass from '../fixtures/mock-class';

describe('List', () => {
  describe('Constructor', () => {
    it('should create an empty list without data', () => {
      const list = new List<number>();

      assert.ok(list);
      assert.equal(list.size, 0);
      assert.equal(list.isEmpty(), true);
      assert.equal(list.head, null);
      assert.equal(list.tail, null);
    });

    it('should create a list with initial data', () => {
      const mockObject = new MockClass(1);
      const list = new List<MockClass>(mockObject);

      assert.ok(list);
      assert.equal(list.size, 1);
      assert.equal(list.isEmpty(), false);
      assert.ok(list.head);
      assert.equal(list.head, list.tail);
      assert.equal(list.head!.data, mockObject);
    });

    it('should handle various data types', () => {
      const numberList = new List<number>(42);
      const stringList = new List<string>('hello');
      const booleanList = new List<boolean>(true);
      const objectList = new List<{ value: number; }>({ value: 1 });

      assert.equal(numberList.size, 1);
      assert.equal(stringList.size, 1);
      assert.equal(booleanList.size, 1);
      assert.equal(objectList.size, 1);
    });
  });

  describe('Push method', () => {
    it('should push items to an empty list', () => {
      const list = new List<number>();
      list.push(1);

      assert.equal(list.size, 1);
      assert.equal(list.head!.data, 1);
      assert.equal(list.tail!.data, 1);
      assert.equal(list.head, list.tail);
    });

    it('should push multiple items and maintain order', () => {
      const list = new List<number>();
      list.push(1);
      list.push(2);
      list.push(3);

      assert.equal(list.size, 3);
      assert.equal(list.head!.data, 1);
      assert.equal(list.tail!.data, 3);
      assert.deepEqual(list.toArray(), [1, 2, 3]);
    });

    it('should update tail correctly when pushing', () => {
      const list = new List<string>('first');
      list.push('second');
      list.push('third');

      assert.equal(list.tail!.data, 'third');
      assert.equal(list.tail!.next, null);
    });
  });

  describe('Prepend method', () => {
    it('should prepend to an empty list', () => {
      const list = new List<number>();
      list.prepend(1);

      assert.equal(list.size, 1);
      assert.equal(list.head!.data, 1);
      assert.equal(list.tail!.data, 1);
    });

    it('should prepend to a non-empty list', () => {
      const list = new List<number>(2);
      list.prepend(1);

      assert.equal(list.size, 2);
      assert.equal(list.head!.data, 1);
      assert.equal(list.tail!.data, 2);
      assert.deepEqual(list.toArray(), [1, 2]);
    });

    it('should maintain correct links when prepending', () => {
      const list = new List<string>('middle');
      list.prepend('first');
      list.push('last');

      assert.deepEqual(list.toArray(), ['first', 'middle', 'last']);
    });
  });

  describe('Insert method', () => {
    it('should insert at index 0 (equivalent to prepend)', () => {
      const list = new List<number>(2);
      list.insert(0, 1);

      assert.equal(list.size, 2);
      assert.deepEqual(list.toArray(), [1, 2]);
    });

    it('should insert at the end (equivalent to push)', () => {
      const list = new List<number>(1);
      list.insert(1, 2);

      assert.equal(list.size, 2);
      assert.deepEqual(list.toArray(), [1, 2]);
    });

    it('should insert in the middle', () => {
      const list = new List<number>();
      list.push(1);
      list.push(3);
      list.push(4);
      list.insert(1, 2);

      assert.equal(list.size, 4);
      assert.deepEqual(list.toArray(), [1, 2, 3, 4]);
    });

    it('should insert in the middle of a larger list', () => {
      const list = new List<number>();
      // Create a list [0, 1, 2, 3, 4]
      for (let i = 0; i < 5; i++) {
        list.push(i);
      }
      
      // Insert 99 at index 2 -> [0, 1, 99, 2, 3, 4]
      list.insert(2, 99);
      
      assert.equal(list.size, 6);
      assert.deepEqual(list.toArray(), [0, 1, 99, 2, 3, 4]);
      
      // Insert 88 at index 4 -> [0, 1, 99, 2, 88, 3, 4]
      list.insert(4, 88);
      
      assert.equal(list.size, 7);
      assert.deepEqual(list.toArray(), [0, 1, 99, 2, 88, 3, 4]);
    });

    it('should throw error for negative index', () => {
      const list = new List<number>(1);
      assert.throws(() => list.insert(-1, 0), /Index out of bounds/);
    });

    it('should throw error for index greater than size', () => {
      const list = new List<number>(1);
      assert.throws(() => list.insert(2, 0), /Index out of bounds/);
    });

    it('should handle inserting into empty list at index 0', () => {
      const list = new List<number>();
      list.insert(0, 42);

      assert.equal(list.size, 1);
      assert.equal(list.head!.data, 42);
      assert.equal(list.tail!.data, 42);
    });

    it('should insert at index 1 in a single-element list', () => {
      const list = new List<number>(1);
      list.insert(1, 2);

      assert.equal(list.size, 2);
      assert.deepEqual(list.toArray(), [1, 2]);
    });
  });

  describe('Find method', () => {
    it('should find items by index', () => {
      const list = new List<number>(1);
      list.push(2);
      list.push(3);
      list.push(4);

      assert.equal(list.find(0), 1);
      assert.equal(list.find(1), 2);
      assert.equal(list.find(2), 3);
      assert.equal(list.find(3), 4);
    });

    it('should throw error for negative index', () => {
      const list = new List<number>(1);
      assert.throws(() => list.find(-1), /Index out of bounds/);
    });

    it('should throw error for index >= size', () => {
      const list = new List<number>(1);
      assert.throws(() => list.find(1), /Index out of bounds/);
      assert.throws(() => list.find(2), /Index out of bounds/);
    });

    it('should throw error on empty list', () => {
      const list = new List<number>();
      assert.throws(() => list.find(0), /Index out of bounds/);
    });
  });

  describe('IndexOf method', () => {
    it('should find index of existing elements', () => {
      const list = new List<string>('first');
      list.push('second');
      list.push('third');

      assert.equal(list.indexOf('first'), 0);
      assert.equal(list.indexOf('second'), 1);
      assert.equal(list.indexOf('third'), 2);
    });

    it('should return -1 for non-existing elements', () => {
      const list = new List<string>('first');
      list.push('second');

      assert.equal(list.indexOf('third'), -1);
      assert.equal(list.indexOf(''), -1);
    });

    it('should work with empty list', () => {
      const list = new List<number>();
      assert.equal(list.indexOf(1), -1);
    });

    it('should find first occurrence of duplicate elements', () => {
      const list = new List<number>(1);
      list.push(2);
      list.push(1);
      list.push(3);

      assert.equal(list.indexOf(1), 0); // First occurrence
    });

    it('should work with MockClass objects', () => {
      const obj1 = new MockClass(1);
      const obj2 = new MockClass(2);
      const obj3 = new MockClass(3);

      const list = new List<MockClass>(obj1);
      list.push(obj2);
      list.push(obj3);

      assert.equal(list.indexOf(obj1), 0);
      assert.equal(list.indexOf(obj2), 1);
      assert.equal(list.indexOf(obj3), 2);

      // Test with equivalent but different object instances
      const obj1Equivalent = new MockClass(1);
      assert.equal(list.indexOf(obj1Equivalent), 0); // Should find first occurrence with same value
    });
  });

  describe('Contains method', () => {
    it('should return true for existing elements', () => {
      const list = new List<string>('hello');
      list.push('world');

      assert.equal(list.contains('hello'), true);
      assert.equal(list.contains('world'), true);
    });

    it('should return false for non-existing elements', () => {
      const list = new List<string>('hello');

      assert.equal(list.contains('world'), false);
      assert.equal(list.contains(''), false);
    });

    it('should work with empty list', () => {
      const list = new List<number>();
      assert.equal(list.contains(1), false);
    });
  });

  describe('Remove method', () => {
    it('should remove the only item from the list', () => {
      const list = new List<number>(1);
      list.remove(0);

      assert.equal(list.size, 0);
      assert.equal(list.isEmpty(), true);
      assert.equal(list.head, null);
      assert.equal(list.tail, null);
    });

    it('should remove item from the beginning', () => {
      const list = new List<number>(1);
      list.push(2);
      list.push(3);

      list.remove(0);

      assert.equal(list.size, 2);
      assert.deepEqual(list.toArray(), [2, 3]);
      assert.equal(list.head!.data, 2);
    });

    it('should remove item from the end', () => {
      const list = new List<number>(1);
      list.push(2);
      list.push(3);
      list.push(4);

      list.remove(3);

      assert.equal(list.size, 3);
      assert.deepEqual(list.toArray(), [1, 2, 3]);
      assert.equal(list.tail!.data, 3);
    });

    it('should remove item from the middle', () => {
      const list = new List<number>(1);
      list.push(2);
      list.push(3);
      list.push(4);

      list.remove(2);

      assert.equal(list.size, 3);
      assert.deepEqual(list.toArray(), [1, 2, 4]);
    });

    it('should throw error for negative index', () => {
      const list = new List<number>(1);
      assert.throws(() => list.remove(-1), /Index out of bounds/);
    });

    it('should throw error for index >= size', () => {
      const list = new List<number>(1);
      assert.throws(() => list.remove(1), /Index out of bounds/);
    });

    it('should throw error on empty list', () => {
      const list = new List<number>();
      assert.throws(() => list.remove(0), /Index out of bounds/);
    });
  });

  describe('RemoveData method', () => {
    it('should remove existing data and return true', () => {
      const list = new List<string>('first');
      list.push('second');
      list.push('third');

      const result = list.removeData('second');

      assert.equal(result, true);
      assert.equal(list.size, 2);
      assert.deepEqual(list.toArray(), ['first', 'third']);
    });

    it('should return false for non-existing data', () => {
      const list = new List<string>('first');
      list.push('second');

      const result = list.removeData('third');

      assert.equal(result, false);
      assert.equal(list.size, 2);
    });

    it('should remove first occurrence of duplicate data', () => {
      const list = new List<number>(1);
      list.push(2);
      list.push(1);
      list.push(3);

      const result = list.removeData(1);

      assert.equal(result, true);
      assert.equal(list.size, 3);
      assert.deepEqual(list.toArray(), [2, 1, 3]); // First occurrence removed
    });

    it('should work with empty list', () => {
      const list = new List<number>();
      const result = list.removeData(1);

      assert.equal(result, false);
      assert.equal(list.size, 0);
    });
  });

  describe('Clear method', () => {
    it('should clear all elements from the list', () => {
      const list = new List<number>(1);
      list.push(2);
      list.push(3);

      list.clear();

      assert.equal(list.size, 0);
      assert.equal(list.isEmpty(), true);
      assert.equal(list.head, null);
      assert.equal(list.tail, null);
    });

    it('should work on empty list', () => {
      const list = new List<number>();

      list.clear();

      assert.equal(list.size, 0);
      assert.equal(list.isEmpty(), true);
    });
  });

  describe('ToArray method', () => {
    it('should return empty array for empty list', () => {
      const list = new List<number>();
      const array = list.toArray();

      assert.deepEqual(array, []);
    });

    it('should return array with all elements in correct order', () => {
      const list = new List<number>(1);
      list.push(2);
      list.push(3);
      list.push(4);

      const array = list.toArray();
      assert.deepEqual(array, [1, 2, 3, 4]);
    });

    it('should return new array (not reference to internal structure)', () => {
      const list = new List<number>(1);
      const array1 = list.toArray();
      const array2 = list.toArray();

      assert.notEqual(array1, array2); // Different array instances
      assert.deepEqual(array1, array2); // Same content
    });
  });

  describe('ToString method', () => {
    it('should return string representation for empty list', () => {
      const list = new List<number>();
      assert.equal(list.toString(), 'List(0)[]');
    });

    it('should return string representation with elements', () => {
      const list = new List<number>(1);
      list.push(2);
      list.push(3);

      assert.equal(list.toString(), 'List(3)[1, 2, 3]');
    });

    it('should handle string elements', () => {
      const list = new List<string>('hello');
      list.push('world');

      assert.equal(list.toString(), 'List(2)[hello, world]');
    });
  });

  describe('ToJSON method', () => {
    it('should return JSON representation for empty list', () => {
      const list = new List<number>();
      const json = list.toJSON();

      assert.deepEqual(json, { size: 0, data: [] });
    });

    it('should return JSON representation with elements', () => {
      const list = new List<number>(1);
      list.push(2);
      list.push(3);

      const json = list.toJSON();
      assert.deepEqual(json, { size: 3, data: [1, 2, 3] });
    });

    it('should handle complex objects', () => {
      const list = new List<{ name: string, value: number; }>();
      list.push({ name: 'test', value: 42 });

      const json = list.toJSON();
      assert.deepEqual(json, {
        size: 1,
        data: [{ name: 'test', value: 42 }]
      });
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

      assert.deepEqual(result, [1, 2, 3]);
    });

    it('should work with empty list iterator', () => {
      const list = new List<number>();

      const result: number[] = [];
      for (const item of list) {
        result.push(item);
      }

      assert.deepEqual(result, []);
    });

    it('should work with spread operator', () => {
      const list = new List<string>();
      list.push('a');
      list.push('b');
      list.push('c');

      const array = [...list];
      assert.deepEqual(array, ['a', 'b', 'c']);
    });

    it('should work with Array.from', () => {
      const list = new List<number>();
      list.push(10);
      list.push(20);

      const array = Array.from(list);
      assert.deepEqual(array, [10, 20]);
    });
  });

  describe('IsEmpty method', () => {
    it('should return true for empty list', () => {
      const list = new List<number>();
      assert.equal(list.isEmpty(), true);
    });

    it('should return false for non-empty list', () => {
      const list = new List<number>(1);
      assert.equal(list.isEmpty(), false);
    });

    it('should return true after clearing list', () => {
      const list = new List<number>(1);
      list.push(2);
      list.clear();
      assert.equal(list.isEmpty(), true);
    });
  });

  describe('Size property', () => {
    it('should track size correctly through various operations', () => {
      const list = new List<number>();
      assert.equal(list.size, 0);

      list.push(1);
      assert.equal(list.size, 1);

      list.prepend(0);
      assert.equal(list.size, 2);

      list.insert(1, 0.5);
      assert.equal(list.size, 3);

      list.remove(1);
      assert.equal(list.size, 2);

      list.removeData(1);
      assert.equal(list.size, 1);

      list.clear();
      assert.equal(list.size, 0);
    });
  });

  describe('Tail property', () => {
    it('should track tail correctly', () => {
      const list = new List<number>();
      assert.equal(list.tail, null);

      list.push(1);
      assert.equal(list.tail!.data, 1);

      list.push(2);
      assert.equal(list.tail!.data, 2);

      list.prepend(0);
      assert.equal(list.tail!.data, 2); // Tail should not change

      list.remove(2); // Remove tail
      assert.equal(list.tail!.data, 1);

      list.clear();
      assert.equal(list.tail, null);
    });
  });

  describe('Edge cases and error handling', () => {
    it('should handle mixed data types correctly', () => {
      const list = new List<any>();
      list.push(1);
      list.push('string');
      list.push(true);
      list.push({ key: 'value' });

      assert.equal(list.size, 4);
      assert.deepEqual(list.toArray(), [1, 'string', true, { key: 'value' }]);
    });

    it('should maintain integrity after multiple operations', () => {
      const list = new List<number>();

      // Complex sequence of operations
      list.push(1);              // [1]
      list.prepend(0);           // [0, 1]
      list.insert(1, 0.5);       // [0, 0.5, 1]
      list.push(2);              // [0, 0.5, 1, 2]
      list.remove(0);            // [0.5, 1, 2]
      list.removeData(0.5);      // [1, 2]
      list.insert(0, -1);        // [-1, 1, 2]

      assert.equal(list.size, 3);
      assert.deepEqual(list.toArray(), [-1, 1, 2]);
      assert.equal(list.head!.data, -1);
      assert.equal(list.tail!.data, 2);
    });
  });

  // Legacy tests (keep for compatibility)
  it('should create a list', () => {
    const _mockObject = new MockClass(1);
    const _list = new List<MockClass>(_mockObject);

    assert.ok(_list);
  });

  it('should false if the list is not empty', () => {
    const _mockObject = new MockClass(1);
    const _list = new List<MockClass>(_mockObject);

    assert.equal(_list.isEmpty(), false);
  });

  it('should push an item to the list', () => {
    const _mockObject = new MockClass(1);
    const _list = new List<MockClass>();

    _list.push(_mockObject);

    assert.equal(_list.size, 1);
  });

  it('should remove the only item from the list, given its index', () => {
    const _list = new List<number>(1);

    _list.remove(0);

    assert.equal(_list.size, 0);
  });

  it('should find an item in the list, given its index', () => {
    const _list = new List<number>(1);

    _list.push(2);
    _list.push(3);
    _list.push(4);

    const _item = _list.find(2);
    assert.equal(_item, 3);
  });

  it('should remove an item from the list, given its index', () => {
    const _list = new List<number>(1);

    _list.push(2);
    _list.push(3);
    _list.push(4);

    _list.remove(3);
    assert.equal(_list.size, 3);
  });

  it('should return an array with the items in the list', () => {
    const _list = new List<number>(1);

    _list.push(2);
    _list.push(3);
    _list.push(4);

    const _array = _list.toArray();

    assert.deepEqual(_array, [1, 2, 3, 4]);
  });

  it('should throw an error if the index is out of bounds finding', () => {
    const _list = new List<number>(1);

    assert.throws(() => {
      _list.find(1);
    });

    assert.throws(() => {
      _list.find(2);
    });
  });

  it('should throw an error if the index is out of bounds when removing', () => {
    const _list = new List<number>(1);

    assert.throws(() => {
      _list.remove(1);
    });
  });
});
