import React, { useEffect } from "react";
import { classeUsecases } from "../classe-usecases";
import { toast } from "sonner";
import { isRight } from "fp-ts/lib/Either";

function useUpdateClasseVisibility() {
  const [classeVisibilityOptions, setClasseVisibilityOptions] = React.useState<{
    visible: boolean;
    id: string;
  } | null>(null);

  useEffect(() => {
    if (classeVisibilityOptions) {
   
      const loadingToast = toast.loading("Updating class visibility...", {
        position: "top-center",
      });
      classeUsecases
        .updateClasseVisibility({
          id: classeVisibilityOptions.id,
          visibility: classeVisibilityOptions.visible,
        })
        .then((result) => {
          if (isRight(result)) {
            toast.success("Class visibility updated successfully", {
              id: loadingToast,
              position: "top-center",
            });
          } else {
            toast.error("Failed to update class visibility", {
              id: loadingToast,
              position: "top-center",
            });
          }
        })
        .catch((error) => {
          toast.error("Failed to update class visibility", {
            id: loadingToast,
            position: "top-center",
          });
        });
    }
  }, [classeVisibilityOptions]);

  return {
    setClasseVisibilityOptions,
  };
}

export default useUpdateClasseVisibility;
