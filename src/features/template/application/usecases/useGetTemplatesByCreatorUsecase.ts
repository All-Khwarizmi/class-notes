import { useEffect, useState } from "react";
import TemplateEntity from "../../domain/entities/template-entity";
import { GetTemplatesByCreator } from "../../infra/services/useGetTemplatesByCreatorInfra";
import { toast } from "sonner";

export default function useGetEvaluationsByCreatorUsecase({
  useGetTemplatesByCreatorInfra,
  userId,
}: {
  useGetTemplatesByCreatorInfra: GetTemplatesByCreator;
  userId: string;
}) {
  const getTemplatesByCratorPayload = useGetTemplatesByCreatorInfra({
    userId,
  });
  const [templates, setTemplates] = useState<TemplateEntity[] | "NO DATA">(
    "NO DATA"
  );
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (getTemplatesByCratorPayload?.error) {
      setLoading(false);
      toast.error(
        "Une erreur s'est produite lors de la récupération des évaluations. Veuillez réessayer."
      );
    } else if (
      getTemplatesByCratorPayload?.templates !== "NO DATA" &&
      getTemplatesByCratorPayload?.templates !== false
    ) {
      setTemplates(getTemplatesByCratorPayload?.templates ?? "NO DATA");
      setLoading(false);
    } else if (getTemplatesByCratorPayload?.templates === "NO DATA") {
      setTemplates("NO DATA");
      setLoading(false);
    }
  }, [getTemplatesByCratorPayload]);

  return { templates, loading };
}
