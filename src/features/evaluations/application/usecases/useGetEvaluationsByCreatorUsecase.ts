import { useEffect, useState } from "react";
import EvaluationEntity from "../../domain/entities/evaluation-entity";
import { GetEvaluationsByCreator } from "../../infra/services/useGetEvaluationsByCreatorInfra";
import { toast } from "sonner";
import { cons } from "fp-ts/lib/ReadonlyNonEmptyArray";

export default function useGetEvaluationsByCreatorUsecase({
  useGetEvaluationsByCreatorInfra,
  userId,
}: {
  useGetEvaluationsByCreatorInfra: GetEvaluationsByCreator;
  userId: string;
}) {
  const getEvaluationsByCratorPayload = useGetEvaluationsByCreatorInfra({
    userId,
  });
  const [templates, setTemplates] = useState<EvaluationEntity[] | "NO DATA">(
    "NO DATA"
  );
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    console.log(getEvaluationsByCratorPayload);
    if (getEvaluationsByCratorPayload?.error) {
      setLoading(false);
      toast.error(
        "Une erreur s'est produite lors de la récupération des évaluations. Veuillez réessayer."
      );
    } else if (
      getEvaluationsByCratorPayload?.evaluations !== "NO DATA" &&
      getEvaluationsByCratorPayload?.evaluations !== false
    ) {
      setTemplates(getEvaluationsByCratorPayload.evaluations);
      setLoading(false);
    } else if (getEvaluationsByCratorPayload?.evaluations === "NO DATA") {
      setTemplates("NO DATA");
      setLoading(false);
    }
  }, [getEvaluationsByCratorPayload]);

  return { templates, loading };
}

//"jd76wvdtq5ryt4zs0nrynv6nb96p9h89"
// jd77rtjw8e4nvybmwbj9aydb396pm2a7