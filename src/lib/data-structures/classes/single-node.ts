import Node from './node';

/**
 * Represents a node in a singly linked list.
 * Each node contains data and a reference to the next node in the list.
 * 
 * @template T The type of data to be stored in the node.
 * 
 * @example
 * ```typescript
 * const node1 = new SingleNode("first");
 * const node2 = new SingleNode("second");
 * node1.next = node2;
 * 
 * console.log(node1.hasNext()); // true
 * console.log(node2.hasNext()); // false
 * ```
 */
export default class SingleNode<T> extends Node<T> {
  private _next: SingleNode<T> | null = null;

  /**
   * Creates a new SingleNode instance.
   * 
   * @param {T} data The data to be stored in the node.
   * 
   * @example
   * ```typescript
   * const node = new SingleNode("hello");
   * console.log(node.data); // "hello"
   * console.log(node.next); // null
   * ```
   */
  constructor(data: T) {
    super(data);
  }

  /**
   * Gets the next node in the linked list.
   * 
   * @returns {SingleNode<T> | null} The next node or null if this is the last node.
   * 
   * @example
   * ```typescript
   * const node1 = new SingleNode("first");
   * const node2 = new SingleNode("second");
   * node1.next = node2;
   * 
   * console.log(node1.next === node2); // true
   * console.log(node2.next); // null
   * ```
   */
  get next(): SingleNode<T> | null {
    return this._next;
  }

  /**
   * Sets the next node in the linked list.
   * Validates against self-reference to prevent basic circular references.
   * 
   * @param {SingleNode<T> | null} next The next node or null.
   * @throws {Error} If setting next to self (immediate circular reference).
   * 
   * @example
   * ```typescript
   * const node1 = new SingleNode("first");
   * const node2 = new SingleNode("second");
   * node1.next = node2; // Valid
   * 
   * // This would throw an error:
   * // node1.next = node1; // Circular reference!
   * ```
   */
  set next(next: SingleNode<T> | null) {
    if (next === this) {
      throw new Error('Cannot set next to self - circular reference detected');
    }
    this._next = next;
  }

  /**
   * Checks if this node has a next node.
   * 
   * @returns {boolean} True if there is a next node, false otherwise.
   * 
   * @example
   * ```typescript
   * const node1 = new SingleNode("first");
   * const node2 = new SingleNode("second");
   * 
   * console.log(node1.hasNext()); // false
   * node1.next = node2;
   * console.log(node1.hasNext()); // true
   * ```
   */
  hasNext(): boolean {
    return this._next !== null;
  }

  /**
   * Creates a shallow clone of this single node only.
   * Does not clone the chain - that's the responsibility of the List class.
   * 
   * @returns {SingleNode<T>} A new SingleNode with the same data but no next reference.
   * 
   * @example
   * ```typescript
   * const original = new SingleNode("test");
   * const node2 = new SingleNode("next");
   * original.next = node2;
   * 
   * const cloned = original.clone();
   * console.log(cloned.data); // "test"
   * console.log(cloned.next); // null (shallow clone)
   * console.log(cloned !== original); // true (different instances)
   * ```
   */
  clone(): SingleNode<T> {
    return new SingleNode(this.data);
  }

  /**
   * Returns a string representation of this node only.
   * 
   * @returns {string} String representation of just this node.
   * 
   * @example
   * ```typescript
   * const node = new SingleNode("hello");
   * console.log(node.toString()); // "SingleNode(hello)"
   * ```
   */
  toString(): string {
    return `SingleNode(${String(this.data)})`;
  }

  /**
   * Returns a JSON representation including next node information.
   * 
   * @returns {object} JSON object with data and hasNext information.
   * 
   * @example
   * ```typescript
   * const node1 = new SingleNode("test");
   * const node2 = new SingleNode("next");
   * node1.next = node2;
   * 
   * console.log(node1.toJSON()); 
   * // { data: "test", hasNext: true }
   * ```
   */
  toJSON(): { data: T; hasNext: boolean; } {
    return {
      data: this.data,
      hasNext: this.hasNext()
    };
  }
}
