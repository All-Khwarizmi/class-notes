import { z } from "zod";
import { ExtendedEducationSubjectsSchema } from "./education-system"; // Assurez-vous que le chemin d'importation est correct

// Spécificités du système éducatif français, ajoutant des matières spécifiques
export const FrenchEducationSubjectsSchema = z.enum([
  ...ExtendedEducationSubjectsSchema.options,
  "FrenchHistory",
  "FrenchLanguage",
  "FrenchLiterature",
  "FrenchGeography",
  "FrenchArt",
])

export type FrenchEducationSubjectsType = z.infer<
  typeof FrenchEducationSubjectsSchema
>;


// Extraire les valeurs pour utilisation dans un composant select
export const frenchEducationSubjectsOptions = FrenchEducationSubjectsSchema.options.map(option => ({ value: option, label: option }));