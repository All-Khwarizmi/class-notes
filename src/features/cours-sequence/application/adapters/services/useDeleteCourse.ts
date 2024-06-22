import { useMutation } from "@tanstack/react-query";
import deleteCourse from "../actions/delete-cours";
import { isLeft } from "fp-ts/lib/Either";
import { toast } from "sonner";

export default function useDeleteCourse() {
  return useMutation({
    mutationKey: ["delete-course"],
    mutationFn: async (options: { coursId: string }) => {
      const operationResult = await deleteCourse(options);
      if (isLeft(operationResult)) {
        toast.error("An error occurred while deleting the course", {
          position: "top-center",
          duration: 3000,
          description: "Please try again later",
        });
        return;
      }
      toast.success("Course deleted successfully", {
        position: "top-center",
        duration: 3000,
      });
    },
  });
}
