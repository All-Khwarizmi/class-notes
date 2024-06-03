import React from "react";
import { Note } from "../../domain/notes-schemas";
import Editor from "@/core/components/common/editor/Editor";

function NoteEditorView(props: { note: Note }) {
  return (
    <Editor
      content={props.note.content}
      slotafter={
        <div className=" flex flex-col gap-4 ">
          <div className="text-sm text-gray-400">{props.note.createdAt}</div>
        </div>
      }
    />
  );
}

export default NoteEditorView;
