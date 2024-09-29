'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/core/components/ui/accordion';
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '@/core/components/ui/alert';
import { Button } from '@/core/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/core/components/ui/card';
import { ScrollArea } from '@/core/components/ui/scroll-area';
import { useDeleteCompCat } from '@/features/complement/application/adapters/services/useDeleteCompCat';
import { isLeft } from 'fp-ts/lib/Either';
import { Plus, Trash, ChevronRight, FolderTree } from 'lucide-react';
import Link from 'next/link';
import React, { useMemo } from 'react';

import { useGetCompCat } from '../../application/adapters/services/useGetCompCat';
import { groupCompetencesByCategory } from '../../domain/entities/schemas';
import UpdateCompetenceForm from '../components/UpdateCompetenceForm';

export default function CompetencesTable({ userId }: { userId: string }) {
  const { data: compCat, isLoading, isError } = useGetCompCat({ userId });
  const { mutate: deleteCompCat } = useDeleteCompCat();

  const groupedCompetences = useMemo(() => {
    if (!compCat || isLeft(compCat)) return [];
    const competences = compCat.right.competences;
    return groupCompetencesByCategory(competences);
  }, [compCat]);

  if (isLoading) {
    return <div>Chargement des compétences...</div>;
  }

  if (isError) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Erreur</AlertTitle>
        <AlertDescription>
          Une erreur s&apos;est produite lors du chargement des compétences.
          Veuillez réessayer plus tard.
        </AlertDescription>
      </Alert>
    );
  }

  if (!compCat || isLeft(compCat) || groupedCompetences.length === 0) {
    return (
      <div className="container mx-auto py-6 text-center">
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center justify-center space-x-2">
              <FolderTree className="h-6 w-6" />
              <span>Aucune compétence trouvée</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Vous n&apos;avez pas encore ajouté de compétences ou de
              catégories. Commencez à organiser vos compétences dès maintenant !
            </p>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button asChild>
              <Link href="/competences/add">
                <Plus className="mr-2 h-4 w-4" /> Ajouter une compétence ou une
                catégorie
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Compétences</h1>
      <ScrollArea className="h-[calc(100vh-200px)] pr-4">
        <Accordion type="multiple" className="space-y-4">
          {groupedCompetences.map((group) => {
            const category = compCat.right.categories.find(
              (cat) => cat.name === group.category
            );
            return (
              <AccordionItem
                key={group.category}
                value={group.category}
                className="border rounded-lg overflow-hidden"
              >
                <AccordionTrigger className="px-4 py-2 hover:bg-muted">
                  <div className="flex items-center justify-between w-full">
                    <span className="text-xl font-semibold">
                      {group.category}
                    </span>
                    <ChevronRight className="h-4 w-4 transition-transform duration-200" />
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="p-4 space-y-4">
                    {category && (
                      <div className="flex items-center justify-between gap-4 pb-2 border-b">
                        <div>
                          <h3 className="font-semibold">
                            Détails de la catégorie
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {category.description}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <UpdateCompetenceForm
                            id={category._id}
                            name={category.name}
                            description={category.description}
                            entityName="Category"
                          />
                          <Button
                            variant="destructive"
                            size="icon"
                            onClick={() => {
                              if (
                                confirm(
                                  'Êtes-vous sûr de vouloir supprimer cette catégorie ?'
                                )
                              ) {
                                deleteCompCat({
                                  type: 'Category',
                                  id: category._id,
                                });
                              }
                            }}
                          >
                            <Trash className="h-4 w-4" />
                            <span className="sr-only">
                              Supprimer la catégorie
                            </span>
                          </Button>
                        </div>
                      </div>
                    )}
                    {group.competences.map((competence) => (
                      <Card key={competence._id}>
                        <CardHeader>
                          <CardTitle>{competence.name}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground">
                            {competence.description}
                          </p>
                        </CardContent>
                        <CardFooter className="flex justify-end gap-2">
                          <UpdateCompetenceForm
                            id={competence._id}
                            name={competence.name}
                            description={competence.description}
                            entityName="Competence"
                          />
                          <Button
                            variant="destructive"
                            size="icon"
                            onClick={() => {
                              if (
                                confirm(
                                  'Êtes-vous sûr de vouloir supprimer cette compétence ?'
                                )
                              ) {
                                deleteCompCat({
                                  type: 'Competences',
                                  id: competence._id,
                                });
                              }
                            }}
                          >
                            <Trash className="h-4 w-4" />
                            <span className="sr-only">
                              Supprimer la compétence
                            </span>
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </ScrollArea>
      <div className="flex justify-center mt-6">
        <Button asChild>
          <Link href="/competences/add">
            <Plus className="mr-2 h-4 w-4" /> Ajouter une compétence ou une
            catégorie
          </Link>
        </Button>
      </div>
    </div>
  );
}
