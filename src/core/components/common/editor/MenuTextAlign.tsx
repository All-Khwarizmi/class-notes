import { cn } from "@/lib/utils";
import { AlignCenter, AlignJustify, AlignLeft, AlignRight } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/core/components/ui/popover";

import React from "react";
import { Editor } from "@tiptap/react";

function MenuTextAlign(props: { editor: Editor }) {
  const editor = props.editor;
  function setAlignement(align: string) {
    editor!.chain().focus().setTextAlign(align).run();
  }

  function whichAlignement() {
    switch (editor!.getAttributes("textAlign").alignment) {
      case "center":
        return <AlignCenter size={12} />;
      case "right":
        return <AlignRight size={12} />;
      case "justify":
        return <AlignJustify size={12} />;
      default:
        return <AlignLeft size={12} />;
    }
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="bg-slate-400 rounded-md p-1 px-2">
          {whichAlignement()}
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-full flex gap-2">
        <button
          onClick={() => setAlignement("left")}
          className={cn(
            "text-left",
            editor.isActive("textAlign", { alignment: "left" }) &&
              "text-blue-500"
          )}
        >
          <AlignLeft size={12} />
        </button>
        <button
          onClick={() => setAlignement("center")}
          className={cn(
            "text-center",
            editor.isActive("textAlign", { alignment: "center" }) &&
              "text-blue-500"
          )}
        >
          <AlignCenter size={12} />
        </button>
        <button
          onClick={() => setAlignement("right")}
          className={cn(
            "text-right",
            editor.isActive("textAlign", { alignment: "right" }) &&
              "text-blue-500"
          )}
        >
          <AlignRight size={12} />
        </button>
        <button
          onClick={() => setAlignement("justify")}
          className={cn(
            "text-justify",
            editor.isActive("textAlign", { alignment: "justify" }) &&
              "text-blue-500"
          )}
        >
          <AlignJustify size={12} />
        </button>
      </PopoverContent>
    </Popover>
  );
}

export default MenuTextAlign;
