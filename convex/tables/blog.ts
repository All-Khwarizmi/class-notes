import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

const blogPosts = defineTable({
  title: v.string(),
  content: v.string(),
  excerpt: v.optional(v.string()),
  slug: v.string(),
  published: v.boolean(),
  authorId: v.string(),
  createdAt: v.number(),
  updatedAt: v.number(),
  image: v.string(),
  authorName: v.string(),
})
  .index('by_author', ['authorId'])
  .index('by_slug', ['slug'])
  .index('by_createdAt', ['createdAt']);

const blogCategories = defineTable({
  name: v.string(),
  slug: v.string(),
  description: v.optional(v.string()),
}).index('by_slug', ['slug']);

const blogTags = defineTable({
  name: v.string(),
  slug: v.string(),
}).index('by_slug', ['slug']);

const blogPostCategories = defineTable({
  postId: v.string(),
  categoryId: v.string(),
})
  .index('by_post', ['postId'])
  .index('by_category', ['categoryId']);

const blogPostTags = defineTable({
  postId: v.string(),
  tagId: v.string(),
})
  .index('by_post', ['postId'])
  .index('by_tag', ['tagId']);

const blogComments = defineTable({
  content: v.string(),
  authorId: v.string(),
  postId: v.string(),
  createdAt: v.number(),
  updatedAt: v.number(),
})
  .index('by_post', ['postId'])
  .index('by_author', ['authorId']);
export default {
  blogPosts,
  blogCategories,
  blogTags,
  blogPostCategories,
  blogPostTags,
  blogComments,
};
