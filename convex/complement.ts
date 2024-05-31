import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createComplement = mutation({
  args: {
    name: v.string(),
    body: v.string(),
    description: v.string(),
    coursId: v.string(),
    type: v.union(
      v.literal("lesson"),
      v.literal("diagram"),
      v.literal("video"),
      v.literal("audio")
    ),
    publish: v.boolean(),
  },
  handler: async (ctx, args) => {
    const existingCours = await ctx.db
      .query("Cours")
      .filter((q) => q.eq(q.field("_id"), args.coursId))
      .first();
    if (!existingCours) {
      throw new Error("Cours not found");
    }
    const categoryId = await ctx.db.insert("Complement", {
      sequenceId: existingCours.sequenceId,
      name: args.name,
      body: args.body,
      description: args.description,
      createdBy: existingCours.createdBy,
      publish: args.publish,
      publishDate: args.publish === true ? Date.now() : undefined,
      coursId: args.coursId,
      type: args.type,
    });
    return categoryId;
  },
});

export const getAllComplement = query({
  args: {
    coursId: v.string(),
  },
  handler: async (ctx, args) => {
    const complements = await ctx.db
      .query("Complement")
      .withIndex("by_coursId")
      .filter((q) => q.eq(q.field("coursId"), args.coursId))
      .collect();
    return complements;
  },
});

export const getComplement = query({
  args: {
    id: v.string(),
  },
  handler: async (ctx, args) => {
    const coursComplement = await ctx.db
      .query("Complement")
      .filter((q) => q.eq(q.field("_id"), args.id))
      .first();
    return coursComplement;
  },
});

export const updateComplement = mutation({
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
      .query("Complement")
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