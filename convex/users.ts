import { use } from "chai";
import { Id } from "./_generated/dataModel";
import { mutation } from "./_generated/server";
import { v } from "convex/values";

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
      console.log("User already exists", {
        userId,
      });
      return { userId, error: false };
    } else {
      console.log("Creating new user", {
        userId,
      });
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

export const getUser = mutation({
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
