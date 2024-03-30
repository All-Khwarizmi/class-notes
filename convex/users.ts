import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const ensureUserExists = mutation({
  args: {
    userId: v.string(), // Assuming this is the unique ID from the auth provider
  },
  handler: async (ctx, args) => {
    // Check if the user already exists
    const existingUser = await ctx.db
      .query("Users")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .first();

    // If the user doesn't exist, create a new entry
    if (!existingUser) {
      await ctx.db.insert("Users", {
        userId: args.userId,
        // Initialize any additional fields as necessary
      });
    }

    // Return a confirmation or the user's details
    return { userId: args.userId, isNewUser: !existingUser };
  },
});
