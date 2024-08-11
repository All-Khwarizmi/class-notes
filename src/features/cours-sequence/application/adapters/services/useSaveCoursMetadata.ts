import { Cours } from "@/features/cours-sequence/domain/entities/cours-schemas";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { coursUsecases } from "../../usecases/cours-usecases";
import { isLeft } from "fp-ts/lib/Either";
import { useRouter } from "next/navigation";
export type CoursMetadata = Pick<
  Cours,
  "description" | "category" | "name" | "competences" | "imageUrl"
>;

export interface SaveCoursMetadataOptions {
  cours: CoursMetadata;
  userId: string;
  sequenceId: string;
  publish?: boolean;
}

export default function useSaveCoursMetadata() {
  const [saveCoursMetadata, setSaveCoursMetadata] =
    useState<SaveCoursMetadataOptions | null>(null);
  const router = useRouter();
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
          sequenceId: saveCoursMetadata.sequenceId,
          body: "",
          lessons: [],
          createdBy: saveCoursMetadata.userId,
          publish: saveCoursMetadata.publish ?? false,
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
        router.push(`/cours/${eitherCours.right}`);
      });
  }, [saveCoursMetadata]);

  return {
    setSaveCoursMetadata,
  };
}
