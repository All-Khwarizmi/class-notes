import { z } from "zod";
import { ExtendedEducationSubjectsSchema } from "./education-system"; // Assurez-vous que le chemin d'importation est correct

export const SpanishEducationSubjectsSchema = z.enum([
  ...ExtendedEducationSubjectsSchema.options,
  "SpanishHistory",
  "SpanishLanguage",
  "SpanishLiterature",
  "SpanishGeography",
  "SpanishArt",
])

export type SpanishEducationSubjectsType = z.infer<
  typeof SpanishEducationSubjectsSchema
>;

// Extraire les valeurs pour utilisation dans un composant select
export const spanishEducationSubjectsOptions = SpanishEducationSubjectsSchema.options.map(option => ({ value: option, label: option }));