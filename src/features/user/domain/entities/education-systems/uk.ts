import { z } from "zod";
import { ExtendedEducationSubjectsSchema } from "./education-system"; // Assurez-vous que le chemin d'importation est correct

export const UKEducationSubjectsSchema = z.enum([
  ...ExtendedEducationSubjectsSchema.options,
  "UKHistory",
  "UKLanguage",
  "UKLiterature",
  "UKGeography",
  "UKArt",
])

export type UKEducationSubjectsType = z.infer<typeof UKEducationSubjectsSchema>;


// Extraire les valeurs pour utilisation dans un composant select
export const ukEducationSubjectsOptions = UKEducationSubjectsSchema.options.map(option => ({ value: option, label: option }));