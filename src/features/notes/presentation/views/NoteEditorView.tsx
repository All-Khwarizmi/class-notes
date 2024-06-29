"use client";
import React, { useCallback, useEffect } from "react";
import { Note } from "../../domain/notes-schemas";
import useUpdateNote from "../../application/adapters/services/useUpdateNote";
import { debounce } from "lodash";
import { toast } from "sonner";
import FloatingEditor from "@/core/components/common/editor/FloatingEditor";
import { EDITOR_DEBOUNCE_TIME } from "@/core/components/constants/editor-constants";

function NoteEditorView(props: { note: Note }) {
  const { mutate: setNote, isSuccess } = useUpdateNote();
  const debounceSaveNote = useCallback(
    () =>
      debounce(
        (content: string) => {
          setNote({
            ...props.note,
            content,
          });
        },
        EDITOR_DEBOUNCE_TIME,
        { leading: false, trailing: true }
      ),
    [props.note, setNote]
  );

  useEffect(() => {
    if (isSuccess) {
      toast.success("Note updated");
      console.log("Note updated");
    }
  }, [isSuccess]);
  return (
    <FloatingEditor
      content={props.note.content}
      debounceUpdateFn={debounceSaveNote()}
    />
  );
}

export default NoteEditorView;
