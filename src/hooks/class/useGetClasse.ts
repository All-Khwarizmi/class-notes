import { useQuery } from "convex/react";
import { useEffect, useState } from "react";
import { api } from "../../../convex/_generated/api";
import { ClassEntityDto } from "@/infrastructure/class/class-repository.impl";
import {  isRight } from "fp-ts/lib/Either";
import { toast } from "sonner";
import ClassEntity from "@/domain/class/class-entity";

export default function useGetClasse(id: { id: string }) {
  const [loading, setLoading] = useState<boolean>(true);
  const [classe, setClasse] = useState<ClassEntity | null>(null);
  const classeInfra = useQuery(api.classes.getClass, { id: id.id });

  useEffect(() => {
    if (classeInfra) {
      const eitherClasse = ClassEntityDto.toDomain(classeInfra);
      if (isRight(eitherClasse)) {
        const classe = eitherClasse.right;
        setClasse(classe);
        setLoading(false);
      } else {
        toast.error("Erreur lors de la récupération de la classe", {
          duration: 5000,
        });
        setLoading(false);
      }
    }
  }, [classeInfra]);

  return { loading, classe };
}
