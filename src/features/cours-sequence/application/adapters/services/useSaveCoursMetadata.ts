import { Cours } from "@/features/cours-sequence/domain/entities/cours-schemas";
import { coursUsecases } from "../../usecases/cours-usecases";
import { isLeft } from "fp-ts/lib/Either";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/core/query/ query-keys";
import { toastWrapper } from "@/core/utils/toast-wrapper";
export type CoursMetadata = Pick<
  Cours,
  "description" | "category" | "name" | "competences" | "imageUrl"
>;

export interface SaveCoursMetadataOptions {
  cours: CoursMetadata;
  userId: string;
  sequenceId: string;
  publish?: boolean;
}

export default function useSaveCoursMetadata() {
  const router = useRouter();
  return useMutation({
    mutationKey: [QUERY_KEYS.COURS.CREATE()],
    mutationFn: async (options: SaveCoursMetadataOptions) => {
      return coursUsecases.addCours({
        cours: {
          ...options.cours,
          sequenceId: options.sequenceId,
          body: "",
          lessons: [],
          createdBy: options.userId,
          publish: options.publish ?? false,
        },
        userId: options.userId,
      });
    },
    onSuccess: (eitherCours) => {
      if (isLeft(eitherCours)) {
        toastWrapper.error("An error occurred");
        return;
      }
      toastWrapper.success("Cours created successfully");
      router.push(`/cours/${eitherCours.right}`);
    },
  });
}
