import { z } from "zod";

// Define the input schema for creating a blog post
export const createBlogPostSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  excerpt: z.string().optional(),
  slug: z.string().min(1, "Slug is required"),
  published: z.boolean(),
  authorId: z.string(),
  categoryIds: z.array(z.string()),

  tagIds: z.array(z.string()),
  image: z.string(),
  authorName: z.string().optional(),
});

// DTO for the created blog post
export type CreatedBlogPostDto = z.infer<typeof createBlogPostSchema>;
