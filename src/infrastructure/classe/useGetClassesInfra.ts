import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { ClasseEntityDto } from "@/infrastructure/classe/classe-dto";
import { isRight } from "fp-ts/lib/Either";
import ClassEntity from "@/domain/classe/class-entity";
import { useEffect, useState } from "react";


export default function useGetClassesInfra({ id }: { id: string }) {
  const [error, setError] = useState<string>();
  const [classes, setClasses] = useState<ClassEntity[] | null>(null);

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
      setClasses(classeEntities);

      setError(undefined);
    } else {
      setError("Error while fetching classes");
    }
  }, [rawClasses]);

  return {
    classes,
    error,
  };
}

export type GetClassesInfra = typeof useGetClassesInfra;
