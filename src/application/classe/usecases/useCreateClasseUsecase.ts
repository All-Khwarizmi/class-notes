import { useAuthStore } from "@/core/auth/auth-store";
import { ClassType } from "@/domain/classe/class-schema";
import { UseCreateClasseInfraReturn } from "@/infrastructure/classe/useCreateClasseInfra";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { i } from "vitest/dist/reporters-P7C2ytIv.js";

export default function useCreateClasseUsecase({
  useCreateClasseInfra,
}: {
  useCreateClasseInfra: () => UseCreateClasseInfraReturn;
}) {
  const [classe, setClasse] = useState<ClassType | null>(null);
  const { user } = useUser();
  const { setData, createdClassId, error } = useCreateClasseInfra();
  useEffect(() => {
    console.log("classe", classe, user?.id);
    if (classe) {
      setData({ classe, userId: user?.id || "" });
    }
  }, [classe]);

  useEffect(() => {
    if (createdClassId) {
      setClasse(null);
      toast.success("La classe a été créée avec succès");
    }
  }, [createdClassId]);
  useEffect(() => {
    if (error) {
      setClasse(null);
      console.error("error", error);
      toast.error("Erreur lors de la création de la classe");
    }
  }, [error]);

  return {
    setClasse,
    createdClassId,
  };
}
