import { cn } from "@/lib/utils";
import { useCurrentEditor } from "@tiptap/react";
import { Bold, Heading, Italic, Menu } from "lucide-react";
import { Button } from "@/core/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/core/components/ui/dropdown-menu";
import ButtonMenuBar from "./ButtonMunuBar";
import { HeadingMenuBar } from "./HeadingMenuBar";
import MenuTextColor from "./MenuTextColor";

export const MenuBar = () => {
  const { editor } = useCurrentEditor();

  if (!editor) {
    return null;
  }

  return (
    <div className="flex gap-1 flex-wrap py-4">
      <ButtonMenuBar />

      <HeadingMenuBar />

      <MenuTextColor />
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={cn(
          editor.isActive("italic") ? "is-active" : "",
          "bg-slate-400 rounded-md p-1 px-2"
        )}
      >
        <Italic size={12} />
      </button>

      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive("bulletList") ? "is-active" : ""}
      >
        bullet list
      </button>

      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive("orderedList") ? "is-active" : ""}
      >
        ordered list
      </button>

      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={editor.isActive("blockquote") ? "is-active" : ""}
      >
        blockquote
      </button>

      <button onClick={() => editor.chain().focus().setHorizontalRule().run()}>
        horizontal rule
      </button>

      <button onClick={() => editor.chain().focus().setHardBreak().run()}>
        hard break
      </button>

      <button
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
      >
        undo
      </button>

      <button
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
      >
        redo
      </button>

      <button
        onClick={() => editor.chain().focus().setColor("#958DF1").run()}
        className={
          editor.isActive("textStyle", { color: "#958DF1" }) ? "is-active" : ""
        }
      >
        purple
      </button>

      {/* <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={editor.isActive("heading", { level: 1 }) ? "is-active" : ""}
      >
        h1
      </button>

      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={editor.isActive("heading", { level: 2 }) ? "is-active" : ""}
      >
        h2
      </button>

      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={editor.isActive("heading", { level: 3 }) ? "is-active" : ""}
      >
        h3
      </button> */}

      {/* <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={editor.isActive("strike") ? "is-active" : ""}
      >
        strike
      </button> */}

      {/* <button
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={!editor.can().chain().focus().toggleCode().run()}
        className={editor.isActive("code") ? "is-active" : ""}
      >
        code
      </button> */}

      {/* <button onClick={() => editor.chain().focus().unsetAllMarks().run()}>
        clear marks
      </button> */}

      {/* <button onClick={() => editor.chain().focus().clearNodes().run()}>
        clear nodes
      </button> */}

      {/* <button
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={editor.isActive("codeBlock") ? "is-active" : ""}
      >
        code block
      </button> */}

      {/* <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        className={editor.isActive("heading", { level: 4 }) ? "is-active" : ""}
      >
        h4
      </button> */}

      {/* <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
        className={editor.isActive("heading", { level: 5 }) ? "is-active" : ""}
      >
        h5
      </button> */}

      {/* <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
        className={editor.isActive("heading", { level: 6 }) ? "is-active" : ""}
      >
        h6
      </button> */}

      {/* <button
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={editor.isActive("paragraph") ? "is-active" : ""}
      >
        paragraph
      </button> */}
    </div>
  );
};
