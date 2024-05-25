import { useCurrentEditor } from "@tiptap/react";
import { HexColorPicker } from "react-colorful";
import { Button } from "@/core/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/core/components/ui/dropdown-menu";
import { useState } from "react";
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
        <Button variant="outline">Text color</Button>
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
