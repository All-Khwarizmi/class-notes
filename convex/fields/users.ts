import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export const userSchema = defineTable({
  userId: v.string(),
  image: v.optional(v.string()),
  schoolSubject: v.string(),
  educationSystem: v.string(),
  country: v.optional(v.string()),
  name: v.optional(v.string()),
  onboarding: v.optional(v.boolean()),
  hostname: v.optional(v.string()),
  email: v.optional(v.string()),
  subscriptionId: v.optional(v.string()),
  endsOn: v.optional(v.number()),
  credits: v.optional(v.number()),
})
  .index("by_userId", ["userId"])
  .index("by_subscriptionId", ["subscriptionId"]);
