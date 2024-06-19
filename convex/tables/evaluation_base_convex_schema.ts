import { v } from "convex/values";
import { defineTable } from "convex/server";
import { gradeType } from "../fields/grade_type";
import { criterias } from "../fields/criterias";

const EvaluationBase = defineTable({
  name: v.string(),
  description: v.optional(v.string()),
  createdBy: v.string(),
  isGraded: v.boolean(),
  createdAt: v.float64(),
  criterias,
  gradeType,
})
  .index("by_createdBy", ["createdBy"])

export { EvaluationBase };
