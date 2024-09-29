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
import { Button } from '@/core/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/core/components/ui/card';
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
import { toastWrapper } from '@/core/utils/toast-wrapper';
import SelectImageUrl from '@/features/cours-sequence/presentation/components/SelectImageUrl';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, Save, Trash2, UserCircle } from 'lucide-react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import useDeleteStudent from '../../application/adapters/services/useDeleteStudent';
import useUpdateStudent from '../../application/adapters/services/useUpdateStudent';
import { Student, StudentSchema } from '../../domain/entities/student-schema';

interface StudentUpdateFormProps {
  student: Student;
  classeId: string;
  refetch: () => void;
}

export default function StudentUpdateForm({
  student,
  classeId,
  refetch,
}: StudentUpdateFormProps) {
  const [localImageUrl, setLocalImageUrl] = useState<string>(
    student.imageUrl ?? '/images/mos-design-jzFbbG2WXv0-unsplash.jpg'
  );
  const { mutate: updateStudent, isPending: isUpdating } = useUpdateStudent();
  const { mutate: deleteStudent, isPending: isDeleting } = useDeleteStudent();

  const form = useForm<Pick<Student, 'name' | 'classId' | 'imageUrl'>>({
    resolver: zodResolver(StudentSchema),
    defaultValues: student,
  });

  async function onSubmit(
    values: Pick<Student, 'name' | 'classId' | 'imageUrl'>
  ) {
    const { name } = values;
    updateStudent(
      { name, id: student.id, imageUrl: localImageUrl },
      {
        onSuccess: () => {
          refetch();
          toastWrapper.success('Élève mis à jour');
        },
        onError: () => {
          toastWrapper.error(
            "Une erreur est survenue lors de la mise à jour de l'élève."
          );
        },
      }
    );
  }

  function handleDelete() {
    deleteStudent(
      { id: student.id },
      {
        onSuccess: () => {
          refetch();
          toastWrapper.success('Élève supprimé');
        },
        onError: () => {
          toastWrapper.error(
            "Une erreur est survenue lors de la suppression de l'élève."
          );
        },
      }
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <UserCircle className="h-6 w-6" />
          Mettre à jour les informations de l&apos;élève
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor={field.name}>Nom</FormLabel>
                  <FormControl>
                    <Input
                      data-testid="student-name-input"
                      placeholder="Nom de l'élève"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormItem>
              <FormLabel>Photo de profil</FormLabel>
              <FormControl>
                <SelectImageUrl
                  imageUrl={localImageUrl}
                  setImageUrl={setLocalImageUrl}
                />
              </FormControl>
              <FormDescription>
                Choisissez une image de profil pour l&apos;élève
              </FormDescription>
            </FormItem>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          type="submit"
          onClick={form.handleSubmit(onSubmit)}
          disabled={isUpdating}
        >
          {isUpdating ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Save className="mr-2 h-4 w-4" />
          )}
          Mettre à jour
        </Button>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" disabled={isDeleting}>
              {isDeleting ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Trash2 className="mr-2 h-4 w-4" />
              )}
              Supprimer
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Êtes-vous sûr de vouloir supprimer cet élève ?
              </AlertDialogTitle>
              <AlertDialogDescription>
                Cette action est irréversible. Toutes les données associées à
                cet élève seront définitivement supprimées.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Annuler</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete}>
                Confirmer la suppression
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
}
