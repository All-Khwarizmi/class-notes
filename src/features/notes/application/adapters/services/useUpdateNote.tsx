import { Note } from "@/features/notes/domain/notes-schemas";
import { isLeft } from "fp-ts/lib/Either";
import { useMutation } from "@tanstack/react-query";
import saveNote from "../actions/save-note";
import { toastWrapper } from "@/core/utils/toast-wrapper";
import { QUERY_KEYS } from "@/core/query/ query-keys";

function useUpdateNote() {
  return useMutation({
    mutationKey: [QUERY_KEYS.NOTES.UPDATE],
    mutationFn: async (note: Note) => {
      const result = await saveNote({
        note,
      });
      if (isLeft(result)) {
        return toastWrapper.error("Erreur lors de la sauvegarde de la note");
      }
      toastWrapper.success("Note sauvegardée");
      return result.right;
    },
  });
}

export default useUpdateNote;
