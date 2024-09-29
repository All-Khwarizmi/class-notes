'use client';

import LoadingSkeleton from '@/core/components/common/LoadingSkeleton';
import { TypographyH3 } from '@/core/components/common/Typography';
import FloatingEditor from '@/core/components/common/editor/FloatingEditor';
import EmbedWithInput from '@/features/cours-sequence/presentation/components/Embed';
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';

import useUpdateComplement from '../../application/adapters/services/useUpdateComplement';
import { Complement } from '../../domain/complement-schemas';
import UpdateComplement from '../components/UpdateComplement';

const ExcalidrawCanvas = dynamic(
  () =>
    import('../components/ExcalidrawCanvas').then(
      (mod) => mod.ExcalidrawCanvas
    ),
  { ssr: false, loading: () => <LoadingSkeleton /> }
);

interface ComplementViewProps {
  slug: string;
  complement: Complement;
  userId: string;
}

function ComplementView({ slug, complement, userId }: ComplementViewProps) {
  const { debounceUpdateComplement } = useUpdateComplement();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const renderContent = () => {
    switch (complement.contentType) {
      case 'Embed':
        return (
          <EmbedWithInput
            initialUrl={complement.body}
            title={complement.name}
            onUrlUpdate={debounceUpdateComplement(complement)}
          />
        );
      case 'Diagram':
        if (!isClient) {
          return <LoadingSkeleton />;
        }
        return (
          <ExcalidrawCanvas
            initialData={complement.body}
            saveComplement={debounceUpdateComplement(complement)}
          />
        );
      default:
        return (
          <FloatingEditor
            debounceUpdateFn={debounceUpdateComplement(complement)}
            content={complement.body}
            afterMenuBar
          >
            <div className="flex items-center justify-between w-full gap-4">
              <div className="flex items-center gap-1">
                <UpdateComplement complement={complement} />
              </div>
            </div>
          </FloatingEditor>
        );
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      <TypographyH3 text={complement.name} />
      {renderContent()}
    </div>
  );
}

export default ComplementView;
