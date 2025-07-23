import { IDoubleNode } from '../interfaces/double-node';
import Node from './node';

/**
 * Class representing a node.
 * @extends Node<T>
 * @implements {IDoubleNode<T>}
 * @template T The type of the data stored in the node.
 */
export default class DoubleNode<T> extends Node<T> implements IDoubleNode<T> {
  /** @private @type {IDoubleNode<T> | null} Reference to the previous node. */
  private _prev: IDoubleNode<T> | null = null;
  /** @private @type {IDoubleNode<T> | null} Reference to the next node. */
  private _next: IDoubleNode<T> | null = null;

  /**
   * Create a new double node.
   * @param {T} data - The data to store in the node.
   */
  constructor(data: T) {
    super(data);
  }

  /**
   * Get the previous node.
   * @return {IDoubleNode<T> | null} The previous node, or null if there is none.
   */
  get prev(): IDoubleNode<T> | null {
    return this._prev;
  }

  /**
   * Set the previous node.
   * @param {IDoubleNode<T> | null} prev - The node to set as the previous node.
   */
  set prev(prev: IDoubleNode<T> | null) {
    this._prev = prev;
  }

  /**
   * Get the next node.
   * @return {IDoubleNode<T> | null} The next node, or null if there is none.
   */
  get next(): IDoubleNode<T> | null {
    return this._next;
  }

  /**
   * Set the next node.
   * @param {IDoubleNode<T> | null} next - The node to set as the next node.
   */
  set next(next: IDoubleNode<T> | null) {
    this._next = next;
  }
}