import { describe, it } from 'node:test';
import assert from 'node:assert';
import Stack, { StackUnderflowError } from './stack';
import MockClass from '../fixtures/mock-class';

describe('Stack', () => {
  describe('Constructor', () => {
    it('should create an empty stack without data', () => {
      const stack = new Stack<number>();
      
      assert.ok(stack);
      assert.strictEqual(stack.isEmpty(), true);
      assert.strictEqual(stack.size, 0);
    });

    it('should create a stack with initial data', () => {
      const mockObject = new MockClass(42);
      const stack = new Stack<MockClass>(mockObject);
      
      assert.ok(stack);
      assert.strictEqual(stack.isEmpty(), false);
      assert.strictEqual(stack.size, 1);
      assert.deepStrictEqual(stack.peek(), mockObject);
    });

    it('should handle various data types', () => {
      const stringStack = new Stack<string>('hello');
      const numberStack = new Stack<number>(123);
      const booleanStack = new Stack<boolean>(true);
      
      assert.strictEqual(stringStack.peek(), 'hello');
      assert.strictEqual(numberStack.peek(), 123);
      assert.strictEqual(booleanStack.peek(), true);
    });

    it('should handle undefined as initial data (creates empty stack)', () => {
      const stack = new Stack<undefined>(undefined);
      
      // undefined is treated as no data, creates empty stack
      assert.strictEqual(stack.size, 0);
      assert.strictEqual(stack.isEmpty(), true);
      assert.strictEqual(stack.head, null);
    });
  });

  describe('Push method', () => {
    it('should push items to an empty stack', () => {
      const stack = new Stack<number>();
      
      stack.push(1);
      assert.strictEqual(stack.size, 1);
      assert.strictEqual(stack.isEmpty(), false);
      assert.strictEqual(stack.peek(), 1);
    });

    it('should push multiple items and maintain LIFO order', () => {
      const stack = new Stack<number>();
      
      stack.push(1);
      stack.push(2);
      stack.push(3);
      
      assert.strictEqual(stack.size, 3);
      assert.strictEqual(stack.peek(), 3); // Last in should be on top
    });

    it('should handle object types correctly', () => {
      const stack = new Stack<MockClass>();
      const obj1 = new MockClass(1);
      const obj2 = new MockClass(2);
      
      stack.push(obj1);
      stack.push(obj2);
      
      assert.strictEqual(stack.size, 2);
      assert.deepStrictEqual(stack.peek(), obj2);
    });
  });

  describe('Pop method', () => {
    it('should pop items in LIFO order', () => {
      const stack = new Stack<number>();
      
      stack.push(1);
      stack.push(2);
      stack.push(3);
      
      assert.strictEqual(stack.pop(), 3);
      assert.strictEqual(stack.pop(), 2);
      assert.strictEqual(stack.pop(), 1);
      assert.strictEqual(stack.size, 0);
      assert.strictEqual(stack.isEmpty(), true);
    });

    it('should pop the only item and update stack state', () => {
      const stack = new Stack<string>('only');
      
      assert.strictEqual(stack.pop(), 'only');
      assert.strictEqual(stack.size, 0);
      assert.strictEqual(stack.isEmpty(), true);
    });

    it('should throw StackUnderflowError when popping from empty stack', () => {
      const stack = new Stack<number>();
      
      assert.throws(
        () => stack.pop(),
        StackUnderflowError,
        'Cannot pop from an empty stack'
      );
    });

    it('should handle mixed push/pop operations correctly', () => {
      const stack = new Stack<number>();
      
      stack.push(1);
      stack.push(2);
      assert.strictEqual(stack.pop(), 2);
      
      stack.push(3);
      assert.strictEqual(stack.pop(), 3);
      assert.strictEqual(stack.pop(), 1);
      
      assert.strictEqual(stack.size, 0);
    });
  });

  describe('Peek method', () => {
    it('should return top element without removing it', () => {
      const stack = new Stack<number>();
      
      stack.push(1);
      stack.push(2);
      
      assert.strictEqual(stack.peek(), 2);
      assert.strictEqual(stack.size, 2); // Size should remain unchanged
      assert.strictEqual(stack.peek(), 2); // Should still return same element
    });

    it('should throw StackUnderflowError when peeking at empty stack', () => {
      const stack = new Stack<number>();
      
      assert.throws(
        () => stack.peek(),
        StackUnderflowError,
        'Cannot peek at an empty stack'
      );
    });

    it('should work with single element stack', () => {
      const stack = new Stack<string>();
      
      stack.push('single');
      assert.strictEqual(stack.peek(), 'single');
      assert.strictEqual(stack.size, 1);
    });
  });

  describe('Top method (alias for peek)', () => {
    it('should behave identically to peek', () => {
      const stack = new Stack<number>();
      
      stack.push(42);
      assert.strictEqual(stack.top(), stack.peek());
      assert.strictEqual(stack.top(), 42);
    });

    it('should throw error for empty stack', () => {
      const stack = new Stack<number>();
      
      assert.throws(
        () => stack.top(),
        StackUnderflowError
      );
    });
  });

  describe('Contains method', () => {
    it('should return true for existing elements', () => {
      const stack = new Stack<number>();
      
      stack.push(1);
      stack.push(2);
      stack.push(3);
      
      assert.strictEqual(stack.contains(1), true);
      assert.strictEqual(stack.contains(2), true);
      assert.strictEqual(stack.contains(3), true);
    });

    it('should return false for non-existing elements', () => {
      const stack = new Stack<number>();
      
      stack.push(1);
      stack.push(2);
      
      assert.strictEqual(stack.contains(3), false);
      assert.strictEqual(stack.contains(0), false);
    });

    it('should work with empty stack', () => {
      const stack = new Stack<number>();
      
      assert.strictEqual(stack.contains(1), false);
    });

    it('should work with MockClass objects using hasData', () => {
      const stack = new Stack<MockClass>();
      const obj1 = new MockClass(1);
      const obj2 = new MockClass(2);
      const obj3 = new MockClass(1); // Same value as obj1
      
      stack.push(obj1);
      stack.push(obj2);
      
      assert.strictEqual(stack.contains(obj1), true);
      assert.strictEqual(stack.contains(obj3), true); // Should use hasData comparison
      assert.strictEqual(stack.contains(new MockClass(99)), false);
    });
  });

  describe('Clear method', () => {
    it('should clear all elements from the stack', () => {
      const stack = new Stack<number>();
      
      stack.push(1);
      stack.push(2);
      stack.push(3);
      
      stack.clear();
      
      assert.strictEqual(stack.size, 0);
      assert.strictEqual(stack.isEmpty(), true);
      assert.throws(() => stack.peek(), StackUnderflowError);
    });

    it('should work on empty stack', () => {
      const stack = new Stack<number>();
      
      stack.clear(); // Should not throw error
      
      assert.strictEqual(stack.size, 0);
      assert.strictEqual(stack.isEmpty(), true);
    });
  });

  describe('IsEmpty method', () => {
    it('should return true for empty stack', () => {
      const stack = new Stack<number>();
      
      assert.strictEqual(stack.isEmpty(), true);
    });

    it('should return false for non-empty stack', () => {
      const stack = new Stack<number>();
      
      stack.push(1);
      assert.strictEqual(stack.isEmpty(), false);
    });

    it('should return true after clearing stack', () => {
      const stack = new Stack<number>();
      
      stack.push(1);
      stack.push(2);
      stack.clear();
      
      assert.strictEqual(stack.isEmpty(), true);
    });

    it('should return true after popping all elements', () => {
      const stack = new Stack<number>();
      
      stack.push(1);
      stack.push(2);
      stack.pop();
      stack.pop();
      
      assert.strictEqual(stack.isEmpty(), true);
    });
  });

  describe('ToArray method', () => {
    it('should return empty array for empty stack', () => {
      const stack = new Stack<number>();
      
      const array = stack.toArray();
      assert.ok(Array.isArray(array));
      assert.strictEqual(array.length, 0);
    });

    it('should return array with all elements in LIFO order (top to bottom)', () => {
      const stack = new Stack<number>();
      
      stack.push(1);
      stack.push(2);
      stack.push(3);
      
      const array = stack.toArray();
      assert.deepStrictEqual(array, [3, 2, 1]); // Top to bottom
    });

    it('should return new array (not reference to internal structure)', () => {
      const stack = new Stack<number>();
      
      stack.push(1);
      stack.push(2);
      
      const array1 = stack.toArray();
      const array2 = stack.toArray();
      
      assert.notStrictEqual(array1, array2); // Different references
      assert.deepStrictEqual(array1, array2); // Same content
      
      array1.push(999);
      assert.notDeepStrictEqual(array1, array2); // Modification doesn't affect other
    });
  });

  describe('ToString method', () => {
    it('should return string representation for empty stack', () => {
      const stack = new Stack<number>();
      
      assert.strictEqual(stack.toString(), 'Stack(0) []');
    });

    it('should return string representation with elements', () => {
      const stack = new Stack<number>();
      
      stack.push(1);
      stack.push(2);
      stack.push(3);
      
      assert.strictEqual(stack.toString(), 'Stack(3) [3, 2, 1]');
    });

    it('should handle string elements', () => {
      const stack = new Stack<string>();
      
      stack.push('a');
      stack.push('b');
      
      assert.strictEqual(stack.toString(), 'Stack(2) [b, a]');
    });
  });

  describe('ToJSON method', () => {
    it('should return JSON representation for empty stack', () => {
      const stack = new Stack<number>();
      
      const json = stack.toJSON();
      assert.deepStrictEqual(json, {
        type: 'Stack',
        size: 0,
        isEmpty: true,
        elements: []
      });
    });

    it('should return JSON representation with elements', () => {
      const stack = new Stack<number>();
      
      stack.push(1);
      stack.push(2);
      
      const json = stack.toJSON();
      assert.deepStrictEqual(json, {
        type: 'Stack',
        size: 2,
        isEmpty: false,
        elements: [2, 1]
      });
    });

    it('should handle complex objects', () => {
      const stack = new Stack<MockClass>();
      const obj = new MockClass(42);
      
      stack.push(obj);
      
      const json = stack.toJSON() as any;
      assert.strictEqual(json.type, 'Stack');
      assert.strictEqual(json.size, 1);
      assert.strictEqual(json.isEmpty, false);
      assert.ok(Array.isArray(json.elements));
      assert.strictEqual(json.elements.length, 1);
    });
  });

  describe('Iterator functionality', () => {
    it('should be iterable with for...of loop', () => {
      const stack = new Stack<number>();
      
      stack.push(1);
      stack.push(2);
      stack.push(3);
      
      const result: number[] = [];
      for (const item of stack) {
        result.push(item);
      }
      
      assert.deepStrictEqual(result, [3, 2, 1]); // Top to bottom
    });

    it('should work with empty stack iterator', () => {
      const stack = new Stack<number>();
      
      const result: number[] = [];
      for (const item of stack) {
        result.push(item);
      }
      
      assert.deepStrictEqual(result, []);
    });

    it('should work with spread operator', () => {
      const stack = new Stack<string>();
      
      stack.push('a');
      stack.push('b');
      stack.push('c');
      
      const array = [...stack];
      assert.deepStrictEqual(array, ['c', 'b', 'a']);
    });

    it('should work with Array.from', () => {
      const stack = new Stack<number>();
      
      stack.push(10);
      stack.push(20);
      
      const array = Array.from(stack);
      assert.deepStrictEqual(array, [20, 10]);
    });
  });

  describe('Head property', () => {
    it('should return null for empty stack', () => {
      const stack = new Stack<number>();
      
      assert.strictEqual(stack.head, null);
    });

    it('should return head node for non-empty stack', () => {
      const stack = new Stack<number>();
      
      stack.push(1);
      stack.push(2);
      
      assert.ok(stack.head);
      assert.strictEqual(stack.head.data, 2); // Top element
    });

    it('should return head node after constructor with initial data', () => {
      const stack = new Stack<string>('initial');
      
      assert.ok(stack.head);
      assert.strictEqual(stack.head.data, 'initial');
      assert.strictEqual(stack.head.next, null);
    });

    it('should verify head property updates correctly', () => {
      const stack = new Stack<string>();
      
      // Initially null
      assert.strictEqual(stack.head, null);
      
      // After push, head should not be null
      stack.push('test');
      assert.notStrictEqual(stack.head, null);
      
      // After pop, head should be null again
      stack.pop();
      assert.strictEqual(stack.head, null);
    });
  });

  describe('Constructor edge cases', () => {
    it('should handle no parameter vs explicit undefined parameter', () => {
      const stackNoParam = new Stack<string>();
      const stackWithUndefined = new Stack<string | undefined>(undefined);
      
      // Both should create empty stacks (undefined treated as no data)
      assert.strictEqual(stackNoParam.size, 0);
      assert.strictEqual(stackNoParam.head, null);
      assert.strictEqual(stackNoParam.isEmpty(), true);
      
      assert.strictEqual(stackWithUndefined.size, 0);
      assert.strictEqual(stackWithUndefined.head, null);
      assert.strictEqual(stackWithUndefined.isEmpty(), true);
    });

    it('should test constructor path with falsy but valid data', () => {
      // Test different falsy but defined values to ensure constructor logic coverage
      // Note: null and undefined are rejected by Node class
      const stackWithZero = new Stack<number>(0);
      const stackWithFalse = new Stack<boolean>(false);
      const stackWithEmptyString = new Stack<string>('');
      
      // All should have size 1 and not be empty
      [stackWithZero, stackWithFalse, stackWithEmptyString].forEach(stack => {
        assert.strictEqual(stack.size, 1);
        assert.strictEqual(stack.isEmpty(), false);
        assert.ok(stack.head);
        assert.strictEqual(stack.head.next, null);
      });
      
      // Check specific values
      assert.strictEqual(stackWithZero.head!.data, 0);
      assert.strictEqual(stackWithFalse.head!.data, false);
      assert.strictEqual(stackWithEmptyString.head!.data, '');
    });

    it('should reject null as initial data', () => {
      assert.throws(
        () => new Stack<null>(null),
        { message: 'Node data cannot be null or undefined' }
      );
    });

    it('should handle 0 as initial data', () => {
      const stack = new Stack<number>(0);
      
      assert.strictEqual(stack.size, 1);
      assert.ok(stack.head);
      assert.strictEqual(stack.head.data, 0);
      assert.strictEqual(stack.isEmpty(), false);
    });

    it('should handle false as initial data', () => {
      const stack = new Stack<boolean>(false);
      
      assert.strictEqual(stack.size, 1);
      assert.ok(stack.head);
      assert.strictEqual(stack.head.data, false);
      assert.strictEqual(stack.isEmpty(), false);
    });

    it('should handle empty string as initial data', () => {
      const stack = new Stack<string>('');
      
      assert.strictEqual(stack.size, 1);
      assert.ok(stack.head);
      assert.strictEqual(stack.head.data, '');
      assert.strictEqual(stack.isEmpty(), false);
    });
  });

  describe('Size property', () => {
    it('should track size correctly through various operations', () => {
      const stack = new Stack<number>();
      
      assert.strictEqual(stack.size, 0);
      
      stack.push(1);
      assert.strictEqual(stack.size, 1);
      
      stack.push(2);
      stack.push(3);
      assert.strictEqual(stack.size, 3);
      
      stack.pop();
      assert.strictEqual(stack.size, 2);
      
      stack.clear();
      assert.strictEqual(stack.size, 0);
    });
  });

  describe('LIFO behavior verification', () => {
    it('should maintain strict LIFO order', () => {
      const stack = new Stack<string>();
      
      const items = ['first', 'second', 'third', 'fourth'];
      
      // Push all items
      for (const item of items) {
        stack.push(item);
      }
      
      // Pop all items - should be in reverse order
      const poppedItems: string[] = [];
      while (!stack.isEmpty()) {
        poppedItems.push(stack.pop());
      }
      
      assert.deepStrictEqual(poppedItems, ['fourth', 'third', 'second', 'first']);
    });

    it('should handle mixed push/pop operations correctly', () => {
      const stack = new Stack<number>();
      
      stack.push(1);
      stack.push(2);
      assert.strictEqual(stack.pop(), 2); // Last in, first out
      
      stack.push(3);
      stack.push(4);
      assert.strictEqual(stack.pop(), 4); // Last in, first out
      assert.strictEqual(stack.pop(), 3);
      assert.strictEqual(stack.pop(), 1); // Original first item, now last out
    });
  });

  describe('Edge cases and error handling', () => {
    it('should handle mixed data types correctly', () => {
      const stack = new Stack<any>();
      
      stack.push(1);
      stack.push('string');
      stack.push(true);
      stack.push({ key: 'value' });
      
      assert.deepStrictEqual(stack.pop(), { key: 'value' });
      assert.strictEqual(stack.pop(), true);
      assert.strictEqual(stack.pop(), 'string');
      assert.strictEqual(stack.pop(), 1);
    });

    it('should maintain integrity after complex operations', () => {
      const stack = new Stack<number>();
      
      // Complex sequence of operations
      for (let i = 1; i <= 5; i++) {
        stack.push(i);
      }
      
      // Pop some items
      stack.pop(); // 5
      stack.pop(); // 4
      
      // Push more items
      stack.push(10);
      stack.push(11);
      
      // Verify final state
      assert.strictEqual(stack.size, 5);
      assert.strictEqual(stack.peek(), 11);
      assert.deepStrictEqual(stack.toArray(), [11, 10, 3, 2, 1]);
    });

    it('should handle StackUnderflowError properly', () => {
      const stack = new Stack<number>();
      
      try {
        stack.pop();
        assert.fail('Should have thrown StackUnderflowError');
      } catch (error) {
        assert.ok(error instanceof StackUnderflowError);
        assert.strictEqual(error.name, 'StackUnderflowError');
        assert.strictEqual(error.message, 'Cannot pop from an empty stack');
      }
      
      try {
        stack.peek();
        assert.fail('Should have thrown StackUnderflowError');
      } catch (error) {
        assert.ok(error instanceof StackUnderflowError);
        assert.strictEqual(error.name, 'StackUnderflowError');
        assert.strictEqual(error.message, 'Cannot peek at an empty stack');
      }
    });
  });

  // Legacy tests for backward compatibility
  describe('Legacy tests', () => {
    it('should create a stack', () => {
      const _mockObject = new MockClass(1);
      const _stack = new Stack<MockClass>(_mockObject);

      assert.ok(_stack);
    });

    it('should false if the stack is not empty', () => {
      const _mockObject = new MockClass(1);
      const _stack = new Stack<MockClass>(_mockObject);

      assert.equal(_stack.isEmpty(), false);
    });

    it('should true if the stack is empty', () => {
      const _stack = new Stack<MockClass>();

      assert.equal(_stack.isEmpty(), true);
    });

    it('should push an item to the stack', () => {
      const _mockObject = new MockClass(1);
      const _stack = new Stack<MockClass>();

      _stack.push(_mockObject);

      assert.equal(_stack.size, 1);
    });

    it('should pop an item from the stack', () => {
      const _mockObject = new MockClass(1);
      const _stack = new Stack<MockClass>();

      _stack.push(_mockObject);
      const _element = _stack.pop();

      assert.ok(_element);
      assert.equal(_element.mockProperty, 1);
      assert.equal(_stack.size, 0);
    });

    it('should return the peak of the stack', () => {
      const _stack = new Stack<number>();

      _stack.push(1);
      _stack.push(2);
      _stack.push(3);

      assert.ok(_stack);
      assert.equal(_stack.peek(), 3);
    });

    it('should pop the last item pushed to the stack', () => {
      const _mockObjectOne = new MockClass(1);
      const _mockObjectTwo = new MockClass(2);
      const _stack = new Stack<MockClass>();

      _stack.push(_mockObjectOne);
      _stack.push(_mockObjectTwo);
      const _element = _stack.pop();

      assert.ok(_element);
      assert.equal(_element.mockProperty, 2);
      assert.equal(_stack.size, 1);
    });

    it('should throw an error if the stack is empty', () => {
      const _stack = new Stack<MockClass>();

      assert.throws(() => _stack.pop(), Error, "Cannot pop from an empty stack");
    });

    it('should throw an error if trying to peek at an empty stack', () => {
      const _stack = new Stack<MockClass>();

      assert.throws(() => _stack.peek(), Error, "Cannot peek at an empty stack");
    });
  });
});
