import { sequence } from "fp-ts/lib/Traversable";
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createCours = mutation({
  args: {
    name: v.string(),
    body: v.string(),
    lessons: v.array(v.string()),
    sequenceId: v.string(),
    competences: v.array(v.string()),
    description: v.string(),
    userId: v.string(),
    category: v.string(),
  },
  handler: async (ctx, args) => {
    const existingUser = await ctx.db
      .query("Users")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .first();

    if (existingUser) {
      const existingSequence = await ctx.db
        .query("Sequences")
        .filter((q) => q.eq(q.field("_id"), args.sequenceId))
        .first();

      // get all competences
      const competences = await ctx.db
        .query("Competences")
        .filter((q) => q.eq(q.field("createdBy"), existingUser!._id))
        .collect();

      const categoryId = await ctx.db.insert("Cours", {
        sequenceId: existingSequence!._id,
        name: args.name,
        body: args.body,
        lessons: args.lessons,
        competences: competences.map((c) => c._id),
        description: args.description,
        createdBy: existingUser!._id,
        createdAt: Date.now(),
        category: args.category,
      });

      // Add the cours to the sequence
      await ctx.db.patch(existingSequence!._id, {
        coursIds: [...existingSequence!.coursIds, categoryId],
      });

      return categoryId;
    }
  },
});

export const getAllCours = query({
  args: {
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("Users")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .first();

    if (user) {
      const cours = await ctx.db
        .query("Cours")
        .filter((q) => q.eq(q.field("createdBy"), user!._id))
        .collect();
      return cours;
    }
  },
});

export const getSingleCours = query({
  args: {
    userId: v.string(),
    coursId: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("Users")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .first();

    if (user) {
      const cours = await ctx.db
        .query("Cours")
        .filter((q) => q.eq(q.field("_id"), args.coursId))
        .first();
      return cours;
    }
  },
});

export const updateCours = mutation({
  args: {
    userId: v.string(),
    coursId: v.string(),
    name: v.string(),
    body: v.string(),
    lessons: v.array(v.string()),
    competences: v.array(v.string()),
    description: v.string(),
    category: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("Users")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .first();

    if (user) {
      const existingCours = await ctx.db
        .query("Cours")
        .filter((q) => q.eq(q.field("_id"), args.coursId))
        .first();

      if (existingCours) {
        const competences = await ctx.db
          .query("Competences")
          .filter((q) => q.eq(q.field("createdBy"), user!._id))
          .collect();

        await ctx.db.patch(existingCours._id, {
          name: args.name,
          body: args.body,
          lessons: args.lessons,
          competences: competences.map((c) => c._id),
          description: args.description,
          category: args.category,
        });
      }
    }
  },
});

export const updateCoursBody = mutation({
  args: {
    userId: v.string(),
    coursId: v.string(),
    body: v.string(),
  },
  handler: async (ctx, args) => {
    try {
      const user = await ctx.db
        .query("Users")
        .filter((q) => q.eq(q.field("userId"), args.userId))
        .first();

      if (user) {
        const existingCours = await ctx.db
          .query("Cours")
          .filter((q) => q.eq(q.field("_id"), args.coursId))
          .first();

        if (existingCours) {
          await ctx.db.patch(existingCours._id, {
            body: args.body,
          });
        }
      }
    } catch (error) {
      console.log(error);
      return error;
    }
  },
});
