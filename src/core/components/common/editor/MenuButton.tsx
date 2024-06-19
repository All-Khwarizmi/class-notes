import { cn } from "@/lib/utils";
import { Editor } from "@tiptap/react";
import { useCurrentEditor } from "@tiptap/react";
import React from "react";

/**
 * @deprecated This component is deprecated and should not be used.
 */
function MenuButton({
  onClick,
  disabled,
  nodeName,
  children,
  editor,
}: {
  onClick: () => void;
  disabled?: boolean;
  nodeName: string;
  children: React.ReactNode;
  editor: Editor;
}) {

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        editor.isActive(nodeName) ? "is-active" : "",
        "bg-slate-400 rounded-md p-1 px-2"
      )}
    >
      {children}
    </button>
  );
}

export default MenuButton;
