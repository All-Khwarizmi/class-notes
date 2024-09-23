import { v } from "convex/values";
import { query, mutation, internalQuery } from "./_generated/server";

export const getHostname = query({
  args: { hostname: v.string() },
  handler: async ({ db }, { hostname }) => {
    return await db
      .query("Hostname")
      .filter((q) => q.eq(q.field("hostname"), hostname))
      .first();
  },
});

export const createHostname = mutation({
  args: { hostname: v.string(), userId: v.string() },
  handler: async ({ db }, { hostname, userId }) => {
    const existingHostname = await db
      .query("Hostname")
      .filter((q) => q.eq(q.field("hostname"), hostname))
      .first();
    if (existingHostname) {
      return { error: true };
    }
    return await db.insert("Hostname", { hostname, userId });
  },
});

export const deleteHostname = mutation({
  args: { hostname: v.string() },
  handler: async ({ db }, { hostname }) => {
    const result = await db
      .query("Hostname")
      .filter((q) => q.eq(q.field("hostname"), hostname))
      .first();
    if (result) {
      return await db.delete(result._id);
    }
    return null;
  },
});

export const isHostnameAvailable = internalQuery({
  args: { hostname: v.string() },
  handler: async ({ db }, { hostname }) => {
    const result = await db
      .query("Hostname")
      .filter((q) => q.eq(q.field("hostname"), hostname))
      .first();
    return result ? false : true;
  },
});

export const isHostnameAvailableClient = mutation({
  args: { hostname: v.string(), userId: v.string() },
  handler: async ({ db }, { hostname, userId }) => {
    const result = await db
      .query("Hostname")
      .filter((q) => q.eq(q.field("hostname"), hostname))
      .filter((q) => q.eq(q.field("userId"), userId))
      .first();
    return result ? false : true;
  },
});
