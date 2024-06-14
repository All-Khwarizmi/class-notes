"use client";
import React from "react";
import { Note } from "../../domain/notes-schemas";
import Editor from "@/core/components/common/editor/Editor";
import UpdateNoteButton from "../components/UpdateNote";
import useUpdateNote from "../../application/adapters/services/useUpdateNote";

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
        <div className=" flex flex-col gap-4 ">
          <UpdateNoteButton note={props.note} />
        </div>
      }
    />
  );
}

export default NoteEditorView;
