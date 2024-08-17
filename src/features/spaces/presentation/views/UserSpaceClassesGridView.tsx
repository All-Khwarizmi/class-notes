"use client";

import { ClassType } from "@/features/classe/domain/class-schema";
import UserSpaceClasseCard from "../components/UserSpaceClasseCard";
import { NavItem } from "@/lib/types";
import { TypographyH1 } from "@/core/components/common/Typography";

export default function UserSpaceClassesGridView(props: {
  classes: ClassType[];
  userId: string;
  navItems: NavItem[];
}) {
  return (
    <main className="px-4 py-8">
      <header className="pb-8">
        <TypographyH1 text="Classes" />
      </header>
      <section className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 gap-6 ">
        {props.classes.map((classe) => (
          <UserSpaceClasseCard
            key={classe.id}
            classe={classe}
            userId={props.userId}
            navItems={props.navItems}
          />
        ))}
      </section>
    </main>
  );
}
