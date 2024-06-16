import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/core/components/ui/dropdown-menu";
import { useCurrentEditor } from "@tiptap/react";
import { cn } from "@/lib/utils";
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Heading,
} from "lucide-react";

import React from "react";

function MenuTextAlign() {
  const { editor } = useCurrentEditor();

  if (!editor) {
    return null;
  }

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
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            className={cn(
              editor.isActive("align") ? "is-active" : "",
              "bg-slate-400 rounded-md py-2 px-2"
            )}
          >
            {whichAlignement()}
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Paragraph</DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuItem
            onClick={() => setAlignement("left")}
            className="text-4xl"
          >
            <AlignLeft size={12} />
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setAlignement("center")}
            className="text-3xl"
          >
            <AlignCenter size={12} />
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setAlignement("right")}
            className="text-2xl"
          >
            <AlignRight size={12} />
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setAlignement("justify")}
            className="text-xl"
          >
            <AlignJustify size={12} />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default MenuTextAlign;
