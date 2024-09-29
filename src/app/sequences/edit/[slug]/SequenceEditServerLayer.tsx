import ErrorDialog from '@/core/components/common/ErrorDialog';
import checkAuthAndRedirect from '@/data-access/auth/check-and-redirect';
import editSequence from '@/features/cours-sequence/application/adapters/actions/edit-sequence';
import AddUpdateCoursSequenceView from '@/features/cours-sequence/presentation/views/AddCoursView';
import React from 'react';

async function SequenceEditServerLayer(props: {
  slug: string;
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const { userId } = await checkAuthAndRedirect();

  //! TODO: @DATA-ACCESS
  const type =
    props.searchParams?.type === 'sequence' ? 'sequence' : 'template';

  const { competences, sequence, failures, isFailure } = await editSequence({
    userId,
    slug: props.slug,
    type,
  });
  if (isFailure) {
    return (
      <ErrorDialog
        message={`
        Failed to fetch data for the cours edit page.
     
    `}
        code="PRE303"
        description="Failed to fetch data for the sequence edit page."
      />
    );
  }
  if (!sequence) {
    return (
      <ErrorDialog
        message={`
        Failed to fetch data for the sequence edit page.
        Unable to find cours with id: ${props.slug}
    `}
        code="PRE303"
        description="Failed to fetch data for the sequence edit page."
      />
    );
  }

  return (
    <AddUpdateCoursSequenceView
      competences={competences}
      sequence={sequence}
      userId={userId}
      title="Edit Sequence"
      edit={true}
      type="sequence"
      sequenceType={type}
    />
  );
}

export default SequenceEditServerLayer;
