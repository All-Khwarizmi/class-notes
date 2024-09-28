import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { Id } from "./_generated/dataModel";

// Queries

export const getBlogPosts = query({
  args: {
    authorId: v.optional(v.string()),
    limit: v.optional(v.number()),
    cursor: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { authorId, limit = 10, cursor } = args;
    let blogPosts = ctx.db
      .query("blogPosts")
      .order("desc")
      .filter((q) => q.eq(q.field("published"), true));

    if (authorId) {
      blogPosts = blogPosts.filter((q) => q.eq(q.field("authorId"), authorId));
    }

    if (cursor) {
      blogPosts = blogPosts.filter((q) => q.lt(q.field("_id"), cursor));
    }

    const results = await blogPosts.take(limit + 1);
    const hasMore = results.length > limit;
    const nextCursor = hasMore ? results[limit - 1]._id : null;

    return {
      blogPosts: results.slice(0, limit),
      nextCursor,
    };
  },
});

export const getBlogPost = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    const post = await ctx.db
      .query("blogPosts")
      .filter((q) => q.eq(q.field("slug"), args.slug))
      .first();

    if (!post) return null;

    const categories = await ctx.db
      .query("blogPostCategories")
      .filter((q) => q.eq(q.field("postId"), post._id))
      .collect();

    const tags = await ctx.db
      .query("blogPostTags")
      .filter((q) => q.eq(q.field("postId"), post._id))
      .collect();

    const categoryIds = categories.map(
      (c) => c.categoryId
    ) as Id<"blogCategories">[];
    const tagIds = tags.map((t) => t.tagId) as Id<"blogTags">[];
    const categoriesData = [];
    for (const categoryId of categoryIds) {
      const category = await ctx.db
        .query("blogCategories")
        .filter((q) => q.eq(q.field("_id"), categoryId))
        .first();
      categoriesData.push(category);
    }

    const tagsData = [];
    for (const tagId of tagIds) {
      const tag = await ctx.db
        .query("blogTags")
        .filter((q) => q.eq(q.field("_id"), tagId))
        .first();
      tagsData.push(tag);
    }

    return { ...post, categories: categoriesData, tags: tagsData };
  },
});

export const getCategories = query({
  handler: async (ctx) => {
    return await ctx.db.query("blogCategories").collect();
  },
});

export const getTags = query({
  handler: async (ctx) => {
    return await ctx.db.query("blogTags").collect();
  },
});

export const getComments = query({
  args: { postId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("blogComments")
      .filter((q) => q.eq(q.field("postId"), args.postId))
      .order("desc")
      .collect();
  },
});

// Mutations

export const createBlogPost = mutation({
  args: {
    title: v.string(),
    content: v.string(),
    excerpt: v.optional(v.string()),
    slug: v.string(),
    published: v.boolean(),
    authorId: v.string(),
    categoryIds: v.array(v.string()),
    tagIds: v.array(v.string()),
    image: v.string(),
  },
  handler: async (ctx, args) => {
    const author = await ctx.db
      .query("Users")
      .filter((q) => q.eq(q.field("userId"), args.authorId))
      .first();
    if (!author) {
      return;
    }
    const postId = await ctx.db.insert("blogPosts", {
      title: args.title,
      content: args.content,
      excerpt: args.excerpt,
      slug: args.slug,
      published: args.published,
      authorId: args.authorId,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      image: args.image,
      authorName: author.name || "",
    });

    for (const categoryId of args.categoryIds) {
      await ctx.db.insert("blogPostCategories", { postId, categoryId });
    }

    for (const tagId of args.tagIds) {
      await ctx.db.insert("blogPostTags", { postId, tagId });
    }

    return postId;
  },
});

export const updateBlogPost = mutation({
  args: {
    id: v.string(),
    title: v.optional(v.string()),
    content: v.optional(v.string()),
    excerpt: v.optional(v.string()),
    slug: v.optional(v.string()),
    published: v.optional(v.boolean()),
    categoryIds: v.optional(v.array(v.string())),
    tagIds: v.optional(v.array(v.string())),
  },
  handler: async (ctx, args) => {
    const { id, ...updateFields } = args;
    const post = await ctx.db
      .query("blogPosts")
      .filter((q) => q.eq(q.field("_id"), id))
      .first();
    if (!post) {
      return;
    }

    await ctx.db.patch(post._id, {
      ...updateFields,
      updatedAt: Date.now(),
    });

    // if (args.categoryIds) {
    //   await ctx.db
    //     .query("blogPostCategories")
    //     .filter((q) => q.eq(q.field("postId"), id))
    //     .delete();
    //   for (const categoryId of args.categoryIds) {
    //     await ctx.db.insert("blogPostCategories", { postId: id, categoryId });
    //   }
    // }

    // if (args.tagIds) {
    //   await ctx.db
    //     .query("blogPostTags")
    //     .filter((q) => q.eq(q.field("postId"), id))
    //     .delete();
    //   for (const tagId of args.tagIds) {
    //     await ctx.db.insert("blogPostTags", { postId: id, tagId });
    //   }
    // }

    return id;
  },
});

export const deleteBlogPost = mutation({
  args: { id: v.string() },
  handler: async (ctx, args) => {
    const blogPost = await ctx.db
      .query("blogPosts")
      .filter((q) => q.eq(q.field("_id"), args.id))
      .first();
    if (!blogPost) {
      return;
    }
    const categories = await ctx.db
      .query("blogPostCategories")
      .filter((q) => q.eq(q.field("postId"), args.id))
      .collect();
    for (const category of categories) {
      await ctx.db.delete(category._id);
    }
    const tags = await ctx.db
      .query("blogPostTags")
      .filter((q) => q.eq(q.field("postId"), args.id))
      .collect();
    for (const tag of tags) {
      await ctx.db.delete(tag._id);
    }
    const comments = await ctx.db
      .query("blogComments")
      .filter((q) => q.eq(q.field("postId"), args.id))
      .collect();
    for (const comment of comments) {
      await ctx.db.delete(comment._id);
    }
  },
});

export const createCategory = mutation({
  args: {
    name: v.string(),
    slug: v.string(),
    description: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("blogCategories", args);
  },
});

export const createTag = mutation({
  args: {
    name: v.string(),
    slug: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("blogTags", args);
  },
});

export const createComment = mutation({
  args: {
    content: v.string(),
    authorId: v.string(),
    postId: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("blogComments", {
      ...args,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
  },
});

// export const deleteComment = mutation({
//   args: { id: v.string() },
//   handler: async (ctx, args) => {
//     await ctx.db.delete(args.id);
//   },
// });
