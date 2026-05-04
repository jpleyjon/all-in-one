import { generateFirstName } from './generate-first-name';
import { generateLastName } from './generate-last-name';
import type { GenerateFullNameOptions } from './types';

/**
 * Generates a full name.
 *
 * @param options Optional generator settings.
 * @returns Full name string.
 */
export function generateFullName(options: GenerateFullNameOptions = {}): string {
  const firstName = options.firstName ?? generateFirstName(options);
  const lastName = options.lastName ?? generateLastName(options);

  return `${firstName} ${lastName}`;
}
