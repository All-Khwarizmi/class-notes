'use client';

import {
  Cours,
  Sequence,
} from '@/features/cours-sequence/domain/entities/cours-schemas';
import SaveSequenceBodyButton from '@/features/cours-sequence/presentation/components/SaveSequenceBodyButton';
import { DebouncedFunc } from 'lodash';
import React from 'react';

import { TypographyH3 } from '../Typography';
import CoursSaveButton from './CoursSaveButton';
import FloatingEditor from './FloatingEditor';

interface BlogEditorProps {
  content: string;
  onUpdate: DebouncedFunc<(content: string) => void>;
  type: 'cours' | 'sequence';
  item: Cours | Sequence;
  userId: string;
  sequenceType?: 'template' | 'sequence';
}

const BlogEditor: React.FC<BlogEditorProps> = ({
  content,
  onUpdate,
  type,
  item,
  userId,
  sequenceType,
}) => {
  return (
    <div className="max-w-4xl h-max mx-auto px-4 space-y-8">
      <TypographyH3 text={item.name} />
      <FloatingEditor
        content={content}
        debounceUpdateFn={onUpdate}
        afterMenuBar
      >
        <div className="flex items-center justify-between w-full gap-4 mb-4">
          <div className="flex items-center gap-1">
            {type === 'cours' ? (
              <CoursSaveButton userId={userId} cours={item as Cours} />
            ) : (
              <SaveSequenceBodyButton
                userId={userId}
                sequence={item as Sequence}
                type={sequenceType}
              />
            )}
          </div>
        </div>
      </FloatingEditor>
    </div>
  );
};

export default BlogEditor;
