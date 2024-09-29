import { Extension } from '@tiptap/core';
import { InputRule } from '@tiptap/core';
import { Node as ProseMirrorNode } from 'prosemirror-model';
import { TextSelection } from 'prosemirror-state';

// Function to create an input rule for auto-closing curly braces
const createCurlyBracesInputRule = () => {
  return new InputRule({
    find: /\{$/,
    handler: ({ state, match, range }) => {
      // Log the trigger
      const { tr, selection } = state;
      const { from: start, to: end } = selection;
      const { from, to } = range;
      // Find the node at the current selection
      const $from = tr.doc.resolve(from);
      const parent = $from.node($from.depth) as ProseMirrorNode;

      // Check if the parent node is a code block
      const isInCodeBlock =
        parent.type.name === 'code_block' ||
        parent.type.name === 'code' ||
        parent.type.name === 'pre' ||
        parent.type.name === 'paragraph' ||
        parent.type.name === 'heading' ||
        parent.type.name === 'blockquote' ||
        parent.type.name === 'list_item' ||
        parent.type.name === 'bullet_list' ||
        parent.type.name === 'ordered_list' ||
        parent.type.name === 'image' ||
        parent.type.name === 'youtube' ||
        parent.type.name === 'textStyle' ||
        parent.type.name === 'color' ||
        parent.type.name === 'align' ||
        parent.type.name === 'doubleBrakets' ||
        parent.type.name === 'doubleCurlyBraces' ||
        parent.type.name === 'indent' ||
        parent.type.name === 'starterKit' ||
        parent.type.name === 'autoComplete' ||
        parent.type.name === 'codeBlockLowlight' ||
        parent.type.name === 'youtube' ||
        parent.type.name === 'doubleBrakets' ||
        parent.type.name === 'doubleCurlyBraces' ||
        parent.type.name === 'textStyle' ||
        parent.type.name === 'color' ||
        parent.type.name === 'align' ||
        parent.type.name === 'indent' ||
        parent.type.name === 'starterKit' ||
        parent.type.name === 'autoComplete' ||
        parent.type.name === 'codeBlockLowlight' ||
        parent.type.name === 'youtube' ||
        parent.type.name === 'doubleBrakets' ||
        parent.type.name === 'doubleCurlyBraces' ||
        parent.type.name === 'textStyle' ||
        parent.type.name === 'color' ||
        parent.type.name === 'align' ||
        parent.type.name === 'indent' ||
        parent.type.name === 'starterKit' ||
        parent.type.name === 'autoComplete' ||
        parent.type.name === 'codeBlockLowlight' ||
        parent.type.name === 'youtube' ||
        parent.type.name === 'doubleBrakets' ||
        parent.type.name === 'doubleCurlyBraces' ||
        parent.type.name === 'textStyle' ||
        parent.type.name === 'color' ||
        parent.type.name === 'align' ||
        parent.type.name === 'indent' ||
        parent.type.name === 'starterKit' ||
        parent.type.name === 'autoComplete' ||
        parent.type.name === 'codeBlockLowlight' ||
        parent.type.name === 'youtube' ||
        parent.type.name === 'doubleBrakets' ||
        parent.type.name === 'doubleCurlyBraces' ||
        parent.type.name === 'textStyle' ||
        parent.type.name === 'color' ||
        parent.type.name === 'align' ||
        parent.type.name === 'indent';

      if (isInCodeBlock) {
        // Insert just the closing brace in code blocks
        tr.insertText('{}', start, end);
        return;
      } else {
        // Insert both braces and set the cursor between them
        tr.insertText('{}', from, to);
        tr.setSelection(TextSelection.create(tr.doc, from + 1));
        return;
      }

      // Insert the closing brace and move the cursor between the braces
      tr.insertText(`{}`, start, end);

      // Create a new TextSelection with the cursor positioned between the braces
      const newSelection = TextSelection.create(tr.doc, start + 1);
      tr.setSelection(newSelection);

      // Apply the transaction to the document
      tr.scrollIntoView(); // Ensure the view scrolls to the new selection
    },
  });
};

const DoubleCurlyBracesExtension = Extension.create({
  name: 'doubleCurlyBraces',

  addInputRules() {
    return [createCurlyBracesInputRule()];
  },
});

export default DoubleCurlyBracesExtension;
