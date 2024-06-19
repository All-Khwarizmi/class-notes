import { toast } from "sonner";
import { isLeft } from "fp-ts/lib/Either";
import { useMutation } from "@tanstack/react-query";
import updateSequenceBody from "../actions/update-sequence-body";
import { useCallback } from "react";
import { debounce } from "lodash";

export default function useUpdateSequenceBody() {
  const { mutate } = useMutation({
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

  const debounceUpdateSequenceBody = useCallback(
    (options: {
      userId: string;
      sequenceId: string;
      type?: "template" | "sequence";
    }) => {
      return debounce(
        (content: string) =>
          mutate({
            userId: options.userId,
            sequenceId: options.sequenceId,
            body: content,
            type: options.type,
          }),
        5000
      );
    },
    [mutate]
  );

  return { debounceUpdateSequenceBody };
}
