import { ClassType } from "@/domain/classe/class-schema";
import { UseCreateClasseInfraReturn } from "@/infrastructure/classe/useCreateClasseInfra";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function useCreateClasseUsecase({
  useCreateClasseInfra,
}: {
  useCreateClasseInfra: () => UseCreateClasseInfraReturn;
}) {
  const [classe, setClasse] = useState<ClassType | null>(null);
  const {
    setClasse: addClasse,
    createdClassId,
    error,
  } = useCreateClasseInfra();
  useEffect(() => {
    if (classe) {
      addClasse(classe);
    }

    if (error) {
      toast.error("Une erreur est survenue lors de la création de la classe");
    }
  }, [classe, error]);

  useEffect(() => {
    if (createdClassId) {
      setClasse(null);
      toast.success("La classe a été créée avec succès");
    }
  }, [createdClassId]);

  return {
    setClasse,
    createdClassId,
  };
}
