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
import { Input } from '@/core/components/ui/input';
import { Textarea } from '@/core/components/ui/textarea';
import { toastWrapper } from '@/core/utils/toast-wrapper';
import { UpdateGradeOptions } from '@/features/evaluation/domain/entities/evaluation-types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, Save } from 'lucide-react';
import React from 'react';
import { useForm } from 'react-hook-form';

import useUpdateGrade from '../../application/adapters/services/useUpdateGrade';
import {
  StudentGradeTwentyPointsExtension,
  StudentGradeTwentyPointsSchemaExtension,
} from '../../application/adapters/utils/twenty-points-scale-case';
import { EvaluationCriteriaType } from '../../domain/entities/evaluation-schema';

interface TwentyPointsCriteriaFormProps {
  studentGrade: StudentGradeTwentyPointsExtension;
  evaluationBase: {
    criterias: EvaluationCriteriaType[];
  };
  evaluationId: string;
  classeId: string;
  studentName: string;
  refetch: () => void;
  setIsDialogOpen: (open: boolean) => void;
}

export function TwentyPointsCriteriaForm({
  studentGrade,
  evaluationBase,
  evaluationId,
  classeId,
  studentName,
  refetch,
  setIsDialogOpen,
}: TwentyPointsCriteriaFormProps) {
  const { isPending, mutate: updateGrade } = useUpdateGrade();

  const form = useForm<StudentGradeTwentyPointsExtension>({
    resolver: zodResolver(StudentGradeTwentyPointsSchemaExtension),
    defaultValues: studentGrade,
  });

  function onSubmit(data: StudentGradeTwentyPointsExtension) {
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

  return (
    <Card className="w-full max-w-2xl mx-auto px-1">
      <CardHeader>
        <CardTitle className="text-2xl text-center">
          Note de {studentName} (Échelle de 20 points)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 ">
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
                (c) => c.id === grade.criteriaId
              );
              const maxGrade = criteria?.weight ?? 1;
              return (
                <FormField
                  key={grade.criteriaId}
                  name={`grades.${index}.grade`}
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor={field.name}>
                        {criteria
                          ? `${criteria.name}: ${criteria.description}`
                          : `Critère: ${grade.criteriaId}`}
                      </FormLabel>
                      <FormDescription>
                        Note maximale: {maxGrade}
                      </FormDescription>
                      <FormControl>
                        <Input
                          type="number"
                          min={0}
                          max={maxGrade}
                          step={0.5}
                          placeholder={`Entrez la note pour ${
                            criteria ? criteria.name : grade.criteriaId
                          }`}
                          {...field}
                          onChange={(e) => {
                            let value = Number(e.target.value);
                            if (value > maxGrade) {
                              value = maxGrade;
                            }
                            field.onChange(value);
                          }}
                        />
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

export default TwentyPointsCriteriaForm;
