import { z } from "zod";
import { ExtendedEducationSubjectsSchema } from "./education-system"; // Assurez-vous que le chemin d'importation est correct

export const ChineseEducationSubjectsSchema = z.union([
  ExtendedEducationSubjectsSchema,
  z.literal("ChineseLiterature"),
  z.literal("MoralEducation"),
]);

export type ChineseEducationSubjectsType = z.infer<
  typeof ChineseEducationSubjectsSchema
>;
