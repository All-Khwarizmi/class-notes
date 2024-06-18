import ErrorDialog from "@/core/components/common/ErrorDialog";
import NothingToShow from "@/core/components/common/editor/NothingToShow";
import LayoutWithProps from "@/core/components/layout/LayoutWithProps";
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
      <LayoutWithProps isEmpty>
        <ErrorDialog
          message={`
        The user id or the course id is missing
        `}
        />
      </LayoutWithProps>
    );
  }
  const userId = props.searchParams.user;
  const eitherCours = await coursUsecases.getSingleCours({
    userId: "",
    coursId: props.slug,
  });
  if (isLeft(eitherCours)) {
    return (
      <LayoutWithProps isEmpty>
        <ErrorDialog
          message="An error occured while fetching the course"
          code={eitherCours.left.code}
          description={
            process.env.NODE_ENV === "development"
              ? eitherCours.left.message
              : ""
          }
        />
      </LayoutWithProps>
    );
  }
  const eitherVibility = await getVisibility({ userId });
  if (isLeft(eitherVibility)) {
    return (
      <LayoutWithProps isEmpty>
        <ErrorDialog
          message="An error occured while fetching the visibility"
          code={eitherVibility.left.code}
          description={
            process.env.NODE_ENV === "development"
              ? eitherVibility.left.message
              : ""
          }
        />
      </LayoutWithProps>
    );
  }
  const coursVisibility = eitherVibility.right.cours.find(
    (visibility) => visibility.id === props.slug
  );
  const isCoursVisible =
    coursVisibility?.publish === true &&
    coursVisibility.classe &&
    coursVisibility.sequence;
  if (!isCoursVisible) {
    return <LayoutWithProps isEmpty nothingToShow></LayoutWithProps>;
  }
  const eitherComplements = await complementUsecases.getAllCoursComplement({
    coursId: props.slug,
  });

  if (isLeft(eitherComplements)) {
    return (
      <LayoutWithProps isEmpty>
        <ErrorDialog
          message="An error occured while fetching the complement"
          code={eitherComplements.left.code}
          description={
            process.env.NODE_ENV === "development"
              ? eitherComplements.left.message
              : ""
          }
        />
      </LayoutWithProps>
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
    <LayoutWithProps navItems={complementNavItems}>
      <ShowSequence content={eitherCours.right.body} />
    </LayoutWithProps>
  );
}

export default SpacesCoursServerLayer;
