// c8 ignore file

/**
 * Interface for objects that can be compared for equality and order.
 */
export default interface IComparable {
  /**
   * Checks if the current object is equal to the given object.
   * @param object - The object to compare with the current object.
   * @returns True if the current object is equal to the given object, false otherwise.
   */
  isEqual(object: this): boolean;

  /**
   * Checks if the current object is greater than the given object.
   * @param object - The object to compare with the current object.
   * @returns True if the current object is greater than the given object, false otherwise.
   */
  isGreaterThan(object: this): boolean;

  /**
   * Checks if the current object is lesser than the given object.
   * @param object - The object to compare with the current object.
   * @returns True if the current object is lesser than the given object, false otherwise.
   */
  isLesserThan(object: this): boolean;
}