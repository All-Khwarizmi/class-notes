import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createCompetence = mutation({
  args: {
    name: v.string(),
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
      const categoryId = await ctx.db.insert("Competences", {
        name: args.name,
        description: args.description,
        createdBy: existingUser!._id,
        createdAt: Date.now(),
        category: args.category,
      });
      return categoryId;
    }
  },
});

export const getCompetences = query({
  args: {
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("Users")
      .filter((q) => q.eq(q.field("_id"), args.userId))
      .first();

    if (user) {
      const competences = await ctx.db
        .query("Competences")
        .filter((q) => q.eq(q.field("createdBy"), user!._id))
        .collect();
      return competences;
    }
  },
});
