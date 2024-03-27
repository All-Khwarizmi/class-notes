import { ar } from "@faker-js/faker";
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createClass = mutation({
  args: {
    name: v.string(),
    description: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
    students: v.optional(v.array(v.string())),
  },
  handler: async (ctx, args) => {
    const isAuthenticated = await ctx.auth.getUserIdentity();
    if (!isAuthenticated) {
      throw new Error("Not authenticated");
    }
    const id = await ctx.db.insert("Classes", {
      userId: isAuthenticated.subject,
      name: args.name,
      description: args.description,
      imageUrl: args.imageUrl,
      students: args.students,
    });
    return { id };
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
      return ctx.db.delete(classe._id);
    }
  },
});

export const getClasses = query({
  args: {},
  handler: async (ctx) => {
    return ctx.db.query("Classes").collect();
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
