import { IdCustom } from "@/usecases/class/class-repository";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { ClassType } from "@/domain/class/class-schema";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function useCreateClasse() {
  const addClass = useMutation(api.classes.createClass);
  const [classe, setClasse] = useState<ClassType | null>();
  const [createdClassId, setCreatedClassId] = useState<IdCustom | null>(null);

  useEffect(() => {
    if (classe) {
      toast.info("Creating class...");
      addClass(classe)
        .then((id) => {
          if (id) {
            setCreatedClassId(id.id);
            toast.success("Class created successfully");
          } else {
            toast.error("Error while creating class: invalid value");
          }
        })
        .catch((error) => {
          toast.error("Error while creating class");
        });
    }
  }, [classe]);

  return {
    setClasse,
    createdClassId,
  };
}
