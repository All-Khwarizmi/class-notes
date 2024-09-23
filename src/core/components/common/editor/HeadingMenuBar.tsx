import React from "react";
import { Editor } from "@tiptap/react";
import { Level } from "@tiptap/extension-heading";
import { cn } from "@/lib/utils";
import { Type } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/core/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/core/components/ui/select";

interface HeadingOption {
  label: string;
  value: Level | "paragraph";
  className: string;
}

const headingOptions: HeadingOption[] = [
  { label: "Paragraph", value: "paragraph", className: "text-base" },
  { label: "Heading 1", value: 1, className: "text-3xl font-bold" },
  { label: "Heading 2", value: 2, className: "text-2xl font-bold" },
  { label: "Heading 3", value: 3, className: "text-xl font-bold" },
  { label: "Heading 4", value: 4, className: "text-lg font-semibold" },
  { label: "Heading 5", value: 5, className: "text-base font-semibold" },
  { label: "Heading 6", value: 6, className: "text-sm font-semibold" },
];

export function HeadingMenuBar({ editor }: { editor: Editor }) {
  const setHeading = (value: Level | "paragraph") => {
    if (value === "paragraph") {
      editor.chain().focus().setParagraph().run();
    } else {
      editor.chain().focus().setHeading({ level: value }).run();
    }
  };

  const getCurrentHeading = (): Level | "paragraph" => {
    for (let i = 1; i <= 6; i++) {
      if (editor.isActive("heading", { level: i as Level })) {
        return i as Level;
      }
    }
    return "paragraph";
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          className="flex items-center justify-center w-8 h-8 rounded-md border border-input bg-transparent hover:bg-accent hover:text-accent-foreground"
          aria-label="Text style"
        >
          <Type className="h-4 w-4" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-56 p-0">
        <Select
          value={getCurrentHeading().toString()}
          onValueChange={(value) =>
            setHeading(
              value === "paragraph" ? "paragraph" : (parseInt(value) as Level)
            )
          }
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select heading" />
          </SelectTrigger>
          <SelectContent>
            {headingOptions.map((option) => (
              <SelectItem
                key={option.value}
                value={option.value.toString()}
                className={cn("cursor-pointer", option.className)}
              >
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </PopoverContent>
    </Popover>
  );
}
