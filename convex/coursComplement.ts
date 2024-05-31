import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createCoursComplement = mutation({
  args: {
    name: v.string(),
    body: v.string(),
    sequenceId: v.string(),
    description: v.string(),
    userId: v.string(),
    coursId: v.string(),
    type: v.union(
      v.literal("lesson"),
      v.literal("diagram"),
      v.literal("video"),
      v.literal("audio")
    ),
    publish: v.boolean(),
    publishDate: v.float64(),
  },
  handler: async (ctx, args) => {
    const categoryId = await ctx.db.insert("CoursComplement", {
      sequenceId: args.sequenceId,
      name: args.name,
      body: args.body,
      description: args.description,
      createdBy: args.userId,
      publish: args.publish,
      publishDate: args.publishDate,
      coursId: args.coursId,
      type: args.type,
    });
    return categoryId;
  },
});

export const getAllCoursComplement = query({
  args: {
    coursId: v.string(),
  },
  handler: async (ctx, args) => {
    const coursComplements = await ctx.db
      .query("CoursComplement")
      .withIndex("by_coursId")
      .filter((q) => q.eq(q.field("coursId"), args.coursId))
      .collect();
    return coursComplements;
  },
});

export const getCoursComplement = query({
  args: {
    id: v.string(),
  },
  handler: async (ctx, args) => {
    const coursComplement = await ctx.db
      .query("CoursComplement")
      .filter((q) => q.eq(q.field("_id"), args.id))
      .first();
    return coursComplement;
  },
});

export const updateCoursComplement = mutation({
  args: {
    id: v.optional(v.string()),
    name: v.optional(v.string()),
    body: v.optional(v.string()),
    sequenceId: v.optional(v.string()),
    description: v.optional(v.string()),
    publish: v.optional(v.boolean()),
    publishDate: v.optional(v.float64()),
  },
  handler: async (ctx, args) => {
    const coursComplement = await ctx.db
      .query("CoursComplement")
      .filter((q) => q.eq(q.field("_id"), args.id))
      .first();
    if (coursComplement) {
      await ctx.db.patch(coursComplement?._id, {
        name: args.name,
        body: args.body,
        sequenceId: args.sequenceId,
        description: args.description,
        publish: args.publish,
        publishDate: args.publishDate,
      });
      return true;
    }
    return false;
  },
});
