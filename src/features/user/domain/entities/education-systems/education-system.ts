import { z } from "zod";


// Schéma de base pour les matières
export const BasicSubjectsEnum = z.enum([
  "Mathematics",
  "Science",
  "History",
  "PhysicalEducation",
  "Arts",
]);

// Schéma pour les langues
export const LanguageSchema = z.enum([
  "English",
  "Mandarin",
  "Hindi",
  "Spanish",
  "French",
  "Arabic",
  "Bengali",
  "Russian",
  "Portuguese",
  "Indonesian",
  "Urdu",
  "German",
  "Japanese",
  "Swahili",
  "Marathi",
]);

// Ajout d'autres matières spécifiques
export const ExtendedEducationSubjectsSchema = z.union([
  BasicSubjectsEnum,
  LanguageSchema,
  z.literal("Technology"),
  z.literal("HealthSciences"),
  z.literal("Sociology"),
  z.literal("Psychology"),
  z.literal("Economics"),
  z.literal("Anthropology"),
]);

export type ExtendedEducationSubjectsType = z.infer<
  typeof ExtendedEducationSubjectsSchema
>;