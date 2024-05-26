import { Id } from "./_generated/dataModel";
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createSequence = mutation({
  args: {
    name: v.string(),
    body: v.string(),
    cours: v.array(v.string()),
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
      // get all competences
      const competences = await ctx.db
        .query("Competences")
        .filter((q) => q.eq(q.field("createdBy"), existingUser!._id))
        .collect();

      // get all cours
      const allCours = await ctx.db
        .query("Cours")
        .filter((q) => q.eq(q.field("createdBy"), existingUser!._id))
        .collect();

      const coursIds: Id<"Cours">[] = [];
      for (const cours of allCours) {
        if (args.cours.includes(cours.name)) {
          coursIds.push(cours._id);
        }
      }

      const categoryId = await ctx.db.insert("Sequences", {
        name: args.name,
        body: args.body,
        coursIds,
        competencesIds: competences.map((c) => c._id),
        description: args.description,
        createdBy: existingUser!._id,
        createdAt: Date.now(),
        category: args.category,
      });
      return categoryId;
    }
  },
});

export const addCoursToSequence = mutation({
  args: {
    sequenceId: v.string(),
    cours: v.array(v.string()),
  },
  handler: async (ctx, args) => {
    const sequence = await ctx.db
      .query("Sequences")
      .filter((q) => q.eq(q.field("_id"), args.sequenceId))
      .first();

    if (sequence) {
      const allCours = await ctx.db
        .query("Cours")
        .filter((q) => q.eq(q.field("createdBy"), sequence.createdBy))
        .collect();

      const coursIds: Id<"Cours">[] = [];
      for (const cours of allCours) {
        if (args.cours.includes(cours.name)) {
          coursIds.push(cours._id);
        }
      }

      await ctx.db.patch(sequence._id, {
        coursIds: [...sequence.coursIds, ...coursIds],
      });
    }
  },
});

export const getAllSequences = query({
  args: {
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("Users")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .first();

    if (user) {
      const sequences = await ctx.db
        .query("Sequences")
        .filter((q) => q.eq(q.field("createdBy"), user!._id))
        .collect();
      return sequences;
    }
  },
});
