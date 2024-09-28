"use server";

import { api } from "../../../convex/_generated/api";
import { none, Option, some } from "fp-ts/lib/Option";
import { fetchMutation } from "convex/nextjs";
import { createBlogPostSchema, CreatedBlogPostDto } from "./blog-post-dto";
import { z } from "zod";
import { BlogPostDto } from "./get-blog-post";

// Function to create a blog post
export async function createBlogPost(
  input: z.infer<typeof createBlogPostSchema>
): Promise<Option<BlogPostDto>> {
  try {
    // Validate input
    const validatedInput = createBlogPostSchema.parse(input);

    // Call Convex mutation to create the blog post
    const postId = await fetchMutation(api.blog.createBlogPost, validatedInput);

    if (!postId) {
      console.error("Failed to create blog post");
      return none;
    }

    // Return the created blog post DTO
    return some({
      id: postId,
      title: validatedInput.title,
      slug: validatedInput.slug,
      content: validatedInput.content,
      excerpt: validatedInput.excerpt,
      published: validatedInput.published,
      authorId: validatedInput.authorId,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      authorName: validatedInput.authorName || "",
      image: validatedInput.image,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("Validation error:", error.errors);
    } else {
      console.error("Error creating blog post:", error);
    }
    return none;
  }
}

// Example usage in a server action
export async function createBlogPostAction(
  post: CreatedBlogPostDto
): Promise<BlogPostDto | { message: string }> {
  "use server";
  try {
    const validatedData = createBlogPostSchema.parse({
      ...post,
      published: post.published === true,
      categoryIds: [], // Add logic to handle categoryIds if needed
      tagIds: [], // Add logic to handle tagIds if needed
    });

    const postId = await fetchMutation(api.blog.createBlogPost, validatedData);

    if (!postId) {
      throw new Error("Failed to create blog post");
    }

    return {
      ...validatedData,
      id: postId,

      message: "Article publié avec succès !",
    };
  } catch (error) {
    console.error("Error creating blog post:", error);
    return {
      message: "Échec de l'enregistrement de l'article. Veuillez réessayer.",
    };
  }
}
