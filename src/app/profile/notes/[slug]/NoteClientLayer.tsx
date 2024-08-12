"use client";

import NotFound from "@/app/not-found";
import ErrorDialog from "@/core/components/common/ErrorDialog";
import LoadingSkeleton from "@/core/components/common/LoadingSkeleton";
import useGetNotes from "@/features/notes/application/adapters/services/useGetNotes";

import NotesTableView from "@/features/notes/presentation/views/NotesTableView";

import { isLeft } from "fp-ts/lib/Either";
import React from "react";

function NotesClientLayer(props: { parentId: string }) {
  const {
    data: eitherNotes,
    isLoading,
    isError,
  } = useGetNotes({
    parentId: props.parentId,
  });

  if (isLoading) {
    return <LoadingSkeleton />;
  }
  if (isError) {
    return (
      <ErrorDialog
        message={`
        There was an error while fetching your notes.
        Please try again later.
        `}
      />
    );
  }

  if (eitherNotes && isLeft(eitherNotes)) {
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
  if (eitherNotes) {
    return (
      <NotesTableView notes={eitherNotes.right} parentId={props.parentId} />
    );
  }
}

export default NotesClientLayer;
