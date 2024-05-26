import { z } from "zod";

export const CoursSchema = z.object({
  _id: z.string(),
  name: z.string(),
  body: z.string(),
  sequenceId: z.string(),
  imageUrl: z.string(),
  lessons: z.array(z.string()),
  competences: z.array(z.string()),
  description: z.string(),
  createdBy: z.string(),
  createdAt: z.number(),
  category: z.string(),
});

export type Cours = z.infer<typeof CoursSchema>;

export const SequenceSchema = z.object({
  _id: z.string(),
  name: z.string(),
  body: z.string(),
  imageUrl: z.string(),

  coursIds: z.array(z.string()),
  competencesIds: z.array(z.string()),
  description: z.string(),
  createdBy: z.string(),
  createdAt: z.number(),
  category: z.string(),
});

export type Sequence = z.infer<typeof SequenceSchema>;
