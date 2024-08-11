import { Cours } from "@/features/cours-sequence/domain/entities/cours-schemas";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { coursUsecases } from "../../usecases/cours-usecases";
import { isLeft } from "fp-ts/lib/Either";
import { useRouter } from "next/navigation";

export interface SaveCoursMetadataOptions {
  cours: Cours;
}

export default function useUpdateCoursMetadata() {
  const [updateCoursMetadata, setUpdateCoursMetadata] =
    useState<SaveCoursMetadataOptions | null>(null);
  const router = useRouter();
  useEffect(() => {
    if (!updateCoursMetadata) {
      return;
    }
    const loadingToast = toast.loading("Updating cours metadata...", {
      position: "top-center",
    });
    coursUsecases
      .updateCours({
        cours: updateCoursMetadata.cours,
      })
      .then((eitherCours) => {
        if (isLeft(eitherCours)) {
          toast.error("Failed to update cours metadata", {
            id: loadingToast,
            description: `
            ${eitherCours.left.message}
            ${eitherCours.left.code}
            `,
          });
          return;
        }
        toast.success("Cours metadata updated", {
          id: loadingToast,
        });
        router.push(`/cours/${updateCoursMetadata.cours._id}`);
      });
  }, [updateCoursMetadata]);

  return {
    setUpdateCoursMetadata,
  };
}
