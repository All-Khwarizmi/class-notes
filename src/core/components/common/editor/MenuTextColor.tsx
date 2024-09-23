import { Editor } from "@tiptap/react";
import { HexColorPicker } from "react-colorful";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/core/components/ui/popover";

import { useState } from "react";
import { Pipette } from "lucide-react";
export default function MenuTextColor(props: { editor: Editor }) {
  const editor = props.editor;
  const [color, setColor] = useState("#aabbcc");

  function setTextColor(color: string) {
    editor!.chain().focus().setColor(color).run();
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          className="flex items-center justify-center w-8 h-8 rounded-md border border-input bg-transparent hover:bg-accent hover:text-accent-foreground"
          aria-label="Text color"
        >
          <Pipette size={12} />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-full">
        <HexColorPicker color={color} onChange={setColor} />
        <button
          className="flex bg-slate-400 justify-center rounded-md p-1 px-2 mt-2 w-full"
          onClick={() => {
            setTextColor(color);
          }}
        >
          <Pipette size={12} />
        </button>
      </PopoverContent>
    </Popover>
  );
}
