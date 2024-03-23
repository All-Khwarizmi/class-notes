import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createClass = mutation({
  args: {
    name: v.string(),
    description: v.string(),
    imageUrl: v.string(),
    students: v.array(v.string()),
  },
  handler: async (ctx, args) => {
    const id = await ctx.db.insert("Classes", {
      name: args.name,
      description: args.description,
      imageUrl: args.imageUrl,
      students: args.students,
    });
    return { id };
  },
});

export const getClasses = query({
  args: {},
  handler: async (ctx) => {
    return ctx.db.query("Classes").collect();
  },
});
