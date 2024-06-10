import ErrorDialog from "@/core/components/common/ErrorDialog";
import Sidebar from "@/core/components/layout/Sidebar";
import SpacesHeader from "@/core/components/layout/SpacesHeader";
import getVisibility from "@/features/classe/application/adapters/actions/get-visibility";
import { complementUsecases } from "@/features/complement/application/usecases/complement-usecases";
import { Complement } from "@/features/complement/domain/complement-schemas";
import { coursUsecases } from "@/features/cours-sequence/application/usecases/cours-usecases";
import ShowSequence from "@/features/cours-sequence/presentation/views/ShowSequence";
import { isLeft } from "fp-ts/lib/Either";
import { ClipboardType, ScrollText } from "lucide-react";
import React from "react";

async function SpacesCoursServerLayer(props: {
  slug: string;
  searchParams: { [key: string]: string | undefined };
}) {
  if (!props.slug || !props.searchParams.user) {
    return (
      <ErrorDialog
        message={`
        The user id or the course id is missing
        `}
      />
    );
  }
  const userId = props.searchParams.user;
  const eitherCours = await coursUsecases.getSingleCours({
    userId: "",
    coursId: props.slug,
  });
  if (isLeft(eitherCours)) {
    console.log(eitherCours.left);
    return (
      <ErrorDialog
        message="An error occured while fetching the course"
        code={eitherCours.left.code}
        description={
          process.env.NODE_ENV === "development" ? eitherCours.left.message : ""
        }
      />
    );
  }
  const eitherVibility = await getVisibility({ userId });
  if (isLeft(eitherVibility)) {
    console.log(eitherVibility.left);
    return (
      <ErrorDialog
        message="An error occured while fetching the course visibility"
        code={eitherVibility.left.code}
        description={
          process.env.NODE_ENV === "development"
            ? eitherVibility.left.message
            : ""
        }
      />
    );
  }
  const eitherComplements = await complementUsecases.getAllCoursComplement({
    coursId: props.slug,
  });

  if (isLeft(eitherComplements)) {
    return (
      <ErrorDialog
        message="An error occured while fetching the course complement"
        code={eitherComplements.left.code}
        description={
          process.env.NODE_ENV === "development"
            ? eitherComplements.left.message
            : ""
        }
      />
    );
  }
  const complements: Complement[] = [];

  for (const complement of eitherComplements.right) {
    const visSibilityComplement = eitherVibility.right.complement.find(
      (vis) => vis.id === complement.id
    );
    if (!visSibilityComplement) {
      continue;
    }
    if (visSibilityComplement.publish === true) {
      complements.push(complement);
    }
  }

  const complementNavItems = complements.map((complement) => ({
    title: complement.name,
    href: `/spaces/complement/${complement.id}?user=${userId}`,
    icon:
      complement.type === "Lesson" ? (
        <ScrollText size={16} />
      ) : (
        <ClipboardType size={16} />
      ),
  }));

  return (
    <>
      <SpacesHeader navItems={complementNavItems} />
      <section className="flex h-full w-full border-collapse overflow-hidden">
        <Sidebar navItems={complementNavItems} />
        <div className="h-full w-full py-8 px-6">
          <ShowSequence content={eitherCours.right.body} />
        </div>
      </section>
    </>
  );
}

export default SpacesCoursServerLayer;
