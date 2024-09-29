import { z } from 'zod';

import { ExtendedEducationSubjectsSchema } from './education-system';

// Assurez-vous que le chemin d'importation est correct

// Spécificités du système éducatif américain, ajoutant des matières spécifiques
export const AmericanEducationSubjectsSchema = z.enum([
  ...ExtendedEducationSubjectsSchema.options,
  'AmericanHistory',
  'AmericanLanguage',
  'AmericanLiterature',
  'AmericanGeography',
  'AmericanArt',
]);
export type AmericanEducationSubjectsType = z.infer<
  typeof AmericanEducationSubjectsSchema
>;

// Extraire les valeurs pour utilisation dans un composant select
export const americanEducationSubjectsOptions =
  AmericanEducationSubjectsSchema.options.map((option) => ({
    value: option,
    label: option,
  }));
