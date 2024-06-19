"use client";
import React from "react";
import { Note } from "../../domain/notes-schemas";
import Editor from "@/core/components/common/editor/Editor";
import UpdateNoteButton from "../components/UpdateNote";
import useUpdateNote from "../../application/adapters/services/useUpdateNote";
import { cn } from "@/lib/utils";
import AfterMenuBar from "@/core/components/common/editor/AfterMunuBar";
import { EditorContent, FloatingMenu, useEditor } from "@tiptap/react";
import { EXTENSIONS } from "@/core/components/constants/editor-extenstions";
import { debounce } from "lodash";
import FloatingMenuBar from "@/core/components/common/editor/FloatingMenuBar";

function NoteEditorView(props: { note: Note }) {
  const { setNote } = useUpdateNote();
  const debouncedUpdate = debounce((content: string) => {
    setNote({
      ...props.note,
      content: content,
    });
  }, 10000);
  const editor = useEditor({
    extensions: EXTENSIONS,
    content: props.note.content,
    onUpdate: (editor) => {
      const content = editor.editor.getHTML();
      debouncedUpdate(content);
    },
  });
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
