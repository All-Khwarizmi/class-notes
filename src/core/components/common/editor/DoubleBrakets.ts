import { Extension } from '@tiptap/core';
import { InputRule } from '@tiptap/core';
import { findParentNode } from '@tiptap/core';
import { TextSelection } from 'prosemirror-state';

const doubleBrakets = () => {
  return new InputRule({
    find: /\[$/,
    handler: ({ state, match, range }) => {
      const { tr, selection } = state;
      const { from: start, to: end } = selection;

      // Check if the cursor is inside a code block
      const parentNode = findParentNode(
        (node) => node.type.name === 'code_block'
      )(selection);
      if (parentNode) {
        // If inside a code block, insert the closing brace directly
        tr.insertText('[]', start, end);
        return;
      }

      // Insert the closing brace and move the cursor between the braces
      tr.insertText('[]', start, end);

      // Create a new TextSelection with the cursor positioned between the braces
      const newSelection = TextSelection.create(tr.doc, start + 1);
      tr.setSelection(newSelection);

      // Apply the transaction to the document
      tr.scrollIntoView(); // Ensure the view scrolls to the new selection
    },
  });
};

export const DoubleBrakets = Extension.create({
  name: 'doubleBrakets',

  addInputRules() {
    return [doubleBrakets()];
  },
});
