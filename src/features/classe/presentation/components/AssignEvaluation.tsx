"use client";

import React, { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/core/components/ui/select";
import { Button } from "@/core/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/core/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/core/components/ui/alert";
import { Loader2, PlusCircle, Trash2 } from "lucide-react";
import { ScrollArea } from "@/core/components/ui/scroll-area";
import { EvaluationBaseType } from "@/features/evaluation/domain/entities/evaluation-schema";
import { CompoundEvaluationType } from "../../domain/class-schema";
import useGetEvaluationsBaseList from "@/features/evaluation/application/adapters/services/useGetEvaluationsBaseList";
import useAssignEvaluation from "@/features/evaluation/application/adapters/services/useAssignEvaluation";
import useDeleteEvaluationWithGrades from "@/features/evaluation/application/adapters/services/useDeleteEvaluationWithGrades";
import useGetStudentTableData from "@/features/evaluation/application/adapters/services/useGetStudentTableData";
import { isRight } from "fp-ts/lib/Either";
import { toast } from "sonner";

interface AssignEvaluationProps {
  userId: string;
  classeId: string;
}

export default function AssignEvaluation({
  userId,
  classeId,
}: AssignEvaluationProps) {
  const [selectedEvaluation, setSelectedEvaluation] =
    useState<EvaluationBaseType | null>(null);
  const [evaluationsList, setEvaluationsList] = useState<
    CompoundEvaluationType[] | null
  >(null);

  const {
    data: eitherEvaluations,
    isPending: isEvaluationsLoading,
    refetch: refetchAlreadyAssignedEvaluations,
  } = useGetEvaluationsBaseList({ userId });

  const {
    tableData,
    isLoading: isTableDataLoading,
    refetchCompoundEvaluations,
  } = useGetStudentTableData({ classeId });

  const { mutate: assignEvaluation, isPending: isAssignPending } =
    useAssignEvaluation();
  const { mutate: deleteEvaluationWithGrades, isPending: isDeletePending } =
    useDeleteEvaluationWithGrades();

  useEffect(() => {
    if (tableData?.evaluations) {
      setEvaluationsList(tableData.evaluations);
    }
  }, [tableData?.evaluations]);

  useEffect(() => {
    refetchCompoundEvaluations();
    refetchAlreadyAssignedEvaluations();
  }, [refetchCompoundEvaluations, refetchAlreadyAssignedEvaluations]);

  const handleSubmit = () => {
    if (selectedEvaluation) {
      assignEvaluation(
        {
          options: {
            evaluationId: selectedEvaluation.id,
            classeId,
          },
          refetchCompoundEvaluations,
        },
        {
          onSuccess: () => {
            toast.success(
              `L'évaluation "${selectedEvaluation.name}" a été assignée avec succès.`
            );
            setSelectedEvaluation(null);
          },
          onError: () => {
            toast.error(
              "Impossible d'assigner l'évaluation. Veuillez réessayer."
            );
          },
        }
      );
    } else {
      toast.error("Sélection requise", {
        description: "Veuillez sélectionner une évaluation à assigner.",
      });
    }
  };

  const handleChange = (value: string) => {
    const evaluation =
      eitherEvaluations &&
      isRight(eitherEvaluations) &&
      eitherEvaluations.right.find((evaluation) => evaluation.id === value);
    if (evaluation) {
      setSelectedEvaluation(evaluation);
    }
  };

  const handleDelete = (evaluationId: string, evaluationName: string) => {
    deleteEvaluationWithGrades(
      {
        options: { evaluationId },
        refetchCompoundEvaluations,
        refetchAlreadyAssignedEvaluations,
        classeId,
      },
      {
        onSuccess: () => {
          toast.success(
            `L'évaluation "${evaluationName}" a été supprimée avec succès.`
          );
        },
        onError: () => {
          toast.error(
            "Impossible de supprimer l'évaluation. Veuillez réessayer."
          );
        },
      }
    );
  };

  if (isEvaluationsLoading || isTableDataLoading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center h-40">
          <Loader2 className="h-8 w-8 animate-spin" />
        </CardContent>
      </Card>
    );
  }

  if (
    !eitherEvaluations ||
    !isRight(eitherEvaluations) ||
    !evaluationsList ||
    !tableData
  ) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Erreur</AlertTitle>
        <AlertDescription>
          Impossible de charger les données des évaluations. Veuillez réessayer
          plus tard.
        </AlertDescription>
      </Alert>
    );
  }

  const evaluations = eitherEvaluations.right;
  const assignedEvaluationIds = tableData.evaluations.map(
    (evaluation) => evaluation.grade.evaluationBaseId
  );
  const availableEvaluations = evaluations.filter(
    (evaluation) => !assignedEvaluationIds.includes(evaluation.id)
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gestion des évaluations</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-4 items-end">
            <div className="flex-grow">
              <Select
                onValueChange={handleChange}
                value={selectedEvaluation?.id}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner une évaluation" />
                </SelectTrigger>
                <SelectContent>
                  {availableEvaluations.map((evaluation) => (
                    <SelectItem key={evaluation.id} value={evaluation.id}>
                      {evaluation.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button
              onClick={handleSubmit}
              disabled={isAssignPending || !selectedEvaluation}
            >
              {isAssignPending ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <PlusCircle className="mr-2 h-4 w-4" />
              )}
              Assigner
            </Button>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">
              Évaluations assignées
            </h3>
            <ScrollArea className="h-[200px] rounded-md border">
              <div className="p-4 space-y-2">
                {evaluationsList.length > 0 ? (
                  evaluationsList.map((compoundEval) => {
                    const evalBase = evaluationsList.find(
                      (innerEval) =>
                        innerEval.base.id ===
                        compoundEval.grade.evaluationBaseId
                    );
                    if (evalBase) {
                      return (
                        <div
                          key={compoundEval.grade.id}
                          className="flex items-center justify-between py-2"
                        >
                          <span>{evalBase.base.name}</span>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() =>
                              handleDelete(
                                compoundEval.grade.id,
                                evalBase.base.name
                              )
                            }
                            disabled={isDeletePending}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Supprimer
                          </Button>
                        </div>
                      );
                    }
                    return null;
                  })
                ) : (
                  <p className="text-muted-foreground">
                    Aucune évaluation assignée
                  </p>
                )}
              </div>
            </ScrollArea>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
