import assert from 'node:assert';
import { describe, it } from 'node:test';

import { isEmail } from '../validation/is-email';
import { isUUID } from '../validation/is-uuid';
import { createSeededRandom } from './shared/create-seeded-random';
import { generatePerson } from './generate-person';

describe('generatePerson', () => {
  it('generates a complete deterministic person fixture', () => {
    const person = generatePerson({ random: createSeededRandom('person-fixture') });

    assert.match(person.firstName, /^[A-Za-z]+$/);
    assert.match(person.lastName, /^[A-Za-z]+$/);
    assert.equal(person.fullName, `${person.firstName} ${person.lastName}`);
    assert.equal(isEmail(person.email), true);
    assert.match(person.phoneNumber, /^\(\d{3}\) \d{3}-\d{4}$/);
    assert.match(person.ssn, /^\d{3}-\d{2}-\d{4}$/);
    assert.equal(isUUID(person.uuid, 4), true);
    assert.match(person.address.stateCode, /^[A-Z]{2}$/);
  });

  it('respects provided names and email domain', () => {
    const person = generatePerson({
      firstName: 'Jane',
      lastName: 'Doe',
      emailDomain: 'example.com',
      random: createSeededRandom('jane-doe'),
    });

    assert.equal(person.firstName, 'Jane');
    assert.equal(person.lastName, 'Doe');
    assert.match(person.email, /@example\.com$/);
    assert.match(person.username, /^jane\.doe/);
  });

  it('is deterministic with the same seed', () => {
    assert.deepEqual(
      generatePerson({ random: createSeededRandom('stable-person') }),
      generatePerson({ random: createSeededRandom('stable-person') }),
    );
  });
});
