import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const associateDynamicFieldWithCriterion = mutation({
  args: {
    criteriaId: v.id("Criteria"),
    dynamicFieldId: v.id("DynamicFields"),
  },
  handler: async (ctx, args) => {
    // Create a new link
    await ctx.db.insert("CriteriaDynamicFieldsLink", {
      criteriaId: args.criteriaId,
      dynamicFieldId: args.dynamicFieldId,
    });
  },
});



export const listDynamicFieldsForCriterion = query({
  args: { criteriaId: v.id("Criteria") },
  handler: async (ctx, args) => {
    const links = await ctx.db
      .query("CriteriaDynamicFieldsLink")
      .filter((q) => q.eq(q.field("criteriaId"), args.criteriaId))
      .collect();

    // Fetch each dynamic field linked to the criterion
    const dynamicFields = await Promise.all(
      links.map((link) => ctx.db.get(link.dynamicFieldId))
    );

    return dynamicFields.filter((df) => df !== null); // Filter out any null results
  },
});



export const removeAssociation = mutation({
  args: {
    criteriaId: v.id("Criteria"),
    dynamicFieldId: v.id("DynamicFields"),
  },
  handler: async (ctx, args) => {
    // Find the link to remove
    const link = await ctx.db
      .query("CriteriaDynamicFieldsLink")
      .filter(
        (q) =>
          q.eq(q.field("criteriaId"), args.criteriaId) &&
          q.eq(q.field("dynamicFieldId"), args.dynamicFieldId)
      )
      .first();

    if (link) {
      // Delete the link if found
      await ctx.db.delete(link._id);
    }
  },
});
