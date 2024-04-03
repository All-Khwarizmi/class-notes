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

    let userId: Id<"Users"> | false = false;
    let userCreated: boolean = false;
    // If the user doesn't exist, create a new entry
    if (!existingUser) {
      userId = await ctx.db.insert("Users", {
        userId: args.userId,
        schoolSubject: args.schoolSubject,
        name: args.name,
        onboarding: true,
      });

      // Return a confirmation or the user's details
      return { userId, error: false };
    }

    // Check if the user has been added to db in the previous bloc
    if (!userId) {
      return { userId, error: true };
    }

    //! If arrived that far, the user has not been created
    return { userId, error: true };
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
