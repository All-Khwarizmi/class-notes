"use client";
import React from "react";
import { EditorContent, FloatingMenu, useEditor } from "@tiptap/react";
import { EXTENSIONS } from "@/core/components/constants/editor-extenstions";
import { DebouncedFunc } from "lodash";
import FloatingMenuBar from "@/core/components/common/editor/FloatingMenuBar";
import AfterMenuBar from "./AfterMunuBar";

function FloatingEditor(props: {
  content: string;
  debounceUpdateFn: DebouncedFunc<(content: string) => void>;
  afterMenuBar?: boolean;
  children?: React.ReactNode;
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
          {props.afterMenuBar && (
            <div className="flex flex-col gap-4 ">
              <AfterMenuBar
                editor={editor}
              >{props.children}</AfterMenuBar>
            </div>
          )}
        </>
      )}
    </>
  );
}

export default FloatingEditor;
