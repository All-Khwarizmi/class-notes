import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
export const classeVisibility = v.array(
  v.object({
    id: v.string(),
    publish: v.boolean(),
    name: v.string(),
    description: v.string(),
  })
);
export const sequenceVisibility = v.array(
  v.object({
    id: v.string(),
    publish: v.boolean(),
    classe: v.boolean(),
    classeId: v.string(),
    name: v.string(),
    description: v.string(),
  })
);
export const coursVisibility = v.array(
  v.object({
    id: v.string(),
    publish: v.boolean(),
    sequence: v.boolean(),
    sequenceId: v.string(),
    classe: v.boolean(),
    classeId: v.string(),
    name: v.string(),
    description: v.string(),
  })
);
export const complementVisibility = v.array(
  v.object({
    id: v.string(),
    publish: v.boolean(),
    sequence: v.boolean(),
    sequenceId: v.string(),
    cours: v.boolean(),
    coursId: v.string(),
    classe: v.boolean(),
    classeId: v.string(),
    name: v.string(),
    description: v.string(),
  })
);
export const visibilityTableConvexSchema = {
  userId: v.string(),
  classe: classeVisibility,
  sequences: sequenceVisibility,
  cours: coursVisibility,
  complement: complementVisibility,
};

export const visibilityTable = defineTable({
  userId: v.string(),
  classe: classeVisibility,
  sequences: sequenceVisibility,
  cours: coursVisibility,
  complement: complementVisibility,
}).index("by_userId", ["userId"]);
