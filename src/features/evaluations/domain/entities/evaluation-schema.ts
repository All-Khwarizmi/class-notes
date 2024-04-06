import { z } from "zod";
import {
  CriteriaSchema,
} from "../../../../core/domain/criteria/criteria-schema";
import { GradeSchema } from "../../../../core/domain/grades/grade-schema";

export const EvaluationSchema = z.object({
  id: z.string(),
  name: z.string().min(2, "Name cannot be empty"),
  description: z.string().min(5, "Description cannot be empty"),
  classId: z.string(),
  gradeType: GradeSchema, // Defines how the evaluation is graded
  overallGrade: z.union([z.string(), z.number(), z.null()]), // Grade could be a number, letter, or null if not graded yet
  feedback: z.string().optional(),
  criteria: z.array(CriteriaSchema).optional(),
});

export const EvaluationSchemaWithCriteria = EvaluationSchema.extend({
  criteria: z.array(CriteriaSchema).optional(),
});
// Export the TypeScript type derived from the Zod schema
export type EvaluationType = z.infer<typeof EvaluationSchema>;

export type EvaluationTypeWithCriteria = z.infer<
  typeof EvaluationSchemaWithCriteria
>;
