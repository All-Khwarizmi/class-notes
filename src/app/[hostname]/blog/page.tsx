"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/core/components/ui/card";
import { Button } from "@/core/components/ui/button";
import { ScrollArea } from "@/core/components/ui/scroll-area";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/core/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/core/components/ui/dialog";
import { Share2, Calendar, User } from "lucide-react";
import Image from "next/image";

// Mock data for categories and blog posts
const categories = ["Tous", "Technologie", "Éducation", "Science", "Culture"];
const blogPosts = [
  {
    id: 1,
    title: "L'impact de l'IA sur l'éducation moderne",
    excerpt:
      "Découvrez comment l'intelligence artificielle transforme les méthodes d'enseignement et d'apprentissage...",
    category: "Technologie",
    author: "Marie Dupont",
    date: "2023-05-15",
    imageUrl: "/placeholder.svg?height=200&width=400",
  },
  {
    id: 2,
    title: "Les dernières découvertes en astrophysique",
    excerpt:
      "Une exploration fascinante des récentes avancées dans notre compréhension de l'univers...",
    category: "Science",
    author: "Jean Martin",
    date: "2023-05-10",
    imageUrl: "/placeholder.svg?height=200&width=400",
  },
  // Add more blog posts here
];

const BlogMainPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("Tous");

  const filteredPosts =
    selectedCategory === "Tous"
      ? blogPosts
      : blogPosts.filter((post) => post.category === selectedCategory);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8 ">Notre Blog</h1>

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

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {filteredPosts.map((post) => (
          <BlogPostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  imageUrl: string;
}

const BlogPostCard: React.FC<{ post: BlogPost }> = ({ post }) => {
  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <Image
          src={post.imageUrl}
          alt={post.title}
          width={400}
          height={200}
          className="rounded-t-lg object-cover w-full h-48"
        />
      </CardHeader>
      <CardContent className="flex-grow">
        <CardTitle className="mb-2">{post.title}</CardTitle>
        <p className="text-sm text-muted-foreground mb-4">{post.excerpt}</p>
        <div className="flex items-center text-sm text-muted-foreground">
          <User className="w-4 h-4 mr-1" />
          {post.author}
          <Calendar className="w-4 h-4 ml-4 mr-1" />
          {new Date(post.date).toLocaleDateString("fr-FR")}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Lire plus</Button>
        <SharePreviewDialog post={post} />
      </CardFooter>
    </Card>
  );
};

const SharePreviewDialog: React.FC<{ post: BlogPost }> = ({ post }) => {
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
            <Image
              src={post.imageUrl}
              alt={post.title}
              width={400}
              height={200}
              className="rounded-lg object-cover w-full h-48 mb-4"
            />
            <h3 className="font-bold mb-2">{post.title}</h3>
            <p className="text-sm text-muted-foreground mb-2">{post.excerpt}</p>
            <div className="flex items-center text-sm text-muted-foreground">
              <User className="w-4 h-4 mr-1" />
              {post.author}
              <Calendar className="w-4 h-4 ml-4 mr-1" />
              {new Date(post.date).toLocaleDateString("fr-FR")}
            </div>
          </div>
          <div className="mt-4 flex justify-between">
            <Button
              onClick={() =>
                navigator.clipboard.writeText(window.location.href)
              }
            >
              Copier le lien
            </Button>
            <Button>Partager sur Twitter</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BlogMainPage;
