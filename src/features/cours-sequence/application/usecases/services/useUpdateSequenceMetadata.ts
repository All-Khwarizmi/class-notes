import { Sequence } from "@/features/cours-sequence/domain/entities/cours-schemas";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { coursUsecases } from "../cours-usecases";
import { isLeft } from "fp-ts/lib/Either";
import { useRouter } from "next/navigation";
export interface UpdateSequenceMetadataOptions {
  sequence: Sequence;
  type?: "sequence" | "template";
}

function useUpdateSequenceMetadata() {
  const [updateSequenceMetadata, setUpdateSequenceMetadata] =
    useState<UpdateSequenceMetadataOptions | null>(null);
  const router = useRouter();
  useEffect(() => {
    if (!updateSequenceMetadata) {
      return;
    }
    const loadingToast = toast.loading("Updating sequence...", {
      position: "top-center",
    });
    coursUsecases
      .updateSequence({
        sequence: updateSequenceMetadata.sequence,
        type: updateSequenceMetadata.type,
      })
      .then((eitherSequence) => {
        if (isLeft(eitherSequence)) {
          toast.error("Failed to update sequence", {
            id: loadingToast,
            description: `
            ${eitherSequence.left.message}
            ${eitherSequence.left.code}
            `,
          });
          return;
        }
        toast.success("Sequence updated", {
          id: loadingToast,
        });

        const redirectPath =
          updateSequenceMetadata.type === "sequence"
            ? `/sequences/${updateSequenceMetadata.sequence._id}?type=sequence`
            : `/sequences/${updateSequenceMetadata.sequence._id}`;
        router.push(redirectPath);
      });
  }, [updateSequenceMetadata]);

  return {
    setUpdateSequenceMetadata,
  };
}

export default useUpdateSequenceMetadata;
