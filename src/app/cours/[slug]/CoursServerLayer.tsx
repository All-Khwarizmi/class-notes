import React from "react";
import { authUseCases } from "@/features/auth/application/usecases/auth-usecases";
import { coursUsecases } from "@/features/cours-sequence/application/usecases/cours-usecases";
import CoursSequenceView from "@/features/cours-sequence/presentation/views/CoursSequenceView";
import { Right, isLeft } from "fp-ts/lib/Either";
import { redirect } from "next/navigation";
import { complementUsecases } from "@/features/complement/application/usecases/complement-usecases";
import {
  Cours,
  CoursSchema,
} from "@/features/cours-sequence/domain/entities/cours-schemas";
import {
  Complement,
  ComplementSchema,
} from "@/features/complement/domain/complement-schemas";
import Failure from "@/core/failures/failures";
import ErrorDialog from "@/core/components/common/ErrorDialog";
import Sidebar from "@/core/components/layout/Sidebar";
import { NavItem } from "@/lib/types";
import {
  Activity,
  AlignVerticalDistributeCenter,
  BookOpenCheck,
  Layout,
  NotebookPen,
  Plus,
  Rows3,
} from "lucide-react";
import Dashboard from "@/core/components/icons/Dashboard";
import LayoutWithProps from "@/core/components/layout/LayoutWithProps";

async function CoursServerLayer(props: { slug: string }) {
  const authUser = await authUseCases.getUserAuth();
  if (isLeft(authUser)) {
    redirect("/login");
  }
  let cours: Cours = {} as Cours;
  let complements: Complement[] = [];
  let failures: Failure<string>[] = [];

  const batch = await Promise.allSettled([
    coursUsecases.getSingleCours({
      userId: authUser.right.userId,
      coursId: props.slug,
    }),
    complementUsecases.getAllCoursComplement({ coursId: props.slug }),
  ]);
  const isFailure = batch.some((result, index) => {
    if (result.status === "rejected") {
      failures.push(
        Failure.invalidValue({
          invalidValue: result.reason,
          message: `
          Unable to fetch cours with id: ${props.slug}
          
            ${result.reason}
          `,
        })
      );
      return true;
    }

    if (isLeft(result.value)) {
      failures.push(
        Failure.invalidValue({
          invalidValue: result.value.left,
          message: `
          Unable to fetch cours with id: ${props.slug}
          
            ${result.value.left}
          `,
        })
      );
      return true;
    }
    if (index === 0) {
      const validateCours = CoursSchema.safeParse(result.value.right);
      if (!validateCours.success) {
        failures.push(
          Failure.invalidValue({
            invalidValue: result.value.right,
            message: `
            Unable to validate cours with id: ${props.slug}
            
              ${JSON.stringify(validateCours.error)}
            `,
          })
        );
        return true;
      }
      cours = validateCours.data;
    }
    if (index === 1) {
      const eitherComplements = result.value as Right<Complement[]>;
      for (const complement of eitherComplements.right) {
        const validateComplement = ComplementSchema.safeParse(complement);
        if (!validateComplement.success) {
          failures.push(
            Failure.invalidValue({
              invalidValue: complement,
              message: `
            Unable to validate complement with id: ${complement.id}
            
            ${JSON.stringify(validateComplement.error)}
            `,
            })
          );
          return true;
        }
        complements.push(validateComplement.data);
      }
    }
  });
  if (isFailure) {
    return (
      <LayoutWithProps isEmpty>
        <ErrorDialog
          message={`
      Failed to fetch data for the cours page.
      ${failures.map((failure) => failure.message).join("\n")}
      Code: PRE303
    `}
        />
      </LayoutWithProps>
    );
  }
  if (!cours._id) {
    return (
      <LayoutWithProps isEmpty>
        <ErrorDialog
          message={`
      Failed to fetch data for the cours page.
      Unable to find cours with id: ${props.slug}
      Code: PRE303
    `}
        />
      </LayoutWithProps>
    );
  }
  const coursNavItems: NavItem[] = complements.map((complement) => ({
    id: complement.id,
    title: complement.name,
    icon:
      complement.type === "Exercise" ? (
        <Activity size={16} />
      ) : complement.type === "Lesson" ? (
        <BookOpenCheck size={16} />
      ) : (
        <AlignVerticalDistributeCenter size={16} />
      ),
    href: `/complements/${complement.id}`,
  }));
  coursNavItems.unshift(
    {
      title: "Dashboard",
      icon: Dashboard(),
      href: "/dashboard",
      color: "text-sky-500",
    },
    {
      title: "All Resources",
      icon: <Rows3 size={16} />,
      href: `/cours/complements/${cours!._id}`,
      color: "text-sky-500",
    }
  );

  coursNavItems.push(
    {
      title: "Add new resource",
      href: `/complements/add/${props.slug}`,
      icon: <Plus size={16} />,
    },
    {
      title: "Notes",
      href: `/cours/notes/${props.slug}`,
      icon: <NotebookPen size={16} />,
    }
  );

  return (
    <LayoutWithProps navItems={coursNavItems}>
      <CoursSequenceView
        cours={cours}
        userId={authUser.right.userId}
        complements={complements}
        type="cours"
      />
    </LayoutWithProps>
  );
}

export default CoursServerLayer;
