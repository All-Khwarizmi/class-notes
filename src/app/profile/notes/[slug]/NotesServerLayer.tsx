import NotFound from "@/app/not-found";
import ErrorDialog from "@/core/components/common/ErrorDialog";
import LayoutWithProps from "@/core/components/layout/LayoutWithProps";
import { authUseCases } from "@/features/auth/application/usecases/auth-usecases";
import getNotes from "@/features/notes/application/adapters/actions/get-notes";

import NotesTableView from "@/features/notes/presentation/views/NotesTableView";

import { isLeft } from "fp-ts/lib/Either";
import { redirect } from "next/navigation";
import React from "react";

async function NotesServerLayer(props: {
  slug: string;
  type: "profile" | "sequence" | "cours" | "class" | "student";
}) {
  if (!props.slug) {
    <LayoutWithProps isEmpty>
      <NotFound />
    </LayoutWithProps>;
  }
  const authUser = await authUseCases.getUserAuth();
  if (isLeft(authUser)) {
    redirect("/login");
  }
  const eitherNotes = await getNotes({
    slug: props.slug,
    userId: authUser.right.userId,
    type: props.type,
  });
  if (isLeft(eitherNotes)) {
    return (
      <LayoutWithProps isEmpty>
        <ErrorDialog
          message={`
        There was an error while fetching your notes.
        Please try again later.
        ${eitherNotes.left}
        Code: ${eitherNotes.left.code}
        `}
        />
      </LayoutWithProps>
    );
  }

  return (
    <LayoutWithProps>
      <NotesTableView
        notes={eitherNotes.right}
        parentId={props.type === "profile" ? authUser.right.userId : props.slug}
      />
    </LayoutWithProps>
  );
}

export default NotesServerLayer;
