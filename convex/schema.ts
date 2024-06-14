import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  Users: defineTable({
    userId: v.string(),
    schoolSubject: v.string(),
    name: v.string(),
    onboarding: v.boolean(),
    hostname: v.optional(v.string()),
  }),
  VisibilityTable: defineTable({
    userId: v.string(),
    classe: v.array(
      v.object({
        id: v.string(),
        publish: v.boolean(),
      })
    ),
    sequences: v.array(
      v.object({
        id: v.string(),
        publish: v.boolean(),
        classe: v.boolean(),
        classeId: v.string(),
      })
    ),
    cours: v.array(
      v.object({
        id: v.string(),
        publish: v.boolean(),
        sequence: v.boolean(),
        sequenceId: v.string(),
        classe: v.boolean(),
        classeId: v.string(),
      })
    ),
    complement: v.array(
      v.object({
        id: v.string(),
        publish: v.boolean(),
        sequence: v.boolean(),
        sequenceId: v.string(),
        cours: v.boolean(),
        coursId: v.string(),
        classe: v.boolean(),
        classeId: v.string(),
      })
    ),
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

  // Lesson: defineTable({
  //   name: v.string(),
  //   description: v.string(),
  //   coursId: v.id("Cours"),
  //   body: v.string(),
  //   sequenceId: v.id("Sequences"),
  //   createdBy: v.id("Users"),
  //   publish: v.boolean(),
  //   publishDate: v.float64(),
  // })
  //   // .index("by_createdBy", ["createdBy"])
  //   // .index("by_sequenceId", ["sequenceId"])
  //   .index("by_coursId", ["coursId"]),

  // Diagram: defineTable({
  //   name: v.string(),
  //   description: v.string(),
  //   coursId: v.id("Cours"),
  //   sequenceId: v.id("Sequences"),
  //   createdBy: v.string(),
  //   publish: v.boolean(),
  //   publishDate: v.float64(),
  //   body: v.string(),
  // }).index("by_coursId", ["coursId"]),
  Complement: defineTable({
    name: v.string(),
    description: v.optional(v.string()),
    coursId: v.string(),
    sequenceId: v.string(),
    createdBy: v.string(),
    publish: v.boolean(),
    publishDate: v.optional(v.float64()),
    body: v.string(),
    contentType: v.union(
      v.literal("Diagram"),
      v.literal("Flowchart"),
      v.literal("Markup")
    ),
    type: v.union(
      v.literal("Lesson"),
      v.literal("Exercise"),
      v.literal("Additional")
    ),
  }).index("by_coursId", ["coursId"]),
  Notes: defineTable({
    name: v.string(),
    description: v.string(),
    parentId: v.string(),
    fullPath: v.string(),
    pathDictionary: v.array(
      v.object({
        id: v.string(),
        name: v.string(),
      })
    ),
    folders: v.optional(
      v.array(
        v.object({
          id: v.string(),
          name: v.string(),
          contentType: v.union(
            v.literal("Diagram"),
            v.literal("Flowchart"),
            v.literal("Markup")
          ),
          createdAt: v.float64(),
        })
      )
    ),
    createdBy: v.string(),
    keywords: v.array(v.string()),
    content: v.string(),
    type: v.union(v.literal("Folder"), v.literal("Item")),
    contentType: v.union(
      v.literal("Diagram"),
      v.literal("Flowchart"),
      v.literal("Markup")
    ),
  }).index("by_parentId", ["parentId"]),
  Cours: defineTable({
    name: v.string(),
    body: v.string(),
    imageUrl: v.string(),
    lessons: v.array(v.string()),
    competences: v.array(v.id("Competences")),
    sequenceId: v.string(),
    description: v.string(),
    createdBy: v.string(),
    createdAt: v.float64(),
    category: v.string(),
    publish: v.optional(v.boolean()),
    coursComplementIds: v.optional(v.array(v.id("Cours"))),
  })
    .index("by_createdBy", ["createdBy"])
    .index("by_sequenceId", ["sequenceId"]),

  Sequences: defineTable({
    name: v.string(),
    body: v.string(),
    imageUrl: v.string(),
    coursIds: v.array(v.id("Cours")),
    competencesIds: v.array(v.id("Competences")),
    description: v.string(),
    createdBy: v.string(),
    createdAt: v.float64(),
    category: v.string(),
    publish: v.optional(v.boolean()),
  })
    .index("by_createdBy", ["createdBy"])
    .index("by_category", ["category"]),
  ClasseSequence: defineTable({
    originalSequenceId: v.id("Sequences"),
    classeId: v.string(),
    name: v.string(),
    body: v.string(),
    imageUrl: v.string(),
    coursIds: v.array(v.id("Cours")),
    competencesIds: v.array(v.id("Competences")),
    description: v.string(),
    createdBy: v.string(),
    createdAt: v.float64(),
    category: v.string(),
    publish: v.optional(v.boolean()),
  }).index("by_classeId", ["classeId"]),
  Classes: defineTable({
    userId: v.string(),
    description: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
    name: v.string(),
    observations: v.array(v.string()),
    studentsId: v.optional(v.array(v.id("Students"))),
    evaluationsTemplatesId: v.array(v.id("EvaluationTemplates")),
    publish: v.optional(v.boolean()),
  }),
  EvaluationBase: defineTable({
    name: v.string(),
    description: v.string(),
    createdBy: v.id("Users"),
    createdAt: v.float64(),
    gradeType: v.union(
      v.object({
        name: v.literal("Numeric"),
        type: v.literal("Numeric"),
        range: v.union(
          v.literal("1-4"),
          v.literal("1-5"),
          v.literal("1-10"),
          v.literal("1-20"),
          v.literal("0-100")
        ),
        grade: v.number(), // Numerical grade value
      }),
      v.object({
        name: v.literal("Percentage"),
        type: v.literal("Percentage"),
        grade: v.number(), // Percentage grade value
      }),
      v.object({
        name: v.literal("US Letter Grades"),
        type: v.literal("A/B/C/D/F"),
        grade: v.union(
          v.literal("A"),
          v.literal("B"),
          v.literal("C"),
          v.literal("D"),
          v.literal("F")
        ),
      }),
      v.object({
        name: v.literal("US Letter Grades with Pass/Fail"),
        type: v.literal("A/B/C/D/F/Pass/Fail"),
        grade: v.union(
          v.literal("A"),
          v.literal("B"),
          v.literal("C"),
          v.literal("D"),
          v.literal("F"),
          v.literal("Pass"),
          v.literal("Fail")
        ),
      }),
      v.object({
        name: v.literal("US Letter Grades with Pass/Fail/None"),
        type: v.literal("A/B/C/D/F/Pass/Fail/None"),
        grade: v.union(
          v.literal("A"),
          v.literal("B"),
          v.literal("C"),
          v.literal("D"),
          v.literal("F"),
          v.literal("Pass"),
          v.literal("Fail"),
          v.literal("None")
        ),
      }),
      v.object({
        name: v.literal("Pass/Fail"),
        type: v.literal("Pass/Fail"),
        grade: v.union(v.literal("Pass"), v.literal("Fail")),
      }),
      v.object({
        name: v.literal("Descriptive Grades"),
        type: v.literal("Excellent/Good/Satisfactory/Needs Improvement"),
        grade: v.union(
          v.literal("Excellent"),
          v.literal("Good"),
          v.literal("Satisfactory"),
          v.literal("Needs Improvement")
        ),
      }),
      v.object({
        name: v.literal("US 4.0 Scale"),
        type: v.literal("4.0 Scale"),
        grade: v.number(), // Grade on a 4.0 scale
      }),
      v.object({
        name: v.literal("UK Honors"),
        type: v.literal("First/Upper Second/Lower Second/Third"),
        grade: v.union(
          v.literal("First"),
          v.literal("Upper Second"),
          v.literal("Lower Second"),
          v.literal("Third")
        ),
      }),
      v.object({
        name: v.literal("10-point Scale"),
        type: v.literal("10-point Scale"),
        grade: v.number(), // Grade on a 10-point scale
      }),
      v.object({
        name: v.literal("20-point Scale"),
        type: v.literal("20-point Scale"),
        grade: v.number(), // Grade on a 20-point scale
      }),
      v.object({
        name: v.literal("Grade Points"),
        type: v.literal("Grade Points"),
        grade: v.number(), // General grade points
      }),
      v.object({
        name: v.literal("Custom"),
        type: v.literal("Other"),
        description: v.string(), // Description for the custom grading system
        grade: v.string(), // Flexible grade value as string
      }),
      // French Grading System (out of 20)
      v.object({
        name: v.literal("French Grading"),
        type: v.literal("20-point Scale"),
        grade: v.number(), // French grades are typically on a 0-20 scale
      }),
      // German Grading System (1.0 to 5.0, where 1.0 is the best and 5.0 is failing)
      v.object({
        name: v.literal("German Grading"),
        type: v.literal("Numeric"),
        range: v.literal("1-5"),
        grade: v.number(), // German grades are typically 1.0 to 5.0, sometimes to 6.0
      }),
      // Australian Grading System (HD, D, C, P, F)
      v.object({
        name: v.literal("Australian Grading"),
        type: v.literal("HD/D/C/P/F"),
        grade: v.union(
          v.literal("HD"), // High Distinction
          v.literal("D"), // Distinction
          v.literal("C"), // Credit
          v.literal("P"), // Pass
          v.literal("F") // Fail
        ),
      }),
      // Spanish Grading System (0-10 scale)
      v.object({
        name: v.literal("Spanish Grading"),
        type: v.literal("10-point Scale"),
        grade: v.number(), // Spanish grades are typically on a 0-10 scale
      }),
      v.object({
        name: v.literal("Sport Points"),
        type: v.literal("Points"),
        range: v.union(
          v.literal("0-10"),
          v.literal("0-20"),
          v.literal("0-100"),
          v.literal("0-1000")
        ),
        grade: v.number(), // Numeric points score
      }),
      // Sport Grading: Rank System (e.g., 1st, 2nd, 3rd)
      v.object({
        name: v.literal("Sport Ranking"),
        type: v.literal("Ranking"),
        grade: v.union(
          v.literal("1st"),
          v.literal("2nd"),
          v.literal("3rd"),
          v.literal("4th"),
          v.literal("5th"),
          v.literal("6th"),
          v.literal("7th"),
          v.literal("8th"),
          v.literal("9th"),
          v.literal("10th")
        ),
      }),
      // Sport Grading: Win/Loss/Tie notation
      v.object({
        name: v.literal("Sport Result"),
        type: v.literal("Win/Loss/Tie"),
        grade: v.union(v.literal("Win"), v.literal("Loss"), v.literal("Tie")),
      }),
      // Sport Grading: Performance Level (e.g., Excellent/Good/Average/Poor)
      v.object({
        name: v.literal("Sport Performance"),
        type: v.literal("Performance Level"),
        grade: v.union(
          v.literal("Excellent"),
          v.literal("Good"),
          v.literal("Average"),
          v.literal("Poor")
        ),
      })
    ),
  }).index("by_createdBy", ["createdBy"]),

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
