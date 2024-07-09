import React from "react";
import AddUpdateCoursSequenceView from "@/features/cours-sequence/presentation/views/AddCoursView";
import { authUseCases } from "@/features/auth/application/usecases/auth-usecases";
import { isLeft } from "fp-ts/lib/Either";
import { redirect } from "next/navigation";
import ErrorDialog from "@/core/components/common/ErrorDialog";
import editSequence from "@/features/cours-sequence/application/adapters/actions/edit-sequence";
import LayoutWithProps from "@/core/components/layout/LayoutWithProps";

async function SequenceEditServerLayer(props: {
  slug: string;
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const authUser = await authUseCases.getUserAuth();
  if (isLeft(authUser)) {
    redirect("/login");
  }
  const type =
    props.searchParams?.type === "sequence" ? "sequence" : "template";

  const { competences, sequence, failures, isFailure } = await editSequence({
    userId: authUser.right.userId,
    slug: props.slug,
    type,
  });
  if (isFailure) {
    return (
        <ErrorDialog
          message={`
        Failed to fetch data for the cours edit page.
        ${failures.map((failure) => failure.message).join("\n")}
        Code: PRE303
    `}
        />
    );
  }
  if (!sequence) {
    return (
        <ErrorDialog
          message={`
        Failed to fetch data for the sequence edit page.
        Unable to find cours with id: ${props.slug}
        Code: PRE303
    `}
        />
    );
  }

  return (
      <AddUpdateCoursSequenceView
        competences={competences}
        sequence={sequence}
        authUser={authUser.right}
        title="Edit Sequence"
        edit={true}
        type="sequence"
        sequenceType={type}
      />
  );
}

export default SequenceEditServerLayer;
