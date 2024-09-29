'use client';

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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from '@/core/components/ui/form';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/core/components/ui/select';
import { Textarea } from '@/core/components/ui/textarea';
import { toastWrapper } from '@/core/utils/toast-wrapper';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, Save } from 'lucide-react';
import React from 'react';
import { useForm } from 'react-hook-form';

import useUpdateGrade from '../../application/adapters/services/useUpdateGrade';
import {
  CompetenceLevel,
  StudentGradeCompetenceExtension,
  StudentGradeCompetenceSchemaExtension,
} from '../../application/adapters/utils/competence-case';
import { EvaluationBaseType } from '../../domain/entities/evaluation-schema';
import { UpdateGradeOptions } from '../../domain/entities/evaluation-types';

interface CompetenceCriteriaFormProps {
  studentGrade: StudentGradeCompetenceExtension;
  evaluationBase: EvaluationBaseType;
  evaluationId: string;
  classeId: string;
  studentName: string;
  refetch: () => void;
  setIsDialogOpen: (open: boolean) => void;
}

export default function CompetenceCriteriaForm({
  studentGrade,
  evaluationBase,
  evaluationId,
  classeId,
  studentName,
  refetch,
  setIsDialogOpen,
}: CompetenceCriteriaFormProps) {
  const { isPending, mutate: updateGrade } = useUpdateGrade();

  const form = useForm<StudentGradeCompetenceExtension>({
    resolver: zodResolver(StudentGradeCompetenceSchemaExtension),
    defaultValues: studentGrade,
  });

  function onSubmit(data: StudentGradeCompetenceExtension) {
    const grade: UpdateGradeOptions = {
      ...data,
      studentId: studentGrade.studentId,
      evaluationId: evaluationId,
      grades: data.grades,
    };
    updateGrade(
      {
        options: grade,
        classeId: classeId,
      },
      {
        onSuccess: () => {
          refetch();
          setIsDialogOpen(false);
          toastWrapper.success('Note mise à jour');
        },
        onError: () => {
          toastWrapper.error(
            'Une erreur est survenue lors de la mise à jour de la note.'
          );
        },
      }
    );
  }

  function fromNumberToCompetenceGrade(value: string): CompetenceLevel {
    switch (value) {
      case '1':
        return 'To be acquired';
      case '2':
        return 'To be developed';
      case '3':
        return 'Proficiency';
      case '4':
        return 'Expertise';
      default:
        return 'To be acquired';
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-center">
          Évaluation des compétences de {studentName}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="feedback"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor={field.name}>Commentaire</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Commentaire pour l'étudiant"
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {studentGrade.grades.map((grade, index) => {
              const criteria = evaluationBase.criterias.find(
                (criteria) => criteria.id === grade.criteriaId
              );
              return (
                <FormField
                  key={grade.criteriaId}
                  control={form.control}
                  name={`grades.${index}.grade`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor={field.name}>
                        {criteria
                          ? `${criteria.name}: ${criteria.description}`
                          : `Critère: ${grade.criteriaId}`}
                      </FormLabel>
                      <FormDescription>
                        {criteria
                          ? `Poids: ${criteria.weight}`
                          : `Note: ${grade.grade}`}
                      </FormDescription>
                      <FormControl>
                        <Select
                          onValueChange={(value) => {
                            form.setValue(
                              `grades.${index}.grade`,
                              fromNumberToCompetenceGrade(value)
                            );
                            return value;
                          }}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Sélectionnez un niveau de compétence" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectItem value="1">
                                <SelectLabel>1 - À acquérir</SelectLabel>
                              </SelectItem>
                              <SelectItem value="2">
                                <SelectLabel>2 - À développer</SelectLabel>
                              </SelectItem>
                              <SelectItem value="3">
                                <SelectLabel>3 - Maîtrise</SelectLabel>
                              </SelectItem>
                              <SelectItem value="4">
                                <SelectLabel>4 - Expertise</SelectLabel>
                              </SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              );
            })}
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button
          type="submit"
          onClick={form.handleSubmit(onSubmit)}
          disabled={isPending}
        >
          {isPending ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Save className="mr-2 h-4 w-4" />
          )}
          Enregistrer
        </Button>
      </CardFooter>
    </Card>
  );
}
