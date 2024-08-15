import NothingToShow from "@/core/components/common/editor/NothingToShow";
import getVisibility from "@/features/classe/application/adapters/actions/get-visibility";
import { coursUsecases } from "@/features/cours-sequence/application/usecases/cours-usecases";
import { Sequence } from "@/features/cours-sequence/domain/entities/cours-schemas";
import SequencesListViewSpaces from "@/features/cours-sequence/presentation/views/SeqquenceListViewSpaces";
import { NavItem } from "@/lib/types";
import { isLeft } from "fp-ts/lib/Either";
import { Presentation } from "lucide-react";
import React from "react";

async function SpacesClasseServerLayer(props: {
  slug: string;
  searchParams: { [key: string]: string | undefined };
}) {
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
    icon: <Presentation size={16} />,
  }));
  return (
    <>
      {sequences.length > 0 ? (
        <SequencesListViewSpaces
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
