import React from "react";
import { useCurrentEditor } from "@tiptap/react";
import { Sequence } from "../../domain/entities/cours-schemas";
import useUpdateSequenceBody from "../../application/usecases/services/useUpdateSequenceBody";
import AfterMenuButton from "@/core/components/common/editor/AfterMenuButton";
import { Save } from "lucide-react";

function SaveSequenceBodyButton({
  sequence,
  userId,
  type,
}: {
  sequence: Sequence;
  userId: string;
  type?: "template" | "sequence";
}) {
  const { editor } = useCurrentEditor();
  const { setUpdateSequenceBodyOptions } = useUpdateSequenceBody();
  if (!editor) {
    return null;
  }
  return (
    <AfterMenuButton
      props={{
        onClick: () => {
          const prevContent = sequence.body;
          const currentContent = editor.getHTML();
          if (prevContent === currentContent) {
            return alert("No changes to save");
          }
          setUpdateSequenceBodyOptions({
            userId,
            sequenceId: sequence._id,
            body: editor.getHTML(),
            type,
          });
        },
      }}
    >
      <Save size={14} />
    </AfterMenuButton>
  );
}

export default SaveSequenceBodyButton;
//   onClick={() => {
//   setUpdateSequenceBodyOptions({
//     userId,
//     sequenceId: sequence._id,
//     body: editor.getHTML(),
//   });
// }}
