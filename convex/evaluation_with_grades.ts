import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { gradeType } from "./fields/grade_type";

export const createEvaluationWithGrade = mutation({
  args: {
    evaluationDate: v.float64(),
    classeId: v.string(),
    evaluationBaseId: v.string(),
    grades: v.array(
      v.object({
        studentId: v.string(),
        feedback: v.string(),
        grades: v.array(
          v.object({
            criteriaId: v.string(),
            gradeType,
            grade: v.union(v.number(), v.string()),
          })
        ),
      })
    ),
  },
  handler: async (ctx, args) => {
    // Create the evaluation with grades
    const resultId = await ctx.db.insert("EvaluationsWithGrades", {
      publishDate: Date.now(),
      evaluationDate: args.evaluationDate,
      classeId: args.classeId,
      evaluationBaseId: args.evaluationBaseId,
      grades: args.grades,
    });

    if (!resultId) {
      throw new Error("Failed to create evaluation with grades");
    }

    

    return resultId;
  },
});
