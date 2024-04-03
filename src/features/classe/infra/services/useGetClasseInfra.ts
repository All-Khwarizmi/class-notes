import { useQuery } from "convex/react";
import { useEffect, useState } from "react";
import { api } from "../../../../../convex/_generated/api";
import { ClasseEntityDto } from "@/features/classe/infra/dtos/classe-dto";
import { isRight } from "fp-ts/lib/Either";
import ClassEntity from "@/features/classe/domain/class-entity";

export default function useGetClasseInfra(id: { id: string }) {
  const [classe, setClasse] = useState<ClassEntity | null>(null);
  const classeInfra = useQuery(api.classes.getClass, { id: id.id });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (classeInfra) {
      const eitherClasse = ClasseEntityDto.toDomain(classeInfra);
      if (isRight(eitherClasse)) {
        const classe = eitherClasse.right;
        setClasse(classe);
      } else {
        setError(
          "Une erreur est survenue lors de la récupération de la classe"
        );
      }
    }
  }, [classeInfra]);

  return { classe, error };
}

export type UseGetClasseInfra = typeof useGetClasseInfra;
