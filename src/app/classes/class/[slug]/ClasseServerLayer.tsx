import Dashboard from "@/core/components/icons/Dashboard";
import Sidebar from "@/core/components/layout/Sidebar";
import StudentsTable from "@/features/classe/presentation/components/StudentsTable";
import { NavItem } from "@/lib/types";
import React from "react";

async function ClasseServerLayer(props: { slug: string }) {
  const classeNavItems: NavItem[] = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: Dashboard(),
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
