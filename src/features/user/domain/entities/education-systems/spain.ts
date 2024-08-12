import { z } from "zod";
import { ExtendedEducationSubjectsSchema } from "./education-system"; // Assurez-vous que le chemin d'importation est correct

export const SpanishEducationSubjectsSchema = z.union([
  ExtendedEducationSubjectsSchema,
  z.literal("SpanishHistory"),
  z.literal("SpanishLiterature"),
]);

export type SpanishEducationSubjectsType = z.infer<
  typeof SpanishEducationSubjectsSchema
>;
