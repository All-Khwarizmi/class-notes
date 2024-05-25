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
}: {
  children: React.ReactNode;
}) {
  return (
    <EditorProvider
      autofocus
      content={`
    <h1>Heading 1</h1>
    <p>This is a paragraph</p>
    <ul>
      <li>This is a bullet list</li>
    </ul>
    <ol>
      <li>This is an ordered list</li>
    </ol>

     <img src="https://source.unsplash.com/8xznAGy4HcY/800x400" />


    `}
      slotBefore={<MenuBar />}
      extensions={extensions}
    >
      {children}
    </EditorProvider>
  );
}
