import NotFound from "@/app/not-found";
import Sidebar from "@/core/components/layout/Sidebar";
import SpacesHeader from "@/core/components/layout/SpacesHeader";
import { coursUsecases } from "@/features/cours-sequence/application/usecases/cours-usecases";
import { Sequence } from "@/features/cours-sequence/domain/entities/cours-schemas";
import { NavItem } from "@/lib/types";
import { isLeft } from "fp-ts/lib/Either";
import {
  BookA,
  Plus,
  BookCheck,
  NotebookPen,
  Presentation,
} from "lucide-react";
import React from "react";

async function SpacesClasseServerLayer(props: { slug: string }) {
  const eitherSequences = await coursUsecases.getClasseSequences({
    classeId: props.slug,
  });
  if (isLeft(eitherSequences)) {
    return <NotFound />;
  }
  const sequences: Sequence[] = [];
  for (const sequence of eitherSequences.right) {
    if (sequence.publish === true) {
      sequences.push(sequence);
    }
  }

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
        <div className="h-full w-full py-8 px-6"></div>
      </section>
    </>
  );
}

export default SpacesClasseServerLayer;
