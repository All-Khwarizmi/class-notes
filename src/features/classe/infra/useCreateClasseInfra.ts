import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { ClassType } from "@/features/classe/domain/class-schema";
import { useEffect, useState } from "react";
import { Id } from "../../../../convex/_generated/dataModel";

export type IdCustom = Id<"Classes">;
export default function useCreateClasseInfra() {
  const addClass = useMutation(api.classes.createClass);
  const [createdClassId, setCreatedClassId] = useState<IdCustom | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<{
    classe: ClassType;
    userId: string;
  } | null>(null);

  useEffect(() => {
    if (data?.classe && data?.userId) {
      console.log("data", data);

      addClass({
        name: data.classe.name,
        description: data.classe.description,
        imageUrl: data.classe.imageUrl,

        userId: data.userId,
      })
        .then((id) => {
          console.log("id", id);
          setCreatedClassId(id?.id || null);
        })
        .catch((error) => {
          setError("Error while creating class");
        });
    }
  }, [data]);

  return {
    createdClassId,
    error,
    setData,
  };
}

export type UseCreateClasseInfraReturn = ReturnType<
  typeof useCreateClasseInfra
>;
