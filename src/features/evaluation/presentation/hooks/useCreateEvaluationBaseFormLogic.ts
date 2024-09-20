import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  EvaluationBaseType,
  EvaluationBaseTypeForm,
  EvaluationBaseTypeFormSchema,
  EvaluationCriteriaType,
  GradeTypeUnionType,
} from "../../domain/entities/evaluation-schema";
import { useEffect, useState } from "react";
import { getGradeTypeByName } from "../../application/adapters/utils/grade-helpers";
import useCreateBaseEvaluation from "../../application/adapters/services/useCreateBaseEvaluation";
import useUpdateBaseEvaluation from "../../application/adapters/services/useUpdateBaseEvaluation";
import { toastWrapper } from "@/core/utils/toast-wrapper";
import { useRouter } from "next/navigation";

function useCreateEvaluationBaseFormLogic(props: {
  userId: string;
  evaluation?: EvaluationBaseType;
}) {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(EvaluationBaseTypeFormSchema),
    defaultValues: {
      name: props.evaluation?.name || "",
      description: props.evaluation?.description || "",
      gradeType: props.evaluation?.gradeType.name || "10-point Scale",
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
  useEffect(() => {
    let loadingToastId: string | number = 0;
    if (isPending) {
      loadingToastId = toastWrapper.loading("Création de l'évaluation...");
    } else if (isUpdatePending) {
      loadingToastId = toastWrapper.loading("Mise à jour de l'évaluation...");
    }
    return () => {
      toastWrapper.dismiss(loadingToastId);
    };
  }, [isUpdatePending, isPending]);

  // Handler to add a new criteria
  const addCriteria = (options?: { name: string; description: string }) => {
    // If the gradeType is not selected, show an error message
    if (!form.getValues("gradeType")) {
      toastWrapper.error(
        "Veuillez sélectionner un type de notation avant d'ajouter des critères"
      );
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
        name: options?.name || "",
        description: options?.description || "",
        isGraded: true,
        gradeType,
        createdBy: props.userId,
      },
    ]);
    setOpenArray([...openArray, true]);
  };

  function onSubmit(values: EvaluationBaseTypeForm) {
    if (isPending || isUpdatePending) return;
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
      toastWrapper.error("Données d&apos;évaluation de base invalides");
      return;
    }
    // Check if all the criteria gradeTypes are the same as the evaluation gradeType
    const isValidCriteria = criterias.every(
      (criteria) => criteria.gradeType.type === evaluation.gradeType.type
    );
    if (!isValidCriteria) {
      criterias.forEach((criteria) => {
        if (criteria.gradeType.type !== evaluation.gradeType.type) {
          criteria.gradeType = evaluation.gradeType;
        }
      });
    }

    // Check if all the weight values are min 0.5
    const isValidWeights = criterias.every(
      (criteria) => criteria.weight >= 0.5
    );

    if (!isValidWeights) {
      toastWrapper.error("Le poids des critères doit être au moins de 0.5");
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
      toastWrapper.error(
        "Les critères doivent avoir des noms et descriptions uniques et non vides"
      );
      return;
    }
    if (props.evaluation) {
      updateEvaluation({
        evaluationId: props.evaluation.id,
        ...evaluation,
      });
      return;
    }
    createEvaluation(evaluation, {
      onSuccess: (_, variables) => {
        form.reset();
        setCriterias([]);
        setOpenArray([]);
      },
    });
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
