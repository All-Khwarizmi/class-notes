import { z } from "zod";

// Define the schema for the visibility from the schema
//   VisibilityTable: defineTable({
//     userId: v.string(),
//     classe: v.array(
//       v.object({
//         id: v.string(),
//         publish: v.boolean(),
//       })
//     ),
//     sequences: v.array(
//       v.object({
//         id: v.string(),
//         publish: v.boolean(),
//         classe: v.boolean(),
//         classeId: v.string(),
//       })
//     ),
//     cours: v.array(
//       v.object({
//         id: v.string(),
//         publish: v.boolean(),
//         sequence: v.boolean(),
//         sequenceId: v.string(),
//       })
//     ),
//     complement: v.array(
//       v.object({
//         id: v.string(),
//         publish: v.boolean(),
//         sequence: v.boolean(),
//         sequenceId: v.string(),
//         cours: v.boolean(),
//         coursId: v.string(),
//       })
//     ),
//   }),

export const VisibilitySchema = z.object({
  userId: z.string(),
  classe: z.array(
    z.object({
      id: z.string(),
      publish: z.boolean(),
    })
  ),
  sequences: z.array(
    z.object({
      id: z.string(),
      publish: z.boolean(),
      classe: z.boolean(),
      classeId: z.string(),
    })
  ),
  cours: z.array(
    z.object({
      id: z.string(),
      publish: z.boolean(),
      sequence: z.boolean(),
      sequenceId: z.string(),
    })
  ),
  complement: z.array(
    z.object({
      id: z.string(),
      publish: z.boolean(),
      sequence: z.boolean(),
      sequenceId: z.string(),
      cours: z.boolean(),
      coursId: z.string(),
    })
  ),
});
