import { cn } from "@/lib/utils";
import { Editor } from "@tiptap/react";
import React from "react";

function AfterMenuBar(props: { children?: React.ReactNode; editor: Editor }) {
  return (
    <div
      className={cn(
        "flex gap-1 flex-wrap p-2 bg-muted justify-center border rounded-br-lg rounded-bl-lg",
        `${
          props.editor.isFocused
            ? "border-blue-300 border-2"
            : "border-gray-600"
        }`
      )}
    >
      {props.children}
    </div>
  );
}
export default AfterMenuBar;
