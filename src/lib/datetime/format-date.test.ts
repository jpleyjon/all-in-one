import assert from 'node:assert';
import { describe, it } from 'node:test';
import { formatDate } from './format-date';

describe('formatDate', () => {
  it('formats supported tokens', () => {
    const input = new Date(2024, 0, 10, 5, 6, 7, 8);

    assert.equal(formatDate(input, 'YYYY-MM-DD HH:mm:ss.SSS'), '2024-01-10 05:06:07.008');
    assert.equal(formatDate(input, 'DD/MM/YYYY'), '10/01/2024');
  });

  it('throws for invalid dates', () => {
    assert.throws(() => formatDate('invalid', 'YYYY'), RangeError, 'date must be a valid date.');
  });
});
