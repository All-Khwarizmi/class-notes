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
function AssignEvaluation(props: { userId: string }) {
  const { data: eitherEvaluations, isPending } = useGetEvaluationsBaseList({
    userId: props.userId,
  });

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
  }, [eitherEvaluations]);
  function handleSubmit() {
    console.log("Submit");
  }
  function handleChange(value: string) {
    console.log(value);
    const evaluation = evaluations!.find(
      (evaluation) => evaluation.id === value
    );
    if (evaluation) {
      console.log({ evaluation });
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
            {evaluations.map((evaluation) => (
              <SelectItem key={evaluation.id} value={evaluation.id}>
                {evaluation.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <Button onClick={handleSubmit}>Assign</Button>
    </div>
  );
}

export default AssignEvaluation;
