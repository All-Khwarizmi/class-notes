import { useCurrentEditor } from "@tiptap/react";
import {
  Code,
  Indent,
  IndentDecrease,
  Italic,
  List,
  ListOrdered,
  Quote,
  Redo,
  Strikethrough,
  Undo,
  Video,
} from "lucide-react";

import MenuBold from "./MenuBold";
import { HeadingMenuBar } from "./HeadingMenuBar";
import MenuTextColor from "./MenuTextColor";
import MenuImage from "./MenuImage";
import MenuButton from "@/core/components/common/editor/MenuButton";
import MenuTextAlign from "@/core/components/common/editor/MenuTextAlign";
import { cn } from "@/lib/utils";

export const MenuBar = () => {
  const { editor } = useCurrentEditor();

  if (!editor) {
    return null;
  }

  return (
    <div
      className={cn(
        "flex gap-1 flex-wrap p-2 bg-muted  border rounded-tr-lg rounded-tl-lg",
        `${editor.isFocused ? "border-blue-300 border-2" : "border-gray-600"}`
      )}
    >
      <MenuBold />

      <HeadingMenuBar />

      <MenuTextColor />

      <MenuImage />

      <MenuTextAlign />

      <MenuButton
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        nodeName="italic"
      >
        <Italic size={12} />
      </MenuButton>
      <MenuButton
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        nodeName="bulletList"
      >
        <List size={12} />
      </MenuButton>

      <MenuButton
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        nodeName="orderedList"
      >
        <ListOrdered size={12} />
      </MenuButton>

      <MenuButton
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        nodeName="blockquote"
      >
        <Quote size={12} />
      </MenuButton>

      <MenuButton
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        nodeName="strike"
      >
        <Strikethrough size={12} />
      </MenuButton>

      <MenuButton
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        disabled={!editor.can().chain().focus().toggleCode().run()}
        nodeName="code"
      >
        <Code size={12} />
      </MenuButton>

      <MenuButton
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
        nodeName="undo"
      >
        <Undo size={12} />
      </MenuButton>

      <MenuButton
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
        nodeName="redo"
      >
        <Redo size={12} />
      </MenuButton>
      {/* A butto to handle the identation */}
      <MenuButton
        onClick={() => editor.chain().focus().increaseIndent().run()}
        disabled={!editor.can().chain().focus().increaseIndent().run()}
        nodeName="indent"
      >
        <Indent size={12} />
      </MenuButton>
      <MenuButton
        onClick={() => editor.chain().focus().decreaseIndent().run()}
        disabled={!editor.can().chain().focus().decreaseIndent().run()}
        nodeName="indent"
      >
        <IndentDecrease size={12} />
      </MenuButton>
      <MenuButton
        onClick={() => {
          const videoUrl = prompt("Enter the video URL");
          if (!videoUrl) {
            return;
          }
          editor.commands.setYoutubeVideo({
            src: videoUrl,
            width: 480,
          });
        }}
        nodeName="paragraph"
      >
        <Video size={12} />
      </MenuButton>
    </div>
  );
};
