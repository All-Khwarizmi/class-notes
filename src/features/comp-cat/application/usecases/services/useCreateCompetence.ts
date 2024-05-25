import { Competence } from "@/features/comp-cat/domain/entities/schemas";
import { useEffect, useState } from "react";
import { compCatUsecases } from "../comp-cat-usecases";
import { isLeft } from "fp-ts/lib/Either";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function useCreateCompetence() {
  const [createCompetenceOptions, setCreateCompetenceOptions] = useState<{
    competence: Omit<Competence, "_id">;
  } | null>(null);
  const router = useRouter();
  useEffect(() => {
    if (!createCompetenceOptions) return;
    const loadingToast = toast.loading("Adding competence", {
      position: "top-center",
    });
    compCatUsecases
      .addCompetence({
        userId: createCompetenceOptions.competence.createdBy,
        competence: createCompetenceOptions.competence,
        category: createCompetenceOptions.competence.category,
      })
      .then((result) => {
        if (isLeft(result)) {
          toast.error("Failed to add competence", {
            position: "top-center",
            duration: 3000,
          });
          return;
        }
        toast.dismiss(loadingToast);
        toast.success("Competence added", {
          position: "top-center",
          duration: 3000,
        });
        router.refresh();
      })
      .finally(() => {
        setCreateCompetenceOptions(null);
        toast.dismiss(loadingToast);
      });
  }, [createCompetenceOptions]);

  return {
    setCreateCompetenceOptions,
  };
}
