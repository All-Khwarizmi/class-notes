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
    console.log(isAuthenticated);
    if (!isAuthenticated) {
      throw new Error("Not authenticated");
    }
    const existingUser = await ctx.db
      .query("Users")
      .filter((q) => q.eq(q.field("userId"), isAuthenticated.subject))
      .first();

    // If the user doesn't exist, create a new entry
    if (!existingUser) {
      const userId = await ctx.db.insert("Users", {
        userId: isAuthenticated.subject,
        // Initialize any additional fields as necessary
      });
      const id = await ctx.db.insert("Classes", {
        userId: userId,
        name: args.name,
        description: args.description,
        imageUrl: args.imageUrl,
        students: args.students,
      });
      return { id };
    }
    const id = await ctx.db.insert("Classes", {
      userId: existingUser!._id,
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
  args: {
    id: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("Users")
      .filter((q) => q.eq(q.field("userId"), args.id))
      .first();
    if (!user) {
      throw new Error("User not found");
    }
    const classes = await ctx.db
      .query("Classes")
      .filter((q) => q.eq(q.field("userId"), user._id))
      .collect();

    return classes;
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
