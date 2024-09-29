import AfterMenuButton from '@/core/components/common/editor/AfterMenuButton';
import { useCurrentEditor } from '@tiptap/react';
import { Save } from 'lucide-react';
import React from 'react';

import useUpdateSequenceBody from '../../application/adapters/services/useUpdateSequenceBody';
import { Sequence } from '../../domain/entities/cours-schemas';

function SaveSequenceBodyButton({
  sequence,
  userId,
  type,
}: {
  sequence: Sequence;
  userId: string;
  type?: 'template' | 'sequence';
}) {
  const { editor } = useCurrentEditor();
  const { debounceUpdateSequenceBody } = useUpdateSequenceBody();
  if (!editor) {
    return null;
  }
  return (
    <AfterMenuButton
      props={{
        onClick: () => {
          const prevContent = sequence.body;
          const currentContent = editor.getHTML();
          if (prevContent === currentContent) {
            return alert('No changes to save');
          }
          debounceUpdateSequenceBody({
            userId,
            sequenceId: sequence._id,
            type,
          })(currentContent);
        },
      }}
    >
      <Save size={14} />
    </AfterMenuButton>
  );
}

export default SaveSequenceBodyButton;
