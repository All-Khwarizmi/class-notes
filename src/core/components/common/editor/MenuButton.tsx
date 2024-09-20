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
        "flex items-center justify-center w-8 h-8 rounded-md border border-input bg-transparent hover:bg-accent hover:text-accent-foreground"
      )}
      aria-label={nodeName}
    >
      {children}
    </button>
  );
}

export default MenuButton;
