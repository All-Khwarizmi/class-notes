import { useMutation } from "@tanstack/react-query";
import deleteComplement from "../actions/delete-complement";
import { isLeft } from "fp-ts/lib/Either";
import { toast } from "sonner";

export default function useDeleteComplement() {
  return useMutation({
    mutationKey: ["delete-complement"],
    mutationFn: async (options: { id: string; }) => {
      const operationResult = await deleteComplement({ id: options.id });
      if (isLeft(operationResult)) {
        toast.error(
          "An error occured while deleting the complement. Please try again later.",
          { duration: 3000, position: "top-center" }
        );
        return;
      } else {
        toast.success("Complement deleted successfully.", {
          duration: 3000,
          position: "top-center",
        });
        window.location.reload();
      }
    },
  });
}
