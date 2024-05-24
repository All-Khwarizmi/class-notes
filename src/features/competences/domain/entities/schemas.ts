import { z } from "zod";

export const categorySchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  userId: z.string(),
});

export const competenceSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  category: z.string(),
  userId: z.string(),
});

export type Category = z.infer<typeof categorySchema>;
export type Competence = z.infer<typeof competenceSchema>;
