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
import { toastWrapper } from '@/core/utils/toast-wrapper';
import { isLeft } from 'fp-ts/lib/Either';
import { Plus, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';

import useDeleteEvaluationBase from '../../application/adapters/services/useDeleteEvaluationBase';
import useGetEvaluationsBaseList from '../../application/adapters/services/useGetEvaluationsBaseList';
import useIsEvaluationAssigned from '../../application/adapters/services/useIsEvaluationAssigned';
import { EvaluationBaseType } from '../../domain/entities/evaluation-schema';
import EvaluationCard from '../components/EvaluationCard';

interface EvaluationTableViewProps {
  userId: string;
}

export default function EvaluationTableView({
  userId,
}: EvaluationTableViewProps) {
  const router = useRouter();
  const {
    data: evaluations,
    refetch,
    isLoading,
    isError,
  } = useGetEvaluationsBaseList({ userId });
  const { mutate: deleteEvaluationBase } = useDeleteEvaluationBase();
  const { mutate: checkIfEvalIsAssigned } = useIsEvaluationAssigned();

  const handleDelete = (evaluationId: string) => {
    checkIfEvalIsAssigned(
      { evaluationId },
      {
        onSuccess: (data) => {
          if (isLeft(data)) {
            toastWrapper.error(
              "Impossible de vérifier si l'évaluation peut être supprimée en toute sécurité. Veuillez réessayer plus tard."
            );
            return;
          }

          const confirmMessage = data.right
            ? 'Cette évaluation est assignée à au moins une classe. La supprimer effacera également toutes les notes associées. Êtes-vous sûr de vouloir continuer ?'
            : 'Êtes-vous sûr de vouloir supprimer cette évaluation ? Cette action est irréversible.';

          if (window.confirm(confirmMessage)) {
            deleteEvaluationBase(
              { evaluationId },
              {
                onSuccess: () => refetch(),
                onError: () =>
                  toastWrapper.error(
                    "Erreur lors de la suppression de l'évaluation. Veuillez réessayer."
                  ),
              }
            );
          }
        },
        onError: () =>
          toastWrapper.error(
            "Impossible de vérifier si l'évaluation peut être supprimée en toute sécurité. Veuillez réessayer plus tard."
          ),
      }
    );
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

  if (isError || !evaluations || isLeft(evaluations)) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Erreur</AlertTitle>
        <AlertDescription>
          Une erreur s&apos;est produite lors du chargement des évaluations.
          Veuillez réessayer plus tard.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Évaluations</h1>
      {evaluations.right.length > 0 ? (
        <div className="space-y-4">
          {evaluations.right.map((evaluation: EvaluationBaseType) => (
            <EvaluationCard
              key={evaluation.id}
              name={evaluation.name}
              description={evaluation.description ?? ''}
              isGraded={evaluation.isGraded}
              onView={() => router.push(`/evaluations/${evaluation.id}`)}
              deleteEvaluation={() => handleDelete(evaluation.id)}
            />
          ))}
        </div>
      ) : (
        <Card className="text-center p-8">
          <CardHeader>
            <CardTitle>Aucune évaluation trouvée</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Vous n&apos;avez pas encore créé d&apos;évaluation. Commencez par
              en ajouter une.
            </p>
          </CardContent>
        </Card>
      )}
      <div className="flex justify-center mt-8">
        <Button asChild>
          <Link href="/evaluations/add">
            <Plus className="mr-2 h-4 w-4" />
            Ajouter une évaluation
          </Link>
        </Button>
      </div>
    </div>
  );
}
