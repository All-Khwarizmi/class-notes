import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  Users: defineTable({
    userId: v.string(),
    schoolSubject: v.string(),
    name: v.string(),
    onboarding: v.boolean(),
  }),
  Category: defineTable({
    name: v.string(),
    description: v.string(),
    createdBy: v.id("Users"),
    createdAt: v.float64(),
  }).index("by_createdBy", ["createdBy"]),
  Competences: defineTable({
    name: v.string(),
    description: v.string(),
    createdBy: v.id("Users"),
    createdAt: v.float64(),
    category: v.string(),
  })
    .index("by_createdBy", ["createdBy"])
    .index("by_category", ["category"]),
  Cours: defineTable({
    name: v.string(),
    body: v.string(),
    lessons: v.array(v.string()),
    competences: v.array(v.id("Competences")),
    
    description: v.string(),
    createdBy: v.id("Users"),
    createdAt: v.float64(),
    category: v.string(),
  })
    .index("by_createdBy", ["createdBy"])
    .index("by_category", ["category"]),
  Classes: defineTable({
    userId: v.string(),
    description: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
    name: v.string(),
    observations: v.array(v.string()),
    studentsId: v.optional(v.array(v.id("Students"))),
    evaluationsTemplatesId: v.array(v.id("EvaluationTemplates")),
  }),

  Students: defineTable({
    name: v.string(),
    classId: v.id("Classes"),
    observations: v.array(v.string()),
    evaluationsResults: v.array(v.id("StudentEvaluationGrades")),
  }),

  StudentEvaluationGrades: defineTable({
    studentId: v.id("Students"),
    evaluationGradesId: v.id("EvaluationsWithGrades"),
    criteriaId: v.id("Criteria"),
    grade: v.union(v.string(), v.number()),
    feedback: v.string(),
    updatedAt: v.float64(),
  }),

  Criteria: defineTable({
    name: v.string(),
    wheight: v.optional(v.number()),
    description: v.string(),
    isGraded: v.boolean(),
    gradeType: v.optional(v.string()), // Optional, not applicable if not graded
    grade: v.optional(v.union(v.string(), v.number())), // Grade, optional
    feedback: v.string(), // Feedback is always included
    createdBy: v.id("Users"),
    subFields: v.optional(
      v.object({
        name: v.string(),
        description: v.string(),
        grade: v.optional(v.union(v.string(), v.number())), // Optional, not applicable if not graded
      })
    ),
  })
    .index("by_createdBy", ["createdBy"]) // Indexing by creator
    .index("by_gradeType", ["gradeType"]), // Indexing by gradeType for quick filtering,
  CriteriaWithGrades: defineTable({
    name: v.string(),
    classId: v.id("Classes"),
    studentId: v.id("Students"),
    wheight: v.optional(v.number()),
    description: v.string(),
    isGraded: v.boolean(),
    gradeType: v.optional(v.string()), // Optional, not applicable if not graded
    grade: v.optional(v.union(v.string(), v.number())), // Grade, optional
    feedback: v.string(), // Feedback is always included
    createdBy: v.id("Users"),
    subFields: v.optional(
      v.object({
        name: v.string(),
        description: v.string(),
        grade: v.optional(v.union(v.string(), v.number())), // Optional, not applicable if not graded
      })
    ),
  })
    .index("by_classId", ["classId"])
    .index("by_studentId", ["studentId"])
    .index("by_createdBy", ["createdBy"]) // Indexing by creator
    .index("by_gradeType", ["gradeType"]), // Indexing by gradeType for quick filtering,

  EvaluationTemplates: defineTable({
    name: v.string(),
    description: v.string(),
    createdBy: v.id("Users"),
    createdAt: v.float64(),
    gradeType: v.string(),
    criteriaIds: v.array(v.id("Criteria")),
  }).index("by_createdBy", ["createdBy"]),
  EvaluationsWithGrades: defineTable({
    templateId: v.id("EvaluationTemplates"),
    classId: v.id("Classes"),
    studentId: v.id("Students"),
    conductedBy: v.id("Users"),
    conductedAt: v.float64(),
    overallGrade: v.optional(v.union(v.string(), v.number())),
    feedback: v.optional(v.string()),
    criterias: v.array(v.id("CriteriaWithGrades")),
  })
    .index("by_classId", ["classId"])
    .index("by_studentId", ["studentId"])
    .index("by_conductedBy", ["conductedBy"]),
  RapportStudent: defineTable({
    studentId: v.id("Students"),
    rapport: v.string(),
    details: v.string(),
    updatedAt: v.float64(),
  }),
  RapportClasse: defineTable({
    studentId: v.id("Classes"),
    rapport: v.string(),
    details: v.string(),
    updatedAt: v.float64(),
  }),
});
