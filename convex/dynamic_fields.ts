import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createDynamicField = mutation({
  args: {
    fieldKey: v.string(),
    fieldValue: v.string(), // JSON string for flexibility
    fieldType: v.string(),
    isGraded: v.boolean(),
    grade: v.optional(v.union(v.string(), v.number())),
    feedback: v.string(),
    createdBy: v.id("Users"),
  },
  handler: async (ctx, args) => {
    const dynamicFieldId = await ctx.db.insert("DynamicFields", {
      fieldKey: args.fieldKey,
      fieldValue: args.fieldValue,
      fieldType: args.fieldType,
      isGraded: args.isGraded,
      grade: args.grade,
      feedback: args.feedback,
      createdBy: args.createdBy,
    });
    return dynamicFieldId;
  },
});

export const updateDynamicField = mutation({
  args: {
    dynamicFieldId: v.id("DynamicFields"),
    updates: v.object({
      fieldKey: v.optional(v.string()),
      fieldValue: v.optional(v.string()),
      fieldType: v.optional(v.string()),
      isGraded: v.optional(v.boolean()),
      grade: v.optional(v.union(v.string(), v.number())),
      feedback: v.optional(v.string()),
    }),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.dynamicFieldId, args.updates);
  },
});



export const listDynamicFieldsByCreator = query({
  args: { createdBy: v.id("Users") },
  handler: async (ctx, args) => {
    const dynamicFields = await ctx.db
      .query("DynamicFields")
      .filter((q) => q.eq(q.field("createdBy"), args.createdBy))
      .collect();
    return dynamicFields;
  },
});


export const deleteDynamicField = mutation({
  args: { dynamicFieldId: v.id("DynamicFields") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.dynamicFieldId);
  },
});
