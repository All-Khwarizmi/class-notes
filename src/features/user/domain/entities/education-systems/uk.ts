import { z } from "zod";
import { ExtendedEducationSubjectsSchema } from "./education-system"; // Assurez-vous que le chemin d'importation est correct

export const UKEducationSubjectsSchema = z.union([
  ExtendedEducationSubjectsSchema,
  z.literal("BritishHistory"),
  z.literal("BritishLiterature"),
]);

export type UKEducationSubjectsType = z.infer<typeof UKEducationSubjectsSchema>;
