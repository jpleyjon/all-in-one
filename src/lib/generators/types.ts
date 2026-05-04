// c8 ignore file
import type { GeneratorOptions, RandomSource } from './shared/types';

export type { GeneratorOptions, RandomSource } from './shared/types';

export type WeightedValue<T> = {
  value: T;
  weight: number;
};

export type GeneratedAddress = {
  streetAddress: string;
  city: string;
  stateCode: string;
  postalCode: string;
};

export type GeneratedPerson = {
  firstName: string;
  lastName: string;
  fullName: string;
  username: string;
  email: string;
  phoneNumber: string;
  address: GeneratedAddress;
  ssn: string;
  uuid: string;
};

export type GeneratedCompany = {
  companyName: string;
  brandName: string;
  emailDomain: string;
  email: string;
  phoneNumber: string;
  address: GeneratedAddress;
  routingNumber: string;
  bankAccountNumber: string;
  uuid: string;
};

export type GenerateFullNameOptions = GeneratorOptions & {
  firstName?: string;
  lastName?: string;
};

export type GenerateEmailOptions = GeneratorOptions & {
  firstName?: string;
  lastName?: string;
  domain?: string;
};

export type GenerateUsernameOptions = GeneratorOptions & {
  firstName?: string;
  lastName?: string;
  separator?: '' | '.' | '_' | '-';
  includeNumber?: boolean;
};

export type GeneratePhoneNumberOptions = GeneratorOptions & {
  format?: 'us' | 'digits';
};

export type GenerateAddressOptions = GeneratorOptions;

export type GenerateBankAccountNumberOptions = GeneratorOptions & {
  length?: number;
};

export type GeneratePersonOptions = GeneratorOptions & {
  firstName?: string;
  lastName?: string;
  emailDomain?: string;
};

export type GenerateCompanyOptions = GeneratorOptions & {
  companyName?: string;
  brandName?: string;
  domain?: string;
};

export type GenerateUUIDOptions = {
  random?: RandomSource;
};

export type GeneratorContext = {
  random: RandomSource;
  firstName: () => string;
  lastName: () => string;
  fullName: (options?: Omit<GenerateFullNameOptions, 'random'>) => string;
  username: (options?: Omit<GenerateUsernameOptions, 'random'>) => string;
  email: (options?: Omit<GenerateEmailOptions, 'random'>) => string;
  phoneNumber: (options?: Omit<GeneratePhoneNumberOptions, 'random'>) => string;
  address: (options?: Omit<GenerateAddressOptions, 'random'>) => GeneratedAddress;
  ssn: () => string;
  companyName: () => string;
  brandName: () => string;
  person: (options?: Omit<GeneratePersonOptions, 'random'>) => GeneratedPerson;
  company: (options?: Omit<GenerateCompanyOptions, 'random'>) => GeneratedCompany;
  uuid: () => string;
  routingNumber: () => string;
  bankAccountNumber: (options?: Omit<GenerateBankAccountNumberOptions, 'random'>) => string;
};
