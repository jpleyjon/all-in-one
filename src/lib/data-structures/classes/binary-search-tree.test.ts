import { describe, it } from 'node:test';
import assert from 'node:assert';
import BinarySearchTree from './binary-search-tree';
import MockClass from '../fixtures/mock-class';
import { TComparable } from '../types';

function createNumberTree(): BinarySearchTree<number> {
  const tree = new BinarySearchTree<number>(5);
  tree.insert(3);
  tree.insert(7);
  tree.insert(1);
  tree.insert(9);
  tree.insert(4);
  tree.insert(6);
  return tree;
}

describe('BinarySearchTree', () => {
  it('should create a binary tree', () => {
    const tree = new BinarySearchTree<number>(1);
    assert.ok(tree);
  });

  it('should create a binary tree for an object', () => {
    const tree = new BinarySearchTree<MockClass>(new MockClass(1));
    assert.ok(tree);
  });

  it('should traverse the tree in in-order', () => {
    const tree = createNumberTree();
    const values = tree.inOrder();
    assert.deepStrictEqual(values, [1, 3, 4, 5, 6, 7, 9]);
  });

  it('should traverse the tree in pre-order', () => {
    const tree = createNumberTree();
    const values = tree.preOrder();
    assert.deepStrictEqual(values, [5, 3, 1, 4, 7, 6, 9]);
  });

  it('should traverse the tree in post-order', () => {
    const tree = createNumberTree();
    const values = tree.postOrder();
    assert.deepStrictEqual(values, [1, 4, 3, 6, 9, 7, 5]);
  });

  it('should traverse the tree in level-order', () => {
    const tree = createNumberTree();
    const values = tree.levelOrder();
    assert.deepStrictEqual(values, [5, 3, 7, 1, 4, 6, 9]);
  });

  it('should keep duplicates in the right subtree', () => {
    const tree = new BinarySearchTree<number>(5);
    tree.insert(5);
    tree.insert(5);

    assert.deepStrictEqual(tree.inOrder(), [5, 5, 5]);
    assert.deepStrictEqual(tree.levelOrder(), [5, 5, 5]);
  });

  it('should support comparable objects', () => {
    const tree = new BinarySearchTree<MockClass>(new MockClass(5));
    tree.insert(new MockClass(3));
    tree.insert(new MockClass(7));
    tree.insert(new MockClass(1));
    tree.insert(new MockClass(4));
    tree.insert(new MockClass(6));
    tree.insert(new MockClass(9));

    const inOrder = tree.inOrder().map((item) => item.mockProperty);
    const levelOrder = tree.levelOrder().map((item) => item.mockProperty);
    assert.deepStrictEqual(inOrder, [1, 3, 4, 5, 6, 7, 9]);
    assert.deepStrictEqual(levelOrder, [5, 3, 7, 1, 4, 6, 9]);
  });

  it('should throw when comparing mixed primitive and object values', () => {
    const tree = new BinarySearchTree<TComparable>(1);

    assert.throws(
      () => tree.insert(new MockClass(2)),
      (error: unknown) => {
        assert.ok(error instanceof TypeError);
        assert.equal(
          error.message,
          'Cannot compare primitive and object comparable values.',
        );
        return true;
      },
    );
  });
});
