import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const createTemplate = mutation({
  args: {
    name: v.string(),
    description: v.string(),
    createdBy: v.id("Users"),
    overallGrade: v.optional(v.string()),
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

export const updateTemplate = mutation({
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

export const listTemplatesByCreator = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("Users")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .first();
    if (!user) {
      return {
        error: true,
        templates: null,
      };
    }

    const templates = await ctx.db
      .query("EvaluationTemplates")
      .filter((q) => q.eq(q.field("createdBy"), user._id))
      .collect();
    return { templates, error: false };
  },
});

export const deleteTemplate = mutation({
  args: { templateId: v.id("EvaluationTemplates") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.templateId);
  },
});

export const getTemplateWithCriteria = query({
  args: { templateId: v.string() },
  handler: async (ctx, args) => {
    const template = await ctx.db
      .query("EvaluationTemplates")
      .filter((q) => q.eq(q.field("_id"), args.templateId))
      .first();

    if (!template) {
      return null;
    }

    const criteria = await Promise.allSettled(
      template.criteriaIds.map(async (criteriaId) => {
        const criteria = await ctx.db
          .query("Criteria")
          .filter((q) => q.eq(q.field("_id"), criteriaId))
          .first();
        return criteria;
      })
    );
    if (criteria.some((c) => c.status === "rejected")) {
      return null;
    }

    return { ...template, criteria };
  },
});
