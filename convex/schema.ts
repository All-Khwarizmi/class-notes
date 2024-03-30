import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  Classes: defineTable({
    userId: v.string(),
    description: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
    name: v.string(),
    students: v.optional(v.array(v.any())),
  }),
  Students: defineTable({
    name: v.string(),
    classId: v.id("Classes"),
  }),
  Criteria: defineTable({
    name: v.string(),
    description: v.string(),
    isGraded: v.boolean(),
    gradeType: v.optional(v.string()), // Optional, not applicable if not graded
    grade: v.optional(v.union(v.string(), v.number())), // Grade, optional
    feedback: v.string(), // Feedback is always included
    createdBy: v.id("Users"),
  })
    .index("by_createdBy", ["createdBy"]) // Indexing by creator
    .index("by_gradeType", ["gradeType"]), // Indexing by gradeType for quick filtering,
  DynamicFields: defineTable({
    fieldKey: v.string(),
    fieldValue: v.string(), // Storing as JSON string for flexibility
    fieldType: v.string(), // Could help interpret the JSON string
    isGraded: v.boolean(),
    grade: v.optional(v.union(v.string(), v.number())), // Optional
    feedback: v.string(), // Feedback is always included
    createdBy: v.id("Users"),
  })
    .index("by_fieldType", ["fieldType"]) // Useful for fetching by type
    .index("by_createdBy", ["createdBy"]),
  // Indexing by creator,
  EvaluationCriteria: defineTable({
    evaluationId: v.id("Evaluations"),
    criteriaId: v.id("Criteria"),
    // This table allows you to associate multiple criteria with a single evaluation.
  }),
  CriteriaDynamicFields: defineTable({
    criteriaId: v.id("Criteria"),
    dynamicFieldId: v.id("DynamicFields"),
    // Additional fields as necessary, e.g., order or relevance
  }),

  EvaluationDynamicFields: defineTable({
    evaluationId: v.id("Evaluations"),
    dynamicFieldId: v.id("DynamicFields"),
    // This table links dynamic fields to evaluations, potentially via criteria.
  }),
  EvaluationTemplates: defineTable({
    name: v.string(),
    description: v.string(),
    createdBy: v.id("Users"), // The user who created this template
    createdAt: v.float64(), // Timestamp for when the template was created
    gradeType: v.string(), // Grading scale type ("numeric", "letter", "pass/fail")
    criteriaIds: v.array(v.id("Criteria")), // Array of Criteria IDs associated with this template
  }).index("by_createdBy", ["createdBy"]), // Index for fetching templates by creator
  EvaluationsWithGrades: defineTable({
    templateId: v.id("EvaluationTemplates"), // Link to the evaluation template this is based on
    classId: v.id("Classes"), // The class this evaluation is associated with
    conductedBy: v.id("Users"), // The user (teacher) who conducted this evaluation
    conductedAt: v.float64(), // Timestamp for when the evaluation was conducted
    overallGrade: v.optional(v.union(v.string(), v.number())), // Overall grade, if applicable
    feedback: v.optional(v.string()), // General feedback for the evaluation
    studentGrades: v.array(
      v.object({
        // Array of objects holding student IDs and their grades
        studentId: v.id("Students"),
        grade: v.union(v.string(), v.number()),
        feedback: v.optional(v.string()),
      })
    ),
  })
    .index("by_classId", ["classId"]) // Index for fetching evaluations by class
    .index("by_conductedBy", ["conductedBy"]), // Index for fetching evaluations conducted by a user
});
