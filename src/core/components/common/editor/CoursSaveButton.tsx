import { Button } from "@/core/components/ui/button";
import React from "react";
import useUpdateCoursBody from "../../../../features/cours-sequence/application/usecases/services/useUpdateCoursBody";
import { Cours } from "../../../../features/cours-sequence/domain/entities/cours-schemas";
import { useCurrentEditor } from "@tiptap/react";

function CoursSaveButton({ cours, userId }: { cours: Cours; userId: string }) {
  const { setUpdateCoursBodyOptions } = useUpdateCoursBody();
  const { editor } = useCurrentEditor();
  if (!editor) {
    return null;
  }
  return (
    <Button
      className="mt-2"
      onClick={() => {
        setUpdateCoursBodyOptions({
          userId,
          coursId: cours._id,
          body: editor.getHTML(),
        });
      }}
    >
      Save
    </Button>
  );
}

export default CoursSaveButton;
