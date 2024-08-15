import { coursUsecases } from "@/features/cours-sequence/application/usecases/cours-usecases";
import { useMutation } from "@tanstack/react-query";
import { isLeft } from "fp-ts/lib/Either";
import { toast } from "sonner";

export default function useDeleteSequence() {
  return useMutation({
    mutationKey: ["delete-sequence"],
    mutationFn: async (options: {
      sequenceId: string;
      type: "template" | "sequence";
      userId: string;
    }) => {
      const deletionResult = await coursUsecases.deleteSequence(options);
      if (isLeft(deletionResult)) {
        toast.error("Failed to delete sequence", {
          duration: 3000,
        });
        return;
      }
      toast.success("Sequence deleted successfully", {
        duration: 3000,
      });
      window.location.reload();
      return;
    },
  });
}
