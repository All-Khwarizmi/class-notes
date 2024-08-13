import { EvaluationWithGradeSchema } from "@/features/evaluation/domain/entities/evaluation-with-grades-schema";
import { z } from "zod";
import { EvaluationBaseSchema } from "@/features/evaluation/domain/entities/evaluation-schema";
import { StudentSchema } from "../../student/domain/entities/student-schema";
import { EducationsSystemsEnum } from "@/features/user/domain/entities/education-systems/education-system";
import {
  EducationLevelsEnumSchema,
} from "@/features/user/domain/entities/education-systems/niveaux/niveaux";

const classSchema = z.object({
  id: z.string(),
  name: z
    .string()
    .min(2, { message: "Le nom doit faire au moins 2 caractères" }),
  description: z.string().optional(),
  imageUrl: z.string().optional(),
  students: z.array(z.string()).optional(),
  publish: z.boolean().optional(),
  educationSystem: EducationsSystemsEnum,
  educationLevel: EducationLevelsEnumSchema,
});
export default classSchema;

export type ClassType = z.infer<typeof classSchema>;
export const CompoundEvaluationSchema = z.object({
  base: EvaluationBaseSchema,
  grade: EvaluationWithGradeSchema,
});
export type CompoundEvaluationType = z.infer<typeof CompoundEvaluationSchema>;

export const ClasseTableSchema = z.object({
  students: z.array(StudentSchema),
  evaluations: z.array(CompoundEvaluationSchema),
});
export type ClasseTableType = z.infer<typeof ClasseTableSchema>;
