import { describe, it } from 'node:test';
import assert from 'assert';
import MockNode from '../fixtures/mock-node';
import Comparable from '../interfaces/comparable';

// Create a test class that implements Comparable for testing
class TestComparable implements Comparable {
  constructor(private value: number) {}

  isEqual(other: TestComparable): boolean {
    return this.value === other.value;
  }

  isGreaterThan(other: TestComparable): boolean {
    return this.value > other.value;
  }

  isLesserThan(other: TestComparable): boolean {
    return this.value < other.value;
  }

  toString(): string {
    return `TestComparable(${this.value})`;
  }
}

describe('Node', () => {
  describe('Constructor', () => {
    it('should store data', () => {
      const data = 'test data';
      const node = new MockNode(data);
      assert.strictEqual(node.data, data);
    });

    it('should throw error for null data', () => {
      assert.throws(
        () => new MockNode(null),
        { message: 'Node data cannot be null or undefined' }
      );
    });

    it('should throw error for undefined data', () => {
      assert.throws(
        () => new MockNode(undefined),
        { message: 'Node data cannot be null or undefined' }
      );
    });

    it('should freeze object data for immutability', () => {
      const data = { name: 'test', value: 42 };
      const node = new MockNode(data);
      assert.ok(Object.isFrozen(node.data));
    });

    it('should not freeze primitive data', () => {
      const data = 'test';
      const node = new MockNode(data);
      assert.strictEqual(node.data, data);
    });
  });

  describe('equals method', () => {
    it('should return true for nodes with equal data', () => {
      const node1 = new MockNode('test');
      const node2 = new MockNode('test');
      assert.strictEqual(node1.equals(node2), true);
    });

    it('should return false for nodes with different data', () => {
      const node1 = new MockNode('test1');
      const node2 = new MockNode('test2');
      assert.strictEqual(node1.equals(node2), false);
    });
  });

  describe('hasData method', () => {
    it('should return true for matching primitive data', () => {
      const node = new MockNode('test');
      assert.strictEqual(node.hasData('test'), true);
    });

    it('should return false for non-matching primitive data', () => {
      const node = new MockNode('test');
      assert.strictEqual(node.hasData('other'), false);
    });

    it('should use isEqual method for Comparable objects', () => {
      const comparable1 = new TestComparable(5);
      const comparable2 = new TestComparable(5);
      const comparable3 = new TestComparable(10);
      
      const node = new MockNode(comparable1);
      assert.strictEqual(node.hasData(comparable2), true);
      assert.strictEqual(node.hasData(comparable3), false);
    });

    it('should handle objects without isEqual method', () => {
      const obj1 = { value: 42 };
      const obj2 = { value: 42 };
      const node = new MockNode(obj1);
      assert.strictEqual(node.hasData(obj2), false); // Different object references
      assert.strictEqual(node.hasData(obj1), true); // Same object reference
    });
  });

  describe('toString method', () => {
    it('should return string representation for primitive data', () => {
      const node = new MockNode('hello');
      assert.strictEqual(node.toString(), 'Node(hello)');
    });

    it('should return string representation for number data', () => {
      const node = new MockNode(42);
      assert.strictEqual(node.toString(), 'Node(42)');
    });

    it('should return string representation for object data', () => {
      const comparable = new TestComparable(5);
      const node = new MockNode(comparable);
      assert.strictEqual(node.toString(), 'Node(TestComparable(5))');
    });
  });

  describe('toJSON method', () => {
    it('should return JSON representation', () => {
      const node = new MockNode('test');
      const json = node.toJSON();
      assert.deepStrictEqual(json, { data: 'test' });
    });

    it('should work with object data', () => {
      const data = { name: 'test', value: 42 };
      const node = new MockNode(data);
      const json = node.toJSON();
      assert.deepStrictEqual(json, { data });
    });
  });

  describe('clone method', () => {
    it('should create a new node with same data', () => {
      const node = new MockNode('test');
      const cloned = node.clone();
      
      assert.notStrictEqual(node, cloned); // Different instances
      assert.strictEqual(node.data, cloned.data); // Same data
      assert.strictEqual(node.equals(cloned), true); // Equal nodes
    });

    it('should work with object data', () => {
      const data = { name: 'test' };
      const node = new MockNode(data);
      const cloned = node.clone();
      
      assert.notStrictEqual(node, cloned);
      assert.strictEqual(node.data, cloned.data); // Same frozen object reference
    });
  });

  describe('isGreaterThan method', () => {
    it('should compare numbers correctly', () => {
      const node1 = new MockNode(10);
      const node2 = new MockNode(5);
      const node3 = new MockNode(15);
      
      assert.strictEqual(node1.isGreaterThan(node2), true);
      assert.strictEqual(node1.isGreaterThan(node3), false);
    });

    it('should compare strings correctly', () => {
      const node1 = new MockNode('b');
      const node2 = new MockNode('a');
      const node3 = new MockNode('c');
      
      assert.strictEqual(node1.isGreaterThan(node2), true);
      assert.strictEqual(node1.isGreaterThan(node3), false);
    });

    it('should use isGreaterThan method for Comparable objects', () => {
      const comparable1 = new TestComparable(10);
      const comparable2 = new TestComparable(5);
      const comparable3 = new TestComparable(15);
      
      const node1 = new MockNode(comparable1);
      const node2 = new MockNode(comparable2);
      const node3 = new MockNode(comparable3);
      
      assert.strictEqual(node1.isGreaterThan(node2), true);
      assert.strictEqual(node1.isGreaterThan(node3), false);
    });

    it('should throw error for unsupported data types', () => {
      const obj1 = { value: 10 };
      const obj2 = { value: 5 };
      const node1 = new MockNode(obj1);
      const node2 = new MockNode(obj2);
      
      assert.throws(
        () => node1.isGreaterThan(node2),
        { message: 'Data types do not support comparison' }
      );
    });
  });

  describe('isLessThan method', () => {
    it('should compare numbers correctly', () => {
      const node1 = new MockNode(5);
      const node2 = new MockNode(10);
      const node3 = new MockNode(3);
      
      assert.strictEqual(node1.isLessThan(node2), true);
      assert.strictEqual(node1.isLessThan(node3), false);
    });

    it('should compare strings correctly', () => {
      const node1 = new MockNode('a');
      const node2 = new MockNode('b');
      const node3 = new MockNode('A'); // Note: uppercase A comes before lowercase a in ASCII
      
      assert.strictEqual(node1.isLessThan(node2), true);
      assert.strictEqual(node1.isLessThan(node3), false);
    });

    it('should use isLesserThan method for Comparable objects', () => {
      const comparable1 = new TestComparable(5);
      const comparable2 = new TestComparable(10);
      const comparable3 = new TestComparable(3);
      
      const node1 = new MockNode(comparable1);
      const node2 = new MockNode(comparable2);
      const node3 = new MockNode(comparable3);
      
      assert.strictEqual(node1.isLessThan(node2), true);
      assert.strictEqual(node1.isLessThan(node3), false);
    });

    it('should throw error for unsupported data types', () => {
      const obj1 = { value: 5 };
      const obj2 = { value: 10 };
      const node1 = new MockNode(obj1);
      const node2 = new MockNode(obj2);
      
      assert.throws(
        () => node1.isLessThan(node2),
        { message: 'Data types do not support comparison' }
      );
    });
  });

  describe('Edge cases', () => {
    it('should handle equal values in comparison methods', () => {
      const node1 = new MockNode(5);
      const node2 = new MockNode(5);
      
      assert.strictEqual(node1.isGreaterThan(node2), false);
      assert.strictEqual(node1.isLessThan(node2), false);
      assert.strictEqual(node1.equals(node2), true);
    });

    it('should handle boolean data type', () => {
      const node1 = new MockNode(true);
      const node2 = new MockNode(false);
      
      assert.strictEqual(node1.hasData(true), true);
      assert.strictEqual(node1.hasData(false), false);
      assert.strictEqual(node1.equals(node2), false);
    });
  });
});
