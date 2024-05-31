import { cn } from "@/lib/utils";
import { useCurrentEditor } from "@tiptap/react";
import React from "react";

function AfterMenuBar(props: { children?: React.ReactNode }) {
  const { editor } = useCurrentEditor();

  if (!editor) {
    return null;
  }
  return (
    <div
      className={cn(
        "flex gap-1 flex-wrap p-2 bg-muted  border rounded-br-lg rounded-bl-lg",
        `${editor.isFocused ? "border-blue-300 border-2" : "border-gray-600"}`
      )}
    >
      {props.children}
    </div>
  );
}
export default AfterMenuBar;
