import { UseDeleteClasseInfraReturn } from "@/features/classe/infra/useDeleteClasseInfra";
import { useEffect } from "react";
import { toast } from "sonner";

export default function useDeleteClasseUsecase({
  useDeleteClasseInfra,
}: {
  useDeleteClasseInfra: () => UseDeleteClasseInfraReturn;
}) {
  const { setClasseId, error, ok } = useDeleteClasseInfra();

  useEffect(() => {
    if (error) {
      toast.error(
        "Une erreur est survenue lors de la suppression de la classe"
      );
    }
  }, [error]);

  useEffect(() => {
    if (ok === "Classe supprimée avec success") {
      toast.success("Classe supprimée avec success");
    }
  }, [ok]);

  return {
    setClasseId,
  };
}
