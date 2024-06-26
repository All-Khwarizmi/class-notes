import NotFound from "@/app/not-found";
import Dashboard from "@/core/components/icons/Dashboard";
import LayoutWithProps from "@/core/components/layout/LayoutWithProps";
import { authUseCases } from "@/features/auth/application/usecases/auth-usecases";
import { coursUsecases } from "@/features/cours-sequence/application/usecases/cours-usecases";
import CoursSequenceView from "@/features/cours-sequence/presentation/views/CoursSequenceView";
import { NavItem } from "@/lib/types";
import { isLeft } from "fp-ts/lib/Either";
import { BookA, BookCheck, Layout, NotebookPen, Plus } from "lucide-react";
import { redirect } from "next/navigation";
import React from "react";

export default async function SequenceServerLayer(props: {
  slug: string;
  type?: "template" | "sequence";
}) {
  if (
    !props.slug ||
    !props.type ||
    (props.type !== "template" && props.type !== "sequence")
  ) {
    return (
      <LayoutWithProps
        isError={{
          message: "Invalid params",
          code: "PRE301",
          description: "Invalid params",
        }}
      />
    );
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
    return (
      <LayoutWithProps
        isError={{
          message: "Sequence not found",
          code: "PRE404",
          description: "Sequence not found",
        }}
      />
    );
  }
  // Get all cours from the sequence
  const eitherCours = await coursUsecases.getAllCoursFromSequence({
    userId: authUser.right.userId,
    sequenceId: props.slug,
  });
  if (isLeft(eitherCours)) {
    console.log(eitherCours.left);
    return (
      <LayoutWithProps
        isError={{
          message: "An error occurred while fetching courses.",
          code: eitherCours.left.code,
          description:
            process.env.NODE_ENV === "development"
              ? eitherCours.left.message
              : "An error occurred while fetching courses.",
        }}
      />
    );
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
      href: `/cours/all/${props.slug}?type=${props.type}`,
      icon: <BookCheck size={16} />,
      isChidren: true,
      children: coursesNavItems,
    },
    {
      title: "All Courses",
      href: `/cours/all/${props.slug}?type=${props.type}`,
      icon: <Layout size={16} />,
    },
    {
      title: "Notes",
      href: `/sequences/notes/${props.slug}`,
      icon: <NotebookPen size={16} />,
    },
  ];
  return (
    <LayoutWithProps navItems={sequenceNavItems}>
      <CoursSequenceView
        sequence={eitherSequence.right}
        userId={authUser.right.userId}
        type="sequence"
        coursFromSequence={eitherCours.right}
        sequenceType={props.type}
      />
    </LayoutWithProps>
  );
}
