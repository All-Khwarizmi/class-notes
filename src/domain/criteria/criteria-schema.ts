import { z } from "zod";
import { GradeTypeEnum } from "../grades/grade-schema";
import { DynamicFieldSchema } from "../dynamic-field/dynamic-field-schema";

const GradedCriteria = z.object({
  isGraded: z.literal(true),
  gradeType: z.enum([
    GradeTypeEnum.Numeric,
    GradeTypeEnum.Letter,
    GradeTypeEnum.PassFail,
  ]), // Exclude 'Ungraded' for graded criteria
  grade: z.union([z.string(), z.number()]),
  feedback: z.string(),
});

const NonGradedCriteria = z.object({
  isGraded: z.literal(false),
  // 'Ungraded' or exclude gradeType for non-graded criteria, based on design preference
  feedback: z.string(),
});

export const CriteriaSchema = z
  .object({
    id: z.string(),
    evaluationId: z.string(),
    name: z.string().min(1),
    description: z.string().min(1),
    dynamicFields: z.array(DynamicFieldSchema),
  })
  .and(GradedCriteria.or(NonGradedCriteria)); // Combine base with graded or non-graded extensions

export type CriteriaType = z.infer<typeof CriteriaSchema>;
