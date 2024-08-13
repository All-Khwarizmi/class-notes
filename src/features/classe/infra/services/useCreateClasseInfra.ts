import { useMutation } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { ClassType } from "@/features/classe/domain/class-schema";
import { useEffect, useState } from "react";
import { Id } from "../../../../../convex/_generated/dataModel";

export type IdCustom = Id<"Classes">;
export type ICreateClasseInfraPayload =
  | {
      id: IdCustom;
      error: boolean;
    }
  | {
      id: boolean;
      error: boolean;
    };
export default function useCreateClasseInfra() {
  const addClass = useMutation(api.classes.createClass);
  const [createClasseInfraPayload, setCreateClasseInfraPayload] =
    useState<ICreateClasseInfraPayload>({
      id: false,
      error: false,
    });
  const [dataForClasseCreationInfra, setDataForclasseCreationInfra] = useState<{
    classe: ClassType;
    userId: string;
  } | null>(null);

  useEffect(() => {
    if (
      dataForClasseCreationInfra?.classe &&
      dataForClasseCreationInfra?.userId
    ) {
      addClass({
        name: dataForClasseCreationInfra.classe.name,
        description: dataForClasseCreationInfra.classe.description,
        imageUrl: dataForClasseCreationInfra.classe.imageUrl,
        userId: dataForClasseCreationInfra.userId,
        educationLevel: dataForClasseCreationInfra.classe.educationLevel,
        educationSystem: dataForClasseCreationInfra.classe.educationSystem,
      })
        .then((data) => {
          setCreateClasseInfraPayload({ ...data });
        })
        .catch((error) => {
          console.error("error", error);
          setCreateClasseInfraPayload({ id: false, error: true });
        });
    }
  }, [dataForClasseCreationInfra]);

  return {
    createClasseInfraPayload,
    setDataForclasseCreationInfra,
  };
}

export type UseCreateClasseInfraReturn = ReturnType<
  typeof useCreateClasseInfra
>;
