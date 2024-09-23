import { Image } from "lucide-react";
import { Editor } from "@tiptap/react";

export default function MenuImage(props: { editor: Editor }) {
  const editor = props.editor;

  function insertImage() {
    const url = window.prompt("URL");

    if (url) {
      editor!.chain().focus().setImage({ src: url }).run();
    }
  }
  return (
    <button
      onClick={insertImage}
      className="flex items-center justify-center w-8 h-8 rounded-md border border-input bg-transparent hover:bg-accent hover:text-accent-foreground"
      aria-label="Image"
    >
      <Image size={12} />
    </button>
  );
}
