import { z } from 'zod';

import { ExtendedEducationSubjectsSchema } from './education-system';

// Assurez-vous que le chemin d'importation est correct

export const GermanEducationSubjectsSchema = z.enum([
  ...ExtendedEducationSubjectsSchema.options,
  'GermanHistory',
  'GermanLanguage',
  'GermanLiterature',
  'GermanGeography',
  'GermanArt',
]);

export type GermanEducationSubjectsType = z.infer<
  typeof GermanEducationSubjectsSchema
>;

// Extraire les valeurs pour utilisation dans un composant select
export const germanEducationSubjectsOptions =
  GermanEducationSubjectsSchema.options.map((option) => ({
    value: option,
    label: option,
  }));
