'use client';

import { Button } from '@/core/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/core/components/ui/card';
import { Input } from '@/core/components/ui/input';
import { ScrollArea } from '@/core/components/ui/scroll-area';
import { Skeleton } from '@/core/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/core/components/ui/table';
import { cn } from '@/lib/utils';
import { isRight } from 'fp-ts/lib/Either';
import { Plus, Trash2, ChevronRight, Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';

import { useClasseSequencesLogic } from '../hooks/useClasseSequencesLogic';

function ClasseSequencesTableView({
  classeId,
  userId,
}: {
  classeId: string;
  userId: string;
}) {
  const router = useRouter();
  const {
    loading,
    handleDelete,
    addClasseSequence,
    baseSequences: sequences,
    classeSequences,
  } = useClasseSequencesLogic({
    classeId,
    userId,
  });

  const [searchTerm, setSearchTerm] = React.useState('');

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Séquences de la classe</CardTitle>
          <CardDescription>Chargement des séquences...</CardDescription>
        </CardHeader>
        <CardContent>
          <Skeleton className="w-full h-[300px]" />
        </CardContent>
      </Card>
    );
  }

  if (
    !sequences ||
    !isRight(sequences) ||
    !classeSequences ||
    !isRight(classeSequences)
  ) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Séquences de la classe</CardTitle>
          <CardDescription>Impossible de charger les séquences</CardDescription>
        </CardHeader>
        <CardContent>
          <p>
            Une erreur s&apos;est produite lors du chargement des séquences.
            Veuillez réessayer plus tard.
          </p>
        </CardContent>
      </Card>
    );
  }

  const filteredSequences = sequences.right.filter((sequence) =>
    sequence.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Séquences de la classe</CardTitle>
        <CardDescription>
          Gérez les séquences associées à cette classe
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-2 mb-4">
          <Search className="w-4 h-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Rechercher une séquence..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
        </div>
        <ScrollArea className="h-[400px] rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">Nom</TableHead>
                <TableHead className="w-[200px]">Nombre de cours</TableHead>
                <TableHead className="w-[200px]">
                  Dernière modification
                </TableHead>
                <TableHead className="w-[200px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSequences.map((sequence) => {
                const classeSequence = classeSequences.right.find(
                  (classeSequence) =>
                    classeSequence.originalSequenceId === sequence._id
                );
                return (
                  <TableRow
                    key={sequence._id}
                    className="cursor-pointer hover:bg-muted/50 transition-colors"
                  >
                    <TableCell className="w-[200px]">{sequence.name}</TableCell>
                    <TableCell className="w-[200px]">
                      {sequence.coursIds.length}
                    </TableCell>
                    <TableCell className="w-[200px]">
                      {new Date(sequence.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="w-[200px]">
                      <div className={cn('flex items-center gap-4')}>
                        {classeSequence ? (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(classeSequence._id);
                            }}
                            aria-label={`Supprimer la séquence ${sequence.name}`}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        ) : (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              addClasseSequence({
                                classeId,
                                sequenceId: sequence._id,
                                userId,
                              });
                            }}
                            aria-label={`Ajouter la séquence ${sequence.name}`}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            if (classeSequence) {
                              router.push(
                                `/sequences/${classeSequence._id}?type=sequence`
                              );
                            }
                          }}
                          aria-label={`Voir les détails de la séquence ${sequence.name}`}
                        >
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}

export default ClasseSequencesTableView;
