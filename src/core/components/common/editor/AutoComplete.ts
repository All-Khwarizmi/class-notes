import { Extension } from '@tiptap/core';
import { InputRule } from '@tiptap/core';
import { findParentNode } from '@tiptap/core';
import { TextSelection } from 'prosemirror-state';

// Helper function to create input rules for automatic completion

// Helper function to create input rules for automatic completion
const createAutoCompleteInputRule = ({
  startSequence,
  endSequence,
  types,
}: {
  startSequence: string;
  endSequence: string;
  types: string[];
}) => {
  return new InputRule({
    find: new RegExp(`\${startSequence}$`),
    handler: ({ state, range }) => {
      const { tr, selection } = state;
      const { from: start, to: end } = range;

      // Check if the cursor is inside a code block
      const parentNode = findParentNode((node) =>
        types.includes(node.type.name)
      )(selection);

      if (parentNode) {
        // If inside a code block, insert the closing brace directly
        tr.insertText(endSequence, start);
        return;
      }

      // Insert the closing brace and move the cursor between the braces
      tr.insertText(endSequence, start, end);

      // Create a new TextSelection with the cursor positioned between the braces
      const newSelection = TextSelection.create(tr.doc, start + 1);
      tr.setSelection(newSelection);

      // Apply the transaction to the document
      tr.scrollIntoView(); // Ensure the view scrolls to the new selection
    },
  });
};

export const AutoCompleteExtension = Extension.create({
  name: 'doubleBrakets',

  addInputRule() {
    return [
      createAutoCompleteInputRule({
        startSequence: '[',
        endSequence: '[]',
        types: ['paragraph', 'codeBlock'],
      }),
    ];
  },
});
