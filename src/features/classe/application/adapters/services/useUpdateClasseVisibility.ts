import React, { useEffect } from "react";
import { toast } from "sonner";
import { isRight } from "fp-ts/lib/Either";
import { classeUsecases } from "../../usecases/classe-usecases";

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
            window.location.reload();
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
