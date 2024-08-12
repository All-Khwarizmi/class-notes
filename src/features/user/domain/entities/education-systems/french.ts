import { z } from "zod";
import { ExtendedEducationSubjectsSchema } from "./education-system"; // Assurez-vous que le chemin d'importation est correct

// Spécificités du système éducatif français, ajoutant des matières spécifiques
export const FrenchEducationSubjectsSchema = z.union([
  ExtendedEducationSubjectsSchema,
  z.literal("Philosophy"), // Typiquement enseignée en France
  z.literal("FrenchLiterature"), // Littérature française
]);

export type FrenchEducationSubjectsType = z.infer<
  typeof FrenchEducationSubjectsSchema
>;
