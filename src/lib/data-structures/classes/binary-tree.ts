// Import removed - using duck typing for Comparable objects

/**
 * Custom error class for binary tree operations.
 */
export class BinaryTreeEmptyError extends Error {
  /**
   * Creates a new instance of the BinaryTreeEmptyError class.
   * @param {string} [message] - The error message.
   */
  constructor(message?: string) {
    super(message);
    this.name = 'BinaryTreeEmptyError';
  }
}

/**
 * @class
 * 
 * Represents a node in a binary tree.
 * @template T The type of data stored in the node.
 */
export class BinaryTreeNode<T> {
  public data: T;
  public left: BinaryTreeNode<T> | null = null;
  public right: BinaryTreeNode<T> | null = null;
  public parent: BinaryTreeNode<T> | null = null;

  /**
   * Creates a new binary tree node.
   * @param {T} data - The data to store in the node.
   * @throws {Error} If data is null or undefined.
   */
  constructor(data: T) {
    if (data === null || data === undefined) {
      throw new Error('BinaryTreeNode data cannot be null or undefined');
    }
    this.data = data;
    
    // Freeze the data if it's an object to ensure immutability
    if (typeof data === 'object' && data !== null) {
      Object.freeze(data);
    }
  }

  /**
   * Checks if this node is a leaf (has no children).
   * @returns {boolean} True if the node is a leaf, false otherwise.
   */
  isLeaf(): boolean {
    return this.left === null && this.right === null;
  }

  /**
   * Gets the number of children this node has.
   * @returns {number} The number of children (0, 1, or 2).
   */
  getChildCount(): number {
    let count = 0;
    if (this.left !== null) count++;
    if (this.right !== null) count++;
    return count;
  }

  /**
   * Checks if this node has a left child.
   * @returns {boolean} True if the node has a left child, false otherwise.
   */
  hasLeft(): boolean {
    return this.left !== null;
  }

  /**
   * Checks if this node has a right child.
   * @returns {boolean} True if the node has a right child, false otherwise.
   */
  hasRight(): boolean {
    return this.right !== null;
  }

  /**
   * Sets the left child of this node.
   * @param {BinaryTreeNode<T> | null} child - The child node to set.
   */
  setLeft(child: BinaryTreeNode<T> | null): void {
    if (this.left !== null) {
      this.left.parent = null;
    }
    this.left = child;
    if (child !== null) {
      child.parent = this;
    }
  }

  /**
   * Sets the right child of this node.
   * @param {BinaryTreeNode<T> | null} child - The child node to set.
   */
  setRight(child: BinaryTreeNode<T> | null): void {
    if (this.right !== null) {
      this.right.parent = null;
    }
    this.right = child;
    if (child !== null) {
      child.parent = this;
    }
  }

  /**
   * Returns a string representation of the node.
   * @returns {string} String representation.
   */
  toString(): string {
    return `BinaryTreeNode(${this.data}, left: ${this.left !== null}, right: ${this.right !== null})`;
  }

  /**
   * Returns a JSON representation of the node.
   * @returns {object} JSON representation.
   */
  toJSON(): object {
    return {
      data: this.data,
      hasLeft: this.left !== null,
      hasRight: this.right !== null,
      isLeaf: this.isLeaf(),
      childCount: this.getChildCount()
    };
  }
}

/**
 * @class
 * 
 * A general-purpose binary tree implementation.
 * Each node can have at most two children: left and right.
 * @template T The type of elements stored in the tree.
 */
export default class BinaryTree<T> {
  private _root: BinaryTreeNode<T> | null = null;
  private _size: number = 0;

  /**
   * Creates a new binary tree.
   */
  constructor() {
    this._root = null;
    this._size = 0;
  }

  /**
   * Gets the root node of the tree.
   * @returns {BinaryTreeNode<T> | null} The root node or null if tree is empty.
   */
  get root(): BinaryTreeNode<T> | null {
    return this._root;
  }

