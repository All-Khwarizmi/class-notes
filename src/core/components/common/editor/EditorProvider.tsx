"use client";
import { EditorProvider } from "@tiptap/react";

import { MenuBar } from "./MenuBar";
import { EXTENSIONS } from "@/core/components/constants/editor-extenstions";

export default function EditorProviderWrapper({
  children,
  content,
}: {
  content: string;
  children: React.ReactNode;
}) {
  return (
    <EditorProvider
      autofocus
      content={content}
      slotBefore={<MenuBar />}
      extensions={EXTENSIONS}
    >
      {children}
    </EditorProvider>
  );
}
