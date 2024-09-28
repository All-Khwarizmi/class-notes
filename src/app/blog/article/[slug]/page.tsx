import { Metadata } from "next";

import Balancer from "react-wrap-balancer";
import { getBlogPostBySlug } from "@/data-access/blog/blog-post";
import { isNone } from "fp-ts/lib/Option";
import { Article, Container, Section } from "@/core/components/common/Craft";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = await getBlogPostBySlug(params.slug);
  if (isNone(post)) {
    return {
      title: "Not Found",
      description: "Blog post not found",
    };
  }
  return {
    title: post.value.title,
    description: post.value.excerpt,
  };
}

export default async function Page({ params }: { params: { slug: string } }) {
  const post = await getBlogPostBySlug(params.slug);
  if (isNone(post)) {
    return <div>Not Found</div>;
  }
  const date = new Date(post.value.createdAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const category = [];

  return (
    <Section>
      <Container>
        <h1>
          <Balancer>
            <span dangerouslySetInnerHTML={{ __html: post.value.title }}></span>
          </Balancer>
        </h1>

        <div className="flex justify-between items-center gap-4 text-sm mb-4">
          <h5>
            Publié le {new Date(date).toLocaleDateString("fr-FR")} par{" "}
            {post.value.authorId && (
              <span>
                <a href={`/posts/?author=${post.value.authorId}`}>
                  {post.value.authorName}
                </a>{" "}
              </span>
            )}
          </h5>
          {/* <Link
            href={`/posts/?category=${category.id}`}
            className={cn(badgeVariants({ variant: "outline" }), "not-prose")}
          >
            {category.name}
          </Link> */}
        </div>
        <div className="h-96 my-12 md:h-[560px] overflow-hidden flex items-center justify-center border rounded-lg bg-accent/25">
          {/* eslint-disable-next-line */}
          <img
            className="w-full"
            src={post.value.image}
            alt={post.value.title}
          />
        </div>
        <Article dangerouslySetInnerHTML={{ __html: post.value.content }} />
      </Container>
    </Section>
  );
}
