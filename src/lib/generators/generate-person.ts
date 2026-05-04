import { generateAddress } from './generate-address';
import { generateEmail } from './generate-email';
import { generateFirstName } from './generate-first-name';
import { generateFullName } from './generate-full-name';
import { generateLastName } from './generate-last-name';
import { generatePhoneNumber } from './generate-phone-number';
import { generateSSN } from './generate-ssn';
import { generateUsername } from './generate-username';
import { generateUUID } from './generate-uuid';
import type { GeneratedPerson, GeneratePersonOptions } from './types';

/**
 * Generates a composite person fixture object.
 *
 * @param options Optional generator settings.
 * @returns Generated person fixture.
 */
export function generatePerson(options: GeneratePersonOptions = {}): GeneratedPerson {
  const firstName = options.firstName ?? generateFirstName(options);
  const lastName = options.lastName ?? generateLastName(options);

  return {
    firstName,
    lastName,
    fullName: generateFullName({ ...options, firstName, lastName }),
    username: generateUsername({ ...options, firstName, lastName }),
    email: generateEmail({ ...options, firstName, lastName, domain: options.emailDomain }),
    phoneNumber: generatePhoneNumber(options),
    address: generateAddress(options),
    ssn: generateSSN(options),
    uuid: generateUUID(options),
  };
}
