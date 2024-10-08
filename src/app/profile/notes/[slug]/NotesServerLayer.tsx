import NotFound from '@/app/not-found';
import ErrorDialog from '@/core/components/common/ErrorDialog';
import checkAuthAndRedirect from '@/data-access/auth/check-and-redirect';
import getNotes from '@/features/notes/application/adapters/actions/get-notes';
import NotesTableView from '@/features/notes/presentation/views/NotesTableView';
import { isLeft } from 'fp-ts/lib/Either';
import React from 'react';

async function NotesServerLayer(props: {
  slug: string;
  type: 'profile' | 'sequence' | 'cours' | 'class' | 'student';
}) {
  if (!props.slug) {
    <NotFound />;
  }
  const { userId } = await checkAuthAndRedirect();

  //! TODO: @DATA-ACCESS
  const eitherNotes = await getNotes({
    slug: props.slug,
    userId,
    type: props.type,
  });
  if (isLeft(eitherNotes)) {
    return (
      <ErrorDialog
        message={`
        There was an error while fetching your notes.
        Please try again later.
        ${eitherNotes.left}
        Code: ${eitherNotes.left.code}
        `}
      />
    );
  }

  return (
    <NotesTableView
      notes={eitherNotes.right}
      parentId={props.type === 'profile' ? userId : props.slug}
    />
  );
}

export default NotesServerLayer;
