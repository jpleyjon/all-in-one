import assert from 'node:assert';
import { describe, it } from 'node:test';

import { isEmail } from '../validation/is-email';
import { isUUID } from '../validation/is-uuid';
import * as generators from '.';
import { createGeneratorContext } from './create-generator-context';
import { createSeededRandom } from './shared/create-seeded-random';

function isValidRoutingNumber(value: string): boolean {
  const digits = value.split('').map(Number);

  return (
    (3 * (digits[0] + digits[3] + digits[6]) +
      7 * (digits[1] + digits[4] + digits[7]) +
      (digits[2] + digits[5] + digits[8])) %
      10 ===
    0
  );
}

describe('generators domain', () => {
  it('re-exports all public helpers', () => {
    const exported = [
      'createSeededRandom',
      'createUniqueGenerator',
      'createGeneratorContext',
      'generateArray',
      'maybeGenerate',
      'randomPick',
      'randomWeightedPick',
      'randomBool',
      'randomDigitString',
      'randomAlphaString',
      'randomAlphanumericString',
      'generateFirstName',
      'generateLastName',
      'generateFullName',
      'generateEmail',
      'generatePhoneNumber',
      'generateStreetAddress',
      'generateCity',
      'generateStateCode',
      'generatePostalCode',
      'generateAddress',
      'generateSSN',
      'generateCompanyName',
      'generateCompany',
      'generateBrandName',
      'generateBankAccountNumber',
      'generatePerson',
      'generateRoutingNumber',
      'generateUUID',
      'generateUsername',
    ] as const;

    exported.forEach((name) => {
      assert.equal(typeof (generators as Record<string, unknown>)[name], 'function');
    });
  });

  it('generates deterministic person and business data', () => {
    const firstName = generators.generateFirstName({ random: createSeededRandom('person') });
    const lastName = generators.generateLastName({ random: createSeededRandom('last') });
    const fullNameA = generators.generateFullName({ random: createSeededRandom('full') });
    const fullNameB = generators.generateFullName({ random: createSeededRandom('full') });
    const companyA = generators.generateCompanyName({ random: createSeededRandom('company') });
    const companyB = generators.generateCompanyName({ random: createSeededRandom('company') });
    const brandA = generators.generateBrandName({ random: createSeededRandom('brand') });
    const brandB = generators.generateBrandName({ random: createSeededRandom('brand') });

    assert.match(firstName, /^[A-Za-z]+$/);
    assert.match(lastName, /^[A-Za-z]+$/);
    assert.equal(fullNameA, fullNameB);
    assert.equal(companyA, companyB);
    assert.equal(brandA, brandB);
  });

  it('generates valid contact data', () => {
    const email = generators.generateEmail({
      firstName: 'Jane',
      lastName: 'Doe',
      domain: 'example.com',
      random: createSeededRandom('email'),
    });
    const phone = generators.generatePhoneNumber({ random: createSeededRandom('phone') });
    const digitsPhone = generators.generatePhoneNumber({
      format: 'digits',
      random: createSeededRandom('phone-digits'),
    });
    const ssn = generators.generateSSN({ random: createSeededRandom('ssn') });

    assert.equal(isEmail(email), true);
    assert.match(phone, /^\(\d{3}\) \d{3}-\d{4}$/);
    assert.match(digitsPhone, /^\d{10}$/);
    assert.match(ssn, /^\d{3}-\d{2}-\d{4}$/);
  });

  it('generates deterministic US-style addresses', () => {
    const address = generators.generateAddress({ random: createSeededRandom('address') });

    assert.match(address.streetAddress, /^\d+ [A-Za-z]+ (St|Ave|Blvd|Rd|Ln|Dr|Ct|Way)$/);
    assert.match(address.city, /^[A-Za-z]+$/);
    assert.match(address.stateCode, /^[A-Z]{2}$/);
    assert.match(address.postalCode, /^\d{5}$/);
  });

  it('generates financial identifiers and UUIDs', () => {
    const accountNumber = generators.generateBankAccountNumber({
      length: 10,
      random: createSeededRandom('account'),
    });
    const routingNumber = generators.generateRoutingNumber({
      random: createSeededRandom('routing'),
    });
    const uuid = generators.generateUUID({ random: createSeededRandom('uuid') });

    assert.match(accountNumber, /^\d{10}$/);
    assert.match(routingNumber, /^\d{9}$/);
    assert.equal(isValidRoutingNumber(routingNumber), true);
    assert.equal(isUUID(uuid, 4), true);
  });

  it('validates generator options where needed', () => {
    assert.throws(() => generators.generateBankAccountNumber({ length: 0 }), RangeError);
  });

  it('fails fast for degenerate SSN random sources', () => {
    assert.throws(
      () => generators.generateSSN({ random: () => 0 }),
      /unable to generate a valid SSN area within maxAttempts\./,
    );
    assert.throws(
      () => generators.generatePerson({ random: () => 0 }),
      /unable to generate a valid SSN area within maxAttempts\./,
    );
  });

  it('supports the generator context from the public barrel', () => {
    const context = createGeneratorContext('barrel-context');

    assert.equal(typeof context.username(), 'string');
    assert.equal(typeof context.companyName(), 'string');
  });

  it('fails fast through the generator context for degenerate SSN random sources', () => {
    const context = createGeneratorContext({ random: () => 0 });

    assert.throws(() => context.ssn(), /unable to generate a valid SSN area within maxAttempts\./);
    assert.throws(
      () => context.person(),
      /unable to generate a valid SSN area within maxAttempts\./,
    );
  });
});
