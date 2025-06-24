import Comparable from '../interfaces/comparable';

/**
 * Abstract class for a Node in a data structure.
 * Provides a foundation for implementing various types of nodes with type-safe data storage.
 * 
 * @template T The type of data to be stored in the node. Must be comparable, string, or number.
 * 
 * @example
 * ```typescript
 * class SimpleNode<T> extends Node<T> {
 *   equals(other: Node<T>): boolean {
 *     return this.data === other.data;
 *   }
 * }
 * 
 * const node = new SimpleNode("hello");
 * console.log(node.toString()); // "Node(hello)"
 * ```
 */
export default abstract class Node<T> {
  private readonly _data: T;

  /**
   * Constructs a new Node instance.
   * 
   * @param {T} data The data to be stored in the node.
   * @throws {Error} If data is null or undefined.
   * 
   * @example
   * ```typescript
   * const node = new MyNode("test data");
   * ```
   */
  constructor(data: T) {
    if (data === null || data === undefined) {
      throw new Error('Node data cannot be null or undefined');
    }
    
    // Deep freeze objects to ensure immutability
    this._data = typeof data === 'object' && data !== null 
      ? Object.freeze(data) as T 
      : data;
  }

  /**
   * Getter for the data stored in the node.
   * 
   * @returns {T} The data stored in the node.
   * 
   * @example
   * ```typescript
   * const data = node.data;
   * ```
   */
  get data(): T {
    return this._data;
  }

  /**
   * Check equality with another node.
   * Default implementation compares data using strict equality.
   * Override in concrete classes for custom equality logic.
   * 
   * @param {Node<T>} other The other node to compare with.
   * @returns {boolean} True if the nodes are equal, false otherwise.
   * 
   * @example
   * ```typescript
   * const node1 = new MyNode("test");
   * const node2 = new MyNode("test");
   * console.log(node1.equals(node2)); // true if data is equal
   * ```
   */
  equals(other: Node<T>): boolean {
    return this.hasData(other.data);
  }

  /**
   * Checks if the data in this node is equal to the given data.
   * Uses strict equality for primitives and isEqual method for Comparable objects.
   * 
   * @param {T} data The data to compare with.
   * @returns {boolean} True if the data is equal, false otherwise.
   * 
   * @example
   * ```typescript
   * const node = new MyNode("test");
   * console.log(node.hasData("test")); // true
   * console.log(node.hasData("other")); // false
   * ```
   */
  hasData(data: T): boolean {
    if (typeof this._data === 'object' && this._data !== null && 'isEqual' in this._data) {
      const comparableData = this._data as unknown as Comparable;
      const comparableOther = data as unknown as Comparable;
      return comparableData.isEqual(comparableOther);
    }
    return this._data === data;
  }

  /**
   * Returns a string representation of the node.
   * 
   * @returns {string} String representation in the format "Node(data)".
   * 
   * @example
   * ```typescript
   * const node = new MyNode("hello");
   * console.log(node.toString()); // "Node(hello)"
   * ```
   */
  toString(): string {
    return `Node(${String(this._data)})`;
  }

  /**
   * Returns a JSON representation of the node for serialization.
   * 
   * @returns {object} An object containing the node's data.
   * 
   * @example
   * ```typescript
   * const node = new MyNode("test");
   * const json = node.toJSON(); // { data: "test" }
   * console.log(JSON.stringify(json)); // '{"data":"test"}'
   * ```
   */
  toJSON(): { data: T } {
    return { data: this._data };
  }

  /**
   * Creates a shallow copy of this node with the same data.
   * Default implementation works for basic node types.
   * Override in concrete classes that have additional properties.
   * 
   * @returns {Node<T>} A new instance with the same data.
   * 
   * @example
   * ```typescript
   * const original = new MyNode("test");
   * const copy = original.clone();
   * console.log(copy.equals(original)); // true
   * ```
   */
  clone(): Node<T> {
    // This is a basic implementation - concrete classes should override
    const constructor = this.constructor as new (data: T) => this;
    return new constructor(this._data);
  }

  /**
   * Checks if this node's data is greater than another node's data.
   * Only works with Comparable objects or primitive types that support comparison.
   * 
   * @param {Node<T>} other The other node to compare with.
   * @returns {boolean} True if this node's data is greater, false otherwise.
   * @throws {Error} If the data types don't support comparison.
   * 
   * @example
   * ```typescript
   * const node1 = new MyNode(5);
   * const node2 = new MyNode(3);
   * console.log(node1.isGreaterThan(node2)); // true
   * ```
   */
  isGreaterThan(other: Node<T>): boolean {
    if (typeof this._data === 'object' && this._data !== null && 'isGreaterThan' in this._data) {
      const comparableThis = this._data as unknown as Comparable;
      const comparableOther = other._data as unknown as Comparable;
      return comparableThis.isGreaterThan(comparableOther);
    }
    
    if (typeof this._data === 'number' && typeof other._data === 'number') {
      return this._data > other._data;
    }
    
    if (typeof this._data === 'string' && typeof other._data === 'string') {
      return this._data > other._data;
    }
    
    throw new Error('Data types do not support comparison');
  }

  /**
   * Checks if this node's data is less than another node's data.
   * Only works with Comparable objects or primitive types that support comparison.
   * 
   * @param {Node<T>} other The other node to compare with.
   * @returns {boolean} True if this node's data is less, false otherwise.
   * @throws {Error} If the data types don't support comparison.
   * 
   * @example
   * ```typescript
   * const node1 = new MyNode(3);
   * const node2 = new MyNode(5);
   * console.log(node1.isLessThan(node2)); // true
   * ```
   */
  isLessThan(other: Node<T>): boolean {
    if (typeof this._data === 'object' && this._data !== null && 'isLesserThan' in this._data) {
      const comparableThis = this._data as unknown as Comparable;
      const comparableOther = other._data as unknown as Comparable;
      return comparableThis.isLesserThan(comparableOther);
    }
    
    if (typeof this._data === 'number' && typeof other._data === 'number') {
      return this._data < other._data;
    }
    
    if (typeof this._data === 'string' && typeof other._data === 'string') {
      return this._data < other._data;
    }
    
    throw new Error('Data types do not support comparison');
  }
}
