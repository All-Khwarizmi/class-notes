"use client";
import { EditorContent, useEditor } from "@tiptap/react";
import { EXTENSIONS } from "@/core/components/constants/editor-extenstions";

function ShowSequence({ content }: { content: string }) {
  const editor = useEditor({
    editable: false,
    content,
    extensions: EXTENSIONS,
  });

  if (!editor) {
    return null;
  }

  return (
    <>
      <EditorContent editor={editor} />
    </>
  );
}

export default ShowSequence;
