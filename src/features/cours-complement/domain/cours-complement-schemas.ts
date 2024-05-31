import { z } from "zod";

// Implement schema and types for the following entity
// CoursComplement: defineTable({
//   name: v.string(),
//   description: v.string(),
//   coursId: v.id("Cours"),
//   sequenceId: v.id("Sequences"),
//   createdBy: v.string(),
//   publish: v.boolean(),
//   publishDate: v.float64(),
//   body: v.string(),

//   type: v.union(
//     v.literal("lesson"),
//     v.literal("diagram"),
//     v.literal("video"),
//     v.literal("audio")
//   ),
// });

export const CoursComplementSchema = z.object({
  id: z.string(),
  createdAt: z.number(),
  name: z.string(),
  description: z.string(),
  coursId: z.string(),
  sequenceId: z.string(),
  createdBy: z.string(),
  publish: z.boolean(),
  publishDate: z.number(),
  body: z.string(),
  type: z.union([
    z.literal("lesson"),
    z.literal("diagram"),
    z.literal("video"),
    z.literal("audio"),
  ]),
});

export type CoursComplement = z.infer<typeof CoursComplementSchema>;
