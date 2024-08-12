import { z } from "zod";
import { ExtendedEducationSubjectsSchema } from "./education-system"; // Assurez-vous que le chemin d'importation est correct

// Spécificités du système éducatif américain, ajoutant des matières spécifiques
export const AmericanEducationSubjectsSchema = z.union([
  ExtendedEducationSubjectsSchema,
  z.literal("AmericanHistory"), // Histoire américaine, souvent enseignée à différents niveaux
  z.literal("AmericanGovernment"), // Gouvernement américain, typiquement au niveau secondaire
  z.literal("EnvironmentalScience"), // Science environnementale, un choix populaire dans les écoles secondaires
]);

export type AmericanEducationSubjectsType = z.infer<
  typeof AmericanEducationSubjectsSchema
>;
