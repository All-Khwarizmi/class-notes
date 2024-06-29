import { useState } from "react";
import useGetClasses from "./useGetClasses";
import useDeleteClasse from "@/features/classe/application/adapters/services/useDeleteClasse";

export const useClassesTableLogic = (options: { userId: string }) => {
  const {
    data: classes,
    isLoading,
    isError,
    error,
    refetch: refetchClasses,
  } = useGetClasses({
    userId: options.userId,
  });
  const [open, setOpen] = useState(false);
  const { mutate: deleteClasse } = useDeleteClasse();
  const handleDelete = async (id: string) => {
    deleteClasse(
      {
        classeId: id,
      },
      {
        onSuccess: () => {
          refetchClasses();
        },
      }
    );
  };
  return {
    classes,
    isLoading,
    isError,
    error,
    refetchClasses,
    open,
    setOpen,
    handleDelete,
  };
};
