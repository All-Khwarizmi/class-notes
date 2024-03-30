import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const ensureUserExists = mutation({
  args: {
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    const isAuthenticated = await ctx.auth.getUserIdentity();
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

      // Return a confirmation or the user's details
      return { userId, isNewUser: !existingUser };
    }
  },
});
