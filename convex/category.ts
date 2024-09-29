import { v } from 'convex/values';

import { mutation, query } from './_generated/server';

export const createCategory = mutation({
  args: {
    name: v.string(),
    description: v.string(),
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    const existingUser = await ctx.db
      .query('Users')
      .filter((q) => q.eq(q.field('userId'), args.userId))
      .first();

    if (existingUser) {
      const categoryId = await ctx.db.insert('Category', {
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
      .query('Users')
      .filter((q) => q.eq(q.field('userId'), args.userId))
      .first();

    if (user) {
      const categories = await ctx.db
        .query('Category')
        .filter((q) => q.eq(q.field('createdBy'), user!._id))
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
      .query('Category')
      .filter((q) => q.eq(q.field('_id'), args.categoryId))
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

export const deleteCategory = mutation({
  args: {
    categoryId: v.string(),
  },
  handler: async (ctx, args) => {
    const category = await ctx.db
      .query('Category')
      .filter((q) => q.eq(q.field('_id'), args.categoryId))
      .first();

    if (category) {
      // Cascade delete all the competences in the category
      const competences = await ctx.db
        .query('Competences')
        .filter((q) => q.eq(q.field('category'), category.name))
        .collect();

      for (const competence of competences) {
        await ctx.db.delete(competence._id);
      }

      await ctx.db.delete(category._id);
      return category._id;
    }
  },
});
