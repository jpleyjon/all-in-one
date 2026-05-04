import assert from 'node:assert';
import { describe, it } from 'node:test';

import { isEmail } from '../validation/is-email';
import { isUUID } from '../validation/is-uuid';
import { createSeededRandom } from './shared/create-seeded-random';
import { generateCompany } from './generate-company';

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

describe('generateCompany', () => {
  it('generates a complete deterministic company fixture', () => {
    const company = generateCompany({ random: createSeededRandom('company-fixture') });

    assert.match(company.companyName, /^[A-Za-z]+(?: [A-Za-z]+)+$/);
    assert.match(company.brandName, /^[A-Za-z]+(?: [A-Za-z]+)?$/);
    assert.equal(isEmail(company.email), true);
    assert.match(company.emailDomain, /^[a-z0-9-]+\.com$/);
    assert.match(company.bankAccountNumber, /^\d{12}$/);
    assert.equal(isValidRoutingNumber(company.routingNumber), true);
    assert.equal(isUUID(company.uuid, 4), true);
  });

  it('respects provided company naming overrides', () => {
    const company = generateCompany({
      companyName: 'Acme Labs',
      brandName: 'Orbit',
      domain: 'acme.test',
      random: createSeededRandom('acme'),
    });

    assert.equal(company.companyName, 'Acme Labs');
    assert.equal(company.brandName, 'Orbit');
    assert.equal(company.emailDomain, 'acme.test');
    assert.match(company.email, /@acme\.test$/);
  });

  it('is deterministic with the same seed', () => {
    assert.deepEqual(
      generateCompany({ random: createSeededRandom('stable-company') }),
      generateCompany({ random: createSeededRandom('stable-company') }),
    );
  });
});
