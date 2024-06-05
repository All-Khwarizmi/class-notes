import NotFound from "@/app/not-found";
import ErrorDialog from "@/core/components/common/ErrorDialog";
import { authUseCases } from "@/features/auth/application/usecases/auth-usecases";
import { notesUsecases } from "@/features/notes/application/usecases/note-usecases";
import NotesTableView from "@/features/notes/presentation/views/NotesTableView";

import { isLeft } from "fp-ts/lib/Either";
import { redirect } from "next/navigation";
import React from "react";

async function NotesServerLayer(props: {
  slug: string;
  type: "profile" | "sequence" | "cours" | "class" | "student";
}) {
  if (!props.slug) {
    return <NotFound />;
  }
  const authUser = await authUseCases.getUserAuth();
  if (isLeft(authUser)) {
    redirect("/login");
  }
  const eitherNotes = await notesUsecases.getNotes({
    parentId: props.type === "profile" ? authUser.right.userId : props.slug,
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
      parentId={props.type === "profile" ? authUser.right.userId : props.slug}
    />
  );
}

export default NotesServerLayer;