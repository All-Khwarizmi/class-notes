import { useMutation } from "@tanstack/react-query";
import updateGrade from "../actions/update-grade";
import { UpdateGradeOptions } from "@/features/evaluation/domain/entities/evaluation-types";
import { revalidatePath } from "next/cache";

export default function useUpdateGrade() {
  return useMutation({
    mutationKey: ["update-grade"],
    mutationFn: async (options: {
      options: UpdateGradeOptions;
      classeId: string;
    }) => {
      return updateGrade(options.options);
    },
    onSuccess: (
      _,
      variables: { classeId: string; options: UpdateGradeOptions }
    ) => {
      //! Revalidate the cache for the classes page
      const path = `/classes/class/${variables.classeId}`;
      console.log("Revalidating path", path);
      revalidatePath(path, "page");
    },
  });
}
