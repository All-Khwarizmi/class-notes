import React from "react";
import useUpdateCoursBody from "../../../../features/cours-sequence/application/usecases/services/useUpdateCoursBody";
import { Cours } from "../../../../features/cours-sequence/domain/entities/cours-schemas";
import { useCurrentEditor } from "@tiptap/react";
import AfterMenuButton from "./AfterMenuButton";
import { Save } from "lucide-react";

function CoursSaveButton({ cours, userId }: { cours: Cours; userId: string }) {
  const { setUpdateCoursBodyOptions } = useUpdateCoursBody();
  const { editor } = useCurrentEditor();
  if (!editor) {
    return null;
  }
  return (
    <AfterMenuButton
      props={{
        onClick: () => {
          setUpdateCoursBodyOptions({
            userId,
            coursId: cours._id,
            body: editor.getHTML(),
          });
        },
      }}
    >
      <Save size={12} />
    </AfterMenuButton>
  );
}

export default CoursSaveButton;
