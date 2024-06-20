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
      : '<p style="text-align: center"></p><p style="text-align: center"><img src="https://assets-global.website-files.com/645a9acecda2e0594fac6126/6580a563d237ee85c9237ccb_gradient-noise-purple-azure.png" alt="Placeholder Image" width="327" height="auto style="></p><p><br></p><p></p><h2 style="text-align: center">🔥🔥 Welcome to Your Editor</h2><p style="text-align: center"></p><h4>To get started, try the following:</h4><ul><li><p><strong>Bold</strong> your text by selecting it and pressing <code>Ctrl+B</code>.</p></li><li><p><em>Italicize</em> your text by selecting it and pressing <code>Ctrl+I</code>.</p></li><li><p>Add links to enrich your content.</p></li></ul><blockquote><h4>This is a blockquote. Use it to highlight important information or quotes.</h4></blockquote><h4>Start typing to explore more features!</h4>';
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
              duration: 100,
              delay: 1,
            }}
            shouldShow={({ state }) => {
              const { selection } = state;
              const { from, to, empty } = selection;
              const { doc } = state;

              // Check if there is content selected
              const hasContentSelected = from !== to;

              // Check if the cursor is on an empty line
              const isEmptyLine =
                empty && doc.textBetween(from - 1, to + 1).trim().length === 0;

              // Check if the last character is a /
              const isSlash = doc.textBetween(from - 1, to).trim() === "/";

              // Show the menu if content is selected or if on an empty line
              return hasContentSelected || isSlash || isEmptyLine;
            }}
          >
            <FloatingMenuBar editor={editor} />
          </FloatingMenu>
          <EditorContent editor={editor} />
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
