import { Complement } from "@/features/complement/domain/complement-schemas";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { complementUsecases } from "../../usecases/complement-usecases";
import { isLeft } from "fp-ts/lib/Either";

function useUpdateComplement() {
  const [complementOptions, setComplementOptions] = useState<Complement | null>(
    null
  );
  useEffect(() => {
    if (complementOptions) {
      const loadingToast = toast.loading("Updating...", {
        position: "top-center",
      });
      complementUsecases
        .updateCoursComplement({
          coursComplement: complementOptions,
        })
        .then((eitherComplement) => {
          if (isLeft(eitherComplement)) {
            toast.error("Error updating complement", {
              position: "top-center",
            });
            toast.dismiss(loadingToast);
            return;
          }
          toast.success("Complement updated", {
            position: "top-center",
          });
          toast.dismiss(loadingToast);
        })
        .finally(() => {
          setComplementOptions(null);
        });
    }
  }, [complementOptions]);

  return {
    setComplementOptions,
  };
}

export default useUpdateComplement;
