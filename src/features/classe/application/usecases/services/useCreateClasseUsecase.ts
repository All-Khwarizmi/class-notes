import { AuthRepository } from "@/features/auth/application/repository/old-auth-repository";
import { ClassType } from "@/features/classe/domain/class-schema";
import { UseCreateClasseInfraReturn } from "@/features/classe/infra/services/useCreateClasseInfra";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function useCreateClasseUsecase({
  useCreateClasseInfra,
  authRepository,
}: {
  authRepository: AuthRepository;
  useCreateClasseInfra: () => UseCreateClasseInfraReturn;
}) {
  const [createClasseData, setDataToCreateClasse] = useState<ClassType | null>(
    null
  );
  const {authUserId } = authRepository.useGetUserId();
  const { setDataForclasseCreationInfra, createClasseInfraPayload } =
    useCreateClasseInfra();
  useEffect(() => {
    if (createClasseData) {
      setDataForclasseCreationInfra({
        classe: createClasseData,
        userId: authUserId || "",
      });
    }
  }, [createClasseData]);

  useEffect(() => {
    if (createClasseInfraPayload.id) {
      setDataToCreateClasse(null);
      toast.success("La classe a été créée avec succès");
    }
    if (createClasseInfraPayload.error) {
      setDataToCreateClasse(null);
      toast.error("Erreur lors de la création de la classe");
    }
  }, [createClasseInfraPayload]);

  return {
    setClasse: setDataToCreateClasse,
    createdClassId: createClasseInfraPayload,
  };
}
