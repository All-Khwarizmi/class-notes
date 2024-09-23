import { Id } from "./_generated/dataModel";
import { internalMutation, mutation, query } from "./_generated/server";
import { ConvexError, v } from "convex/values";
const FREE_CREDITS = 5;
export const onboarding = mutation({
  args: {
    userId: v.string(),
    schoolSubject: v.string(),
    name: v.string(),
    hostname: v.string(),
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
        country: "USA",
        educationSystem: "USA",
        hostname: args.hostname,
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
    schoolSubject: v.optional(v.string()),
    name: v.optional(v.string()),
    country: v.optional(v.string()),
    educationSystem: v.optional(v.string()),
    classeOnboarding: v.optional(v.boolean()),
    sequenceOnboarding: v.optional(v.boolean()),
    courseOnboarding: v.optional(v.boolean()),
    complementOnboarding: v.optional(v.boolean()),
    hostname: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("Users")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .first();

    if (user) {
      // If hostname is provided, check if it is available
      if (args.hostname) {
        const hostnameExists = await ctx.db
          .query("Hostname")
          .filter((q) => q.eq(q.field("hostname"), args.hostname.toLowerCase()))
          .first();
        // If hostname is already taken by another user, return false
        if (hostnameExists && hostnameExists.userId !== user.userId) {
          return { userId: false, error: true };
          // If hostname is not taken, create it
        } else if (!hostnameExists) {
          // create hostname

          const result = await ctx.db.insert("Hostname", {
            hostname: args.hostname.toLowerCase(),
            userId: args.userId,
          });

          // Delete the old hostname

          const oldHostaname = await ctx.db
            .query("Hostname")
            .filter((q) => q.eq(q.field("hostname"), user.hostname))
            .first();
          if (oldHostaname) {
            await ctx.db.delete(oldHostaname._id);
          }
        }
      }
      const hostname = args.hostname || user.hostname;

      await ctx.db.patch(user._id, {
        schoolSubject: args.schoolSubject,
        name: args.name,
        onboarding: true,
        country: args.country,
        educationSystem: args.educationSystem,
        classeOnboarding: args.classeOnboarding,
        sequenceOnboarding: args.sequenceOnboarding,
        courseOnboarding: args.courseOnboarding,
        complementOnboarding: args.complementOnboarding,
        hostname,
      });
      return user;
    } else {
      return false;
    }
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

export const updateSubscription = internalMutation({
  args: { subscriptionId: v.string(), userId: v.string(), endsOn: v.number() },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("Users")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId))
      .first();

    if (!user) {
      throw new Error("no user found with that user id");
    }

    await ctx.db.patch(user._id, {
      subscriptionId: args.subscriptionId,
      endsOn: args.endsOn,
    });
  },
});

// export const isUserSubscribed = async (ctx: QueryCtx | MutationCtx) => {
//   const userId = await getUserId(ctx);

//   if (!userId) {
//     return false;
//   }

//   const userToCheck = await getFullUser(ctx, userId);

//   return (userToCheck?.endsOn ?? 0) > Date.now();
// };

export const createUser = internalMutation({
  args: {
    email: v.string(),
    userId: v.string(),
    name: v.string(),
    image: v.string(),
    hostname: v.string(),
  },
  handler: async (ctx, args) => {
    const hostnameExists = await ctx.db
      .query("Hostname")
      .filter((q) => q.eq(q.field("hostname"), args.hostname))
      .first();

    if (hostnameExists) {
      return { userId: false, error: true };
    }

    // create hostname
    await ctx.db.insert("Hostname", {
      hostname: args.hostname,
      userId: args.userId,
    });

    await ctx.db.insert("Users", {
      email: args.email,
      userId: args.userId,
      credits: FREE_CREDITS,
      onboarding: false,
      classeOnboarding: false,
      sequenceOnboarding: false,
      courseOnboarding: false,
      complementOnboarding: false,
      name: args.name,
      image: args.image,
      country: "USA",
      educationSystem: "US",
      schoolSubject: "Arts",
      hostname: args.hostname,
    });
  },
});

export const updateSubscriptionBySubId = internalMutation({
  args: { subscriptionId: v.string(), endsOn: v.number() },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("Users")
      .withIndex("by_subscriptionId", (q) =>
        q.eq("subscriptionId", args.subscriptionId)
      )
      .first();

    if (!user) {
      throw new Error("no user found with that user id");
    }

    await ctx.db.patch(user._id, {
      endsOn: args.endsOn,
    });
  },
});

// export function getFullUser(ctx: QueryCtx | MutationCtx, userId: string) {
//   return ctx.db
//     .query("users")
//     .withIndex("by_userId", (q) => q.eq("userId", userId))
//     .first();
// }

export const getUserByHostname = query({
  args: { hostname: v.string() },
  handler: async (ctx, args) => {
    const hostname = await ctx.db
      .query("Hostname")
      .filter((q) => q.eq(q.field("hostname"), args.hostname))
      .first();

    if (!hostname) {
      return null;
    }

    const user = await ctx.db
      .query("Users")
      .filter((q) => q.eq(q.field("userId"), hostname?.userId))
      .first();
    return user;
  },
});
