import Tree from '../interfaces/tree';
import Comparable from '../interfaces/comparable';

/**
 * @class
 * @extends {Error}
 * 
 * Represents an error that occurs when an operation is attempted on an empty tree.
 */
export class TreeEmptyError extends Error {
  /**
   * Creates a new instance of the TreeEmptyError class.
   * @param {string} [message] - The error message.
   */
  constructor(message?: string) {
    super(message);
    this.name = 'TreeEmptyError';
  }
}

/**
 * @class
 * 
 * Represents a node in a general tree (can have multiple children).
 * @template T The type of data stored in the node.
 */
export class TreeNode<T> {
  public data: T;
  public children: TreeNode<T>[] = [];
  public parent: TreeNode<T> | null = null;

  /**
   * Creates a new TreeNode instance.
   * @param {T} data - The data to store in the node.
   */
  constructor(data: T) {
    if (data === null || data === undefined) {
      throw new Error('TreeNode data cannot be null or undefined');
    }
    this.data = data;
  }

  /**
   * Checks if this node is a leaf node (has no children).
   * @returns {boolean} True if the node is a leaf, false otherwise.
   */
  isLeaf(): boolean {
    return this.children.length === 0;
  }

  /**
   * Gets the number of children this node has.
   * @returns {number} The number of children.
   */
  getChildCount(): number {
    return this.children.length;
  }

  /**
   * Adds a child node to this node.
   * @param {TreeNode<T>} child - The child node to add.
   */
  addChild(child: TreeNode<T>): void {
    child.parent = this;
    this.children.push(child);
  }

  /**
   * Removes a child node from this node.
   * @param {TreeNode<T>} child - The child node to remove.
   * @returns {boolean} True if the child was removed, false if not found.
   */
  removeChild(child: TreeNode<T>): boolean {
    const index = this.children.indexOf(child);
    if (index !== -1) {
      this.children.splice(index, 1);
      child.parent = null;
      return true;
    }
    return false;
  }

  /**
   * Gets a child at the specified index.
   * @param {number} index - The index of the child.
   * @returns {TreeNode<T> | null} The child node or null if index is out of bounds.
   */
  getChild(index: number): TreeNode<T> | null {
    if (index < 0 || index >= this.children.length) {
      return null;
    }
    return this.children[index];
  }

  /**
   * Checks if this node has the specified child.
   * @param {TreeNode<T>} child - The child node to check for.
   * @returns {boolean} True if the child exists, false otherwise.
   */
  hasChild(child: TreeNode<T>): boolean {
    return this.children.includes(child);
  }

  /**
   * Returns a string representation of the node.
   * @returns {string} String representation of the node.
   */
  toString(): string {
    return `TreeNode(${this.data}, children: ${this.children.length})`;
  }

  /**
   * Returns a JSON representation of the node.
   * @returns {object} JSON object representing the node.
   */
  toJSON(): object {
    return {
      data: this.data,
      childCount: this.children.length,
      isLeaf: this.isLeaf(),
      children: this.children.map(child => child.data)
    };
  }
}

/**
 * @class
 * @implements {Tree<T>}
 * 
 * A generic Tree implementation that can have multiple children per node.
 * Supports insertion, deletion, searching, and various traversal methods.
 * 
 * Key features:
 * - Supports arbitrary number of children per node
 * - Depth-first and breadth-first traversals
 * - Type-safe generic implementation
 * - Comprehensive error handling
 * - Iterator support for ES6 iteration protocols
 * 
 * @template T The type of elements stored in the tree
 * 
 * @example
 * ```typescript
 * const tree = new GeneralTree<string>();
 * const root = tree.setRoot('root');
 * tree.addChild(root, 'child1');
 * tree.addChild(root, 'child2');
 * 
 * console.log(tree.contains('child1')); // true
 * console.log(tree.size);               // 3
 * ```
 */
export default class GeneralTree<T> implements Tree<T> {
  private _root: TreeNode<T> | null = null;
  private _size: number = 0;

  /**
   * Gets the root node of the tree.
   * @returns {TreeNode<T> | null} The root node, or null if tree is empty.
   */
  get root(): TreeNode<T> | null {
    return this._root;
  }

  /**
   * Gets the current number of nodes in the tree.
   * Time complexity: O(1)
   * @returns {number} The number of nodes in the tree.
   */
  get size(): number {
    return this._size;
  }

  /**
   * Checks if the tree is empty.
   * Time complexity: O(1)
   * @returns {boolean} True if the tree is empty, false otherwise.
   */
  isEmpty(): boolean {
    return this._root === null;
  }

  /**
   * Sets the root of the tree.
   * @param {T} data - The data for the root node.
   * @returns {TreeNode<T>} The created root node.
   * 
   * @example
   * ```typescript
   * const root = tree.setRoot('root');
   * ```
   */
  setRoot(data: T): TreeNode<T> {
    if (data === null || data === undefined) {
      throw new Error('Cannot set root with null or undefined data');
    }

    this._root = new TreeNode(data);
    this._size = 1;
    return this._root;
  }

