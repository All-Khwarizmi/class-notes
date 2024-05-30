import { useCurrentEditor } from "@tiptap/react";
import { HexColorPicker } from "react-colorful";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/core/components/ui/dropdown-menu";
import { useState } from "react";
import { Pipette } from "lucide-react";
export default function MenuTextColor() {
  const [color, setColor] = useState("#aabbcc");
  const { editor } = useCurrentEditor();
  if (!editor) {
    return null;
  }

  function setTextColor(color: string) {
    editor!.chain().focus().setColor(color).run();
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="bg-slate-400 rounded-md p-1 px-2">
          <Pipette size={12} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Text color</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="flex items-center gap-2">
          <HexColorPicker
            color={color}
            onChange={(color) => setTextColor(color)}
          />
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
