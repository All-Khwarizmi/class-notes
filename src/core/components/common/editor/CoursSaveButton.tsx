import { useCurrentEditor } from '@tiptap/react';
import { Save } from 'lucide-react';
import React from 'react';

import useUpdateCoursBody from '../../../../features/cours-sequence/application/adapters/services/useUpdateCoursBody';
import { Cours } from '../../../../features/cours-sequence/domain/entities/cours-schemas';
import AfterMenuButton from './AfterMenuButton';

function CoursSaveButton({ cours, userId }: { cours: Cours; userId: string }) {
  const { debounceUpdateCoursBody } = useUpdateCoursBody();
  const { editor } = useCurrentEditor();
  if (!editor) {
    return null;
  }
  return (
    <AfterMenuButton
      props={{
        onClick: () => {
          const prevContent = cours.body;
          const currentContent = editor.getHTML();
          if (prevContent === currentContent) {
            return alert('No changes to save');
          }
          debounceUpdateCoursBody({
            userId,
            coursId: cours._id,
          })(currentContent);
        },
      }}
    >
      <Save size={14} />
    </AfterMenuButton>
  );
}

export default CoursSaveButton;
