import AfterMenuButton from "@/core/components/common/editor/AfterMenuButton";
import { useCurrentEditor } from "@tiptap/react";
import { Save } from "lucide-react";
import React from "react";
import useUpdateNote from "../../application/adapters/services/useUpdateNote";
import { Note } from "../../domain/notes-schemas";

function UpdateNoteButton(props: { note: Note }) {
  const { setNote } = useUpdateNote();

  const { editor } = useCurrentEditor();
  if (!editor) {
    return null;
  }
  return (
    <AfterMenuButton
      props={{
        onClick: () => {
          const prevContent = props.note.content;
          const currentContent = editor.getHTML();
          if (prevContent === currentContent) {
            return alert("No changes to save");
          }
          setNote({
            ...props.note,
            content: editor.getHTML(),
          });
        },
      }}
    >
      <Save size={12} />
    </AfterMenuButton>
  );
}

export default UpdateNoteButton;
