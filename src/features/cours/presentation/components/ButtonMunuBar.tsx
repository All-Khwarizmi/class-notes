import { cn } from "@/lib/utils";
import { useCurrentEditor } from "@tiptap/react";
import { Bold } from "lucide-react";

export default function ButtonMenuBar() {
  const { editor } = useCurrentEditor();

  if (!editor) {
    return null;
  }
  return (
    <button
      onClick={() => editor.chain().focus().toggleBold().run()}
      disabled={!editor.can().chain().focus().toggleBold().run()}
      className={cn(
        editor.isActive("bold") ? "is-active" : "",
        "bg-slate-400 rounded-md p-1 px-2"
      )}
    >
      <Bold size={12} />
    </button>
  );
}
