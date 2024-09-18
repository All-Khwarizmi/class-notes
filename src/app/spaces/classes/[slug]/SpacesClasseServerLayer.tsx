import NotFound from "@/app/not-found";
import NothingToShow from "@/core/components/common/editor/NothingToShow";
import ErrorDialog from "@/core/components/common/ErrorDialog";
import getVisibility from "@/features/classe/application/adapters/actions/get-visibility";
import { coursUsecases } from "@/features/cours-sequence/application/usecases/cours-usecases";
import { Sequence } from "@/features/cours-sequence/domain/entities/cours-schemas";
import SequencesListViewSpaces from "@/features/cours-sequence/presentation/views/SeqquenceListViewSpaces";
import { profileUseCases } from "@/features/profile/application/usecases/profile-usecases";
import { NavItem } from "@/lib/types";
import { isLeft } from "fp-ts/lib/Either";
import { Book } from "lucide-react";
import React from "react";

async function SpacesClasseServerLayer(props: {
  slug: string;
  searchParams: { [key: string]: string | undefined };
}) {
  const userId = props.searchParams.user;
  if (!userId) {
    return <NotFound />;
  }
  const user = await profileUseCases.getUser({ userId });

  if (isLeft(user)) {
    return (
      <ErrorDialog
        message="An error occured while fetching the user"
        code={user.left.code}
        description={
          process.env.NODE_ENV === "development" ? user.left.message : ""
        }
      />
    );
  }
  const eitherSequences = await coursUsecases.getClasseSequences({
    classeId: props.slug,
  });

  if (isLeft(eitherSequences) || !props.searchParams.user) {
    return <NothingToShow />;
  }

  const eitherVisibility = await getVisibility({
    userId: props.searchParams.user,
  });

  if (isLeft(eitherVisibility)) {
    return <NothingToShow />;
  }
  const sequences: Sequence[] = [];
  for (const sequence of eitherSequences.right) {
    const sequenceVisibility = eitherVisibility.right.sequences.find(
      (visibility) => visibility.id === sequence._id
    );
    const isVisible =
      (sequenceVisibility?.classe === true &&
        sequenceVisibility?.publish === true) ??
      false;

    if (isVisible) {
      sequences.push(sequence);
    }
  }

  const sequenceNavItems: NavItem[] = sequences.map((sequence) => ({
    title: sequence.name,
    href: `/spaces/sequences/${sequence._id}?user=${props.searchParams.user}`,
    icon: <Book size={16} className="text-green-500" />,
    color: "text-blue-300",
  }));
  return (
    <>
      {sequences.length > 0 ? (
        <SequencesListViewSpaces
          userName={user.right.name ?? "Unknown User"}
          navItems={sequenceNavItems}
          sequences={sequences}
          spacesMode={true}
          userId={props.searchParams.user}
        />
      ) : (
        <NothingToShow />
      )}
    </>
  );
}

export default SpacesClasseServerLayer;
