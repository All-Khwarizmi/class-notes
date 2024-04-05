import { useQuery } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { ClasseEntityDto } from "@/features/classe/infra/dtos/classe-dto";
import { isRight } from "fp-ts/lib/Either";
import ClassEntity from "@/features/classe/domain/class-entity";
import { useEffect, useState } from "react";

export type GetClassesPayload = {
  classes: ClassEntity[] | null;
  error: boolean;
} | null;

export default function useGetClassesInfra({ id }: { id: string }) {
  const [getGlassesPayloadInfra, setGetClassesPayloadInfra] =
    useState<GetClassesPayload>(null);
  const rawClasses = useQuery(api.classes.getClasses, {
    id,
  });
  useEffect(() => {
    if (rawClasses) {
      //!TODO: refactor this. -Now we are using the Either monad to handle the error by filtering the invalid values. But we should do something about the fault classes if any
      const classeEntities = rawClasses.map((c) => {
        const classEntity = ClasseEntityDto.toDomain(c);
        if (isRight(classEntity)) {
          return classEntity.right;
        }
        return ClassEntity.create({
          name: "Invalid",
          description: "Invalid",
          imageUrl: "Invalid",
        });
      });
      setGetClassesPayloadInfra({ classes: classeEntities, error: false });
    } 
  }, [rawClasses]);

  return {
    getGlassesPayloadInfra,
  };
}

export type GetClassesInfra = typeof useGetClassesInfra;