  /**
   * Gets the size of the tree.
   * @returns {number} The number of nodes in the tree.
   */
  get size(): number {
    return this._size;
  }

  /**
   * Checks if the tree is empty.
   * @returns {boolean} True if the tree is empty, false otherwise.
   */
  isEmpty(): boolean {
    return this._size === 0;
  }

  /**
   * Sets the root node of the tree.
   * @param {T} data - The data for the root node.
   * @returns {BinaryTreeNode<T>} The created root node.
   * @throws {Error} If data is null or undefined.
   */
  setRoot(data: T): BinaryTreeNode<T> {
    if (data === null || data === undefined) {
      throw new Error('Cannot set root with null or undefined data');
    }
    
    this._root = new BinaryTreeNode(data);
    this._size = 1;
    return this._root;
  }

  /**
   * Adds a left child to the specified parent node.
   * @param {BinaryTreeNode<T>} parent - The parent node.
   * @param {T} data - The data for the new child node.
   * @returns {BinaryTreeNode<T>} The created child node.
   * @throws {Error} If data is null or undefined, or if parent already has a left child.
   */
  addLeft(parent: BinaryTreeNode<T>, data: T): BinaryTreeNode<T> {
    if (data === null || data === undefined) {
      throw new Error('Cannot add child with null or undefined data');
    }
    if (parent.left !== null) {
      throw new Error('Parent already has a left child');
    }
    
    const child = new BinaryTreeNode(data);
    parent.setLeft(child);
    this._size++;
    return child;
  }

  /**
   * Adds a right child to the specified parent node.
   * @param {BinaryTreeNode<T>} parent - The parent node.
   * @param {T} data - The data for the new child node.
   * @returns {BinaryTreeNode<T>} The created child node.
   * @throws {Error} If data is null or undefined, or if parent already has a right child.
   */
  addRight(parent: BinaryTreeNode<T>, data: T): BinaryTreeNode<T> {
    if (data === null || data === undefined) {
      throw new Error('Cannot add child with null or undefined data');
    }
    if (parent.right !== null) {
      throw new Error('Parent already has a right child');
    }
    
    const child = new BinaryTreeNode(data);
    parent.setRight(child);
    this._size++;
    return child;
  }

  /**
   * Removes a node from the tree.
   * @param {BinaryTreeNode<T>} node - The node to remove.
   * @returns {boolean} True if the node was removed, false if not found.
   */
  removeNode(node: BinaryTreeNode<T>): boolean {
    if (!this.contains(node.data)) {
      return false;
    }

    const subtreeSize = this.getSubtreeSize(node);
    
    // Remove from parent
    if (node.parent !== null) {
      if (node.parent.left === node) {
        node.parent.setLeft(null);
      } else {
        node.parent.setRight(null);
      }
    } else {
      // Removing root
      this._root = null;
    }

    this._size -= subtreeSize;
    return true;
  }

  /**
   * Calculates the size of a subtree rooted at the given node.
   * @param {BinaryTreeNode<T> | null} node - The root of the subtree.
   * @returns {number} The size of the subtree.
   */
  private getSubtreeSize(node: BinaryTreeNode<T> | null): number {
    if (node === null) return 0;
    return 1 + this.getSubtreeSize(node.left) + this.getSubtreeSize(node.right);
  }

  /**
   * Checks if the tree contains a specific value.
   * @param {T} data - The value to search for.
   * @returns {boolean} True if the value is found, false otherwise.
   */
  contains(data: T): boolean {
    return this.findNode(data) !== null;
  }

  /**
   * Finds a node with the specified data.
   * @param {T} data - The data to search for.
   * @returns {BinaryTreeNode<T> | null} The node if found, null otherwise.
   */
  findNode(data: T): BinaryTreeNode<T> | null {
    return this.findNodeHelper(this._root, data);
  }

