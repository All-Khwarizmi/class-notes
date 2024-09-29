import { none, Option, some } from 'fp-ts/lib/Option';

import { blogPostSchema } from './blog-schema';

// DTOs
export type BlogPostDto = {
  id: string;
  title: string;
  content: string;
  excerpt?: string;
  slug: string;
  published: boolean;
  authorId: string;
  createdAt: number;
  updatedAt: number;
  image: string;
  authorName: string;
} & { message?: string };

export interface GetBlogPostsResponseDto {
  blogPosts: BlogPostDto[];
  nextCursor: string | null;
}

// Helper function to convert raw blog post to DTO
export function getBlogPostDto(blogPost: any): Option<BlogPostDto> {
  if (!blogPost) {
    return none;
  }
  const parsed = blogPostSchema.safeParse(blogPost);
  if (!parsed.success) {
    return none;
  }
  return some({
    id: parsed.data._id,
    title: parsed.data.title,
    content: parsed.data.content,
    excerpt: parsed.data.excerpt,
    slug: parsed.data.slug,
    published: parsed.data.published,
    authorId: parsed.data.authorId,
    createdAt: parsed.data.createdAt,
    updatedAt: parsed.data.updatedAt,
    image: parsed.data.image,
    authorName: parsed.data.authorName,
  });
}
