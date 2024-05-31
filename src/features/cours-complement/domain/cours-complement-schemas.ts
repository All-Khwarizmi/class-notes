import { z } from "zod";

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
