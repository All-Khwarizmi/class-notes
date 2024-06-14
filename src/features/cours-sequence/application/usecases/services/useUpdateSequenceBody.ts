import { useEffect, useState } from "react";
import { toast } from "sonner";
import { coursUsecases } from "../cours-usecases";
import { isLeft } from "fp-ts/lib/Either";

export default function useUpdateSequenceBody() {
  const [updateSequenceBodyOptions, setUpdateSequenceBodyOptions] = useState<{
    userId: string;
    sequenceId: string;
    body: string;
    type?: "template" | "sequence";
  } | null>(null);

  useEffect(() => {
    if (!updateSequenceBodyOptions) return;
    const loadingToast = toast.loading("", {
      position: "bottom-right",
    });
    coursUsecases
      .addBodyToSequence(updateSequenceBodyOptions)
      .then((eitherCours) => {
        if (isLeft(eitherCours)) {
          toast.error("Failed to update sequence body", {
            position: "top-center",
            description: eitherCours.left.message,
          });
          return;
        }
        toast.success("", {
          id: loadingToast,
          position: "bottom-right",
          duration: 500,
        });
      })
      .finally(() => {
        setUpdateSequenceBodyOptions(null);
        toast.dismiss(loadingToast);
      });
  }, [updateSequenceBodyOptions]);

  return { setUpdateSequenceBodyOptions };
}
