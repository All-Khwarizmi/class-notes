import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  Classes: defineTable({
    userId: v.string(),
    description: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
    name: v.string(),
    students: v.optional(v.array(v.any())),
  }),
  Students: defineTable({
    name: v.string(),
    classId: v.id("Classes"),
    
  }),
});
