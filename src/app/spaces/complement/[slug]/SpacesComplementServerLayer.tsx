import ErrorDialog from "@/core/components/common/ErrorDialog";
import NothingToShow from "@/core/components/common/editor/NothingToShow";
import Sidebar from "@/core/components/layout/Sidebar";
import SpacesHeader from "@/core/components/layout/SpacesHeader";
import getVisibility from "@/features/classe/application/adapters/actions/get-visibility";
import { complementUsecases } from "@/features/complement/application/usecases/complement-usecases";
import ShowSequence from "@/features/cours-sequence/presentation/views/ShowSequence";
import { isLeft } from "fp-ts/lib/Either";
import React from "react";

async function SpacesComplementServerLayer(props: {
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
  const eitherVibility = await getVisibility({ userId });
  if (isLeft(eitherVibility)) {
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
  const eitherComplement = await complementUsecases.getCoursComplement({
    id: props.slug,
  });
  if (isLeft(eitherComplement)) {
    console.log(eitherComplement.left);
    return (
      <ErrorDialog
        message="An error occured while fetching the course complement"
        code={eitherComplement.left.code}
        description={
          process.env.NODE_ENV === "development"
            ? eitherComplement.left.message
            : ""
        }
      />
    );
  }
  const visibilityComplement = eitherVibility.right.complement.find(
    (complement) => complement.id === props.slug
  );
  const isVisible =
    visibilityComplement?.publish === true &&
    visibilityComplement.classe &&
    visibilityComplement.sequence &&
    visibilityComplement.cours;
  if (isVisible === false) {
    return (
      <>
        <SpacesHeader />
        <section className="flex h-full w-full border-collapse overflow-hidden">
          <div className="h-full w-full py-8 px-6">
            <NothingToShow />
          </div>
        </section>
      </>
    );
  }
  return (
    <>
      <SpacesHeader />
      <section className="flex h-full w-full border-collapse overflow-hidden">
        <Sidebar />
        <div className="h-full w-full py-8 px-6">
          <ShowSequence content={eitherComplement.right.body} />
        </div>
      </section>
    </>
  );
}

export default SpacesComplementServerLayer;
