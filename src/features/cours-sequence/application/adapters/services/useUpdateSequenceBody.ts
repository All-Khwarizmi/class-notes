import { toast } from "sonner";
import { isLeft } from "fp-ts/lib/Either";
import { useMutation } from "@tanstack/react-query";
import updateSequenceBody from "../actions/update-sequence-body";

export default function useUpdateSequenceBody() {
  return useMutation({
    mutationKey: ["update-sequence-body"],
    mutationFn: async (options: {
      userId: string;
      sequenceId: string;
      body: string;
      type?: "template" | "sequence";
    }) => {
      const result = await updateSequenceBody(options);
      if (isLeft(result)) {
        toast.error("Failed to update the sequence body");
      } else {
        toast.success("Sequence body updated successfully");
      }
    },
  });
}
