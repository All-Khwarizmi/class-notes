import { Complement } from "@/features/complement/domain/complement-schemas";
import { toast } from "sonner";
import { isLeft } from "fp-ts/lib/Either";
import { useMutation } from "@tanstack/react-query";
import updateComplement from "../actions/update-complement";
import { useCallback } from "react";
import { debounce } from "lodash";

function useUpdateComplement() {
  const { mutate } = useMutation({
    mutationKey: ["update-complement"],
    mutationFn: async (options: Complement) => {
      const result = await updateComplement(options);
      if (isLeft(result)) {
        toast.error("Failed to update the complement");
      } else {
        toast.success("Complement updated successfully");
      }
    },
  });
  const debounceUpdateComplement = useCallback(
    (options: Complement) => {
      return debounce((content: string) => {
       return mutate({ ...options, body: content });
      }, 5000);
    },
    [mutate]
  );
  return { debounceUpdateComplement };
}

export default useUpdateComplement;
