import { z } from "zod";
import { ExtendedEducationSubjectsSchema } from "./education-system"; // Assurez-vous que le chemin d'importation est correct

export const GermanEducationSubjectsSchema = z.union([
  ExtendedEducationSubjectsSchema,
  z.literal("GermanLiterature"),
  z.literal("BusinessStudies"),
]);

export type GermanEducationSubjectsType = z.infer<
  typeof GermanEducationSubjectsSchema
>;
