import NothingToShow from "@/core/components/common/editor/NothingToShow";
import Layout from "@/core/components/layout/ExperimentalLayout";
import getVisibility from "@/features/classe/application/adapters/actions/get-visibility";
import { coursUsecases } from "@/features/cours-sequence/application/usecases/cours-usecases";
import ContentViewer from "@/features/cours-sequence/presentation/views/ContentViewer";
import { NavItem } from "@/lib/types";
import { isLeft } from "fp-ts/lib/Either";
import { BookA, BookCheck } from "lucide-react";
import React from "react";

async function SpacesSequenceServerLayer(props: {
  slug: string;
  searchParams: { [key: string]: string | undefined };
}) {
  const sequenceType =
    props.searchParams.type !== null
      ? props.searchParams.type === "template"
        ? "template"
        : "sequence"
      : "sequence";

  const eitherSequence = await coursUsecases.getSingleSequence({
    userId: "",
    sequenceId: props.slug,
    type: sequenceType,
  });
  if (isLeft(eitherSequence) || !props.searchParams.user) {
    return <Layout.NotFound />;
  }
  const userId = props.searchParams.user;
  const eitherVisibility = await getVisibility({
    userId,
  });
  if (isLeft(eitherVisibility)) {
    return <Layout.NotFound />;
  }
  const sequenceVisibility = eitherVisibility.right.sequences.find(
    (visibility) => visibility.id === props.slug
  );
  const isSequenceVisible =
    sequenceVisibility?.publish === true && sequenceVisibility.classe; // Check if the sequence is visible

  if (!isSequenceVisible) {
    return <NothingToShow />;
  }
  // Get all cours from the sequence
  const eitherCours = await coursUsecases.getAllCoursFromSequence({
    userId: "",
    sequenceId: props.slug,
    type: "sequence",
  });
  if (isLeft(eitherCours) || isLeft(eitherVisibility)) {
    return <Layout.NotFound />;
  }

  const coursesNavItems: NavItem[] = [];
  eitherCours.right.forEach((cours) => {
    const coursVisibility = eitherVisibility.right.cours.find(
      (visibility) => visibility.id === cours._id
    );
    const isVisible =
      coursVisibility?.publish &&
      coursVisibility.sequence &&
      coursVisibility.classe;
    if (isVisible === true) {
      coursesNavItems.push({
        title: cours.name,
        href: `/spaces/cours/${cours._id}?user=${userId}`,
        icon: <BookA size={16} />,
      });
    }
  });

  const sequenceNavItems: NavItem[] = [
    {
      title: "Courses",
      href: `#`,
      icon: <BookCheck size={16} />,
      isChidren: true,
      children: coursesNavItems,
    },
  ];
  return (
    <ContentViewer
      content={eitherSequence.right.body}
      navItems={sequenceNavItems}
    />
  );
}

export default SpacesSequenceServerLayer;
