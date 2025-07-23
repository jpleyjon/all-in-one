// c8 ignore file

import { INode } from './node';

/**
 * @interface IDoubleNode
 * @extends INode<T>
 *
 * @description
 * Represents a node in a doubly-linked list, with references to both the
 * next and the previous nodes in the sequence.
 *
 * @template T The type of data stored in the node.
 */
export interface IDoubleNode<T> extends INode<T> {
  /**
   * @description
   * The data payload of the node.
   * @type {T}
   */
  data: T;

  /**
   * @description
   * A reference to the previous node in the list, or `null` if this is the head.
   * @type {(IDoubleNode<T> | null)}
   */
  prev: IDoubleNode<T> | null;

  /**
   * @description
   * A reference to the next node in the sequence, or `null` if this is the last node.
   * @type {(IDoubleNode<T> | null)}
   */
  next: IDoubleNode<T> | null;
}
