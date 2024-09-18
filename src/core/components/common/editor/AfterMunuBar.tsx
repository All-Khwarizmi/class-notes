import React from "react";
import { Editor } from "@tiptap/react";
import { cn } from "@/lib/utils";

interface AfterMenuBarProps {
  children?: React.ReactNode;
  editor: Editor;
}

function AfterMenuBar({ children, editor }: AfterMenuBarProps) {
  return (
    <div
      className={cn(
        "flex flex-wrap justify-center gap-2 p-3 bg-muted rounded-b-lg transition-colors duration-200",
        editor.isFocused ? "ring-2 ring-primary" : "border border-border"
      )}
      role="toolbar"
      aria-label="Additional editor controls"
    >
      {children}
    </div>
  );
}

export default AfterMenuBar;
