import { useQuery } from "convex/react";
import { useEffect, useState } from "react";
import { api } from "../../../../../convex/_generated/api";
import { ClasseEntityDto } from "@/features/classe/infra/dtos/classe-dto";
import { isRight } from "fp-ts/lib/Either";
import ClassEntity from "@/features/classe/domain/class-entity";
export type GetClassePayload = {
  classe: ClassEntity | null;
  error: boolean;
} | null;
export default function useGetClasseInfra(id: { id: string }) {
  const classeInfra = useQuery(api.classes.getClass, { id: id.id });
  const [getClassePayloadInfra, setGetClassePayloadInfra] =
    useState<GetClassePayload>(null);

  useEffect(() => {
    if (classeInfra) {
      const eitherClasse = ClasseEntityDto.toDomain(classeInfra);
      if (isRight(eitherClasse)) {
        const classe = eitherClasse.right;
        setGetClassePayloadInfra({ classe, error: false });
      } else {
        setGetClassePayloadInfra({ classe: null, error: true });
      }
    }
  }, [classeInfra]);

  return { getClassePayloadInfra };
}

export type UseGetClasseInfra = typeof useGetClasseInfra;
