import { useMutation } from "@tanstack/react-query";
import deleteNote from "../actions/delete-note";
import { isLeft } from "fp-ts/lib/Either";
import { toast } from "sonner";

export default function useDeleteNote() {
  return useMutation({
    mutationKey: ["delete-note"],
    mutationFn: async (options: {
      noteId: string;
      pathToRevalidate: string;
    }) => {
      const operationResult = await deleteNote({
       noteId: options.noteId,
      });
      if (isLeft(operationResult)) {
        toast.error("Error while deleting note", {
          duration: 3000,
          description: operationResult.left.code,
        });
        return;
      }

      window.location.reload();
    },
  });
}
