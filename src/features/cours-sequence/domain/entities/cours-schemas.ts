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