  /**
   * Adds a child to the specified parent node.
   * @param {TreeNode<T>} parent - The parent node.
   * @param {T} data - The data for the new child node.
   * @returns {TreeNode<T>} The created child node.
   * 
   * @example
   * ```typescript
   * const child = tree.addChild(parentNode, 'child data');
   * ```
   */
  addChild(parent: TreeNode<T>, data: T): TreeNode<T> {
    if (data === null || data === undefined) {
      throw new Error('Cannot add child with null or undefined data');
    }

    const child = new TreeNode(data);
    parent.addChild(child);
    this._size++;
    return child;
  }

  /**
   * Removes a node and all its descendants from the tree.
   * @param {TreeNode<T>} node - The node to remove.
   * @returns {boolean} True if the node was removed, false otherwise.
   */
  removeNode(node: TreeNode<T>): boolean {
    if (node === this._root) {
      this.clear();
      return true;
    }

    if (node.parent !== null) {
      const removedCount = this.countNodes(node);
      node.parent.removeChild(node);
      this._size -= removedCount;
      return true;
    }

    return false;
  }

  /**
   * Counts the number of nodes in a subtree.
   * @private
   * @param {TreeNode<T>} node - The root of the subtree.
   * @returns {number} The number of nodes in the subtree.
   */
  private countNodes(node: TreeNode<T>): number {
    let count = 1; // Count this node
    for (const child of node.children) {
      count += this.countNodes(child);
    }
    return count;
  }

  /**
   * Searches for a value in the tree.
   * Time complexity: O(n)
   * @param {T} data - The data to search for.
   * @returns {boolean} True if the value is found, false otherwise.
   */
  contains(data: T): boolean {
    return this.findNode(data) !== null;
  }

  /**
   * Finds the first node with the specified data.
   * @param {T} data - The data to search for.
   * @returns {TreeNode<T> | null} The node if found, null otherwise.
   */
  findNode(data: T): TreeNode<T> | null {
    if (this._root === null) {
      return null;
    }
    return this.findNodeHelper(this._root, data);
  }

  /**
   * Helper method for finding a node.
   * @private
   */
  private findNodeHelper(node: TreeNode<T>, data: T): TreeNode<T> | null {
    // Check if current node matches
    if (this.isEqual(node.data, data)) {
      return node;
    }

    // Search in children
    for (const child of node.children) {
      const found = this.findNodeHelper(child, data);
      if (found !== null) {
        return found;
      }
    }

    return null;
  }

  /**
   * Compares two values for equality.
   * @private
   * @param {T} a - First value to compare.
   * @param {T} b - Second value to compare.
   * @returns {boolean} True if values are equal, false otherwise.
   */
  private isEqual(a: T, b: T): boolean {
    // Handle Comparable interface
    if (typeof a === 'object' && a !== null && 'isEqual' in a) {
      const comparable = a as any;
      return comparable.isEqual(b);
    }
    
    // Handle primitive types
    return a === b;
  }

  /**
   * Gets the height of the tree.
   * Time complexity: O(n)
   * @returns {number} The height of the tree (-1 for empty tree).
   */
  height(): number {
    if (this._root === null) {
      return -1;
    }
    return this.getHeight(this._root);
  }

  /**
   * Calculates the height of a subtree.
   * @private
   * @param {TreeNode<T>} node - The root of the subtree.
   * @returns {number} The height of the subtree.
   */
  private getHeight(node: TreeNode<T>): number {
    if (node.isLeaf()) {
      return 0;
    }
    
    let maxChildHeight = -1;
    for (const child of node.children) {
      const childHeight = this.getHeight(child);
      maxChildHeight = Math.max(maxChildHeight, childHeight);
    }
    
    return maxChildHeight + 1;
  }

  /**
   * Gets the depth of a specific node.
   * @param {TreeNode<T>} node - The node to find the depth of.
   * @returns {number} The depth of the node (-1 if not found).
   */
  getDepth(node: TreeNode<T>): number {
    let depth = 0;
    let current = node;
    
    while (current.parent !== null) {
      depth++;
      current = current.parent;
    }
    
    // Check if we reached the root
    return current === this._root ? depth : -1;
  }

  /**
   * Performs a depth-first pre-order traversal of the tree.
   * Time complexity: O(n)
   * @returns {T[]} Array of elements in pre-order (root, then children).
   */
  preOrder(): T[] {
    const result: T[] = [];
    if (this._root !== null) {
      this.preOrderHelper(this._root, result);
    }
    return result;
  }

  /**
   * Helper method for pre-order traversal.
   * @private
   */
  private preOrderHelper(node: TreeNode<T>, result: T[]): void {
    result.push(node.data);
    for (const child of node.children) {
      this.preOrderHelper(child, result);
    }
  }

