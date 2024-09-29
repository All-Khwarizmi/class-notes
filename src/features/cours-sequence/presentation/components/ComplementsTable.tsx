'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/core/components/ui/alert-dialog';
import { Badge } from '@/core/components/ui/badge';
import { Button } from '@/core/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/core/components/ui/card';
import { Input } from '@/core/components/ui/input';
import { ScrollArea } from '@/core/components/ui/scroll-area';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/core/components/ui/table';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/core/components/ui/tooltip';
import useDeleteComplement from '@/features/complement/application/adapters/services/useDeleteComplement';
import { Complement } from '@/features/complement/domain/complement-schemas';
import { Plus, Trash2, ChevronRight, Search } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

function ComplementsTable({
  complements,
  coursId,
  userId,
}: {
  complements: Complement[];
  coursId: string;
  userId: string;
}) {
  const router = useRouter();
  const { mutate: deleteComplement, isPending: isDeleting } =
    useDeleteComplement();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredComplements = complements.filter((complement) =>
    complement.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Ressources du cours</CardTitle>
        <CardDescription>
          Gérez les ressources associées à ce cours
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-2 mb-4">
          <Search className="w-4 h-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Rechercher une ressource..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
        </div>
        <ScrollArea className="h-[400px] rounded-md border">
          <Table>
            <TableCaption>Ajoutez des ressources à votre cours</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">Nom</TableHead>
                <TableHead className="w-[200px]">Description</TableHead>
                <TableHead className="w-[100px]">Type</TableHead>
                <TableHead className="w-[100px]">Publié</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredComplements.map((complement) => (
                <TableRow
                  key={complement.id}
                  className="cursor-pointer hover:bg-muted/50 transition-colors"
                >
                  <TableCell className="w-[200px]">{complement.name}</TableCell>
                  <TableCell className="w-[200px]">
                    {complement.description}
                  </TableCell>
                  <TableCell className="w-[100px]">
                    <Badge variant="outline">{complement.type}</Badge>
                  </TableCell>
                  <TableCell className="w-[100px]">
                    <Badge>{complement.contentType}</Badge>
                  </TableCell>
                  <TableCell className="w-[100px]">
                    <div className="flex items-center space-x-2">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                router.push(`/complements/${complement.id}`);
                              }}
                              aria-label={`Voir les détails de la ressource ${complement.name}`}
                            >
                              <ChevronRight className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Voir les détails</TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => e.stopPropagation()}
                            aria-label={`Supprimer la ressource ${complement.name}`}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Êtes-vous sûr de vouloir supprimer cette ressource
                              ?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              Cette action ne peut pas être annulée. La
                              ressource sera définitivement supprimée du cours.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Annuler</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() =>
                                deleteComplement({ id: complement.id })
                              }
                              disabled={isDeleting}
                            >
                              {isDeleting ? 'Suppression...' : 'Supprimer'}
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button asChild>
          <Link href={`/complements/add/${coursId}`}>
            <Plus className="mr-2 h-4 w-4" /> Ajouter une ressource
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

export default ComplementsTable;
