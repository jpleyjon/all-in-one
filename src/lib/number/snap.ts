/**
 * Snaps a value to the nearest anchor.
 *
 * @param value Value to snap.
 * @param anchors Candidate anchor points.
 * @returns Nearest anchor value.
 * @throws {RangeError} If numeric inputs are invalid.
 * @throws {TypeError} If `anchors` is not an array.
 */
export function snap(value: number, anchors: number[]): number {
  if (!Number.isFinite(value)) {
    throw new RangeError('value must be a finite number.');
  }

  if (!Array.isArray(anchors)) {
    throw new TypeError('anchors must be an array of finite numbers.');
  }

  if (anchors.length === 0) {
    throw new RangeError('anchors must contain at least one value.');
  }

  let nearest = anchors[0];

  if (!Number.isFinite(nearest)) {
    throw new RangeError('anchors[0] must be a finite number.');
  }

  let smallestDistance = Math.abs(value - nearest);

  for (let index = 1; index < anchors.length; index += 1) {
    const anchor = anchors[index];

    if (!Number.isFinite(anchor)) {
      throw new RangeError(`anchors[${index}] must be a finite number.`);
    }

    const distance = Math.abs(value - anchor);

    if (distance < smallestDistance || (distance === smallestDistance && anchor < nearest)) {
      nearest = anchor;
      smallestDistance = distance;
    }
  }

  return nearest;
}
