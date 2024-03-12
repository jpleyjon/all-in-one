// c8 ignore file

/**
 * @interface
 * Interface for a linear data structure.
 */
export default interface ILinearStructure {
  /**
   * Getter for the size of the structure.
   * @type {number}
   * @returns {number} The number of elements in the structure.
   */
  get size(): number;

  /**
   * Checks if the structure is empty.
   * @returns {boolean} True if the structure is empty, false otherwise.
   */
  isEmpty(): boolean;
}
