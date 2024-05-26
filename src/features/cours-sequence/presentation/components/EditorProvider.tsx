"use client";

import { EditorProvider, useCurrentEditor, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import { MenuBar } from "./MenuBar";
import Image from "@tiptap/extension-image";

const extensions = [
  Image,
  Image.configure({
    inline: true,
    HTMLAttributes: {
      class: "w-max-72",
    },
  }),
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  TextStyle.configure({ types: [ListItem.name] }),
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
  }),
];
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
      extensions={extensions}
    >
      {children}
    </EditorProvider>
  );
}
