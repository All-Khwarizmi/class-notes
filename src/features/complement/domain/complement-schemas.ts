import { z } from "zod";

export const contentType = z.union([
  z.literal("Diagram"),
  z.literal("Embed"),
  z.literal("Markup"),
]);
export const ComplementSchema = z.object({
  id: z.string(),
  createdAt: z.number(),
  name: z.string(),
  description: z.string().optional(),
  coursId: z.string(),
  sequenceId: z.string(),
  createdBy: z.string(),
  publish: z.boolean().optional(),
  publishDate: z.number().optional(),
  body: z.string(),
  type: z.union([
    z.literal("Lesson"),
    z.literal("Exercise"),
    z.literal("Additional"),
  ]),
  contentType,
});

export type Complement = z.infer<typeof ComplementSchema>;
