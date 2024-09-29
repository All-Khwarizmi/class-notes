'use client';

import { Button } from '@/core/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/core/components/ui/card';
import { Input } from '@/core/components/ui/input';
import { Label } from '@/core/components/ui/label';
import { ScrollArea } from '@/core/components/ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/core/components/ui/select';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/core/components/ui/tabs';
import { Textarea } from '@/core/components/ui/textarea';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import {
  Save,
  Send,
  ArrowLeft,
  ArrowRight,
  Image as ImageIcon,
} from 'lucide-react';
import React, { useState } from 'react';

interface BlogPost {
  title: string;
  content: string;
  excerpt: string;
  category: string;
  imageUrl: string;
  isDraft: boolean;
}

const categories = ['Technologie', 'Éducation', 'Science', 'Culture'];

const BlogEditor: React.FC = () => {
  const [activeTab, setActiveTab] = useState('write');
  const [post, setPost] = useState<BlogPost>({
    title: '',
    content: '',
    excerpt: '',
    category: '',
    imageUrl: '',
    isDraft: true,
  });
  const [isSaving, setIsSaving] = useState(false);

  const editor = useEditor({
    extensions: [StarterKit],
    content: '<p>Commencez à écrire votre article ici...</p>',
    onUpdate: ({ editor }) => {
      setPost((prev) => ({ ...prev, content: editor.getHTML() }));
    },
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setPost((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (value: string) => {
    setPost((prev) => ({ ...prev, category: value }));
  };

  const handleSave = async (isDraft: boolean) => {
    setIsSaving(true);
    setPost((prev) => ({ ...prev, isDraft }));

    try {
      // Simulated API call - replace with your actual API endpoint
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log('Saving post:', post);
      // Here you would typically send the post to your backend
      // await api.savePost(post)
      alert(
        isDraft
          ? 'Brouillon enregistré avec succès !'
          : 'Article publié avec succès !'
      );
    } catch (error) {
      console.error("Erreur lors de l'enregistrement de l'article:", error);
      alert("Échec de l'enregistrement de l'article. Veuillez réessayer.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto my-8">
      <CardHeader>
        <CardTitle>Créer un nouvel article</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="write">Écrire</TabsTrigger>
            <TabsTrigger value="metadata">Métadonnées</TabsTrigger>
            <TabsTrigger value="preview">Aperçu</TabsTrigger>
          </TabsList>
          <TabsContent value="write">
            <ScrollArea className="h-[70vh] border rounded-md p-4">
              <EditorContent editor={editor} />
            </ScrollArea>
          </TabsContent>
          <TabsContent value="metadata">
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Titre</Label>
                <Input
                  id="title"
                  name="title"
                  value={post.title}
                  onChange={handleInputChange}
                  placeholder="Entrez le titre de votre article"
                />
              </div>
              <div>
                <Label htmlFor="excerpt">Extrait</Label>
                <Textarea
                  id="excerpt"
                  name="excerpt"
                  value={post.excerpt}
                  onChange={handleInputChange}
                  placeholder="Entrez un bref résumé de votre article"
                />
              </div>
              <div>
                <Label htmlFor="category">Catégorie</Label>
                <Select
                  value={post.category}
                  onValueChange={handleCategoryChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez une catégorie" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="imageUrl">
                  URL de l&apos;image de couverture
                </Label>
                <Input
                  id="imageUrl"
                  name="imageUrl"
                  value={post.imageUrl}
                  onChange={handleInputChange}
                  placeholder="Entrez l'URL de l'image de couverture"
                />
              </div>
            </div>
          </TabsContent>
          <TabsContent value="preview">
            <Card>
              <CardHeader>
                <CardTitle>{post.title || "Titre de l'article"}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-muted relative mb-4">
                  {post.imageUrl ? (
                    <img
                      src={post.imageUrl}
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
                  {post.excerpt || "Extrait de l'article"}
                </p>
                <div
                  className="prose max-w-none"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between">
        {activeTab !== 'write' && (
          <Button
            variant="outline"
            onClick={() =>
              setActiveTab(activeTab === 'metadata' ? 'write' : 'metadata')
            }
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Précédent
          </Button>
        )}
        {activeTab !== 'preview' && (
          <Button
            onClick={() =>
              setActiveTab(activeTab === 'write' ? 'metadata' : 'preview')
            }
          >
            Suivant
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        )}
        {activeTab === 'preview' && (
          <>
            <Button
              variant="outline"
              onClick={() => handleSave(true)}
              disabled={isSaving}
            >
              <Save className="w-4 h-4 mr-2" />
              Enregistrer le brouillon
            </Button>
            <Button onClick={() => handleSave(false)} disabled={isSaving}>
              <Send className="w-4 h-4 mr-2" />
              Publier
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  );
};

export default BlogEditor;
