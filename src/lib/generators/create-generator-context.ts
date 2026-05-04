import { createSeededRandom } from './shared/create-seeded-random';
import { generateAddress } from './generate-address';
import { generateBankAccountNumber } from './generate-bank-account-number';
import { generateBrandName } from './generate-brand-name';
import { generateCompany } from './generate-company';
import { generateCompanyName } from './generate-company-name';
import { generateEmail } from './generate-email';
import { generateFirstName } from './generate-first-name';
import { generateFullName } from './generate-full-name';
import { generateLastName } from './generate-last-name';
import { generatePerson } from './generate-person';
import { generatePhoneNumber } from './generate-phone-number';
import { generateRoutingNumber } from './generate-routing-number';
import { generateSSN } from './generate-ssn';
import { generateUsername } from './generate-username';
import { generateUUID } from './generate-uuid';
import type {
  GenerateAddressOptions,
  GenerateBankAccountNumberOptions,
  GenerateCompanyOptions,
  GenerateEmailOptions,
  GenerateFullNameOptions,
  GeneratePersonOptions,
  GeneratePhoneNumberOptions,
  GenerateUsernameOptions,
  GeneratorContext,
  RandomSource,
} from './types';

/**
 * Creates a generator context with a shared deterministic random source.
 *
 * @param seedOrOptions Seed value or explicit context options.
 * @returns Generator context with bound helper methods.
 */
export function createGeneratorContext(
  seedOrOptions: number | string | { seed?: number | string; random?: RandomSource } = {},
): GeneratorContext {
  const random =
    typeof seedOrOptions === 'number' || typeof seedOrOptions === 'string'
      ? createSeededRandom(seedOrOptions)
      : (seedOrOptions.random ??
        (seedOrOptions.seed !== undefined ? createSeededRandom(seedOrOptions.seed) : Math.random));

  return {
    random,
    firstName: () => generateFirstName({ random }),
    lastName: () => generateLastName({ random }),
    fullName: (options: Omit<GenerateFullNameOptions, 'random'> = {}) =>
      generateFullName({ ...options, random }),
    username: (options: Omit<GenerateUsernameOptions, 'random'> = {}) =>
      generateUsername({ ...options, random }),
    email: (options: Omit<GenerateEmailOptions, 'random'> = {}) =>
      generateEmail({ ...options, random }),
    phoneNumber: (options: Omit<GeneratePhoneNumberOptions, 'random'> = {}) =>
      generatePhoneNumber({ ...options, random }),
    address: (options: Omit<GenerateAddressOptions, 'random'> = {}) =>
      generateAddress({ ...options, random }),
    ssn: () => generateSSN({ random }),
    companyName: () => generateCompanyName({ random }),
    brandName: () => generateBrandName({ random }),
    person: (options: Omit<GeneratePersonOptions, 'random'> = {}) =>
      generatePerson({ ...options, random }),
    company: (options: Omit<GenerateCompanyOptions, 'random'> = {}) =>
      generateCompany({ ...options, random }),
    uuid: () => generateUUID({ random }),
    routingNumber: () => generateRoutingNumber({ random }),
    bankAccountNumber: (options: Omit<GenerateBankAccountNumberOptions, 'random'> = {}) =>
      generateBankAccountNumber({ ...options, random }),
  };
}
