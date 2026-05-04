import { slugify } from '../string/slugify';
import { generateAddress } from './generate-address';
import { generateBankAccountNumber } from './generate-bank-account-number';
import { generateBrandName } from './generate-brand-name';
import { generateCompanyName } from './generate-company-name';
import { generateEmail } from './generate-email';
import { generatePhoneNumber } from './generate-phone-number';
import { generateRoutingNumber } from './generate-routing-number';
import { generateUUID } from './generate-uuid';
import type { GeneratedCompany, GenerateCompanyOptions } from './types';

/**
 * Generates a composite company fixture object.
 *
 * @param options Optional generator settings.
 * @returns Generated company fixture.
 */
export function generateCompany(options: GenerateCompanyOptions = {}): GeneratedCompany {
  const companyName = options.companyName ?? generateCompanyName(options);
  const brandName = options.brandName ?? generateBrandName(options);
  const emailDomain = options.domain ?? `${slugify(companyName)}.com`;

  return {
    companyName,
    brandName,
    emailDomain,
    email: generateEmail({
      ...options,
      firstName: 'Info',
      lastName: slugify(brandName).replace(/-/g, ''),
      domain: emailDomain,
    }),
    phoneNumber: generatePhoneNumber(options),
    address: generateAddress(options),
    routingNumber: generateRoutingNumber(options),
    bankAccountNumber: generateBankAccountNumber(options),
    uuid: generateUUID(options),
  };
}
