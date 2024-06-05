import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createClass = mutation({
  args: {
    userId: v.string(),
    name: v.string(),
    description: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const existingUser = await ctx.db
      .query("Users")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .first();

    if (existingUser) {
      const id = await ctx.db.insert("Classes", {
        userId: existingUser!._id,
        name: args.name,
        description: args.description,
        imageUrl: args.imageUrl,
        observations: [],
        evaluationsTemplatesId: [],
      });
      return { id, error: false };
    }
    return { id: false, error: true };
  },
});

export const deleteClass = mutation({
  args: {
    id: v.string(),
  },
  handler: async (ctx, args) => {
    const classe = await ctx.db
      .query("Classes")
      .filter((q) => q.eq(q.field("_id"), args.id))
      .first();
    if (classe) {
      ctx.db.delete(classe._id);
      return { error: false, success: true };
    }
    return { error: true, success: false };
  },
});

export const getClasses = query({
  args: {
    id: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("Users")
      .filter((q) => q.eq(q.field("userId"), args.id))
      .first();
    if (user) {
      const classes = await ctx.db
        .query("Classes")
        .filter((q) => q.eq(q.field("userId"), user._id))
        .collect();
      if (classes) {
        return classes;
      }
      return [];
    }
    return [];
  },
});

export const getClass = query({
  args: {
    id: v.string(),
  },
  handler: async (ctx, args) => {
    return ctx.db
      .query("Classes")
      .filter((q) => q.eq(q.field("_id"), args.id))
      .first();
  },
});

export const addSequenceClass = mutation({
  args: {
    classId: v.string(),
    sequenceId: v.string(),
  },
  handler: async (ctx, args) => {
    const sequence = await ctx.db
      .query("Sequences")
      .filter((q) => q.eq(q.field("_id"), args.sequenceId))
      .first();

    if (sequence) {
      const result = await ctx.db.insert("ClasseSequence", {
        ...sequence,
        classeId: args.classId,
      });
      if (result) {
        return { error: false, id: result };
      }
      return { error: true, id: "" };
    }
    return { error: true, id: "" };
  },
});

export const getClassSequences = query({
  args: {
    classId: v.string(),
  },
  handler: async (ctx, args) => {
    return ctx.db
      .query("ClasseSequence")
      .filter((q) => q.eq(q.field("classeId"), args.classId))
      .collect();
  },
});

export const deleteSequenceClass = mutation({
  args: {
    id: v.string(),
  },
  handler: async (ctx, args) => {
    const sequence = await ctx.db
      .query("ClasseSequence")
      .filter((q) => q.eq(q.field("_id"), args.id))
      .first();
    if (sequence) {
      ctx.db.delete(sequence._id);
      return { error: false, success: true };
    }
    return { error: true, success: false };
  },
});
