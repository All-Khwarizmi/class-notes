import { z } from 'zod';

import { ExtendedEducationSubjectsSchema } from './education-system';

// Assurez-vous que le chemin d'importation est correct

export const IndianEducationSubjectsSchema = z.enum([
  ...ExtendedEducationSubjectsSchema.options,
  'IndianHistory',
  'IndianLanguage',
  'IndianLiterature',
  'IndianGeography',
  'IndianArt',
]);
export type IndianEducationSubjectsType = z.infer<
  typeof IndianEducationSubjectsSchema
>;

// Extraire les valeurs pour utilisation dans un composant select
export const indianEducationSubjectsOptions =
  IndianEducationSubjectsSchema.options.map((option) => ({
    value: option,
    label: option,
  }));
