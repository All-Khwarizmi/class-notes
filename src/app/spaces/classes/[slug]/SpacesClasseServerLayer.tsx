import NothingToShow from "@/core/components/common/editor/NothingToShow";
import Sidebar from "@/core/components/layout/Sidebar";
import SpacesHeader from "@/core/components/layout/SpacesHeader";
import getVisibility from "@/features/classe/application/adapters/actions/get-visibility";
import { coursUsecases } from "@/features/cours-sequence/application/usecases/cours-usecases";
import { Sequence } from "@/features/cours-sequence/domain/entities/cours-schemas";
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
    const isVisible = eitherVisibility.right.sequences.find(
      (visibility) => visibility.id === sequence._id
    )?.publish;
    if (isVisible) {
      sequences.push(sequence);
    }
  }

  //! Handle the case where there are no sequences

  const sequenceNavItems: NavItem[] = sequences.map((sequence) => ({
    title: sequence.name,
    href: `/spaces/classes/${props.slug}/${sequence._id}`,
    icon: <Presentation size={16} />,
  }));
  return (
    <>
      <SpacesHeader navItems={sequenceNavItems} />
      <section className="flex h-full w-full border-collapse overflow-hidden">
        <Sidebar navItems={sequenceNavItems} />
        <div className="h-full w-full py-8 px-6">
          {sequences.length > 0 ? (
            <SequencesListView sequences={sequences} spacesMode={true} />
          ) : (
            <NothingToShow />
          )}
        </div>
      </section>
    </>
  );
}

export default SpacesClasseServerLayer;
