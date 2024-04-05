import { UseDeleteClasseInfraReturn } from "@/features/classe/infra/services/useDeleteClasseInfra";
import { useEffect } from "react";
import { toast } from "sonner";

export default function useDeleteClasseUsecase({
  useDeleteClasseInfra,
}: {
  useDeleteClasseInfra: () => UseDeleteClasseInfraReturn;
}) {
  const { setClasseToDeleteId, deleteClassePayload } = useDeleteClasseInfra();

  

  useEffect(() => {
    if (deleteClassePayload?.error) {
      toast.error("La classe n'a pas pu être supprimée");
    } 
    if (deleteClassePayload?.success) {
      toast.success("La classe a été supprimée avec succès");
    }
  }, [deleteClassePayload]);

  return {
    setClasseId: setClasseToDeleteId,
  };
}
