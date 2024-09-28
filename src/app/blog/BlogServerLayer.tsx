import { getBlogPosts } from "@/data-access/blog/blog-post";
import { isNone } from "fp-ts/lib/Option";
import React from "react";
import BlogMainPage, { NoPosts } from "./BlogPage";

async function BlogServerLayer() {
  console.log("BlogServerLayer");
  const posts = await getBlogPosts();
  if (isNone(posts)) {
    return <NoPosts />;
  }

  return <BlogMainPage posts={posts.value.blogPosts} />;
}

export default BlogServerLayer;
