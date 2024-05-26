import { Button } from "@/core/components/ui/button";
import React from "react";
import { useCurrentEditor } from "@tiptap/react";
import { Sequence } from "../../domain/entities/cours-schemas";
import useUpdateSequenceBody from "../../application/usecases/services/useUpdateSequenceBody";

function SaveSequenceBodyButton({
  sequence,
  userId,
}: {
  sequence: Sequence;
  userId: string;
}) {
  const { editor } = useCurrentEditor();
  const { setUpdateSequenceBodyOptions } = useUpdateSequenceBody();
  if (!editor) {
    return null;
  }
  return (
    <Button
      className="mt-2"
      onClick={() => {
        setUpdateSequenceBodyOptions({
          userId,
          sequenceId: sequence._id,
          body: editor.getHTML(),
        });
      }}
    >
      Save
    </Button>
  );
}

export default SaveSequenceBodyButton;
