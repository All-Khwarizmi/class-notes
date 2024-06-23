import { useMutation } from "@tanstack/react-query";
import { fetchMutation } from "convex/nextjs";
import { api } from "../../../../../../convex/_generated/api";
import { Id } from "../../../../../../convex/_generated/dataModel";

export default function useAddStudent() {
  return useMutation({
    mutationKey: ["add-student"],
    mutationFn: async (student: { name: string; classId: string }) => {
      return fetchMutation(api.students.createStudent, {
        name: student.name,
        classId: student.classId as Id<"Classes">,
      });
    },
  });
}
