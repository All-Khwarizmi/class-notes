import { cn } from "@/lib/utils";
import { useCurrentEditor } from "@tiptap/react";

export default function MenuTextAlignButtons() {
  const { editor } = useCurrentEditor();

  if (!editor) {
    return null;
  }

  return (
    <div className="flex gap-1">
      {["left", "center", "right", "justify"].map((alignment) => (
        <button
          key={alignment}
          onClick={() => editor.chain().focus().setTextAlign(alignment).run()}
          className={cn(
            editor.isActive("textAlign", { alignment }) ? "is-active" : "",
            "bg-slate-400 rounded-md p-1 px-2"
          )}
        >
          {alignment}
        </button>
      ))}
    </div>
  );
}
