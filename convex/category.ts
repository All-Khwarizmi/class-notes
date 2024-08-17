import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createCategory = mutation({
  args: {
    name: v.string(),
    description: v.string(),
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    const existingUser = await ctx.db
      .query("Users")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .first();

    if (existingUser) {
      const categoryId = await ctx.db.insert("Category", {
        name: args.name,
        description: args.description,
        createdBy: existingUser!._id,
        createdAt: Date.now(),
      });
      return categoryId;
    }
  },
});

export const getCategories = query({
  args: {
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("Users")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .first();

    if (user) {
      const categories = await ctx.db
        .query("Category")
        .filter((q) => q.eq(q.field("createdBy"), user!._id))
        .collect();
      return categories;
    }
  },
});

export const updateCategory = mutation({
  args: {
    categoryId: v.string(),
    name: v.string(),
    description: v.string(),
  },
  handler: async (ctx, args) => {
    const category = await ctx.db
      .query("Category")
      .filter((q) => q.eq(q.field("_id"), args.categoryId))
      .first();

    if (category) {
      await ctx.db.patch(category._id, {
        name: args.name,
        description: args.description,
      });
      return category._id;
    }
  },
});
