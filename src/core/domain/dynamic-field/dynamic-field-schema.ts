import { z } from 'zod';

const DynamicFieldBase = z.object({
  fieldKey: z.string(),
  fieldValue: z.union([z.string(), z.number(), z.boolean()]), // Accommodate various value types
});

const GradedDynamicField = DynamicFieldBase.extend({
  isGraded: z.literal(true),
  grade: z.union([z.string(), z.number()]), // Assume grades can be numeric or letter-based
  feedback: z.string(), // Graded fields include feedback
});

const NonGradedDynamicField = DynamicFieldBase.extend({
  isGraded: z.literal(false),
  // Non-graded fields might still include feedback as per requirement
  feedback: z.string(),
});

export const DynamicFieldSchema = z.union([
  GradedDynamicField,
  NonGradedDynamicField,
]);

export type DynamicFieldType = z.infer<typeof DynamicFieldSchema>;
