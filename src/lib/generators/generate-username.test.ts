import assert from 'node:assert';
import { describe, it } from 'node:test';

import { createSeededRandom } from './shared/create-seeded-random';
import { generateUsername } from './generate-username';

describe('generateUsername', () => {
  it('generates deterministic usernames from provided names', () => {
    const value = generateUsername({
      firstName: 'Jane',
      lastName: 'Doe',
      includeNumber: false,
    });

    assert.equal(value, 'jane.doe');
  });

  it('supports separators and optional numeric suffixes', () => {
    const withSeparator = generateUsername({
      firstName: 'Jane',
      lastName: 'Doe',
      separator: '_',
      includeNumber: false,
    });
    const withDigits = generateUsername({
      firstName: 'Jane',
      lastName: 'Doe',
      includeNumber: true,
      random: createSeededRandom('username'),
    });

    assert.equal(withSeparator, 'jane_doe');
    assert.match(withDigits, /^jane\.doe\d{3}$/);
  });

  it('is deterministic with the same seed', () => {
    assert.equal(
      generateUsername({ random: createSeededRandom('same-seed') }),
      generateUsername({ random: createSeededRandom('same-seed') }),
    );
  });
});
