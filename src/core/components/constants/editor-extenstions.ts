import StarterKit from "@tiptap/starter-kit";
import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import { TextAlign } from "@tiptap/extension-text-align";
import ResizableImageExtension from "../common/editor/ImageResize";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { common, createLowlight } from "lowlight";

const lowlight = createLowlight(common);

export const EXTENSIONS = [
  CodeBlockLowlight.configure({
    lowlight,
  }),
  TextAlign.configure({
    types: ["heading", "paragraph", "img"],
    alignments: ["left", "center", "right", "justify"],
    defaultAlignment: "left",
  }),
  ResizableImageExtension.configure({
    inline: true,
    HTMLAttributes: {},
  }),
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  TextStyle,
  StarterKit.configure({
    codeBlock: false,
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
