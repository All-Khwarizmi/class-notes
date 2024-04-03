import { useMutation } from "convex/react";
import { useCallback, useEffect, useState } from "react";
import { api } from "../../../../convex/_generated/api";

export default function useDeleteClasseInfra() {
  const [classeId, setClasseId] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const deleteClasse = useMutation(api.classes.deleteClass);
  const [ok, setOk] = useState<"Classe supprimée avec success" | null>(null);

  const handleDeleteMemoized = useCallback(async () => {
    await deleteClasse({ id: classeId });
    setOk("Classe supprimée avec success");
  }, [classeId]);

  useEffect(() => {
    if (classeId) {
      handleDeleteMemoized()
        .then(() => {
          setOk("Classe supprimée avec success");
          setError(null);
        })
        .catch(() => {
          setError(
            "Une erreur est survenue lors de la suppression de la classe"
          );
          setOk(null);
        });
    }
  }, [classeId]);

  return { setClasseId, error, ok };
}

export type UseDeleteClasseInfraReturn = ReturnType<
  typeof useDeleteClasseInfra
>;
