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
import { Input } from '@/core/components/ui/input';
import { ScrollArea } from '@/core/components/ui/scroll-area';
import useDeleteSequence from '@/features/complement/application/adapters/services/useDeleteSequence';
import { isRight } from 'fp-ts/lib/Either';
import { Plus, Loader2, BookOpen, Search } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

import useGetAllSequences from '../../application/adapters/services/useGetAllSequences';
import CoursSequenceCard from '../components/CoursSequenceCard';

interface SequencesListViewProps {
  spacesMode?: boolean;
  userId: string;
  sequenceType: 'template' | 'sequence';
  sequenceId?: string;
}

export default function SequencesListView({
  spacesMode = false,
  userId,
  sequenceType,
  sequenceId,
}: SequencesListViewProps) {
  const { data: sequences, isLoading, isError } = useGetAllSequences(userId);
  const { mutate: deleteSequence } = useDeleteSequence();
  const [searchTerm, setSearchTerm] = React.useState('');

  const filteredSequences = React.useMemo(() => {
    if (!sequences || !isRight(sequences)) return [];
    return sequences.right.filter((sequence) =>
      sequence.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [sequences, searchTerm]);

  const handleDeleteSequence = (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette séquence ?')) {
      deleteSequence({
        sequenceId: id,
        userId,
        type: sequenceType,
      });
    }
  };

  if (isLoading) {
    return (
      <Card className="w-full h-[50vh] flex items-center justify-center">
        <CardContent>
          <Loader2 className="h-8 w-8 animate-spin" />
        </CardContent>
      </Card>
    );
  }

  if (isError || !sequences || !isRight(sequences)) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Erreur</AlertTitle>
        <AlertDescription>
          Une erreur s&apos;est produite lors du chargement des séquences.
          Veuillez réessayer plus tard.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Séquences</h1>
        <Button
          className="dark:text-gray-400 hover:bg-transparent  bg-gray-800 dark:bg-gray-800 text-black bg-transparent"
          asChild
        >
          <Link
            href={
              sequenceType === 'sequence'
                ? `/classes/sequences/${sequenceId}`
                : '/sequences/add'
            }
          >
            <Plus className="mr-2 h-4 w-4" />
            {sequenceType === 'sequence'
              ? 'Ajouter une séquence'
              : 'Ajouter un modèle'}
          </Link>
        </Button>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Rechercher une séquence..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {filteredSequences.length === 0 ? (
        <Card>
          <CardHeader>
            <CardTitle className="text-center">
              Aucune séquence trouvée
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center text-center p-4">
              <BookOpen className="h-16 w-16 text-gray-400 mb-4" />
              <p className="text-lg text-gray-600 mb-4">
                {searchTerm
                  ? 'Aucune séquence ne correspond à votre recherche.'
                  : "Vous n'avez pas encore créé de séquence."}
              </p>
              <Button asChild>
                <Link
                  href={
                    sequenceType === 'sequence'
                      ? `/classes/sequences/${sequenceId}`
                      : '/sequences/add'
                  }
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Créer votre première séquence
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <ScrollArea className="h-[calc(100vh-200px)]">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredSequences.map((sequence) => (
              <CoursSequenceCard
                key={sequence._id}
                title={sequence.name}
                description={sequence.description}
                imageUrl={sequence.imageUrl}
                tags={sequence.category}
                showViewButton={true}
                pathToView={`/sequences/${sequence._id}?type=${sequenceType}`}
                path={`/sequences/edit/${sequence._id}`}
                spacesMode={spacesMode}
                deleteOption={true}
                deleteSequence={() => handleDeleteSequence(sequence._id)}
              />
            ))}
          </div>
        </ScrollArea>
      )}
    </div>
  );
}
