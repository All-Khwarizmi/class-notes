"use client";

import React, { useState, useRef, useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/core/components/ui/card";
import { Input } from "@/core/components/ui/input";
import { Button } from "@/core/components/ui/button";
import { Label } from "@/core/components/ui/label";
import { ScrollArea } from "@/core/components/ui/scroll-area";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/core/components/ui/tabs";
import { Textarea } from "@/core/components/ui/textarea";
import {
  Save,
  Send,
  ArrowLeft,
  ArrowRight,
  Image as ImageIcon,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createBlogPostAction } from "@/data-access/blog/create-blog-post";
import { blogPostSchema } from "@/data-access/blog/blog-schema";
import {
  createBlogPostSchema,
  CreatedBlogPostDto,
} from "@/data-access/blog/blog-post-dto";
import { BlogPostDto } from "../BlogPage";
import { getCurrentUser } from "@/data-access/user/get-current-user";

const initialState: Omit<
  CreatedBlogPostDto,
  "createdAt" | "updatedAt" | "categoryIds" | "tagIds"
> = {
  title: "",
  slug: "",
  content: "",
  excerpt: "",
  published: false,
  authorId: "",
  image: "",
};
type BlogEditorProps = {
  userId: string;
};
const BlogEditor: React.FC<BlogEditorProps> = ({ userId }) => {
  const [activeTab, setActiveTab] = useState("write");
  const formRef = useRef<HTMLFormElement>(null);
  const {
    register,
    setValue,
    watch,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<BlogPostDto>({
    resolver: zodResolver(blogPostSchema),
    defaultValues: initialState,
  });

  const editor = useEditor({
    extensions: [StarterKit],
    content: "<p>Commencez à écrire votre article ici...</p>",
    onUpdate: ({ editor }) => {
      setValue("content", editor.getHTML(), { shouldValidate: true });
    },
  });
  async function handleAddDraft() {
    const formData = new FormData(formRef.current as HTMLFormElement);
    const values = watch();
    const newValues: CreatedBlogPostDto = {
      ...values,
      content: editor?.getHTML() || "",
      authorId: userId,
      excerpt: values.excerpt || "",
      tagIds: [],
      categoryIds: [],
      published: false,
    };
    console.log("newValues", newValues);
    // Validate the form data
    const validatedData = createBlogPostSchema.safeParse(newValues);
    if (!validatedData.success) {
      console.error("Validation failed:", validatedData.error.errors);
      return;
    }
    const result = await createBlogPostAction(validatedData.data);
    if (result.message) {
    }
  }

  const onSubmit = async () => {
    const formData = new FormData(formRef.current as HTMLFormElement);
    const values = watch();
    const newValues: CreatedBlogPostDto = {
      ...values,
      content: editor?.getHTML() || "",
      authorId: userId,

      excerpt: values.excerpt || "",
      tagIds: [],
      categoryIds: [],
      published: true,
    };
    console.log("newValues", newValues);
    // Validate the form data
    const validatedData = createBlogPostSchema.safeParse(newValues);
    if (!validatedData.success) {
      console.error("Validation failed:", validatedData.error.errors);
      return;
    }
    const result = await createBlogPostAction(validatedData.data);
    if (result.message) {
      console.log("result", result);
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto my-8">
      <CardHeader>
        <CardTitle>Créer un nouvel article</CardTitle>
      </CardHeader>
      <CardContent>
        <form ref={formRef}>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="write">Écrire</TabsTrigger>
              <TabsTrigger value="metadata">Métadonnées</TabsTrigger>
              <TabsTrigger value="preview">Aperçu</TabsTrigger>
            </TabsList>
            <TabsContent value="write">
              <ScrollArea className="h-[70vh] border rounded-md p-4">
                <EditorContent className="h-[60vh]" editor={editor} />
              </ScrollArea>
            </TabsContent>
            <TabsContent value="metadata">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Titre</Label>
                  <Input
                    id="title"
                    {...register("title")}
                    placeholder="Entrez le titre de votre article"
                  />
                  {errors.title && (
                    <p className="text-red-500">{errors.title.message}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="excerpt">Extrait</Label>
                  <Textarea
                    id="excerpt"
                    {...register("excerpt")}
                    placeholder="Entrez un bref résumé de votre article"
                  />
                  {errors.excerpt && (
                    <p className="text-red-500">{errors.excerpt.message}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="slug">Slug</Label>
                  <Input
                    id="slug"
                    {...register("slug")}
                    placeholder="Entrez le slug de votre article"
                  />
                  {errors.slug && (
                    <p className="text-red-500">{errors.slug.message}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="image">
                    URL de l&apos;image de couverture
                  </Label>
                  <Input
                    id="image"
                    {...register("image")}
                    placeholder="Entrez l'URL de l'image de couverture"
                  />
                  {errors.image && (
                    <p className="text-red-500">{errors.image.message}</p>
                  )}
                </div>
              </div>
            </TabsContent>
            <TabsContent value="preview">
              <Card>
                <CardHeader>
                  <CardTitle>
                    {watch("title") || "Titre de l'article"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video bg-muted relative mb-4">
                    {watch("image") ? (
                      <img
                        src={watch("image")}
                        alt="Image de couverture"
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <div className="flex items-center justify-center w-full h-full">
                        <ImageIcon className="w-12 h-12 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                  <p className="text-muted-foreground mb-4">
                    {watch("excerpt") || "Extrait de l'article"}
                  </p>
                  <div
                    className="prose max-w-none"
                    dangerouslySetInnerHTML={{ __html: watch("content") }}
                  />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          <CardFooter className="flex justify-between mt-4">
            {activeTab !== "write" && (
              <Button
                type="button"
                variant="outline"
                onClick={() =>
                  setActiveTab(activeTab === "metadata" ? "write" : "metadata")
                }
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Précédent
              </Button>
            )}
            {activeTab !== "preview" && (
              <Button
                type="button"
                onClick={() =>
                  setActiveTab(activeTab === "write" ? "metadata" : "preview")
                }
              >
                Suivant
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            )}
            {activeTab === "preview" && (
              <>
                <Button
                  type="submit"
                  variant="outline"
                  onClick={handleAddDraft}
                  disabled={isSubmitting}
                >
                  <Save className="w-4 h-4 mr-2" />
                  Enregistrer le brouillon
                </Button>
                <Button
                  type="button"
                  onClick={onSubmit}
                  disabled={isSubmitting}
                >
                  <Send className="w-4 h-4 mr-2" />
                  Publier
                </Button>
              </>
            )}
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
};

export default BlogEditor;
