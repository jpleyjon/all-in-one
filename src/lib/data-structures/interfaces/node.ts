// c8 ignore file

/**
 * @interface INode
 *
 * @description
 * Represents a generic node, the fundamental building block for many
 * data structures like linked lists and trees.
 *
 * @template T The type of data stored in the node.
 */
export interface INode<T> {
  /**
   * @description
   * The data payload of the node.
   * @type {T}
   */
  data: T;

  /**
   * @description
   * A reference to the next node in the sequence, or `null` if this is the last node.
   * @type {(INode<T> | null)}
   */
  next: INode<T> | null;
}
