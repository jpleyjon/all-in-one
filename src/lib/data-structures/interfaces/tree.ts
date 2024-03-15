// c8 ignore file

/**
 * Interface for a tree data structure.
 * @template T The type of elements in the tree.
 */
export default interface Tree<T> {
  /**
   * Performs a pre-order traversal of the tree (visits each node before its children).
   * @returns A list of the elements in the order they were visited.
   */
  preOrder(): T[];

  /**
   * Performs an in-order traversal of the tree (visits left child, then parent, then right child).
   * @returns A list of the elements in the order they were visited.
   */
  inOrder(): T[];

  /**
   * Performs a post-order traversal of the tree (visits each node after its children).
   * @returns A list of the elements in the order they were visited.
   */
  postOrder(): T[];

  /**
   * Performs a level-order traversal of the tree (visits the nodes level by level from left to right).
   * @returns A list of the elements in the order they were visited.
   */
  levelOrder(): T[];
}
