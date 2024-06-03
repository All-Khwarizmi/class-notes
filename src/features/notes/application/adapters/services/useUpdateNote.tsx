import { Note } from "@/features/notes/domain/notes-schemas";
import React, { useEffect } from "react";
import { notesUsecases } from "../../usecases/note-usecases";
import { isLeft } from "fp-ts/lib/Either";
import router from "next/router";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
function useUpdateNote() {
  const [note, setNote] = React.useState<Note | null>(null);
  const router = useRouter();
  useEffect(() => {
    if (note) {
      const loadingToast = toast.loading("Updating note...", {
        position: "top-center",
      });
      notesUsecases.updateNote({ note }).then((eitherNote) => {
        if (isLeft(eitherNote)) {
          toast.error("Error updating note", {
            position: "top-center",
          });
        } else {
          toast.success("Note updated successfully", {
            position: "top-center",
          });
          router.refresh();
        }
        toast.dismiss(loadingToast);
      });
    }
  }, [note]);
  return {
    setNote,
  };
}

export default useUpdateNote;
