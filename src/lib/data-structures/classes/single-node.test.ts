import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert';
import SingleNode from './single-node';
import MockClass from '../fixtures/mock-class';

describe('Simple Node', () => {
  let _mockObject: MockClass;
  let _node: SingleNode<MockClass>;

  beforeEach(() => {
    _mockObject = new MockClass(1);
    _node = new SingleNode<MockClass>(_mockObject);
  });

  describe('Constructor and Basic Properties', () => {
    it('should create a simple node', () => {
      assert.ok(_node);
      assert.strictEqual(_node.next, null);
    });

    it('should return the right data value', () => {
      assert.strictEqual(_node.data.mockProperty, 1);
    });

    it('should set the right next value', () => {
      const _mockObjectTwo = new MockClass(2);
      const _nodeTwo = new SingleNode<MockClass>(_mockObjectTwo);
      _node.next = _nodeTwo;

      assert.strictEqual(_node.next.data.mockProperty, 2);
    });
  });

  describe('Next Property Validation', () => {
    it('should throw error when setting next to self (circular reference)', () => {
      assert.throws(
        () => { _node.next = _node; },
        { message: 'Cannot set next to self - circular reference detected' }
      );
    });

    it('should allow setting next to null', () => {
      const _mockObjectTwo = new MockClass(2);
      const _nodeTwo = new SingleNode<MockClass>(_mockObjectTwo);
      _node.next = _nodeTwo;
      
      // Should allow setting back to null
      _node.next = null;
      assert.strictEqual(_node.next, null);
    });
  });

  describe('hasNext method', () => {
    it('should return false when node has no next node', () => {
      assert.strictEqual(_node.hasNext(), false);
    });

    it('should return true when node has a next node', () => {
      const _mockObjectTwo = new MockClass(2);
      const _nodeTwo = new SingleNode<MockClass>(_mockObjectTwo);
      _node.next = _nodeTwo;
      
      assert.strictEqual(_node.hasNext(), true);
    });

    it('should return false after removing next node', () => {
      const _mockObjectTwo = new MockClass(2);
      const _nodeTwo = new SingleNode<MockClass>(_mockObjectTwo);
      _node.next = _nodeTwo;
      _node.next = null;
      
      assert.strictEqual(_node.hasNext(), false);
    });
  });

  describe('clone method', () => {
    it('should create a new node with same data but no next reference', () => {
      const _mockObjectTwo = new MockClass(2);
      const _nodeTwo = new SingleNode<MockClass>(_mockObjectTwo);
      _node.next = _nodeTwo;
      
      const cloned = _node.clone();
      
      // Should be different instances
      assert.notStrictEqual(cloned, _node);
      
      // Should have same data
      assert.strictEqual(cloned.data.mockProperty, _node.data.mockProperty);
      
      // Should not have next reference (shallow clone)
      assert.strictEqual(cloned.next, null);
      
      // Original should still have next reference
      assert.strictEqual(_node.hasNext(), true);
    });

    it('should work with primitive data types', () => {
      const stringNode = new SingleNode('test');
      const cloned = stringNode.clone();
      
      assert.notStrictEqual(cloned, stringNode);
      assert.strictEqual(cloned.data, 'test');
      assert.strictEqual(cloned.next, null);
    });
  });

  describe('toString method', () => {
    it('should return string representation with MockClass data', () => {
      const result = _node.toString();
      assert.strictEqual(result, 'SingleNode([object Object])');
    });

    it('should return string representation with primitive data', () => {
      const stringNode = new SingleNode('hello');
      const numberNode = new SingleNode(42);
      const booleanNode = new SingleNode(true);
      
      assert.strictEqual(stringNode.toString(), 'SingleNode(hello)');
      assert.strictEqual(numberNode.toString(), 'SingleNode(42)');
      assert.strictEqual(booleanNode.toString(), 'SingleNode(true)');
    });

    it('should handle null and undefined data in string representation', () => {
      // Note: Constructor prevents null/undefined, but toString should handle edge cases
      const nodeWithObject = new SingleNode({ value: null });
      const result = nodeWithObject.toString();
      assert.ok(result.startsWith('SingleNode('));
    });
  });

  describe('toJSON method', () => {
    it('should return JSON representation without next node', () => {
      const result = _node.toJSON();
      
      assert.deepStrictEqual(result, {
        data: _mockObject,
        hasNext: false
      });
    });

    it('should return JSON representation with next node', () => {
      const _mockObjectTwo = new MockClass(2);
      const _nodeTwo = new SingleNode<MockClass>(_mockObjectTwo);
      _node.next = _nodeTwo;
      
      const result = _node.toJSON();
      
      assert.deepStrictEqual(result, {
        data: _mockObject,
        hasNext: true
      });
    });

    it('should work with primitive data types', () => {
      const stringNode = new SingleNode('test');
      const numberNode = new SingleNode(42);
      
      assert.deepStrictEqual(stringNode.toJSON(), {
        data: 'test',
        hasNext: false
      });
      
      assert.deepStrictEqual(numberNode.toJSON(), {
        data: 42,
        hasNext: false
      });
    });
  });

  describe('Edge Cases and Integration', () => {
    it('should handle chain of nodes correctly', () => {
      const node1 = new SingleNode(1);
      const node2 = new SingleNode(2);
      const node3 = new SingleNode(3);
      
      node1.next = node2;
      node2.next = node3;
      
      assert.strictEqual(node1.hasNext(), true);
      assert.strictEqual(node2.hasNext(), true);
      assert.strictEqual(node3.hasNext(), false);
      
      assert.strictEqual(node1.next?.data, 2);
      assert.strictEqual(node1.next?.next?.data, 3);
      assert.strictEqual(node1.next?.next?.next, null);
    });

    it('should work with different data types', () => {
      // Test individual nodes with different types
      const stringNode = new SingleNode('string');
      const numberNode = new SingleNode(123);
      const booleanNode = new SingleNode(false);
      const arrayNode = new SingleNode([1, 2, 3]);
      
      // Test that each node can store its respective data type
      assert.strictEqual(stringNode.data, 'string');
      assert.strictEqual(numberNode.data, 123);
      assert.strictEqual(booleanNode.data, false);
      assert.deepStrictEqual(arrayNode.data, [1, 2, 3]);
      
      // Test linking nodes of the same type
      const stringNode2 = new SingleNode('second');
      const numberNode2 = new SingleNode(456);
      
      stringNode.next = stringNode2;
      numberNode.next = numberNode2;
      
      assert.strictEqual(stringNode.next?.data, 'second');
      assert.strictEqual(numberNode.next?.data, 456);
    });
  });
});
