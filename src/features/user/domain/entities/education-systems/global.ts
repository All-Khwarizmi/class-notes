import { option } from 'fp-ts/lib/Option';
import { z } from 'zod';

import { ChineseEducationSubjectsSchema } from './chna';
import {
  frenchEducationSubjectsOptions,
  FrenchEducationSubjectsSchema,
} from './french';
import {
  germanEducationSubjectsOptions,
  GermanEducationSubjectsSchema,
} from './german';
import {
  indianEducationSubjectsOptions,
  IndianEducationSubjectsSchema,
} from './india';
import {
  spanishEducationSubjectsOptions,
  SpanishEducationSubjectsSchema,
} from './spain';
import { ukEducationSubjectsOptions, UKEducationSubjectsSchema } from './uk';
import {
  americanEducationSubjectsOptions,
  AmericanEducationSubjectsSchema,
} from './usa';

// Union de tous les schémas des systèmes éducatifs
export const GlobalEducationSubjectsSchema = z.union([
  FrenchEducationSubjectsSchema,
  AmericanEducationSubjectsSchema,
  GermanEducationSubjectsSchema,
  IndianEducationSubjectsSchema,
  ChineseEducationSubjectsSchema,
  UKEducationSubjectsSchema,
  SpanishEducationSubjectsSchema,
]);

export type GlobalEducationSubjectsType = z.infer<
  typeof GlobalEducationSubjectsSchema
>;

// Créez un objet central qui stocke les options de matières pour chaque système éducatif, similaire à une table de correspondance.
export const educationSystemOptions = {
  French: FrenchEducationSubjectsSchema.options,
  US: AmericanEducationSubjectsSchema.options,
  German: GermanEducationSubjectsSchema.options,
  Indian: IndianEducationSubjectsSchema.options,
  Chinese: ChineseEducationSubjectsSchema.options,
  UK: UKEducationSubjectsSchema.options,
  Spanish: SpanishEducationSubjectsSchema.options,
};

export function getEducationSystemOptions(
  country: keyof typeof educationSystemOptions
) {
  return educationSystemOptions[country];
}
