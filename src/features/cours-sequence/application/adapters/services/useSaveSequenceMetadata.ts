import { useEffect, useState } from "react";
import { toast } from "sonner";
import { coursUsecases } from "../../usecases/cours-usecases";
import { isLeft } from "fp-ts/lib/Either";
import { useRouter } from "next/navigation";
import { CoursSequenceForm } from "@/features/cours-sequence/presentation/views/AddCoursView";
interface SequenceFormOptions extends CoursSequenceForm {
  competencesIds: string[];
}
export interface SaveSequenceMetadataOptions {
  sequence: SequenceFormOptions;
  userId: string;
}

export default function useSaveSequenceMetadata() {
  const [saveSequenceMetadata, setSaveSequenceMetadata] =
    useState<SaveSequenceMetadataOptions | null>(null);
  const router = useRouter();
  useEffect(() => {
    if (!saveSequenceMetadata) {
      return;
    }
    const loadingToast = toast.loading("Saving sequence metadata...", {
      position: "top-center",
    });
    coursUsecases
      .addSequence({
        sequence: {
          ...saveSequenceMetadata.sequence,
          body: "",
          createdBy: saveSequenceMetadata.userId,
        },
        userId: saveSequenceMetadata.userId,
      })
      .then((eitherSequence) => {
        if (isLeft(eitherSequence)) {
          toast.error("Failed to save sequence metadata", {
            id: loadingToast,
            description: `
           ${eitherSequence.left.message} \n
           Error code: ${eitherSequence.left.code}
              `,
          });
          return;
        }
        toast.success("Sequence metadata saved", {
          id: loadingToast,
        });
        router.push(`/sequences/${eitherSequence.right}?type=template`);
      });
  }, [saveSequenceMetadata]);

  return {
    setSaveSequenceMetadata,
  };
}
