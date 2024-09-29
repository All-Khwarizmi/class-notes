import { z } from 'zod';

import { ExtendedEducationSubjectsSchema } from './education-system';

// Assurez-vous que le chemin d'importation est correct

export const ChineseEducationSubjectsSchema = z.enum([
  ...ExtendedEducationSubjectsSchema.options,
  'ChineseHistory',
  'ChineseLanguage',
  'ChineseLiterature',
  'ChineseGeography',
  'ChineseArt',
]);

export type ChineseEducationSubjectsType = z.infer<
  typeof ChineseEducationSubjectsSchema
>;
