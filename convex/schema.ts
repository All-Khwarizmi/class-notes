import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

import { contentType } from './fields/content_type';
import { userSchema } from './fields/users';
import { visibilityTable } from './fields/visibility';
import blog from './tables/blog';
import { EvaluationBase } from './tables/evaluation_base_convex_schema';
import { EvaluationWithGrade } from './tables/evaluations_with_grades_convex_schema';

export default defineSchema({
  ...blog,
  Hostname: defineTable({
    hostname: v.string(),
    userId: v.string(),
  }).index('by_hostname', ['hostname']),
  Users: userSchema,
  VisibilityTable: visibilityTable,
  Category: defineTable({
    name: v.string(),
    description: v.string(),
    createdBy: v.id('Users'),
    createdAt: v.float64(),
  }).index('by_createdBy', ['createdBy']),
  Competences: defineTable({
    name: v.string(),
    description: v.string(),
    createdBy: v.id('Users'),
    createdAt: v.float64(),
    category: v.string(),
  })
    .index('by_createdBy', ['createdBy'])
    .index('by_category', ['category']),

  Complement: defineTable({
    name: v.string(),
    description: v.optional(v.string()),
    coursId: v.string(),
    sequenceId: v.string(),
    createdBy: v.string(),
    publish: v.boolean(),
    publishDate: v.optional(v.float64()),
    body: v.string(),
    contentType: contentType,
    type: v.union(
      v.literal('Lesson'),
      v.literal('Exercise'),
      v.literal('Additional')
    ),
  }).index('by_coursId', ['coursId']),
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
            v.literal('Diagram'),
            v.literal('Flowchart'),
            v.literal('Markup')
          ),
          createdAt: v.float64(),
        })
      )
    ),
    createdBy: v.string(),
    keywords: v.array(v.string()),
    content: v.string(),
    type: v.union(v.literal('Folder'), v.literal('Item')),
    lastModified: v.optional(v.float64()),
    contentType: v.union(
      v.literal('Diagram'),
      v.literal('Flowchart'),
      v.literal('Markup')
    ),
  }).index('by_parentId', ['parentId']),
  Cours: defineTable({
    name: v.string(),
    body: v.string(),
    imageUrl: v.string(),
    lessons: v.array(v.string()),
    competences: v.array(v.id('Competences')),
    sequenceId: v.string(),
    description: v.string(),
    createdBy: v.string(),
    createdAt: v.float64(),
    category: v.string(),
    contentType: v.optional(contentType),
    publish: v.optional(v.boolean()),
    coursComplementIds: v.optional(v.array(v.id('Cours'))),
  })
    .index('by_createdBy', ['createdBy'])
    .index('by_sequenceId', ['sequenceId']),

  Sequences: defineTable({
    name: v.string(),
    body: v.string(),
    imageUrl: v.string(),
    coursIds: v.array(v.id('Cours')),
    competencesIds: v.array(v.id('Competences')),
    description: v.string(),
    createdBy: v.string(),
    createdAt: v.float64(),
    category: v.string(),
    contentType: v.optional(contentType),
    publish: v.optional(v.boolean()),
  })
    .index('by_createdBy', ['createdBy'])
    .index('by_category', ['category']),
  ClasseSequence: defineTable({
    originalSequenceId: v.id('Sequences'),
    classeId: v.string(),
    name: v.string(),
    body: v.string(),
    imageUrl: v.string(),
    coursIds: v.array(v.id('Cours')),
    competencesIds: v.array(v.id('Competences')),
    description: v.string(),
    createdBy: v.string(),
    createdAt: v.float64(),
    category: v.string(),
    publish: v.optional(v.boolean()),
  }).index('by_classeId', ['classeId']),
  Classes: defineTable({
    userId: v.string(),
    description: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
    name: v.string(),
    observations: v.array(v.string()),
    studentsId: v.optional(v.array(v.id('Students'))),
    evaluationsTemplatesId: v.array(v.id('EvaluationTemplates')),
    publish: v.optional(v.boolean()),
    educationSystem: v.optional(v.string()),
    educationLevel: v.optional(v.string()),
  }),
  EvaluationBase,

  Students: defineTable({
    name: v.string(),
    classId: v.id('Classes'),
    observations: v.array(v.string()),
    evaluationsResults: v.array(v.id('StudentEvaluationGrades')),
    imageUrl: v.optional(v.string()),
  }),

  StudentEvaluationGrades: defineTable({
    studentId: v.id('Students'),
    evaluationGradesId: v.id('EvaluationsWithGrades'),
    criteriaId: v.id('Criteria'),
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
    createdBy: v.id('Users'),
    subFields: v.optional(
      v.object({
        name: v.string(),
        description: v.string(),
        grade: v.optional(v.union(v.string(), v.number())), // Optional, not applicable if not graded
      })
    ),
  })
    .index('by_createdBy', ['createdBy']) // Indexing by creator
    .index('by_gradeType', ['gradeType']), // Indexing by gradeType for quick filtering,
  CriteriaWithGrades: defineTable({
    name: v.string(),
    // status: v.optional(v.union(v.literal("published"), v.literal("draft"))),
    classId: v.id('Classes'),
    studentId: v.id('Students'),
    wheight: v.optional(v.number()),
    description: v.string(),
    isGraded: v.boolean(),
    gradeType: v.optional(v.string()), // Optional, not applicable if not graded
    grade: v.optional(v.union(v.string(), v.number())), // Grade, optional
    feedback: v.string(), // Feedback is always included
    createdBy: v.id('Users'),
    subFields: v.optional(
      v.object({
        name: v.string(),
        description: v.string(),
        grade: v.optional(v.union(v.string(), v.number())), // Optional, not applicable if not graded
      })
    ),
  })
    .index('by_classId', ['classId'])
    .index('by_studentId', ['studentId'])
    .index('by_createdBy', ['createdBy']) // Indexing by creator
    .index('by_gradeType', ['gradeType']), // Indexing by gradeType for quick filtering,

  EvaluationTemplates: defineTable({
    name: v.string(),
    description: v.string(),
    createdBy: v.id('Users'),
    createdAt: v.float64(),
    gradeType: v.string(),
    criteriaIds: v.array(v.id('Criteria')),
  }).index('by_createdBy', ['createdBy']),
  EvaluationsWithGrades: EvaluationWithGrade,
  RapportStudent: defineTable({
    studentId: v.id('Students'),
    rapport: v.string(),
    details: v.string(),
    updatedAt: v.float64(),
  }),
  RapportClasse: defineTable({
    studentId: v.id('Classes'),
    rapport: v.string(),
    details: v.string(),
    updatedAt: v.float64(),
  }),
});
