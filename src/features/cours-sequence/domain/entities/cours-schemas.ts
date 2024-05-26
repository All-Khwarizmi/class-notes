import { z } from "zod";

export const CoursSchema = z.object({
  _id: z.string(),
  name: z.string(),
  body: z.string(),
  lessons: z.array(z.string()),
  competences: z.array(z.string()),
  description: z.string(),
  createdBy: z.string(),
  createdAt: z.number(),
  category: z.string(),
});

export type Cours = z.infer<typeof CoursSchema>;


// Create a schema for the following entity:
//  Sequences: defineTable({
//    name: v.string(),
//    body: v.string(),
//    coursIds: v.array(v.id("Cours")),
//    competencesIds: v.array(v.id("Competences")),
//    description: v.string(),
//    createdBy: v.string(),
//    createdAt: v.float64(),
//    category: v.string(),
//  });

export const SequenceSchema = z.object({
  _id: z.string(),
  name: z.string(),
  body: z.string(),
  coursIds: z.array(z.string()),
  competencesIds: z.array(z.string()),
  description: z.string(),
  createdBy: z.string(),
  createdAt: z.number(),
  category: z.string(),
});

export type Sequence = z.infer<typeof SequenceSchema>;