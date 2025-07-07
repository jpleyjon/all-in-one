import { describe, it } from 'node:test';
import assert from 'node:assert';
import GeneralTree, { TreeNode, TreeEmptyError } from './tree';
import MockClass from '../fixtures/mock-class';

describe('GeneralTree', () => {
  describe('Constructor and Basic Properties', () => {
    it('should create an empty tree', () => {
      const tree = new GeneralTree<number>();
      assert.equal(tree.size, 0);
      assert.equal(tree.isEmpty(), true);
      assert.equal(tree.root, null);
    });
  });

  describe('TreeNode', () => {
    it('should create a tree node with data', () => {
      const node = new TreeNode(42);
      assert.equal(node.data, 42);
      assert.equal(node.isLeaf(), true);
      assert.equal(node.getChildCount(), 0);
      assert.equal(node.children.length, 0);
    });

    it('should throw error for null data', () => {
      assert.throws(() => {
        new TreeNode(null);
      }, { message: 'TreeNode data cannot be null or undefined' });
    });

    it('should throw error for undefined data', () => {
      assert.throws(() => {
        new TreeNode(undefined);
      }, { message: 'TreeNode data cannot be null or undefined' });
    });

    it('should correctly manage child nodes', () => {
      const root = new TreeNode(10);
      const child1 = new TreeNode(5);
      const child2 = new TreeNode(15);
      
      root.addChild(child1);
      root.addChild(child2);
      
      assert.equal(root.isLeaf(), false);
      assert.equal(root.getChildCount(), 2);
      assert.equal(child1.parent, root);
      assert.equal(child2.parent, root);
      assert.equal(child1.isLeaf(), true);
      assert.equal(child2.isLeaf(), true);
    });

    it('should have string representation', () => {
      const node = new TreeNode(42);
      assert.equal(node.toString(), 'TreeNode(42, children: 0)');
    });

    it('should have JSON representation', () => {
      const node = new TreeNode(42);
      const json = node.toJSON();
      assert.deepEqual(json, {
        data: 42,
        childCount: 0,
        isLeaf: true,
        children: []
      });
    });

    it('should test getChild method edge cases', () => {
      const root = new TreeNode('root');
      const child1 = new TreeNode('child1');
      const child2 = new TreeNode('child2');
      
      root.addChild(child1);
      root.addChild(child2);
      
      // Valid indices
      assert.equal(root.getChild(0), child1);
      assert.equal(root.getChild(1), child2);
      
      // Invalid indices
      assert.equal(root.getChild(-1), null);
      assert.equal(root.getChild(2), null);
      assert.equal(root.getChild(10), null);
    });

    it('should test removeChild method edge cases', () => {
      const root = new TreeNode('root');
      const child1 = new TreeNode('child1');
      const child2 = new TreeNode('child2');
      const notAChild = new TreeNode('not-a-child');
      
      root.addChild(child1);
      root.addChild(child2);
      
      // Remove existing child
      assert.equal(root.removeChild(child1), true);
      assert.equal(root.children.length, 1);
      assert.equal(child1.parent, null);
      
      // Try to remove non-existing child
      assert.equal(root.removeChild(notAChild), false);
      assert.equal(root.children.length, 1);
      
      // Try to remove already removed child
      assert.equal(root.removeChild(child1), false);
    });

    it('should test hasChild method', () => {
      const root = new TreeNode('root');
      const child1 = new TreeNode('child1');
      const child2 = new TreeNode('child2');
      const notAChild = new TreeNode('not-a-child');
      
      root.addChild(child1);
      root.addChild(child2);
      
      // Check existing children
      assert.equal(root.hasChild(child1), true);
      assert.equal(root.hasChild(child2), true);
      
      // Check non-existing child
      assert.equal(root.hasChild(notAChild), false);
      
      // Check after removal
      root.removeChild(child1);
      assert.equal(root.hasChild(child1), false);
      assert.equal(root.hasChild(child2), true);
    });
  });

  describe('TreeEmptyError', () => {
    it('should create error with custom message', () => {
      const customMessage = 'Custom tree empty error message';
      const error = new TreeEmptyError(customMessage);
      assert.equal(error.message, customMessage);
      assert.equal(error.name, 'TreeEmptyError');
    });

    it('should create error with default message', () => {
      const error = new TreeEmptyError();
      assert.equal(error.name, 'TreeEmptyError');
    });
  });

  describe('Root Management', () => {
    it('should set root node', () => {
      const tree = new GeneralTree<number>();
      const root = tree.setRoot(10);
      assert.equal(tree.size, 1);
      assert.equal(tree.root, root);
      assert.equal(root.data, 10);
    });

    it('should replace existing root', () => {
      const tree = new GeneralTree<number>();
      tree.setRoot(10);
      const newRoot = tree.setRoot(20);
      assert.equal(tree.size, 1);
      assert.equal(tree.root, newRoot);
      assert.equal(newRoot.data, 20);
    });

    it('should throw error for null/undefined root data', () => {
      const tree = new GeneralTree<number>();
      assert.throws(() => {
        tree.setRoot(null as any);
      }, { message: 'Cannot set root with null or undefined data' });
      
      assert.throws(() => {
        tree.setRoot(undefined as any);
      }, { message: 'Cannot set root with null or undefined data' });
    });
  });

  describe('Child Management', () => {
    it('should add children to nodes', () => {
      const tree = new GeneralTree<string>();
      const root = tree.setRoot('root');
      const child1 = tree.addChild(root, 'child1');
      const child2 = tree.addChild(root, 'child2');
      
      assert.equal(tree.size, 3);
      assert.equal(root.getChildCount(), 2);
      assert.equal(child1.data, 'child1');
      assert.equal(child2.data, 'child2');
      assert.equal(child1.parent, root);
      assert.equal(child2.parent, root);
    });

    it('should add nested children', () => {
      const tree = new GeneralTree<number>();
      const root = tree.setRoot(1);
      const child1 = tree.addChild(root, 2);
      const child2 = tree.addChild(root, 3);
      const grandchild1 = tree.addChild(child1, 4);
      const grandchild2 = tree.addChild(child1, 5);
      
      assert.equal(tree.size, 5);
      assert.equal(root.getChildCount(), 2);
      assert.equal(child1.getChildCount(), 2);
      assert.equal(child2.getChildCount(), 0);
      assert.equal(grandchild1.parent, child1);
      assert.equal(grandchild2.parent, child1);
    });

    it('should throw error for null/undefined child data', () => {
      const tree = new GeneralTree<number>();
      const root = tree.setRoot(10);
      
      assert.throws(() => {
        tree.addChild(root, null as any);
      }, { message: 'Cannot add child with null or undefined data' });
      
      assert.throws(() => {
        tree.addChild(root, undefined as any);
      }, { message: 'Cannot add child with null or undefined data' });
    });
  });

  describe('Node Removal', () => {
    it('should remove leaf nodes', () => {
      const tree = new GeneralTree<number>();
      const root = tree.setRoot(1);
      const child1 = tree.addChild(root, 2);
      const child2 = tree.addChild(root, 3);
      
      assert.equal(tree.removeNode(child1), true);
      assert.equal(tree.size, 2);
      assert.equal(root.getChildCount(), 1);
      assert.equal(root.children[0], child2);
    });

    it('should remove nodes with children (removes entire subtree)', () => {
      const tree = new GeneralTree<number>();
      const root = tree.setRoot(1);
      const child1 = tree.addChild(root, 2);
      const child2 = tree.addChild(root, 3);
      const grandchild = tree.addChild(child1, 4);
      
      assert.equal(tree.removeNode(child1), true);
      assert.equal(tree.size, 2); // root + child2
      assert.equal(root.getChildCount(), 1);
      assert.equal(root.children[0], child2);
    });

    it('should remove root node (clears entire tree)', () => {
      const tree = new GeneralTree<number>();
      const root = tree.setRoot(1);
      tree.addChild(root, 2);
      tree.addChild(root, 3);
      
      assert.equal(tree.removeNode(root), true);
      assert.equal(tree.size, 0);
      assert.equal(tree.root, null);
      assert.equal(tree.isEmpty(), true);
    });

    it('should return false for nodes not in tree', () => {
      const tree = new GeneralTree<number>();
      const root = tree.setRoot(1);
      const orphanNode = new TreeNode(99);
      
      assert.equal(tree.removeNode(orphanNode), false);
      assert.equal(tree.size, 1);
    });
  });

  describe('Search and Contains', () => {
    it('should find existing values', () => {
      const tree = new GeneralTree<number>();
      const root = tree.setRoot(1);
      tree.addChild(root, 2);
      tree.addChild(root, 3);
      const child = tree.addChild(root, 4);
      tree.addChild(child, 5);
      
      assert.equal(tree.contains(1), true);
      assert.equal(tree.contains(2), true);
      assert.equal(tree.contains(3), true);
      assert.equal(tree.contains(4), true);
      assert.equal(tree.contains(5), true);
    });

    it('should return false for non-existing values', () => {
      const tree = new GeneralTree<number>();
      const root = tree.setRoot(1);
      tree.addChild(root, 2);
      tree.addChild(root, 3);
      
      assert.equal(tree.contains(4), false);
      assert.equal(tree.contains(100), false);
    });

    it('should work with empty tree', () => {
      const tree = new GeneralTree<number>();
      assert.equal(tree.contains(10), false);
    });

    it('should find nodes by data', () => {
      const tree = new GeneralTree<string>();
      const root = tree.setRoot('root');
      const child = tree.addChild(root, 'child');
      
      const foundNode = tree.findNode('child');
      assert.equal(foundNode, child);
      assert.equal(tree.findNode('nonexistent'), null);
    });

    it('should work with Comparable objects', () => {
      const tree = new GeneralTree<MockClass>();
      const root = tree.setRoot(new MockClass(1));
      const child = tree.addChild(root, new MockClass(2));
      
      assert.equal(tree.contains(new MockClass(1)), true);
      assert.equal(tree.contains(new MockClass(2)), true);
      assert.equal(tree.contains(new MockClass(3)), false);
    });
  });

  describe('Height and Depth', () => {
    it('should return -1 for empty tree', () => {
      const tree = new GeneralTree<number>();
      assert.equal(tree.height(), -1);
    });

    it('should return 0 for single node', () => {
      const tree = new GeneralTree<number>();
      tree.setRoot(10);
      assert.equal(tree.height(), 0);
    });

    it('should calculate correct height for complex tree', () => {
      const tree = new GeneralTree<number>();
      const root = tree.setRoot(1);
      const child1 = tree.addChild(root, 2);
      const child2 = tree.addChild(root, 3);
      const grandchild = tree.addChild(child1, 4);
      tree.addChild(grandchild, 5);
      
      assert.equal(tree.height(), 3);
    });

    it('should calculate node depth correctly', () => {
      const tree = new GeneralTree<number>();
      const root = tree.setRoot(1);
      const child = tree.addChild(root, 2);
      const grandchild = tree.addChild(child, 3);
      
      assert.equal(tree.getDepth(root), 0);
      assert.equal(tree.getDepth(child), 1);
      assert.equal(tree.getDepth(grandchild), 2);
    });

    it('should return -1 for nodes not in tree', () => {
      const tree = new GeneralTree<number>();
      const root = tree.setRoot(1);
      tree.addChild(root, 2);
      
      // Create a node that's not part of this tree
      const orphanNode = new TreeNode(99);
      assert.equal(tree.getDepth(orphanNode), -1);
    });
  });

  describe('Traversal methods', () => {
    it('should perform pre-order traversal', () => {
      const tree = new GeneralTree<number>();
      const root = tree.setRoot(1);
      const child1 = tree.addChild(root, 2);
      const child2 = tree.addChild(root, 3);
      tree.addChild(child1, 4);
      tree.addChild(child1, 5);
      tree.addChild(child2, 6);
      
      const preOrder = tree.preOrder();
      assert.deepEqual(preOrder, [1, 2, 4, 5, 3, 6]);
    });

    it('should perform post-order traversal', () => {
      const tree = new GeneralTree<number>();
      const root = tree.setRoot(1);
      const child1 = tree.addChild(root, 2);
      const child2 = tree.addChild(root, 3);
      tree.addChild(child1, 4);
      tree.addChild(child1, 5);
      tree.addChild(child2, 6);
      
      const postOrder = tree.postOrder();
      assert.deepEqual(postOrder, [4, 5, 2, 6, 3, 1]);
    });

    it('should perform in-order traversal (equivalent to pre-order for general trees)', () => {
      const tree = new GeneralTree<number>();
      const root = tree.setRoot(1);
      const child1 = tree.addChild(root, 2);
      const child2 = tree.addChild(root, 3);
      tree.addChild(child1, 4);
      tree.addChild(child1, 5);
      
      const inOrder = tree.inOrder();
      const preOrder = tree.preOrder();
      assert.deepEqual(inOrder, preOrder);
    });

    it('should perform level-order traversal', () => {
      const tree = new GeneralTree<number>();
      const root = tree.setRoot(1);
      const child1 = tree.addChild(root, 2);
      const child2 = tree.addChild(root, 3);
      tree.addChild(child1, 4);
      tree.addChild(child1, 5);
      tree.addChild(child2, 6);
      
      const levelOrder = tree.levelOrder();
      assert.deepEqual(levelOrder, [1, 2, 3, 4, 5, 6]);
    });

    it('should return empty arrays for empty tree', () => {
      const tree = new GeneralTree<number>();
      assert.deepEqual(tree.preOrder(), []);
      assert.deepEqual(tree.postOrder(), []);
      assert.deepEqual(tree.inOrder(), []);
      assert.deepEqual(tree.levelOrder(), []);
    });
  });

  describe('Utility methods', () => {
    it('should get leaf nodes', () => {
      const tree = new GeneralTree<number>();
      const root = tree.setRoot(1);
      const child1 = tree.addChild(root, 2);
      const child2 = tree.addChild(root, 3);
      const grandchild = tree.addChild(child1, 4);
      
      const leaves = tree.getLeaves();
      assert.equal(leaves.length, 2);
      assert.equal(leaves[0].data, 4);
      assert.equal(leaves[1].data, 3);
    });

    it('should get ancestors', () => {
      const tree = new GeneralTree<number>();
      const root = tree.setRoot(1);
      const child = tree.addChild(root, 2);
      const grandchild = tree.addChild(child, 3);
      
      const ancestors = tree.getAncestors(grandchild);
      assert.equal(ancestors.length, 2);
      assert.equal(ancestors[0].data, 2);
      assert.equal(ancestors[1].data, 1);
    });

    it('should get descendants', () => {
      const tree = new GeneralTree<number>();
      const root = tree.setRoot(1);
      const child1 = tree.addChild(root, 2);
      const child2 = tree.addChild(root, 3);
      tree.addChild(child1, 4);
      tree.addChild(child1, 5);
      
      const descendants = tree.getDescendants(root);
      assert.equal(descendants.length, 4);
      const descendantData = descendants.map(n => n.data).sort((a, b) => a - b);
      assert.deepEqual(descendantData, [2, 3, 4, 5]);
    });
  });

  describe('Clear method', () => {
    it('should clear all elements', () => {
      const tree = new GeneralTree<number>();
      const root = tree.setRoot(1);
      tree.addChild(root, 2);
      tree.addChild(root, 3);
      
      tree.clear();
      assert.equal(tree.size, 0);
      assert.equal(tree.isEmpty(), true);
      assert.equal(tree.root, null);
    });

    it('should work on empty tree', () => {
      const tree = new GeneralTree<number>();
      tree.clear();
      assert.equal(tree.size, 0);
      assert.equal(tree.isEmpty(), true);
    });
  });

  describe('ToArray method', () => {
    it('should return level-order array', () => {
      const tree = new GeneralTree<number>();
      const root = tree.setRoot(1);
      tree.addChild(root, 2);
      tree.addChild(root, 3);
      
      const array = tree.toArray();
      assert.deepEqual(array, [1, 2, 3]);
    });

    it('should return empty array for empty tree', () => {
      const tree = new GeneralTree<number>();
      assert.deepEqual(tree.toArray(), []);
    });
  });

  describe('ToString method', () => {
    it('should return string representation for empty tree', () => {
      const tree = new GeneralTree<number>();
      assert.equal(tree.toString(), 'GeneralTree(0) []');
    });

    it('should return string representation with elements', () => {
      const tree = new GeneralTree<number>();
      const root = tree.setRoot(1);
      tree.addChild(root, 2);
      tree.addChild(root, 3);
      
      const str = tree.toString();
      assert.equal(str, 'GeneralTree(3) [1, 2, 3]');
    });
  });

  describe('ToJSON method', () => {
    it('should return JSON representation for empty tree', () => {
      const tree = new GeneralTree<number>();
      const json = tree.toJSON();
      assert.deepEqual(json, {
        type: 'GeneralTree',
        size: 0,
        height: -1,
        isEmpty: true,
        elements: []
      });
    });

    it('should return JSON representation with elements', () => {
      const tree = new GeneralTree<number>();
      const root = tree.setRoot(1);
      tree.addChild(root, 2);
      tree.addChild(root, 3);
      
      const json = tree.toJSON();
      assert.deepEqual(json, {
        type: 'GeneralTree',
        size: 3,
        height: 1,
        isEmpty: false,
        elements: [1, 2, 3]
      });
    });
  });

  describe('Iterator functionality', () => {
    it('should be iterable with for...of loop', () => {
      const tree = new GeneralTree<number>();
      const root = tree.setRoot(1);
      tree.addChild(root, 2);
      tree.addChild(root, 3);
      
      const elements: number[] = [];
      for (const element of tree) {
        elements.push(element);
      }
      
      assert.deepEqual(elements, [1, 2, 3]);
    });

    it('should work with empty tree iterator', () => {
      const tree = new GeneralTree<number>();
      const elements: number[] = [];
      for (const element of tree) {
        elements.push(element);
      }
      assert.deepEqual(elements, []);
    });

    it('should work with spread operator', () => {
      const tree = new GeneralTree<number>();
      const root = tree.setRoot(1);
      tree.addChild(root, 2);
      tree.addChild(root, 3);
      
      const elements = [...tree];
      assert.deepEqual(elements, [1, 2, 3]);
    });

    it('should work with Array.from', () => {
      const tree = new GeneralTree<number>();
      const root = tree.setRoot(1);
      tree.addChild(root, 2);
      tree.addChild(root, 3);
      
      const elements = Array.from(tree);
      assert.deepEqual(elements, [1, 2, 3]);
    });
  });

  describe('Edge cases and error handling', () => {
    it('should handle single node tree correctly', () => {
      const tree = new GeneralTree<string>();
      const root = tree.setRoot('only');
      
      assert.equal(tree.size, 1);
      assert.equal(tree.height(), 0);
      assert.equal(tree.contains('only'), true);
      assert.equal(root.isLeaf(), true);
      assert.deepEqual(tree.toArray(), ['only']);
    });

    it('should handle complex tree structures', () => {
      const tree = new GeneralTree<number>();
      const root = tree.setRoot(1);
      
      // Create a tree with varying branch factors
      const child1 = tree.addChild(root, 2);
      const child2 = tree.addChild(root, 3);
      const child3 = tree.addChild(root, 4);
      
      tree.addChild(child1, 5);
      tree.addChild(child1, 6);
      tree.addChild(child1, 7);
      tree.addChild(child1, 8);
      
      tree.addChild(child2, 9);
      
      // No children for child3
      
      assert.equal(tree.size, 9);
      assert.equal(root.getChildCount(), 3);
      assert.equal(child1.getChildCount(), 4);
      assert.equal(child2.getChildCount(), 1);
      assert.equal(child3.getChildCount(), 0);
    });

    it('should maintain tree integrity after operations', () => {
      const tree = new GeneralTree<number>();
      const root = tree.setRoot(1);
      const child1 = tree.addChild(root, 2);
      const child2 = tree.addChild(root, 3);
      const grandchild = tree.addChild(child1, 4);
      
      // Verify initial state
      assert.equal(tree.size, 4);
      assert.equal(child1.parent, root);
      assert.equal(grandchild.parent, child1);
      
      // Remove child1 subtree
      tree.removeNode(child1);
      
      // Verify state after removal
      assert.equal(tree.size, 2);
      assert.equal(root.getChildCount(), 1);
      assert.equal(root.children[0], child2);
      assert.equal(tree.contains(2), false);
      assert.equal(tree.contains(4), false);
    });

    it('should handle TreeEmptyError properly', () => {
      const tree = new GeneralTree<number>();
      
      // Most methods don't throw TreeEmptyError, they handle empty trees gracefully
      assert.equal(tree.height(), -1);
      assert.equal(tree.contains(1), false);
      assert.deepEqual(tree.toArray(), []);
      assert.deepEqual(tree.preOrder(), []);
      assert.deepEqual(tree.postOrder(), []);
      assert.deepEqual(tree.inOrder(), []);
      assert.deepEqual(tree.levelOrder(), []);
    });
  });
});
