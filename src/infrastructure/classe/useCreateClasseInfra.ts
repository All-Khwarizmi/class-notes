import { IdCustom } from "@/usecases/class/class-repository";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { ClassType } from "@/domain/classe/class-schema";
import { useEffect, useState } from "react";

export default function useCreateClasseInfra() {
  const addClass = useMutation(api.classes.createClass);
  const [createdClassId, setCreatedClassId] = useState<IdCustom | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [classe, setClasse] = useState<ClassType | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    if (classe && userId) {
      addClass({ ...classe, userId })
        .then((id) => {
          if (id) {
            setCreatedClassId(id.id);
          } else {
            setError("Could not create classe");
          }
        })
        .catch((error) => {
          setError("Error while creating class");
        });
    }
  }, [classe]);

  return {
    createdClassId,
    setClasse,
    error,
    setUserId,
  };
}

export type UseCreateClasseInfraReturn = ReturnType<
  typeof useCreateClasseInfra
>;
