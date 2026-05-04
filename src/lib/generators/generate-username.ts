import { slugify } from '../string/slugify';
import { generateFirstName } from './generate-first-name';
import { generateLastName } from './generate-last-name';
import { randomBool } from './shared/random-bool';
import { randomDigitString } from './shared/random-digit-string';
import type { GenerateUsernameOptions } from './types';

/**
 * Generates a username from person-name style components.
 *
 * @param options Optional generator settings.
 * @returns Lowercase username string.
 */
export function generateUsername(options: GenerateUsernameOptions = {}): string {
  const firstName = slugify(options.firstName ?? generateFirstName(options));
  const lastName = slugify(options.lastName ?? generateLastName(options));
  const separator = options.separator ?? '.';
  const includeNumber = options.includeNumber ?? randomBool(0.5, options.random);
  const base = `${firstName}${separator}${lastName}`;

  return includeNumber ? `${base}${randomDigitString(3, options.random)}` : base;
}
