import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getVisibility = query({
  args: {
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("Users")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .first();
    if (user) {
      const visibility = await ctx.db
        .query("VisibilityTable")
        .filter((q) => q.eq(q.field("userId"), user._id))
        .first();
      return visibility;
    }
  },
});
