import { Cours } from "@/features/cours/domain/entities/cours-schemas";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { coursUsecases } from "../cours-usecases";
import { isLeft } from "fp-ts/lib/Either";

export type CoursMetadata = Pick<
  Cours,
  "description" | "category" | "name" | "competences"
>;

export interface SaveCoursMetadataOptions {
  cours: CoursMetadata;
  userId: string;
}

export default function useSaveCoursMetadata() {
  const [saveCoursMetadata, setSaveCoursMetadata] =
    useState<SaveCoursMetadataOptions | null>(null);

  useEffect(() => {
    if (!saveCoursMetadata) {
      return;
    }
    const loadingToast = toast.loading("Saving cours metadata...", {
      position: "top-center",
    });
    coursUsecases
      .addCours({
        cours: {
          ...saveCoursMetadata.cours,
          body: "",
          lessons: [],
          createdBy: saveCoursMetadata.userId,


        },
        userId: saveCoursMetadata.userId,
      })
      .then((eitherCours) => {
        if (isLeft(eitherCours)) {
          toast.error("Failed to save cours metadata", {
            id: loadingToast,
          });
          return;
        }
        toast.success("Cours metadata saved", {
          id: loadingToast,
        });
      });
  }, [saveCoursMetadata]);

  return {
    setSaveCoursMetadata,
  };
}
