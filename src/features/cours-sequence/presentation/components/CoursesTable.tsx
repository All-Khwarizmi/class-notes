"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Plus, Trash2, ChevronRight, Search } from "lucide-react";
import { Cours } from "../../domain/entities/cours-schemas";
import useDeleteCourse from "../../application/adapters/services/useDeleteCourse";
import { Button } from "@/core/components/ui/button";
import { Input } from "@/core/components/ui/input";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/core/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/core/components/ui/card";
import { ScrollArea } from "@/core/components/ui/scroll-area";
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
} from "@/core/components/ui/alert-dialog";

function CoursesTable({
  courses,
  userId,
  sequenceId,
}: {
  courses: Cours[];
  userId: string;
  sequenceId: string;
}) {
  const router = useRouter();
  const { mutate: deleteCourse } = useDeleteCourse();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCourses = courses.filter((course) =>
    course.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Cours de la séquence</CardTitle>
        <CardDescription>
          Gérez les cours associés à cette séquence
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-2 mb-4">
          <Search className="w-4 h-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Rechercher un cours..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
        </div>
        <ScrollArea className="h-[400px] rounded-md border">
          <Table>
            <TableCaption>Ajoutez des cours à votre séquence</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">Nom</TableHead>
                <TableHead className="w-[200px]">Description</TableHead>
                <TableHead className="w-[200px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCourses.map((course) => (
                <TableRow
                  key={course._id}
                  className="cursor-pointer hover:bg-muted/50 transition-colors"
                >
                  <TableCell className="w-[200px]">{course.name}</TableCell>
                  <TableCell className="w-[200px]">
                    {course.description}
                  </TableCell>
                  <TableCell className="w-[200px]">
                    <div className="flex items-center space-x-2">
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => e.stopPropagation()}
                            aria-label={`Supprimer le cours ${course.name}`}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Êtes-vous sûr de vouloir supprimer ce cours ?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              Cette action ne peut pas être annulée. Le cours
                              sera définitivement supprimé de la séquence.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Annuler</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() =>
                                deleteCourse({ coursId: course._id })
                              }
                            >
                              Supprimer
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => router.push(`/cours/${course._id}`)}
                        aria-label={`Voir les détails du cours ${course.name}`}
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
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
          <Link href={`/cours/add/${sequenceId}`}>
            <Plus className="mr-2 h-4 w-4" /> Ajouter un cours
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

export default CoursesTable;
