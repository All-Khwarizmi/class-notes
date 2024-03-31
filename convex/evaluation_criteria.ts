import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

export const createEvaluationCriteria = mutation({
  args: {
    criteriaId: v.id("Criteria"),
    evaluationId: v.id("Evaluations"),
  },
  handler: async (ctx, args) => {
    const evaluationCriteriaId = await ctx.db.insert("EvaluationCriteria", {
      criteriaId: args.criteriaId,
      evaluationId: args.evaluationId,
    });
    return evaluationCriteriaId;
  },
});

export const listCriteriaByEvaluation = query({
  args: { evaluationId: v.id("Evaluations") },
  handler: async (ctx, args) => {
    return ctx.db
      .query("EvaluationCriteria")
      .filter((q) => q.eq(q.field("evaluationId"), args.evaluationId))
      .collect();
  },
});
