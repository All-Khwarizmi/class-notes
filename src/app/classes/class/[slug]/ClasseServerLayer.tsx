import ErrorDialog from "@/core/components/common/ErrorDialog";
import Dashboard from "@/core/components/icons/Dashboard";
import Sidebar from "@/core/components/layout/Sidebar";
import { authUseCases } from "@/features/auth/application/usecases/auth-usecases";
import StudentsTable from "@/features/classe/presentation/components/StudentsTable";
import { coursUsecases } from "@/features/cours-sequence/application/usecases/cours-usecases";
import { NavItem } from "@/lib/types";
import { isLeft } from "fp-ts/lib/Either";
import { NotebookPen, Plus, Presentation } from "lucide-react";
import { redirect } from "next/navigation";
import React from "react";

async function ClasseServerLayer(props: { slug: string }) {
  const authUser = await authUseCases.getUserAuth();
  if (isLeft(authUser)) {
    redirect("/login");
  }
  const eitherSequences = await coursUsecases.getClasseSequences({
    classeId: props.slug,
  });
  if (isLeft(eitherSequences)) {
    return (
      <ErrorDialog
        message="An error occurred"
        description="An error occurred while fetching sequences"
        code={eitherSequences.left.code}
      />
    );
  }
  const sequenceNavItems: NavItem[] = eitherSequences.right.map((sequence) => ({
    title: sequence.name,
    href: `/sequences/${sequence._id}`,
    icon: <Presentation size={16} />,
  }));

  sequenceNavItems.push({
    title: "Add new sequence",
    href: `/sequences/add/${props.slug}`,
    icon: <Plus size={16} />,
  });
  const classeNavItems: NavItem[] = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: Dashboard(),
    },
    {
      title: "Sequences",
      href: `#`,
      icon: <Presentation size={16} />,
      isChidren: true,
      children: sequenceNavItems,
    },
    {
      title: "Notes",
      href: `/classes/notes/${props.slug}`,
      icon: <NotebookPen size={16} />,
    },
  ];
  return (
    <>
      <Sidebar navItems={classeNavItems} />
      <section className="h-full flex-1  overflow-x-hidden">
        <div className="h-full py-8 px-6">
          <StudentsTable classId={props.slug} />
        </div>
      </section>
    </>
  );
}

export default ClasseServerLayer;
