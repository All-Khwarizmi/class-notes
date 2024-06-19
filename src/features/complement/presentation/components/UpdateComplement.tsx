import AfterMenuButton from "@/core/components/common/editor/AfterMenuButton";
import { useCurrentEditor } from "@tiptap/react";
import { Save } from "lucide-react";
import React from "react";
import useUpdateComplement from "../../application/adapters/services/useUpdateComplement";
import { Complement } from "../../domain/complement-schemas";

function UpdateComplement(props: { complement: Complement }) {
  const { debounceUpdateComplement } = useUpdateComplement();

  const { editor } = useCurrentEditor();
  if (!editor) {
    return null;
  }
  return (
    <AfterMenuButton
      props={{
        onClick: () => {
          const prevContent = props.complement.body;
          const currentContent = editor.getHTML();
          if (prevContent === currentContent) {
            return alert("No changes to save");
          }
          debounceUpdateComplement(props.complement)(currentContent);
        },
      }}
    >
      <Save size={12} />
    </AfterMenuButton>
  );
}

export default UpdateComplement;
