import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const createEvaluationTemplate = mutation({
  args: {
    name: v.string(),
    description: v.string(),
    createdBy: v.id("Users"),
    gradeType: v.string(),
    criteriaIds: v.array(v.id("Criteria")),
  },
  handler: async (ctx, args) => {
    const templateId = await ctx.db.insert("EvaluationTemplates", {
      name: args.name,
      description: args.description,
      createdBy: args.createdBy,
      gradeType: args.gradeType,
      criteriaIds: args.criteriaIds,
      createdAt: Date.now(),
    });
    return templateId;
  },
});

export const updateEvaluationTemplate = mutation({
  args: {
    templateId: v.id("EvaluationTemplates"),
    updates: v.object({
      name: v.optional(v.string()),
      description: v.optional(v.string()),
      gradeType: v.optional(v.string()),
      criteriaIds: v.optional(v.array(v.id("Criteria"))),
    }),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.templateId, {
      ...(args.updates.name && { name: args.updates.name }),
      ...(args.updates.description && {
        description: args.updates.description,
      }),
      ...(args.updates.gradeType && { gradeType: args.updates.gradeType }),
      ...(args.updates.criteriaIds && {
        criteriaIds: args.updates.criteriaIds,
      }),
    });
  },
});

export const listEvaluationTemplatesByCreator = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("Users")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .first();

    if (!user) {
      throw new Error("User not found");
    }

    const templates = await ctx.db
      .query("EvaluationTemplates")
      .filter((q) => q.eq(q.field("createdBy"), user._id))
      .collect();
    return templates;
  },
});

export const deleteEvaluationTemplate = mutation({
  args: { templateId: v.id("EvaluationTemplates") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.templateId);
  },
});
