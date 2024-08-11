import StarterKit from "@tiptap/starter-kit";
import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import { TextAlign } from "@tiptap/extension-text-align";
import ResizableImageExtension from "../common/editor/ImageResize";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { common, createLowlight } from "lowlight";
import { IndentExtension } from "../common/editor/Indent";
import YouTube from "@tiptap/extension-youtube";
import DoubleCurlyBracesExtension from "../common/editor/DoubleCurlyBracesExtension";
import { DoubleBrakets } from "../common/editor/DoubleBrakets";
import Link from "@tiptap/extension-link";
import FloatingMenu from "@tiptap/extension-floating-menu";
const lowlight = createLowlight(common);

export const EXTENSIONS = [
  
  Link.configure({
    HTMLAttributes: {
      target: "_blank",
      rel: "noopener noreferrer",
      class: "link-class",
    },
  }),
  YouTube.configure({
    inline: true,
    HTMLAttributes: {
      class: "youtube-embed",
    },
  }),
  IndentExtension,
  CodeBlockLowlight.configure({
    lowlight,
    defaultLanguage: "typescript",
  }),
  DoubleCurlyBracesExtension,
  DoubleBrakets,

  TextAlign.configure({
    types: [
      "heading",
      "paragraph",
      "img",
      "codeBlock",
      "code",
      "blockquote",
      "pre",
    ],
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
