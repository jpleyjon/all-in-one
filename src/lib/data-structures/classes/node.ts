/**
 * Abstract class for a Node in a data structure.
 * @template T The type of data to be stored in the node.
 */
export default abstract class Node<T> {
  private readonly _data: T;

  /**
   * Constructs a new Node instance.
   * @param {T} data The data to be stored in the node.
   */
  constructor(data: T) {
    this._data = data;
  }

  /**
   * Getter for the data stored in the node.
   * @returns {T} The data stored in the node.
   */
  get data(): T {
    return this._data;
  }
}
