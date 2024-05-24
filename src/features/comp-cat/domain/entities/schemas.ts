import { z } from "zod";

export const categorySchema = z.object({
  _id: z.string(),
  name: z.string(),
  description: z.string(),
  createdBy: z.string(),
});

export const competenceSchema = z.object({
  _id: z.string(),
  name: z.string(),
  description: z.string(),
  category: z.string(),
  createdBy: z.string(),
});

export type Category = z.infer<typeof categorySchema>;
export type Competence = z.infer<typeof competenceSchema>;
