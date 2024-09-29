'use server';

import { fetchQuery } from 'convex/nextjs';
import { isSome, none, Option, some } from 'fp-ts/lib/Option';

import { api } from '../../../convex/_generated/api';
import { blogPostSchema } from './blog-schema';
import {
  BlogPostDto,
  getBlogPostDto,
  GetBlogPostsResponseDto,
} from './get-blog-post';

// Get blog posts
export const getBlogPosts = async (
  authorId?: string,
  limit?: number,
  cursor?: string
): Promise<Option<GetBlogPostsResponseDto>> => {
  'use server';
  const result = await fetchQuery(api.blog.getBlogPosts, {
    authorId,
    limit,
    cursor,
  });
  if (!result || !Array.isArray(result.blogPosts)) {
    return none;
  }
  const blogPosts = [];
  for (const post of result.blogPosts) {
    const blogPost = getBlogPostDto(post);
    if (isSome(blogPost)) {
      blogPosts.push(blogPost.value);
    }
  }

  return some({
    blogPosts,
    nextCursor: result.nextCursor,
  });
};

// Get a single blog post by slug
export const getBlogPostBySlug = async (
  slug: string
): Promise<Option<BlogPostDto>> => {
  const result = await fetchQuery(api.blog.getBlogPost, { slug });
  if (!result) {
    return none;
  }

  const blogPost = blogPostSchema.safeParse(result);
  if (!blogPost.success) {
    return none;
  }

  return getBlogPostDto(blogPost.data);
};

// Get categories
export const getCategories = async () => {
  const result = await fetchQuery(api.blog.getCategories, {});
  // Add validation and conversion to DTO if needed
  return result;
};

// Get tags
export const getTags = async () => {
  const result = await fetchQuery(api.blog.getTags, {});
  // Add validation and conversion to DTO if needed
  return result;
};

// Get comments for a blog post
export const getComments = async (postId: string) => {
  const result = await fetchQuery(api.blog.getComments, { postId });
  // Add validation and conversion to DTO if needed
  return result;
};
