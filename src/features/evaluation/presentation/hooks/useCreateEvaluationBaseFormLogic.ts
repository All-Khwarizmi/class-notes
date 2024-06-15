import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  EvaluationBaseType,
  EvaluationBaseTypeForm,
  EvaluationBaseTypeFormSchema,
  EvaluationCriteriaType,
  GradeTypeUnionType,
} from "../../domain/entities/evaluation-schema";
import { useState } from "react";
import { toast } from "sonner";
import { getGradeTypeByName } from "../../application/adapters/utils/grade-helpers";
import useCreateBaseEvaluation from "../../application/adapters/services/useCreateBaseEvaluation";
import useUpdateBaseEvaluation from "../../application/adapters/services/useUpdateBaseEvaluation";
import { add } from "lodash";

function useCreateEvaluationBaseFormLogic(props: {
  userId: string;
  evaluation?: EvaluationBaseType;
}) {
  const form = useForm({
    resolver: zodResolver(EvaluationBaseTypeFormSchema),
    defaultValues: {
      name: props.evaluation?.name || "",
      description: props.evaluation?.description || "",
      gradeType: props.evaluation?.gradeType.name || "Numeric",
      isGraded: props.evaluation?.isGraded || true,
    },
  });

  const [criterias, setCriterias] = useState<EvaluationCriteriaType[]>(
    props.evaluation?.criterias || []
  );
  const [openArray, setOpenArray] = useState<boolean[]>(
    props.evaluation?.criterias.map(() => false) || []
  );

  const {
    mutate: createEvaluation,
    isPending,
    isSuccess,
  } = useCreateBaseEvaluation();
  const {
    mutate: updateEvaluation,
    isPending: isUpdatePending,
    isSuccess: isUpdateSuccess,
  } = useUpdateBaseEvaluation();

  // Handler to add a new criteria
  const addCriteria = () => {
    // If the gradeType is not selected, show an error message
    if (!form.getValues("gradeType")) {
      toast.error("Please select a grade type before adding criteria");
      return;
    }
    const gradeVal = form.getValues("gradeType") as unknown;
    const gradeType = getGradeTypeByName(
      gradeVal as GradeTypeUnionType["name"]
    );
    setCriterias([
      ...criterias,
      {
        id: crypto.randomUUID(),
        weight: 1,
        name: "",
        description: "",
        isGraded: true,
        gradeType,
        createdBy: props.userId,
      },
    ]);
    setOpenArray([...openArray, true]);
  };
  function onSubmit(values: EvaluationBaseTypeForm) {
    const gradeVal = form.getValues("gradeType") as unknown;
    const gradeType = getGradeTypeByName(
      gradeVal as GradeTypeUnionType["name"]
    );
    const evaluation: Omit<EvaluationBaseType, "id" | "createdAt"> = {
      ...values,
      gradeType,
      criterias,
      createdBy: props.userId,
    };
    const isValid = EvaluationBaseTypeFormSchema.safeParse(evaluation);
    if (!isValid.success) {
      toast.error("Invalid evaluation base data");
      return;
    }
    // Check if all the criteria gradeTypes are the same as the evaluation gradeType
    const isValidCriteria = criterias.every(
      (criteria) => criteria.gradeType.type === evaluation.gradeType.type
    );
    if (!isValidCriteria) {
      toast.error("Criteria grade types must match the evaluation grade type");
      return;
    }
    // Check if all the weight values are min 0.5
    const isValidWeights = criterias.every(
      (criteria) => criteria.weight >= 0.5
    );

    if (!isValidWeights) {
      toast.error("Criteria weight must be at least 0.5");
      return;
    }

    // Check that the criterias are not empty and have unique names and descriptions before submitting
    const isValidCriterias = criterias.every(
      (criteria) =>
        criteria.name.length > 0 &&
        criteria.description.length > 0 &&
        criterias.filter((c) => c.name === criteria.name).length === 1
    );
    if (!isValidCriterias) {
      toast.error("Invalid criteria data", {
        description: `Criteria names and descriptions must be unique and not empty`,
      });
      return;
    }
    if (props.evaluation) {
      updateEvaluation({
        evaluationId: props.evaluation.id,
        ...evaluation,
      });
      return;
    }
    createEvaluation(evaluation);
  }

  return {
    form,
    criterias,
    openArray,
    addCriteria,
    setCriterias,
    setOpenArray,
    onSubmit,
    isPending,
    isSuccess,
    isUpdatePending,
    isUpdateSuccess,
  };
}

export default useCreateEvaluationBaseFormLogic;
