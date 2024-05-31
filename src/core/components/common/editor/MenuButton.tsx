import { cn } from "@/lib/utils";
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
}: {
  onClick: () => void;
  disabled?: boolean;
  nodeName: string;
  children: React.ReactNode;
}) {
  const { editor } = useCurrentEditor();

  if (!editor) {
    return null;
  }
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
