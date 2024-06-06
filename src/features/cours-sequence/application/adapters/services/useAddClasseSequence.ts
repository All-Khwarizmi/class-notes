import React, { useEffect } from "react";
import { coursUsecases } from "../../usecases/cours-usecases";
import { isLeft } from "fp-ts/lib/Either";
import { toast } from "sonner";

function useAddClasseSequence() {
  const [classeSequenceOptions, setClasseSequenceOptions] = React.useState<{
    classeId: string;
    sequenceId: string;
  } | null>(null);
  useEffect(() => {
    if (classeSequenceOptions) {
      const loadingToast = toast.loading("Adding sequence...", {
        position: "top-center",
      });
      coursUsecases
        .addClassSequence(classeSequenceOptions)
        .then((eitherId) => {
          if (isLeft(eitherId)) {
            return toast.error("Failed to add sequence", {
              position: "top-center",
              id: loadingToast,
            });
          }
          toast.success("Sequence added", {
            position: "top-center",
            id: loadingToast,
          });
        })
        .catch((err) => {
          console.error(err);
          toast.error("Failed to add sequence", {
            position: "top-center",
            id: loadingToast,
          });
        });
    }
  }, [classeSequenceOptions]);
  return {
    setClasseSequenceOptions,
  };
}

export default useAddClasseSequence;
