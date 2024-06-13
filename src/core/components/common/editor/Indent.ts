import { Extension } from "@tiptap/core";

export interface IndentOptions {
  types: string[];
  min: number;
  max: number;
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    indent: {
      decreaseIndent: (backspace?: boolean) => ReturnType;
      increaseIndent: () => ReturnType;
      unsetIndent: () => ReturnType;
    };
  }
}

export const IndentExtension = Extension.create<IndentOptions>({
  name: "indent",

  addOptions() {
    return {
      types: ["listItem", "heading", "paragraph", "blockquote"],
      min: 0,
      max: Number.POSITIVE_INFINITY,
    };
  },

  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          marginLeft: {
            default: 0,
            renderHTML: (attributes: any) => {
              return { style: `margin-left: ${attributes.marginLeft}rem` };
            },
            parseHTML: (element: HTMLElement) => {
              return parseFloat(element.style.marginLeft) || 0;
            },
          },
        },
      },
    ];
  },

  addCommands() {
    return {
      decreaseIndent:
        (backspace?: boolean) =>
        ({ chain, tr, state, dispatch }) => {
          const { selection } = state;
          const { from, to } = selection;

          if (backspace && (selection.$anchor.parentOffset > 0 || from !== to))
            return false;

          state.doc.nodesBetween(from, to, (node, pos) => {
            if (this.options.types.includes(node.type.name)) {
              const currentIndent = node.attrs.marginLeft || 0;
              const newIndent = clamp(
                currentIndent - 1,
                this.options.min,
                this.options.max
              );
              tr.setNodeMarkup(pos, undefined, {
                ...node.attrs,
                marginLeft: newIndent,
              });
            }
          });

          if (tr.docChanged) {
            dispatch?.(tr);
            return true;
          }
          return false;
        },

      increaseIndent:
        () =>
        ({ chain, tr, state, dispatch }) => {
          const { selection } = state;
          const { from, to } = selection;

          state.doc.nodesBetween(from, to, (node, pos) => {
            if (this.options.types.includes(node.type.name)) {
              const currentIndent = node.attrs.marginLeft || 0;
              const newIndent = clamp(
                currentIndent + 1,
                this.options.min,
                this.options.max
              );
              tr.setNodeMarkup(pos, undefined, {
                ...node.attrs,
                marginLeft: newIndent,
              });
            }
          });

          if (tr.docChanged) {
            dispatch?.(tr);
            return true;
          }
          return false;
        },

      unsetIndent:
        () =>
        ({ chain, tr, state, dispatch }) => {
          const { selection } = state;
          const { from, to } = selection;

          state.doc.nodesBetween(from, to, (node, pos) => {
            if (this.options.types.includes(node.type.name)) {
              tr.setNodeMarkup(pos, undefined, {
                ...node.attrs,
                marginLeft: 0,
              });
            }
          });

          if (tr.docChanged) {
            dispatch?.(tr);
            return true;
          }
          return false;
        },
    };
  },

  addKeyboardShortcuts() {
    return {
      Tab: () => this.editor.commands.increaseIndent(),
      "Shift-Tab": () => this.editor.commands.decreaseIndent(),
      Backspace: () => this.editor.commands.decreaseIndent(true),
    };
  },
});

function update({
  step = 1,
  min = 0,
  max = Number.POSITIVE_INFINITY,
  unit = "",
} = {}): (v: string | number, delta?: number) => string {
  return (last, delta = step) => {
    let n;

    if (last === undefined || last === null) {
      n = 0;
    } else if (typeof last === "number") {
      n = last;
    } else {
      n = parseFloat(last);
      if (Number.isNaN(n)) {
        n = 0;
      }
    }
    n += delta;
    n = clamp(n, min, max);

    let frac = 0;
    let abs = Math.abs(delta);
    if (abs >= 1) {
      // integer steps
    } else if (abs >= 0.1) {
      frac = 1;
    } else if (abs >= 0.01) {
      frac = 2;
    } else if (abs >= 0.001) {
      frac = 3;
    } else {
      frac = 4;
    }

    return `${n.toFixed(frac)}${unit}`;
  };
}

const clamp = (val: number, min: number, max: number) =>
  val < min ? min : val > max ? max : val;
