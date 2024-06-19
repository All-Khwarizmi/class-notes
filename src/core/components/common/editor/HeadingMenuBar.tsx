import { Editor } from "@tiptap/react";
import { Level } from "@tiptap/extension-heading";
import { cn } from "@/lib/utils";
import { Heading } from "lucide-react";
import { Button } from "@/core/components/ui/button";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/core/components/ui/popover";

export function HeadingMenuBar(props: { editor: Editor }) {
  const editor = props.editor;
  function setHeading(level: Level, position?: number) {
    editor!
      .chain()
      .setHeading({ level })
      .focus(
        position !== undefined ? position : editor!.state.selection.$head.pos,
        {
          scrollIntoView: true,
        }
      )

      .run();
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="bg-slate-400 rounded-md p-1 px-2">
          <Heading size={12} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full">
        <div>
          <div className="flex gap-2">
            <Button
              onClick={() => setHeading(1)}
              className={cn(
                "text-3xl",
                editor.isActive("heading", { level: 1 }) && "text-blue-500"
              )}
            >
              H1
            </Button>
            <Button
              onClick={() => setHeading(2)}
              className={cn(
                "text-2xl",
                editor.isActive("heading", { level: 2 }) && "text-blue-500"
              )}
            >
              H2
            </Button>
            <Button
              onClick={() => setHeading(3)}
              className={cn(
                "text-xl",
                editor.isActive("heading", { level: 3 }) && "text-blue-500"
              )}
            >
              H3
            </Button>
            <Button
              onClick={() => setHeading(4)}
              className={cn(
                "text-lg",
                editor.isActive("heading", { level: 4 }) && "text-blue-500"
              )}
            >
              H4
            </Button>
            <Button
              onClick={() => setHeading(5)}
              className={cn(
                "text-md",
                editor.isActive("heading", { level: 5 }) && "text-blue-500"
              )}
            >
              H5
            </Button>
            <Button
              onClick={() => setHeading(6)}
              className={cn(
                "text-sm",
                editor.isActive("heading", { level: 6 }) && "text-blue-500"
              )}
            >
              H6
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