  /**
   * Helper method for finding a node.
   * @param {BinaryTreeNode<T> | null} node - The current node.
   * @param {T} data - The data to search for.
   * @returns {BinaryTreeNode<T> | null} The node if found, null otherwise.
   */
  private findNodeHelper(node: BinaryTreeNode<T> | null, data: T): BinaryTreeNode<T> | null {
    if (node === null) return null;
    
    if (this.isEqual(node.data, data)) {
      return node;
    }
    
    const leftResult = this.findNodeHelper(node.left, data);
    if (leftResult !== null) return leftResult;
    
    return this.findNodeHelper(node.right, data);
  }

  /**
   * Checks if two values are equal.
   * @param {T} a - First value.
   * @param {T} b - Second value.
   * @returns {boolean} True if values are equal, false otherwise.
   */
  private isEqual(a: T, b: T): boolean {
    if (a === b) return true;
    
    // Handle Comparable objects
    if (a && typeof a === 'object' && 'isEqual' in a && typeof (a as any).isEqual === 'function') {
      return (a as any).isEqual(b);
    }
    
    return false;
  }

  /**
   * Gets the height of the tree.
   * @returns {number} The height of the tree (-1 if empty).
   */
  height(): number {
    return this.getHeight(this._root);
  }

  /**
   * Helper method to calculate height.
   * @param {BinaryTreeNode<T> | null} node - The node to calculate height from.
   * @returns {number} The height of the subtree.
   */
  private getHeight(node: BinaryTreeNode<T> | null): number {
    if (node === null) return -1;
    return 1 + Math.max(this.getHeight(node.left), this.getHeight(node.right));
  }

