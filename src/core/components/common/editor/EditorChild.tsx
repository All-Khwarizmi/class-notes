"use clent";
import { useCurrentEditor } from "@tiptap/react";

export default function EditorChild({
  children,
}: {
  children: React.ReactNode;
}) {
  const { editor } = useCurrentEditor();

  if (!editor) {
    return null;
  }

  return <>{children}</>;
}
