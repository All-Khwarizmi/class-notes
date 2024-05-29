import { Button } from "@/core/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/core/components/ui/dropdown-menu";
import { useCurrentEditor } from "@tiptap/react";
import { Level } from "@tiptap/extension-heading";
import { cn } from "@/lib/utils";
import { Heading } from "lucide-react";

export function HeadingMenuBar() {
  const { editor } = useCurrentEditor();

  if (!editor) {
    return null;
  }

  function setHeading(level: Level) {
    editor!.chain().focus().setHeading({ level }).run();
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            editor.isActive("bold") ? "is-active" : "",
            "bg-slate-400 rounded-md p-1 px-2"
          )}
        >
          <Heading size={12} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Paragraph</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={() => setHeading(1)} className="text-4xl">
          Heading 1
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setHeading(2)} className="text-3xl">
          Heading 2
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setHeading(3)} className="text-2xl">
          Heading 3
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setHeading(4)} className="text-xl">
          Heading 4
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setHeading(5)}>
          Heading 5
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setHeading(6)}>
          Heading 6
        </DropdownMenuItem>

        <DropdownMenuSeparator />
        <DropdownMenuItem>
          Log out
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
