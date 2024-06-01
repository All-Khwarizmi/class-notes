import AfterMenuButton from "@/core/components/common/editor/AfterMenuButton";
import { useCurrentEditor } from "@tiptap/react";
import { Save } from "lucide-react";
import React from "react";
import useUpdateComplement from "../../application/adapters/services/useUpdateComplement";
import { Complement } from "../../domain/complement-schemas";

function UpdateComplement(props: { complement: Complement }) {
  const { setComplementOptions } = useUpdateComplement();

  const { editor } = useCurrentEditor();
  if (!editor) {
    return null;
  }
  return (
    <AfterMenuButton
      props={{
        onClick: () => {
          setComplementOptions({
            ...props.complement,
            body: editor.getHTML(),
          });
        },
      }}
    >
      <Save size={12} />
    </AfterMenuButton>
  );
}

export default UpdateComplement;
