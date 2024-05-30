import { Image } from "lucide-react";
import { useCurrentEditor } from "@tiptap/react";

export default function MenuImage() {
  const { editor } = useCurrentEditor();

  if (!editor) {
    return null;
  }

  function insertImage() {
    const url = window.prompt("URL");

    if (url) {
      editor!.chain().focus().setImage({ src: url }).run();
    }
  }
  return (
    <button
      onClick={insertImage}
      className="bg-slate-400 rounded-md p-1 px-2"
    >
      <Image size={12} />
    </button>
  );
}
