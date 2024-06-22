import React, { useMemo, useState } from "react";
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
import { EvaluationWithGradeType } from "@/features/evaluation/domain/entities/evaluation-with-grades-schema";
function AssignEvaluation(props: {
  userId: string;
  classeId: string;
  alreadyAssignedEvaluations: EvaluationWithGradeType[];
}) {
  const { data: eitherEvaluations, isPending } = useGetEvaluationsBaseList({
    userId: props.userId,
  });
  const { mutate: assignEvaluation, isPending: isAssignPending } =
    useAssignEvaluation();

  const [selectedEvaluation, setSelectedEvaluation] =
    useState<EvaluationBaseType | null>(null);

  const evaluations = useMemo(() => {
    if (isPending || !eitherEvaluations) {
      return [];
    }

    if (isRight(eitherEvaluations)) {
      return eitherEvaluations.right;
    }
    return [];
  }, [eitherEvaluations, isPending]);

  function handleSubmit() {
    if (selectedEvaluation) {
      assignEvaluation({
        evaluationId: selectedEvaluation.id,
        classeId: props.classeId,
      });
    } else {
      toast.error("Please select an evaluation");
      return;
    }
  }
  function handleChange(value: string) {
    const evaluation = evaluations!.find(
      (evaluation) => evaluation.id === value
    );
    if (evaluation) {
      setSelectedEvaluation(evaluation);
    }
  }
  return (
    <div className="flex gap-4 justify-center pb-8">
      <Select onValueChange={handleChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select an evaluation" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {evaluations.map((evaluation) => {
              if (
                !props.alreadyAssignedEvaluations.some(
                  (e) => e.id === evaluation.id
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
    </div>
  );
}

export default AssignEvaluation;
