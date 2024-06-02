import { Note } from "@/features/notes/domain/notes-schemas";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { notesUsecases } from "../../usecases/note-usecases";
import { isLeft } from "fp-ts/lib/Either";
import { useRouter } from "next/navigation";
function useAddProfileNote() {
  const [noteOptions, setNoteOptions] = useState<Omit<Note, "id"> | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (noteOptions) {
      const loadingToast = toast.loading("Adding note...", {
        position: "top-center",
      });
      notesUsecases.createNote({ note: noteOptions }).then((eitherNote) => {
        if (isLeft(eitherNote)) {
              toast.error("Error adding note", {
            position: "top-center",
          });
          
        } else {
        toast.success("Note added successfully", {
          position: "top-center",
        });
        router.refresh();
        }
        toast.dismiss(loadingToast);
      });
    }
  }, [noteOptions]);

  return {
    setNoteOptions,
  };
}

export default useAddProfileNote;
