import { v } from "convex/values";
import { defineTable } from "convex/server";
import { gradeType } from "../fields/grade_type";

const EvaluationWithGrade = defineTable({
  id: v.string(), // Unique identifier for the evaluation
  publishDate: v.float64(), // Date when the evaluation is published
  evaluationDate: v.float64(), // Date when the evaluation is conducted
  classeId: v.string(), // ID of the class being evaluated
  evaluationBaseId: v.string(), // ID referencing the base evaluation schema
  grades: v.array(
    // Array of student grade objects
    v.object({
      studentId: v.string(), // ID of the student
      feedback: v.string(), // Feedback for the student
      grades: v.array(
        // Array of grade objects for different criteria
        v.object({
          criteriaId: v.string(), // ID of the grading criteria
          gradeType,
          grade: v.union(v.number(), v.string()), // The grade value (numeric or string)
        })
      ),
    })
  ),
})
  .index("by_classeId", ["classeId"])
  .index("by_evaluationBaseId", ["evaluationBaseId"]);

export { EvaluationWithGrade };
