import { Note } from "@/features/notes/domain/notes-schemas";
import { isLeft } from "fp-ts/lib/Either";
import { useMutation } from "@tanstack/react-query";
import saveNote from "../actions/save-note";

function useUpdateNote() {
  return useMutation({
    mutationKey: ["update-note"],
    mutationFn: async (note: Note) => {
      const result = await saveNote({
        note,
      });
      if (isLeft(result)) {
        throw new Error(result.left.message);
      }
      return result.right;
    },
  });
}

export default useUpdateNote;
