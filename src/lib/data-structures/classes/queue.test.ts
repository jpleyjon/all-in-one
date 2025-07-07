import { describe, it } from 'node:test';
import assert from 'node:assert';
import Queue, { QueueUnderflowError } from './queue';
import MockClass from '../fixtures/mock-class';

describe('Queue', () => {
  describe('Constructor', () => {
    it('should create an empty queue without data', () => {
      const queue = new Queue<number>();
      
      assert.ok(queue);
      assert.equal(queue.size, 0);
      assert.equal(queue.isEmpty(), true);
      assert.equal(queue.head, null);
      assert.equal(queue.tail, null);
    });

    it('should create a queue with initial data', () => {
      const mockObject = new MockClass(1);
      const queue = new Queue<MockClass>(mockObject);

      assert.ok(queue);
      assert.equal(queue.size, 1);
      assert.equal(queue.isEmpty(), false);
      assert.ok(queue.head);
      assert.equal(queue.head, queue.tail);
      assert.equal(queue.head!.data, mockObject);
    });

    it('should handle various data types', () => {
      const numberQueue = new Queue<number>(42);
      const stringQueue = new Queue<string>('hello');
      const booleanQueue = new Queue<boolean>(true);
      const objectQueue = new Queue<{ value: number }>({ value: 1 });

      assert.equal(numberQueue.size, 1);
      assert.equal(stringQueue.size, 1);
      assert.equal(booleanQueue.size, 1);
      assert.equal(objectQueue.size, 1);
    });
  });

  describe('Push method (enqueue)', () => {
    it('should push items to an empty queue', () => {
      const queue = new Queue<number>();
      queue.push(1);

      assert.equal(queue.size, 1);
      assert.equal(queue.head!.data, 1);
      assert.equal(queue.tail!.data, 1);
      assert.equal(queue.head, queue.tail);
    });

    it('should push multiple items and maintain FIFO order', () => {
      const queue = new Queue<number>();
      queue.push(1);
      queue.push(2);
      queue.push(3);

      assert.equal(queue.size, 3);
      assert.equal(queue.head!.data, 1); // First in
      assert.equal(queue.tail!.data, 3); // Last in
      assert.deepEqual(queue.toArray(), [1, 2, 3]);
    });

    it('should update tail correctly when pushing', () => {
      const queue = new Queue<string>('first');
      queue.push('second');
      queue.push('third');

      assert.equal(queue.tail!.data, 'third');
      assert.equal(queue.tail!.next, null);
    });
  });

  describe('Pop method (dequeue)', () => {
    it('should pop items in FIFO order', () => {
      const queue = new Queue<number>();
      queue.push(1);
      queue.push(2);
      queue.push(3);

      assert.equal(queue.pop(), 1); // First in, first out
      assert.equal(queue.pop(), 2);
      assert.equal(queue.size, 1);
      assert.equal(queue.head!.data, 3);
    });

    it('should pop the only item and update queue state', () => {
      const queue = new Queue<number>(42);
      const result = queue.pop();

      assert.equal(result, 42);
      assert.equal(queue.size, 0);
      assert.equal(queue.isEmpty(), true);
      assert.equal(queue.head, null);
      assert.equal(queue.tail, null);
    });

    it('should throw error when popping from empty queue', () => {
      const queue = new Queue<number>();
      
      assert.throws(
        () => queue.pop(),
        {
          name: 'QueueUnderflowError',
          message: 'Cannot dequeue from an empty queue.'
        }
      );
    });

    it('should maintain correct tail reference after multiple operations', () => {
      const queue = new Queue<string>();
      queue.push('first');
      queue.push('second');
      queue.push('third');

      queue.pop(); // Remove 'first'
      assert.equal(queue.head!.data, 'second');
      assert.equal(queue.tail!.data, 'third');
      assert.equal(queue.size, 2);
    });
  });

  describe('Peek method', () => {
    it('should return front element without removing it', () => {
      const queue = new Queue<string>();
      queue.push('first');
      queue.push('second');

      assert.equal(queue.peek(), 'first');
      assert.equal(queue.size, 2); // Size unchanged
      assert.equal(queue.head!.data, 'first');
    });

    it('should throw error when peeking at empty queue', () => {
      const queue = new Queue<number>();
      
      assert.throws(
        () => queue.peek(),
        {
          name: 'QueueUnderflowError',
          message: 'Cannot peek at an empty queue.'
        }
      );
    });

    it('should work with single element queue', () => {
      const queue = new Queue<number>(42);
      
      assert.equal(queue.peek(), 42);
      assert.equal(queue.size, 1);
    });
  });

  describe('Rear method', () => {
    it('should return rear element without removing it', () => {
      const queue = new Queue<string>();
      queue.push('first');
      queue.push('second');

      assert.equal(queue.rear(), 'second');
      assert.equal(queue.size, 2); // Size unchanged
      assert.equal(queue.tail!.data, 'second');
    });

    it('should throw error when accessing rear of empty queue', () => {
      const queue = new Queue<number>();
      
      assert.throws(
        () => queue.rear(),
        {
          name: 'QueueUnderflowError',
          message: 'Cannot access rear of an empty queue.'
        }
      );
    });

    it('should work with single element queue', () => {
      const queue = new Queue<number>(42);
      
      assert.equal(queue.rear(), 42);
      assert.equal(queue.size, 1);
    });
  });

  describe('Clear method', () => {
    it('should clear all elements from the queue', () => {
      const queue = new Queue<number>();
      queue.push(1);
      queue.push(2);
      queue.push(3);

      queue.clear();

      assert.equal(queue.size, 0);
      assert.equal(queue.isEmpty(), true);
      assert.equal(queue.head, null);
      assert.equal(queue.tail, null);
    });

    it('should work on empty queue', () => {
      const queue = new Queue<number>();
      
      queue.clear();

      assert.equal(queue.size, 0);
      assert.equal(queue.isEmpty(), true);
    });
  });

  describe('Contains method', () => {
    it('should return true for existing elements', () => {
      const queue = new Queue<string>();
      queue.push('first');
      queue.push('second');
      queue.push('third');

      assert.equal(queue.contains('first'), true);
      assert.equal(queue.contains('second'), true);
      assert.equal(queue.contains('third'), true);
    });

    it('should return false for non-existing elements', () => {
      const queue = new Queue<string>();
      queue.push('first');
      queue.push('second');

      assert.equal(queue.contains('third'), false);
      assert.equal(queue.contains(''), false);
    });

    it('should work with empty queue', () => {
      const queue = new Queue<number>();
      assert.equal(queue.contains(1), false);
    });

    it('should work with MockClass objects using isEqual', () => {
      const queue = new Queue<MockClass>();
      const obj1 = new MockClass(1);
      const obj2 = new MockClass(2);
      const obj3 = new MockClass(1); // Same value as obj1

      queue.push(obj1);
      queue.push(obj2);

      assert.equal(queue.contains(obj3), true); // Should find obj1 via isEqual
      assert.equal(queue.contains(new MockClass(3)), false);
    });
  });

  describe('IsEmpty method', () => {
    it('should return true for empty queue', () => {
      const queue = new Queue<number>();
      assert.equal(queue.isEmpty(), true);
    });

    it('should return false for non-empty queue', () => {
      const queue = new Queue<number>(1);
      assert.equal(queue.isEmpty(), false);
    });

    it('should return true after clearing queue', () => {
      const queue = new Queue<number>();
      queue.push(1);
      queue.push(2);
      queue.clear();
      assert.equal(queue.isEmpty(), true);
    });

    it('should return true after popping all elements', () => {
      const queue = new Queue<number>();
      queue.push(1);
      queue.push(2);
      
      queue.pop();
      queue.pop();
      
      assert.equal(queue.isEmpty(), true);
    });
  });

  describe('ToArray method', () => {
    it('should return empty array for empty queue', () => {
      const queue = new Queue<number>();
      const array = queue.toArray();

      assert.deepEqual(array, []);
    });

    it('should return array with all elements in FIFO order', () => {
      const queue = new Queue<number>();
      queue.push(1);
      queue.push(2);
      queue.push(3);

      const array = queue.toArray();
      assert.deepEqual(array, [1, 2, 3]);
    });

    it('should return new array (not reference to internal structure)', () => {
      const queue = new Queue<number>();
      queue.push(1);
      const array1 = queue.toArray();
      const array2 = queue.toArray();

      assert.notEqual(array1, array2); // Different array instances
      assert.deepEqual(array1, array2); // Same content
    });
  });

  describe('ToString method', () => {
    it('should return string representation for empty queue', () => {
      const queue = new Queue<number>();
      assert.equal(queue.toString(), 'Queue(0)[]');
    });

    it('should return string representation with elements', () => {
      const queue = new Queue<number>();
      queue.push(1);
      queue.push(2);
      queue.push(3);

      assert.equal(queue.toString(), 'Queue(3)[1, 2, 3]');
    });

    it('should handle string elements', () => {
      const queue = new Queue<string>();
      queue.push('hello');
      queue.push('world');

      assert.equal(queue.toString(), 'Queue(2)[hello, world]');
    });
  });

  describe('ToJSON method', () => {
    it('should return JSON representation for empty queue', () => {
      const queue = new Queue<number>();
      const json = queue.toJSON();

      assert.deepEqual(json, { size: 0, data: [] });
    });

    it('should return JSON representation with elements', () => {
      const queue = new Queue<number>();
      queue.push(1);
      queue.push(2);
      queue.push(3);

      const json = queue.toJSON();
      assert.deepEqual(json, { size: 3, data: [1, 2, 3] });
    });

    it('should handle complex objects', () => {
      const queue = new Queue<{ name: string, value: number }>();
      queue.push({ name: 'test', value: 42 });

      const json = queue.toJSON();
      assert.deepEqual(json, { 
        size: 1, 
        data: [{ name: 'test', value: 42 }] 
      });
    });
  });

  describe('Iterator functionality', () => {
    it('should be iterable with for...of loop', () => {
      const queue = new Queue<number>();
      queue.push(1);
      queue.push(2);
      queue.push(3);

      const result: number[] = [];
      for (const item of queue) {
        result.push(item);
      }

      assert.deepEqual(result, [1, 2, 3]);
    });

    it('should work with empty queue iterator', () => {
      const queue = new Queue<number>();

      const result: number[] = [];
      for (const item of queue) {
        result.push(item);
      }

      assert.deepEqual(result, []);
    });

    it('should work with spread operator', () => {
      const queue = new Queue<string>();
      queue.push('a');
      queue.push('b');
      queue.push('c');

      const array = [...queue];
      assert.deepEqual(array, ['a', 'b', 'c']);
    });

    it('should work with Array.from', () => {
      const queue = new Queue<number>();
      queue.push(10);
      queue.push(20);

      const array = Array.from(queue);
      assert.deepEqual(array, [10, 20]);
    });
  });

  describe('Size property', () => {
    it('should track size correctly through various operations', () => {
      const queue = new Queue<number>();
      assert.equal(queue.size, 0);

      queue.push(1);
      assert.equal(queue.size, 1);

      queue.push(2);
      assert.equal(queue.size, 2);

      queue.pop();
      assert.equal(queue.size, 1);

      queue.clear();
      assert.equal(queue.size, 0);
    });
  });

  describe('Tail property', () => {
    it('should track tail correctly', () => {
      const queue = new Queue<number>();
      assert.equal(queue.tail, null);

      queue.push(1);
      assert.equal(queue.tail!.data, 1);

      queue.push(2);
      assert.equal(queue.tail!.data, 2);

      queue.pop(); // Remove from front
      assert.equal(queue.tail!.data, 2); // Tail should not change

      queue.pop(); // Remove last element
      assert.equal(queue.tail, null);
    });
  });

  describe('FIFO behavior verification', () => {
    it('should maintain strict FIFO order', () => {
      const queue = new Queue<string>();
      const items = ['first', 'second', 'third', 'fourth'];

      // Enqueue all items
      items.forEach(item => queue.push(item));

      // Dequeue all items and verify order
      const results: string[] = [];
      while (!queue.isEmpty()) {
        results.push(queue.pop());
      }

      assert.deepEqual(results, items);
    });

    it('should handle mixed push/pop operations correctly', () => {
      const queue = new Queue<number>();

      queue.push(1);
      queue.push(2);
      assert.equal(queue.pop(), 1);

      queue.push(3);
      queue.push(4);
      assert.equal(queue.pop(), 2);
      assert.equal(queue.pop(), 3);

      queue.push(5);
      assert.equal(queue.pop(), 4);
      assert.equal(queue.pop(), 5);

      assert.equal(queue.isEmpty(), true);
    });
  });

  describe('Edge cases and error handling', () => {
    it('should handle mixed data types correctly', () => {
      const queue = new Queue<any>();
      queue.push(1);
      queue.push('string');
      queue.push(true);
      queue.push({ key: 'value' });
      queue.push([1, 2, 3]);

      assert.equal(queue.size, 5);
      assert.deepEqual(queue.toArray(), [1, 'string', true, { key: 'value' }, [1, 2, 3]]);
    });

    it('should maintain integrity after complex operations', () => {
      const queue = new Queue<number>();
      
      // Complex sequence of operations
      queue.push(1);
      queue.push(2);
      queue.pop(); // Remove 1
      queue.push(3);
      queue.push(4);
      queue.pop(); // Remove 2

      assert.equal(queue.size, 2);
      assert.deepEqual(queue.toArray(), [3, 4]);
      assert.equal(queue.head!.data, 3);
      assert.equal(queue.tail!.data, 4);
    });
  });

  // Legacy tests for backward compatibility
  describe('Legacy tests', () => {
    it('should create a queue', () => {
      const _mockObject = new MockClass(1);
      const _queue = new Queue<MockClass>(_mockObject);

      assert.ok(_queue);
    });

    it('should false if the queue is not empty', () => {
      const _mockObject = new MockClass(1);
      const _queue = new Queue<MockClass>(_mockObject);

      assert.equal(_queue.isEmpty(), false);
    });

    it('should true if the queue is empty', () => {
      const _queue = new Queue<MockClass>();

      assert.equal(_queue.isEmpty(), true);
    });

    it('should push an item to the queue', () => {
      const _mockObject = new MockClass(1);
      const _queue = new Queue<MockClass>();

      _queue.push(_mockObject);

      assert.equal(_queue.size, 1);
    });

    it('should pop an item from the queue', () => {
      const _mockObject = new MockClass(1);
      const _queue = new Queue<MockClass>();

      _queue.push(_mockObject);
      const _element = _queue.pop();

      assert.ok(_element);
      assert.equal(_element.mockProperty, 1);
      assert.equal(_queue.size, 0);
    });

    it('should pop the first item pushed to the queue (FIFO)', () => {
      const _mockObjectOne = new MockClass(1);
      const _mockObjectTwo = new MockClass(2);
      const _queue = new Queue<MockClass>();

      _queue.push(_mockObjectOne);
      _queue.push(_mockObjectTwo);
      const _element = _queue.pop();

      assert.ok(_element);
      assert.equal(_element.mockProperty, 1); // First in, first out
    });
  });
});
