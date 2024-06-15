import { z } from "zod";
import { GradeTypeUnionSchema } from "./evaluation-schema";

// Individual grade schema for student
const GradeSchema = z.object({
  criteriaId: z.string(), // ID of the grading criteria
  gradeType: GradeTypeUnionSchema, // The specific grade type object from EvaluationBaseSchema
  grade: z.union([z.number(), z.string()]), // The grade value
});

// Student grade schema, which uses the GradeSchema
const StudentGradeSchema = z.object({
  studentId: z.string(), // ID of the student
  feedback: z.string(), // Feedback for the student
  grades: z.array(GradeSchema), // Array of grade objects for different criteria
});

// Evaluation with grades schema, incorporating the StudentGradeSchema
const EvaluationWithGradeSchema = z.object({
  id: z.string(), // Unique identifier for the evaluation
  publishDate: z.number(), // Date when the evaluation is published
  evaluationDate: z.number(), // Date when the evaluation is conducted
  classeId: z.string(), // ID of the class being evaluated
  evaluationBaseId: z.string(), // ID referencing the base evaluation schema
  grades: z.array(StudentGradeSchema), // Array of student grade objects
});
