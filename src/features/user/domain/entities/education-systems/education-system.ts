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
const basicSubjects = BasicSubjectsEnum.options;
const languages = LanguageSchema.options;
const otherSubjects = [
  "Technology",
  "HealthSciences",
  "Sociology",
  "Psychology",
  "Economics",
  "Anthropology",
];

export const ExtendedEducationSubjectsSchema = z.enum([
  ...basicSubjects,
  ...languages,
  ...otherSubjects,
]);

export type ExtendedEducationSubjectsType = z.infer<
  typeof ExtendedEducationSubjectsSchema
>;
