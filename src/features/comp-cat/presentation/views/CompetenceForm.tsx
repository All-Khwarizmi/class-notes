'use client';

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '@/core/components/ui/alert';
import { Button } from '@/core/components/ui/button';
import { Card, CardContent, CardFooter } from '@/core/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/core/components/ui/dialog';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/core/components/ui/form';
import { Input } from '@/core/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/core/components/ui/select';
import { Separator } from '@/core/components/ui/separator';
import { Textarea } from '@/core/components/ui/textarea';
import { toastWrapper } from '@/core/utils/toast-wrapper';
import { zodResolver } from '@hookform/resolvers/zod';
import { isRight } from 'fp-ts/lib/Either';
import { Check, Plus, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';

import useCreateCompetence from '../../application/usecases/services/useCreateCompetence';
import { useGetCategories } from '../../application/usecases/services/useGetCategories';
import { Competence, competenceSchema } from '../../domain/entities/schemas';
import CategoryForm from '../components/CategoryForm';

interface CompetenceFormProps {
  userId: string;
}

export default function CompetenceForm({ userId }: CompetenceFormProps) {
  const router = useRouter();
  const {
    data: eitherCategories,
    refetch,
    isLoading,
    isError,
  } = useGetCategories({ userId });
  // eslint-disable-next-line no-unused-vars
  const [category, setCategory] = useState<string>('');
  const [open, setOpen] = useState(false);
  const { mutate: createCompetence, isPending } = useCreateCompetence();

  const form = useForm<Competence>({
    resolver: zodResolver(competenceSchema),
    defaultValues: {
      name: '',
      description: '',
      category: '',
    },
  });

  const categories = useMemo(() => {
    if (!eitherCategories || !isRight(eitherCategories)) return [];
    return eitherCategories.right;
  }, [eitherCategories]);

  useEffect(() => {
    if (categories.length > 0) {
      setCategory(categories[0].name);
      form.setValue('category', categories[0].name);
    }
  }, [categories, form]);

  const onSubmit = (data: Competence) => {
    if (data.name === '' || data.description === '' || data.category === '') {
      return toastWrapper.error('Veuillez remplir tous les champs');
    }

    createCompetence(
      {
        category: data.category,
        createdBy: userId,
        description: data.description,
        name: data.name,
      },
      {
        onSuccess: () => {
          form.reset();
          toastWrapper.success('Compétence créée avec succès');
        },
      }
    );
  };

  const goToCompetences = () => router.push('/competences');

  if (isLoading) {
    return <div>Chargement des catégories...</div>;
  }

  if (isError) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Erreur</AlertTitle>
        <AlertDescription>
          Une erreur s&apos;est produite lors du chargement des catégories.
          Veuillez réessayer plus tard.
        </AlertDescription>
      </Alert>
    );
  }

  if (!eitherCategories || !isRight(eitherCategories)) return null;

  return (
    <div className="container mx-auto py-6 max-w-4xl">
      <div className="flex justify-between items-center mb-6">
        <Button
          variant="ghost"
          onClick={goToCompetences}
          className="flex items-center"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour aux compétences
        </Button>
        <h1 className="text-2xl font-bold">Créer une compétence</h1>
      </div>
      <Card>
        <CardContent className="pt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nom</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="ex: Algèbre linéaire" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="ex: L'algèbre linéaire est une branche des mathématiques qui traite des vecteurs, des matrices et des systèmes d'équations linéaires"
                        rows={3}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Catégorie</FormLabel>
                    <div className="flex items-center space-x-2">
                      <Select
                        value={field.value}
                        onValueChange={(value) => {
                          field.onChange(value);
                          setCategory(value);
                        }}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionner une catégorie" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectGroup>
                            {categories.map((category) => (
                              <SelectItem
                                key={category._id}
                                value={category.name}
                              >
                                {category.name}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      <Dialog open={open} onOpenChange={setOpen}>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="icon">
                            <Plus className="h-4 w-4" />
                            <span className="sr-only">
                              Ajouter une catégorie
                            </span>
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>
                              Ajouter une nouvelle catégorie
                            </DialogTitle>
                            <DialogDescription>
                              Créer une nouvelle catégorie pour les compétences
                              éducatives
                            </DialogDescription>
                          </DialogHeader>
                          <CategoryForm
                            userId={userId}
                            refetch={async () => {
                              await refetch();
                              setOpen(false);
                            }}
                          />
                        </DialogContent>
                      </Dialog>
                    </div>
                    <FormDescription>
                      Sélectionner la catégorie de la compétence
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </CardContent>
        <Separator className="my-4" />
        <CardFooter>
          <Button
            type="button"
            className="w-full"
            disabled={isPending}
            size="lg"
            onClick={() => onSubmit(form.getValues())}
          >
            {isPending ? (
              <>Création en cours...</>
            ) : (
              <>
                <Check className="mr-2 h-4 w-4" /> Créer la compétence
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