  /**
   * Gets the depth of a specific node.
   * @param {BinaryTreeNode<T>} node - The node to find the depth of.
   * @returns {number} The depth of the node (-1 if not found).
   */
  getDepth(node: BinaryTreeNode<T>): number {
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
   * Performs a pre-order traversal (root, left, right).
   * @returns {T[]} Array of elements in pre-order.
   */
  preOrder(): T[] {
    const result: T[] = [];
    this.preOrderHelper(this._root, result);
    return result;
  }

  /**
   * Helper for pre-order traversal.
   * @param {BinaryTreeNode<T> | null} node - Current node.
   * @param {T[]} result - Result array.
   */
  private preOrderHelper(node: BinaryTreeNode<T> | null, result: T[]): void {
    if (node !== null) {
      result.push(node.data);
      this.preOrderHelper(node.left, result);
      this.preOrderHelper(node.right, result);
    }
  }

  /**
   * Performs an in-order traversal (left, root, right).
   * @returns {T[]} Array of elements in in-order.
   */
  inOrder(): T[] {
    const result: T[] = [];
    this.inOrderHelper(this._root, result);
    return result;
  }

  /**
   * Helper for in-order traversal.
   * @param {BinaryTreeNode<T> | null} node - Current node.
   * @param {T[]} result - Result array.
   */
  private inOrderHelper(node: BinaryTreeNode<T> | null, result: T[]): void {
    if (node !== null) {
      this.inOrderHelper(node.left, result);
      result.push(node.data);
      this.inOrderHelper(node.right, result);
    }
  }

  /**
   * Performs a post-order traversal (left, right, root).
   * @returns {T[]} Array of elements in post-order.
   */
  postOrder(): T[] {
    const result: T[] = [];
    this.postOrderHelper(this._root, result);
    return result;
  }

  /**
   * Helper for post-order traversal.
   * @param {BinaryTreeNode<T> | null} node - Current node.
   * @param {T[]} result - Result array.
   */
  private postOrderHelper(node: BinaryTreeNode<T> | null, result: T[]): void {
    if (node !== null) {
      this.postOrderHelper(node.left, result);
      this.postOrderHelper(node.right, result);
      result.push(node.data);
    }
  }

  /**
   * Performs a level-order (breadth-first) traversal.
   * @returns {T[]} Array of elements in level-order.
   */
  levelOrder(): T[] {
    const result: T[] = [];
    if (this._root === null) return result;
    
    const queue: BinaryTreeNode<T>[] = [this._root];
    
    while (queue.length > 0) {
      const node = queue.shift()!;
      result.push(node.data);
      
      if (node.left !== null) queue.push(node.left);
      if (node.right !== null) queue.push(node.right);
    }
    
    return result;
  }

  /**
   * Gets all leaf nodes in the tree.
   * @returns {BinaryTreeNode<T>[]} Array of leaf nodes.
   */
  getLeaves(): BinaryTreeNode<T>[] {
    const leaves: BinaryTreeNode<T>[] = [];
    this.getLeavesHelper(this._root, leaves);
    return leaves;
  }

  /**
   * Helper for getting leaf nodes.
   * @param {BinaryTreeNode<T> | null} node - Current node.
   * @param {BinaryTreeNode<T>[]} leaves - Array to store leaf nodes.
   */
  private getLeavesHelper(node: BinaryTreeNode<T> | null, leaves: BinaryTreeNode<T>[]): void {
    if (node !== null) {
      if (node.isLeaf()) {
        leaves.push(node);
      } else {
        this.getLeavesHelper(node.left, leaves);
        this.getLeavesHelper(node.right, leaves);
      }
    }
  }

  /**
   * Gets all ancestors of a node.
   * @param {BinaryTreeNode<T>} node - The node to find ancestors for.
   * @returns {BinaryTreeNode<T>[]} Array of ancestor nodes.
   */
  getAncestors(node: BinaryTreeNode<T>): BinaryTreeNode<T>[] {
    const ancestors: BinaryTreeNode<T>[] = [];
    let current = node.parent;
    
    while (current !== null) {
      ancestors.push(current);
      current = current.parent;
    }
    
    return ancestors;
  }

  /**
   * Gets all descendants of a node.
   * @param {BinaryTreeNode<T>} node - The node to find descendants for.
   * @returns {BinaryTreeNode<T>[]} Array of descendant nodes.
   */
  getDescendants(node: BinaryTreeNode<T>): BinaryTreeNode<T>[] {
    const descendants: BinaryTreeNode<T>[] = [];
    this.getDescendantsHelper(node, descendants, false);
    return descendants;
  }

  /**
   * Helper for getting descendants.
   * @param {BinaryTreeNode<T> | null} node - Current node.
   * @param {BinaryTreeNode<T>[]} descendants - Array to store descendants.
   * @param {boolean} includeRoot - Whether to include the root in results.
   */
  private getDescendantsHelper(
    node: BinaryTreeNode<T> | null, 
    descendants: BinaryTreeNode<T>[], 
    includeRoot: boolean
  ): void {
    if (node !== null) {
      if (includeRoot) {
        descendants.push(node);
      }
      this.getDescendantsHelper(node.left, descendants, true);
      this.getDescendantsHelper(node.right, descendants, true);
    }
  }

  /**
   * Clears all elements from the tree.
   */
  clear(): void {
    this._root = null;
    this._size = 0;
  }

  /**
   * Returns an array representation of the tree (level-order).
   * @returns {T[]} Array of elements.
   */
  toArray(): T[] {
    return this.levelOrder();
  }

  /**
   * Returns a string representation of the tree.
   * @returns {string} String representation.
   */
  toString(): string {
    const elements = this.toArray();
    return `BinaryTree(${this._size}) [${elements.join(', ')}]`;
  }

  /**
   * Returns a JSON representation of the tree.
   * @returns {object} JSON representation.
   */
  toJSON(): object {
    return {
      type: 'BinaryTree',
      size: this._size,
      height: this.height(),
      isEmpty: this.isEmpty(),
      elements: this.toArray()
    };
  }

  /**
   * Makes the tree iterable.
   * @returns {Iterator<T>} Iterator for the tree elements.
   */
  *[Symbol.iterator](): Iterator<T> {
    const elements = this.levelOrder();
    for (const element of elements) {
      yield element;
    }
  }
}
