import assert from 'node:assert';
import { describe, it } from 'node:test';

import { isUUID } from '../validation/is-uuid';
import { createGeneratorContext } from './create-generator-context';

describe('createGeneratorContext', () => {
  it('replays the same sequence for the same seed', () => {
    const left = createGeneratorContext('fixture-seed');
    const right = createGeneratorContext('fixture-seed');

    assert.equal(left.firstName(), right.firstName());
    assert.equal(left.email(), right.email());
    assert.deepEqual(left.person(), right.person());
    assert.deepEqual(left.company(), right.company());
  });

  it('supports explicit random sources', () => {
    const context = createGeneratorContext({ random: () => 0 });

    assert.equal(typeof context.firstName(), 'string');
    assert.equal(typeof context.companyName(), 'string');
  });

  it('supports object seeds and default contexts', () => {
    const seededA = createGeneratorContext({ seed: 'object-seed' });
    const seededB = createGeneratorContext({ seed: 'object-seed' });
    const fallback = createGeneratorContext();

    assert.equal(seededA.fullName(), seededB.fullName());
    assert.equal(typeof fallback.uuid(), 'string');
  });

  it('binds standalone generators through the context methods', () => {
    const context = createGeneratorContext('bound');
    const address = context.address();
    const person = context.person();
    const company = context.company();

    assert.match(address.postalCode, /^\d{5}$/);
    assert.equal(person.fullName, `${person.firstName} ${person.lastName}`);
    assert.equal(company.email.endsWith(`@${company.emailDomain}`), true);
  });

  it('exposes the remaining context helpers', () => {
    const context = createGeneratorContext('all-methods');

    assert.match(context.lastName(), /^[A-Za-z]+$/);
    assert.match(context.username(), /^[a-z]+[._-]?[a-z]+\d{0,3}$/);
    assert.match(context.phoneNumber(), /^\(\d{3}\) \d{3}-\d{4}$/);
    assert.match(context.ssn(), /^\d{3}-\d{2}-\d{4}$/);
    assert.match(context.brandName(), /^[A-Za-z]+(?: [A-Za-z]+)?$/);
    assert.equal(isUUID(context.uuid(), 4), true);
    assert.match(context.routingNumber(), /^\d{9}$/);
    assert.match(context.bankAccountNumber({ length: 10 }), /^\d{10}$/);
  });
});
