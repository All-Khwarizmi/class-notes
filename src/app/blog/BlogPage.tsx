'use client';

import { Button } from '@/core/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/core/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/core/components/ui/dialog';
import { Tabs, TabsList, TabsTrigger } from '@/core/components/ui/tabs';
import { Share2, Calendar, User, FileX } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';

export type BlogPostDto = {
  id: string;
  title: string;
  content: string;
  excerpt?: string;
  slug: string;
  published: boolean;
  authorId: string;
  authorName: string;
  createdAt: number;
  updatedAt: number;
  image: string;
};

interface BlogMainPageProps {
  posts: BlogPostDto[];
}

const categories = ['Tous', 'Technologie', 'Éducation', 'Science', 'Culture'];

const BlogMainPage: React.FC<BlogMainPageProps> = ({ posts }) => {
  const [selectedCategory, setSelectedCategory] = useState('Tous');

  const filteredPosts = posts;
  // selectedCategory === "Tous"
  //   ? posts
  //   : posts.filter((post) => post.category === selectedCategory);

  return (
    <div className="container mx-auto py-8">
      <Tabs defaultValue="Tous" className="w-full mb-8">
        <TabsList className="w-full justify-start overflow-x-auto">
          {categories.map((category) => (
            <TabsTrigger
              key={category}
              value={category}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {posts.length === 0 ? (
        <NoPosts />
      ) : filteredPosts.length === 0 ? (
        <NoPostsInCategory category={selectedCategory} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <BlogPostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
};

export const NoPosts: React.FC = () => (
  <Card className="w-full p-6 text-center">
    <CardContent className="flex flex-col items-center">
      <FileX className="w-12 h-12 text-muted-foreground mb-4" />
      <h2 className="text-xl font-semibold mb-2">Aucun article disponible</h2>
      <p className="text-muted-foreground">
        Il n&apos;y a pas encore d&apos;articles publiés sur ce blog.
      </p>
    </CardContent>
  </Card>
);

const NoPostsInCategory: React.FC<{ category: string }> = ({ category }) => (
  <Card className="w-full p-6 text-center">
    <CardContent className="flex flex-col items-center">
      <FileX className="w-12 h-12 text-muted-foreground mb-4" />
      <h2 className="text-xl font-semibold mb-2">
        Aucun article dans cette catégorie
      </h2>
      <p className="text-muted-foreground">
        Il n&apos;y a pas encore d&apos;articles publiés dans la catégorie
        &quot;{category}&quot;.
      </p>
    </CardContent>
  </Card>
);

const BlogPostCard: React.FC<{ post: BlogPostDto }> = ({ post }) => {
  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <img
          src={post.image || '/placeholder.svg?height=200&width=400'}
          alt={post.title}
          width={400}
          height={200}
          className="rounded-t-lg object-cover w-full h-48"
        />
      </CardHeader>
      <CardContent className="flex-grow">
        <CardTitle className="mb-2">{post.title}</CardTitle>
        <p className="text-sm text-muted-foreground mb-4">
          {post.excerpt || 'Aucun extrait disponible'}
        </p>
        <div className="flex items-center  truncate text-sm text-muted-foreground">
          <User className="w-4 h-4 mr-1" />
          {post.authorName}
          <Calendar className="w-4 h-4 ml-4 mr-1" />
          {new Date(post.createdAt).toLocaleDateString('fr-FR')}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Link href={`/blog/article/${post.slug}`}>Lire plus</Link>
        <SharePreviewDialog post={post} />
      </CardFooter>
    </Card>
  );
};

const SharePreviewDialog: React.FC<{ post: BlogPostDto }> = ({ post }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Share2 className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Partager l&apos;article</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <div className="bg-muted p-4 rounded-lg">
            <img
              src={post.image || '/placeholder.svg?height=200&width=400'}
              alt={post.title}
              width={400}
              height={200}
              className="rounded-lg object-cover w-full h-48 mb-4"
            />
            <h3 className="font-bold mb-2">{post.title}</h3>
            <p className="text-sm text-muted-foreground mb-2">
              {post.excerpt || 'Aucun extrait disponible'}
            </p>
            <div className="flex items-center text-sm text-muted-foreground">
              <User className="w-4 h-4 mr-1" />
              {post.authorName}
              <Calendar className="w-4 h-4 ml-4 mr-1" />
              {new Date(post.createdAt).toLocaleDateString('fr-FR')}
            </div>
          </div>
          <div className="mt-4 flex justify-between">
            <Button
              onClick={() =>
                navigator.clipboard.writeText(
                  `${window.location.origin}/blog/article/${post.slug}`
                )
              }
            >
              Copier le lien
            </Button>
            <Button
              onClick={() => {
                window.open(
                  `https://twitter.com/share?url=${window.location.href}/blog/article/${post.slug}`,
                  '_blank'
                );
              }}
            >
              Partager sur Twitter
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BlogMainPage;
