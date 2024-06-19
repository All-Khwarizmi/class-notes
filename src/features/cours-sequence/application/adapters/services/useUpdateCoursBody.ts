import { toast } from "sonner";
import { isLeft } from "fp-ts/lib/Either";
import { useMutation } from "@tanstack/react-query";
import updateCourseBody from "../actions/update-course-body";
import { debounce } from "lodash";
import { useCallback } from "react";

export default function useUpdateCoursBody() {
  const { mutate } = useMutation({
    mutationKey: ["update-course-body"],
    mutationFn: async (options: {
      userId: string;
      coursId: string;
      body: string;
    }) => {
      const result = await updateCourseBody(options);
      if (isLeft(result)) {
        toast.error("Failed to update the course body");
      } else {
        toast.success("Course body updated successfully");
      }
    },
  });
  const debounceUpdateCoursBody = useCallback(
    (options: { userId: string; coursId: string }) => {
      return debounce(
        (content: string) =>
          mutate({
            userId: options.userId,
            coursId: options.coursId,
            body: content,
          }),
        5000
      );
    },
    [mutate]
  );
  return { debounceUpdateCoursBody };
}
