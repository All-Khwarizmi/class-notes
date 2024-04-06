import { z } from "zod";
import { CriteriaSchema } from "../../../../core/domain/criteria/criteria-schema";
import { GradeSchema } from "../../../../core/domain/grades/grade-schema";

export const EvaluationSchema = z.object({
  _id: z.string(),
  name: z.string().min(2, "Name cannot be empty"),
  description: z.string().min(5, "Description cannot be empty"),

  gradeType: GradeSchema, // Defines how the evaluation is graded
  // Grade could be a number, letter, or null if not graded yet
  criteriaIds: z.array(CriteriaSchema).optional(),
  createdBy: z.string(),
  createdAt: z.number(),
});

export const EvaluationSchemaWithCriteria = EvaluationSchema.extend({
  criteria: z.array(CriteriaSchema).optional(),
});
// Export the TypeScript type derived from the Zod schema
export type EvaluationType = z.infer<typeof EvaluationSchema>;

export type EvaluationTypeWithCriteria = z.infer<
  typeof EvaluationSchemaWithCriteria
>;
