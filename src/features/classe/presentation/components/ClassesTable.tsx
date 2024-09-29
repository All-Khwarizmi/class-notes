'use client';

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '@/core/components/ui/alert';
import { Button } from '@/core/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/core/components/ui/card';
import { BASE_IMAGE_URL } from '@/core/constants/image';
import CoursSequenceCard from '@/features/cours-sequence/presentation/components/CoursSequenceCard';
import { Plus, Loader2 } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

import { useClassesTableLogic } from '../services/hooks/useClassesTableLogic';

interface ClassesTableProps {
  userId: string;
}

export default function ClassesTable({ userId }: ClassesTableProps) {
  const { classes, isLoading, isError, error, handleDelete } =
    useClassesTableLogic({ userId });

  if (isLoading) {
    return (
      <Card className="w-full h-[50vh] flex items-center justify-center">
        <CardContent>
          <Loader2 className="h-8 w-8 animate-spin" />
        </CardContent>
      </Card>
    );
  }

  if (isError) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Erreur</AlertTitle>
        <AlertDescription>
          Une erreur s&apos;est produite lors du chargement des classes.{' '}
          {error?.message}
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Mes Classes</h1>
      {classes && classes.right.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {classes.right.map((classe) => (
            <CoursSequenceCard
              key={classe.id}
              deleteOption={true}
              deleteSequence={() => {
                if (
                  window.confirm(
                    'Êtes-vous sûr de vouloir supprimer cette classe ?'
                  )
                ) {
                  handleDelete(classe.id);
                }
              }}
              title={classe.name}
              description={classe.description ?? ''}
              imageUrl={classe.imageUrl ?? BASE_IMAGE_URL}
              tags={classe.educationLevel}
              showViewButton={true}
              pathToView={`/classes/class/${classe.id}`}
              path={`/classes/edit/${classe.id}`}
              spacesMode={true}
            />
          ))}
        </div>
      ) : (
        <Card className="text-center p-8">
          <CardHeader>
            <CardTitle>Aucune classe trouvée</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Vous n&apos;avez pas encore ajouté de classe. Commencez par en
              ajouter une.
            </p>
          </CardContent>
        </Card>
      )}
      <div className="flex justify-center mt-8">
        <Button asChild>
          <Link href="/classes/add" data-testid="add-class">
            <Plus className="mr-2 h-4 w-4" />
            Ajouter une classe
          </Link>
        </Button>
      </div>
    </div>
  );
}
