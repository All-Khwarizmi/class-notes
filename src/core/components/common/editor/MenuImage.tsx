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
    <button onClick={insertImage} className="bg-slate-400 rounded-md p-1 px-2">
      <Image size={12} />
    </button>
  );
}
