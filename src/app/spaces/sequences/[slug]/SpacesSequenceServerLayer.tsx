import NotFound from "@/app/not-found";
import Dashboard from "@/core/components/icons/Dashboard";
import Sidebar from "@/core/components/layout/Sidebar";
import SpacesHeader from "@/core/components/layout/SpacesHeader";
import { coursUsecases } from "@/features/cours-sequence/application/usecases/cours-usecases";
import ShowSequence from "@/features/cours-sequence/presentation/views/ShowSequence";
import { NavItem } from "@/lib/types";
import { isLeft } from "fp-ts/lib/Either";
import { BookA, BookCheck,} from "lucide-react";
import React from "react";

async function SpacesSequenceServerLayer(props: { slug: string }) {
  const eitherSequence = await coursUsecases.getSingleSequence({
    userId: "",
    sequenceId: props.slug,
    type: "sequence",
  });
  if (isLeft(eitherSequence)) {
    console.log(eitherSequence.left);
    return <NotFound />;
  }
  // Get all cours from the sequence
  const eitherCours = await coursUsecases.getAllCoursFromSequence({
    userId: "",
    sequenceId: props.slug,
    type: "sequence",
  });
  if (isLeft(eitherCours)) {
    return <NotFound />;
  }

  const coursesNavItems: NavItem[] = eitherCours.right.map((cours) => ({
    title: cours.name,
    href: `/spaces/cours/${cours._id}`,
    icon: <BookA size={16} />,
  }));

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
    <>
      <SpacesHeader navItems={sequenceNavItems} />
      <section className="flex h-full w-full border-collapse overflow-hidden">
        <Sidebar navItems={sequenceNavItems} />
        <div className="h-full w-full py-8 px-6">
          <ShowSequence content={eitherSequence.right.body} />
        </div>
      </section>
    </>
  );
}

export default SpacesSequenceServerLayer;
