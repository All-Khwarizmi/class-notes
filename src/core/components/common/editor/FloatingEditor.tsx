"use client";
import React from "react";
import { EditorContent, FloatingMenu, useEditor } from "@tiptap/react";
import { EXTENSIONS } from "@/core/components/constants/editor-extenstions";
import { DebouncedFunc } from "lodash";
import FloatingMenuBar from "@/core/components/common/editor/FloatingMenuBar";

function FloatingEditor(props: {
  content: string;
  debounceUpdateFn: DebouncedFunc<(content: string) => void>;
  afterMenuBar?: React.ReactNode;
}) {
  const editor = useEditor({
    extensions: EXTENSIONS,
    content: props.content,
    onUpdate: (editor) => {
      const content = editor.editor.getHTML();
      props.debounceUpdateFn(content);
    },
  });

  return (
    <>
      {editor && (
        <>
          <FloatingMenu editor={editor}>
            <FloatingMenuBar editor={editor} />
          </FloatingMenu>
          <EditorContent editor={editor} />
          {props.afterMenuBar}
        </>
      )}
    </>
  );
}

export default FloatingEditor;