  /**
   * Performs a depth-first post-order traversal of the tree.
   * Time complexity: O(n)
   * @returns {T[]} Array of elements in post-order (children, then root).
   */
  postOrder(): T[] {
    const result: T[] = [];
    if (this._root !== null) {
      this.postOrderHelper(this._root, result);
    }
    return result;
  }

  /**
   * Helper method for post-order traversal.
   * @private
   */
  private postOrderHelper(node: TreeNode<T>, result: T[]): void {
    for (const child of node.children) {
      this.postOrderHelper(child, result);
    }
    result.push(node.data);
  }

  /**
   * Performs an in-order traversal. For general trees, this is equivalent to pre-order.
   * Time complexity: O(n)
   * @returns {T[]} Array of elements in pre-order (since in-order doesn't apply to n-ary trees).
   */
  inOrder(): T[] {
    // For general trees, in-order traversal doesn't have a clear definition
    // We'll return pre-order traversal for compatibility with the Tree interface
    return this.preOrder();
  }

  /**
   * Performs a breadth-first level-order traversal of the tree.
   * Time complexity: O(n)
   * @returns {T[]} Array of elements in level-order (breadth-first).
   */
  levelOrder(): T[] {
    if (this._root === null) {
      return [];
    }

    const result: T[] = [];
    const queue: TreeNode<T>[] = [this._root];

    while (queue.length > 0) {
      const node = queue.shift()!;
      result.push(node.data);

      for (const child of node.children) {
        queue.push(child);
      }
    }

    return result;
  }

  /**
   * Gets all leaf nodes in the tree.
   * @returns {TreeNode<T>[]} Array of all leaf nodes.
   */
  getLeaves(): TreeNode<T>[] {
    const leaves: TreeNode<T>[] = [];
    if (this._root !== null) {
      this.getLeavesHelper(this._root, leaves);
    }
    return leaves;
  }

  /**
   * Helper method for finding leaf nodes.
   * @private
   */
  private getLeavesHelper(node: TreeNode<T>, leaves: TreeNode<T>[]): void {
    if (node.isLeaf()) {
      leaves.push(node);
    } else {
      for (const child of node.children) {
        this.getLeavesHelper(child, leaves);
      }
    }
  }

  /**
   * Gets all ancestors of a node (from parent to root).
   * @param {TreeNode<T>} node - The node to find ancestors for.
   * @returns {TreeNode<T>[]} Array of ancestor nodes.
   */
  getAncestors(node: TreeNode<T>): TreeNode<T>[] {
    const ancestors: TreeNode<T>[] = [];
    let current = node.parent;
    
    while (current !== null) {
      ancestors.push(current);
      current = current.parent;
    }
    
    return ancestors;
  }

  /**
   * Gets all descendants of a node.
   * @param {TreeNode<T>} node - The node to find descendants for.
   * @returns {TreeNode<T>[]} Array of descendant nodes.
   */
  getDescendants(node: TreeNode<T>): TreeNode<T>[] {
    const descendants: TreeNode<T>[] = [];
    this.getDescendantsHelper(node, descendants);
    return descendants;
  }

  /**
   * Helper method for finding descendants.
   * @private
   */
  private getDescendantsHelper(node: TreeNode<T>, descendants: TreeNode<T>[]): void {
    for (const child of node.children) {
      descendants.push(child);
      this.getDescendantsHelper(child, descendants);
    }
  }

  /**
   * Removes all elements from the tree.
   * Time complexity: O(1)
   */
  clear(): void {
    this._root = null;
    this._size = 0;
  }

  /**
   * Converts the tree to an array using level-order traversal.
   * Time complexity: O(n)
   * @returns {T[]} Array containing all tree elements.
   */
  toArray(): T[] {
    return this.levelOrder();
  }

  /**
   * Returns a string representation of the tree.
   * @returns {string} String representation of the tree.
   */
  toString(): string {
    if (this.isEmpty()) {
      return 'GeneralTree(0) []';
    }
    const elements = this.levelOrder().join(', ');
    return `GeneralTree(${this._size}) [${elements}]`;
  }

  /**
   * Returns a JSON representation of the tree.
   * @returns {object} JSON object containing tree metadata and elements.
   */
  toJSON(): object {
    return {
      type: 'GeneralTree',
      size: this._size,
      height: this.height(),
      isEmpty: this.isEmpty(),
      elements: this.levelOrder()
    };
  }

  /**
   * Makes the tree iterable using the ES6 iteration protocol.
   * Iterates in level-order.
   * @returns {Iterator<T>} An iterator for the tree elements.
   */
  *[Symbol.iterator](): Iterator<T> {
    yield* this.levelOrderIterator();
  }

  /**
   * Generator for level-order traversal.
   * @private
   */
  private *levelOrderIterator(): Generator<T> {
    if (this._root === null) {
      return;
    }

    const queue: TreeNode<T>[] = [this._root];

    while (queue.length > 0) {
      const node = queue.shift()!;
      yield node.data;

      for (const child of node.children) {
        queue.push(child);
      }
    }
  }
}
