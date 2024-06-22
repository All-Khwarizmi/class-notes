import LayoutWithProps from "@/core/components/layout/LayoutWithProps";
import getVisibility from "@/features/classe/application/adapters/actions/get-visibility";
import { coursUsecases } from "@/features/cours-sequence/application/usecases/cours-usecases";
import { Sequence } from "@/features/cours-sequence/domain/entities/cours-schemas";
import SequencesListViewSpaces from "@/features/cours-sequence/presentation/views/SeqquenceListViewSpaces";
import SequencesListView from "@/features/cours-sequence/presentation/views/SequencesListView";
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
    return <LayoutWithProps nothingToShow />;
  }
  const eitherVisibility = await getVisibility({
    userId: props.searchParams.user,
  });

  if (isLeft(eitherVisibility)) {
    return <LayoutWithProps nothingToShow />;
  }
  const sequences: Sequence[] = [];
  for (const sequence of eitherSequences.right) {
    const isVisible = eitherVisibility.right.sequences.find(
      (visibility) => visibility.id === sequence._id
    )?.publish;
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
        <LayoutWithProps navItems={sequenceNavItems}>
          <SequencesListViewSpaces
            sequences={sequences}
            spacesMode={true}
            userId={props.searchParams.user}
          />
        </LayoutWithProps>
      ) : (
        <LayoutWithProps nothingToShow />
      )}
    </>
  );
}

export default SpacesClasseServerLayer;
