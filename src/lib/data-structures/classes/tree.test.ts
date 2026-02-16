import { describe, it } from 'node:test';
import assert from 'node:assert';
import Tree from './tree';
import MockClass from '../fixtures/mock-class';

function createNumberTree(): Tree<number> {
  const tree = new Tree<number>(1);
  tree.insert(1, 2);
  tree.insert(1, 3);
  tree.insert(1, 4);
  tree.insert(1, 5);
  tree.insert(2, 6);
  tree.insert(2, 7);
  tree.insert(2, 8);
  tree.insert(2, 9);
  return tree;
}

describe('Tree', () => {
  it('should be created', () => {
    const tree = new Tree(1);
    assert.ok(tree);
  });

  it('should have a data property', () => {
    const tree = new Tree(1);
    assert.strictEqual(tree.data, 1);
  });

  it('should have a children property', () => {
    const tree = new Tree(1);
    assert.deepStrictEqual(tree.children, []);
  });

  it('should traverse the tree in pre-order', () => {
    const tree = createNumberTree();
    const result = tree.preOrder();
    assert.deepStrictEqual(result, [1, 2, 6, 7, 8, 9, 3, 4, 5]);
  });

  it('should traverse the tree in in-order', () => {
    const tree = createNumberTree();
    const result = tree.inOrder();
    assert.deepStrictEqual(result, [6, 2, 7, 8, 9, 1, 3, 4, 5]);
  });

  it('should traverse the tree in post-order', () => {
    const tree = createNumberTree();
    const result = tree.postOrder();
    assert.deepStrictEqual(result, [6, 7, 8, 9, 2, 3, 4, 5, 1]);
  });

  it('should traverse the tree in level-order', () => {
    const tree = createNumberTree();
    const result = tree.levelOrder();
    assert.deepStrictEqual(result, [1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });

  it('should insert only once when multiple nodes match a parent value', () => {
    const tree = new Tree<number>(1);
    tree.insert(1, 2);
    tree.insert(1, 2);
    tree.insert(2, 3);

    assert.deepStrictEqual(tree.levelOrder(), [1, 2, 2, 3]);
  });

  it('should insert children for comparable objects', () => {
    const root = new MockClass(1);
    const tree = new Tree<MockClass>(root);
    tree.insert(new MockClass(1), new MockClass(2));
    tree.insert(new MockClass(2), new MockClass(3));

    const values = tree.preOrder().map((item) => item.mockProperty);
    assert.deepStrictEqual(values, [1, 2, 3]);
  });

  it('should not change the tree when parent is not found', () => {
    const tree = createNumberTree();
    tree.insert(999, 10);

    assert.deepStrictEqual(tree.levelOrder(), [1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });
});
