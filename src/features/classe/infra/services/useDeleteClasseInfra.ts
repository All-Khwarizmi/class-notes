import { useMutation } from "convex/react";
import { useCallback, useEffect, useState } from "react";
import { api } from "../../../../../convex/_generated/api";


export type DeleteClassePayload = {
  error: boolean;
  success: boolean;
};
export default function useDeleteClasseInfra() {
  const [classeToDeleteId, setClasseToDeleteId] = useState<string>("");
  const deleteClasse = useMutation(api.classes.deleteClass);
  const [deleteClassePayload, setDeleteClassePayload] =
    useState<DeleteClassePayload>();

  const handleDeleteMemoized = useCallback(async () => {
    await deleteClasse({ id: classeToDeleteId });
  }, [classeToDeleteId]);

  useEffect(() => {
    if (classeToDeleteId) {
      handleDeleteMemoized()
        .then(() => {
          setDeleteClassePayload({ error: false, success: true });
        })
        .catch(() => {
          setDeleteClassePayload({ error: true, success: false });
        });
    }
  }, [classeToDeleteId]);

  return { setClasseToDeleteId, deleteClassePayload };
}

export type UseDeleteClasseInfraReturn = ReturnType<
  typeof useDeleteClasseInfra
>;
