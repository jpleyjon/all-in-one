import Node from './node';

/**
 * @class
 * @extends {Node<T>}
 *
 * Represents a node in a singly linked list.
 * Each node has a reference to the next node in the list.
 */
export default class SingleNode<T> extends Node<T> {
  private _next: SingleNode<T> | null = null;

  /**
   * @constructor
   * @param {T} data - The data stored in the node.
   */
  constructor(data: T) {
    super(data);
  }

  /**
   * Getter for the next node.
   * @returns {SingleNode<T> | null} The next node or null if it doesn't exist.
   */
  get next(): SingleNode<T> | null {
    return this._next;
  }

  /**
   * Setter for the next node.
   * @param {SingleNode<T> | null} next - The next node or null.
   */
  set next(next: SingleNode<T> | null) {
    this._next = next;
  }
}
