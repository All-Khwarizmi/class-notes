"use client";
import React from "react";
import { Note } from "../../domain/notes-schemas";
import Editor from "@/core/components/common/editor/Editor";
import UpdateNoteButton from "../components/UpdateNote";
import useUpdateNote from "../../application/adapters/services/useUpdateNote";
import { cn } from "@/lib/utils";
import AfterMenuBar from "@/core/components/common/editor/AfterMunuBar";

function NoteEditorView(props: { note: Note }) {
  const { setNote } = useUpdateNote();
  return (
    <Editor
      onUpdate={(content) => {
        setNote({
          ...props.note,
          content: content,
        });
      }}
      content={props.note.content}
      slotafter={
        <AfterMenuBar>
          <UpdateNoteButton note={props.note} />
        </AfterMenuBar>
      }
    />
  );
}

export default NoteEditorView;
