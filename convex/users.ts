import { Id } from "./_generated/dataModel";
import { internalMutation, mutation, query } from "./_generated/server";
import { ConvexError, v } from "convex/values";

export const onboarding = mutation({
  args: {
    userId: v.string(),
    schoolSubject: v.string(),
    name: v.string(),
  },
  handler: async (ctx, args) => {
    const existingUser = await ctx.db
      .query("Users")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .first();

    let userId: Id<"Users"> | false | string = existingUser?.userId || false;
    if (userId) {
      return { userId, error: false };
    } else {
      userId = await ctx.db.insert("Users", {
        userId: args.userId,
        schoolSubject: args.schoolSubject,
        name: args.name,
        onboarding: true,
      });
      return { userId, error: false };
    }
  },
});

export const getUserMutation = mutation({
  args: {
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("Users")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .first();

    return user;
  },
});

export const getUserQuery = query({
  args: {
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("Users")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .first();

    return user;
  },
});

export const saveUserMutation = mutation({
  args: {
    userId: v.string(),
    schoolSubject: v.string(),
    name: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("Users")
      .filter((q) => q.eq(q.field("_id"), args.userId))
      .first();

    if (user) {
      await ctx.db.patch(user._id, {
        schoolSubject: args.schoolSubject,
        name: args.name,
        onboarding: true,
      });
      return user;
    } else {
      return false;
    }
  },
});

export const createUser = internalMutation({
  args: { tokenIdentifier: v.string(), name: v.string(), image: v.string() },
  async handler(ctx, args) {
    await ctx.db.insert("Users", {
      name: args.name,
      image: args.image,
      userId: args.tokenIdentifier,
    });
  },
});

export const updateUser = internalMutation({
  args: { userId: v.string(), name: v.string(), image: v.string() },
  async handler(ctx, args) {
    const user = await ctx.db
      .query("Users")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId))
      .first();

    if (!user) {
      throw new ConvexError("no user with this token found");
    }

    await ctx.db.patch(user._id, {
      name: args.name,
      image: args.image,
    });
  },
});
