import { Sequence } from "@/features/cours-sequence/domain/entities/cours-schemas";
import { coursUsecases } from "../../usecases/cours-usecases";
import { isLeft } from "fp-ts/lib/Either";
import { useRouter } from "next/navigation";
import { QUERY_KEYS } from "@/core/query/ query-keys";
import { useMutation } from "@tanstack/react-query";
import { toastWrapper } from "@/core/utils/toast-wrapper";
export interface UpdateSequenceMetadataOptions {
  sequence: Sequence;
  type?: "sequence" | "template";
}

function useUpdateSequenceMetadata() {
  const router = useRouter();
  return useMutation({
    mutationKey: [QUERY_KEYS.SEQUENCE.UPDATE()],
    mutationFn: async (
      updateSequenceMetadata: UpdateSequenceMetadataOptions
    ) => {
      return coursUsecases.updateSequence({
        sequence: updateSequenceMetadata.sequence,
      });
    },
    onSuccess: async (eitherSequence, variables) => {
      if (isLeft(eitherSequence)) {
        toastWrapper.error("An error occurred");
        return;
      }
      toastWrapper.success("Sequence updated successfully");
      router.push(
        `/sequences/${variables.sequence._id}?type=${variables.type}`
      );
    },
  });
}

export default useUpdateSequenceMetadata;
