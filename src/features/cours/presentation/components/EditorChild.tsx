"use clent";
import { Button } from "@/core/components/ui/button";
import { useCurrentEditor } from "@tiptap/react";

export default function EditorChild() {
  const { editor } = useCurrentEditor();

  if (!editor) {
    return null;
  }

  return (
    <>
      <Button>Save</Button>
      <Button>Show Content</Button>
      <h2>Content</h2>
      <div>
        <p>{editor.getHTML()}</p>
      </div>
    </>
  );
}
