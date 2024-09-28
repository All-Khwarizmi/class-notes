import { z } from "zod";

export const blogPostSchema = z.object({
  _id: z.string(),
  title: z.string(),
  content: z.string(),
  excerpt: z.string().optional(),
  slug: z.string(),
  published: z.boolean(),
  authorId: z.string(),
  createdAt: z.number(),
  updatedAt: z.number(),
  image: z.string(),
  authorName: z.string(),
});
