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
  const contentOrPlaceholder =
    props.content !== ""
      ? props.content
      : '<h2 style="text-align: center">Welcome to Your Editor</h2><p>Start typing to create your content. Try out different formatting options:</p><ul><li><strong>Bold</strong></li><li><em>Italic</em></li><li>Lists</li></ul><blockquote>Use blockquotes for important information.</blockquote>';
  const editor = useEditor({
    extensions: EXTENSIONS,
    content: contentOrPlaceholder,
    onUpdate: (editor) => {
      const content = editor.editor.getHTML();
      props.debounceUpdateFn(content);
    },
  });

  return (
    <>
      {editor && (
        <>
          <FloatingMenu
            editor={editor}
            tippyOptions={{
              duration: 300,
              offset: [0, 50],
              placement: "top",
            }}
            shouldShow={({ state, view }) => {
              const { selection } = state;
              const { empty } = selection;
              // Keep a distance from the cursor
              // to prevent the menu from blocking the cursor itself

              //Any of this checks if moving to the given direction, the cursor will be at the end of the textblock
              const right = view.endOfTextblock("right");
              const left = view.endOfTextblock("left");

              // Show the menu if content is selected or if on an empty line
              // empty is true when content is not selected
              // right and left are true when cursor is at the beginning of a new line
              const shouldShow = !empty || (right && left);

              return shouldShow;
            }}
          >
            <FloatingMenuBar editor={editor} />
          </FloatingMenu>
          <EditorContent className="h-[85vh] overflow-scroll" editor={editor} />
          {props.afterMenuBar && (
            <div className="flex flex-col gap-4 ">
              <AfterMenuBar editor={editor}>{props.children}</AfterMenuBar>
            </div>
          )}
        </>
      )}
    </>
  );
}

export default FloatingEditor;
