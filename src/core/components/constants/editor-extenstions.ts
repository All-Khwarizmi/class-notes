import StarterKit from "@tiptap/starter-kit";
import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import { ResizableImage } from "mui-tiptap";
import { TextAlign } from "@tiptap/extension-text-align";

export const EXTENSIONS = [
  TextAlign,
  TextAlign.configure({
    types: ["heading", "paragraph", "img"],
    alignments: ["left", "center", "right", "justify"],
    defaultAlignment: "left",
  }),
  ResizableImage,
  ResizableImage.configure({
    
    inline: true,
    HTMLAttributes: {

    },
  }),

  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  TextStyle,
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
  }),
];
