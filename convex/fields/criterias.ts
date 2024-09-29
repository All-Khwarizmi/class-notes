import { v } from 'convex/values';

import { gradeType } from './grade_type';

export const criterias = v.array(
  v.object({
    id: v.string(),
    weight: v.optional(v.number()),
    name: v.string(),
    description: v.string(),
    isGraded: v.boolean(),
    createdBy: v.string(),
    gradeType,
  })
);
