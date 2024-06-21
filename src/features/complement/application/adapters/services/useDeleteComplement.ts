import { useMutation } from "@tanstack/react-query";
import deleteComplement from "../actions/delete-complement";

export default function useDeleteComplement() {
  return useMutation({
    mutationKey: ["delete-complement"],
    mutationFn: async (options: { id: string; redirectPath: string }) => {
      return deleteComplement({ id: options.id });
    },
  });
}
