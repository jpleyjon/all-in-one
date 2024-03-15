import SingleNode from './single-node';

/**
 * Class representing a node.
 * @extends SingleNode
 * @template T The type of the data stored in the node.
 */
export default class DoubleNode<T> extends SingleNode<T> {
  /** @private @type {SingleNode<T> | null} Reference to the previous node. */
  private _prev: SingleNode<T> | null = null;

  /**
   * Create a new double node.
   * @param {T} data - The data to store in the node.
   */
  constructor(data: T) {
    super(data);
  }

  /**
   * Get the previous node.
   * @return {SingleNode<T> | null} The previous node, or null if there is none.
   */
  get prev(): SingleNode<T> | null {
    return this._prev;
  }

  /**
   * Set the previous node.
   * @param {SingleNode<T> | null} prev - The node to set as the previous node.
   */
  set prev(prev: SingleNode<T> | null) {
    this._prev = prev;
  }
}