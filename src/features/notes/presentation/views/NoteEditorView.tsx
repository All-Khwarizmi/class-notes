"use client";
import React, { useCallback, useEffect } from "react";
import { Note } from "../../domain/notes-schemas";
import useUpdateNote from "../../application/adapters/services/useUpdateNote";
import { EditorContent, FloatingMenu, useEditor } from "@tiptap/react";
import { EXTENSIONS } from "@/core/components/constants/editor-extenstions";
import { debounce } from "lodash";
import FloatingMenuBar from "@/core/components/common/editor/FloatingMenuBar";
import { toast } from "sonner";

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
        5000,
        { leading: false, trailing: true }
      ),
    [props.note, setNote]
  );
  const editor = useEditor({
    extensions: EXTENSIONS,
    content: props.note.content,
    onUpdate: (editor) => {
      const content = editor.editor.getHTML();
      debounceSaveNote()(content);
    },
    
  });

  useEffect(() => {
    if (isSuccess) {
      toast.success("Note updated");
      console.log("Note updated");
    }
  }, [isSuccess]);
  return (
    <>
      {editor && (
        <>
          <FloatingMenu editor={editor}>
            <FloatingMenuBar editor={editor} />
          </FloatingMenu>
          <EditorContent editor={editor} />
        </>
      )}
    </>
  );
}

export default NoteEditorView;
