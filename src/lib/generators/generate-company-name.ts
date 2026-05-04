import { COMPANY_PREFIXES } from './data/company-prefixes';
import { COMPANY_SUFFIXES } from './data/company-suffixes';
import { generateLastName } from './generate-last-name';
import { randomBool } from './shared/random-bool';
import { randomPick } from './shared/random-pick';
import type { GeneratorOptions } from './types';

/**
 * Generates a company name.
 *
 * @param options Optional generator settings.
 * @returns Random company name.
 */
export function generateCompanyName(options: GeneratorOptions = {}): string {
  const left = randomBool(0.5, options.random)
    ? randomPick(COMPANY_PREFIXES, options.random)
    : generateLastName(options);
  const right = randomPick(COMPANY_SUFFIXES, options.random);

  return `${left} ${right}`;
}
