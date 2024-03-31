import { useMutation } from "convex/react";
import { useCallback, useEffect, useState } from "react";
import { api } from "../../../convex/_generated/api";
import { toast } from "sonner";

export default function useDeleteClasse() {
  const [loading, setLoading] = useState<boolean>(true);
  const [classeId, setClasseId] = useState<string>("");
  const deleteClasse = useMutation(api.classes.deleteClass);

  const handleDeleteMemoized = useCallback(async () => {
    try {
      setLoading(true);
      await deleteClasse({ id: classeId });
      toast.success("Classe supprimée avec succès", {
        duration: 2000,
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error("Erreur lors de la suppression de la classe", {
        duration: 5000,
      });
    }
  }, [classeId]);

  useEffect(() => {
    if (classeId) {
      handleDeleteMemoized();
    }
  }, [classeId]);

  return { loading, setClasseId };
}
