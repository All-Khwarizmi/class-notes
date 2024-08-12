import { z } from "zod";
import { ExtendedEducationSubjectsSchema } from "./education-system"; // Assurez-vous que le chemin d'importation est correct

export const IndianEducationSubjectsSchema = z.union([
  ExtendedEducationSubjectsSchema,
  z.literal("IndianHistory"),
  z.literal("Civics"),
]);

export type IndianEducationSubjectsType = z.infer<
  typeof IndianEducationSubjectsSchema
>;
