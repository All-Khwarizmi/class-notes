import { Complement } from "@/features/complement/domain/complement-schemas";
import { toast } from "sonner";
import { isLeft } from "fp-ts/lib/Either";
import { useMutation } from "@tanstack/react-query";
import updateComplement from "../actions/update-complement";
import { useCallback } from "react";
import { debounce } from "lodash";
import { EDITOR_DEBOUNCE_TIME } from "@/core/components/constants/editor-constants";

function useUpdateComplement() {
  const { mutate } = useMutation({
    mutationKey: ["update-complement"],
    mutationFn: async (options: Complement) => {
      const result = await updateComplement(options);
      if (isLeft(result)) {
        toast.error("Failed to update the complement", { duration: 2000 });
      } else {
        toast.success("Complement updated successfully", { duration: 2000 });
      }
    },
  });
  const debounceUpdateComplement = useCallback(
    (options: Complement) => {
      return debounce((content: string) => {
        return mutate({ ...options, body: content });
      }, EDITOR_DEBOUNCE_TIME);
    },
    [mutate]
  );
  return { debounceUpdateComplement };
}

export default useUpdateComplement;
