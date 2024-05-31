import { ComplementBaseType } from "@/features/complement/presentation/views/ComplementAddBase";
import { useEffect, useState } from "react";
import { toast } from "sonner";

function useAddComplementBase() {
  const [complementBaseOptions, setComplementBaseOptions] =
    useState<ComplementBaseType | null>(null);
  useEffect(() => {
    if (complementBaseOptions) {
      console.log(complementBaseOptions);
      const loadingToast = toast.loading("Adding...", {
        position: "top-center",
      });
    }
  }, [complementBaseOptions]);

  return {
    setComplementBaseOptions,
  };
}

export default useAddComplementBase;
