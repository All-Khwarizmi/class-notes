import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createStudent = mutation({
  args: {
    name: v.string(),
    classId: v.id("Classes"),
  },
  handler: async (ctx, args) => {
    const isAuthenticated = await ctx.auth.getUserIdentity();
    if (!isAuthenticated) {
      throw new Error("Not authenticated");
    }
    const id = await ctx.db.insert("Students", {
      name: args.name,
      classId: args.classId,
    });
    return { id };
  },
});

export const getStudents = query({
  args: {
    classId: v.string(),
  },
  handler: async (ctx, args) => {
    return ctx.db
      .query("Students")
      .filter((q) => q.eq(q.field("classId"), args.classId))
      .collect();
  },
});
