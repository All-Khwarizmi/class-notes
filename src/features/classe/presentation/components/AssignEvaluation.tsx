import React, { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/core/components/ui/select";
import { EvaluationBaseType } from "@/features/evaluation/domain/entities/evaluation-schema";
import { SelectGroup } from "@radix-ui/react-select";
import useGetEvaluationsBaseList from "@/features/evaluation/application/adapters/services/useGetEvaluationsBaseList";
import { isRight } from "fp-ts/lib/Either";
import { Button } from "@/core/components/ui/button";
import useAssignEvaluation from "@/features/evaluation/application/adapters/services/useAssignEvaluation";
import { Loader } from "lucide-react";
import { toast } from "sonner";
import useDeleteEvaluationWithGrades from "@/features/evaluation/application/adapters/services/useDeleteEvaluationWithGrades";
import useGetStudentTableData from "@/features/evaluation/application/adapters/services/useGetStudentTableData";
import { CompoundEvaluationType } from "../../domain/class-schema";

function AssignEvaluation(props: { userId: string; classeId: string }) {
  const {
    data: eitherEvaluations,
    isPending,
    refetch: refetchAlreadyAssignedEvaluations,
  } = useGetEvaluationsBaseList({
    userId: props.userId,
  });

  const { tableData, isLoading, refetchCompoundEvaluations } =
    useGetStudentTableData({
      classeId: props.classeId,
    });

  const { mutate: assignEvaluation, isPending: isAssignPending } =
    useAssignEvaluation();

  const [selectedEvaluation, setSelectedEvaluation] =
    useState<EvaluationBaseType | null>(null);

  const [evaluationsList, setEvaluationsList] = useState<
    CompoundEvaluationType[] | null
  >(null);

  useEffect(() => {
    if (tableData?.evaluations) {
      setEvaluationsList(tableData.evaluations);
    }
  }, [tableData?.evaluations]);

  useEffect(() => {
    refetchCompoundEvaluations();
    refetchAlreadyAssignedEvaluations();
  }, [refetchCompoundEvaluations, refetchAlreadyAssignedEvaluations]);
  const { mutate: deleteEvaluationWithGrades } =
    useDeleteEvaluationWithGrades();

  function handleSubmit() {
    if (selectedEvaluation) {
      assignEvaluation({
        options: {
          evaluationId: selectedEvaluation.id,
          classeId: props.classeId,
        },
        refetchCompoundEvaluations,
      });
      setSelectedEvaluation(null);
    } else {
      toast.error("Please select an evaluation");
      return;
    }
  }

  function handleChange(value: string) {
    const evaluation =
      eitherEvaluations &&
      isRight(eitherEvaluations) &&
      eitherEvaluations.right!.find((evaluation) => evaluation.id === value);
    if (evaluation) {
      setSelectedEvaluation(evaluation);
    }
  }

  if (isPending || isLoading) {
    return <Loader className="animate-spin" />;
  }

  if (
    eitherEvaluations &&
    isRight(eitherEvaluations) &&
    evaluationsList &&
    tableData
  ) {
    const evaluations = eitherEvaluations.right;
    return (
      <div className="flex flex-col gap-4 justify-center pb-8">
        <section className="flex gap-4 justify-center py-4 w-full">
          <Select onValueChange={handleChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select an evaluation" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {evaluations.map((evaluation) => {
                  const gradedEvaluations = tableData.evaluations.map(
                    (evaluations) => evaluations.grade
                  );
                  if (
                    !gradedEvaluations.some(
                      (gradedEval) =>
                        gradedEval.evaluationBaseId === evaluation.id
                    )
                  ) {
                    return (
                      <SelectItem key={evaluation.id} value={evaluation.id}>
                        {evaluation.name}
                      </SelectItem>
                    );
                  }
                })}
              </SelectGroup>
            </SelectContent>
          </Select>
          {isAssignPending ? (
            <Loader className="animate-spin" />
          ) : (
            <Button onClick={handleSubmit}>Assign</Button>
          )}
        </section>
        <section className="flex flex-col w-full gap-4 justify-center">
          <ul className="flex flex-col gap-2 justify-center w-full px-4 py-2 bg-gray-800 rounded-md border border-gray-800">
            {evaluationsList.map((compoundEvals) => {
              const evalBase = evaluationsList.find(
                (compoundEvalsInner) =>
                  compoundEvalsInner.base.id ===
                  compoundEvals.grade.evaluationBaseId
              );
              if (evalBase) {
                return (
                  <li
                    className="flex justify-between items-center w-full px-4 py-2 "
                    key={compoundEvals.grade.id}
                  >
                    <p>{evalBase.base.name} </p>
                    <Button
                      variant={"destructive"}
                      onClick={() =>
                        deleteEvaluationWithGrades(
                          {
                            options: { evaluationId: compoundEvals.grade.id },
                            refetchCompoundEvaluations,
                            refetchAlreadyAssignedEvaluations,
                            classeId: props.classeId,
                          },
                          {
                            onSuccess: () => {
                              // Refetch data to update the UI
                              refetchAlreadyAssignedEvaluations();
                              refetchCompoundEvaluations();
                            },
                            onError: () => {
                              toast.error(
                                "Failed to delete the evaluation. Please try again."
                              );
                            },
                          }
                        )
                      }
                    >
                      Remove
                    </Button>
                  </li>
                );
              }
            })}
          </ul>
        </section>
      </div>
    );
  }

  return null; // Render nothing if data is not ready
}

export default AssignEvaluation;
