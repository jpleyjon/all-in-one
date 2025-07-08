import { describe, it } from 'node:test';
import assert from 'node:assert';
import BinaryTree, { BinaryTreeNode, BinaryTreeEmptyError } from './binary-tree';
import MockClass from '../fixtures/mock-class';

describe('BinaryTree', () => {
  describe('Constructor and Basic Properties', () => {
    it('should create an empty binary tree', () => {
      const tree = new BinaryTree<number>();
      assert.equal(tree.size, 0);
      assert.equal(tree.isEmpty(), true);
      assert.equal(tree.root, null);
    });
  });

  describe('BinaryTreeNode', () => {
    it('should create a binary tree node with data', () => {
      const node = new BinaryTreeNode(42);
      assert.equal(node.data, 42);
      assert.equal(node.isLeaf(), true);
      assert.equal(node.getChildCount(), 0);
      assert.equal(node.hasLeft(), false);
      assert.equal(node.hasRight(), false);
    });

    it('should throw error for null data', () => {
      assert.throws(() => {
        new BinaryTreeNode(null);
      }, { message: 'BinaryTreeNode data cannot be null or undefined' });
    });

    it('should throw error for undefined data', () => {
      assert.throws(() => {
        new BinaryTreeNode(undefined);
      }, { message: 'BinaryTreeNode data cannot be null or undefined' });
    });

    it('should correctly manage left and right children', () => {
      const root = new BinaryTreeNode(10);
      const leftChild = new BinaryTreeNode(5);
      const rightChild = new BinaryTreeNode(15);
      
      root.setLeft(leftChild);
      root.setRight(rightChild);
      
      assert.equal(root.isLeaf(), false);
      assert.equal(root.getChildCount(), 2);
      assert.equal(root.hasLeft(), true);
      assert.equal(root.hasRight(), true);
      assert.equal(leftChild.parent, root);
      assert.equal(rightChild.parent, root);
      assert.equal(leftChild.isLeaf(), true);
      assert.equal(rightChild.isLeaf(), true);
    });

    it('should handle single child scenarios', () => {
      const root = new BinaryTreeNode(10);
      const leftChild = new BinaryTreeNode(5);
      
      root.setLeft(leftChild);
      
      assert.equal(root.isLeaf(), false);
      assert.equal(root.getChildCount(), 1);
      assert.equal(root.hasLeft(), true);
      assert.equal(root.hasRight(), false);
      assert.equal(leftChild.parent, root);
    });

    it('should replace children when setting new ones', () => {
      const root = new BinaryTreeNode(10);
      const oldChild = new BinaryTreeNode(5);
      const newChild = new BinaryTreeNode(7);
      
      root.setLeft(oldChild);
      assert.equal(oldChild.parent, root);
      
      root.setLeft(newChild);
      assert.equal(newChild.parent, root);
      assert.equal(oldChild.parent, null);
      
      // Test replacing right child as well
      const oldRightChild = new BinaryTreeNode(15);
      const newRightChild = new BinaryTreeNode(17);
      
      root.setRight(oldRightChild);
      assert.equal(oldRightChild.parent, root);
      
      root.setRight(newRightChild);
      assert.equal(newRightChild.parent, root);
      assert.equal(oldRightChild.parent, null);
    });

    it('should handle setting children to null', () => {
      const root = new BinaryTreeNode(10);
      const child = new BinaryTreeNode(5);
      
      root.setLeft(child);
      assert.equal(child.parent, root);
      assert.equal(root.hasLeft(), true);
      
      root.setLeft(null);
      assert.equal(child.parent, null);
      assert.equal(root.hasLeft(), false);
    });

    it('should have string representation', () => {
      const node = new BinaryTreeNode(42);
      assert.equal(node.toString(), 'BinaryTreeNode(42, left: false, right: false)');
      
      const leftChild = new BinaryTreeNode(20);
      node.setLeft(leftChild);
      assert.equal(node.toString(), 'BinaryTreeNode(42, left: true, right: false)');
    });

    it('should have JSON representation', () => {
      const node = new BinaryTreeNode(42);
      const json = node.toJSON();
      assert.deepEqual(json, {
        data: 42,
        hasLeft: false,
        hasRight: false,
        isLeaf: true,
        childCount: 0
      });
      
      const leftChild = new BinaryTreeNode(20);
      node.setLeft(leftChild);
      const jsonWithChild = node.toJSON();
      assert.deepEqual(jsonWithChild, {
        data: 42,
        hasLeft: true,
        hasRight: false,
        isLeaf: false,
        childCount: 1
      });
    });
  });

  describe('BinaryTreeEmptyError', () => {
    it('should create error with custom message', () => {
      const customMessage = 'Custom binary tree empty error message';
      const error = new BinaryTreeEmptyError(customMessage);
      assert.equal(error.message, customMessage);
      assert.equal(error.name, 'BinaryTreeEmptyError');
    });

    it('should create error with default message', () => {
      const error = new BinaryTreeEmptyError();
      assert.equal(error.name, 'BinaryTreeEmptyError');
    });
  });

  describe('Root Management', () => {
    it('should set root node', () => {
      const tree = new BinaryTree<number>();
      const root = tree.setRoot(10);
      assert.equal(tree.size, 1);
      assert.equal(tree.root, root);
      assert.equal(root.data, 10);
    });

    it('should replace existing root', () => {
      const tree = new BinaryTree<number>();
      tree.setRoot(10);
      const newRoot = tree.setRoot(20);
      assert.equal(tree.size, 1);
      assert.equal(tree.root, newRoot);
      assert.equal(newRoot.data, 20);
    });

    it('should throw error for null/undefined root data', () => {
      const tree = new BinaryTree<number>();
      assert.throws(() => {
        tree.setRoot(null as any);
      }, { message: 'Cannot set root with null or undefined data' });
      
      assert.throws(() => {
        tree.setRoot(undefined as any);
      }, { message: 'Cannot set root with null or undefined data' });
    });
  });

  describe('Child Management', () => {
    it('should add left and right children', () => {
      const tree = new BinaryTree<number>();
      const root = tree.setRoot(10);
      const leftChild = tree.addLeft(root, 5);
      const rightChild = tree.addRight(root, 15);
      
      assert.equal(tree.size, 3);
      assert.equal(root.getChildCount(), 2);
      assert.equal(leftChild.data, 5);
      assert.equal(rightChild.data, 15);
      assert.equal(leftChild.parent, root);
      assert.equal(rightChild.parent, root);
      assert.equal(root.left, leftChild);
      assert.equal(root.right, rightChild);
    });

    it('should add nested children', () => {
      const tree = new BinaryTree<number>();
      const root = tree.setRoot(10);
      const leftChild = tree.addLeft(root, 5);
      const rightChild = tree.addRight(root, 15);
      const leftGrandchild = tree.addLeft(leftChild, 3);
      const rightGrandchild = tree.addRight(leftChild, 7);
      
      assert.equal(tree.size, 5);
      assert.equal(root.getChildCount(), 2);
      assert.equal(leftChild.getChildCount(), 2);
      assert.equal(rightChild.getChildCount(), 0);
      assert.equal(leftGrandchild.parent, leftChild);
      assert.equal(rightGrandchild.parent, leftChild);
    });

    it('should throw error for null/undefined child data', () => {
      const tree = new BinaryTree<number>();
      const root = tree.setRoot(10);
      
      assert.throws(() => {
        tree.addLeft(root, null as any);
      }, { message: 'Cannot add child with null or undefined data' });
      
      assert.throws(() => {
        tree.addRight(root, undefined as any);
      }, { message: 'Cannot add child with null or undefined data' });
    });

    it('should throw error when trying to add child to occupied position', () => {
      const tree = new BinaryTree<number>();
      const root = tree.setRoot(10);
      tree.addLeft(root, 5);
      
      assert.throws(() => {
        tree.addLeft(root, 7);
      }, { message: 'Parent already has a left child' });
      
      tree.addRight(root, 15);
      assert.throws(() => {
        tree.addRight(root, 17);
      }, { message: 'Parent already has a right child' });
    });
  });

  describe('Node Removal', () => {
    it('should remove leaf nodes', () => {
      const tree = new BinaryTree<number>();
      const root = tree.setRoot(10);
      const leftChild = tree.addLeft(root, 5);
      const rightChild = tree.addRight(root, 15);
      
      assert.equal(tree.removeNode(leftChild), true);
      assert.equal(tree.size, 2);
      assert.equal(root.getChildCount(), 1);
      assert.equal(root.left, null);
      assert.equal(root.right, rightChild);
    });

    it('should remove right child nodes', () => {
      const tree = new BinaryTree<number>();
      const root = tree.setRoot(10);
      const leftChild = tree.addLeft(root, 5);
      const rightChild = tree.addRight(root, 15);
      
      // Remove right child to cover line 250-251
      assert.equal(tree.removeNode(rightChild), true);
      assert.equal(tree.size, 2);
      assert.equal(root.getChildCount(), 1);
      assert.equal(root.left, leftChild);
      assert.equal(root.right, null);
    });

    it('should remove nodes with children (removes entire subtree)', () => {
      const tree = new BinaryTree<number>();
      const root = tree.setRoot(10);
      const leftChild = tree.addLeft(root, 5);
      const rightChild = tree.addRight(root, 15);
      const grandchild = tree.addLeft(leftChild, 3);
      
      assert.equal(tree.removeNode(leftChild), true);
      assert.equal(tree.size, 2); // root + rightChild
      assert.equal(root.getChildCount(), 1);
      assert.equal(root.left, null);
      assert.equal(root.right, rightChild);
    });

    it('should remove root node (clears entire tree)', () => {
      const tree = new BinaryTree<number>();
      const root = tree.setRoot(10);
      tree.addLeft(root, 5);
      tree.addRight(root, 15);
      
      assert.equal(tree.removeNode(root), true);
      assert.equal(tree.size, 0);
      assert.equal(tree.root, null);
      assert.equal(tree.isEmpty(), true);
    });

    it('should return false for nodes not in tree', () => {
      const tree = new BinaryTree<number>();
      const root = tree.setRoot(10);
      const orphanNode = new BinaryTreeNode(99);
      
      assert.equal(tree.removeNode(orphanNode), false);
      assert.equal(tree.size, 1);
    });
  });

  describe('Search and Contains', () => {
    it('should find existing values', () => {
      const tree = new BinaryTree<number>();
      const root = tree.setRoot(10);
      const leftChild = tree.addLeft(root, 5);
      tree.addRight(root, 15);
      tree.addLeft(leftChild, 3);
      
      assert.equal(tree.contains(10), true);
      assert.equal(tree.contains(5), true);
      assert.equal(tree.contains(15), true);
      assert.equal(tree.contains(3), true);
    });

    it('should return false for non-existing values', () => {
      const tree = new BinaryTree<number>();
      const root = tree.setRoot(10);
      tree.addLeft(root, 5);
      tree.addRight(root, 15);
      
      assert.equal(tree.contains(7), false);
      assert.equal(tree.contains(100), false);
    });

    it('should work with empty tree', () => {
      const tree = new BinaryTree<number>();
      assert.equal(tree.contains(10), false);
    });

    it('should find nodes by data', () => {
      const tree = new BinaryTree<string>();
      const root = tree.setRoot('root');
      const leftChild = tree.addLeft(root, 'left');
      
      const foundNode = tree.findNode('left');
      assert.equal(foundNode, leftChild);
      assert.equal(tree.findNode('nonexistent'), null);
    });

    it('should work with Comparable objects', () => {
      const tree = new BinaryTree<MockClass>();
      const root = tree.setRoot(new MockClass(10));
      const leftChild = tree.addLeft(root, new MockClass(5));
      
      assert.equal(tree.contains(new MockClass(10)), true);
      assert.equal(tree.contains(new MockClass(5)), true);
      assert.equal(tree.contains(new MockClass(15)), false);
    });
  });

  describe('Height and Depth', () => {
    it('should return -1 for empty tree', () => {
      const tree = new BinaryTree<number>();
      assert.equal(tree.height(), -1);
    });

    it('should return 0 for single node', () => {
      const tree = new BinaryTree<number>();
      tree.setRoot(10);
      assert.equal(tree.height(), 0);
    });

    it('should calculate correct height for complex tree', () => {
      const tree = new BinaryTree<number>();
      const root = tree.setRoot(10);
      const leftChild = tree.addLeft(root, 5);
      const rightChild = tree.addRight(root, 15);
      const leftGrandchild = tree.addLeft(leftChild, 3);
      tree.addLeft(leftGrandchild, 1);
      
      assert.equal(tree.height(), 3);
    });

    it('should calculate node depth correctly', () => {
      const tree = new BinaryTree<number>();
      const root = tree.setRoot(10);
      const leftChild = tree.addLeft(root, 5);
      const grandchild = tree.addLeft(leftChild, 3);
      
      assert.equal(tree.getDepth(root), 0);
      assert.equal(tree.getDepth(leftChild), 1);
      assert.equal(tree.getDepth(grandchild), 2);
    });

    it('should return -1 for nodes not in tree', () => {
      const tree = new BinaryTree<number>();
      const root = tree.setRoot(10);
      tree.addLeft(root, 5);
      
      // Create a node that's not part of this tree
      const orphanNode = new BinaryTreeNode(99);
      assert.equal(tree.getDepth(orphanNode), -1);
    });
  });

  describe('Traversal methods', () => {
    it('should perform pre-order traversal', () => {
      const tree = new BinaryTree<number>();
      const root = tree.setRoot(1);
      const leftChild = tree.addLeft(root, 2);
      const rightChild = tree.addRight(root, 3);
      tree.addLeft(leftChild, 4);
      tree.addRight(leftChild, 5);
      tree.addLeft(rightChild, 6);
      tree.addRight(rightChild, 7);
      
      const preOrder = tree.preOrder();
      assert.deepEqual(preOrder, [1, 2, 4, 5, 3, 6, 7]);
    });

    it('should perform in-order traversal', () => {
      const tree = new BinaryTree<number>();
      const root = tree.setRoot(1);
      const leftChild = tree.addLeft(root, 2);
      const rightChild = tree.addRight(root, 3);
      tree.addLeft(leftChild, 4);
      tree.addRight(leftChild, 5);
      tree.addLeft(rightChild, 6);
      tree.addRight(rightChild, 7);
      
      const inOrder = tree.inOrder();
      assert.deepEqual(inOrder, [4, 2, 5, 1, 6, 3, 7]);
    });

    it('should perform post-order traversal', () => {
      const tree = new BinaryTree<number>();
      const root = tree.setRoot(1);
      const leftChild = tree.addLeft(root, 2);
      const rightChild = tree.addRight(root, 3);
      tree.addLeft(leftChild, 4);
      tree.addRight(leftChild, 5);
      tree.addLeft(rightChild, 6);
      tree.addRight(rightChild, 7);
      
      const postOrder = tree.postOrder();
      assert.deepEqual(postOrder, [4, 5, 2, 6, 7, 3, 1]);
    });

    it('should perform level-order traversal', () => {
      const tree = new BinaryTree<number>();
      const root = tree.setRoot(1);
      const leftChild = tree.addLeft(root, 2);
      const rightChild = tree.addRight(root, 3);
      tree.addLeft(leftChild, 4);
      tree.addRight(leftChild, 5);
      tree.addLeft(rightChild, 6);
      tree.addRight(rightChild, 7);
      
      const levelOrder = tree.levelOrder();
      assert.deepEqual(levelOrder, [1, 2, 3, 4, 5, 6, 7]);
    });

    it('should return empty arrays for empty tree', () => {
      const tree = new BinaryTree<number>();
      assert.deepEqual(tree.preOrder(), []);
      assert.deepEqual(tree.inOrder(), []);
      assert.deepEqual(tree.postOrder(), []);
      assert.deepEqual(tree.levelOrder(), []);
    });

    it('should handle single node tree traversals', () => {
      const tree = new BinaryTree<number>();
      tree.setRoot(42);
      
      assert.deepEqual(tree.preOrder(), [42]);
      assert.deepEqual(tree.inOrder(), [42]);
      assert.deepEqual(tree.postOrder(), [42]);
      assert.deepEqual(tree.levelOrder(), [42]);
    });
  });

  describe('Utility methods', () => {
    it('should get leaf nodes', () => {
      const tree = new BinaryTree<number>();
      const root = tree.setRoot(1);
      const leftChild = tree.addLeft(root, 2);
      const rightChild = tree.addRight(root, 3);
      tree.addLeft(leftChild, 4);
      tree.addRight(rightChild, 5);
      
      const leaves = tree.getLeaves();
      assert.equal(leaves.length, 2);
      const leafData = leaves.map(n => n.data).sort((a, b) => a - b);
      assert.deepEqual(leafData, [4, 5]);
    });

    it('should get ancestors', () => {
      const tree = new BinaryTree<number>();
      const root = tree.setRoot(1);
      const leftChild = tree.addLeft(root, 2);
      const grandchild = tree.addLeft(leftChild, 3);
      
      const ancestors = tree.getAncestors(grandchild);
      assert.equal(ancestors.length, 2);
      assert.equal(ancestors[0].data, 2);
      assert.equal(ancestors[1].data, 1);
    });

    it('should get descendants', () => {
      const tree = new BinaryTree<number>();
      const root = tree.setRoot(1);
      const leftChild = tree.addLeft(root, 2);
      const rightChild = tree.addRight(root, 3);
      tree.addLeft(leftChild, 4);
      tree.addRight(leftChild, 5);
      
      const descendants = tree.getDescendants(root);
      assert.equal(descendants.length, 4);
      const descendantData = descendants.map(n => n.data).sort((a, b) => a - b);
      assert.deepEqual(descendantData, [2, 3, 4, 5]);
    });

    it('should handle empty ancestors for root', () => {
      const tree = new BinaryTree<number>();
      const root = tree.setRoot(1);
      
      const ancestors = tree.getAncestors(root);
      assert.equal(ancestors.length, 0);
    });

    it('should handle empty descendants for leaf', () => {
      const tree = new BinaryTree<number>();
      const root = tree.setRoot(1);
      const leaf = tree.addLeft(root, 2);
      
      const descendants = tree.getDescendants(leaf);
      assert.equal(descendants.length, 0);
    });
  });

  describe('Clear method', () => {
    it('should clear all elements', () => {
      const tree = new BinaryTree<number>();
      const root = tree.setRoot(1);
      tree.addLeft(root, 2);
      tree.addRight(root, 3);
      
      tree.clear();
      assert.equal(tree.size, 0);
      assert.equal(tree.isEmpty(), true);
      assert.equal(tree.root, null);
    });

    it('should work on empty tree', () => {
      const tree = new BinaryTree<number>();
      tree.clear();
      assert.equal(tree.size, 0);
      assert.equal(tree.isEmpty(), true);
    });
  });

  describe('ToArray method', () => {
    it('should return level-order array', () => {
      const tree = new BinaryTree<number>();
      const root = tree.setRoot(1);
      tree.addLeft(root, 2);
      tree.addRight(root, 3);
      
      const array = tree.toArray();
      assert.deepEqual(array, [1, 2, 3]);
    });

    it('should return empty array for empty tree', () => {
      const tree = new BinaryTree<number>();
      assert.deepEqual(tree.toArray(), []);
    });
  });

  describe('ToString method', () => {
    it('should return string representation for empty tree', () => {
      const tree = new BinaryTree<number>();
      assert.equal(tree.toString(), 'BinaryTree(0) []');
    });

    it('should return string representation with elements', () => {
      const tree = new BinaryTree<number>();
      const root = tree.setRoot(1);
      tree.addLeft(root, 2);
      tree.addRight(root, 3);
      
      const str = tree.toString();
      assert.equal(str, 'BinaryTree(3) [1, 2, 3]');
    });
  });

  describe('ToJSON method', () => {
    it('should return JSON representation for empty tree', () => {
      const tree = new BinaryTree<number>();
      const json = tree.toJSON();
      assert.deepEqual(json, {
        type: 'BinaryTree',
        size: 0,
        height: -1,
        isEmpty: true,
        elements: []
      });
    });

    it('should return JSON representation with elements', () => {
      const tree = new BinaryTree<number>();
      const root = tree.setRoot(1);
      tree.addLeft(root, 2);
      tree.addRight(root, 3);
      
      const json = tree.toJSON();
      assert.deepEqual(json, {
        type: 'BinaryTree',
        size: 3,
        height: 1,
        isEmpty: false,
        elements: [1, 2, 3]
      });
    });
  });

  describe('Iterator functionality', () => {
    it('should be iterable with for...of loop', () => {
      const tree = new BinaryTree<number>();
      const root = tree.setRoot(1);
      tree.addLeft(root, 2);
      tree.addRight(root, 3);
      
      const elements: number[] = [];
      for (const element of tree) {
        elements.push(element);
      }
      
      assert.deepEqual(elements, [1, 2, 3]);
    });

    it('should work with empty tree iterator', () => {
      const tree = new BinaryTree<number>();
      const elements: number[] = [];
      for (const element of tree) {
        elements.push(element);
      }
      assert.deepEqual(elements, []);
    });

    it('should work with spread operator', () => {
      const tree = new BinaryTree<number>();
      const root = tree.setRoot(1);
      tree.addLeft(root, 2);
      tree.addRight(root, 3);
      
      const elements = [...tree];
      assert.deepEqual(elements, [1, 2, 3]);
    });

    it('should work with Array.from', () => {
      const tree = new BinaryTree<number>();
      const root = tree.setRoot(1);
      tree.addLeft(root, 2);
      tree.addRight(root, 3);
      
      const elements = Array.from(tree);
      assert.deepEqual(elements, [1, 2, 3]);
    });
  });

  describe('Edge cases and error handling', () => {
    it('should handle single node tree correctly', () => {
      const tree = new BinaryTree<string>();
      const root = tree.setRoot('only');
      
      assert.equal(tree.size, 1);
      assert.equal(tree.height(), 0);
      assert.equal(tree.contains('only'), true);
      assert.equal(root.isLeaf(), true);
      assert.deepEqual(tree.toArray(), ['only']);
    });

    it('should handle unbalanced tree structures', () => {
      const tree = new BinaryTree<number>();
      const root = tree.setRoot(1);
      
      // Create a left-skewed tree
      let current = root;
      for (let i = 2; i <= 5; i++) {
        current = tree.addLeft(current, i);
      }
      
      assert.equal(tree.size, 5);
      assert.equal(tree.height(), 4);
      assert.equal(root.getChildCount(), 1);
      assert.equal(current.isLeaf(), true);
    });

    it('should maintain tree integrity after operations', () => {
      const tree = new BinaryTree<number>();
      const root = tree.setRoot(1);
      const leftChild = tree.addLeft(root, 2);
      const rightChild = tree.addRight(root, 3);
      const grandchild = tree.addLeft(leftChild, 4);
      
      // Verify initial state
      assert.equal(tree.size, 4);
      assert.equal(leftChild.parent, root);
      assert.equal(grandchild.parent, leftChild);
      
      // Remove leftChild subtree
      tree.removeNode(leftChild);
      
      // Verify state after removal
      assert.equal(tree.size, 2);
      assert.equal(root.getChildCount(), 1);
      assert.equal(root.left, null);
      assert.equal(root.right, rightChild);
      assert.equal(tree.contains(2), false);
      assert.equal(tree.contains(4), false);
    });

    it('should handle perfect binary tree', () => {
      const tree = new BinaryTree<number>();
      const root = tree.setRoot(1);
      const left = tree.addLeft(root, 2);
      const right = tree.addRight(root, 3);
      tree.addLeft(left, 4);
      tree.addRight(left, 5);
      tree.addLeft(right, 6);
      tree.addRight(right, 7);
      
      assert.equal(tree.size, 7);
      assert.equal(tree.height(), 2);
      
      const leaves = tree.getLeaves();
      assert.equal(leaves.length, 4);
      const leafData = leaves.map(n => n.data).sort((a, b) => a - b);
      assert.deepEqual(leafData, [4, 5, 6, 7]);
    });
  });
});
