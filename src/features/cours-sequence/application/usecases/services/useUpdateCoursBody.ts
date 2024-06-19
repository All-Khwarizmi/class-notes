import { toast } from "sonner";
import { isLeft } from "fp-ts/lib/Either";
import { useMutation } from "@tanstack/react-query";
import updateCourseBody from "../../adapters/actions/update-course-body";

export default function useUpdateCoursBody() {
  return useMutation({
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
}
