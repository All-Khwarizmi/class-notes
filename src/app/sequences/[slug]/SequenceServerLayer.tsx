import NotFound from "@/app/not-found";
import Dashboard from "@/core/components/icons/Dashboard";
import Sidebar from "@/core/components/layout/Sidebar";
import { authUseCases } from "@/features/auth/application/usecases/auth-usecases";
import { coursUsecases } from "@/features/cours-sequence/application/usecases/cours-usecases";
import CoursSequenceView from "@/features/cours-sequence/presentation/views/CoursSequenceView";
import { NavItem } from "@/lib/types";
import { isLeft } from "fp-ts/lib/Either";
import { BookA, BookCheck, NotebookPen, Plus } from "lucide-react";
import { redirect } from "next/navigation";
import React from "react";

export default async function SequenceServerLayer(props: {
  slug: string;
  type?: "template" | "sequence";
}) {
  if (!props.slug) {
    return <NotFound />;
  }
  const authUser = await authUseCases.getUserAuth();
  if (isLeft(authUser)) {
    redirect("/login");
  }

  const eitherSequence = await coursUsecases.getSingleSequence({
    userId: authUser.right.userId,
    sequenceId: props.slug,
    type: props.type,
  });
  if (isLeft(eitherSequence)) {
    return <NotFound />;
  }
  // Get all cours from the sequence
  const eitherCours = await coursUsecases.getAllCoursFromSequence({
    userId: authUser.right.userId,
    sequenceId: props.slug,
  });
  if (isLeft(eitherCours)) {
    console.log(eitherCours.left);
    return <NotFound />;
  }

  const coursesNavItems: NavItem[] = eitherCours.right.map((cours) => ({
    title: cours.name,
    href: `/cours/${cours._id}`,
    icon: <BookA size={16} />,
  }));
  coursesNavItems.push({
    title: "Add new course",
    href: `/cours/add/${props.slug}`,
    icon: <Plus size={16} />,
  });
  const sequenceNavItems: NavItem[] = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: Dashboard(),
    },
    {
      title: "Courses",
      href: `#`,
      icon: <BookCheck size={16} />,
      isChidren: true,
      children: coursesNavItems,
    },
    {
      title: "Notes",
      href: `/sequences/notes/${props.slug}`,
      icon: <NotebookPen size={16} />,
    },
  ];
  return (
    <>
      <Sidebar navItems={sequenceNavItems} />
      <section className="h-full flex-1  overflow-x-hidden">
        <div className="h-full py-8 px-6">
          <CoursSequenceView
            sequence={eitherSequence.right}
            userId={authUser.right.userId}
            type="sequence"
            coursFromSequence={eitherCours.right}
            sequenceType={props.type}
          />
        </div>
      </section>
    </>
  );
}
