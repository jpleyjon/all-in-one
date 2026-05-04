import { slugify } from '../string/slugify';
import { EMAIL_DOMAINS } from './data/email-domains';
import { generateFirstName } from './generate-first-name';
import { generateLastName } from './generate-last-name';
import { randomDigitString } from './shared/random-digit-string';
import { randomPick } from './shared/random-pick';
import type { GenerateEmailOptions } from './types';

/**
 * Generates an email address.
 *
 * @param options Optional generator settings.
 * @returns Pragmatic email address.
 */
export function generateEmail(options: GenerateEmailOptions = {}): string {
  const firstName = options.firstName ?? generateFirstName(options);
  const lastName = options.lastName ?? generateLastName(options);
  const domain = options.domain ?? randomPick(EMAIL_DOMAINS, options.random);
  const localPart = slugify(`${firstName}.${lastName}.${randomDigitString(3, options.random)}`);

  return `${localPart}@${domain}`;
}
