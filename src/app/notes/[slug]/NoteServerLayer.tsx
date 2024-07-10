import NotFound from "@/app/not-found";
import ErrorDialog from "@/core/components/common/ErrorDialog";
import { authUseCases } from "@/features/auth/application/usecases/auth-usecases";
import { notesUsecases } from "@/features/notes/application/usecases/note-usecases";
import { NoteSchema } from "@/features/notes/domain/notes-schemas";
import NoteEditorView from "@/features/notes/presentation/views/NoteEditorView";
import { isLeft } from "fp-ts/lib/Either";
import { redirect } from "next/navigation";
import React from "react";

async function NoteServerLayer(props: { slug: string }) {
  if (!props.slug) {
    return <NotFound />;
  }
  const authUser = await authUseCases.getUserAuth();
  if (isLeft(authUser)) {
    redirect("/login");
  }

  const eitherNote = await notesUsecases.getNote({
    id: props.slug,
  });

  if (isLeft(eitherNote)) {
    return (
      <ErrorDialog
        message={`
        Failed to fetch note with id: ${props.slug}

        ${eitherNote.left.message}
        Code: ${eitherNote.left.code}
        `}
      />
    );
  }
  const parsedNote = {
    ...eitherNote.right,
    id: eitherNote.right._id,
    createdAt: eitherNote.right._creationTime,
  };
  const validatedNote = NoteSchema.safeParse(parsedNote);

  if (!validatedNote.success) {
    return (
      <ErrorDialog
        message={`
            Failed to validate note with id: ${props.slug}
    
            ${validatedNote.error}

            Code: APP203
            `}
      />
    );
  }


  return (
     
          <NoteEditorView note={validatedNote.data} />
       
  );
}

export default NoteServerLayer;
