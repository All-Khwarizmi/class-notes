import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createCriterion = mutation({
  args: {
    name: v.string(),
    description: v.string(),
    isGraded: v.boolean(),
    gradeType: v.optional(v.string()),
    feedback: v.string(),
    createdBy: v.id("Users"),
  },
  handler: async (ctx, args) => {
    const criterionId = await ctx.db.insert("Criteria", {
      name: args.name,
      wheight: 1,
      description: args.description,
      isGraded: args.isGraded,
      gradeType: args.gradeType,
      feedback: args.feedback,
      createdBy: args.createdBy,
    });
    return criterionId;
  },
});

export const updateCriterion = mutation({
  args: {
    criterionId: v.id("Criteria"),
    updates: v.object({
      name: v.optional(v.string()),
      description: v.optional(v.string()),
      isGraded: v.optional(v.boolean()),
      gradeType: v.optional(v.string()),
      feedback: v.optional(v.string()),
    }),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.criterionId, args.updates);
  },
});

export const listCriteriaByCreator = query({
  args: {
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("Users")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .first();

    if (!user) {
      throw new Error("User not found");
    }
    const criteria = await ctx.db
      .query("Criteria")
      .filter((q) => q.eq(q.field("createdBy"), user?._id))
      .collect();
    return criteria;
  },
});

export const deleteCriterion = mutation({
  args: { criterionId: v.id("Criteria") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.criterionId);
  },
});
